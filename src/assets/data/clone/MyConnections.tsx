import { getAllUserConnections } from '@/helpers/data'
import clsx from 'clsx'
import avatar from '@/assets/images/avatar/default avatar.png'
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
import { LIVE_URL } from '@/utils/api'

const MyConnections = () => {
  // const allConnections = useFetchData(getAllUserConnections)
  const { user } = useAuthContext()
  const [allConnections, setAllConnections] = useState([])
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
  const [sentStates, setSentStates] = useState<{ [key: string]: boolean }>({})
  const [id, setId] = useState(user?.id)
  const navigate = useNavigate()

  useEffect(() => {
    if (allConnections.length) {
      return
    }
    fetchConnections()
  }, [allConnections])

  const fetchConnections = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${LIVE_URL}api/v1/connection/get-connection-list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          profileId: id,
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch connection list.`)
      }

      const data = await res.json()
      setAllConnections(data.connections)
      // toast.info(`Connection list get successfully.`);
    } catch (error) {
      console.error(`Error while fetching connection list:`, error)
      // toast.error(`Failed to fetch connection list.`);
    } finally {
      setLoading(false)
    }
  }
  const UserRequest = async (profileId: string) => {
    setLoadingStates((prev) => ({ ...prev, [profileId]: true }))

    const apiUrl = `${LIVE_URL}api/v1/connection/send-connection-request`

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requesterId: user?.id,
          receiverId: profileId,
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to send connection request.`)
      }
      setSentStates((prev) => ({ ...prev, [profileId]: true }))
      toast.success(`Connection request sent successfully.`)
    } catch (error) {
      console.error(`Error while sending connection request:`, error)

      setSentStates((prev) => ({ ...prev, [profileId]: true }))
      toast.info(`Already sent connection request.`)
    } finally {
      setLoadingStates((prev) => ({ ...prev, [profileId]: false }))
    }
  }

  const handleCancel = async () => {
    setLoading(true)
    const apiUrl = `${LIVE_URL}api/v1/connection/unsend-connection-request`
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requesterId: user?.id,
          receiverId: id,
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to unsend connection request.`)
      }
      setSent(false)
      toast.info(`Connection request unsent successfully.`)
    } catch (error) {
      console.error(`Error while unsending connection request:`, error)
      toast.error(`Failed to unsend connection request.`)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (connectionId: string) => {
    // Set loading to true only for the specific connectionId
    setLoadingStates((prev) => ({ ...prev, [connectionId]: true }))

    const apiUrl = `${LIVE_URL}api/v1/connection/remove-connection`
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          connectionId: connectionId,
        }),
      })
      fetchConnections()
      if (!res.ok) {
        throw new Error(`Failed to remove connection request.`)
      }
      setSent(false)
      toast.info(`Connection request remove successfully.`)
    } catch (error) {
      console.error(`Error while remove connection request:`, error)
      toast.error(`Failed to remove connection request.`)
    } finally {
      // Set loading to false only for the specific connectionId
      setLoadingStates((prev) => ({ ...prev, [connectionId]: false }))
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center bg-light" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem', borderWidth: '6px' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <Card className="mb-3"  >
    <CardBody>
      {allConnections.map((connection, idx) => (
        <div
          key={idx}
          className={`p-3 d-flex align-items-center ${idx === allConnections.length - 1 ? '' : 'border-bottom'}`}
          style={{ marginBottom: idx === allConnections.length - 1 ? 0 : '1rem' }} // Add margin-bottom only if it's not the last card
        >
          <div className="avatar me-3">
            <span role="button">
              <img
          className="avatar-img rounded-circle"
          src={connection.profilePictureUrl || avatar}
          alt={`${connection.firstName} ${connection.lastName}`}
          style={{ width: '50px', height: '50px' }}
              />
            </span>
          </div>
          <div className="flex-grow-1">
            <h6 className="mb-1">
              <a href={`/profile/feed/${connection.userId}#${connection.userId}`} className="text-dark">
          {`${connection.firstName} ${connection.lastName}`}
              </a>
            </h6>
            <p className="small text-muted mb-1">{connection.userRole}</p>
            <p className="small text-muted mb-0">{connection.meeted}</p>
          </div>
          {connection?.userId !== user?.id ? (
            <div className="ms-auto d-flex">
              {user?.id === id ? (
          <>
            <Button
              onClick={() => handleRemove(connection.connectionId)}
              variant="outline-danger"
              size="sm"
              className="me-2"
              style={{ minWidth: '120px', transition: '0.2s ease-in-out', fontSize: '15px' }}
              disabled={loadingStates[connection.connectionId]}
            >
              {loadingStates[connection.connectionId] ? <Loading size={15} loading={true} /> : 'Remove'}
            </Button>
            <Button
              onClick={() => navigate('/messaging')}
              variant="outline-primary"
              size="sm"
              style={{ minWidth: '120px', transition: '0.2s ease-in-out', fontSize: '15px' }}
            >
              Message
            </Button>
          </>
              ) : (
          <>
            {sent ? (
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={handleCancel}
                disabled={loading}
                style={{ minWidth: '140px', transition: '0.2s ease-in-out', fontSize: '15px' }}
              >
                {loading ? <Loading size={15} loading={true} /> : <FaUserTimes size={16} />}
              </Button>
            ) : (
              <Button
                variant={sentStates[connection?.userId] ? 'outline-success' : 'outline-primary'}
                size="sm"
                className="me-2"
                onClick={() => UserRequest(connection?.userId)}
                disabled={loadingStates[connection?.userId]}
                style={{ minWidth: '140px', transition: '0.2s ease-in-out', fontSize: '15px' }}
              >
                {loadingStates[connection?.userId] ? (
            <Loading size={15} loading={true} />
                ) : sentStates[connection?.userId] ? (
            <FaUserCheck size={16} />
                ) : (
            <FaUserPlus size={16} />
                )}
              </Button>
            )}
          </>
              )}
            </div>
          ) : (
            <Link to={'/feed/home'} className="mx-4 text-primary">
              <FaUser size={16} />
            </Link>
          )}
        </div>
      ))}
    </CardBody>
  </Card>  
  )
}
export default MyConnections
