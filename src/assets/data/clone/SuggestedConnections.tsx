import React, { useEffect, useState } from 'react';
import avatar from '@/assets/images/avatar/default avatar.png'

import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserPlus, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { BsPersonAdd } from 'react-icons/bs';
import { useAuthContext } from '@/context/useAuthContext';
import Loading from '@/components/Loading';

const SuggestedConnections = () => {
  const { user } = useAuthContext();
  const [allFollowers, setAllFollowers] = useState<any[]>([]);
  const [limit, setLimit] = useState(10);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [sentStatus, setSentStatus] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState<string | null>(null);


  useEffect(() => {
    fetchConnectionSuggestions();
  }, []);

  const fetchConnectionSuggestions = async () => {
    try {
      setSkeletonLoading(true);
      const response = await fetch('http://54.177.193.30:5000/api/v1/connection/get-connection-suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          page: 1,
          limit: limit,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch connection suggestions');

      const data = await response.json();
      setAllFollowers(data.data);
      setTotalUsers(data.total);
    } catch (error) {
      console.error('Error fetching connection suggestions:', error);
    } finally {
      setSkeletonLoading(false);
    }
  };

  const fetchMoreData = () => {
    if (allFollowers.length < totalUsers) {
      setLimit((prev) => prev + 10);
      fetchConnectionSuggestions();
    }
  };

  const UserRequest = async (userId: string) => {
    const isSending = !sentStatus[userId];
    const updatedStatus = { ...sentStatus, [userId]: isSending };
    setSentStatus(updatedStatus);
    setLoading(userId);

    const apiUrl = isSending
      ? 'http://54.177.193.30:5000/api/v1/connection/send-connection-request'
      : 'http://54.177.193.30:5000/api/v1/connection/unsend-connection-request';

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

      if (!res.ok) throw new Error(`Failed to ${isSending ? 'send' : 'unsend'} connection request.`);

      toast.success(`Connection request ${isSending ? 'sent' : 'unsent'} successfully.`);
    } catch (error) {
      console.error(`Error while trying to ${isSending ? 'send' : 'unsend'} connection request:`, error);
      const revertedStatus = { ...updatedStatus, [userId]: !isSending };
      setSentStatus(revertedStatus);
      toast.error(`Failed to ${isSending ? 'send' : 'unsend'} connection request.`);
    } finally {
      setLoading(null);
    }
  };

//   if (loading) {
//     return (
//       <div 
//       className="d-flex justify-content-center align-items-center bg-light" 
//       style={{ height: '100vh' }}
//     >
//       <div 
//         className="spinner-border text-primary" 
//         role="status" 
//         style={{ width: '4rem', height: '4rem', borderWidth: '6px' }}
//       >
//         <span className="visually-hidden">Loading...</span>
//       </div>
//     </div>    
//     );
// }

  const filteredFollowers = allFollowers.filter((follower) => user?.id !== follower.id);

  return (
    <Card>
      <CardHeader className="border-0 pb-0">
        {/* <CardTitle>Suggested Connections</CardTitle> */}
      </CardHeader>
      <CardBody>
        {skeletonLoading ? (
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
        ) : (
          <InfiniteScroll
            dataLength={filteredFollowers.length}
            next={fetchMoreData}
            hasMore={filteredFollowers.length < totalUsers}
            loader={<Loading loading={filteredFollowers.length !== totalUsers} size={16} />}
            style={{ overflowX: 'hidden', overflowY: 'hidden' }}
            endMessage={
              <Button disabled style={{ textAlign: 'center' }}>
                <b>No more suggested connections</b>
              </Button>
            }
            scrollableTarget="scrollableDiv"
          >
            {filteredFollowers.map((friend, idx) => (
              <div className="d-md-flex align-items-center mb-4" key={idx}>
                <div className="avatar me-3 mb-3 mb-md-0">
                  {friend.profilePictureUrl ? (
                    <img className="avatar-img rounded-circle" src={friend.profilePictureUrl} alt={`${friend.firstName} ${friend.lastName}'s profile`} />
                  ) : (
                    <img className="avatar-img rounded-circle" src={avatar} alt={`${friend.firstName} ${friend.lastName}'s profile`} />
                  )}
                </div>
                <div className="w-100">
                  <div className="d-sm-flex align-items-start">
                    <h6 className="mb-0">
                      <Link to="#">{`${friend.firstName} ${friend.lastName}`}</Link>
                    </h6>
                    <p className="small ms-sm-2 mb-0 text-muted">{friend.userRole}</p>
                    {friend.mutual && (
                      <p style={{ fontSize: '10px' }} className="small text-info ms-sm-2 mb-0">
                        Mutual connection
                      </p>
                    )}
                  </div>
                  <ul className="avatar-group mt-1 list-unstyled align-items-sm-center">
                    <li className="small">{friend.meeted}</li>
                  </ul>
                </div>
                <div className="ms-md-auto d-flex">
                  <Button variant="primary" size="sm" className="mb-0 me-2" style={{ minWidth: '120px' }} onClick={() => UserRequest(friend.id)} disabled={loading === friend.id}>
                    {loading === friend.id ? <Loading size={16} /> : 'Connect'}
                  </Button>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        )}
      </CardBody>
    </Card>
  );
};

export default SuggestedConnections;
