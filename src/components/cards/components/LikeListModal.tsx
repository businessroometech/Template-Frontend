import React from "react";
import { Modal, Button } from "react-bootstrap";
import ImageZoom from "../ImageZoom";
import fallBackAvatar from '@/assets/images/avatar/default avatar.png'
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/useAuthContext";

interface Like {
  id: string;
  firstName: string;
  lastName: string;
  likerUrl: string; // Profile picture URL
  occupation: string;
}

interface LikeListModalProps {
  isOpen: boolean;
  onClose: () => void;
  likes: Like[];
}

const LikeListModal: React.FC<LikeListModalProps> = ({ isOpen, onClose, likes,forComment = false}) => {
  const navigate = useNavigate();
  const {user} = useAuthContext();
  return (
    <Modal show={isOpen} onHide={onClose} centered backdrop="static" keyboard={false} >
      <Modal.Header closeButton>
        <Modal.Title>People who liked this</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        {likes.length === 0 ? (
          <p className="text-center text-muted">No likes yet.</p>
        ) : (
          likes.map((like) => (
            <div key={like.id} className="d-flex align-items-center justify-content-between p-3 border-bottom">
              <div className="d-flex align-items-center">
                <Link to={`/profile/feed/${like.id}`}>
                  <ImageZoom 
                    src={(forComment ? like.profilePicture : like.likerUrl) || fallBackAvatar}
                    zoom={50}
                    rotate={50}
                    width="50px"
                    height="50px"
                  />
                </Link>
                
                <Link to={`/profile/feed/${like.id}`} className="ms-3">
                  <div>
                    <h6 className="mb-0">{like.firstName} {like.lastName}</h6>
                    <small className="text-muted">{like.userRole}</small>
                  </div>
                </Link>
              </div>

              {like.id !== user?.id && <button className="btn btn-primary btn-sm">{forComment ? like.isMutualConnection ? "Message" : "Connect" : "Connect"}</button>}
            </div>
          ))
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LikeListModal;
