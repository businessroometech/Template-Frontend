import { useState } from 'react';
import { ChevronDown, ChevronUp, ThumbsUp, MessageSquare } from 'lucide-react';
import fallbackAvatar from '../../../assets/images/avatar/03.jpg'; // Import the fallback avatar
import { Link } from 'react-router-dom';

type CommentType = {
  id: string;
  userId: string;
  postId: string;
  text: string;
  commenterName: string;
  timestamp: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  likesCount?: number;
  replies?: CommentType[];
};

type CommentItemProps = {
  comment: CommentType;
  level : number;
};

const CommentItem = ({ comment,level }: CommentItemProps,) => {
  const [showReplies, setShowReplies] = useState(false);
  console.log('-----comment------',comment);
  console.log('-----show replies------',showReplies);
  comment.replies = [comment,comment,comment];
  return (
<li className="comment-item">
  <div className="d-flex align-items-start mb-3">
    {/* Avatar */}
    <img
      src={comment.avatar || fallbackAvatar}
      alt={`${comment.commenterName || comment.createdBy}-avatar`}
      className="rounded-circle me-3"
      style={{ width: '35px', height: '35px', objectFit: 'cover' }}
    />

    {/* Comment Content */}
    <div
      className="bg-light rounded p-3 flex-grow-1"
      style={{
        wordWrap: 'break-word', // Ensures long words break
        overflowWrap: 'break-word', // Support for other browsers
        wordBreak: 'break-word', // Breaks long strings or URLs
        maxWidth: '100%', // Prevents overflow
      }}
    >
      <div className="d-flex justify-content-between">
            <Link to={`/profile/feed/${comment?.id}`}>
              <h6 className="mb-1">{comment.commenterName || comment.createdBy}</h6>
            </Link>
            <small className="ms-2">{comment.timestamp}</small>
      </div> 

      <p
        className="small mb-2"
        style={{
          whiteSpace: 'pre-wrap', // Preserves spacing and line breaks
          overflow: 'hidden', // Prevents content from spilling
          textOverflow: 'ellipsis', // Adds ellipsis for overflowing content
        }}
      >
        {comment.text}
      </p>

      {/* Actions */}
      <div className="d-flex align-items-center gap-3 small">
        <span role="button" className="text-primary d-flex align-items-center">
          <ThumbsUp size={16} className="me-1" /> Like
        </span>
        <span role="button" className="text-primary d-flex align-items-center">
          <MessageSquare size={16} className="me-1" /> Reply
        </span>
        {comment.replies && comment.replies.length > 0 && level < 1 && (
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
                <ChevronDown size={16} className="me-1" /> View Replies ({comment.replies.length})
              </>
            )}
          </span>
        )}
      </div>
    </div>
  </div>

  {/* Nested Replies */}
  {showReplies && comment.replies && comment.replies.length > 0 && (
    <ul className="list-unstyled ms-5">
      {comment.replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} level={level + 1} />
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



