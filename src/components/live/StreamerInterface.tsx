import React, { useState, useRef } from "react";
import { Container, Button, Card, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TwilioVideo from "twilio-video";
import makeApiRequest from "@/utils/apiServer";
import { useAuthContext } from "@/context/useAuthContext";

const StreamerInterface = () => {
  const [roomName, setRoomName] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const localVideoRef = useRef(null);
  const [room, setRoom] = useState<TwilioVideo.Room | null>(null);

  const startStreaming = async () => {
    if (!roomName.trim()) {
      setErrorMessage("Room ID cannot be empty.");
      return;
    }

    setErrorMessage("");
    setIsStreaming(true);

    const identity = user?.id || `guest-${Date.now()}`;

    try {
      // Fetch the token from the server
      const response = await makeApiRequest({
        method: "POST",
        url: "api/v1/live/token",
        data: { identity, roomName },
      });

      if (!response?.data?.token) {
        console.error("Invalid API response:", response);
        throw new Error("Failed to fetch token");
      }

      const token = response.data.token;
      console.log("Token fetched:", token);

      // Check camera and microphone access
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log("Camera and microphone access verified");

      // Connect to Twilio room
      const connectedRoom = await TwilioVideo.connect(token, {
        name: roomName,
        audio: true,
        video: { width: 1280, height: 720 },
      });

      console.log("Successfully connected to Twilio room");

      // Attach the local video track to the DOM
      const localTrack = Array.from(connectedRoom.localParticipant.videoTracks.values())[0]?.track;
      if (localVideoRef.current && localTrack) {
        localTrack.attach(localVideoRef.current);
      }

      // Set the room state after connection
      setRoom(connectedRoom);

    } catch (error) {
      console.error("Error starting the stream:", error);
      setErrorMessage(`Failed to start streaming: ${error.message}`);
      setIsStreaming(false);
    }
  };

  const endStreaming = () => {
    if (room) {
      room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.stop();
        publication.track.detach();
      });
      room.disconnect();
      setRoom(null);
    }
    setIsStreaming(false);
    setRoomName("");
  };

  const goToViewer = () => {
    navigate("/live");
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "100%", maxWidth: "500px", padding: "20px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Live Stream Setup</h2>
          {!isStreaming ? (
            <>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Enter Room ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a unique Room ID"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Share this Room ID with viewers to join your live stream.
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={startStreaming} className="w-100 mb-3">
                  Start Streaming
                </Button>
                <Button variant="secondary" onClick={goToViewer} className="w-100">
                  Switch to Viewer Interface
                </Button>
              </Form>
            </>
          ) : (
            <>
              <Alert variant="success">
                Streaming is live! Share the Room ID below with your viewers.
              </Alert>
              <p className="fw-bold text-center">Room ID: {roomName}</p>
              <div>
                <video ref={localVideoRef} autoPlay muted style={{ width: "100%", height: "auto", marginBottom: "10px" }}></video>
              </div>
              <Button variant="danger" onClick={endStreaming} className="w-100">
                End Stream
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StreamerInterface;
