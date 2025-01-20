import { getAllUserConnections } from '@/helpers/data'
import clsx from 'clsx'

import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'
import LoadMoreButton from './components/LoadMoreButton'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageMetaData from '@/components/PageMetaData'
import { useFetchData } from '@/hooks/useFetchData'
import { toast, ToastContainer } from 'react-toastify'
import { useAuthContext } from '@/context/useAuthContext'
import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import { FaTimes, FaUser, FaUserCheck, FaUserPlus, FaUserTimes } from 'react-icons/fa'

const ConnectionsStatus = () => {
    // const allConnections = useFetchData(getAllUserConnections)
    const { user } = useAuthContext();
    const [allConnections, setAllConnections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false)
    const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
    const [sentStates, setSentStates] = useState<{ [key: string]: boolean }>({})
    const [id, setId] = useState(user?.id)

    const [connectionStatus, setConnectionStatus] = useState("pending")
    useEffect(() => {

        fetchConnections()
    }, [connectionStatus])

    const fetchConnections = async () => {
        setLoading(true);
        try {
            const res = await fetch(" http://3.101.12.130:5000/api/v1/connection/get-connection-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requesterId: user?.id,
                    status: connectionStatus
                }),
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch connection list.`);
            }

            const data = await res.json();
            setAllConnections(data);
            // toast.info(`Connection list get successfully.`);
        } catch (error) {
            console.error(`Error while fetching connection list:`, error);
            // toast.error(`Failed to fetch connection list.`);
        } finally {
            setLoading(false);
        }
    };


    const UserRequest = async (profileId: string) => {
        // Set loading to true only for the specific profileId
        setLoadingStates((prev) => ({ ...prev, [profileId]: true }));

        const apiUrl = " http://3.101.12.130:5000/api/v1/connection/send-connection-request";

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

    const handleCancel = async (req:string) => {
        setLoading(true);
        const apiUrl = " http://3.101.12.130:5000/api/v1/connection/unsend-connection-request";
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
            fetchConnections()
            setSent(false)
            toast.success(`Cancel connection request `);
        } catch (error) {
            fetchConnections()
            console.error(`Error while unsending connection request:`, error);
            toast.error(`Failed to unsend connection request.`);
        } finally {
            setLoading(false);
        }
    };

   

    return (
        <>
            <Card>
                <CardHeader className="border-0 pb-0">
                    <CardTitle>Connections status</CardTitle>
                    {/* Dropdown for filtering connection status */}
                    {/* <div className="d-flex justify-content-end">
                        <select
                            className="form-select"
                            onChange={(e) => setConnectionStatus(e.target.value)} 
                        >
                            <option value="all">All Connections</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div> */}
                </CardHeader>
                <CardBody>
                    {allConnections && allConnections.map((connection, idx) => (
                        <div className="d-md-flex align-items-center mb-4" key={idx}>
                            <div className="avatar me-3 mb-3 mb-md-0">
                                {connection.requester.profilePictureUrl ? (
                                    <span role="button">
                                        <img className="avatar-img rounded-circle" src={connection.requester.profilePictureUrl} alt={`${connection.requester.firstName} ${connection.requester.lastName} picture`} />
                                    </span>
                                ) : (
                                    <span
                                        className="avatar-img rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                                        style={{ width: '40px', height: '40px', fontSize: '20px' }}
                                    >
                                        {connection.receiver.firstName?.charAt(0).toUpperCase()}
                                    </span>
                                )}
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
                            <div className="ms-md-auto d-flex">
                                <p variant="danger-soft"
                                    className="me-2 btn w-100 text-danger"
                                    onClick={() => handleCancel(connection.receiver.id)}
                                    disabled={loading}
                                >
                                    {loading ? <span>Loading...</span> : "cancel request"}
                                </p>

                                <p className={` text-warning ms-sm-2 btn`}>
                                    {connection.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </CardBody>
            </Card>
        </>
    );
}
export default ConnectionsStatus
