import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';
import { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [autoplay,setAutoPlay] = useState<boolean>(false);
  useEffect(() => {
    if (videoRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setAutoPlay(true);
              //console.log('in viewport');
            } else {
              setAutoPlay(false);
             // console.log('out of viewport');
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(videoRef.current);

      return () => {
        if (videoRef.current) {
          observer.disconnect();
        }
      };
    }
  }, []);

  return (
    <div className="overflow-hidden fullscreen-video w-100 mb-3" ref={videoRef}>
      <Plyr
        crossOrigin="anonymous"
        controls
        options={{
          autoplay: autoplay,
          muted: true,
        }}
        source={{
          type: 'video',
          sources: [{ src: src }],
        }}
      />
    </div>
  );
};

export default VideoPlayer;
