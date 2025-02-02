import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useRef, useState, type ReactNode } from 'react'
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

import avatar4 from '@/assets/images/avatar/04.jpg'
import logo11 from '@/assets/images/logo/11.svg'
import logo12 from '@/assets/images/logo/12.svg'
import logo13 from '@/assets/images/logo/13.svg'
import postImg2 from '@/assets/images/post/3by2/02.jpg'
import postImg4 from '@/assets/images/post/3by2/03.jpg'
import PostCard from '@/components/cards/PostCard'
import { Link } from 'react-router-dom'
import makeApiRequest from '@/utils/apiServer'
import { LIVE_URL, SOCKET_URL } from '@/utils/api'
import { useAuthContext } from '@/context/useAuthContext'
import { useOnlineUsers } from '@/context/OnlineUser.';
import { io } from 'socket.io-client';
import { FaArrowUp } from 'react-icons/fa';
import { UserProfile } from '../page';

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

const socket = io(`${SOCKET_URL}`); 
// poll
interface FeedsProps {
  isCreated: boolean;
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>;
  profile : UserProfile
}


const Feeds = ({isCreated,setIsCreated,profile} : FeedsProps) => {
  console.log('Profile in Feed',profile)
  const { user } = useAuthContext();
  // console.log('profile in feed',profile)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true) // Loading state
  const [error, setError] = useState<string | null>(null) // Error state
  const hasMounted = useRef(false) // Track whether the component has mounted
  const [runsOnce,setRunsOnce] = useState(false); // That Use Effect doesn't run on mount
  const [tlRefresh, setTlRefresh] = useState<number>();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showNewPostButton, setShowNewPostButton] = useState(false);
  // const [profile,setProfile] = useState({});
  const {fetchOnlineUsers} = useOnlineUsers();
  const [flag, setflag] = useState(false);
  const fetchPosts = async (pageNumber: number) => {
    setError(null);
    setHasMore(true);
    // console.log('fetching posts');
    try {
      const res = await makeApiRequest<{ data: any[] }>({
        method: 'POST',
        url: 'api/v1/post/get-all-post',
        data: { userId: user?.id, page: pageNumber },
      });
  
      if (res.message === "No posts found for this user.") {
        setHasMore(false);
        console.log('No posts found');
        return;
      }
  
      if (pageNumber === 1) {
        setPosts([...res.data.posts]);
      } else {
        setPosts((previousPosts) => [...previousPosts, ...res.data.posts]);
      }
    } catch (error: any) {
      console.error('Error fetching posts:', error.message);
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {    
    // alert(`Fetching Post of Page, ${page}`)
    fetchPosts(page);
  },[page]);

  useEffect(() => {
    if(!hasMounted.current) {
      hasMounted.current = true
      return;
    }
    // alert('Posts reset');
    setPage(1);
    fetchPosts(1);
  }, [isCreated]);
 
useEffect(() => {
  
  socket.on('postSent', (data:any) => {
    if (data.success) {
      setflag(data.success);
      console.log('Post was sent successfully:', data.postId);
    } else {
      console.log('Failed to send post');
    }
  });

  return () => {
    socket.off('postSent');
  };
}, [user?.id, flag]);

  const fetchNextPage = () => {
    if(!loading && hasMore){
      setPage(page => page + 1);
    }
  }

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
      // console.log(data);
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
    return <div>Error: {error}</div>
  }


  return (
    <>
      <div className="position-relative">
     {flag && !isCreated && <Link to="/"
          className="position-fixed start-50 translate-middle-x btn btn-primary"
          onClick={() => setShowNewPostButton(true)}
          style={{ zIndex: 9999, top: '2em' , alignItems:"center", display:"flex", justifyContent:"center", backgroundColor:"#1ea1f2", color:"#fff", boxShadow:"0 2px 4px rgba(0,0,0,0.1)"}}
        >
          <FaArrowUp color='#fff' /> &nbsp;New posts
        </Link>}
          <InfiniteScroll
            dataLength={posts.length} 
            next={fetchNextPage} 
            hasMore={hasMore} 
            loader={
              <div>
                {[...Array(5)].map((_, index) => (
                  <PostSkeleton key={index} />
                ))}
              </div>
            }
            endMessage={
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <strong>No Posts are available.</strong>
              </div>
            }
            // Matches the id of the scrollable container
          >
            
            {posts.map((post, index) => (
              <PostCard
                item={post}
                posts={posts}
                setPosts={setPosts}
                key={post.post.Id}
                isMediaKeys={false}
                onDelete={handleDelete}
                setIsCreated={setIsCreated}
                tlRefresh={tlRefresh}
                setTlRefresh={setTlRefresh}
                scrollbarWidth="none"
                profile={profile}
              />
            ))}
          </InfiniteScroll>
        </div>
    </>
  )
}
export default Feeds
