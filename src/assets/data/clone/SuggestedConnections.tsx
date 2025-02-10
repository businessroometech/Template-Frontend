import React, { useEffect, useState } from 'react'
import avatar from '@/assets/images/avatar/default avatar.png'
import { FiUserPlus, FiUserX } from "react-icons/fi";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import clsx from 'clsx'
import Skeleton from 'react-loading-skeleton'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserPlus, FaUserCheck, FaUserTimes } from 'react-icons/fa'
import { BsPersonAdd } from 'react-icons/bs'
import { useAuthContext } from '@/context/useAuthContext'
import Loading from '@/components/Loading'
import { LIVE_URL } from '@/utils/api';


const SuggestedConnections = () => {
  const { user } = useAuthContext()
  const [allFollowers, setAllFollowers] = useState<any[]>([])
  const [limit, setLimit] = useState(10)
  const [skeletonLoading, setSkeletonLoading] = useState(false)
  const [totalUsers, setTotalUsers] = useState(0)
  const [page, setPage] = useState(1)
  const [sentStatus, setSentStatus] = useState<{ [key: string]: boolean }>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [btnloading, setBtnLoading] = useState<string | null>(null)

  useEffect(() => {


    fetchConnectionSuggestions()
  }, [page, user?.id])

  const fetchConnectionSuggestions = async () => {
    try {
      // setSkeletonLoading(true);
      const response = await fetch('https://strengthholdings.com/api/v1/connection/get-connection-suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          page: 1,
          limit: 10,
        }),
      })

      if (!response.ok) throw new Error('Failed to fetch connection suggestions')

      const data = await response.json()
      setAllFollowers((prevFollowers) => {
        // Avoid duplicates by checking user IDs
        const newUsers = data.data.filter((newUser: any) => !prevFollowers.some((existing) => existing.id === newUser.id))

        return [...prevFollowers, ...newUsers]
      })
      setTotalUsers(data.total)
    } catch (error) {
      console.error('Error fetching connection suggestions:', error)
    } finally {
      // setSkeletonLoading(false);
    }
  }

  const fetchMoreData = () => {
    setPage(page + 1)
  }

  const UserRequest = async (userId: string) => {
    const isSending = !sentStatus[userId]; // Toggle send status
    const updatedStatus = { ...sentStatus, [userId]: isSending };
    setSentStatus(updatedStatus);
    setBtnLoading(userId);

    const apiUrl = isSending
      ? "https://strengthholdings.com/api/v1/connection/send-connection-request"
      : "https://strengthholdings.com/api/v1/connection/unsend-connection-request";

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

      if (!res.ok) throw new Error(`Failed to ${isSending ? "send" : "unsend"} connection request.`);

      fetchConnectionSuggestions(); 

      toast.success(`Connection request ${isSending ? "sent" : "unsent"} successfully.`);
    } catch (error) {
      console.error(`Error while trying to ${isSending ? "send" : "unsend"} connection request:`, error);
      setSentStatus((prevStatus) => ({ ...prevStatus, [userId]: !isSending }));
      toast.error(`Failed to ${isSending ? "send" : "unsend"} connection request.`);
    } finally {
      setBtnLoading(null);
    }
  };

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
    <Card className="rounded shadow-lg border">
      <CardBody>
        {skeletonLoading ? (
          <div className="d-flex justify-content-center align-items-center bg-light" style={{ height: "100vh" }}>
            <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem", borderWidth: "6px" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={allFollowers.length}
            next={fetchMoreData}
            hasMore={false}
            loader={<Loading loading={allFollowers.length !== totalUsers} size={16} />}
            style={{ overflowX: "hidden", overflowY: "hidden" }}
            endMessage={<b className="text-muted">No more Connect'n Grow</b>}
            scrollableTarget="scrollableDiv"
          >
            {allFollowers.map((friend, idx) => (
              <div
                key={idx}
                className={`p-3 d-flex align-items-center ${idx === allFollowers.length - 1 ? '' : 'border-bottom'}`}
              >
                <div className="avatar me-3">
                  <span role="button">
                    <img
                      className="avatar-img rounded-circle"
                      src={friend.profilePictureUrl || avatar}
                      alt={`${friend.firstName} ${friend.lastName}'s profile`}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1">
                    <Link to={`/profile/feed/${friend.id}`} className="text-dark fw-semibold text-decoration-none">
                      {`${friend.firstName} ${friend.lastName}`}
                    </Link>
                  </h6>
                  <p className="small text-muted mb-1">{friend.userRole}</p>
                  {friend.mutual && (
                    <p style={{ fontSize: "12px" }} className="small text-info mb-0">
                      Mutual connection
                    </p>
                  )}
                </div>

                {/* Connect Button */}
                <div className="ms-auto d-flex">
                    <Button
                    variant={sentStatus[friend.id] ? "outline-secondary" : "primary"}
                    size="sm"
                    className="me-2"
                    onClick={() => UserRequest(friend.id)}
                    disabled={loading === friend.id}
                    style={{ minWidth: "120px", transition: "0.2s ease-in-out", fontSize: "15px" }}
                    >
                    {loading === friend.id ? <Loading size={16} loading={true} /> : sentStatus[friend.id] ? "Request Sent" : "Connect"}
                    </Button>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        )}
      </CardBody>
    </Card>
  
  )
}

export default SuggestedConnections
