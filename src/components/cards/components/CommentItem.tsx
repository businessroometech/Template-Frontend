import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageSquare, ChevronUp, ChevronDown } from 'react-feather';
import { BsFillHandThumbsUpFill, BsSendFill, BsThreeDots, BsTrash } from 'react-icons/bs';
import fallBackAvatar from '../../../assets/images/avatar/01.jpg';
import axios, { AxiosResponse } from 'axios';
import { useAuthContext } from '@/context/useAuthContext';

interface DeleteCommentResponse {
  message: string;
}

// Define the structure of the API error
interface DeleteCommentError {
  error: string;
}

const CommentItem = ({post, comment, level,setRefresh,refresh,parentId=null,commentCount,setCommentCount}: CommentItemProps) => {
  const [showReplies, setShowReplies] = useState(false);
  const [reply, setReply] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentLike,setCommentLike] = useState<boolean>(comment.likeStatus || false);
  const {user} = useAuthContext();
  const [replies,setReplies] = useState([]);
  const [commentRefresh,setCommentRefresh] = useState(0);
  const [menuVisible,setMenuVisible] = useState<boolean>(false);
  const [isDeleted,setIsDeleted] = useState<boolean>(false);

  //  console.log('---comment---',comment);

  function formatText(text : string,name : string) : string {
      return  `@${name} ${text}`
  }

  // console.log('levl',level)
  const handleDeleteComment = async (commentId: string, level: number, setIsDeleted: (value: boolean) => void): Promise<void> => {
    if (!commentId) {
      console.error('Comment ID is required');
      return;
    }
    
    const endpoint = `http://54.177.193.30:5000/api/v1/post/${level === 0 ? 'comments' : 'nested-comments'}`;
  
    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentId,nestedCommentId : commentId  }),
      });
  
      if (response.ok) {
        const data: DeleteCommentResponse = await response.json();
        console.log('Comment deleted successfully:', data.message);
        setIsDeleted(true);
        // Optionally update the UI
      } else {
        const errorData: DeleteCommentError = await response.json();
        console.error('Error deleting comment:', errorData.error);
        alert(errorData.error); // Optionally show the error to the user
      }
    } catch (error) {
      console.error('An unknown error occurred:', (error as Error).message);
    }
  };

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(post);
    const userId = user?.id; 
    const postId = post.Id; 
    const commentId = level < 1 ? comment.id : parentId; 
    const text = level < 1 ? commentText : formatText(commentText,comment.commenterName);   
    try {
      const response = await fetch(' http://54.177.193.30:5000/api/v1/post/create-nested-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          postId,
          commentId, // Include only if it is a reply to another comment
          text,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // console.log('Comment created successfully:', result.data.comment);
        // Add additional logic here, such as updating the UI or clearing the form
        
        setCommentCount(() => commentCount + 1);
        setRefresh(() => refresh+1);
      } else {
        console.error('Error creating comment:', result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const toggleLike = async () => {
    try {
      const response = await fetch(' http://54.177.193.30:5000/api/v1/post/create-like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.id, postId: post.Id, commentId : comment.id,status: !commentLike }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setCommentLike((prev) => !prev);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const fetchReplies = async (commentId: string) => {
    // console.log('---commentId in fetchReplies---', commentId);
    if (!commentId) {
      throw new Error('commentId is required.');
    }
  
    try {
      const response = await fetch('http://54.177.193.30:5000/api/v1/post/get-nested-comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentId}),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch replies.');
      }
      const result = await response.json();
      // console.log('---nested replies---', result);
      return result.data?.nestedComments || [];
    } catch (error) {
      console.error('Error fetching replies:', error);
      throw error;
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchReplies(comment.id);
        // console.log('this is the res', res);
        setReplies(res);
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };
  
    if(level < 1) fetchData();
  }, [comment.id]);
  
  // console.log('this is replies',replies);

  if (isDeleted) return null;

  return (
    <li className="comment-item">
      <div className="d-flex align-items-start mb-3">
        {/* Avatar */}
        <img
          src={comment.avatar || fallBackAvatar}
          alt={`${comment.commenterName || comment.createdBy}-avatar`}
          className="rounded-circle me-3"
          style={{ width: '35px', height: '35px', objectFit: 'cover' }}
        />

        {/* Comment Content */}
        <div
          className="bg-light rounded p-3 flex-grow-1"
          style={{
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            maxWidth: '100%',
          }}
        >
          <div className="d-flex justify-content-between">
            <div style={{display : 'flex'}}>
            <Link to={`/profile/feed/${comment?.id}`}>
              <h6 className="mb-1">{comment.commenterName || comment.createdBy}</h6>
            </Link>
            <small className="ms-2">{comment.timestamp}</small>
            </div>
            { user?.id === comment.commenterId && 
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
                    onClick={() => handleDeleteComment(comment.id,level,setIsDeleted)}
                    style={{ gap: "0.5rem" }}
                  >
                    <BsTrash /> Delete
                  </button>
                </div>
              )}
              </div>
            }
          </div>

          <p
            className="small mb-2"
            style={{
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {comment.text}
          </p>

          {/* Actions */}
          <div className="d-flex align-items-center gap-3 small">
            <span role="button" className="text-primary d-flex align-items-center" onClick={() => {
              console.log('clicked')
              toggleLike();
            }}>
              {commentLike ? <BsFillHandThumbsUpFill size={16} className='me-1'/> : <ThumbsUp size={16} className="me-1" />} Like
            </span>
            <span
              role="button"
              className="text-primary d-flex align-items-center"
              onClick={() => setReply((prev) => !prev)}
            >
              <MessageSquare size={16} className="me-1" /> Reply
            </span>
            {replies && replies.length > 0 && level < 1 && (
              <span
                role="button"
                className="text-secondary d-flex align-items-center"
                onClick={() => setShowReplies((prev) => !prev)}
              >
                {showReplies ? (
                  <>
                    <ChevronUp size={16} className="me-1" /> Hide Replies
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} className="me-1" /> View Replies ({replies.length})
                  </>
                )}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Reply Input Box */}
      {reply && (
        <div className="d-flex mb-4 px-3">
          <div className="avatar avatar-xs me-3">
            <Link to={`/profile/feed/${comment.commenterId}`}>
              <span role="button">
                <img
                  className="avatar-img rounded-circle"
                  style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                  src={comment.avatar || fallBackAvatar}
                  alt="avatar"
                />
              </span>
            </Link>
          </div>
          <form
            className="nav nav-item w-100 d-flex align-items-center"
            onSubmit={handleCommentSubmit}
            style={{ gap: '10px' }}
          >
            <textarea
              data-autoresize
              className="form-control bg-light"
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'left',
                resize: 'none',
                height: '38px',
                flex: 1,
              }}
              rows={1}
              placeholder="Add a reply..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              className="btn border-0 d-flex align-items-center justify-content-center"
              type="submit"
              style={{
                width: '45px', // Increased size for better visibility
                height: '40px', // Increased size for better visibility
                backgroundColor: '#007bff', // Blue background
                borderRadius: '20%', // Circular button
                cursor: 'pointer',
              }}
            >
              <BsSendFill 
                style={{ 
                  color: '#fff', 
                  fontSize:'20px' // Larger icon size for better visibility
                }} 
              />
            </button>
          </form>
        </div>
      )}

      {/* Nested Replies */}
      {showReplies && replies && replies.length > 0 && (
        <ul className="list-unstyled ms-5">
          {replies.map((reply, idx) => (
            <CommentItem 
              key={idx} 
              comment={reply} 
              level={level + 1} 
              post={post} 
              setRefresh={setRefresh} 
              refresh={refresh} 
              parentId={comment.id}
              commentCount = {commentCount}
              setCommentCount = {setCommentCount}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CommentItem;


// import LoadContentButton from '@/components/LoadContentButton'
// import type { CommentType } from '@/types/data'
// import { timeSince } from '@/utils/date'
// import clsx from 'clsx'

// import { Link } from 'react-router-dom'
// import { Card } from 'react-bootstrap'

// const CommentItem = ({ comment, likesCount, children, socialUser, createdAt, image }: CommentType) => {
//   console.log('---------in comments--------')
//   console.log(comment)
//   return (
//     <li className="comment-item">
//       {socialUser && (
//         <>
//           <div className="d-flex position-relative">
//             <div className={clsx('avatar avatar-xs', { 'avatar-story': socialUser.isStory })}>
//               <span role="button">
//                 <img className="avatar-img rounded-circle" src={socialUser.avatar} alt={socialUser.name + '-avatar'} />
//               </span>
//             </div>
//             <div className="ms-2">
//               <div className="bg-light rounded-start-top-0 p-3 rounded">
//                 <div className="d-flex justify-content-between">
//                   <h6 className="mb-1">
                    
//                     <Link to=""> {socialUser.name} </Link>
//                   </h6>
//                   <small className="ms-2">{timeSince(createdAt)}</small>
//                 </div>
//                 <p className="small mb-0">{comment}</p>
//                 {image && (
//                   <Card className="p-2 border border-2 rounded mt-2 shadow-none">
//                     <img width={172} height={277} src={image} alt="" />
//                   </Card>
//                 )}
//               </div>

//               <ul className="nav nav-divider py-2 small">
//                 <li className="nav-item">
//                   <span className="nav-link" role="button">
                    
//                     Like ({likesCount})
//                   </span>
//                 </li>
//                 <li className="nav-item">
//                   <span className="nav-link" role="button">
                    
//                     Reply
//                   </span>
//                 </li>
//                 {children?.length && children?.length > 0 && (
//                   <li className="nav-item">
//                     <span className="nav-link" role="button">
                      
//                       View {children?.length} replies
//                     </span>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           </div>

//           <ul className="comment-item-nested list-unstyled">
//             {children?.map((childComment) => <CommentItem key={childComment.id} {...childComment} />)}
//           </ul>
//           {children?.length === 2 && <LoadContentButton name="Load more replies" className="mb-3 ms-5" />}
//         </>
//       )}
//     </li>
//   )
// }

// export default CommentItem;



