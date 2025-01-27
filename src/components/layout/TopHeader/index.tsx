import { Link } from 'react-router-dom'
import { BsChatLeftTextFill, BsGearFill } from 'react-icons/bs'

import LogoBox from '@/components/LogoBox'
import CollapseMenu from './CollapseMenu'
import MobileMenuToggle from './MobileMenuToggle'
import NotificationDropdown from './NotificationDropdown'
import ProfileDropdown from './ProfileDropdown'
import StyledHeader from './StyledHeader'
import { MessageSquareText, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/context/useAuthContext'

const TopHeader = () => {

  const { user } = useAuthContext();
  const [messageAbout,setMessageAbout] = useState<boolean>(false);
  const [settingsAbout,setSettingsAbout] = useState<boolean>(false);
  const [notiAbout,setNotiAbout] = useState<boolean>(false);
  const [Notificount,setNotifiCount] = useState(0);

  useEffect(() => {
    fetchNotificationsCount();
      },[Notificount] );
  const fetchNotificationsCount = async () => {
    try {
      const response = await fetch(
        `http://54.177.193.30:5000/api/v1/socket-notifications/get-count?userId=${user?.id}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      const data = await response.json();
           
      setNotifiCount(data.unreadCount);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };


  setTimeout(() => {
    fetchNotificationsCount();
  }, 150);
  

  return (
<StyledHeader>
  <div
    style={{
      backgroundColor : 'white',
      width : '100%',
      display: 'flex',
      alignItems: 'center', // Vertically centers all items
      justifyContent: 'space-between', // Space items evenly between
      padding: '10px 80px', // Adds padding to the container
      paddingBottom : '10px',
    }}
  >
    {/* Left side: Logo and MobileMenu */}
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <LogoBox />
      <MobileMenuToggle />
    </div>

    {/* Center: Collapse Menu */}
    <CollapseMenu isSearch />

    {/* Right side: Navigation Links */}
    <ul
      className="nav flex-nowrap align-items-center list-unstyled"
      style={{
        display: 'flex', // Make the list items flex container
        alignItems: 'center', // Vertically center items
        margin: 0, // Remove default margin
        padding: 0, // Remove default padding
      }}
    >
      {/* Messaging Link */}
      <li className="nav-item" style={{ position: 'relative' }}>
        <Link to="/messaging">
          <div
            style={{
              padding: '8px',
              borderRadius: '10%',
              marginLeft: '10px',
              backdropFilter: 'blur(8px)',
              transition: 'background 0.3s ease',
              cursor: 'pointer', // Add pointer cursor for better UX
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(30, 161, 242, 0.4)';
              setMessageAbout(true);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              setMessageAbout(false);
            }}
          >
            <MessageSquareText style={{ color: '#1ea1f2' }} />
          </div>
          {messageAbout && (
            <span
              style={{
                position: 'absolute',
                marginTop: '40px',
                marginLeft: '15px',
                top: '50%',
                zIndex: 10000,
                transform: 'translateY(-50%)',
                background: '#333',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
              }}
              className="label"
            >
              {'Message'}
            </span>
          )}
        </Link>
      </li>

      {/* Settings Link */}
      <li className="nav-item" style={{ position: 'relative' }}>
        <Link to="/settings/account">
          <div
            style={{
              padding: '8px',
              borderRadius: '10%',
              marginLeft: '10px',
              backdropFilter: 'blur(8px)',
              transition: 'background 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(30, 161, 242, 0.4)';
              setSettingsAbout(true);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              setSettingsAbout(false);
            }}
          >
            <Settings style={{ color: '#1ea1f2' }} />
          </div>
          {settingsAbout && (
            <span
              style={{
                position: 'absolute',
                marginTop: '40px',
                marginLeft: '15px',
                top: '50%',
                zIndex: 10000,
                transform: 'translateY(-50%)',
                background: '#333',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
              }}
              className="label"
            >
              {'Settings'}
            </span>
          )}
        </Link>
      </li>

      {/* Notification Dropdown */}
      <NotificationDropdown  count={Notificount}/>

      {/* Profile Dropdown */}
      <ProfileDropdown />
    </ul>
  </div>
</StyledHeader>

  )
}

export default TopHeader
