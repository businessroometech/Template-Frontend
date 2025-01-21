import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaEdit, FaPlus, FaBorderStyle, FaTrash } from "react-icons/fa";

// Ensure Bootstrap CSS is imported in your project
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfilePictureModal = ({ show, onHide, onPhotoUpdate,src = "" }) => {
  const handleDelete = () => {
    onPhotoUpdate(null); // Reset to default or remove profile picture
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="profile-modal"
    >
      <Modal.Header
        className="border-0 bg-light justify-content-between align-items-center"
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          padding: "15px 20px",
        }}
      >
        <span>Profile Photo</span>
        <button
          type="button"
          onClick={onHide}
          style={{
            border: "none",
            background: "transparent",
            fontSize: "1.5rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
      </Modal.Header>
      <Modal.Body
        className="text-center"
        style={{
          padding: "30px",
          minHeight: "400px", // Increased height
          minWidth: "350px", // Increased width
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* Circular Profile Picture */}
        <div
          className="rounded-circle overflow-hidden mx-auto"
          style={{
            width: "180px", // Increased size
            height: "180px",
            border: "3px solid #ccc",
            marginBottom: "20px",
          }}
        >
          <img
            src={src} // Replace with dynamic photo
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Options Below Profile */}
        <div className="d-flex justify-content-around align-items-center mt-4">
          <div className="text-center">
            <FaEdit size={24} className="mb-2" />
            <p className="small mb-0">Edit</p>
          </div>
          <div className="text-center">
            <FaPlus size={24} className="mb-2" />
            <p className="small mb-0">Add photo</p>
          </div>
          <div className="text-center">
            <FaBorderStyle size={24} className="mb-2" />
            <p className="small mb-0">Frames</p>
          </div>
          <div className="text-center">
            <FaTrash size={24} className="mb-2 text-danger" />
            <p
              className="small text-danger mb-0"
              onClick={handleDelete}
              style={{ cursor: "pointer" }}
            >
              Delete
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfilePictureModal;
