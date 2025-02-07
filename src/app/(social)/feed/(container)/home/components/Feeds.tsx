import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useRef, useState } from 'react'
import PostCard, { PostSchema } from '@/components/cards/PostCard'
import { Link } from 'react-router-dom'
import makeApiRequest from '@/utils/apiServer'
import { SOCKET_URL } from '@/utils/api'
import { useAuthContext } from '@/context/useAuthContext'
import { useOnlineUsers } from '@/context/OnlineUser.';
import { io } from 'socket.io-client';
import { FaArrowUp } from 'react-icons/fa';
import { UserProfile } from '../page';

// ----------------- data type --------------------

const socket = io(`${SOCKET_URL}`);
// poll
interface FeedsProps {
  isCreated: boolean;
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: UserProfile
}

export type ApiResponse = {
  message: string;
  data: {
    posts: PostSchema[];
    page: string;
    limit: number;
    totalPosts: number;
  };
};


const Feeds = ({ isCreated, setIsCreated, profile }: FeedsProps) => {
  // console.log('Profile in Feed', profile)
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
  const { fetchOnlineUsers } = useOnlineUsers();
  const [flag, setflag] = useState(false);


  const fetchPosts = async (pageNumber: number) => {
    if(pageNumber<=2){
      setflag(false)
    }
    setError(null);
    setHasMore(true);
    // console.log('fetching posts');
    try {
      const res = await makeApiRequest<ApiResponse>({
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

  useEffect(() => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on('postSent', (data: any) => {
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
        {flag && page>2 && <Link to="/"
          className="position-fixed start-50 translate-middle-x btn btn-primary"
          style={{ zIndex: 9999, top: '2em', alignItems: "center", display: "flex", justifyContent: "center", backgroundColor: "#1ea1f2", color: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
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
export default Feeds
