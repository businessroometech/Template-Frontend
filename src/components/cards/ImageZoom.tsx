import { Image } from "react-bootstrap"

const ImageZoom = ({src,zoom,rotate,width="55px",height="55px"} : {
    src : string;
    zoom : number;
    rotate : number;
    width ?: string;
    height ?: string;
}) => {
  return (
    <div
        style={{
            border : '3px solid white',
            width: width,
            height: height,
            borderRadius: "50%",
            overflow: "hidden",
        
        }}
    >
        <Image
            src={src} // Replace with your actual image source
            alt="Profile"
            style={{
            width: "100%",
            height: "100%",
            transform: `scale(${(zoom || 50)  / 50}) rotate(${(rotate || 50) - 50}deg)`,
            }}
        />
    </div>
  )
}

export default ImageZoom