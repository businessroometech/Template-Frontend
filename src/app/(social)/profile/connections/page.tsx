import { getAllUserConnections } from '@/helpers/data'
import clsx from 'clsx'

import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'
import LoadMoreButton from './components/LoadMoreButton'
import { Link, useParams } from 'react-router-dom'
import PageMetaData from '@/components/PageMetaData'
import { useFetchData } from '@/hooks/useFetchData'
import { toast, ToastContainer } from 'react-toastify'
import { useAuthContext } from '@/context/useAuthContext'
import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import { FaTimes, FaUserCheck, FaUserPlus, FaUserTimes } from 'react-icons/fa'

const Connections = () => {
  // const allConnections = useFetchData(getAllUserConnections)
  const { user } = useAuthContext();
  const [allConnections, setAllConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false)

    const { id } = useParams();
  useEffect(() => {
    if (allConnections.length ) {
      return
    }
    fetchConnections()
  }, [allConnections])

  const fetchConnections = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://app-backend-8r74.onrender.com/api/v1/connection/get-connection-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          profileId:id
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch connection list.`);
      }

      const data = await res.json();
      setAllConnections(data.connections);
      toast.info(`Connection list get successfully.`);
    } catch (error) {
      console.error(`Error while fetching connection list:`, error);
      toast.error(`Failed to fetch connection list.`);
    } finally {
      setLoading(false);
    }
  };
  
  const UserRequest = async (profileId:string) => {
    console.log("profileId", profileId);
    console.log("userId", user.id);
    
 setLoading(true);
    const apiUrl = "https://app-backend-8r74.onrender.com/api/v1/connection/send-connection-request";

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

      setSent(true); 
      toast.success(`Connection request sent successfully.`);
    } catch (error) {
      console.error(`Error while sending connection request:`, error);
      setSent(false);
      toast.info(`Already sent connection request.`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setLoading(true);
    const apiUrl = "https://app-backend-8r74.onrender.com/api/v1/connection/unsend-connection-request";
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requesterId: user?.id,
          receiverId: id,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to unsend connection request.`);
      }
      setSent(false); 
      toast.info(`Connection request unsent successfully.`);
    
    } catch (error) {
      console.error(`Error while unsending connection request:`, error);
      toast.error(`Failed to unsend connection request.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMetaData title='Connections' />
{/* <ToastContainer /> */}
      <Card>
        <CardHeader className="border-0 pb-0">
          <CardTitle> Connections</CardTitle>
        </CardHeader>
        <CardBody>
          {allConnections.filter((id)=>id.userId!==user?.id).map((connection, idx) => (
            <div className="d-md-flex align-items-center mb-4" key={idx}>
              <div className="avatar me-3 mb-3 mb-md-0">
                {connection.profilePictureUrl ? (
                  <span role="button">
                    <img className="avatar-img rounded-circle" src={connection.profilePictureUrl} alt={`${connection.firstName} ${connection.lastName} picture`} />
                  </span>
                ) : (
                  <span
                    className="avatar-img rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                    style={{ width: '40px', height: '40px', fontSize: '20px' }}
                  >
                    {connection.firstName?.charAt(0).toUpperCase()}/{connection.lastName?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="w-100">
                <div className="d-sm-flex align-items-start">
                  <h6 className="mb-0">
                    <Link to={`/profile/feed/${connection.userId}`}>{`${connection.firstName} ${connection.lastName}`}</Link>
                  </h6>
                  <p className="small ms-sm-2 mb-0">{connection.userRole}</p>
                  {user?.id !== id && <p style={{fontSize:"10px"}} className="small text-info ms-sm-2  mb-0">{connection.mutual && "mutual connection"}</p>}
                </div>
                <ul className="avatar-group mt-1 list-unstyled align-items-sm-center">
                  {/* {connection?.sharedConnectionAvatars && (
                  <>
                    {connection.sharedConnectionAvatars.map((avatar, idx) => (
                      <li className="avatar avatar-xxs" key={idx}>
                        <img className="avatar-img rounded-circle" src={avatar} alt="avatar" />
                      </li>
                    ))}
                    <li className="avatar avatar-xxs">
                      <div className="avatar-img rounded-circle bg-primary">
                        <span className="smaller text-white position-absolute top-50 start-50 translate-middle">
                          +{Math.floor(Math.random() * 10)}
                        </span>
                      </div>
                    </li>
                  </>
                )} */}
                  <li className={clsx('small', { 'ms-3': connection.sharedConnectionAvatars })}>{connection.meeted}</li>
                </ul>
              </div>
              <div className="ms-md-auto d-flex">
                {(user?.id===id || connection.mutual)?(
                  <> <Button variant="danger-soft" size="sm" className="mb-0 me-2">
                    Remove
                  </Button>
                    <Button variant="primary-soft" size="sm" className="mb-0">

                      Message
                    </Button>
                  </>):(
                    <>
                    {sent && (
                      <Button
                        variant="danger-soft"
                        className="me-2"
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                      >
                        {loading ? (
                          <Loading size={15} loading={true} />
                        ) : (
                          <>
                            <FaUserTimes size={19} className="pe-1" /> 
                          </>
                        )}
                      </Button>
                    )}

                    {!sent && (
                      <Button
                        variant={sent ? "success-soft" : "primary-soft"}
                        className="me-2"
                        type="button"
                        onClick={()=>UserRequest(connection?.userId)}
                        disabled={loading || sent}
                      >
                        {loading ? (
                          <Loading size={15} loading={true} />
                        ) : sent ? (
                          <>
                            <FaUserCheck size={19} className="pe-1" /> Sent
                          </>
                        ) : (
                          <>
                            <FaUserPlus size={19} className="pe-1" /> 
                          </>
                        )}
                      </Button>
                    )}
                  </>
                  )}
              </div>
            </div>
          ))}
          <div className="d-grid">
            <LoadMoreButton />
          </div>
        </CardBody>
      </Card>
    </>
  )
}
export default Connections
