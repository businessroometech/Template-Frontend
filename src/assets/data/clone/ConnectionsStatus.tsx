import { getAllUserConnections } from '@/helpers/data'
import { Button, Card, CardBody, CardHeader } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import avatar from '@/assets/images/avatar/default avatar.png'
import { useAuthContext } from '@/context/useAuthContext'
import { LIVE_URL } from '@/utils/api'

const ConnectionsStatus = () => {
    const { user } = useAuthContext();
    const [allConnections, setAllConnections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        fetchConnections();
    }, []);

    const fetchConnections = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${LIVE_URL}api/v1/connection/get-connection-status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requesterId: user?.id,
                    status: "pending"
                }),
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch connection list.`);
            }

            const data = await res.json();
            setAllConnections(data);
        } catch (error) {
            console.error(`Error while fetching connection list:`, error);
        } finally {
            setLoading(false);
        }
    };


    const UserRequest = async (profileId: string) => {
        // Set loading to true only for the specific profileId
        setLoadingStates((prev) => ({ ...prev, [profileId]: true }));

        const apiUrl = `${LIVE_URL}api/v1/connection/send-connection-request`;

        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requesterId: user?.id,
                    receiverId: profileId,
                }),
            });

            if (!res.ok) {
                throw new Error(`Failed to send connection request.`);
            }
            setSentStates((prev) => ({ ...prev, [profileId]: true }));
            toast.success(`Connection request sent successfully.`);
        } catch (error) {
            console.error(`Error while sending connection request:`, error);

            setSentStates((prev) => ({ ...prev, [profileId]: true }));
            toast.info(`Already sent connection request.`);
        } finally {
            setLoadingStates((prev) => ({ ...prev, [profileId]: false }));
        }
    };

    const handleCancel = async (req: string) => {
        setLoadingStates((prev) => ({ ...prev, [req]: true }));

        const apiUrl = `${LIVE_URL}api/v1/connection/unsend-connection-request`;
        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requesterId: user?.id,
                    receiverId: req,
                }),
            });

            if (!res.ok) {
                throw new Error(`Failed to unsend connection request.`);
            }
            fetchConnections();
            toast.success(`Cancel connection request `);
        } catch (error) {
            console.error(`Error while unsending connection request:`, error);
            toast.error(`Failed to unsend connection request.`);
        } finally {
            setLoadingStates((prev) => ({ ...prev, [req]: false }));
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

        <>
        {allConnections.length === 0 ? (
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
        
        <Card>
            <CardHeader className="border-0 pb-0" />
            <CardBody>
                {allConnections && allConnections.map((connection, idx) => (
                    <div className="d-md-flex align-items-center mb-4" key={idx}>
                        <div className="avatar me-3 mb-3 mb-md-0">
                            {
                                <span role="button">
                                    <img className="avatar-img rounded-circle" src={connection.requester.profilePictureUrl?connection.requester.profilePictureUrl:avatar} alt={`${connection.requester.firstName} ${connection.requester.lastName} picture`} />
                                </span>
                            }
                        </div>
                        <div className="w-50">
                            <div className="d-sm-flex align-items-start">
                                <h6 className="mb-0">
                                    <a href={`/profile/feed/${connection.receiver.id}#${connection.receiver.id}`}>
                                        {`${connection.receiver.firstName} ${connection.receiver.lastName}`}
                                    </a>
                                </h6>
                                <p className="small ms-sm-2 mb-0">{connection.receiver.userRole}</p>
                            </div>
                        </div>
                        <div className="ms-md-auto d-flex align-items-center">
                            <Button
                                variant="danger-soft"
                                size="sm"
                                className="mb-0 me-2"
                                onClick={() => handleCancel(connection.receiver.id)}
                                disabled={loadingStates[connection.receiver.id]}
                                style={{ minWidth: '120px' }}
                            >
                                {loadingStates[connection.receiver.id] ? <span>Loading...</span> : "Cancel"}
                            </Button>
                            <Button
                                variant="light"
                                size="sm"
                                className="ms-sm-2 mb-0"
                                disabled
                                style={{ minWidth: '120px', borderColor: 'black', color: 'black' }}
                            >
                                {connection.status === 'pending' && 'Pending'}
                            </Button>
                        </div>
                    </div>
                ))}
            </CardBody>
        </Card>
        )}
        </>
    );
};

export default ConnectionsStatus;
