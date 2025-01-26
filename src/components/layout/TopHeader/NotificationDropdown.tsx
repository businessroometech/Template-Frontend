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
import { useAuthContext } from '@/context/useAuthContext';
import avatar4 from '@/assets/images/avatar/04.jpg'

import { io, Socket } from "socket.io-client";
import avatar7 from '@/assets/images/avatar/default avatar.png'
import { Bell } from 'lucide-react';

const NotificationDropdown = () => {
  const { user } = useAuthContext();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [allNotifications, setAllNotifications] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [notiAbout,setNotiAbout] = useState<boolean>(false);
console.log("isConnected",isConnected);

  // Request notification permission on component mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted.");
          } else {
            console.log("Notification permission denied.");
          }
        })
        .catch((err) => console.error("Error requesting notification permission:", err));
    }
  }, []);

  // Establish the Socket.IO connection
  useEffect(() => {
    if (!user?.id) return;

    const socketConnection = io("http://54.177.193.30:5000", {
      query: { userId: user.id },
    });

    setSocket(socketConnection);

    // Handle connection status
    socketConnection.on("connect", () => {
      console.log("Socket.IO connected");
      setIsConnected(true);
    });

    // Handle disconnection
    socketConnection.on("disconnect", () => {
      console.log("Socket.IO disconnected");
      setIsConnected(false);
    });

    // Listen for new notifications
    socketConnection.on("notifications", (notification: any) => {
      console.log("New notification received:", notification);
      setAllNotifications((prev) => [notification, ...prev]);

      // Show browser notification
      if (Notification.permission === "granted") {
        new Notification(notification.message, {
          body: notification.mediaUrl ? "You have a new media notification." : "Check your notifications!",
          icon: "/notification-icon.png", // Replace with your notification icon path
        });
      }
    });

    // Clean up on component unmount
    return () => {
      socketConnection.disconnect();
    };
  }, [user?.id]);

  // Fetch existing notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `http://54.177.193.30:5000/api/v1/socket-notifications/get?userId=${user?.id}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      const data = await response.json();
      if (data?.notifications) {
        setAllNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Fetch notifications when the component mounts
  useEffect(() => {
    fetchNotifications();
  }, [user?.id]);


  const handleOnRead = async (notificationId: string) => {
    try {
      const response = await fetch(
        'http://54.177.193.30:5000/api/v1/socket-notifications/mark-read',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notificationId:notificationId }),
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
      allNotifications.map((notification) => notification.id);

      const response = await fetch(
        'http://54.177.193.30:5000/api/v1/socket-notifications/mark-all-read',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user?.id }),
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
              Notifications
              <span className="badge bg-danger bg-opacity-10 text-danger ms-2">
                {allNotifications.slice(0, 4).filter((n) => !n.isRead).length} new
              </span>
            </h6>
            <Link className="small" to="#" onClick={handleReadAll}>
              Read all
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
                            src={notification.mediaUrl || avatar7} 
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
                          {timeSince(new Date(notification.createdAt))}
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

