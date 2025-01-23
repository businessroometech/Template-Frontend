import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap'
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
import InfiniteScroll from 'react-infinite-scroll-component'
import logo13 from '@/assets/images/logo/13.svg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PostCard from '@/components/cards/PostCard'
import { getAllFeeds } from '@/helpers/data'
import { Link, useParams } from 'react-router-dom'
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

const Posts = ({ isCreated }) => {
  const { user } = useAuthContext()

  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false) // Loading state
  const [error, setError] = useState<string | null>(null) // Error state
  const hasMounted = useRef(false) // Track whether the component has mounted
  const [page, setPage] = useState(1);
 const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState<number>(3)
  const CurrentUser = useParams()

  // const { setTrue, setFalse, isTrue: isSpinning } = useToggle()
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
    setHasMore(true)
    setError(null)
    try {
      const res = await makeApiRequest<{ data: any[] }>({
        method: 'POST',
        url: 'api/v1/post/get-userpost-byUserId',
        data: { userId: CurrentUser  ?.id, page: page, limit: limit },
      })
      if(res.message == "No posts found for this user."){
        setHasMore(false);
        return;
      }
      setLoading(false)
      console.log('res', res.data.posts)
      setPosts(previousData => [...previousData,...res.data.posts])
    } catch (error: any) {
      console.error(JSON.stringify(error))
      setError('This User have no Posts');//18001233330
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [page])


  const PostSkeleton = () => {
    return (
      <div style={{ padding: '16px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #e0e0e0', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Skeleton circle width={50} height={50} />
          <div style={{ marginLeft: '16px', flex: 1 }}>
            <Skeleton width="60%" height={20} />
            <Skeleton width="40%" height={16} style={{ marginTop: '8px' }} />
          </div>
        </div>
        <Skeleton width="100%" height={200} />
        <div style={{ marginTop: '16px' }}>
          <Skeleton width="80%" height={16} />
          <Skeleton width="95%" height={16} style={{ marginTop: '8px' }} />
          <Skeleton width="60%" height={16} style={{ marginTop: '8px' }} />
        </div>
      </div>
    );
  };
  // Conditional rendering
  if (loading) {
    return  <div style={{ minHeight: '110vh', padding: '16px' }}>
    {[...Array(3)].map((_, index) => (
      <PostSkeleton key={index} />
    ))}
  </div> // Show a loading spinner or message
  }

  if (error) {
    return <div>Error: {error}</div> // Show an error message
  }
  const fetchNextPage = () => {
    if(!loading && hasMore){
      setPage(page => page + 1);
    }
  }


  // const [showNewPostButton, setShowNewPostButton] = useState(false);
  // const scrollContainerRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (scrollContainerRef.current) {
  //       const scrollTop = scrollContainerRef.current.scrollTop;

  //       // Show button if scrolled up or near the top (scrollTop < 1000)
  //       if (scrollTop < 1) {
  //         setShowNewPostButton(true);
  //       } else {
  //         setShowNewPostButton(false);
  //       }
  //     }
  //   };

  //   const container = scrollContainerRef.current;

  //   if (container) {
  //     container.addEventListener('scroll', handleScroll);
  //   }

  //   return () => {
  //     if (container) {
  //       container.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, []);

  return (
    <>
      <div
        className="position-relative"
        // ref={scrollContainerRef}
        style={{ maxHeight: '500px' }}><InfiniteScroll
            dataLength={posts.length}
            next={fetchNextPage}
            hasMore={hasMore}
            loader={<div>
              {[...Array(3)].map((_, index) => (
                <PostSkeleton key={index} />
              ))}
            </div>}
            endMessage={
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <strong>No posts are available.</strong>
              </div>
            }
          >

        {/* <Button
          className="position-absolute top-0 start-50 translate-middle-x"
          onClick={() => fetchPosts()}
          style={{ zIndex: 9999 }}
        >
          ⬆️ New Posts
        </Button> */}
        {posts.map((post, index) => (
          <PostCard item={post} key={post.Id || index} isMediaKeys={true} />))}
          </InfiniteScroll>
      </div>

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
      {/* <LoadMoreButton limit={limit} setLimit={setLimit} isSpinning={isSpinning}/> */}
    </>
  )
}
export default Posts
