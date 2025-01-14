

import { Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'
import {
  BsBookmark,
  BsBookmarkCheck,
  BsChatFill,
  BsEnvelope,
  BsFlag,
  BsHeart,
  BsHeartFill,
  BsLink,
  BsPencilSquare,
  BsPersonX,
  BsReplyFill,
  BsSendFill,
  BsShare,
  BsSlashCircle,
  BsThreeDots,
  BsXCircle,
} from 'react-icons/bs'

import logo13 from '@/assets/images/logo/13.svg'

import PostCard from '@/components/cards/PostCard'
import { getAllFeeds } from '@/helpers/data'
import { Link } from 'react-router-dom'
import { useFetchData } from '@/hooks/useFetchData'
import LoadMoreButton from '../../connections/components/LoadMoreButton'
import { useEffect, useRef, useState } from 'react'
import makeApiRequest from '@/utils/apiServer'
import { useAuthContext } from '@/context/useAuthContext'
import useToggle from '@/hooks/useToggle'

const ActionMenu = ({ name }: { name?: string }) => {
  return (
    <Dropdown>
      <DropdownToggle as="a" className="text-secondary btn btn-secondary-soft-hover py-1 px-2 content-none" id="cardFeedAction">
        <BsThreeDots />
      </DropdownToggle>

      <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardFeedAction">
        <li>
          <DropdownItem>
            
            <BsBookmark size={22} className="fa-fw pe-2" />
            Save post
          </DropdownItem>
        </li>
        <li>
          <DropdownItem>
            
            <BsPersonX size={22} className="fa-fw pe-2" />
            Unfollow {name}
          </DropdownItem>
        </li>
        <li>
          <DropdownItem>
            
            <BsXCircle size={22} className="fa-fw pe-2" />
            Hide post
          </DropdownItem>
        </li>
        <li>
          <DropdownItem>
            
            <BsSlashCircle size={22} className="fa-fw pe-2" />
            Block
          </DropdownItem>
        </li>
        <li>
          <DropdownDivider />
        </li>
        <li>
          <DropdownItem>
            
            <BsFlag size={22} className="fa-fw pe-2" />
            Report post
          </DropdownItem>
        </li>
      </DropdownMenu>
    </Dropdown>
  )
}

const Posts =  ({isCreated}) => {
  const { user } = useAuthContext();
 
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false) // Loading state
  const [error, setError] = useState<string | null>(null) // Error state
  const hasMounted = useRef(false) // Track whether the component has mounted
  const [limit,setLimit] = useState<number>(5);
  const {setTrue,setFalse,isTrue : isSpinning} = useToggle();
  // onDelete= async () => {
        
  //   try {
  //     const response = await fetch(`${LIVE_URL}api/v1/post/delete-userpost-byPostId`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Add token if required
  //       },
  //       body: JSON.stringify({
  //         userId: user?.id,
  //         PostId: post.post?.Id,
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     const data = await response.json();
  //     console.log(tlRefresh) // Assuming the response is JSON
  //     setTlRefresh(tlRefresh+1 || 1);
  //     console.log(tlRefresh)
  //     console.log(data);
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     console.error('Error Deleting post:', error.message);
  //   } finally {
  //     console.log('call done')
  //   }
  // }

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {      
      const res = await makeApiRequest<{ data: any[] }>({
        method: 'POST',
        url: 'api/v1/post/get-userpost-byUserId',
        data: { userId: user?.id, page : 1,limit : limit},
      })

      console.log('Fetched Posts:', res)
      setPosts(res.data.posts || [])
    } catch (error: any) {
      console.error(JSON.stringify(error))
      setError("This User have no Posts")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // If the component has mounted already, only fetch posts if `isCreated` is true
    if (hasMounted.current) {
      if (isCreated) {
        fetchPosts()
      }
    } else {
      // If it's the first mount, fetch posts
      fetchPosts()
      hasMounted.current = true // Set to true after the first call
    }
  }, [isCreated])

  const postData = [
    { progress: 25, title: 'We have cybersecurity insurance coverage' },
    { progress: 15, title: 'Our dedicated staff will protect us' },
    { progress: 10, title: 'We give regular training for best practices' },
    { progress: 55, title: 'Third-party vendor protection' },
  ]

  // Conditional rendering
  if (loading) {
    return <div>Loading posts...</div> // Show a loading spinner or message
  }

  if (error) {
    return <div>Error: {error}</div> // Show an error message
  }

  return (
    <>
      <div>{posts.length !== 0 ? posts.map((post, index) => <PostCard item={post} key={index}/>) : <p>No posts found.</p>}</div>

      {/* <SponsoredCard /> */}
      {/* <Post2 /> */}
      {/* <People /> */}
      {/* <CommonPost>
        <div className="vstack gap-2">
          {postData.map((item, idx) => (
            <div key={idx}>
              <input type="radio" className="btn-check" name="poll" id={`option${idx}`} />
              <label className="btn btn-outline-primary w-100" htmlFor={`option${idx}`}>
                {item.title}
              </label>
            </div>
          ))}
        </div>
      </CommonPost> */}

      {/* <CommonPost>
        <Card className="card-body mt-4">
          <div className="d-sm-flex justify-content-sm-between align-items-center">
            <span className="small">16/20 responded</span>
            <span className="small">Results not visible to participants</span>
          </div>
          <div className="vstack gap-4 gap-sm-3 mt-3">
            {postData.map((item, idx) => (
              <div className="d-flex align-items-center justify-content-between" key={idx}>
                <div className="overflow-hidden w-100 me-3">
                  <div className="progress bg-primary bg-opacity-10 position-relative" style={{ height: 30 }}>
                    <div
                      className="progress-bar bg-primary bg-opacity-25"
                      role="progressbar"
                      style={{ width: `${item.progress}%` }}
                      aria-valuenow={item.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}></div>
                    <span className="position-absolute pt-1 ps-3 fs-6 fw-normal text-truncate w-100">{item.userRole}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">{item.progress}%</div>
              </div>
            ))}
          </div>
        </Card>
      </CommonPost> */}

      {/* <Post3 /> */}
      {/* <SuggestedStories /> */}
      <LoadMoreButton limit={limit} setLimit={setLimit} isSpinning={isSpinning}/>
    </>
  )
}
export default Posts
