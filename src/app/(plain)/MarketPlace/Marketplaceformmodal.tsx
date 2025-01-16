import React from "react";
import { Modal } from "react-bootstrap";
import BusinessSellerForm from "../BusinessSeller/BusinessSellerForm"; // Adjust the import path as needed

const Marketplaceformmodal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Modal.Dialog
        style={{
          width: "900px", // Increased width
          height: "auto",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Modal.Header
          className="border-0 bg-light justify-content-center"
          style={{
            borderBottom: "none",
            padding: "1rem 2rem",
          }}
        >
          <Modal.Title className="text-center h5 text-secondary">
            Fill the Form
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="bg-light"
          style={{
            padding: "2rem",
          }}
        >
          <BusinessSellerForm />
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
};

export default Marketplaceformmodal;
