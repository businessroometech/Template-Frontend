import React, { useEffect, useState } from "react";

interface LinkPreviewProps {
  url: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const [metadata, setMetadata] = useState<{
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
    error?: boolean;
  }>({});

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const title = doc.querySelector("meta[property='og:title']")?.getAttribute("content") || doc.title;
        const description =
          doc.querySelector("meta[property='og:description']")?.getAttribute("content") ||
          doc.querySelector("meta[name='description']")?.getAttribute("content") ||
          "";
        const image = doc.querySelector("meta[property='og:image']")?.getAttribute("content") || "";
        const siteName = new URL(url).hostname.replace("www.", "");

        setMetadata({ title, description, image, siteName, error: false });
      } catch (error) {
        console.error("Error fetching metadata:", error);
        setMetadata({ error: true });
      }
    };

    fetchMetadata();
  }, [url]);

  // ✅ Show direct link if metadata fetching fails
  if (metadata.error) {
    return (
      <p style={{ fontSize: "14px", color: "#007bff" }}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </p>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ddd",
          borderRadius: "12px",
          overflow: "hidden",
          width: "100%",
          height: "150px",
          boxShadow:"none",
          MozWindowShadow:"none"
        }}
      >
        {/* ✅ Show image only if available */}
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
      </div>
    </a>
  );
};

export default LinkPreview;
