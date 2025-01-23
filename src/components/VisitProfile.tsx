import { useAuthContext } from "@/context/useAuthContext";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import avatar7 from '@/assets/images/avatar/default avatar.png'
import { Link } from "react-router-dom";
import { BsPersonCheckFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

export const formatTimestamp = (createdAt: Date): string => {
  const now = Date.now();
  const createdTime = new Date(createdAt).getTime();
  const secondsAgo = Math.floor((now - createdTime) / 1000);

  if (secondsAgo < 60) return `just now`;

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo}m`;

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo}h`;

  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 7) return `${daysAgo}d`;

  const weeksAgo = Math.floor(daysAgo / 7);
  if (weeksAgo < 52) return `${weeksAgo}w`;

  const monthsAgo = Math.floor(weeksAgo / 4);
  if (monthsAgo < 12) return `${monthsAgo}mo`;

  const yearsAgo = Math.floor(monthsAgo / 12);
  return `${yearsAgo}y`;
};

const ProfileVisits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sentStatus, setSentStatus] = useState({});
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProfileVisits = async () => {
      try {
        const response = await fetch(' https://strengthholdings.com/api/v1/auth/get-profile-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user?.id }),
        });

        if (response.ok) {
          const data = await response.json();
          setVisits(data?.data || []);
        } else {
          console.error('Failed to fetch profile visits');
        }
      } catch (error) {
        console.error('Error fetching profile visits:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchProfileVisits();
    }
  }, [user]);

  const handleUserRequest = async (userId: string) => {
    const newSentStatus = { ...sentStatus };
    const isSending = !sentStatus[userId];
    newSentStatus[userId] = isSending;
    setSentStatus(newSentStatus);
    setLoading(userId);

    const apiUrl = isSending
      ? 'https://strengthholdings.com/api/v1/connection/send-connection-request'
      : 'https://strengthholdings.com/api/v1/connection/unsend-connection-request';

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requesterId: user?.id,
          receiverId: userId,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to ${isSending ? 'send' : 'unsend'} connection request.`);
      }

      const data = await res.json();
      console.log(`Connection request ${isSending ? 'sent' : 'unsent'} successfully:`, data);
      toast.success(`Connection request ${isSending ? 'sent' : 'unsent'} successfully.`);
    } catch (error) {
      console.error(`Error while trying to ${isSending ? 'send' : 'unsend'} connection request:`, error);
      const revertedStatus = { ...newSentStatus, [userId]: !isSending };
      setSentStatus(revertedStatus);
      toast.error(`Failed to ${isSending ? 'send' : 'unsend'} connection request.`);
    } finally {
      setLoading(null);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (visits.length === 0) {
    return <div className="text-center mt-5">No profile visits found.</div>;
  }

  return (
    <div className="container mt-0">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-center">
          <h1 className="mb-1 h5 d-flex align-items-center">Who viewed my Profile 
          <span className="badge text-success small">{visits.length}</span>
          </h1>
          </div>
          <ListGroup>
            {visits.length && visits.map((visit, index) => (
              <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                <Link to={`/profile/feed/${visit.visitor.id}`} className="d-flex align-items-center">
                  <img
                    src={visit.visitor.profilePicture || avatar7}
                    alt="Profile"
                    className="rounded-circle mx-3"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <div>
                    <h6 className="mb-0 fw-semibold d-flex">
                      <span>{visit.visitor.firstName} {visit.visitor.lastName}</span>
                      <span className="badge  text-success small">{visit.visitCount}</span>
                    </h6>
                    <p className="mb-0 text-muted">{visit.visitor.userRole}</p>
                    <p className="mb-0 text-muted">{formatTimestamp(visit.visitor.createdAt) || "1w"}</p>
                  </div>
                </Link>
                <div>
                  {visit.connectionStatus === "accepted" ? (
                    <Link to="/messaging" className="mx-2 btn-primary btn btn-sm">
                      Message
                    </Link>
                  ) : visit.connectionStatus === "none" ? (
                    <Button
                      variant={sentStatus[visit.visitor.id] ? 'primary' : 'primary-soft'}
                      className="rounded-circle icon-md ms-auto flex-centered"
                      onClick={() => handleUserRequest(visit.visitor.id)}
                      disabled={loading === visit.visitor.id}
                    >
                      {loading === visit.visitor.id ? (
                        <Loading size={15} loading={true} />
                      ) : (
                        <span>{sentStatus[visit.visitor.id] ? <BsPersonCheckFill /> : <FaPlus />}</span>
                      )}
                    </Button>
                  ) : (
                    <Button
                      className={`mx-2 btn-sm ${visit.connectionStatus === "pending" ? "btn-warning" : "btn-danger"}`}
                    >
                      {visit.connectionStatus}
                    </Button>
                  )}
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  );
}


const ProfileVisited = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sentStatus, setSentStatus] = useState({});
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProfileVisits = async () => {
      try {
        const response = await fetch(
          " https://strengthholdings.com/api/v1/auth/get-profile-visited",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user?.id }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setVisits(data?.data || []);
        } else {
          console.error("Failed to fetch profile visits");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileVisits();
  }, [user?.id]);


  const handleUserRequest = async (userId: string) => {
    const newSentStatus = { ...sentStatus };
    const isSending = !sentStatus[userId];
    newSentStatus[userId] = isSending;
    setSentStatus(newSentStatus);
    setLoading(userId);

    const apiUrl = isSending
      ? 'https://strengthholdings.com/api/v1/connection/send-connection-request'
      : 'https://strengthholdings.com/api/v1/connection/unsend-connection-request';

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requesterId: user?.id,
          receiverId: userId,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to ${isSending ? 'send' : 'unsend'} connection request.`);
      }

      const data = await res.json();
      console.log(`Connection request ${isSending ? 'sent' : 'unsent'} successfully:`, data);
      toast.success(`Connection request ${isSending ? 'sent' : 'unsent'} successfully.`);
    } catch (error) {
      console.error(`Error while trying to ${isSending ? 'send' : 'unsend'} connection request:`, error);
      const revertedStatus = { ...newSentStatus, [userId]: !isSending };
      setSentStatus(revertedStatus);
      toast.error(`Failed to ${isSending ? 'send' : 'unsend'} connection request.`);
    } finally {
      setLoading(null);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-0">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-center">
            <h1 class="mb-1 h5 d-flex align-items-center">
              Profiles I visited
                      <span className="badge  text-success small">{visits.length}</span></h1>

            {/* <CardTitle className="bg-info px-3 pt-2 rounded text-white d-flex align-center justify-center">{visits.length}</CardTitle> */}
          </div>
          <ListGroup>
            {visits.length > 0 && visits.map((visit, index) => (
              <ListGroupItem
                key={index}
                className="d-flex rounded justify-content-between align-items-center"
              >
                <Link to={`/profile/feed/${visit.profile.id}`} className="d-flex align-items-center">
                  <img
                    src={visit.profile.profilePicture || avatar7}
                    alt="Profile"
                    className="rounded-circle mx-3"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div>
                    <h6 className="mb-0 fw-semibold d-flex">
                      <span>
                        {visit.profile.firstName} {visit.profile.lastName}
                      </span>
                     
                      <span className="badge  text-success small">{visit.visitCount}</span>
                    </h6>
                    <p className="mb-0 text-muted">{visit.profile.userRole}</p>
                    <p className="mb-0 text-muted">{formatTimestamp(visit.profile.createdAt) || "1w"}</p>
                  </div>
                </Link>
                <div>
                  {visit.connectionStatus === "accepted" ? (
                    <Link to="/messaging" className="mx-2 btn-primary btn btn-sm">
                      Message
                    </Link>
                  ) : visit.connectionStatus === "none" ? (
                    <Button
                      variant={sentStatus[visit.profile.id] ? 'primary' : 'warning-soft'}
                      className="rounded-circle icon-md ms-auto flex-centered"
                      onClick={() => handleUserRequest(visit.profile.id)}
                      disabled={loading === visit.profile.id}
                    >
                      {loading === visit.profile.id ? (
                        <Loading size={15} loading={true} />
                      ) : (
                        <span>{sentStatus[visit.profile.id] ? <BsPersonCheckFill /> : <FaPlus />}</span>
                      )}
                    </Button>
                  ) : (
                    <Button
                      className={`mx-2 btn-sm ${visit.connectionStatus === "pending" ? "btn-warning" : "btn-danger"}`}
                    >
                      {visit.connectionStatus}
                    </Button>
                  )}
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  )
};




const Home = () => {

  return (
    <>
      <Col md={8} lg={6}
        className="vstack gap-4 "
      >
        <ProfileVisits />
        <ProfileVisited />
      </Col>
    </>
  );
};

export default Home;