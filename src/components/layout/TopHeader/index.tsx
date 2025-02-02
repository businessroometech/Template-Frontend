import { Link } from 'react-router-dom'
import { BsChatLeftTextFill, BsGearFill } from 'react-icons/bs'
import { useUnreadMessages } from '@/context/UnreadMessagesContext'
import LogoBox from '@/components/LogoBox'
import CollapseMenu from './CollapseMenu'
import MobileMenuToggle from './MobileMenuToggle'
import NotificationDropdown from './NotificationDropdown'
import ProfileDropdown from './ProfileDropdown'
import StyledHeader from './StyledHeader'
import { MessageSquareText, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/context/useAuthContext'
import { LIVE_URL } from '@/utils/api'

const TopHeader = () => {
  const { user } = useAuthContext();
  const [messageAbout, setMessageAbout] = useState<boolean>(false);
  const [settingsAbout, setSettingsAbout] = useState<boolean>(false);
  const [notiAbout, setNotiAbout] = useState<boolean>(false);
  const [Notificount, setNotifiCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const { unreadMessages } = useUnreadMessages(); // 🔥 Getting unread messages from context
  useEffect(() => {
    setMessageCount(unreadMessages.length);
  },[unreadMessages]);

  useEffect(() => {
    console.log('Notification Dropdown useEffect');
    const fetchNotificationsCount = async () => {
      try {
        const response = await fetch(
          `${LIVE_URL}api/v1/socket-notifications/get-count?userId=${user?.id}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
  
        const data = await response.json();
        setNotifiCount(data.unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotificationsCount();
    const interval = setInterval(fetchNotificationsCount, 50000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchNotificationsCount = async () => {
      try {
        const response = await fetch(
          `${LIVE_URL}api/v1/socket-notifications/get-count?userId=${user?.id}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
  
        const data = await response.json();
        setNotifiCount(data.unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotificationsCount();
  }, [user?.id]);

  return (
    <StyledHeader>
      <div
        style={{
          backgroundColor: 'white',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0px 80px',
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
            display: 'flex',
            alignItems: 'center',
            margin: 0,
            padding: 0,
          }}
        >
         
          <li className="nav-item" style={{ position: 'relative' }}>
            <Link to="/messaging">
              <div
                style={{
                  position: "relative",
                  padding: "8px",
                  borderRadius: "10%",
                  marginLeft: "10px",
                  cursor: "pointer",
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
                <MessageSquareText style={{ color: '#1ea1f2', fontSize: '24px' }} />
                {'count', console.log(messageCount)}
                {messageCount >= 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      background: "red",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 9999,
                    }}
                  >
                    {messageCount}
                  </span>
                )}
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

          {/* 🔔 Notification Dropdown */}
          <NotificationDropdown count={Notificount} />

          {/* 👤 Profile Dropdown */}
          <ProfileDropdown />
        </ul>
      </div>
    </StyledHeader>
  );
};

export default TopHeader;

