import { Modal, Card, Row, Col } from 'react-bootstrap';
import { 
  FaBuilding, 
  FaHandshake, 
  FaPiggyBank, 
  FaStore 
} from 'react-icons/fa';

// Don't forget to import bootstrap CSS in your main file:
// import 'bootstrap/dist/css/bootstrap.min.css';

const RoleSelectionModal = ({ show, onHide, onSelectRole }) => {
  const roles = [
    {
      id: 'entrepreneur',
      title: 'Entrepreneur',
      icon: <FaBuilding size={40} />,
      description: 'Start and grow your own business'
    },
    {
      id: 'acquirer',
      title: 'Business Acquirer',
      icon: <FaHandshake size={40} />,
      description: 'Find and purchase established businesses'
    },
    {
      id: 'investor',
      title: 'Investor',
      icon: <FaPiggyBank size={40} />,
      description: 'Invest in promising businesses'
    },
    {
      id: 'seller',
      title: 'Business Seller',
      icon: <FaStore size={40} />,
      description: 'List and sell your business'
    }
  ];

  const handleRoleSelect = (roleId) => {
    onSelectRole(roleId);
    onHide();
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      fullscreen
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="border-0 justify-content-center">
        <Modal.Title className="text-center h3">
          Select Your Role
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="d-flex align-items-center">
        <Row className="w-100 g-4">
          {roles.map((role) => (
            <Col key={role.id} xs={12} md={6}>
              <Card
                onClick={() => handleRoleSelect(role.id)}
                className="h-100 text-center p-4 cursor-pointer"
                style={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center gap-3">
                  <div className="rounded-circle bg-light p-4 mb-2">
                    {role.icon}
                  </div>
                  <h4 className="mb-2">{role.title}</h4>
                  <p className="text-muted mb-0">{role.description}</p>
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