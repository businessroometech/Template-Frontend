import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TwilioVideo from "twilio-video";
import makeApiRequest from "@/utils/apiServer";

const ViewerInterface = () => {
  const [liveId, setLiveId] = useState("");
  const [error, setError] = useState("");
  const [room, setRoom] = useState(null);
  const remoteVideoRef = useRef(null);
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!liveId.trim()) {
      setError("Please enter a valid Room ID");
      return;
    }

    try {
      const response = await makeApiRequest({
        method: "POST",
        url: "api/v1/live/token",
        data: { identity: `viewer-${Date.now()}`, roomName: liveId },
      });

      if (!response?.data?.token) {
        setError("Failed to fetch token. Please try again.");
        return;
      }

      const connectedRoom = await TwilioVideo.connect(response.data.token, {
        name: liveId,
      });

      setRoom(connectedRoom);

      // Attach remote video to the DOM
      connectedRoom.on("participantConnected", (participant) => {
        participant.tracks.forEach((publication) => {
          if (publication.isSubscribed) {
            const track = publication.track;
            if (track.kind === "video") {
              if (remoteVideoRef.current) {
                if (remoteVideoRef.current) {
                  track.attach(remoteVideoRef.current);
                }
              }
            }
          }
        });

        participant.on("trackSubscribed", (track) => {
          if (track.kind === "video") {
            track.attach(remoteVideoRef.current);
          }
        });
      });
    } catch (err) {
      console.error("Error connecting to the room:", err);
      setError("Failed to join the room. Please try again.");
    }
  };

  const handleLeave = () => {
    if (room) {
      room.disconnect();
      setRoom(null);
    }
  };

  const goToStreamer = () => {
    navigate("/join-live");
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body className="text-center">
          <h2 className="mb-4">Join Live Stream</h2>
          <p className="text-muted mb-4">
            Watch live streams with secure access. Enter the Room ID to join.
          </p>
          <Form onSubmit={handleJoin}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Room ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., LIVE-123"
                value={liveId}
                onChange={(e) => {
                  setLiveId(e.target.value);
                  setError("");
                }}
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Join Stream
            </Button>
            <Button variant="secondary" onClick={goToStreamer} className="w-100">
              Switch to Streamer Interface
            </Button>
          </Form>
          <div>
            <video ref={remoteVideoRef} autoPlay style={{ width: "100%", height: "auto", marginTop: "20px" }}></video>
          </div>
          {room && (
            <Button variant="danger" onClick={handleLeave} className="mt-3 w-100">
              Leave Stream
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewerInterface;
