import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

const VideoPlayer = ({src}) => {
  return (
    <div className="overflow-hidden fullscreen-video w-100 mb-3">
      <Plyr
        crossOrigin="anonymous"
        controls
        source={{
          type: 'video',
          sources: [{ src: src }],
        }}
      />
    </div>
  )
}
export default VideoPlayer
