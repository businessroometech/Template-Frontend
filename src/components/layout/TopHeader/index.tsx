import { Link } from 'react-router-dom'
import { BsChatLeftTextFill, BsGearFill } from 'react-icons/bs'

import LogoBox from '@/components/LogoBox'
import CollapseMenu from './CollapseMenu'
import MobileMenuToggle from './MobileMenuToggle'
import NotificationDropdown from './NotificationDropdown'
import ProfileDropdown from './ProfileDropdown'
import StyledHeader from './StyledHeader'
import { MessageSquareText, Settings } from 'lucide-react'
import { useState } from 'react'

const TopHeader = () => {

  const [messageAbout,setMessageAbout] = useState<boolean>(false);
  const [settingsAbout,setSettingsAbout] = useState<boolean>(false);
  const [notiAbout,setNotiAbout] = useState<boolean>(false);

  return (
    <StyledHeader>
      <div className="container">
        <LogoBox />

        <MobileMenuToggle />

        <CollapseMenu isSearch />

        <ul className="nav flex-nowrap align-items-center  list-unstyled">
          <li className="nav-item">
            <Link to="/messaging">
            <div
              style={{
                padding: '8px',
                borderRadius : '10%',
                marginLeft : '10px',
                // background: 'rgba(136, 209, 254, 0.2)',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.3s ease',
              }}
              about='Label'
      
              onMouseEnter={(e) => {
                (e.currentTarget.style.background = 'rgba(30, 161, 242, 0.4)');
                setMessageAbout(true);
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.style.background = 'transparent');
                setMessageAbout(false);
              }}
            >
              {<MessageSquareText style={{ color: '#1ea1f2' }} />}
            </div>
              {messageAbout && 
                <span
                  style={{
                    position: 'absolute',
                    marginTop : '40px',
                    marginLeft : '15px',
                    top: '50%',
                    zIndex : 10000,
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
                </span>}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/settings/account">
            <div
              style={{
                padding: '8px',
                borderRadius : '10%',
                marginLeft : '10px',
                // background: 'rgba(136, 209, 254, 0.2)',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.3s ease',
              }}
              about='Label'
      
              onMouseEnter={(e) => {
                (e.currentTarget.style.background = 'rgba(30, 161, 242, 0.4)');
                setSettingsAbout(true);
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.style.background = 'transparent');
                setSettingsAbout(false);
              }}
            >
              {<Settings style={{ color: '#1ea1f2' }} />}
            </div>
              {settingsAbout && 
                <span
                  style={{
                    position: 'absolute',
                    marginTop : '40px',
                    marginLeft : '15px',
                    top: '50%',
                    zIndex : 10000,
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
                </span>}
            </Link>
          </li>

          <NotificationDropdown />

          <ProfileDropdown />
        </ul>
      </div>
    </StyledHeader>
  )
}

export default TopHeader
