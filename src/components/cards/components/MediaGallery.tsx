import React, { useRef, useEffect } from 'react';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';

const MediaGallery = ({ media }) => {
  const galleryRef = useRef(null);
  const lightGalleryInstance = useRef(null);

  useEffect(() => {
    if (media && media.length > 0 && galleryRef.current) {
      lightGalleryInstance.current = lightGallery(galleryRef.current, {
        plugins: [lgThumbnail, lgZoom],
        selector: '.gallery-item',
        dynamic: true,
        dynamicEl: media.map((src, index) => ({
          src,
          thumb: src,
          subHtml: `<div class="lightGallery-caption">Image ${index + 1}</div>`,
        })),
      });
    }

    return () => {
      if (lightGalleryInstance.current) {
        lightGalleryInstance.current.destroy();
      }
    };
  }, [media]);

  if (!media || media.length === 0) return null;

  const styles = {
    container: { 
      width: '100%',
      height: 'auto',
    },
    fullImage: {
      width: '100%', 
      height: '100%', 
      objectFit: 'fit',
      cursor: 'pointer'
    },
    twoImageContainer: {
      display: 'flex',
      width: '100%',
      height: '450px'
    },
    twoImageItem: {
      width: '50%', 
      height: '100%',
      objectFit: 'cover',
      cursor: 'pointer'
    },
    threeImageContainer: {
      display: 'flex',
      width: '100%',
      height: '450px'
    },
    threeImageMainImage: {
      width: '50%', 
      height: '100%',
      objectFit: 'cover',
      cursor: 'pointer'
    },
    threeImageSideContainer: {
      width: '50%', 
      height: '100%',
      display: 'flex', 
      flexDirection: 'column'
    },
    threeImageTopImage: {
      width: '100%', 
      height: '50%',
      objectFit: 'fill',
      cursor: 'pointer'
    },
    threeImageBottomImageContainer: {
      width: '100%', 
      height: '50%',
      position: 'relative',
      cursor: 'pointer'
    },
    overlayContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    overlayText: {
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold'
    }
  };

  const renderGallery = () => {
    switch (media.length) {
      case 1:
        return (
          <div ref={galleryRef} style={styles.container}>
            <img 
              src={media[0]} 
              onClick={() => {
                if (lightGalleryInstance.current) {
                  lightGalleryInstance.current.openGallery(0);
                }
              }}
              alt="Single image" 
              style={styles.fullImage}
              className="gallery-item"
              data-src={media[0]}
            />
          </div>
        );

      case 2:
        return (
          <div ref={galleryRef} style={styles.twoImageContainer}>
            {media.map((src, index) => (
              <img 
                key={index}
                src={src} 
                alt={`Image ${index + 1}`} 
                onClick={() => {
                  if (lightGalleryInstance.current) {
                    lightGalleryInstance.current.openGallery(index);
                  }
                }}
                style={styles.twoImageItem}
                className="gallery-item"
                data-src={src}
              />
            ))}
          </div>
        );

      case 3:
        return (
          <div ref={galleryRef} style={styles.threeImageContainer}>
            <img 
              src={media[0]} 
              alt="First image" 
              style={styles.threeImageMainImage}
              onClick={() => {
                if (lightGalleryInstance.current) {
                  lightGalleryInstance.current.openGallery(0);
                }
              }}
              className="gallery-item"
              data-src={media[0]}
            />
            <div style={styles.threeImageSideContainer}>
              <img 
                src={media[1]} 
                alt="Second image" 
                style={styles.threeImageTopImage}
                className="gallery-item"
                data-src={media[1]}
                onClick={() => {
                  if (lightGalleryInstance.current) {
                    lightGalleryInstance.current.openGallery(1);
                  }
                }}
              />
              <img 
                src={media[2]} 
                alt="Third image" 
                style={styles.threeImageBottomImageContainer}
                className="gallery-item"
                data-src={media[2]}
                onClick={() => {
                  if (lightGalleryInstance.current) {
                    lightGalleryInstance.current.openGallery(2);
                  }
                }}
              />
            </div>
          </div>
        );

      default:
        return (
          <div ref={galleryRef} style={styles.threeImageContainer}>
            <img 
              src={media[0]} 
              alt="First image" 
              style={styles.threeImageMainImage}
              className="gallery-item"
              data-src={media[0]}
              onClick={() => {
                if (lightGalleryInstance.current) {
                  lightGalleryInstance.current.openGallery(0);
                }
              }}
            />
            <div style={styles.threeImageSideContainer}>
              <img 
                src={media[1]} 
                alt="Second image" 
                style={styles.threeImageTopImage}
                className="gallery-item"
                data-src={media[1]}
                onClick={() => {
                  if (lightGalleryInstance.current) {
                    lightGalleryInstance.current.openGallery(1);
                  }
                }}
              />
              <div style={styles.threeImageBottomImageContainer}>
                <img 
                  src={media[2]} 
                  alt="Third image" 
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  className="gallery-item"
                  data-src={media[2]}
                />
                <div 
                  style={styles.overlayContainer}
                  onClick={() => {
                    if (lightGalleryInstance.current) {
                      lightGalleryInstance.current.openGallery(2);
                    }
                  }}
                >
                  <span style={styles.overlayText}>
                    +{media.length - 3} More
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{marginBottom : '10px'}}>
      {renderGallery()}
      {media.length > 3 && (
        <div style={{display: 'none'}}>
          {media.slice(3).map((src, index) => (
            <img 
              key={index}
              src={src} 
              alt={`Image ${index + 4}`} 
              className="gallery-item"
              data-src={src}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaGallery;