import { useState, useEffect } from 'react';
import { BsFillHandThumbsUpFill, BsSendFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { MessageSquare, Repeat, Share, ThumbsUp } from 'lucide-react';
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap';
import CommentItem from './components/CommentItem';
import LoadContentButton from '../LoadContentButton';
import { CircleUserRound } from 'lucide-react';
import { useAuthContext } from '@/context/useAuthContext';
import useToggle from '@/hooks/useToggle';
import fallBackAvatar from '../../assets/images/avatar/01.jpg';

const PostCard = ({ item }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const [refresh, setRefresh] = useState(0);
  const [likeStatus, setLikeStatus] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const post = item?.post;
  const userInfo = item?.userDetails;
  const { setTrue, setFalse } = useToggle();

  useEffect(() => {
    if (post?.likeStatus !== undefined) {
      setLikeStatus(post.likeStatus);
    } else {
      setLikeStatus(false);
    }
  }, [post.likeStatus]);

  useEffect(() => {
    likeStatus ? setTrue() : setFalse();
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://app-backend-8r74.onrender.com/api/v1/post/get-comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page: 1, postId: post?.Id }),
        });

        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        setComments(data.data.comments || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (post?.Id) fetchComments();
  }, [refresh, post?.Id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const response = await fetch('https://app-backend-8r74.onrender.com/api/v1/post/create-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        },
        body: JSON.stringify({ postId: post.Id, userId: user?.id, text: commentText }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setRefresh((prev) => prev + 1);
      setCommentText('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const toggleLike = async () => {
    try {
      const response = await fetch('https://app-backend-8r74.onrender.com/api/v1/post/create-like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.id, postId: post.Id, status: !likeStatus }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setLikeStatus((prev) => !prev);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="border-0 pb-0">
        <Link  to= {(`/profile/feed/${post?.userId}`)} className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar me-2">
              {userInfo?.avatar ? (
                <span role="button">
                  <img className="avatar-img rounded-circle" src={userInfo.avatar} alt={userInfo.firstName} />
                </span>
              ) : (
                <span role="button">
                  <img className="avatar-img rounded-circle" src={fallBackAvatar} alt={'avatar'} />
                </span>
              )}
            </div>
            <div>
              <div className="nav nav-divider" >
                <h6 className="nav-item card-title  mb-0" style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexDirection:"column"}}>
                  <span role="button" className="nav-item text-start mx-3 ">{userInfo?.firstName } { userInfo?.lastName}</span>
                <span className=" small mx-3 "> {userInfo?.userRole?userInfo?.userRole:"User role not define"}</span>
                </h6>
              </div>
            </div>
          </div>
                <span className="nav-item small mx-2"> {userInfo?.timestamp}</span>
        </Link>
      </CardHeader>

      <CardBody>
        {post?.content && <p className="mb-3">{post.content}</p>}
        {post?.mediaUrls?.length > 0 && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1rem'
            }}
          >
            <img 
              src={post.mediaUrls[0]} 
              style={{ 
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'contain'
              }} 
              alt="post media" 
            />
          </div>
        )}

<ButtonGroup className="w-100 border-top border-bottom mb-3">
  <Button
    variant={likeStatus ? "primary" : "light"}
    className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
    onClick={toggleLike}
    style={{ fontSize: "0.8rem" }} // Slightly smaller font size
  >
    {likeStatus ? <BsFillHandThumbsUpFill size={16} /> : <ThumbsUp size={16} />}
    <span>Like</span>
  </Button>

  <Button
    variant="light"
    className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
    style={{ fontSize: "0.8rem" }} // Slightly smaller font size
  >
    <MessageSquare size={16} />
    <span>Comment ({post.commentCount || 0})</span>
  </Button>

  <Button
    variant="light"
    className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
    style={{ fontSize: "0.8rem" }} // Slightly smaller font size
  >
    <Repeat size={16} />
    <span>Repost</span>
  </Button>

  <Button
    variant="light"
    className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
    style={{ fontSize: "0.8rem" }} // Slightly smaller font size
  >
    <Share size={16} />
    <span>Share</span>
  </Button>
</ButtonGroup>


        <div className="d-flex mb-4 px-3">
          <div className="avatar avatar-xs me-3">
            <Link to={`/profile/feed/${user?.id}`}>
              <span role="button">
                <img
                  className="avatar-img rounded-circle"
                  style={{ width: '52px', height: '35px', objectFit: 'cover'}}
                  src={userInfo?.avatar ? userInfo.avatar : fallBackAvatar}
                  alt="avatar"
                />
              </span>
            </Link>
          </div>
          <form className="nav nav-item w-100 position-relative" onSubmit={handleCommentSubmit}>
            <textarea
              data-autoresize
              className="form-control pe-5 bg-light"
              rows={1}
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
              type="submit"
            >
              <BsSendFill />
            </button>
          </form>
        </div>

        {isLoading ? (
          <p>Loading comments...</p>
        ) : (
          <ul className="comment-wrap list-unstyled px-3">
            {(loadMore ? comments : comments.slice(0, 2)).map((comment, index) => (
              <CommentItem key={index} comment={comment} level={0} />
            ))}
          </ul>
        )}
      </CardBody>

      {comments.length > 2 && (
        <CardFooter
          className="border-0 pt-0"
          onClick={() => {
            setLoadMore(!loadMore);
          }}
        >
          <LoadContentButton name={!loadMore ? "Load more comments" : "Close comments"} toggle={loadMore} />
        </CardFooter>
      )}
    </Card>
  );
};

export default PostCard;