import { getAllUsers } from '@/helpers/data'
import clsx from 'clsx'

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'
import { BsPersonCheckFill } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { useFetchData } from '@/hooks/useFetchData'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/context/useAuthContext'
import { ConnectionRequest } from '@/layouts/ProfileLayout'

const Followers = () => {

  const { pathname } = useLocation();
  const { user } = useAuthContext();
  const [profile, setProfile] = useState({});
  const [sent, setSent] = useState(false);
  const [allFollowers, setAllFollowers] = useState<any[]>([]);
  const [limit, setLimit] = useState(5);
  const [totalUsers, SetTotalUsers] = useState(0)
  const [sentStatus, setSentStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (allFollowers.length >= 1) {
      return
    }
    fetchConnectionSuggestions();
  }, [allFollowers]);

  const fetchConnectionSuggestions = async () => {
    try {
      const response = await fetch("https://app-backend-8r74.onrender.com/api/v1/connection/get-connection-suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          page: 1,
          limit: limit,
        }),
      });


      if (!response.ok) {
        throw new Error("Failed to fetch connection suggestions");
      }

      const data = await response.json();
      setAllFollowers(data.data);
      SetTotalUsers(data?.total)
    } catch (error) {
      console.error("Error fetching connection suggestions:", error);
    }
  };

  const UserRequest = async (userId: string) => {
    const newSentStatus = { ...sentStatus };
    newSentStatus[userId] = !sentStatus[userId]; // Toggle the sent status for the clicked user
    setSentStatus(newSentStatus);

    const apiUrl = newSentStatus[userId]
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
      fetchConnectionSuggestions()
      console.log(`Connection request ${sent ? "sent" : "unsent"} successfully:`, data);
      toast.success(`Connection request ${sent ? "sent" : "unsent"} successfully:`, data);

    } catch (error) {
      console.error(`Error while trying to ${sent ? "send" : "unsend"} connection request:`, error);
    }
  };

  return (
    <>
      <ConnectionRequest />
      <br />
      <Card>
        <CardHeader className="pb-0 border-0">
          <CardTitle className="mb-0" style={{ fontSize: '17px' }}>Suggested Connections</CardTitle>
        </CardHeader>

        {allFollowers.length > 0 && (<CardBody>
          {allFollowers?.map((follower, idx) => (
            <div className="hstack gap-2 mb-3" key={idx}>
              {/* Avatar Section */}
              <div className={clsx('avatar', { 'avatar-story': follower.isStory })}>
                {follower.profilePictureUrl ? (
                  <span role="button">
                    <img
                      className="avatar-img rounded-circle"
                      src={follower.profilePictureUrl}
                      alt={`${follower.firstName}'s profile`}
                    />
                  </span>
                ) : (
                  <span
                    className="avatar-img rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                    style={{ width: '40px', height: '40px', fontSize: '20px' }}
                  >
                    {follower.firstName?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Follower Details */}
              <div className="overflow-hidden">
                <Link className="h6 mb-0" to={`/profile/feed/${follower.id}`} >
                  {follower.firstName} {follower.lastName}
                </Link>
                <p className="mb-0 small text-truncate">{follower.userRole}</p>
              </div>


              <Button
                variant={sentStatus[follower.id] ? 'primary' : 'primary-soft'}
                className="rounded-circle icon-md ms-auto flex-centered"
                onClick={() => UserRequest(follower.id)}
              >
                <span>{sentStatus[follower.id] ? <BsPersonCheckFill /> : <FaPlus />}</span>
              </Button>
            </div>
          ))}
          <div className="d-grid mt-3">
            {totalUsers >= limit ? (
              <Button
                variant="primary-soft"
                size="sm"
                onClick={() => {        
                  setLimit(limit + 3);
                  fetchConnectionSuggestions();
                }}
              >
                View more
              </Button>
            ) : (
              <Button variant="info-soft" size="sm" disabled>
                no more suggestions
              </Button>
            )}

          </div>
        </CardBody>)}
      </Card>
    </>
  )
}
export default Followers
