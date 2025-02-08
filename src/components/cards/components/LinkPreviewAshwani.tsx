import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import '@ashwamegh/react-link-preview/dist/index.css'
import styles from './LinkPreview.module.css';

const isValidUrl = (url: string): boolean => {
  const regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
  return regex.test(url);
};

const isValidUrlProp = (props: any, propName: string, componentName: string) => {
  if (!props[propName]) {
    return new Error(`Missing required prop '${propName}' in '${componentName}'.`);
  }
  if (!isValidUrl(props[propName])) {
    return new Error(`Invalid prop '${propName}' passed to '${componentName}'. Expected a valid URL.`);
  }
};

interface LinkPreviewProps {
  url: string;
  width?: string;
  maxWidth?: string;
  marginTop?: string;
  marginBottom?: string;
  marginRight?: string;
  marginLeft?: string;
  onClick?: () => void;
  render?: (data: { loading: boolean; preview: any }) => JSX.Element;
  customDomain?: string;
}

const LinkPreviewAshwani: React.FC<LinkPreviewProps> = ({
  url,
  width = "90%",
  maxWidth = "700px",
  marginTop = "18px",
  marginBottom = "18px",
  marginRight = "auto",
  marginLeft = "auto",
  onClick = () => {},
  render,
  customDomain = "https://lpdg-server.azurewebsites.net/parse/link",
}) => {
  const [loading, setLoading] = useState(true);
  const [preview, setPreviewData] = useState<any>({});
  const [isUrlValid, setUrlValidation] = useState(false);

  const style = {
    width,
    maxWidth,
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
  };

  useEffect(() => {
    if (!isValidUrl(url)) {
      console.error("LinkPreview Error: Invalid URL provided.");
      setUrlValidation(false);
      return;
    }
    
    setUrlValidation(true);
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(customDomain, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        setPreviewData(data);
      } catch (error) {
        console.error("LinkPreview Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, customDomain]);

  if (!isUrlValid) return null;

  // If the user provides a custom render function
  if (render) {
    return render({ loading, preview });
  }

  return (
    <div>
      {loading ? (
        <div className={styles.linkPreviewSection} style={style}>
          <div className={styles["link-description"]}>
            <div className={styles.domain}>
              <span className={`${styles["link-url-loader"]} ${styles["animated-background"]}`} />
            </div>
            <div className={styles["link-data-loader"]}>
              <div className={`${styles.p1} ${styles["animated-background"]}`} />
              <div className={`${styles.p2} ${styles["animated-background"]}`} />
            </div>
          </div>
          <div className={styles["link-image-loader"]}>
            <div className={styles.img} />
          </div>
        </div>
      ) : (
        <div className={styles["link-preview-section"]} style={style} onClick={onClick}>
          <div className={styles["link-description"]}>
            <div className={styles.domain}>
              <span className={styles["link-url"]}>{preview.domain}</span>
            </div>
            <div className={styles["link-data"]}>
              <div className={styles["link-title"]}>{preview.title}</div>
              <div className={styles["link-description"]}>{preview.description}</div>
            </div>
          </div>
          {preview.img && (
            <div className={styles["link-image"]}>
              <img src={preview.img} alt={preview.description} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

LinkPreviewAshwani.propTypes = {
  url: isValidUrlProp,
  onClick: PropTypes.func,
  render: PropTypes.func,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  marginRight: PropTypes.string,
  marginLeft: PropTypes.string,
  customDomain: PropTypes.string,
};

export default LinkPreviewAshwani;
