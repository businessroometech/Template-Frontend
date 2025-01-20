import React, { useEffect, useState } from 'react';
import avatar from '@/assets/images/avatar/default avatar.png'

import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
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

  const skeletonBaseColor = '#e3e3e3';
  const skeletonHighlightColor = '#f2f2f2';

  useEffect(() => {
    fetchConnectionSuggestions();
  }, []);

  const fetchConnectionSuggestions = async () => {
    try {
      setSkeletonLoading(true);
      const response = await fetch('http://3.101.12.130:5000/api/v1/connection/get-connection-suggest', {
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
      ? 'http://3.101.12.130:5000/api/v1/connection/send-connection-request'
      : 'http://3.101.12.130:5000/api/v1/connection/unsend-connection-request';

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

  const filteredFollowers = allFollowers.filter((follower) => user?.id !== follower.id);

  return (
    <Card>
      <CardHeader className="d-sm-flex justify-content-between align-items-center border-0">
        <CardTitle>Suggested Connections</CardTitle>
      </CardHeader>
      <CardBody className="position-relative pt-0">
        <InfiniteScroll
          dataLength={filteredFollowers.length}
          next={fetchMoreData}
          hasMore={filteredFollowers.length < totalUsers}
          loader={<Loading loading={filteredFollowers.length !== totalUsers} size={12}/>}
          style={{ overflowX: 'hidden', overflowY: 'hidden' }}
          endMessage={
            <Button disabled style={{ textAlign: 'center' }}>
              <b>no more suggested connections</b>
            </Button>}
          scrollableTarget="scrollableDiv">
          <Row className="g-3">
            {filteredFollowers.map((friend, idx) => (
              <Col xs={3} key={idx}>
                <Card className="shadow-none text-center h-100">
                  <CardBody className="p-2 pb-0">
                    <div className={clsx('avatar avatar-xl', { 'avatar-story': friend.isStory })}>
                      {skeletonLoading ? (
                        <Skeleton
                          height={40}
                          width={40}
                          baseColor={skeletonBaseColor}
                          highlightColor={skeletonHighlightColor}
                        />
                      ) : (
                        <img
                          className="avatar-img rounded-circle"
                          src={friend?.profilePictureUrl || avatar}
                          alt={`${friend.firstName}'s profile`}
                        />
                      )}
                    </div>
                    <h6 className="card-title mb-1 mt-3">
                      <Link to="#">{friend.name}</Link>
                    </h6>
                    <p className="mb-0 small lh-sm">
                      {friend.firstName} {friend.lastName}
                    </p>
                  </CardBody>
                  <div className="card-footer p-2 border-0">
                    <button
                      className="btn btn-sm btn-primary"
                      title="Add friend"
                      onClick={() => UserRequest(friend.id)}
                      disabled={loading === friend.id}
                    >
                      <BsPersonAdd />
                    </button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </CardBody>
    </Card>
  );
};

export default SuggestedConnections;
