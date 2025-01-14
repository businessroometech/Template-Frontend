import CreatePostCard from '@/components/cards/CreatePostCard'
import Posts from './components/Posts'
import PageMetaData from '@/components/PageMetaData'
import { useState } from 'react'

const Feed = () => {
  const [isCreated,setIsCreated] = useState<boolean>(false);
  return (
    <>
    <PageMetaData title='Feed'/>
      <CreatePostCard setIsCreated={setIsCreated}/>
      <Posts isCreated={isCreated}/>
    </>
  )
}
export default Feed
