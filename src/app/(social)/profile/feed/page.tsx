import CreatePostCard from '@/components/cards/CreatePostCard'
import Posts from './components/Posts'
import PageMetaData from '@/components/PageMetaData'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '@/context/useAuthContext'

const Feed = () => {
  const [isCreated,setIsCreated] = useState<boolean>(false);
  const { user } = useAuthContext()
  const  currentUser = useParams()
  const isUser = user?.id === currentUser.id
  return (
    <div style={{}}>
      <PageMetaData title='Feed'/>
      {isUser?(<CreatePostCard isCreated={isCreated} setIsCreated={setIsCreated}/>):(<></>)}
      <Posts isCreated={isCreated}/>
      </div>
  )
}
export default Feed
