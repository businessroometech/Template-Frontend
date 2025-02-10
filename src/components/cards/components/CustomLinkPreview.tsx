import React, { useEffect, useState } from "react";
import LinkPreview from "@ashwamegh/react-link-preview";
import "@ashwamegh/react-link-preview/dist/index.css";

interface LinkPreviewProps {
  url: string;
}

const CustomLinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const [metadata, setMetadata] = useState<{
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
    error?: boolean;
  }>({});

  useEffect(() => {
    if (!url) return;

    const fetchMetadata = async () => {
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, "text/html");

        const title =
          doc.querySelector("meta[property='og:title']")?.content ||
          doc.querySelector("title")?.innerText ||
          "No Title Available";

        const description =
          doc.querySelector("meta[property='og:description']")?.content ||
          doc.querySelector("meta[name='description']")?.content ||
          "No description available";

        const image =
          doc.querySelector("meta[property='og:image']")?.content ||
          doc.querySelector("meta[name='twitter:image']")?.content ||
          "";

        const siteName =
          doc.querySelector("meta[property='og:site_name']")?.content ||
          new URL(url).hostname.replace("www.", "");

        setMetadata({ title, description, image, siteName, error: false });
      } catch (error) {
        console.error("Error fetching metadata:", error);
        setMetadata({ error: true });
      }
    };

    fetchMetadata();
  }, [url]);

  if (metadata.error) {
    return (
      <LinkPreview
        url={url}
        customDomain="https://lpdg-server.azurewebsites.net/parse/link"
      />
    );
  }

  return (

    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
{metadata.title?
     ( <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ddd",
          borderRadius: "12px",
          overflow: "hidden",
          width: "100%",
          height: "150px",
          boxShadow: "none",
          MozWindowShadow: "none",
        }}
      >
        {metadata.image && (
          <img
            src={metadata.image}
            alt="Preview"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderTopLeftRadius: "12px",
              borderBottomLeftRadius: "12px",
            }}
          />
        )}
        <div style={{ padding: "10px", flex: 1 }}>
          <h4 style={{ margin: "0", fontSize: "14px", fontWeight: "bold", color: "#333" }}>
            {metadata.title && metadata.title.length > 50 ? `${metadata.title.substring(0, 50)}...` : metadata.title}
          </h4>
          <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#666" }}>{metadata.siteName}</p>
          <p style={{ margin: "5px 0 0", fontSize: "14px", color: "#333" }}>
            {metadata.description && metadata.description.length > 150 ? `${metadata.description.substring(0, 150)}...` : metadata.description}
          </p>
        </div>
      </div>):(
       <a href={url} target="_blank" 
      className="text-primary"
       rel="noopener noreferrer"
       style={{ textDecoration: "none", color: "inherit" }}>
        {url}
        </a>
      )}
    </a>
  );
};

export default CustomLinkPreview;
