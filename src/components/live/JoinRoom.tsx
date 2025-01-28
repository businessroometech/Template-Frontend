import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const JoinRoom = () => {
  const [liveId, setLiveId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!liveId.trim()) {
      setError('Please enter a valid Live ID');
      return;
    }

    try {
      navigate(`/live/?roomID=${liveId}`);
    } catch (err) {
      setError('Failed to authenticate. Please try again.');
      console.error('Authentication error:', err);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body className="text-center">
          {/* Top SVG Icons and Text */}
          <div className="d-flex justify-content-around mb-4">
            <div className="text-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mb-2"
              >
                <path d="M23 7l-7 5 7 5V7z"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
              <div className="small">Live Streaming</div>
            </div>
            <div className="text-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mb-2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <div className="small">Business Meeting</div>
            </div>
            <div className="text-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mb-2"
              >
                <path d="M12 20v-6M6 20V10M18 20V4"/>
              </svg>
              <div className="small">Real-time Analytics</div>
            </div>
          </div>

          {/* Main Title and Description */}
          <h2 className="mb-3">Join Business Room Live</h2>
          <p className="text-muted mb-4">
            Connect with your team in high-quality, secure business meetings. 
            Share presentations, collaborate in real-time, and engage with 
            participants worldwide.
          </p>

          {/* Form Section */}
          <Form onSubmit={handleSubmit} className="text-left">
            <Form.Group className="mb-3">
              <Form.Label className="text-start d-block">Enter Room ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., BUSINESS-123"
                value={liveId}
                onChange={(e) => {
                  setLiveId(e.target.value);
                  setError('');
                }}
                isInvalid={!!error}
                className="text-center"
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2"
              style={{ backgroundColor: '#2D63ED', borderColor: '#2D63ED' }}
            >
              Join Meeting Room
            </Button>
          </Form>

          {/* Bottom Info */}
          <div className="mt-4 text-muted small">
            <p className="mb-0">By joining, you agree to our Terms of Service</p>
            <p>Need help? Contact support@businessroom.com</p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JoinRoom;