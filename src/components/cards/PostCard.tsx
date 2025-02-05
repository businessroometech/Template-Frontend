import { useState, useEffect, useMemo, useRef } from 'react';
import { BsFillHandThumbsUpFill, BsThreeDots, BsTrash } from 'react-icons/bs';
import { MdComment, MdThumbUp } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Repeat, ThumbsUp } from 'lucide-react';
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Image } from 'react-bootstrap';
import CommentItem from './components/CommentItem';
import LoadContentButton from '../LoadContentButton';
import { useAuthContext } from '@/context/useAuthContext';
import useToggle from '@/hooks/useToggle';
import fallBackAvatar from '@/assets/images/avatar/default avatar.png'
import VideoPlayer from './components/VideoPlayer';
import ResponsiveGallery, { UtilType } from './components/MediaGallery';
import { FaGlobe } from 'react-icons/fa';
import RepostModal from './RepostModal';
import { LIVE_URL } from '@/utils/api';
import { UserProfile } from '@/app/(social)/feed/(container)/home/page';
import { toast } from 'react-toastify';
import ImageZoom from './ImageZoom';
export interface Like {
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
  createdAt: string;
  updatedAt: string;
  likerUrl: string;
}

export interface Post {
  Id: string;
  userId: string;
  title: string | null;
  content: string;
  hashtags: string[];
  mediaUrls: string[];
  mediaKeys: string[];
  likeCount: number;
  commentCount: number;
  reactions: Record<string, number>; // Assuming reactions are stored as { emoji: count }
  userReaction: string | null;
  isRepost: boolean;
  repostedFrom?: string;
  repostText?: string;
  likeStatus: boolean;
}
export interface UserDetails {
  postedId: string;
  firstName: string;
  lastName: string;
  timestamp: string;
  userRole: string;
  avatar: string;
  zoomProfile : number;
  rotateProfile : number;
}

export interface PostSchema {
  post: Post;
  userDetails: UserDetails;
  comments: any[]; // Define a more specific type if comments have a structure
}

export interface GetAllLikesResponse {
  status: "success" | "error";
  message: string;
  data?: {
    likes: Like[];
  };
  error?: string;
}


const PostCard = ({
  item,
  profile,
  isCreated,
  setIsCreated
}:
  {
    item: PostSchema;
    profile: UserProfile;
    isCreated: boolean;
    setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
  //  console.log('---profile in post card---',profile);
  const [comments, setComments] = useState<[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const [refresh, setRefresh] = useState(0);
  const [likeStatus, setLikeStatus] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState(false);
  const [preview, setPreview] = useState<any>();
  const [url, setUrl] = useState("");
  const post: Post = item?.post;
  const userInfo = item?.userDetails;
  const { setTrue, setFalse } = useToggle();
  const [commentCount, setCommentCount] = useState<number>(post.commentCount || 0);
  const [likeCount, setLikeCount] = useState<number>(post.likeCount || 0);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [showReactions, setShowReactions] = useState<boolean>(false);
  const hasMount = useRef(false);
  const [allLikes, setAllLikes] = useState<Like[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isExpandedRe, setIsExpandedRe] = useState<boolean>(false);
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [showRepostOp, setShowRepostOp] = useState<boolean>(false);
  const [repostProfile, setRepostProfile] = useState<UserProfile>({});
  const [close, setClose] = useState<boolean>(true);
  const utils: UtilType = {
    comments: comments,
    setComments: setComments,
    setLikeStatus: setLikeStatus,
    likeStatus: likeStatus,
    allLikes: allLikes,
    setAllLikes: setAllLikes,
    likeCount: likeCount,
    setLikeCount: setLikeCount,
  }
  useEffect(() => {
    if (post?.likeStatus !== undefined) {
      setLikeStatus(post.likeStatus);
    } else {
      setLikeStatus(false);
    }
  }, [post.likeStatus]);
  const media = post.repostedFrom ? post?.mediaUrls : post?.mediaUrls;
  const isVideo = media?.length > 0 && (media[0] as string).includes('video/mp4');



  function isRepost() {
    return post.repostedFrom !== null && post.repostedFrom !== undefined
  }

  // LINK Part
  // const extractFirstUrl = (text: string): string | null => {
  //   const urlRegex = /(https?:\/\/[^\s]+)/; // Regular expression to match URLs
  //   const match = text.match(urlRegex); // Extract first URL
  //   return match ? match[0] : null;  // Fixed spacing issue
  // };

  // useEffect(() => {
  //   const fetchPreview = async () => {
  //     if (!post?.content) return; // Ensure post content is available

  //     const firstUrl = extractFirstUrl(post.content); // Extract URL from input
  //     if (!firstUrl) {
  //       console.error("No valid URL found in the input.");
  //       return;
  //     }

  //     try {
  //       const data = await getLinkPreview(firstUrl); // Fetch preview for the first URL
  //       console.log('Extracted preview:', data);
  //       // setPreview(data);
  //     } catch (error) {
  //       console.error("Error fetching link preview:", error);
  //     }
  //   };

  //   fetchPreview();
  // }, [post]); // Use post instead of post?.content

  function isRepostWithText() {
    return isRepost() && (post.repostText?.trim() !== "" || post.repostText !== null)
  }


  const deletePost = async (postId: string): Promise<void> => {
    try {
      // Validate PostId
      if (!postId) {
        throw new Error('PostId is required.');
      }

      // Send a DELETE request to the backend
      const response = await fetch(`http://13.216.146.100/api/v1/post/delete-userpost-byPostId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ PostId: post.Id, userId: user?.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete post.');
      }

      const data = await response.json();
      // // console.log('dl',tlRefresh)
      setIsDeleted(true);

      // // console.log('dlr',tlRefresh);
      // // console.log('Post deleted successfully:', data.message);
      // alert('Post deleted successfully!');
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
      const response = await fetch(`${LIVE_URL}api/v1/post/get-post-likes-list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        const data: GetAllLikesResponse = await response.json();
        if (data.status === 'success') {
          // // console.log('Likes fetched successfully:', data.data?.likes);
          setAllLikes(data.data?.likers || []);
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
      setAllLikes([]);
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

  const handleDeletePost = (postId: string) => {
    // console.log(`This is the postId's userID ${post.userId},This is the userId ${user?.id}`)
    if (post.userId === user?.id) {
      handleDelete(postId)
    }
    // else // console.log("id did not match")
  }
  useEffect(() => {
    if (hasMount.current) return;
    if (Object.keys(repostProfile).length !== 0) return;
    hasMount.current = true;

    const fetchUser = async () => {
      try {
        const response = await fetch(`${LIVE_URL}api/v1/auth/get-user-Profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: post.repostedFrom,
            // profileId: user?.id,
          }),
        })

        if (!response.ok) {
          //  navigate('/not-found')
          throw new Error('Network response was not ok')
        }
        if (response.status === 404) {
          // navigate('/not-found')
        }
        const data = await response.json()
        // console.log('---repost profile---',data?.data);

        setRepostProfile(data?.data);
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    if(post.repostedFrom) fetchUser();
  }, [])


  useEffect(() => {
    likeStatus ? setTrue() : setFalse();
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${LIVE_URL}api/v1/post/get-comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page: 1, postId: post?.Id }),
        });

        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        // // console.log('comments that are fetched : ',data);
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
  // // console.log('---item---',item);

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
      const response = await fetch(`${LIVE_URL}api/v1/post/create-comment`, {
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
    setLikeStatus((prev) => !prev);
    likeStatus ? setLikeCount(() => likeCount - 1) : setLikeCount(() => likeCount + 1);
    try {
      const response = await fetch(`${LIVE_URL}api/v1/post/create-like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.id, postId: post.Id, status: !likeStatus }),
      });

      if (!response.ok) {
        setLikeStatus(likeStatus);
        alert('Like not sent')
        likeStatus ? setLikeCount(() => likeCount - 1) : setLikeCount(() => likeCount + 1);
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
    handleGetAllLikesForPost(post.Id)
  };

  function LikeText(allLikes: Like[]) {
    const userLike = allLikes.find(like => like.id === user?.id);
    const otherLikes = allLikes.filter(like => like.id !== user?.id);

    let str = "Liked by ";

    if (userLike) str += "You";
    if (otherLikes.length > 0) {
      if (userLike) str += ", ";
      str += `${otherLikes[0].firstName}`;
    }
    if (otherLikes.length > 1) {
      str += `, and ${otherLikes.length - 1} others`;
    }
    if (allLikes.length === 0) str = ""
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
      {<span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {allLikes.length > 0 && <MdThumbUp size={16} />}
        <span
          style={{
            marginRight: "6px",
            cursor: "pointer",
            transition: "color 0.2s, text-decoration 0.2s",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => {
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
      </span>}

      {/* Right side with comment count */}
      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>

        <MdComment size={16} onClick={() => setOpenComment(!openComment)} />
        {commentCount !== 0 && <span>{commentCount}</span>}
      </span>
    </p>
  }


  const navigate = useNavigate();

  // Function to navigate to a user profile when clicking a mention
  const handleMentionClick = async (username: string) => {
    setIsLoading(true)
    try {
      const res = await fetch('http://13.216.146.100/api/v1/auth/get-user-userName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: username }),
      })

      const data = await res.json();
      // toast.success("navigate to user profile");
      setIsLoading(false)
      navigate(`/profile/feed/${data.data.id}`);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('User not available');
    }

  };

  // Function to render mentions and hashtags with styling
  const formatContent = (content: string) => {
    if (!content) return null;
  
    // Regex patterns
    const mentionRegex = /(@[a-zA-Z0-9_]+)/g;
    const hashtagRegex = /(#\w+)/g;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
    const videoRegex = /(https?:\/\/.*\.(?:mp4|webm|ogg))/i; // Added for videos
    const youtubeRegex =
      /(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+))/;
  
    return content.split(/(\s+)/).map((word, index) => {
      if (mentionRegex.test(word)) {
        const username = word.substring(1);
        return (
          <span
            key={index}
            onClick={() => handleMentionClick(username)}
            style={{
              color: '#1E40AF',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {word}
          </span>
        );
      } else if (hashtagRegex.test(word)) {
        return (
          <span
            key={index}
            style={{
              color: '#4CAF50',
              fontWeight: 'bold',
            }}
          >
            {word}
          </span>
        );
      } else if (youtubeRegex.test(word)) {
        const videoId = word.match(youtubeRegex)?.[2];
        return (
          <iframe
            key={index}
            width="100%"
            height="330px"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ borderRadius: '8px', marginTop: '8px' }}
          ></iframe>
        );
      } else if (imageRegex.test(word)) {
        return (
          <img
            key={index}
            src={word}
            alt="User shared image"
            style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '8px' }}
          />
        );
      } else if (videoRegex.test(word)) {
        return (
          <video
            key={index}
            width="100%"
            height="auto"
            controls
            style={{ borderRadius: '8px', marginTop: '8px' }}
          >
            <source src={word} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      } else if (urlRegex.test(word)) {
        return (
          <a
            key={index}
            href={word}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0645AD', textDecoration: 'underline' }}
          >
            {word}
          </a>
        );
      }
  
      return word;
    });
  };



  if (isDeleted) return null;

  if (isRepostWithText()) {
    return (
      <Card className="mb-4">
        <CardHeader className="border-0 pb-0">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="avatar me-2">
                <Link to={`/profile/feed/${post?.userId}`} role="button">
                <div
                    style={{
                      border : '3px solid white',
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                      overflow: "hidden",
                  
                    }}
                  >
                    <Image
                      src={userInfo.avatar ? userInfo.avatar : fallBackAvatar} // Replace with your actual image source
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        transform: `scale(${(userInfo?.zoomProfile || 50)  / 50}) rotate(${(userInfo?.rotateProfile || 50) - 50}deg)`,
                      }}
                    />
                  </div>
                </Link>
                {/* {post.repostedFrom && <p>This is a repost</p>} */}
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
                    <div style={{ flex: 1, flexDirection: 'row' }}>
                      <span className="small mx-3" style={{ color: "#8b959b" }}>
                        {/* {console.log(post, '---userInfo---')} */}
                        {/* {userInfo?.userRole ? userInfo?.userRole : null} */}
                        {userInfo?.userRole && userInfo?.userRole}
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
                  style={{ fontSize: "1.5rem", lineHeight: "1", marginTop: '-25px', marginRight: '15px' }}
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
                id={post.Id}
                className="w-full"
                style={{
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  lineHeight: '19px',
                  color: 'black',
                  fontSize: '16px',
                  // Set maxHeight to 'none' to show all content if there's a link or any embedded content.
                  maxHeight: post.content.match(/(https?:\/\/[^\s]+)/g) ? 'none' : (isExpanded ? 'none' : '192px'),
                  overflow: post.content.match(/(https?:\/\/[^\s]+)/g) ? 'visible' : (isExpanded ? 'visible' : 'hidden'),
                }}
              >
                {formatContent(post.content)}
              </div>
              {!isExpanded && post.content.length > 230 && (
                <span
                  className="text-blue-500 mt-1 cursor-pointer"
                  onClick={() => setIsExpanded(true)}
                >
                  ...read more
                </span>
              )}
            </div>
          )}

          <Card className="mb-4">
            <CardHeader className="border-0 pb-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="avatar me-2">
                    <Link to={`/profile/feed/${post?.repostedFrom}`} role="button">
                    <div
                    style={{
                      border : '3px solid white',
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                      overflow: "hidden",
                  
                    }}
                  >
                    <Image
                      src={repostProfile?.profileImgUrl ? repostProfile?.profileImgUrl : fallBackAvatar} // Replace with your actual image source
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        transform: `scale(${(repostProfile?.personalDetails?.zoomProfile || 50)  / 50}) rotate(${(repostProfile?.personalDetails?.rotateProfile || 50) - 50}deg)`,
                      }}
                    />
                  </div>
                      
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
                        <Link to={`/profile/feed/${post?.repostedFrom}`} role="button" className="nav-item text-start mx-3">
                          {repostProfile?.personalDetails?.firstName} {repostProfile?.personalDetails?.lastName}
                        </Link>
                        <div style={{ flex: 1, flexDirection: 'row' }}>
                          <span className="small mx-3" style={{ color: "#8b959b" }}>
                            {/* {console.log(post, '---userInfo---')} */}
                            {/* {userInfo?.userRole ? userInfo?.userRole : null} */}
                            {repostProfile?.personalDetails?.userRole}
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
              </div>
            </CardHeader>
            <CardBody>
              {post?.content && (
                <div className="mb-1 p-1 bg-gray-100 rounded-lg">
                  <div
                    id={post.Id}
                    className="w-full"
                    style={{
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                      lineHeight: '19px',
                      color: 'black',
                      fontSize: '16px',
                      // Set maxHeight to 'none' to show all content if there's a link or any embedded content.
                      maxHeight: post.content.match(/(https?:\/\/[^\s]+)/g) ? 'none' : (isExpanded ? 'none' : '192px'),
                      overflow: post.content.match(/(https?:\/\/[^\s]+)/g) ? 'visible' : (isExpanded ? 'visible' : 'hidden'),
                    }}
                  >
                    {formatContent(post.content)}
                  </div>
                  {!isExpanded && post.content.length > 230 && (
                    <span
                      className="text-blue-500 mt-1 cursor-pointer"
                      onClick={() => setIsExpanded(true)}
                    >
                      ...read more
                    </span>
                  )}
                </div>
              )}



              {media?.length > 0 && (
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
                  <ResponsiveGallery
                    media={media}
                    item={item}
                    profile={profile}
                    setShowRepostOp={setShowRepostOp}
                    utils={utils}
                  />
                )
              )}

            </CardBody>
          </Card>
          <div style={{ marginTop: '20px' }}>
            {LikeText(allLikes)}
          </div>
          <ButtonGroup
            className="w-100 border-top border-bottom mb-3"
            style={{
              backgroundColor: "white",
              borderBottom: "1px solid #dee2e6", // Bootstrap's light gray border color
            }}
          >
            <Button
              variant="ghost" // Always remains ghost
              className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
              onClick={toggleLike}
              style={{ fontSize: "0.8rem" }} // Slightly smaller font size
            >
              {likeStatus ? (
                <BsFillHandThumbsUpFill size={16} style={{ color: "#1EA1F2" }} /> // Blue icon when liked
              ) : (
                <ThumbsUp size={16} style={{ color: "inherit" }} /> // Default color when not liked
              )}
              {/* <span>Like</span> */}
            </Button>

            <Button
              variant="ghost"
              className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
              onClick={() => setOpenComment(!openComment)}
              style={{ fontSize: "0.8rem" }} // Slightly smaller font size
            >
              <MessageSquare size={16} />
              {/* <span>Comment</span> */}
            </Button>

            <Button
              variant="ghost"
              className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
              style={{ fontSize: "0.8rem" }} // Slightly smaller font size
              onClick={() => setShowRepostOp(true)}
            >
              <Repeat size={16} />
              {/* <span>Repost</span> */}
            </Button>
            {
              <RepostModal
                isOpen={showRepostOp}
                onClose={() => setShowRepostOp(false)}
                authorName={userInfo?.firstName}
                item={item}
                isCreated={isCreated}
                setIsCreated={setIsCreated}
              />
            }
            {/* <Button
            variant="ghost"
            className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
            style={{ fontSize: "0.8rem" }} // Slightly smaller font size
          >
            <Share size={16} />
           
          </Button> */}
          </ButtonGroup>
          {openComment && <div className="d-flex mb-4 px-3">
            <div className="avatar avatar-xs me-3">
              <Link to={`/profile/feed/${user?.id}`}>
                <span role="button">
                <div
                    style={{
                      border : '3px solid white',
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      overflow: "hidden",
                  
                    }}
                  >
                    <Image
                      src={profile?.profileImgUrl ? profile.profileImgUrl : fallBackAvatar} // Replace with your actual image source
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        transform: `scale(${(profile?.personalDetails?.zoomProfile || 50)  / 50}) rotate(${(profile?.personalDetails?.rotateProfile || 50) - 50}deg)`,
                      }}
                    />
                  </div>
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
                  backgroundColor: "#fff",
                  color: "#000",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "left",
                  resize: "none",
                  height: "38px",
                  flex: 1,
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  padding: "5px 10px",
                }}
                rows={1}
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleCommentSubmit(e);
                  }
                }}
              />
            </form>
          </div>}

          {openComment && (isLoading ? (
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
                  commentCount={commentCount}
                  setCommentCount={setCommentCount}
                  myProfile={profile}
                />
              ))}
            </ul>
          ))}
        </CardBody>

      </Card>
    )
  }

  return (
    <>
      <Card className="mb-4">
        <CardHeader className="border-0 pb-0">
          {(post.repostedFrom && close) &&
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                }}
              >
                {/* Left Section: Avatar and Name */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: '-10px' }}>
                  {/* Avatar */}
                  <Link to={`/profile/feed/${post?.userId}`} role="button" style={{ paddingBottom: '3px', paddingRight: '4px' }}>

                  <div
                    style={{
                      border : '3px solid white',
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                      overflow: "hidden",
                  
                    }}
                  >
                    <Image
                      src={userInfo.avatar ? userInfo?.avatar : fallBackAvatar} // Replace with your actual image source
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        transform: `scale(${(userInfo?.zoomProfile || 50)  / 50}) rotate(${(userInfo?.rotateProfile || 50) - 50}deg)`,
                      }}
                    />
                  </div>
                    {/* <img
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src={userInfo?.avatar ? userInfo.avatar : fallBackAvatar}
                      alt={userInfo?.firstName || "avatar"}
                    /> */}
                  </Link>

                  {/* Name and Repost Text */}
                  <p
                    style={{
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "1.2",
                    }}
                  >
                    <Link
                      to={`/profile/feed/${post?.userId}`}
                      style={{ fontWeight: "bold", textDecoration: "none", color: "#000" }}
                    >
                      {userInfo?.firstName} {userInfo?.lastName}
                    </Link>
                    <span style={{ marginLeft: "6px", color: "#555", paddingTop: '2px' }}>reposted this</span>
                  </p>
                </div>

                {/* Close Button */}
                {post.userId === user?.id &&


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
                        {<button
                          className="dropdown-item text-danger d-flex align-items-center"
                          onClick={() => handleDeletePost(post?.Id)}
                          style={{ gap: "0.5rem" }}
                        >
                          <BsTrash /> Delete Post
                        </button>}
                      </div>
                    )}
                  </div>
                }
              </div>
            </>
          }
          {post.repostedFrom && close && <div style={{ height: '1px', width: '100%', backgroundColor: '#F2F2F2', marginTop: '-5px', marginBottom: '10px' }} />}
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="avatar me-2">
                <Link to={`/profile/feed/${post.repostedFrom ? repostProfile?.personalDetails?.id : post?.userId}`} role="button">
                  {userInfo?.avatar ? (
                    <ImageZoom 
                      src={post.repostedFrom ? repostProfile?.profileImgUrl ? repostProfile?.profileImgUrl : fallBackAvatar : userInfo.avatar ? userInfo.avatar : fallBackAvatar}
                      zoom={post.repostedFrom ? repostProfile?.personalDetails?.zoomProfile : userInfo?.zoomProfile}
                      rotate={post.repostedFrom ? repostProfile?.personalDetails?.rotateProfile : userInfo?.rotateProfile}
                    />
                  ) : (
                    <img className="avatar-img rounded-circle" src={fallBackAvatar} alt="avatar" />
                  )}
                </Link>
                {/* {post.repostedFrom && <p>This is a repost</p>} */}
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
                    }}profile
                  >
                    <Link to={`/profile/feed/${post?.userId}`} role="button" className="nav-item text-start mx-3">
                      {post.repostedFrom ? repostProfile?.personalDetails?.firstName : userInfo?.firstName} {post.repostedFrom ? repostProfile?.personalDetails?.lastName : userInfo?.lastName}
                    </Link>
                    <div style={{ flex: 1, flexDirection: 'row' }}>
                      <span className="small mx-3" style={{ color: "#8b959b" }}>
                        {/* {console.log(post, '---userInfo---')} */}
                        {/* {userInfo?.userRole ? userInfo?.userRole : null} */}
                        {post.repostedFrom ? repostProfile?.personalDetails?.userRole : userInfo?.userRole}
                        <span className='mx-2'></span>
                      </span>
                      <span className="nav-item small mx-3" style={{ color: "#8b959b" }}>
                        {userInfo?.timestamp}
                        <span
                          className='nav-item small'
                          style={{
                            borderRadius: '100%',
                            width: '3px',
                            height: '3px',
                            backgroundColor: '#8b959b',
                            marginLeft: '8px',
                          }}
                        />
                        <FaGlobe
                          style={{
                            color: '#8b959b',
                            fontSize: '12px',
                            marginLeft: '6px',
                          }}
                        />
                      </span>
                    </div>
                  </h6>
                </div>
              </div>
            </div>

            {
              post.userId === user?.id && !post.repostedFrom &&

              <div style={{ position: "relative" }}>
                <button
                  className="btn btn-link p-0 text-dark"
                  style={{ fontSize: "1.5rem", lineHeight: "1", marginTop: '-25px', marginRight: '15px' }}
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
                id={post.Id}
                className="w-full"
                style={{
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  lineHeight: '19px',
                  color: 'black',
                  fontSize: '16px',
                  // Set maxHeight to 'none' to show all content if there's a link or any embedded content.
                  maxHeight: post.content.match(/(https?:\/\/[^\s]+)/g) ? 'none' : (isExpanded ? 'none' : '192px'),
                  overflow: post.content.match(/(https?:\/\/[^\s]+)/g) ? 'visible' : (isExpanded ? 'visible' : 'hidden'),
                }}
              >
                {formatContent(post.content)}
              </div>
              {!isExpanded && post.content.length > 230 && (
                <span
                  className="text-blue-500 mt-1 cursor-pointer"
                  onClick={() => setIsExpanded(true)}
                >
                  ...read more
                </span>
              )}
            </div>
          )}


          {media?.length > 0 && (
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
              <ResponsiveGallery
                media={media}
                item={item}
                profile={profile}
                setShowRepostOp={setShowRepostOp}
                utils={utils}
              />
            )
          )}
          <div style={{ marginTop: '20px' }}>
            {LikeText(allLikes)}
          </div>
          <ButtonGroup
            className="w-100 border-top border-bottom mb-3"
            style={{
              backgroundColor: "white",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            <Button
              variant="ghost"
              className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
              onClick={toggleLike}
              style={{ fontSize: "0.8rem" }}
            >
              {likeStatus ? (
                <BsFillHandThumbsUpFill size={16} style={{ color: "#1EA1F2" }} />
              ) : (
                <ThumbsUp size={16} style={{ color: "inherit" }} />
              )}
              {/* <span>Like</span> */}
            </Button>

            <Button
              variant="ghost"
              className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
              onClick={() => setOpenComment(!openComment)}
              style={{ fontSize: "0.8rem" }}
            >
              <MessageSquare size={16} />
              {/* <span>Comment</span> */}
            </Button>

            <Button
              variant="ghost"
              className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
              style={{ fontSize: "0.8rem" }}
              onClick={() => setShowRepostOp(true)}
            >
              <Repeat size={16} />
              {/* <span>Repost</span> */}
            </Button>
            {
              <RepostModal
                isOpen={showRepostOp}
                onClose={() => setShowRepostOp(false)}
                authorName={userInfo?.firstName}
                item={item}
                isCreated={isCreated}
                setIsCreated={setIsCreated}
              />}
            {/* <Button
            variant="ghost"
            className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
            style={{ fontSize: "0.8rem" }} // Slightly smaller font size
          >
            <Share size={16} />
           
          </Button> */}
          </ButtonGroup>
          {openComment && <div className="d-flex mb-4 px-3">
            <div className="avatar avatar-xs me-3">
              <Link to={`/profile/feed/${user?.id}`}>
                <span role="button">
                  <ImageZoom 
                    src={profile?.profileImgUrl ? profile.profileImgUrl : fallBackAvatar}
                    zoom={profile?.personalDetails?.zoomProfile}
                    rotate={profile?.personalDetails?.rotateProfile}
                    width='45px'
                    height='45px'
                  />
                  {/* <img
                    className="avatar-img rounded-circle"
                    style={{ width: '52px', height: '35px', objectFit: 'cover' }}
                    src={profile?.profileImgUrl ? profile.profileImgUrl : fallBackAvatar}
                    alt="avatar"
                  /> */}
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
                  backgroundColor: "#fff",
                  color: "#000",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "left",
                  resize: "none",
                  height: "38px",
                  flex: 1,
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  padding: "5px 10px",
                }}
                rows={1}
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleCommentSubmit(e);
                  }
                }}
              />
            </form>
          </div>}

          {openComment && (isLoading ? (
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
                  commentCount={commentCount}
                  setCommentCount={setCommentCount}
                  myProfile={profile}
                />
              ))}
            </ul>
          ))}
        </CardBody>

        {openComment && (
          comments.length > 2 && (
            <CardFooter
              className="border-0 pt-0"
              onClick={() => {
                setLoadMore(!loadMore);
              }}
            >
              <LoadContentButton name={!loadMore ? "Load more comments" : "Close comments"} toggle={loadMore} />
            </CardFooter>
          )
        )}
      </Card>
    </>
  );
};

export default PostCard;