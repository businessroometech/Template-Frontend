
import { currentYear, developedBy, developedByLink } from '@/context/constants'
import type { ProfilePanelLink } from '@/types/data'
import { Card, CardBody, CardFooter } from 'react-bootstrap'

import avatar7 from '@/assets/images/avatar/07.jpg'
import bgBannerImg from '@/assets/images/bg/01.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/context/useAuthContext'
import { useEffect, useState } from 'react'
import { Globe, Map, MapPin } from 'lucide-react'
import { useLayoutContext } from '@/context/useLayoutContext'

type ProfilePanelProps = {
  links: ProfilePanelLink[]
}

const ProfilePanel = ({ links }: ProfilePanelProps) => {
  const {user} = useAuthContext();
    const [profile, setProfile] = useState({});
    const {theme} = useLayoutContext();
    const navigate = useNavigate();
    const isDarkMode = theme === 'dark';
    console.log('----theme----',theme);


  // console.log("user", user);
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await fetch('https://app-backend-8r74.onrender.com/api/v1/auth/get-user-Profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user?.id
            })
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json(); 
          setProfile(data.data); 
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      if (profile.profileImgUrl){
        return;
      }
      fetchUser();
    }, []); 
    
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      return date.toLocaleString('en-GB', options).replace(',', ' at');
    };
  
  
  return (
    <>
      <Card className="overflow-hidden h-100">
        <div
          className="h-50px"
          style={{ backgroundImage: `url(${profile?.coverImgUrl?profile?.coverImgUrl:bgBannerImg})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
        />

        <CardBody className="pt-0">
          <div className="text-center">
            

            <Link to={(`/profile/feed/${user?.id}`)}>
              <div className="avatar avatar-lg mt-n5 mb-3">
                <span role="button">
                  <img height={64} width={64} src={profile.profileImgUrl?profile.profileImgUrl:avatar7} alt="avatar" className="avatar-img rounded border border-white border-3" />
                </span>
              </div>
            </Link>

            <h5 className="mb-2 fw-semibold">
              <Link 
                to={(`/profile/feed/${user?.id}`)}
                className={`${isDarkMode ? 'text-light' : 'text-dark'} text-decoration-none`}
              >
                {profile.personalDetails?.firstName || user?.firstName}{' '}
                {profile.personalDetails?.lastName || user?.lastName}
              </Link>
            </h5>
            
            
            <div className={`d-flex align-items-center justify-content-center gap-2 pb-3 ${isDarkMode ? 'text-light' : 'text-dark'} mb-2`}>
              <p className={`fs-6 mx-1 mb-0 ${isDarkMode ? 'text-light' : 'text-dark'}`}>{user?.userRole}</p>
              <MapPin size={16} className="ml-2" style={{ color: '#87CEEB' }} />
              <span className={`fs-6 ${isDarkMode ? 'text-light' : 'text-dark'}`}>{user?.country}</span>
            </div>
            {/* <p className="text-dark fs-6 mt-3 mb-0">
              {profile.personalDetails?.bio ? profile.personalDetails?.bio : "Software Developer"}
            </p> */}

            {
              profile.postsCount && profile.connectionsCount &&  profile.likeCount ? <div className="hstack gap-2 gap-xl-3 justify-content-center">
              <div>
                <h6 className="mb-0">{profile.postsCount}</h6>
                <small>Posts</small>
              </div>
              <div className="vr" />
              <div>
                <h6 className="mb-0">{profile.connectionsCount}</h6>
                <small>Connections</small>
              </div>
              <div className="vr" />
              <div>
                <h6 className="mb-0">{profile.likeCount}</h6>
                <small>Likes</small>
              </div>
            </div> : null
            }
          </div>

          <hr />

          <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
            {links.map((item, idx) => (
              <li key={item.name + idx} className="nav-item">
                <Link className="nav-link" to={item.link}>
                  <img src={item.image} alt="icon" height={20} width={20} className="me-2 h-20px fa-fw" />
                  <span>{item.name?item.name:"Arun Jain"}  </span>
                </Link>
              </li>
            ))}
          </ul>
        </CardBody>

        <CardFooter className="text-center py-2">
          <Link  className="btn btn-sm btn-link" to= {(`/profile/feed/${user?.id}`)}>
            View Profile
          </Link>
        </CardFooter>
      </Card>
      <ul className="nav small mt-4 justify-content-center lh-1">
        <li className="nav-item">
          <Link className="nav-link" to="/profile/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/settings/account">
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" target="_blank" rel="noreferrer" to={developedByLink}>
            Support
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" target="_blank" rel="noreferrer" to="">
            Docs
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/help">
            Help
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/privacy-terms">
            Privacy &amp; terms
          </Link>
        </li>
      </ul>

      <p className="small text-center mt-1">
        ©{currentYear}
        <a className="text-reset" target="_blank" rel="noreferrer" href={developedByLink}>
          
          {developedBy}
        </a>
      </p>
    </>
  )
}

export default ProfilePanel
