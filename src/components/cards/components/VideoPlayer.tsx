import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';
import { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ src }) => {
  const containerRef = useRef(null);
  const videoElement = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [containerStyle, setContainerStyle] = useState({
    paddingBottom: '56.25%', // Default to 16:9 aspect ratio (56.25% = 9/16 * 100)
  });

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
        console.log('---video element---',videoElement.current);
        const { videoWidth, videoHeight } = videoElement.current;
        const aspectRatio = videoHeight / videoWidth;

        // Adjust container's paddingBottom to match the video's aspect ratio
        setContainerStyle({ paddingBottom: `${aspectRatio * 100}%` });
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

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height : '200px',
        overflow: 'hidden',
        // backgroundColor : 'black',
        // ...containerStyle,
      }}
    >
      <video
        ref={videoElement}
        muted
        playsInline
        height={500}
        width={100}
        controls
        preload="auto"
        src={src}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '200px',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};

export default VideoPlayer;
