import React from "react";
import { Modal, Card, Row, Col } from "react-bootstrap";
import {
  FaBuilding,
  FaHandshake,
  FaPiggyBank,
  FaStore,
} from "react-icons/fa";

// Ensure to import bootstrap CSS in your main file:
// import 'bootstrap/dist/css/bootstrap.min.css';

const RoleSelectionModal = ({ show, onHide, onSelectRole }) => {
  const roles = [
    {
      id: "entrepreneur",
      title: "Entrepreneur",
      icon: <FaBuilding size={30} />,
      description: "Find a co-founder or investor to scale your startup.",
    },
    {
      id: "investor",
      title: "Investor",
      icon: <FaPiggyBank size={30} />,
      description: "Empowering growth through startup investments.",
    },
    {
      id: "seller",
      title: "Business Seller",
      icon: <FaStore size={30} />,
      description: "List and sell your startup with ease.",
    },
    {
      id: "acquirer",
      title: "Business Acquirer",
      icon: <FaHandshake size={30} />,
      description: "Discover and Acquire promising startups.",
    },
  ];

  const handleRoleSelect = (roleId) => {
    onSelectRole(roleId);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header
        className="border-0 bg-light justify-content-center"
        style={{ borderBottom: "none" }}
      >
        <Modal.Title className="text-center h5 text-secondary">
          Select Your Role
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-light">
        <Row className="g-3 justify-content-center">
          {roles.map((role) => (
            <Col key={role.id} xs={12} md={6} className="text-center">
              <Card
                onClick={() => handleRoleSelect(role.id)}
                className="h-100 shadow-sm border-0 p-3"
                style={{
                  cursor: "pointer",
                  transition: "box-shadow 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0, 0, 0, 0.2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0, 0, 0, 0.1)")
                }
              >
                <Card.Body>
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
                    style={{
                      width: "60px",
                      height: "60px",
                      marginBottom: "15px",
                    }}
                  >
                    {role.icon}
                  </div>
                  <h6 className="mb-1">{role.title}</h6>
                  <p className="text-muted small mb-0">{role.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default RoleSelectionModal;
