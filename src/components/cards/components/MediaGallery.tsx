import React, { CSSProperties, useState } from 'react';
import PostModal from './PostModal';
import { PostSchema,Like } from '../PostCard';
import { UserProfile } from '@/app/(social)/feed/(container)/home/page';

export interface UtilType {
  commentCount : number
  setCommentCount : React.Dispatch<React.SetStateAction<number>>
  likeStatus : boolean
  setLikeStatus : React.Dispatch<React.SetStateAction<boolean>>
  allLikes : Like[]
  setAllLikes : React.Dispatch<React.SetStateAction<Like[]>>
  comments : []
  setComments : React.Dispatch<React.SetStateAction<[]>>
  likeCount : number
  setLikeCount : React.Dispatch<React.SetStateAction<number>>
}

export interface StyleProps {
  container : CSSProperties;
  fullImage : CSSProperties;
  twoImageContainer : CSSProperties;
  twoImageItem  : CSSProperties;
  threeImageContainer : CSSProperties;
  threeImageMainImage : CSSProperties;
  threeImageSideContainer : CSSProperties;
  threeImageTopImage : CSSProperties;
  threeImageBottomImageContainer : CSSProperties;
  overlayContainer : CSSProperties;
  overlayText : CSSProperties;
}


const MediaGallery = ({ 
  item,
  media,
  profile,
  setShowRepostOp,
  utils
}
:
{
  item : PostSchema;
  media : string[];
  profile : UserProfile;
  setShowRepostOp : React.Dispatch<React.SetStateAction<boolean>>
  utils : UtilType
}
) => {

  const [showPostModal,setShowPostModal] = useState<boolean>(false);  
  const [src,setSrc] = useState<number>(0);
  if (!media || media.length === 0) return null;

  function handleClick(src : number) : void {
    console.log('click')
    setSrc(src);
    setShowPostModal(true);
  }

  const styles : StyleProps = {
    container : { 
      position : 'relative',
      width: '100%',
      height: 'auto',
      maxHeight : '600px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1px', // Adding space between images
      overflow : 'hidden',
    },
    fullImage: {
      width: '100%', 
      height: '100%',
      position : 'relative',
      maxHeight : '600px', 
      objectFit : 'contain',
      cursor: 'pointer',
      margin: '1px', // Add space between images
      overflow : 'hidden',
      zIndex : 2,
    },
    twoImageContainer: {
      display: 'flex',
      width: '100%',
      height: '450px',
      gap: '1px', // Adding space between images
    },
    twoImageItem: {
      width: '50%',
      height: '100%',
      objectFit: 'cover',
      cursor: 'pointer',
      margin: '1px', // Add space between images
    },
    threeImageContainer: {
      display: 'flex',
      width: '100%',
      height: '450px',
      gap: '1px', // Adding space between images
    },
    threeImageMainImage: {
      width: '50%',
      height: '100%',
      objectFit: 'cover',
      cursor: 'pointer',
      margin: '1px', // Add space between images
    },
    threeImageSideContainer: {
      width: '50%',
      height: '100%',
      display: 'flex', 
      flexDirection: 'column',
      gap: '1px', // Adding space between images
    },
    threeImageTopImage: {
      width: '100%', 
      height: '50%',
      objectFit: 'fill',
      cursor: 'pointer',
      margin: '1px', // Add space between images
    },
    threeImageBottomImageContainer: {
      width: '100%', 
      height: '50%',
      position: 'relative',
      cursor: 'pointer',
      margin: '1px', // Add space between images
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
      alignItems: 'center',
    },
    overlayText: {
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
    }
  };

  const renderGallery = () => {
    switch (media.length) {
      case 1:
        return (
          <div  style={styles.container}>
            <img 
              src={media[0]} 
              onClick={() => handleClick(0)}
              alt="Single image" 
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '600px',
                objectFit: 'contain',
                position: 'relative',  // Ensures it's above blur
                zIndex: 2,             // Ensures it's above blur
                cursor: 'pointer',
                margin: '1px',
              }}

              className="gallery-item"
              data-src={media[0]}
            />
            {/* <div 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                backgroundColor : `gray`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center', 
                filter: 'blur(20px)', // Adjust blur intensity
                transform: 'scale(1.1)', // Slightly enlarge to avoid edge cut-off
                zIndex: 0
              }} 
            /> */}
          </div>
        );

      case 2:
        return (
          <div  style={styles.twoImageContainer}>
            {media.map((src, index) => (
              <img 
                key={index}
                src={src} 
                alt={`Image ${index + 1}`} 
                onClick={() => handleClick(index)}
                style={styles.twoImageItem}
                className="gallery-item"
                data-src={src}
              />
            ))}
          </div>
        );

      case 3:
        return (
          <div style={styles.threeImageContainer}>
            <img 
              src={media[0]} 
              alt="First image" 
              style={styles.threeImageMainImage}
              onClick={() => handleClick(0)}
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
                onClick={() => handleClick(1)}
              />
              <img 
                src={media[2]} 
                alt="Third image" 
                style={styles.threeImageBottomImageContainer}
                className="gallery-item"
                data-src={media[2]}
                onClick={() => handleClick(2)}
              />
            </div>
          </div>
        );

      default:
        return (
          <div  style={styles.threeImageContainer}>
            <img 
              src={media[0]} 
              alt="First image" 
              style={styles.threeImageMainImage}
              className="gallery-item"
              data-src={media[0]}
              onClick={() => handleClick(0)}
              
            />
            <div style={styles.threeImageSideContainer}>
              <img 
                src={media[1]} 
                alt="Second image" 
                style={styles.threeImageTopImage}
                className="gallery-item"
                data-src={media[1]}
                onClick={() => handleClick(1)}
              />
              <div style={styles.threeImageBottomImageContainer}>
                <img 
                  src={media[2]} 
                  alt="Third image" 
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  className="gallery-item"
                  data-src={media[2]}
                  onClick={() => handleClick(2)}
                />
                <div 
                  style={styles.overlayContainer}
                  onClick={() => handleClick(2)}
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
      <PostModal 
        show={showPostModal} 
        handleClose={() => setShowPostModal(false)} 
        imageIndex={src} item={item} 
        profile={profile}
        media={media}
        utils={utils}
        setShowRepostOp={setShowRepostOp}
      />
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