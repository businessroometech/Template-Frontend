import React, { useState,useEffect } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from "react-bootstrap";
import Stories from "./components/Stories";
import Feeds from "./components/Feeds";
import Followers from "./components/Followers";
import { io } from "socket.io-client";
import CreatePostCard from "@/components/cards/CreatePostCard";
import { Link, useNavigate } from "react-router-dom";
import LoadContentButton from "@/components/LoadContentButton";
import { useAuthContext } from "@/context/useAuthContext";
import RoleSelectionModal from "@/components/cards/RoleSelectionModal";


const socket = io('https://strengthholdings.com/', {
  // path: "/socket.io",
  transports: ['websocket'],
})

const Home = () => {
  const [isCreated, setIsCreated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user} = useAuthContext();
  const navigate = useNavigate();
  const [profile,setProfile] = useState({});
  console.log('Home reloads')

  useEffect(() => {
    try {
      // Connect to the server
      // console.log('Connecting to socket...');
      socket.emit("userOnline", user.id);

      // Log connection status
      socket.on('connections', () => {
          // console.log('Socket connected:', socket.id);
      });

      socket.on('connect_error', (error) => {
          // console.error('Connection error:', error);
      });
    } catch (error) {
      console.error('Error during socket connection:', error);
    }


    return () => {
      try {
        // console.log('Disconnecting socket...');
        socket.disconnect();
      } catch (error) {
        console.error('Error during socket disconnection:', error);
      }
    };
  },[]);

  

  return (
    <>
      <Col
        md={8}
        lg={6}
        id="scrollableDiv"
        style={{
         
          position: 'sticky', // Ensure the container's position is suitable for scrolling
       // Enables vertical scrolling
           // Sets a height limit for scrolling
          WebkitOverflowScrolling: 'touch', // Smooth scrolling for iOS
          marginLeft: '0',
          scrollbarWidth: 'none', /* Firefox: Hide scrollbar */
          msOverflowStyle: 'none', /* IE 10+: Hide scrollbar */
        }}
        className="position-relative vstack gap-4"
      >
       
      <CreatePostCard setIsCreated={setIsCreated} isCreated={isCreated} />       
        <Feeds isCreated={setIsCreated}  setIsCreated={setIsCreated}/>
      </Col>

      <Col lg={3} 
        style={{ 
          marginTop : '0px', 
          height : '44rem',   
          maxHeight:"70em",
          //  /* Enable vertical scrolling */
          // scrollbarWidth: 'none', /* Firefox: Hide scrollbar */
          // msOverflowStyle: 'none', /* IE 10+: Hide scrollbar */
      }}>
        <Row className="g-4">
          <Col sm={6} lg={12} >
            <div style={{marginTop : '23px'}}>
             <Followers />
            </div>
          </Col>

          <Col sm={6} lg={12} style={{}}>
            {/* <Card>
              <CardHeader className="pb-0 border-0">
                <CardTitle className="mb-0">Businessroom News</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="mb-3">
                  <h6 className="mb-0">
                    <Link to="/blogs/details">Ten questions you should answer truthfully</Link>
                  </h6>
                  <small>2hr</small>
                </div>

                <div className="mb-3">
                  <h6 className="mb-0">
                    <Link to="/blogs/details">Five unbelievable facts about money</Link>
                  </h6>
                  <small>3hr</small>
                </div>

                <div className="mb-3">
                  <h6 className="mb-0">
                    <Link to="/blogs/details">Best Pinterest Boards for learning about business</Link>
                  </h6>
                  <small>4hr</small>
                </div>

                <div className="mb-3">
                  <h6 className="mb-0">
                    <Link to="/blogs/details">Skills that you can learn from business</Link>
                  </h6>
                  <small>6hr</small>
                </div>

                <LoadContentButton name="View all latest news" />
              </CardBody>
            </Card> */}
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Home;
