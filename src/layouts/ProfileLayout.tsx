import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import avatar from '@/assets/images/avatar/default avatar.png'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Check, MessageCircleMore } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const TopHeader = lazy(() => import('@/components/layout/TopHeader'));

import GlightBox from '@/components/GlightBox'
import { useFetchData } from '@/hooks/useFetchData'
import type { ChildrenType } from '@/types/component'
import { RiUserUnfollowFill } from 'react-icons/ri'
import { Navigate } from 'react-router-dom';
import clsx from 'clsx'
import EditProfilePictureModal from "../components/cards/EditProfilePictureModal";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Image,
  Row,
} from 'react-bootstrap'
import {
  BsBookmark,
  BsBriefcase,
  BsCalendar2Plus,
  BsCalendarDate,
  BsChatLeftText,
  BsEnvelope,
  BsFileEarmarkPdf,
  BsGear,
  BsGenderFemale,
  BsGenderMale,
  BsGeoAlt,
  BsHeart,
  BsLock,
  BsPatchCheckFill,
  BsPencilFill,
  BsPersonAdd,
  BsPersonCheckFill,
  BsPersonX,
  BsThreeDots,
} from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa6'

// import { PROFILE_MENU_ITEMS } from '@/assets/data/menu-items'
import { getAllUsers } from '@/helpers/data'

import avatar7 from '@/assets/images/avatar/default avatar.png'
import background5 from '@/assets/images/bg/Profile-Bg.jpg'
import album1 from '@/assets/images/albums/01.jpg'
import album2 from '@/assets/images/albums/02.jpg'
import album3 from '@/assets/images/albums/03.jpg'
import album4 from '@/assets/images/albums/04.jpg'
import album5 from '@/assets/images/albums/05.jpg'
import { experienceData } from '@/assets/data/layout'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import FallbackLoading from '@/components/FallbackLoading'
import Preloader from '@/components/Preloader'
import axios from 'axios'
import { useAuthContext } from '@/context/useAuthContext'
import { FaTimes, FaUserCheck, FaUserPlus } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import Loading from '@/components/Loading'
import Followers from '@/app/(social)/feed/(container)/home/components/Followers'
import { set } from 'react-hook-form'
import { LIVE_URL } from '@/utils/api';

const Experience = () => {
  return null;
  return (
    <Card style={{ marginTop: '25px' }}>
      <CardHeader className="d-flex justify-content-between border-0">
        <h5 className="card-title">Suggested Pages</h5>
        <Button variant="primary-soft" size="sm">
          <FaPlus />
        </Button>
      </CardHeader>
      <CardBody className="position-relative pt-0">
        {experienceData.map((experience, idx) => (
          <div className="d-flex" key={idx}>
            <div className="avatar me-3">
              <span role="button">
                <img className="avatar-img rounded-circle" src={experience.logo} alt="" />
              </span>
            </div>
            <div>
              <h6 className="card-title mb-0">
                <Link to=""> {experience.title} </Link>
              </h6>
              <p className="small">
                {experience.description}
                <Link className="btn btn-primary-soft btn-xs ms-2" to="">
                  Edit
                </Link>
              </p>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

const Photos = () => {
  return (
    <Card>
      <CardHeader className="d-sm-flex justify-content-between border-0">
        <CardTitle>Photos</CardTitle>
        <Button variant="primary-soft" size="sm">
          See all photo
        </Button>
      </CardHeader>
      <CardBody className="position-relative pt-0">
        <Row className="g-2">
          <Col xs={6}>
            <GlightBox href={album1} data-gallery="image-popup">
              <img className="rounded img-fluid" src={album1} alt="album-image" />
            </GlightBox>
          </Col>
          <Col xs={6}>
            <GlightBox href={album2} data-gallery="image-popup">
              <img className="rounded img-fluid" src={album2} alt="album-image" />
            </GlightBox>
          </Col>
          <Col xs={4}>
            <GlightBox href={album3} data-gallery="image-popup">
              <img className="rounded img-fluid" src={album3} alt="album-image" />
            </GlightBox>
          </Col>
          <Col xs={4}>
            <GlightBox href={album4} data-gallery="image-popup">
              <img className="rounded img-fluid" src={album4} alt="album-image" />
            </GlightBox>
          </Col>
          <Col xs={4}>
            <GlightBox href={album5} data-gallery="image-popup">
              <img className="rounded img-fluid" src={album5} alt="album-image" />
            </GlightBox>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const Friends = () => {
  const { pathname } = useLocation()
  const { user } = useAuthContext()
  const [profile, setProfile] = useState({})
  const [sent, setSent] = useState(false)
  const [allFollowers, setAllFollowers] = useState<any[]>([])
  const [limit, setLimit] = useState(6)
  const [skeletonLoading, setSkeletonLoading] = useState(true)
  const [totalUsers, SetTotalUsers] = useState(0)
  const [sentStatus, setSentStatus] = useState<{ [key: string]: boolean }>({})
  const [loading, setLoading] = useState<string | null>(null) // Track loading state by user ID
  const skeletonBaseColor = '#e3e3e3'
  const skeletonHighlightColor = '#f2f2f2'
  useEffect(() => {
    if (allFollowers.length > 0) {
      return
    }
    fetchConnectionSuggestions()
  }, [allFollowers])

  const fetchConnectionSuggestions = async () => {
    try {
      setSkeletonLoading(true)
      const response = await fetch(`${LIVE_URL}api/v1/connection/get-connection-suggest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          page: 1,
          limit: limit,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch connection suggestions')
      }
      setSkeletonLoading(false)
      const data = await response.json()
      setAllFollowers(data.data)
      SetTotalUsers(data?.total)
    } catch (error) {
      console.error('Error fetching connection suggestions:', error)
    } finally {
      setSkeletonLoading(false)
    }
  }
}

export const ConnectionRequest = () => {
  const { user } = useAuthContext();
  const [allFollowers, setAllFollowers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // For global loading state
  const navigate = useNavigate();
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: 'accepted' | 'rejected' | null }>({});

  useEffect(() => {
    fetchConnections();
  }, [user]);

  const fetchConnections = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${LIVE_URL}api/v1/connection/get-connection-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      });

      if (!response.ok) throw new Error('Failed to fetch connection requests.');
      const data = await response.json();
      setAllFollowers(data);
    } catch (error) {
      console.error('Error fetching connection requests:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleStatusUpdate = async (userId: string, status: 'accepted' | 'rejected') => {
    setLoadingStates((prev) => ({ ...prev, [userId]: status }));
    try {
      const response = await fetch(`${LIVE_URL}api/v1/connection/update-connection-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          connectionId: userId,
          status,
        }),
      });
      if (!response.ok) throw new Error(`Failed to ${status} the connection request.`);
      toast.success(`Connection request ${status} successfully.`);
      await fetchConnections();
    } catch (error) {
      console.error(`Error while updating connection status:`, error);
      toast.error(`Error while trying to ${status} the connection request.`);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [userId]: null }));
    }
  };

  // Conditional loading spinner
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center bg-light"
        style={{ height: '100vh' }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: '4rem', height: '4rem', borderWidth: '6px' }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Card>
      {allFollowers.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
          <div className="text-center">
            <p
              className="mb-0"
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#6c757d',
                opacity: '0.8',
              }}
            >
              No connection requests found
            </p>
            <p className="small text-muted">
              It looks like you have no new connection requests at the moment.
            </p>
          </div>
        </div>
      ) : (
        <CardBody>
          {allFollowers.map((follower, idx) => (
            <div className="d-flex row col-12 mb-3" key={idx}>
              <div className="col-8 d-flex">
                <div className={clsx('avatar', { 'avatar-story': follower.isStory })}>
                  <span role="button">
                    <img
                      className="avatar-img rounded-circle"
                      src={follower.profilePictureUploadUrl || avatar7}
                      alt={`${follower?.requesterDetails?.firstName} ${follower?.requesterDetails?.lastName}`}
                    />
                  </span>
                </div>
                <div className="overflow-hidden px-2">
                  <Link className="h6 mb-0" to="">
                    {follower?.requesterDetails?.firstName} {follower?.requesterDetails?.lastName}
                  </Link>
                  <p className="mb-0 small text-truncate">{follower?.requesterDetails?.userRole}</p>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <Button
                  onClick={() => handleStatusUpdate(follower?.requesterDetails?.id, 'rejected')}
                  variant="danger-soft"
                  className="mx-1"
                  disabled={loadingStates[follower?.requesterDetails?.id] === 'rejected'}
                  style={{ transition: 'background-color 0.3s', minWidth: '120px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8d7da')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  {loadingStates[follower?.requesterDetails?.id] === 'rejected' ? (
                    <Loading size={15} loading={true} />
                  ) : (
                    'Decline'
                  )}
                </Button>
                <Button
                  onClick={() => handleStatusUpdate(follower?.requesterDetails?.id, 'accepted')}
                  variant="success-soft"
                  className="mx-1"
                  disabled={loadingStates[follower?.requesterDetails?.id] === 'accepted'}
                  style={{ transition: 'background-color 0.3s', minWidth: '120px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d4edda')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  {loadingStates[follower?.requesterDetails?.id] === 'accepted' ? (
                    <Loading size={15} loading={true} />
                  ) : (
                    'Approve'
                  )}
                </Button>
              </div>
            </div>
          ))}
        </CardBody>
      )}
    </Card>
  );
};

export const ProfileLayout = ({ children }: ChildrenType) => {
  const { pathname } = useLocation()
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [skeletonLoading, setSkeletonLoading] = useState(true)
  const [profile, setProfile] = useState({})
  const [sent, setSent] = useState(false)
  const { id } = useParams()
  const skeletonBaseColor = '#b0b0b0'
  const skeletonHighlightColor = '#d6d6d6'
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [coverModal, setCoverModal] = useState<boolean>(false);
  const [count, setCount] = useState(0);
  const hasMount = useRef(false);

  useEffect(() => {
    if (profile?.coverImgUrl || profile?.personalDetails) {
      return
    }
    fetchUser()
  }, [profile?.personalDetails])

  useEffect(() => {
    if (!skeletonLoading && !msg && count === 0) {
      if (id !== user?.id) {
        recordProfileVisit(); 
        setCount(1)
      }
      return
    }
  }, [user?.id, msg, count, skeletonLoading]); 

  

  // useEffect(() => {
  //   if(hasMount.current)  {window.location.reload()}
  //   hasMount.current = true
  // },[id])
  
  const recordProfileVisit = async () => {
    setCount(1)
    try {
      const response = await fetch(
        `${LIVE_URL}api/v1/auth/recored-visit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitorId: user?.id,
            visitedId:  id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMsg(data?.message);
    } catch (error) {
      console.error("Error recording profile visit:", error);
    } finally {
      setSkeletonLoading(false);
    }
  };

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }
    return date.toLocaleString('en-GB', options).replace(',', ' at')
  }



  const fetchUser = async () => {
    try {
      setSkeletonLoading(true)
      const response = await fetch(`${LIVE_URL}api/v1/auth/get-user-Profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          profileId: user?.id,
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
      setSkeletonLoading(false)
      setProfile(data?.data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setSkeletonLoading(false)
    }
  }

  const UserRequest = async () => {
    setLoading(true)
    const apiUrl = `${LIVE_URL}api/v1/connection/send-connection-request`
        try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requesterId: user?.id,
          receiverId: id,
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to send connection request.`)
      }

      setSent(true) // Toggle sent status
      toast.success(`Connection request sent successfully.`)
      // fetchUser()
    } catch (error) {
      console.error(`Error while sending connection request:`, error)
      setSent(false)
      toast.error(`Failed to send connection request.`)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    setLoading(true)
    const apiUrl = `${LIVE_URL}api/v1/connection/unsend-connection-request`

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requesterId: user?.id,
          receiverId: id,
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to unsend connection request.`)
      }

      setSent(false)
      toast.info(`Connection request unsent successfully.`)
      fetchUser()
    } catch (error) {
      console.error(`Error while unsending connection request:`, error)
      toast.error(`Failed to unsend connection request.`)
    } finally {
      setLoading(false)
    }
  }

  const PROFILE_MENU_ITEMS = [
    {
      key: 'profile-feed',
      label: 'Feed',
      url: `/profile/feed/${id}`,
      parentKey: 'pages-profile',
    },
    {
      key: 'profile-about',
      label: 'About',
      url: `/profile/about/${id}`,
      parentKey: 'pages-profile',
    },
    {
      key: 'profile-connections',
      label: 'Connections',
      url: `/profile/connections/${id}`,
      badge: {
        text: profile.connectionsCount,
        // text: profile.connectionsCount,
        variant: 'success',
      },
      parentKey: 'pages-profile',
    },
    // {
    //   key: 'profile-media',
    //   label: 'Media',
    //   url: `/profile/media/${id}`,
    //   parentKey: 'pages-profile',
    // },
    // {
    //   key: 'profile-videos',
    //   label: 'Videos',
    //   url: `/profile/videos/${id}`,
    //   parentKey: 'pages-profile',
    // },
    {
      key: 'profile-events',
      label: 'Events',
      url: `/profile/events/${id}`,
      parentKey: 'pages-profile',
    },
    {
      key: 'profile-activity',
      label: 'Activity',
      url: `/profile/activity/${id}`,
      parentKey: 'pages-profile',
    },
  ]

  return (
    <div style={{}}>
    <ToastContainer />
    <Suspense fallback={<Preloader />}>
      <TopHeader />
    </Suspense>
    
    <main className="bg-pink px-3 px-md-5" style={{marginRight : '2%'}}>
      <EditProfilePictureModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onPhotoUpdate={() => console.log('press')}
        src={profile.profileImgUrl ? profile.profileImgUrl : avatar7}
      />
      <EditProfilePictureModal
        show={coverModal}
        onHide={() => setCoverModal(false)}
        onPhotoUpdate={() => console.log('press')}
        src={profile.coverImgUrl ? profile.coverImgUrl : avatar7}
        forCover={true}
      />
      
      <Row className="g-4">
        {/* Main Profile Section */}
        <Col md={12} lg={9} className="vstack gap-4" style={{ paddingRight : '50px',paddingLeft : '30px'}}>
          <Card style={{}}>
           {/* Profile Cover Image */}
           <div className="h-200px rounded-top position-relative">
                  {skeletonLoading ? (
                    <Skeleton width="100%" height="20px" baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
                  ) : (
                    <div
                      className="h-200px rounded-top"
                      onClick={() => {if(user?.id === id)setCoverModal(true)}}
                    >
                      <Image
                        src={profile?.coverImgUrl ? profile?.coverImgUrl : background5}
                        alt="Profile Cover"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  )}
                </div>
                <CardBody className="py-0">
                  {/* Profile Info Section */}
                  <div className="d-sm-flex align-items-start text-center text-sm-start">
                    {/* Profile Picture */}
                    <div>
                      <div className="avatar avatar-xxl mt-n5 mb-3">
                        {skeletonLoading ? (
                          <Skeleton circle width={120} height={120} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
                        ) : (
                          <img
                            onClick={() => {if(user?.id === id)setShowModal(true)}}
                            className="avatar-img rounded-circle border border-white border-3"
                            src={profile.profileImgUrl ? profile.profileImgUrl : avatar7}
                            alt="avatar"
                          />
                        )}
                      </div>
                    </div>
                    {/* Name and Bio */}
                    <div className="ms-sm-4 mt-sm-3">
                      <h1 className="mb-0 h5 d-flex align-items-center">
                        {profile?.personalDetails?.firstName ? (
                          profile.personalDetails.firstName
                        ) : (
                          <Skeleton width={90} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
                        )}
                        &nbsp;
                        {profile?.personalDetails?.lastName ? (
                          profile.personalDetails.lastName
                        ) : (
                          <Skeleton width={60} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
                        )}
                        &nbsp;
                        <BsPatchCheckFill className="text-success small" />
                      </h1>
                      <p>
                        {!skeletonLoading ? (
                          `${profile.connectionsCount} connections`
                        ) : (
                          <Skeleton width={80} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
                        )}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                      {user?.id === id ? (
                        <Button variant="danger-soft" className="me-2" type="button" onClick={() => navigate('/settings/account')}>
                          <BsPencilFill size={19} className="pe-1" />
                        </Button>
                      ) : !profile.connectionsStatus ? (
                        <>
                          {sent && (
                            <Button variant="danger-soft" className="me-2" type="button" onClick={handleCancel} disabled={loading}>
                              {loading ? (
                                <Loading size={15} loading={true} />
                              ) : (
                                <>
                                  <FaTimes size={19} className="pe-1" /> Cancel Send Request
                                </>
                              )}
                            </Button>
                          )}

                          {!sent && (
                            <Button
                              variant={sent ? 'success-soft' : 'primary-soft'}
                              className="me-2"
                              type="button"
                              onClick={() => UserRequest(profile?.personalDetails?.id)}
                              disabled={loading || sent}>
                              {loading ? (
                                <Loading size={15} loading={true} />
                              ) : sent ? (
                                <>
                                  <FaUserCheck size={19} className="pe-1" /> Request Sent
                                </>
                              ) : (
                                <>
                                  <FaUserPlus size={19} className="pe-1" /> Send Connection Request
                                </>
                              )}
                            </Button>
                          )}
                        </>
                      ) : (
                        <><Button
                            variant={profile.connectionsStatus === 'pending'
                              ? 'warning-soft'
                              : profile.connectionsStatus === 'accepted'
                                ? 'success-soft'
                                : profile.connectionsStatus === 'rejected'
                                  ? 'danger-soft'
                                  : 'secondary-soft'}
                            className="me-2"
                            type="button">
                            {profile.connectionsStatus === 'accepted' ? (
                              <>
                                <MessageCircleMore className="me-2 text-success" /> Send Message
                              </>
                            ) : (
                              profile.connectionsStatus
                            )}
                          </Button><Button
                            variant={sent ? 'success-soft' : 'primary-soft'}
                            className="me-2"
                            type="button"
                            onClick={() => UserRequest(profile?.personalDetails?.id)}
                            disabled={loading || sent}>
                              {loading ? (
                                <Loading size={15} loading={true} />
                              ) : sent ? (
                                <>
                                  <FaUserCheck size={19} className="pe-1" /> Request Sent
                                </>
                              ) : (
                                <>
                                  <FaUserPlus size={19} className="pe-1" /> Send Connection Request
                                </>
                              )}
                            </Button></>
                      )}

                      <Dropdown>
                        <DropdownToggle
                          as="a"
                          className="icon-md btn btn-light content-none"
                          id="profileAction2"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          <BsThreeDots />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end" aria-labelledby="profileAction2">
                          <DropdownItem>
                            <BsBookmark size={22} className="fa-fw pe-2" /> Share profile in a message
                          </DropdownItem>
                          <DropdownItem>
                            <BsFileEarmarkPdf size={22} className="fa-fw pe-2" /> Save your profile to PDF
                          </DropdownItem>
                          <DropdownItem>
                            <BsLock size={22} className="fa-fw pe-2" /> Lock profile
                          </DropdownItem>
                          <hr className="dropdown-divider" />
                          <DropdownItem>
                            <BsGear size={22} className="fa-fw pe-2" /> Profile settings
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                  {/* Profile Details */}
                  <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
                    <li className="list-inline-item">
                      <BsBriefcase className="me-1" /> {profile?.personalDetails?.occupation ? profile?.personalDetails?.occupation.replace(/^entrepreneur$/i, 'Entrepreneur') : user.userRole.replace(/^entrepreneur$/i, 'Entrepreneur')}
                    </li>
                    <li className="list-inline-item">
                      <BsGeoAlt className="me-1" />{' '}
                      {profile?.personalDetails?.permanentAddress?.city ? profile?.personalDetails?.permanentAddress?.city : user.country}{' '}
                      {profile?.personalDetails?.permanentAddress?.state}
                    </li>
                    {/* <li className="list-inline-item">
                      <BsCalendar2Plus className="me-1" /> Joined on :  {formatDate(user.createdAt)}
                      {profile?.personalDetails?.createdAt &&
                        formatDate(profile.personalDetails?.createdAt)}
                    </li> */}
                  </ul>
                </CardBody>
                <CardFooter className="card-footer mt-3 pt-2 pb-0">
                  <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
                    {PROFILE_MENU_ITEMS.map((item, idx) => (
                      <li className="nav-item" key={idx}>
                        <Link className={clsx('nav-link', { active: pathname === item.url })} to={item.url ?? ''}>
                          {item.label} {item.badge && <span className="badge bg-success bg-opacity-10 text-success small">{item.badge.text}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardFooter>
          </Card>
          <div className="w-100" style={{}}>
            <Suspense fallback={<FallbackLoading />}>{children}</Suspense>
          </div>
        </Col>
  
        {/* Sidebar Section */}
        <Col md={12} lg={3}>
          <Row>
            <Col md={6} lg={12}>
              <Followers />
            </Col>
            <Col md={6} lg={12}>
              <Experience />
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  </div>
  )
}
export default ProfileLayout
