import { useState, useEffect } from 'react';
import { BsFillHandThumbsUpFill, BsSendFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ThumbsUp } from 'lucide-react';
import { Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap';
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
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const post = item?.post;
  const userInfo = item?.userDetails;
  const { setTrue, setFalse } = useToggle();
  console.log('------item------',item);
  console.log('----post like status',post.likeStatus === true);
  useEffect(() => {
    console.log('-----in post like use effect------',post.likeStatus);
    if (post?.likeStatus !== undefined) {
      setLikeStatus(post.likeStatus);
    }
    else {
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
    <Card className="mb-10">
      <CardHeader className="border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
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
              <div className="nav nav-divider">
                <h6 className="nav-item card-title mb-0">
                  <span role="button">{userInfo?.firstName + ' ' + userInfo?.lastName}</span>
                </h6>
                <span className="nav-item small"> {userInfo?.timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        {post?.content && <p>{post.content}</p>}
        {post?.mediaUrls?.length > 0 && (
          <div
            style={{
              width: '100%',
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={post.mediaUrls[0]} style={{ maxWidth: '100%', maxHeight: '100%' }} alt="post media" />
          </div>
        )}
        <ul className="nav nav-stack py-3 small">
          <li className="nav-item">
            <button className="nav-link active icons-center" onClick={toggleLike}>
              {likeStatus ? <BsFillHandThumbsUpFill /> : <ThumbsUp size={18} />}
              <span style={{ marginLeft: '5px', fontSize: '17px' }}>Like</span>
            </button>
          </li>
          <li className="nav-item">
            <Link className="nav-link icons-center" to="">
              <span style={{ marginLeft: '5px', fontSize: '17px' }}>
                Comments ({post.commentCount || 0})
              </span>
            </Link>
          </li>
        </ul>

        <div className="d-flex mb-3">
          <div className="avatar avatar-xs me-2">
            <span role="button">
              <img
                className="avatar-img rounded-circle"
                style={{ width: '52px', height: '35px', objectFit: 'cover'}}
                src={userInfo?.avatar ? userInfo.avatar : fallBackAvatar}
                alt="avatar"
              />
            </span>
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
          <ul className="comment-wrap list-unstyled">
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
            setLoadMore(() => !loadMore);
          }}
        >
          <LoadContentButton name={!loadMore ? "Load more comments" : "Close comments"} toggle={loadMore} />
        </CardFooter>
      )}
    </Card>
  );
};

export default PostCard;