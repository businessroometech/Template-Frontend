import avatar from '@/assets/images/avatar/default avatar.png'
import Loading from '@/components/Loading'
import { useAuthContext } from '@/context/useAuthContext'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'
import { BsPersonCheckFill } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const Followers = () => {
  const { pathname } = useLocation()
  const { user } = useAuthContext() 
  const [profile, setProfile] = useState({})
  const [sent, setSent] = useState(false)
  const [allFollowers, setAllFollowers] = useState<any[]>([])
  const [limit, setLimit] = useState(5)
  const [skeletonLoading, setSkeletonLoading] = useState(true)
  const [totalUsers, SetTotalUsers] = useState(0)
  const [sentStatus, setSentStatus] = useState<{ [key: string]: boolean }>({})
  const [loading, setLoading] = useState<string | null>(null) // Track loading state by user ID
  const skeletonBaseColor = '#e3e3e3'
  const skeletonHighlightColor = '#f2f2f2'
  useEffect(() => {
    if (allFollowers.length > 0) {
      return
    }
    fetchConnectionSuggestions()
  }, [allFollowers])

  const fetchConnectionSuggestions = async () => {
    try {
      setSkeletonLoading(true)
      const response = await fetch(' https://strengthholdings.com/api/v1/connection/get-connection-suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          page: 1,
          limit: limit,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch connection suggestions')
      }
      setSkeletonLoading(false)
      const data = await response.json()
      setAllFollowers(data.data)
      SetTotalUsers(data?.total)
    } catch (error) {
      console.error('Error fetching connection suggestions:', error)
    } finally {
      setSkeletonLoading(false)
    }
  }

  const UserRequest = async (userId: string) => {
    const newSentStatus = { ...sentStatus }
    const isSending = !sentStatus[userId]
    newSentStatus[userId] = isSending
    setSentStatus(newSentStatus)
    setLoading(userId)

    const apiUrl = isSending
      ? ' https://strengthholdings.com/api/v1/connection/send-connection-request'
      : ' https://strengthholdings.com/api/v1/connection/unsend-connection-request'

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
      })

      if (!res.ok) {
        throw new Error(`Failed to ${isSending ? 'send' : 'unsend'} connection request.`)
      }

      const data = await res.json()
      fetchConnectionSuggestions()
      console.log(`Connection request ${isSending ? 'sent' : 'unsent'} successfully:`, data)
      toast.success(`Connection request ${isSending ? 'sent' : 'unsent'} successfully.`)
    } catch (error) {
      console.error(`Error while trying to ${isSending ? 'send' : 'unsend'} connection request:`, error)
      // Revert status change on failure
      const revertedStatus = { ...newSentStatus, [userId]: !isSending }
      setSentStatus(revertedStatus)
      toast.error(`Failed to ${isSending ? 'send' : 'unsend'} connection request.`)
    } finally {
      setLoading(null) // Clear loading state
    }
  }
  const handleViewMore = () => {
    console.log('limit', limit)
    setLimit(limit + 3)
    fetchConnectionSuggestions()
  }

  const filteredFollowers = allFollowers?.filter((follower) => user?.id !== follower.id)
  return (
    <>
      {/* <ConnectionRequest /> */}
      <br />
      <Card style={{ marginTop: '-22px' }}>
        <CardHeader className="pb-0 border-0">
          <CardTitle className="mb-0" style={{ fontSize: '17px' }}>
            Suggested Connections
          </CardTitle>
        </CardHeader>

        {allFollowers.length > 0 && (
          <CardBody>
            {filteredFollowers?.map(
              (follower, idx) => (
                (
                  <div className="hstack gap-2 mb-3" key={idx}>
                    <div className={clsx('avatar', { 'avatar-story': follower.isStory })}>
                      {skeletonLoading ? (
                        <span role="button">
                          <Skeleton height={40} width={40} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
                        </span>
                      ) : (
                        <span role="button">
                          <img
                            className="avatar-img rounded-circle"
                            src={follower.profilePictureUrl ? follower.profilePictureUrl : avatar}
                            alt={`${follower.firstName}'s profile`}
                          />
                        </span>
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <Link className="h6 mb-0" to={`/profile/feed/${follower.id}`}>
                        {follower.firstName} {follower.lastName}
                      </Link>
                      <p className="mb-0 small text-truncate">{follower.userRole}</p>
                    </div>
                    <Button
                      variant={sentStatus[follower.id] ? 'primary' : 'primary-soft'}
                      className="rounded-circle icon-md ms-auto flex-centered"
                      onClick={() => UserRequest(follower.id)}
                      disabled={loading === follower.id}>
                      {loading === follower.id ? (
                        <Loading size={15} loading={true} />
                      ) : (
                        <span>{sentStatus[follower.id] ? <BsPersonCheckFill /> : <FaPlus />}</span>
                      )}
                    </Button>
                  </div>
                )
              ),
            )}
            <div className="d-grid mt-3">
              {totalUsers >= limit ? (
                <Button variant="primary-soft" size="sm" onClick={handleViewMore}>
                  View more
                </Button>
              ) : (
                <Button variant="info-soft" size="sm" disabled>
                  no more suggestions
                </Button>
              )}
            </div>
          </CardBody>
        )}
      </Card>
    </>
  )
}
export default Followers
