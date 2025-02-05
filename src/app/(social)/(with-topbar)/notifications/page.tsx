import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/useAuthContext';
import PageMetaData from '@/components/PageMetaData';
import LoadMoreButton from './components/LoadMoreButton';
import avatar7 from '@/assets/images/avatar/default avatar.png'
import clsx from 'clsx';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Image,
  Row,
} from 'react-bootstrap';
import {
  BsBell,
  BsBellSlash,
  BsCheckLg,
  BsThreeDots,
  BsTrash,
  BsVolumeMute,
} from 'react-icons/bs';
import { timeSince } from '@/utils/date';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import { LIVE_URL } from '@/utils/api';

const Notifications = () => {
  const { user } = useAuthContext();
  const [allNotifications, setAllNotifications] = useState([]);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `${LIVE_URL}api/v1/notifications/fetch`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ userId: user?.id }),
        }
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
    if (user?.id) fetchNotifications();
  }, [user?.id]);

  // Mark a single notification as read
  const handleOnRead = async (notificationId:string) => {
    try {
      await fetch(`${LIVE_URL}api/v1/socket-notifications/mark-read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId }),
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const handleReadAll = async () => {
    try {
      const response = await fetch(
        `${LIVE_URL}api/v1/socket-notifications/mark-all-read`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
    <>
      <PageMetaData title="Notifications" />
      <main>
        <Container>
          <Row className="g-4">
            <Col lg={8} className="mx-auto">
              <Card>
                <CardHeader className="py-3 border-0 d-flex align-items-center justify-content-between">
                  <h1 className="h5 mb-0">Notifications</h1>
                  <Dropdown>
                    <DropdownToggle
                      as="a"
                      className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
                    >
                      <BsThreeDots />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      <DropdownItem onClick={handleReadAll}>
                        <BsCheckLg size={22} className="fa-fw pe-2" />
                        Mark all read
                      </DropdownItem>
                      <DropdownItem>
                        <BsBellSlash size={22} className="fa-fw pe-2" />
                        Push notifications
                      </DropdownItem>
                      <DropdownItem>
                        <BsBell size={22} className="fa-fw pe-2" />
                        Email notifications
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </CardHeader>
                <CardBody className="p-2">
                  <ul className="list-unstyled">
                    {allNotifications.length > 0 ? (
                      allNotifications.map((notification) => (
                        <Link to={notification.navigation} key={notification.id}>
                          <div
                            onClick={() => handleOnRead(notification.id)}
                            className={clsx(
                              'rounded d-sm-flex border-0 mb-1 p-3 position-relative cursor-pointer',
                              { 'badge-unread': !notification.isRead }
                            )}
                          >
                            <div className="avatar text-center">
                            <Image
                              className="avatar-img rounded-circle"
                              src={notification?.mediaUrl ? notification?.mediaUrl : avatar7}
                              alt="Avatar"
                            />
                            </div>
                            <div className="mx-sm-3 my-2 my-sm-0">
                              <p className="small mb-2 text-secondary">
                                {notification.message}
                              </p>
                              {notification.type === 'isFriendRequest' && (
                                <div className="d-flex">
                                  <Button variant="primary" size="sm" className="py-1 me-2">
                                    Accept
                                  </Button>
                                  <Button variant="danger-soft" size="sm" className="py-1">
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </div>
                            <div className="d-flex ms-auto">
                              <p className="small me-5 text-nowrap">
                                {timeSince(new Date(notification.createdAt))}
                              </p>
                              <Dropdown className="position-absolute end-0 top-0 mt-3 me-3">
                                <DropdownToggle
                                  as="a"
                                  className="text-secondary btn position-relative py-0 px-2"
                                >
                                  <BsThreeDots />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                  <DropdownItem>
                                    <BsTrash size={22} className="fa-fw pe-2" />
                                    Delete
                                  </DropdownItem>
                                  <DropdownItem>
                                    <BsBellSlash size={22} className="fa-fw pe-2" />
                                    Turn off
                                  </DropdownItem>
                                  <DropdownItem>
                                    <BsVolumeMute size={22} className="fa-fw pe-2" />
                                    Mute
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <Loading loading={true} size={50} />
                    )}
                  </ul>
                </CardBody>
                <CardFooter className="text-center">
                  <p>No more notification</p>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Notifications;
