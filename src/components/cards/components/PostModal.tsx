import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Container, Row, Col, CardHeader, CardBody, ButtonGroup } from "react-bootstrap";
import { GetAllLikesResponse, Like, Post, PostSchema } from "../PostCard";
import { Link } from "react-router-dom";
import fallBackAvatar from '@/assets/images/avatar/default avatar.png'
import { FaGlobe } from "react-icons/fa";
import { useAuthContext } from "@/context/useAuthContext";
import { BsFillHandThumbsUpFill, BsThreeDots, BsTrash } from "react-icons/bs";
import { ChevronLeft, ChevronRight, MessageSquare, Repeat, ThumbsUp } from "lucide-react";
import { LIVE_URL } from "@/utils/api";
import { MdComment, MdThumbUp } from "react-icons/md";
import { UserProfile } from "@/app/(social)/feed/(container)/home/page";
import CommentItem from "./CommentItem";
import useToggle from "@/hooks/useToggle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { UtilType } from "./MediaGallery";
const PostModal = ({
  show,
  handleClose,
  imageIndex,
  item,
  profile,
  media,
  setShowRepostOp,
  utils
}:
  {
    show: boolean;
    handleClose: () => void;
    imageIndex: number;
    item: PostSchema;
    profile: UserProfile;
    media: string[];
    setShowRepostOp: React.Dispatch<React.SetStateAction<boolean>>
    utils: UtilType
  }) => {
  const { user } = useAuthContext();
  const post: Post = item?.post;
  const userInfo = item?.userDetails;
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [refresh, setRefresh] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [comments, setComments] = useState([]);
  const { setTrue, setFalse } = useToggle();
  const [len,setLen] = useState(media.length || 0);
  const [isUp,setIsUp] = useState(false);
  const hasMount = useRef(false);
  const swiperRef = useRef(null);
  const [repostProfile, setRepostProfile] = useState<UserProfile>({});
  // console.log('---profile in post modal---',profile?.profileImgUrl);
  const { likeCount, setLikeCount, commentCount, setCommentCount, likeStatus, setLikeStatus, allLikes, setAllLikes } = utils

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
      // console.error('An unknown error occurred:', (error as Error).message);
    }
  };
  // alert(len);
  useEffect(() => {
    if (hasMount.current) return;
    if (Object.keys(repostProfile).length !== 0) return;
    hasMount.current = true;
    if (!post.repostedFrom) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`${LIVE_URL}api/v1/auth/get-user-Profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: post.repostedFrom,
            //profileId: user?.id,
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

        setRepostProfile(data?.data);
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    fetchUser();

    return () => {
      setLen(0);
    }
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

  const toggleLike = async () => {
    setLikeStatus((prev: boolean) => !prev);
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
  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Body>
        <Container>
          <Row>
            {/* Left Side - Post Image */}
            <Col md={7} className="p-0 position-relative">
              <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={1}
                initialSlide={imageIndex}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  swiper.slideTo(imageIndex);
                }}
              // onSlideChange={(swiper) => {
              //   // Force a re-render to update button visibility
              //   setRefresh(prev => prev + 1);
              // }}
              >
                {media.map((image, index) => (
                  <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      maxWidth: "700px",
                      height: "600px",
                      backgroundColor: "#1b1f23",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden"
                    }}
                  >
                    <img
                      src={image}
                      alt={`Slide ${index}`}
                      style={{
                        width: "auto",
                        height: "auto",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        zIndex: 7
                      }}
                    />
                  </div>
                </SwiperSlide>
                
                ))}
              </Swiper>

              {/* Left Navigation Button */}
              {media.length > 1 && (
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    padding: '12px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <ChevronLeft size={24} color="white" />
                </button>
              )}

              {/* Right Navigation Button */}
              {media.length > 1 &&   (
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    padding: '12px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <ChevronRight size={24} color="white" />
                </button>
              )}
            </Col>


            {/* Right Side - Post Text Content */}
            <Col md={5} className="p-3 d-flex flex-column" style={{ overflowY: 'scroll', height: '600px' }}>
              <CardHeader className="border-0 pb-0">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="avatar me-2">
                      <Link to={`/profile/feed/${post?.userId}`} role="button">
                        <img className="avatar-img rounded-circle" src={post.repostedFrom ? repostProfile?.profileImgUrl || fallBackAvatar : userInfo.avatar || fallBackAvatar} />
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
                            {post.repostedFrom ? repostProfile?.personalDetails?.firstName : userInfo?.firstName} {post.repostedFrom ? repostProfile?.personalDetails?.lastName : userInfo?.lastName}
                          </Link>
                          <div style={{ flex: 1, flexDirection: 'row' }}>
                            <span className="small mx-3" style={{ color: "#8b959b" }}>
                              {/* {console.log(post, '---userInfo---')} */}
                              {/* {userInfo?.userRole ? userInfo?.userRole : null} */}
                              {post.repostedFrom ? repostProfile?.personalDetails?.userRole || "" : userInfo?.userRole || ""}
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
                    <div id={post.Id}
                      className="w-full"
                      style={{
                        whiteSpace: 'pre-wrap', // Preserve line breaks
                        wordWrap: 'break-word', // Prevent horizontal overflow for long words
                        lineHeight: '19px',
                        color: 'black',
                        fontSize: '16px',
                        maxHeight: isExpanded ? 'none' : '192px',
                        overflow: 'hidden',
                      }}
                    >
                      {post.content}
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
                )
                }

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
                    style={{ fontSize: "0.8rem" }} // Slightly smaller font size
                  >
                    <MessageSquare size={16} />
                    {/* <span>Comment</span> */}
                  </Button>

                  <Button
                    variant="ghost"
                    className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
                    style={{ fontSize: "0.8rem" }} // Slightly smaller font size
                    onClick={() => {
                      setShowRepostOp(true)
                      handleClose()
                    }}
                  >
                    <Repeat size={16} />
                    {/* <span>Repost</span> */}
                  </Button>
                  {

                  }
                  {/* <Button
            variant="ghost"
            className="flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1 px-2"
            style={{ fontSize: "0.8rem" }} // Slightly smaller font size
          >
            <Share size={16} />
           
          </Button> */}
                </ButtonGroup>
                {<div className="d-flex mb-4 px-3">
                  <div className="avatar avatar-xs me-3">
                    <Link to={`/profile/feed/${user?.id}`}>
                      <span role="button">
                        <img
                          className="avatar-img rounded-circle"
                          style={{ width: '52px', height: '35px', objectFit: 'cover' }}
                          src={profile?.profileImgUrl || fallBackAvatar}
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
                </div>}

                {(isLoading ? (
                  <p>Loading comments...</p>
                ) : (
                  <ul className="comment-wrap list-unstyled px-3">
                    {comments.map((comment, index) => (
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
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
