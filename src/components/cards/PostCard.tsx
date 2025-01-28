import { useState, useEffect, useMemo } from 'react';
import { BsFillHandThumbsUpFill, BsSendFill, BsThreeDots, BsTrash } from 'react-icons/bs';
import { MdComment, MdThumbUp } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Repeat, Rocket, Share, Smile, Star, ThumbsUp,Lightbulb as Bulb } from 'lucide-react';
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
import { FaGlobe } from 'react-icons/fa';

interface Like {
  id: string;
  occupation: string;
  password: string;
  country: string;
  profilePictureUploadId: string;
  bgPictureUploadId: string;
  firstName: string;
  lastName: string;
  dob: string; // ISO date string
  mobileNumber: string | null;
  emailAddress: string;
  bio: string | null;
  gender: string; // "male", "female", or empty string
  preferredLanguage: string;
  socialMediaProfile: string;
  height: string;
  weight: string;
  permanentAddress: string | null;
  currentAddress: string | null;
  aadharNumberUploadId: string;
  panNumberUploadId: string;
  userRole: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  likerUrl: string; // URL string
}

interface GetAllLikesResponse {
  status: "success" | "error";
  message: string;
  data?: {
    likes: Like[];
  };
  error?: string;
}


const PostCard = ({ item, isMediaKeys,tlRefresh,setTlRefresh,setIsCreated,posts,setPosts,profile}) => {
  // console.log(posts);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const [refresh, setRefresh] = useState(0);
  const [likeStatus, setLikeStatus] = useState();
  const [loadMore, setLoadMore] = useState(false);
  const post = item?.post;
  const userInfo = item?.userDetails;
  const { setTrue, setFalse } = useToggle();
  const [commentCount, setCommentCount] = useState<number>(post.commentCount || 0);
  const [likeCount, setLikeCount] = useState<number>(post.likeCount || 0);
  const [menuVisible,setMenuVisible] = useState<boolean>(false);
  const [isDeleted,setIsDeleted] = useState<boolean>(false);
  const [showReactions,setShowReactions] = useState<boolean>(false);
  const [allLikes,setAllLikes] = useState<Like[]>([]);
  const [isExpanded,setIsExpanded] = useState<boolean>(false);

  // const [commentCount,setCommentCount] = useState<number>(post.commentCount || 0);
  // const [likeCount,setLikeCount] = useState<number>(post.likeCount || 0);
  // console.log(profile);
  // console.log(profile);
  useEffect(() => {
    if (post?.likeStatus !== undefined) {
      setLikeStatus(post.likeStatus);
    } else {
      setLikeStatus(false);
    }
  }, [post.likeStatus]);
  const media = isMediaKeys ? post?.mediaKeys : post?.mediaUrls;
  const isVideo = media?.length > 0 && (media[0] as string).includes('video/mp4');
  // console.log(user);

  // console.log('---postId---',post.userI
  // d);
  // console.log('-----testing-----')
  const deletePost = async (postId: string): Promise<void> => {
    try {
      // Validate PostId
      if (!postId) {
        throw new Error('PostId is required.');
      }
  
      // Send a DELETE request to the backend
      const response = await fetch(' http://54.177.193.30:5000/api/v1/post/delete-userpost-byPostId', {
        method: 'POST',
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
      // console.log('dl',tlRefresh)
      setIsDeleted(true);
     
      // console.log('dlr',tlRefresh);
      // console.log('Post deleted successfully:', data.message);
      alert('Post deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting post:', error.message);
    }
  };


  const handleGetAllLikesForPost = async (postId: string): Promise<void> => {
    if (!postId) {
      console.error('Post ID is required');
      return;
    }
  
    try {
      const response = await fetch('http://54.177.193.30:5000/api/v1/post/get-post-likes-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });
  
      if (response.ok) {
        const data: GetAllLikesResponse = await response.json();
        if (data.status === 'success') {
          console.log('Likes fetched successfully:', data.data?.likes);
          setAllLikes(data.data?.likers);
          // Optionally, update the UI with the likes data
        } else {
          console.error('Error fetching likes:', data.message);
          setAllLikes([]);
        }
      } else {
        const errorData: GetAllLikesResponse = await response.json();
        console.error('Error fetching likes:', errorData.message);
        setAllLikes([]);
      }
    } catch (error) {
      console.error('An unknown error occurred:', (error as Error).message);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
      // Optionally, refresh the post list here
    } catch (error) {
      alert('Failed to delete the post. Please try again.');
    }
  };

  const handleDeletePost = (postId : string) => {
    console.log(`This is the postId's userID ${post.userId},This is the userId ${user?.id}`)
    if(post.userId === user?.id) {
        handleDelete(postId)
    }
    else console.log("id did not match")
  }



  useEffect(() => {
    likeStatus ? setTrue() : setFalse();
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(' http://54.177.193.30:5000/api/v1/post/get-comments', {
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
    if (post?.Id || post?.likeStatus) {
      handleGetAllLikesForPost(post?.Id);
    }
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
      const response = await fetch(' http://54.177.193.30:5000/api/v1/post/create-comment', {
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
      const response = await fetch('http://54.177.193.30:5000/api/v1/post/create-like', {
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
  // console.log(allLikes);

function LikeText(allLikes : Like[]) {
  let str = '';
  if(allLikes.length === 0) return null;
  else if(allLikes.length === 1) str =  `${allLikes[0].firstName + ' ' + allLikes[0].lastName} liked this post`;
  else str =  `${allLikes[0].firstName} ${allLikes[0].lastName} and ${allLikes.length - 1} others`

  return <p
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 8px",
    margin: "0",
  }}
>
  {/* Left side with like icon and text */}
  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
    <MdThumbUp size={16} />
    <span
      style={{
        marginRight: "6px",
        cursor: "pointer",
        transition: "color 0.2s, text-decoration 0.2s",
      }}
      onMouseEnter={(e : React.MouseEvent<HTMLSpanElement>) => {
        const target = e.target as HTMLSpanElement;
        target.style.color = "#1EA1F2";
        target.style.textDecoration = "underline";
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLSpanElement;
        target.style.color = "inherit";
        target.style.textDecoration = "none";
      }}
    >
      {str}
    </span>
  </span>

  {/* Right side with comment count */}
  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
    <span>{commentCount}</span>
    <MdComment size={16} />
  </span>
</p>
}

  if(isDeleted) return null;
  return (
    <Card className="mb-4">
      <CardHeader className="border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar me-2">
              <Link to={`/profile/feed/${post?.userId}`} role="button">
                {userInfo?.avatar ? (
                  <img className="avatar-img rounded-circle" src={userInfo.avatar} alt={userInfo.firstName} />
                ) : (
                  <img className="avatar-img rounded-circle" src={fallBackAvatar} alt="avatar" />
                )}
              </Link>
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
                  <Link to={`/profile/feed/${post?.userId}`} role="button" className="nav-item text-start mx-3">
                    {userInfo?.firstName} {userInfo?.lastName}
                  </Link>
                  <div style={{flex : 1,flexDirection : 'row'}}>
                    <span className="small mx-3" style={{ color: "#8b959b" }}>
                      {console.log(post,'---userInfo---')}
                      {/* {userInfo?.userRole ? userInfo?.userRole : null} */}
                      {userInfo?.userRole ? userInfo?.userRole : user?.occupation}
                      <span className='mx-2'></span>
                    </span>
                    <span className="nav-item small mx-3" style={{ color: "#8b959b" }}>
                      {userInfo?.timestamp}
                      <span
                      className='nav-item small'
                      style={{
                        borderRadius: '100%',
                        width: '3px', // Adjust size of the dot as needed
                        height: '3px', // Adjust size of the dot as needed
                        backgroundColor: '#8b959b',
                        marginLeft: '8px', // Space between dot and icon
                      }}
                    />
                    <FaGlobe
                      style={{
                        color: '#8b959b', // Adjust the color of the globe icon as needed
                        fontSize: '12px', // Adjust the size of the globe icon as needed
                        marginLeft: '6px', // Space between dot and icon
                      }}
                    />
                    </span>
                  </div>
                </h6>
              </div>
            </div>
          </div>
          
          {
              post.userId === user?.id &&

      <div style={{ position: "relative" }}>
      <button
        className="btn btn-link p-0 text-dark"
        style={{ fontSize: "1.5rem", lineHeight: "1" }}
        onClick={() => setMenuVisible(!menuVisible)}
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
            onClick={() => handleDeletePost(post?.Id)}
            style={{ gap: "0.5rem" }}
          >
            <BsTrash /> Delete Post
          </button>
        </div>
      )}
      </div>
          }
        </div>
      </CardHeader>

      <CardBody>
      {post?.content && (
      <div className="mb-1 p-1 bg-gray-100 rounded-lg">
        <div
          className="w-full"
          style={{
            whiteSpace: 'pre-wrap', // Preserve line breaks
            wordWrap: 'break-word', // Prevent horizontal overflow for long words
            lineHeight: '16px',
            maxHeight: isExpanded ? 'none' : '250px',
            overflow: 'hidden',
          }}
        >
          {post.content}
        </div>
        {!isExpanded && post.content.length > 250 && (
          <span
            className="text-blue-500 mt-1 cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            ...read more
          </span>
        )}
      </div>
    )
  }

  {media.length > 0 && (
    isVideo ? (
      <div
        style={{
          position: "relative",
          marginBottom: "10px",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {videoPlayer}
      </div>
    ) : (
      <ResponsiveGallery media={media} />
    )
  )}
  <div>
    {allLikes && LikeText(allLikes)}
  </div>
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
      <span>Comment</span>
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
  style={{ gap: "10px" }}
>
  <textarea
    data-autoresize
    className="form-control"
    style={{
      backgroundColor: "#fff",   // Set the input background to white
      color: "#000",             // Optional: Ensure text color is black for contrast
      whiteSpace: "nowrap",      // Keep text on a single line
      overflow: "hidden",        // Hide overflowing content
      textOverflow: "ellipsis",  // Optional: show ellipsis for overflow
      textAlign: "left",         // Start text and cursor from the left
      resize: "none",            // Disable resizing
      height: "38px",            // Fixed height for a single line
      flex: 1,                   // Allow textarea to take available space
      border: "1px solid #ced4da", // Optional: Subtle border for better visibility
      borderRadius: "4px",       // Rounded corners for a smoother look
      padding: "5px 10px",       // Add some padding for better UX
    }}
    rows={1}
    placeholder="Add a comment..."
    value={commentText}
    onChange={(e) => setCommentText(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) { // Submit on Enter, allow Shift+Enter for new lines
        e.preventDefault(); // Prevent adding a new line
        handleCommentSubmit(e); // Call the form's submit handler
      }
    }}
  />
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