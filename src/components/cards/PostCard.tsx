import { useState, useEffect, useMemo } from 'react';
import { BsFillHandThumbsUpFill, BsSendFill, BsThreeDots, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { MessageSquare, Repeat, Share, ThumbsUp } from 'lucide-react';
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';
import CommentItem from './components/CommentItem';
import LoadContentButton from '../LoadContentButton';
import { CircleUserRound } from 'lucide-react';
import { useAuthContext } from '@/context/useAuthContext';
import useToggle from '@/hooks/useToggle';
import fallBackAvatar from '../../assets/images/avatar/01.jpg';
import VideoPlayer from './components/VideoPlayer';
import GlightBox from '../GlightBox';
import { mixed } from 'yup';
import ResponsiveGallery from './components/MediaGallery';
import axios from 'axios';

const PostCard = ({ item, isMediaKeys }) => {
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
  const [commentCount, setCommentCount] = useState<number>(post.commentCount || 0);
  const [likeCount, setLikeCount] = useState<number>(post.likeCount || 0);
  const [menuVisible,setMenuVisible] = useState<boolean>(false);
  // const [commentCount,setCommentCount] = useState<number>(post.commentCount || 0);
  // const [likeCount,setLikeCount] = useState<number>(post.likeCount || 0);

  useEffect(() => {
    if (post?.likeStatus !== undefined) {
      setLikeStatus(post.likeStatus);
    } else {
      setLikeStatus(false);
    }
  }, [post.likeStatus]);
  const media = isMediaKeys ? post?.mediaKeys : post?.mediaUrls;
  const isVideo = media?.length > 0 && (media[0] as string).includes('video/mp4');

  // console.log('---postId---',post.userId);
  // console.log('-----testing-----')
  const deletePost = async (postId: string): Promise<void> => {
    try {
      // Validate PostId
      if (!postId) {
        throw new Error('PostId is required.');
      }
  
      // Send a DELETE request to the backend
      const response = await fetch(' http://3.101.12.130:5000/api/v1/post/delete-userpost-byPostId', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ PostId: post.Id,userId : user?.id }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete post.');
      }
  
      const data = await response.json();
      setRefresh(() => refresh+1);
      console.log('Post deleted successfully:', data.message);
    } catch (error: any) {
      console.error('Error deleting post:', error.message);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
      alert('Post deleted successfully!');
      // Optionally, refresh the post list here
    } catch (error) {
      alert('Failed to delete the post. Please try again.');
    }
  };

  const handleDeletePost = (postId : string) => {
    if(post.userId === user?.id) {
        handleDelete(postId)
    }
  }



  useEffect(() => {
    likeStatus ? setTrue() : setFalse();
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(' http://3.101.12.130:5000/api/v1/post/get-comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page: 1, postId: post?.Id }),
        });

        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        // console.log('comments that are fetched : ',data);
        setComments(data.data.comments || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (post?.Id) fetchComments();
  }, [refresh, post?.Id]);
  // console.log('---item---',item);

  const videoPlayer = useMemo(() => {
    if (isVideo) {
      return <VideoPlayer src={media[0]} />;
    }
    return null;
  }, [media]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const response = await fetch(' http://3.101.12.130:5000/api/v1/post/create-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        },
        body: JSON.stringify({ postId: post.Id, userId: user?.id, text: commentText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRefresh((prev) => prev + 1);
      setCommentText('');
      setCommentCount(() => commentCount + 1);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const toggleLike = async () => {
    try {
      const response = await fetch('http://3.101.12.130:5000/api/v1/post/create-like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.id, postId: post.Id, status: !likeStatus }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setLikeStatus((prev) => !prev);
      likeStatus ? setLikeCount(() => likeCount - 1) : setLikeCount(() => likeCount + 1);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="border-0 pb-0">
        <Link to={`/profile/feed/${post?.userId}`} className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar me-2">
              {userInfo?.avatar ? (
                <span role="button">
                  <img className="avatar-img rounded-circle" src={userInfo.avatar} alt={userInfo.firstName} />
                </span>
              ) : (
                <span role="button">
                  <img className="avatar-img rounded-circle" src={fallBackAvatar} alt="avatar" />
                </span>
              )}
            </div>
            <div>
              <div className="nav nav-divider">
                <h6
                  className="nav-item card-title mb-0"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <span role="button" className="nav-item text-start mx-3">
                    {userInfo?.firstName} {userInfo?.lastName}
                  </span>
                  <span className="small mx-3" style={{ color: "#8b959b" }}>
                    {userInfo?.userRole ? userInfo?.userRole : null}
                  </span>
                </h6>
              </div>
            </div>
          </div>
          <span className="nav-item small mx-2" style={{ color: "#8b959b" }}>
            {userInfo?.timestamp}
          </span>
          <div style={{ position: "relative" }}>
            <button
              className="btn btn-link p-0 text-dark"
              style={{ fontSize: "1.5rem", lineHeight: "1" }}
              onClick={() => console.log('clicked')}
            >
              <BsThreeDots />
            </button>
            {menuVisible && (
              <div
                className="dropdown-menu show"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  zIndex: 1000,
                  display: "block",
                  backgroundColor: "white",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "0.25rem",
                  overflow: "hidden",
                }}
              >
                <button
                  className="dropdown-item text-danger d-flex align-items-center"
                  onClick={() => handleDeletePost(post?.id)}
                  style={{ gap: "0.5rem" }}
                >
                  <BsTrash /> Delete Post
                </button>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>

      <CardBody>
        {post?.content && <p className="mb-3">{post.content}</p>}

        {media.length > 0 && (

          isVideo ? <div style={{ position: 'relative', marginBottom: '10px' }}>{videoPlayer}</div> :

            (media.length == 1) ?

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
                  src={media[0]}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: '500px',
                    objectFit: 'contain'
                  }}
                  alt="post media"
                />
              </div>

              :
              <ResponsiveGallery media={media} />
          // <div className="d-flex justify-content-between">
          //   <Row className="g-3">
          //     <Col xs={6}>
          //       <GlightBox className="h-100" href={"postImg3"} data-gallery="image-popup">
          //         <img className="rounded img-fluid" src={media[0]} alt="Image" />
          //       </GlightBox>
          //     </Col>
          //     <Col xs={6}>
          //       <GlightBox href={"/"} data-glightbox data-gallery="image-popup">
          //         <img className="rounded img-fluid" src={media[1]} alt="Image" />
          //       </GlightBox>
          //       <div className="position-relative bg-dark mt-3 rounded">
          //         <div className="hover-actions-item position-absolute top-50 start-50 translate-middle z-index-9">
          //           <Link className="btn btn-link text-white" to="">

          //             View all
          //           </Link>
          //         </div>
          //         <GlightBox href={"/"} data-glightbox data-gallery="image-popup">
          //           <img className="img-fluid opacity-50 rounded" src={media[2]} alt="image" />
          //         </GlightBox>
          //       </div>
          //     </Col>
          //   </Row>
          // </div>
        )}

        <ButtonGroup className="w-100 border-top border-bottom mb-3">
          <Button
            variant={likeStatus ? "primary" : "light"}
            className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
            onClick={toggleLike}
            style={{ fontSize: "0.8rem" }} // Slightly smaller font size
          >
            {likeStatus ? <BsFillHandThumbsUpFill size={16} /> : <ThumbsUp size={16} />}
            <span>Like {likeCount}</span>
          </Button>

          <Button
            variant="light"
            className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
            style={{ fontSize: "0.8rem" }} // Slightly smaller font size
          >
            <MessageSquare size={16} />
            <span>Comment {commentCount}</span>
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
                  style={{ width: '52px', height: '35px', objectFit: 'cover' }}
                  src={userInfo?.avatar ? userInfo.avatar : fallBackAvatar}
                  alt="avatar"
                />
              </span>
            </Link>
          </div>
          <form
            className="nav nav-item w-100 d-flex align-items-center"
            onSubmit={handleCommentSubmit}
            style={{ gap: '10px' }} // Add spacing between the textarea and button
          >
            <textarea
              data-autoresize
              className="form-control bg-light"
              style={{
                whiteSpace: 'nowrap',      // Keep text on a single line
                overflow: 'hidden',        // Hide overflowing content
                textOverflow: 'ellipsis',  // Optional: show ellipsis for overflow
                textAlign: 'left',         // Start text and cursor from the left
                resize: 'none',            // Disable resizing
                height: '38px',            // Fixed height for a single line
                flex: 1,                   // Allow textarea to take available space
              }}
              rows={1}
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              className="btn border-0 d-flex align-items-center justify-content-center"
              type="submit"
              style={{
                width: '38px',
                height: '38px',
                paddingRight: '10px',
                paddingLeft: '10px',
                backgroundColor: '#007bff', // Blue background
                borderRadius: '20%',        // Circular button
                cursor: 'pointer',
              }}
            >
              <BsSendFill style={{ color: '#fff', fontSize: '18px' }} /> {/* White icon */}
            </button>
          </form>
        </div>

        {isLoading ? (
          <p>Loading comments...</p>
        ) : (
          <ul className="comment-wrap list-unstyled px-3">
            {(loadMore ? comments : comments.slice(0, 2)).map((comment, index) => (
              <CommentItem 
                key={index} 
                post={post} 
                comment={comment} 
                level={0} 
                refresh={refresh} 
                setRefresh={setRefresh}
                commentCount = {commentCount}
                setCommentCount = {setCommentCount}
              />
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