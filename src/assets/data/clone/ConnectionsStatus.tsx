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
        <Card className="rounded">
        <CardBody>
          {allConnections.map((connection, idx) => (
            <div 
              key={idx} 
              className={`p-3 d-flex align-items-center ${idx === allConnections.length - 1 ? '' : 'border-bottom'}`}
            >
              <div className="avatar me-3">
            <span role="button">
              <img
                className="avatar-img rounded-circle"
                src={connection.requester.profilePictureUrl || avatar}
                alt={`${connection.requester.firstName} ${connection.requester.lastName}`}
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
            </span>
              </div>
              <div className="flex-grow-1">
            <h6 className="mb-1">
              <a href={`/profile/feed/${connection.receiver.id}#${connection.receiver.id}`} 
                className="text-dark fw-semibold text-decoration-none">
                {`${connection.receiver.firstName} ${connection.receiver.lastName}`}
              </a>
            </h6>
            <p className="small text-muted mb-1">{connection.receiver.userRole}</p>
            {/* <p className="small text-muted mb-0">{connection.meeted}</p> */}
              </div>
              <div className="ms-auto d-flex">
            <Button
              variant="outline-danger"
              size="sm"
              className="me-2"
              onClick={() => handleCancel(connection.receiver.id)}
              disabled={loadingStates[connection.receiver.id]}
              style={{ minWidth: '120px', transition: "0.2s ease-in-out", fontSize: '15px' }}
            >
              {loadingStates[connection.receiver.id] ? <span>Loading...</span> : "Cancel"}
            </Button>
            <Button
              variant="light"
              size="sm"
              className="border border-dark text-dark"
              disabled
              style={{ minWidth: '120px', transition: "0.2s ease-in-out" }}
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
