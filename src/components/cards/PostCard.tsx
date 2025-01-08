import { useState, useEffect } from 'react';
import { BsSendFill, BsThreeDots, BsHeart, BsHeartFill, BsChatDots, BsShare } from 'react-icons/bs';
import { Card, Button, Image, Form, Dropdown } from 'react-bootstrap';
import CommentItem from './components/CommentItem';
import LoadContentButton from '../LoadContentButton';
import useToggle from '@/hooks/useToggle';
import { useAuthContext } from '@/context/useAuthContext';
import fallBackAvatar from '../../assets/images/avatar/01.jpg';
import { LIVE_URL } from '@/utils/api';

const PostCard = ({ item, onDelete, tlRefresh, setTlRefresh }) => {
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
    }
  }, [post?.likeStatus]);

  useEffect(() => {
    likeStatus ? setTrue() : setFalse();
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${LIVE_URL}api/v1/post/get-comments`,
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
        `${LIVE_URL}api/v1/post/create-comment`,
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
        `${LIVE_URL}api/v1/post/create-like`,
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this post',
        text: post?.content,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Header className="bg-white border-0">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Image
              src={userInfo?.avatar || fallBackAvatar}
              roundedCircle
              style={{ width: '48px', height: '48px', objectFit: 'cover' }}
              className="me-3"
            />
            <div>
              <h6 className="mb-0">
                {userInfo?.firstName} {userInfo?.lastName}
              </h6>
              <small className="text-muted">{userInfo?.timestamp}</small>
            </div>
          </div>
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" size="sm" className="no-caret">
              <BsThreeDots />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onDelete(post.Id)} className="text-danger">
                Delete Post
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Header>
      <Card.Body>
        {post?.content && <p>{post.content}</p>}
        {post?.mediaUrls?.length > 0 && (
          <div className="text-center mb-3">
            <Image
              src={post.mediaUrls[0]}
              fluid
              rounded
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center border-top border-bottom py-2 mt-3">
          <Button 
            variant="link" 
            className={`text-decoration-none ${likeStatus ? 'text-primary' : 'text-muted'}`}
            onClick={toggleLike}
          >
            {likeStatus ? <BsHeartFill className="me-2" /> : <BsHeart className="me-2" />}
            Like
          </Button>
          <Button
            variant="link"
            className="text-decoration-none text-muted"
          >
            <BsChatDots className="me-2" />
            Comment
          </Button>
          <Button
            variant="link"
            className="text-decoration-none text-muted"
            onClick={handleShare}
          >
            <BsShare className="me-2" />
            Share
          </Button>
        </div>

        <div className="mt-3">
          <Form onSubmit={handleCommentSubmit}>
            <div className="d-flex gap-2">
              <Image
                src={user?.avatar || fallBackAvatar}
                roundedCircle
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
              />
              <Form.Group className="flex-grow-1">
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" size="sm">
                <BsSendFill />
              </Button>
            </div>
          </Form>
        </div>

        {!isLoading && comments.length > 0 && (
          <div className="mt-3">
            {(loadMore ? comments : comments.slice(0, 2)).map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </Card.Body>

      {comments.length > 2 && (
        <Card.Footer className="bg-white border-0 pt-0">
          <LoadContentButton 
            name={!loadMore ? "Load more comments" : "Show less"} 
            toggle={loadMore}
            onClick={() => setLoadMore(!loadMore)}
          />
        </Card.Footer>
      )}
    </Card>
  );
};

export default PostCard;