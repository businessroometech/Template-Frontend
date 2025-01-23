import { timeSince } from '@/utils/date';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap';
import { BsBellFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useAuthContext } from '@/context/useAuthContext';
import avatar4 from '@/assets/images/avatar/04.jpg'
import avatar7 from '@/assets/images/avatar/default avatar.png'
import { Bell } from 'lucide-react';

const NotificationDropdown = () => {
  const { user } = useAuthContext();
  // const [allNotifications, setAllNotifications] = useState<any[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [allNotifications, setAllNotifications] = useState([]);
  const [notiAbout,setNotiAbout] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) return;

    const wsConnection = new WebSocket(`wss://strengthholdings.com?userId=${user.id}`);
    setWs(wsConnection);

    // Handle WebSocket connection open
    wsConnection.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    // Handle WebSocket message event
    wsConnection.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setAllNotifications((prev) => [notification, ...prev]);
    };

    // Handle WebSocket error
    wsConnection.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    // Handle WebSocket connection close
    wsConnection.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    // Clean up on component unmount
    return () => {
      wsConnection.close();
    };
  }, [user?.id]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `https://strengthholdings.com/api/v1/socket-notifications/get?userId=${user?.id}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );

      const data = await response.json();
      if (data?.notifications) {
        setAllNotifications(data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user?.id]);


  const handleOnRead = async (notificationId: string) => {
    try {
      const response = await fetch(
        'https://strengthholdings.com/api/v1/notifications/mark-as-read',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notificationId }),
        }
      );
      await response.json();

      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleReadAll = async () => {
    try {
      const notificationIds = allNotifications.map((notification) => notification.id);

      const response = await fetch(
        ' https://strengthholdings.com/api/v1/notifications/mark-all-as-read',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notificationIds }),
        }
      );
      const data = await response.json();
      if (data?.success) {
        console.log('All notifications marked as read successfully.');
        fetchNotifications();
      } else {
        console.error('Failed to mark all notifications as read:', data.message);
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return (
    <Dropdown as="li" autoClose="outside" className="nav-item" drop="down" align="end">
      <DropdownToggle className="content-none nav-link icon-md btn btn-light p-0"
        style={{
          marginRight : '10px'
        }}
      >
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
            setNotiAbout(true);
          }}
          onMouseLeave={(e) => {
            (e.currentTarget.style.background = 'transparent');
            setNotiAbout(false);
          }}
        >
          {<Bell style={{ color: '#1ea1f2' }} />}
        </div>
          {notiAbout && 
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
              {'Notification'}
            </span>}
      </DropdownToggle>
      <DropdownMenu className="dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg border-0">
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <h6 className="m-0">
              Notifications{' '}
              <span className="badge bg-danger bg-opacity-10 text-danger ms-2">
                {allNotifications.filter((n) => !n.isRead).length} new
              </span>
            </h6>
            <Link className="small" to="#" onClick={handleReadAll}>
              read all
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="list-group list-group-flush list-unstyled p-2">
              <CardBody className="p-0">
                <ul className="list-group list-group-flush list-unstyled p-2">
                  {allNotifications.slice(0, 4).map((notification) => (
                    <Link to={notification.navigation} key={notification.id}>
                      <div
                        onClick={() => handleOnRead(notification.id)}
                        className={clsx(
                          'rounded d-sm-flex border-0 mb-1 p-3 pt-4 position-relative cursor-pointer',
                          { 'badge-unread': !notification.isRead }
                        )}
                      >
                        <div className="avatar text-center">
                          <img
                            className="avatar-img rounded-circle"
                            src={notification.avatar || avatar7}
                            alt="Avatar"
                          />
                        </div>

                        <div className="ms-3 my-2 my-sm-0  position-relative">
                          <p className="small mb-2 pb-2 text-secondary">
                            {notification.message}
                          </p>
                          {notification.type === "isFriendRequest" && (
                            <div className="d-flex mt-2">
                              <Button variant="primary" size="sm" className="py-1 me-2">
                                Accept
                              </Button>
                              <Button variant="danger-soft" size="sm" className="py-1">
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>

                        <p className="small text-nowrap " style={{
                          padding: '10px',
                          top: '-.5em',
                          right: '0',
                          position: 'absolute',
                        }}>
                          {timeSince(new Date(notification.createdAt))} ago
                        </p>
                      </div>
                    </Link>
                  ))}
                </ul>
              </CardBody>

            </ul>
          </CardBody>

          <CardFooter className="text-center">
            <Link to="/notifications">
              <Button variant="primary-soft" size="sm">
                See all incoming activity
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationDropdown;

