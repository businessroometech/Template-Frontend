import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/useAuthContext';
import PageMetaData from '@/components/PageMetaData';
import LoadMoreButton from './components/LoadMoreButton';
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
import avatar4 from '@/assets/images/avatar/04.jpg'
import { Link } from 'react-router-dom';

const Notifications = () => {
  const { user } = useAuthContext();
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        'https://app-backend-8r74.onrender.com/api/v1/notifications/fetch',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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

  const handleOnRead = async (notificationId) => {
    try {
      await fetch(
        'https://app-backend-8r74.onrender.com/api/v1/notifications/mark-as-read',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notificationId }),
        }
      );
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
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
                      id="cardNotiAction"
                      aria-expanded="false"
                    >
                      <BsThreeDots />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      <DropdownItem onClick={() => allNotifications.forEach((n) => handleOnRead(n.id))}>
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
                    {allNotifications?.map((notification) => (
                       <Link to={notification.navigation} key={notification.id}>
                        <div onClick={() => handleOnRead(notification.id)}
                          className={clsx(
                            'rounded d-sm-flex border-0 mb-1 p-3 position-relative cursor-pointer',
                            { 'badge-unread': !notification.isRead }
                          )}
                        >
                          <div className="avatar text-center">
                            {notification.avatar ? (
                              <img
                                className="avatar-img rounded-circle"
                                src={notification.avatar}
                                alt={notification.avatar}
                              />
                            ) : (
                              <img
                                className="avatar-img rounded-circle"
                                src={avatar4}
                                alt="Avatar"
                              />
                            )}
                          </div>
                          <div className="mx-sm-3 my-2 my-sm-0">
                            <p className="small mb-2 text-secondary">{notification.message}</p>
                            {notification.type === 'isFriendRequest' && (
                              <div className="d-flex">
                                <Button
                                  variant="primary"
                                  size="sm"
                                  className="py-1 me-2"
                                >
                                  Accept
                                </Button>
                                <Button
                                  variant="danger-soft"
                                  size="sm"
                                  className="py-1"
                                >
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
                                aria-expanded="false"
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
                    ))}
                  </ul>
                </CardBody>
                <CardFooter className="border-0 py-3 text-center">
                  <LoadMoreButton />
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
