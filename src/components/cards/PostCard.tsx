import { useState, useEffect } from 'react';
import { BsFillHandThumbsUpFill, BsSendFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ThumbsUp } from 'lucide-react';
import { Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap';
import CommentItem from './components/CommentItem'; // Reintegrated CommentItem
import LoadContentButton from '../LoadContentButton';
import { CircleUserRound } from 'lucide-react';
import { useAuthContext } from '@/context/useAuthContext';
import useToggle from '@/hooks/useToggle';
import fallBackAvatar from '../../assets/images/avatar/01.jpg';

const PostCard = ({ item, onDelete }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false); // State for options menu
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
    }
  }, [post?.likeStatus]);

  useEffect(() => {
    likeStatus ? setTrue() : setFalse();
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://app-backend-8r74.onrender.com/api/v1/post/get-comments',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page: 1, postId: post?.Id }),
          }
        );
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
      const response = await fetch(
        'https://app-backend-8r74.onrender.com/api/v1/post/create-comment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_ACCESS_TOKEN',
          },
          body: JSON.stringify({
            postId: post.Id,
            userId: user?.id,
            text: commentText,
          }),
        }
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setRefresh((prev) => prev + 1);
      setCommentText('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const toggleLike = async () => {
    try {
      const response = await fetch(
        'https://app-backend-8r74.onrender.com/api/v1/post/create-like',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user?.id, postId: post.Id, status: !likeStatus }),
        }
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setLikeStatus((prev) => !prev);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const bool = await onDelete(post.Id); // Call the parent-provided delete function
      if(bool) setRefresh(refresh + 1);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Card className="mb-10">
      <CardHeader className="border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar me-2">
              {userInfo?.avatar ? (
                <img
                  className="avatar-img rounded-circle"
                  src={userInfo.avatar ? userInfo.avatar : fallBackAvatar}
                  alt={userInfo.firstName}
                />
              ) : (
                <img
                  className="avatar-img rounded-circle"
                  src={fallBackAvatar}
                  alt={userInfo.firstName}
                />
              )}
            </div>
            <div>
              <div className="nav nav-divider">
                <h6 className="nav-item card-title mb-0">
                  {userInfo?.firstName + ' ' + userInfo?.lastName}
                </h6>
                <span className="nav-item small">{userInfo?.timestamp}</span>
              </div>
            </div>
          </div>
          {/* Options Menu */}
          <div className="position-relative">
            <button
              className="btn btn-light btn-sm"
              onClick={() => setMenuVisible((prev) => !prev)}
            >
              ⋮
            </button>
            {menuVisible && (
              <div className="position-absolute bg-white shadow rounded p-2" style={{ right: 0 }}>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleDeletePost}
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardBody>
        {post?.content && <p>{post.content}</p>}
        {post?.mediaUrls?.length > 0 && (
          <div className="text-center mb-3">
            <img
              src={post.mediaUrls[0]}
              style={{ maxWidth: '100%', maxHeight: '500px' }}
              alt="post media"
            />
          </div>
        )}

        <div className="d-flex mb-3 align-items-center">
          <div className="avatar avatar-xs me-2">
              <img
                  className="avatar-img rounded-circle"
                  src={fallBackAvatar}
                  alt={userInfo.firstName}
              />
          </div>
          <form className="d-flex w-100" onSubmit={handleCommentSubmit}>
            <textarea
              className="form-control pe-5 bg-light me-2"
              rows={1}
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="submit"
            >
              <BsSendFill />
            </button>
          </form>
        </div>

        {isLoading ? (
          <p>Loading comments...</p>
        ) : (
          <ul className="list-unstyled">
            {(loadMore ? comments : comments.slice(0, 2)).map((comment, index) => (
                <CommentItem
                  comment={comment}
                  key={comment.id}
                />
            ))}
          </ul>
        )}
      </CardBody>

      {comments.length > 2 && (
        <CardFooter
          className="border-0 pt-0"
          onClick={() => {
            setLoadMore((prev) => !prev);
          }}
        >
          <LoadContentButton name={!loadMore ? "Load more comments" : "Close comments"} toggle={loadMore} />
        </CardFooter>
      )}
    </Card>
  );
};

export default PostCard;
