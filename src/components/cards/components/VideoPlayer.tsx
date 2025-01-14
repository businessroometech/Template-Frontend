import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

const VideoPlayer = ({ src }) => {
  const containerStyles = {
    position: 'relative',
    width: '100%',
    maxHeight: '500px', // Maximum height for the container
    overflow: 'hidden',  // Prevent overflow
  };

  const videoStyles = {
    width: '100%',
    height: 'auto',      // Maintains the aspect ratio without overflowing
    objectFit: 'cover',  // Ensures the entire video is visible without cutting
  };

  return (
    <div style={containerStyles}>
      <Plyr
        crossOrigin="anonymous"
        controls
        style={videoStyles}
        source={{
          type: 'video',
          sources: [{ src: src }],
        }}
      />
    </div>
  );
};

export default VideoPlayer;
