import React from "react";
import { Modal, Button } from "react-bootstrap";
import ImageZoom from "../ImageZoom";
import fallBackAvatar from '@/assets/images/avatar/default avatar.png'

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
  return (
    <Modal show={isOpen} onHide={onClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>People who liked this</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        {likes.length === 0 ? (
          <p className="text-center text-muted">No likes yet.</p>
        ) : (
          likes.map((like) => (
            <div key={like.id} className="d-flex align-items-center p-3 border-bottom">
              <ImageZoom src={forComment ? fallBackAvatar : like.likerUrl || fallBackAvatar}
                 zoom={50}
                 rotate={50}
                 width="50px"
                 height="50px"
              />
              {/* <img
                src={like.likerUrl}
                alt={`${like.firstName} ${like.lastName}`}
                className="rounded-circle me-3"
                width={50}
                height={50}
              /> */}
              <div style={{marginLeft : '8px'}}>
                <h6 className="mb-0">{forComment ? like.user?.firstName : like.firstName} {forComment ? like.user?.lastName : like.lastName}</h6>
                <small className="text-muted">{forComment ? like.user?.userRole : like.userRole}</small>
              </div>
            </div>
          ))
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LikeListModal;
