import { getAllFeeds } from '@/helpers/data'
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
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
  BsInfoCircle,
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
import People from './People'

import avatar4 from '@/assets/images/avatar/04.jpg'
import logo11 from '@/assets/images/logo/11.svg'
import logo12 from '@/assets/images/logo/12.svg'
import logo13 from '@/assets/images/logo/13.svg'
import postImg2 from '@/assets/images/post/3by2/02.jpg'
import postImg4 from '@/assets/images/post/3by2/03.jpg'
import PostCard from '@/components/cards/PostCard'
import { Link } from 'react-router-dom'
import LoadMoreButton from './LoadMoreButton'
import SuggestedStories from './SuggestedStories'
import makeApiRequest from '@/utils/apiServer'
import { LIVE_URL } from '@/utils/api'
import { useAuthContext } from '@/context/useAuthContext'
import useToggle from '@/hooks/useToggle'
import Loading from '@/components/Loading'

// ----------------- data type --------------------
interface Post {
  id: string
  title: string
  content: string
}

interface GetAllPostsResponse {
  data: Post[]
}
// --------------------------------------------------

const ActionMenu = ({ name }: { name?: string }) => {
  return (
    <Dropdown drop="start">
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

const SponsoredCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar me-2">
              <span role="button">
                <img className="avatar-img rounded-circle" src={logo12} alt="image" />
              </span>
            </div>

            <div>
              <h6 className="card-title mb-0">
                <Link to=""> Bootstrap: Front-end framework </Link>
              </h6>
              <Link to="" className="mb-0 text-body">
                Sponsored
                <BsInfoCircle
                  className="ps-1"
                  data-bs-container="body"
                  data-bs-toggle="popover"
                  data-bs-placement="top"
                  data-bs-content="You're seeing this ad because your activity meets the intended audience of our site."
                />
              </Link>
            </div>
          </div>
          <ActionMenu />
        </div>
      </CardHeader>

      <CardBody>
        <p className="mb-0">Quickly design and customize responsive mobile-first sites with Bootstrap.</p>
      </CardBody>
      <img src={postImg2} alt="post-image" />

      <CardFooter className="border-0 d-flex justify-content-between align-items-center">
        <p className="mb-0">Currently v5.1.3 </p>
        <Button variant="primary-soft" size="sm">
          Download now
        </Button>
      </CardFooter>
    </Card>
  )
}

const Post2 = () => {
  return (
    <Card>
      <CardHeader className="border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar me-2">
              <span role="button">
                <img className="avatar-img rounded-circle" src={logo13} alt="logo" />
              </span>
            </div>

            <div>
              <h6 className="card-title mb-0">
                <Link to=""> Apple Education </Link>
              </h6>
              <p className="mb-0 small">9 November at 23:29</p>
            </div>
          </div>
          <ActionMenu />
        </div>
      </CardHeader>
      <CardBody className="pb-0">
        <p>
          Find out how you can save time in the classroom this year. Earn recognition while you learn new skills on iPad and Mac. Start recognition
          your first Apple Teacher badge today!
        </p>

        <ul className="nav nav-stack pb-2 small">
          <li className="nav-item">
            <Link className="nav-link active text-secondary" to="">
              <span className="me-1 icon-xs bg-danger text-white rounded-circle">
                <BsHeartFill size={10} />
              </span>
              Louis, Billy and 126 others
            </Link>
          </li>
          <li className="nav-item ms-sm-auto">
            <Link className="nav-link" to="">
              <BsChatFill size={18} className="pe-1" />
              Comments (12)
            </Link>
          </li>
        </ul>
      </CardBody>

      <CardFooter className="py-3">
        <ul className="nav nav-fill nav-stack small">
          <li className="nav-item">
            <Link className="nav-link mb-0 active" to="">
              <BsHeart className="pe-1" size={18} />
              Liked (56)
            </Link>
          </li>

          <Dropdown className="nav-item">
            <DropdownToggle as="a" className="nav-link mb-0 content-none cursor-pointer" id="cardShareAction6" aria-expanded="false">
              <BsReplyFill className="flip-horizontal ps-1" size={18} />
              Share (3)
            </DropdownToggle>

            <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardShareAction6">
              <li>
                <DropdownItem>
                  <BsEnvelope size={22} className="fa-fw pe-2" />
                  Send via Direct Message
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  <BsBookmarkCheck size={22} className="fa-fw pe-2" />
                  Bookmark
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  <BsLink size={22} className="fa-fw pe-2" />
                  Copy link to post
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  <BsShare size={22} className="fa-fw pe-2" />
                  Share post via …
                </DropdownItem>
              </li>
              <li>
                <DropdownDivider />
              </li>
              <li>
                <DropdownItem>
                  <BsPencilSquare size={22} className="fa-fw pe-2" />
                  Share to News Feed
                </DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>

          <li className="nav-item">
            <Link className="nav-link mb-0" to="">
              <BsSendFill className="pe-1" size={18} />
              Send
            </Link>
          </li>
        </ul>
      </CardFooter>
    </Card>
  )
}

const CommonPost = ({ children }: { children: ReactNode }) => {
  return (
    <Card>
      <CardHeader className="border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar me-2">
              <span role="button">
                <img className="avatar-img rounded-circle" src={avatar4} alt="image-4" />
              </span>
            </div>

            <div>
              <h6 className="card-title mb-0">
                <Link to=""> All in the Mind </Link>
              </h6>
              <p className="mb-0 small">9 November at 23:29</p>
            </div>
          </div>
          <ActionMenu />
        </div>
      </CardHeader>

      <CardBody className="pb-0">
        <p>How do you protect your business against cyber-crime?</p>

        {children}

        <ul className="nav nav-divider mt-2 mb-0">
          <li className="nav-item">
            <Link className="nav-link" to="">
              263 votes
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              2d left
            </Link>
          </li>
        </ul>

        <ul className="nav nav-stack pb-2 small">
          <li className="nav-item">
            <Link className="nav-link active text-secondary" to="">
              <span className="me-1 icon-xs bg-danger text-white rounded-circle">
                <BsHeartFill size={10} />
              </span>
              Louis, Billy and 126 others
            </Link>
          </li>
          <li className="nav-item ms-sm-auto">
            <Link className="nav-link" to="">
              <BsChatFill size={18} className="pe-1" />
              Comments (12)
            </Link>
          </li>
        </ul>
      </CardBody>

      <div className="card-footer py-3">
        <ul className="nav nav-fill nav-stack small">
          <li className="nav-item">
            <Link className="nav-link mb-0 active" to="">
              <BsHeart className="pe-1" size={18} />
              Liked (56)
            </Link>
          </li>

          <Dropdown className="nav-item">
            <DropdownToggle as="a" className="nav-link mb-0 content-none cursor-pointer" id="cardShareAction6" aria-expanded="false">
              <BsReplyFill className="flip-horizontal ps-1" size={18} />
              Share (3)
            </DropdownToggle>

            <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardShareAction6">
              <li>
                <DropdownItem>
                  <BsEnvelope size={22} className="fa-fw pe-2" />
                  Send via Direct Message
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  <BsBookmarkCheck size={22} className="fa-fw pe-2" />
                  Bookmark
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  <BsLink size={22} className="fa-fw pe-2" />
                  Copy link to post
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  <BsShare size={22} className="fa-fw pe-2" />
                  Share post via …
                </DropdownItem>
              </li>
              <li>
                <DropdownDivider />
              </li>
              <li>
                <DropdownItem>
                  <BsPencilSquare size={22} className="fa-fw pe-2" />
                  Share to News Feed
                </DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>

          <li className="nav-item">
            <Link className="nav-link mb-0" to="">
              <BsSendFill className="pe-1" size={18} />
              Send
            </Link>
          </li>
        </ul>
      </div>
    </Card>
  )
}

const Post3 = () => {
  return (
    <Card>
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar me-2">
              <span role="button">
                <img className="avatar-img rounded-circle" src={logo11} alt="logo" />
              </span>
            </div>
            <div>
              <h6 className="card-title mb-0">
                <Link to=""> Webestica </Link>
              </h6>
              <p className="small mb-0">9 December at 10:00 </p>
            </div>
          </div>
          <ActionMenu />
        </div>
      </CardHeader>
      <CardBody>
        <p className="mb-0">
          The next-generation blog, news, and magazine theme for you to start sharing your content today with beautiful aesthetics! This minimal &amp;
          clean Bootstrap 5 based theme is ideal for all types of sites that aim to provide users with content. <Link to=""> #bootstrap</Link>
          <Link to=""> #webestica </Link> <Link to=""> #getbootstrap</Link> <Link to=""> #bootstrap5 </Link>
        </p>
      </CardBody>

      <span role="button">
        <img src={postImg4} alt="post-image" />
      </span>

      <CardBody className="position-relative bg-light">
        <Link to="" className="small stretched-link">
          https://blogzine.webestica.com
        </Link>
        <h6 className="mb-0 mt-1">Blogzine - Blog and Magazine Bootstrap 5 Theme</h6>
        <p className="mb-0 small">Bootstrap based News, Magazine and Blog Theme</p>
      </CardBody>

      <CardFooter className="py-3">
        <ul className="nav nav-fill nav-stack small">
          <li className="nav-item">
            <Link className="nav-link mb-0 active" to="">
              <BsHeart size={18} className="pe-1" />
              Liked (56)
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mb-0" to="">
              <BsChatFill size={18} className="pe-1" />
              Comments (12)
            </Link>
          </li>

          <Dropdown className="nav-item">
            <DropdownToggle as="a" className="nav-link mb-0 content-none cursor-pointer" id="cardShareAction6" aria-expanded="false">
              <BsReplyFill className="flip-horizontal ps-1" size={18} />
              Share (3)
            </DropdownToggle>

            <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardShareAction6">
              <li>
                <DropdownItem>
                  <BsEnvelope size={22} className="fa-fw pe-2" />
                  Send via Direct Message
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  <BsBookmarkCheck size={22} className="fa-fw pe-2" />
                  Bookmark
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  <BsLink size={22} className="fa-fw pe-2" />
                  Copy link to post
                </DropdownItem>
              </li>
              <li>
                <DropdownItem>
                  <BsShare size={22} className="fa-fw pe-2" />
                  Share post via …
                </DropdownItem>
              </li>
              <li>
                <DropdownDivider />
              </li>
              <li>
                <DropdownItem>
                  <BsPencilSquare size={22} className="fa-fw pe-2" />
                  Share to News Feed
                </DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>

          <li className="nav-item">
            <Link className="nav-link mb-0" to="">
              <BsSendFill size={18} className="pe-1" />
              Send
            </Link>
          </li>
        </ul>
      </CardFooter>
    </Card>
  )
}

// poll
const Feeds = (isCreated: boolean) => {
 
   const { user } = useAuthContext();
 
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true) // Loading state
  const [error, setError] = useState<string | null>(null) // Error state
  const hasMounted = useRef(false) // Track whether the component has mounted
  const [tlRefresh, setTlRefresh] = useState<number>();
  const [page, setPage] = useState(1);
 const [hasMore, setHasMore] = useState(true);
  const [showNewPostButton, setShowNewPostButton] = useState(false);
  // const [limit,setLimit] = useState<number>(5);
//  const {setTrue,setFalse,isTrue : isSpinning} = useToggle();
  

  const fetchPosts = async () => {
    setError(null);
    setHasMore(true);
    console.log('fetching posts');
    try {      
      const res = await makeApiRequest<{ data: any[] }>({
        method: 'POST',
        url: 'api/v1/post/get-all-post',
        data: { userId: user?.id, page: page },
      })

      if(res.message === "No posts found for this user."){
        setHasMore(false);
        console.log('went in');
        return;
      }
      setLoading(false)
      //console.log('Fetched Posts:', res)
      setPosts(previousPosts => [...previousPosts, ...res.data])
    } catch (error: any) {
      console.error('Error fetching posts:', error.message)
      setError(error.message || 'An unknown error occurred')
     } finally {
      setLoading(false)
     }
  }

  // useEffect(() => {
  //   // If the component has mounted already, only fetch posts if `isCreated` is true
  //   // fetchPosts()
  //   setTrue();
  //   if (hasMounted.current) {
  //     if (isCreated) {
  //       fetchPosts()
  //     }
  //   } else {
  //     // If it's the first mount, fetch posts
  //     fetchPosts()
  //     hasMounted.current = true // Set to true after the first call
  //   }
  // }, [isCreated])

  useEffect(() =>{
    fetchPosts();
  },[page])

  const fetchNextPage = () => {
    if(!loading && hasMore){
      setPage(page => page + 1);
    }
  }

  // const handleScroll = useCallback(() => {
  //   const scrollHeight = scrollContainerRef.current.scrollHeight;
  //   const scrollTop = scrollContainerRef.current.scrollTop;
  //   const clientHeight = scrollContainerRef.current.clientHeight;
  //   if (scrollTop + clientHeight >= scrollHeight) {
  //     setPage((prev) => prev + 1);
  //   }
  // },[loading,page]);

  // useEffect(()=>{
  //   const currentRef = scrollContainerRef.current;
  //   if (currentRef) {
  //     currentRef.addEventListener('scroll', handleScroll);
  //   }

  //   return () => {
  //     if (currentRef) {
  //       currentRef.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // },[handleScroll])
  

  

  const handleDelete = async () => {
        
    try {
      const response = await fetch(`${LIVE_URL}api/v1/post/delete-userpost-byPostId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Add token if required
        },
        body: JSON.stringify({
          userId: user?.id,
          PostId: post.post?.Id,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(tlRefresh) // Assuming the response is JSON
      setTlRefresh(tlRefresh+1 || 1);
      console.log(tlRefresh)
      console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error Deleting post:', error.message);
    } finally {
      console.log('call done')
    }
  }

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
    return <div style={{ minHeight: '110vh', padding: '16px' }}>
    {[...Array(5)].map((_, index) => (
      <PostSkeleton key={index} />
    ))}
  </div> 
  }

  if (error) {
    return <div>Error: {error}</div> // Show an error message
  }


  // Infinte Scroll

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

// setTimeout(() => {
//   setShowNewPostButton(true)
// }, 500000);

  return (
    <>
   <div 
  className="position-relative"
  style={{
    position: 'sticky',
    overflowY: 'auto',
    maxHeight: '500px',
    WebkitOverflowScrolling: 'touch',
    // Example to shrink the space taken by the sidebar (if sidebar is hidden)
    marginLeft: '0', // Adjust margin or padding if the sidebar is removed
  }} 
>
  <InfiniteScroll
    dataLength={posts.length}
    next={fetchNextPage}
    hasMore={hasMore}
    loader={<div>
      {[...Array(5)].map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>}
    endMessage={
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <strong>No more posts are available.</strong>
      </div>
    }
  >
    {showNewPostButton && (
      <Link 
        to="/feed/home#"
        className="btn-primary"
        onClick={() => setShowNewPostButton(false)}
        style={{ zIndex: 99, top: "4em", position: "fixed", left: "47%" }}
      >
        ⬆️ New Posts
      </Link>
    )}
    
    {posts.map((post, index) => (
      <PostCard 
        item={post} 
        posts={posts}
        setPosts={setPosts}
        key={post.Id || index} 
        isMediaKeys={false}
        onDelete={handleDelete} 
        setIsCreated={isCreated}
        tlRefresh={tlRefresh}
        setTlRefresh={setTlRefresh}
        scrollbarWidth="none"
      />
    ))}
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
export default Feeds
