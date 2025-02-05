import React, { useState,useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Feeds from "./components/Feeds";
import Followers from "./components/Followers";
import { io } from "socket.io-client";
import CreatePostCard from "@/components/cards/CreatePostCard";
import { Link, useNavigate } from "react-router-dom";
import { useOnlineUsers } from "@/context/OnlineUser.";
import LoadContentButton from "@/components/LoadContentButton";
import { useAuthContext } from "@/context/useAuthContext";
import {  LIVE_URL, SOCKET_URL } from "@/utils/api";


export interface PersonalDetails {
  id: string;
  occupation: string | null;
  password: string;
  country: string;
  profilePictureUploadId: string;
  bgPictureUploadId: string;
  firstName: string;
  lastName: string;
  dob: string;
  mobileNumber: string | null;
  emailAddress: string;
  bio: string | null;
  gender: string;
  preferredLanguage: string;
  socialMediaProfile: string;
  height: string;
  weight: string;
  permanentAddress: string | null;
  currentAddress: string | null;
  aadharNumberUploadId: string | null;
  panNumberUploadId: string | null;
  userRole: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  zoom: number;
  rotate: number;
  zoomProfile: number;
  rotateProfile: number;
}

export interface UserProfile {
  personalDetails: PersonalDetails;
  profileImgUrl: string;
  coverImgUrl: string;
  connectionsCount: number;
  postsCount: number;
  likeCount: number;
  connectionsStatus: "pending" | "accepted" | "rejected" | "none"; // Assuming possible statuses
}
const socket = io(`${SOCKET_URL}`, {
  // path: "/socket.io",
  transports: ['websocket'],
})

const Home = () => {
  const [isCreated, setIsCreated] = useState(false);
  const { user} = useAuthContext();
  const {fetchOnlineUsers} = useOnlineUsers();
  const navigate = useNavigate();
  // const [profile,setProfile] = useState({});
  console.log('Home reloads')

  const [profile,setProfile] = useState<UserProfile>({});
  // Theek se merge karo isse mat hatao please 🙏
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${LIVE_URL}api/v1/auth/get-user-Profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user?.id,
            //profileId: user?.id,
          }),
        })
  
        if (!response.ok) {
          //  navigate('/not-found')
          throw new Error('Network response was not ok')
        }
        if (response.status === 404) {
          // navigate('/not-found')
        }
        const data = await response.json()
        
        setProfile(data?.data);
      } catch (error) {
        console.error('Error fetching user profile:', error)
      } 
    }
    fetchUser();
  },[user.id])
;



  

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
        <Feeds isCreated={isCreated}  setIsCreated={setIsCreated} profile={profile}/>
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
