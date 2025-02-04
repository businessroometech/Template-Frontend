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
import PostCard, { PostSchema } from '@/components/cards/PostCard'
import { getAllFeeds } from '@/helpers/data'
import { Link, useParams } from 'react-router-dom'
import { useFetchData } from '@/hooks/useFetchData'
import LoadMoreButton from '../../connections/components/LoadMoreButton'
import { useEffect, useRef, useState } from 'react'
import makeApiRequest from '@/utils/apiServer'
import { useAuthContext } from '@/context/useAuthContext'
import useToggle from '@/hooks/useToggle'
import { UserProfile } from '@/app/(social)/feed/(container)/home/page'
import { ApiResponse } from '@/app/(social)/feed/(container)/home/components/Feeds'

interface PostsProps {
  isCreated : boolean
  setIsCreated : React.Dispatch<React.SetStateAction<boolean>>
  profile : UserProfile
}

const Posts = ({ isCreated,setIsCreated,profile } : PostsProps) => {
  console.log('Profile in Feed', profile)
  const { user } = useAuthContext();
  // console.log('profile in feed',profile)
  const [posts, setPosts] = useState<PostSchema[]>([])
  const [loading, setLoading] = useState<boolean>(true) // Loading state
  const [error, setError] = useState<string | null>(null) // Error state
  const hasMounted = useRef(false) // Track whether the component has mounted
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [runsOnce, setRunsOnce] = useState(false); // That Use Effect doesn't run on mount
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tlRefresh, setTlRefresh] = useState<number>();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // const [profile,setProfile] = useState({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [flag, setflag] = useState(false);


  const fetchPosts = async (pageNumber: number) => {
    setError(null);
    setHasMore(true);
    // console.log('fetching posts');
    try {
      const res = await makeApiRequest<ApiResponse>({
        method: 'POST',
        url: 'api/v1/post/get-userpost-byUserId',
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  }, [page]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return;
    }
    // alert('Posts reset');
    setPage(1);
    fetchPosts(1);
  }, [isCreated]);


  const fetchNextPage = () => {
    // alert('Next Page Fetch')
    if (!loading && hasMore) {
      setPage(page => page + 1);
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

          {posts.map((post) => (
            <PostCard
              item={post}
              key={post.post.Id}
              setIsCreated={setIsCreated}
              isCreated={isCreated}
              profile={profile}
            />
          ))}
        </InfiniteScroll>
      </div>
    </>
  )
}
export default Posts
