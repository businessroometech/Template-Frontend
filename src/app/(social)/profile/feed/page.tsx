import CreatePostCard from '@/components/cards/CreatePostCard'
import Posts from './components/Posts'
import PageMetaData from '@/components/PageMetaData'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '@/context/useAuthContext'
import { UserProfile } from '../../feed/(container)/home/page'
import { LIVE_URL } from '@/utils/api'
import { Divide } from 'lucide-react'

const Feed = () => {
  const [isCreated,setIsCreated] = useState<boolean>(false);
  const { user } = useAuthContext()
  const  currentUser = useParams()
  const isUser = user?.id === currentUser.id
  const [profile,setProfile] = useState<UserProfile>({});

   useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await fetch(`${LIVE_URL}api/v1/auth/get-user-Profile`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user?.id,
              //profileId: user?.id,
            }),
          })
    
          if (!response.ok) {
            //  navigate('/not-found')
            throw new Error('Network response was not ok')
          }
          if (response.status === 404) {
            // navigate('/not-found')
          }
          const data = await response.json()
          
          setProfile(data?.data);
        } catch (error) {
          console.error('Error fetching user profile:', error)
        } 
      }
      fetchUser();
    },[user.id])
  ;
  return (
    <div style={{}}>
      <PageMetaData title='Feed'/>
      {isUser?(<div style={{marginBottom : '20px'}}>
        <CreatePostCard isCreated={isCreated} setIsCreated={setIsCreated}/>
      </div>):(<></>)}
      <Posts isCreated={isCreated} setIsCreated={setIsCreated} profile={profile}/>
      </div>
  )
}
export default Feed
