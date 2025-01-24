import { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ src }) => {
  const containerRef = useRef(null);
  const videoElement = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [videoStyle, setVideoStyle] = useState({});
  const [blurImage, setBlurImage] = useState('');
  const [isReels, setIsReels] = useState(false); // State to check if video is Reels-like

  useEffect(() => {
    if (containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
            } else {
              setIsInView(false);
            }
          });
        },
        { threshold: 0.4 }
      );

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (videoElement.current) {
      videoElement.current.onloadedmetadata = () => {
        const { videoWidth, videoHeight } = videoElement.current;
        const aspectRatio = videoHeight / videoWidth;

        // Check if the video is "Reels-like" (tall format)
        setIsReels(() => aspectRatio > 1.5); // Adjust the threshold as needed
        console.log('---aspectRatio----',aspectRatio);
        // Adjust video dimensions dynamically
        
          if(aspectRatio > 1.6) setVideoStyle({
            width: `${337.5}px`,
            height: `${600}px`,
          });

        // Generate a blurred frame from the video
        captureBlurFrame();
      };

      if (isInView) {
        videoElement.current.play().catch(() => {
          console.log('Autoplay prevented by browser.');
        });
      } else {
        videoElement.current.pause();
      }
    }
  }, [isInView]);

  const captureBlurFrame = () => {
    if (videoElement.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.current.videoWidth;
      canvas.height = videoElement.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoElement.current, 0, 0, canvas.width, canvas.height);

      // Generate the image as a data URL
      const imageDataURL = canvas.toDataURL('image/jpeg');
      setBlurImage(imageDataURL);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: videoStyle.width || '100%',
        height: videoStyle.height || 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Blurred background */}
      {blurImage && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${blurImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            zIndex: 0,
          }}
        ></div>
      )}

      {/* Reels Tag */}
      {isReels && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            padding: '5px 10px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            borderRadius: '5px',
            zIndex: 2,
          }}
        >
          Reels
        </div>
      )}

      {/* Video element */}
      <div style={{width : '100%',height : '100%', flex : 1,justifyContent : 'center',alignItems : 'center'}}>
      <video
        ref={videoElement}
        muted
        playsInline
        controls
        preload="auto"
        src={src}
        
        style={{
          ...videoStyle,
          position: 'relative',
          objectFit: 'contain',
          zIndex: 1,
        }}
      />
      </div>
    </div>
  );
};

export default VideoPlayer;
