import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

const VideoPlayer = () => {
  return (
    <div className="overflow-hidden fullscreen-video w-100">
      <Plyr
        crossOrigin="anonymous"
        controls
        autoPlay
        muted
        playsInline  // Ensure the video plays inline, avoiding fullscreen auto-play restrictions
        source={{
          type: 'video',
          poster: '/videos/poster.jpg',
          sources: [{ src: '/videos/video-feed.mp4' }],
        }}
      />
    </div>
  )
}
export default VideoPlayer
