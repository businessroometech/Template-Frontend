import { lazy, Suspense, useEffect, useState } from "react"

const TopHeader = lazy(() => import("@/components/layout/TopHeader"))
import GlightBox from '@/components/GlightBox'
import { useFetchData } from '@/hooks/useFetchData'
import type { ChildrenType } from '@/types/component'
import { RiUserUnfollowFill } from "react-icons/ri";
import clsx from 'clsx'
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
  BsPersonCheckFill,
  BsPersonX,
  BsThreeDots,
} from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa6'

import { PROFILE_MENU_ITEMS } from '@/assets/data/menu-items'
import { getAllUsers } from '@/helpers/data'

import avatar7 from '@/assets/images/avatar/07.jpg'
import background5 from '@/assets/images/bg/05.jpg'

import album1 from '@/assets/images/albums/01.jpg'
import album2 from '@/assets/images/albums/02.jpg'
import album3 from '@/assets/images/albums/03.jpg'
import album4 from '@/assets/images/albums/04.jpg'
import album5 from '@/assets/images/albums/05.jpg'
import { experienceData } from "@/assets/data/layout"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import FallbackLoading from "@/components/FallbackLoading"
import Preloader from "@/components/Preloader"
import axios from "axios"
import { useAuthContext } from "@/context/useAuthContext"
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"
import Loading from "@/components/Loading"
import Followers from "@/app/(social)/feed/(container)/home/components/Followers"

const Experience = () => {



  return (
    <Card>
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
  const allFriends = useFetchData(getAllUsers)

  return (
    <Card>
      <CardHeader className="d-sm-flex justify-content-between align-items-center border-0">
        <CardTitle>
          My Connections <span className="badge bg-danger bg-opacity-10 text-danger ml-5">230</span>
        </CardTitle>
        <Button variant="primary-soft" size="sm">

          View all
        </Button>
      </CardHeader>
      <CardBody className="position-relative pt-0">
        <Row className="g-3">
          {allFriends?.slice(0, 4).map((friend, idx) => (
            <Col xs={6} key={idx}>
              <Card className="shadow-none text-center h-100">
                <CardBody className="p-2 pb-0">
                  <div className={clsx('avatar avatar-xl', { 'avatar-story': friend.isStory })}>
                    <span role="button">
                      <img className="avatar-img rounded-circle" src={friend.avatar} alt="" />
                    </span>
                  </div>
                  <h6 className="card-title mb-1 mt-3">

                    <Link to=""> {friend.name} </Link>
                  </h6>
                  <p className="mb-0 small lh-sm">{friend.mutualCount} mutual connections</p>
                </CardBody>
                <div className="card-footer p-2 border-0">
                  <button className="btn btn-sm btn-primary me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Send message">

                    <BsChatLeftText />
                  </button>
                  <button className="btn btn-sm btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove friend">

                    <BsPersonX />
                  </button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  )
}

 const ConnectionRequest = () => {
  const { user } = useAuthContext();
  const [allFollowers, setAllFollowers] = useState<any[]>([]);
  const [loading, setLoading] = useState<string | null>(null); // Tracks loading by user ID

  useEffect(() => {

    fetchConnections();
  }, [allFollowers]);

  const fetchConnections = async () => {
    try {
      const response = await fetch('https://app-backend-8r74.onrender.com/api/v1/connection/get-connection-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      });

      if (!response.ok) throw new Error('Failed to fetch connection requests.');

      const data = await response.json();
      setAllFollowers(data);
    } catch (error) {
      console.error('Error fetching connection requests:', error);
    }
  };


  const handleStatusUpdate = async (
    userId: string,
    status: 'accepted' | 'rejected'
  ) => {
    setLoading(userId); // Set loading state for the current user
    try {
      const response = await fetch(
        'https://app-backend-8r74.onrender.com/api/v1/connection/update-connection-status',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user?.id,
            connectionId: userId,
            status,
          }),
        }
      );

      if (!response.ok)
        throw new Error(`Failed to ${status} the connection request.`);
      fetchConnections()
      toast.success(`Connection request ${status} successfully.`);
    } catch (error) {
      console.error(`Error while updating connection status:`, error);
      toast.error(`Error while trying to ${status} the connection request.`);
    } finally {
      setLoading(null); // Clear loading state
    }
  };


  return (
    <Card>
      <CardHeader className="pb-0 border-0 d-flex align-items-center justify-content-between">
        <CardTitle className="mb-0" style={{ fontSize: '17px' }}>
          Connection Requests
        </CardTitle>
        {allFollowers.length ? <div className="bg-info p-2 rounded">
          <p className="mb-0 text-white" style={{ fontSize: '14px' }}>
            {allFollowers && allFollowers.length}
          </p>
        </div> : null}
      </CardHeader>

      <CardBody>
        {allFollowers && allFollowers.map((follower, idx) => (
          <div className="d-flex row col-12 mb-3" key={idx}>
            {/* Avatar Section */}
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

            {/* Action Buttons */}
            <div className="col-3 d-flex">
              <Button
                onClick={() => handleStatusUpdate(follower?.requesterDetails?.id, 'rejected')}
                variant="danger-soft"
                className="rounded-circle mx-1 flex-centered"
                disabled={loading === follower?.requesterDetails?.id} // Disable while loading
              >
                {loading === follower?.requesterDetails?.id ? (
                  <Loading size={15} loading={true} /> // Show loading spinner
                ) : (
                  <RiUserUnfollowFill />
                )}
              </Button>
              <Button
                onClick={() => handleStatusUpdate(follower?.requesterDetails?.id, 'accepted')}
                variant="success-soft"
                className="rounded-circle mx-1 flex-centered"
                disabled={loading === follower?.requesterDetails?.id} // Disable while loading
              >
                {loading === follower?.requesterDetails?.id ? (
                  <Loading size={15} loading={true} /> // Show loading spinner
                ) : (
                  <FaUserCheck size={19} className="pe-1" />
                )}
              </Button>
            </div>

          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export const ProfileLayout = ({ children }: ChildrenType) => {
  const { pathname } = useLocation()
  const { user } = useAuthContext();
  console.log(user)
  const [profile, setProfile] = useState({});
  const [sent, setSent] = useState(false)
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    if (profile?.coverImgUrl || profile?.personalDetails) { return }
    fetchUser();

  }, [profile?.personalDetails]);


  const formatDate = (dateString: Date) => {
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


  const fetchUser = async () => {
    try {
      const response = await fetch('https://app-backend-8r74.onrender.com/api/v1/auth/get-user-Profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProfile(data?.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const [loading, setLoading] = useState(false); // Tracks loading state

  const UserRequest = async (userId: string) => {
    setLoading(true); // Set loading to true when request starts
    const apiUrl = sent
      ? "https://app-backend-8r74.onrender.com/api/v1/connection/send-connection-request"
      : "https://app-backend-8r74.onrender.com/api/v1/connection/unsend-connection-request";
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requesterId: user?.id,
          receiverId: userId,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to ${sent ? "send" : "unsend"} connection request.`);
      }
      const data = await res.json();
      setSent(!sent); // Toggle sent status
      toast.success(`Connection request ${sent ? "sent" : "unsent"} successfully.`);
      fetchUser(); // Refresh user data
    } catch (error) {
      console.error(
        `Error while trying to ${sent ? "send" : "unsend"} connection request:`,
        error
      );
      toast.error(`Failed to ${sent ? "send" : "unsend"} connection request.`);
    } finally {
      setLoading(false); // Reset loading state
    }
  };


  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Preloader />}>
        <TopHeader />
      </Suspense>
      <main>
        <Container>
          <Row className="g-4">
            {/* Main Profile Section */}
            <Col lg={8} className="vstack gap-4">
              <Card>
                {/* Profile Cover Image */}
                <div
                  className="h-200px rounded-top"
                  style={{
                    backgroundImage: `url(${profile?.coverImgUrl ? profile?.coverImgUrl : background5})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                <CardBody className="py-0">
                  {/* Profile Info Section */}
                  <div className="d-sm-flex align-items-start text-center text-sm-start">
                    {/* Profile Picture */}
                    <div>
                      <div className="avatar avatar-xxl mt-n5 mb-3">
                        <img
                          className="avatar-img rounded-circle border border-white border-3"
                          src={profile.profileImgUrl ? profile.profileImgUrl : avatar7}
                          alt="avatar"
                        />
                      </div>
                    </div>
                    {/* Name and Bio */}
                    <div className="ms-sm-4 mt-sm-3">
                      <h1 className="mb-0 h5">
                        {/*profile?.personalDetails?.firstName} {profile?.personalDetails?.lastName*/}{' '}
                        {profile?.personalDetails?.firstName + " " + profile?.personalDetails?.lastName}
                        <BsPatchCheckFill className="text-success small" />
                      </h1>
                      <p>{profile.connectionsCount ? profile.connectionsCount : 0} connections</p>
                    </div>
                    {/* Action Buttons */}
                    <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                      {user?.id === profile?.personalDetails?.id ? (
                        <Button
                          variant="danger-soft"
                          className="me-2"
                          type="button"
                          onClick={() => navigate("/settings/account")}
                        >
                          <BsPencilFill size={19} className="pe-1" />
                        </Button>
                      ) : (
                        <Button
                          variant={sent ? "success-soft" : "primary-soft"}
                          className="me-2"
                          type="button"
                          onClick={() => UserRequest(profile?.personalDetails?.id)}
                          disabled={loading} // Disable button while loading
                        >
                          {loading ? (
                            <Loading size={15} loading={true} /> // Show loading spinner
                          ) : sent ? (
                            <>
                              <FaUserCheck size={19} className="pe-1" /> Request sent
                            </>
                          ) : (
                            <>
                              <FaUserPlus size={19} className="pe-1" /> Send connection request
                            </>
                          )}
                        </Button>

                      )}
                      <Dropdown>
                        <DropdownToggle
                          as="a"
                          className="icon-md btn btn-light content-none"
                          id="profileAction2"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
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
                      <BsBriefcase className="me-1" /> {profile?.personalDetails?.occupation ? profile?.personalDetails?.occupation : user.userRole}
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
                        <Link
                          className={clsx('nav-link', { active: pathname === item.url })}
                          to={item.url ?? ''}
                        >
                          {item.label}{' '}
                          {item.badge && (
                            <span className="badge bg-success bg-opacity-10 text-success small">
                              {item.badge.text}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardFooter>
              </Card>
              {<Suspense fallback={<FallbackLoading />}>{children}</Suspense>}
            </Col>

            {/* Sidebar Section */}
            <Col lg={4}>
              <Row className="g-4">
                {/* About Card */}


                <Col md={6} lg={12}>
                  <Card>
                    <CardHeader className="border-0 pb-0">
                      {/* <CardTitle>View My Business Profile</CardTitle> */}
                    </CardHeader>

                    <CardBody className="position-relative pt-0">

                      <Button
                        className="w-100"
                        style={{
                          backgroundColor: "#1ea1f3",
                          color: "white",
                        }}
                        onClick={() => {
                          navigate("/feed/groups");
                        }}
                      >
                        View My Business Profile
                      </Button>

                      {/* <p>{profile?.personalDetails?.bio}</p> */}
                      {/* <p>
                        {profile?.personalDetails?.bio}
                      </p>
                      <ul className="list-unstyled mt-3 mb-0">
                        <li className="mb-2">
                          <BsCalendarDate size={18} className="fa-fw pe-1" /> Born:{' '}
                          <strong>{profile?.personalDetails?.dob}</strong>
                        </li>
                        <li className="mb-2">
                          {(profile?.personalDetails?.gender !== "male" || profile?.personalDetails?.gender !== "Male") ? <BsGenderFemale size={18} className="fa-fw pe-1" /> : <BsGenderMale size={18} className="fa-fw pe-1" />} Gender: <strong>{profile?.personalDetails?.gender}</strong>
                        </li>
                        <li>
                          <BsEnvelope size={18} className="fa-fw pe-1" /> Email:{' '}
                          <strong>{profile?.personalDetails?.emailAddress}</strong>
                        </li>
                      </ul>
                     */}
                    </CardBody>
                  </Card>
                </Col>
                
                <ConnectionRequest />
                {/* Additional Components */}
                <Col md={6} lg={12}>
                  <Friends />
                </Col>
                {/* <Col md={6} lg={12}>
                  <Photos />
                </Col> */}
                <Col md={6} lg={12}>
                  <Followers />
                </Col>
                <Col md={6} lg={12}>
                  <Experience />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </main>


    </>
  )
}
export default ProfileLayout