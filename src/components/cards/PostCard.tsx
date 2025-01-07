import { useState, useEffect } from 'react'
import { BsSendFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { ThumbsUp } from 'lucide-react'
import { Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, DropdownDivider } from 'react-bootstrap'
import CommentItem from './components/CommentItem'
import LoadContentButton from '../LoadContentButton'
import { CircleUserRound } from 'lucide-react'
import { useAuthContext } from '@/context/useAuthContext'

const PostCard = ({ item }) => {
  console.log('----item-------', item);
  const [comments, setComments] = useState([]); // State to store comments
  const [commentText, setCommentText] = useState(''); // State to manage comment input
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const { user } = useAuthContext();
  const [refresh, setRefresh] = useState(0); // Add state for triggering refresh

  // Fetch comments from API when the post is available
  useEffect(() => {
    setIsLoading(true);
    const fetchComments = async () => {
      try {
        const response = await fetch('https://app-backend-8r74.onrender.com/api/v1/post/get-comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: 1,
            postId: post.Id,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        const data = await response.json();
        console.log(data);
        setComments(data.data.comments); // Set comments to state
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching comments:', error);
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    if (item?.post?.Id) {
      fetchComments(); // Call the function to fetch comments
    }
  }, [refresh, item?.post?.Id]); // Add `refresh` as a dependency to trigger re-fetch when it changes

  const userInfo = item?.userDetails;
  const post = item?.post;

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const addComment = async () => {
    const url = 'https://app-backend-8r74.onrender.com/api/v1/post/create-comment';

    // Define the comment data
    const commentData = {
      postId: post.Id,
      userId: user?.id,
      text: commentText,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell the server the body format
          Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Add your token if needed for authorization
        },
        body: JSON.stringify(commentData), // Convert the comment data into JSON format
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Comment added successfully:', responseData);

      // After adding comment, trigger a refresh by incrementing the state
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log('---------in comment submit-------');
    console.log(commentText.trim());
    if (commentText.trim()) {
      console.log('hi');
      console.log(post);
      // Add your comment submission logic here
      addComment();
      setCommentText(''); // Clear the textarea after submission
    }
  };
  console.log('------comments--------', comments);

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
                <CircleUserRound size={20} className="avatar-img rounded-circle" />
              )}
            </div>

            <div>
              <div className="nav nav-divider">
                <h6 className="nav-item card-title mb-0">
                  <span role="button">{userInfo?.firstName + ' ' + userInfo?.lastName} </span>
                </h6>
                <span className="nav-item small"> {userInfo?.timestamp}</span>
              </div>
            </div>
          </div>
          {/* Add action menu here */}
        </div>
      </CardHeader>

      <CardBody>
        {post?.content && <p>{post?.content}</p>}

        <ul className="nav nav-stack py-3 small">
          <li className="nav-item">
            <button className="nav-link active icons-center">
              <ThumbsUp size={18} />
              Like {post?.likeCount > 0 && `(${post?.likeCount})`}
            </button>
          </li>
          <li className="nav-item">
            <Link className="nav-link icons-center" to="">
              Comments {post?.commentCount > 0 && `(${post?.commentCount})`}
            </Link>
          </li>
        </ul>

        {/* Comment input section */}
        <div className="d-flex mb-3">
          <div className="avatar avatar-xs me-2">
            <span role="button">
              <img className="avatar-img rounded-circle" src={userInfo?.avatar} alt="avatar" />
            </span>
          </div>

          <form className="nav nav-item w-100 position-relative" onSubmit={handleCommentSubmit}>
            <textarea
              data-autoresize
              className="form-control pe-5 bg-light"
              rows={1}
              placeholder="Add a comment..."
              value={commentText}
              onChange={handleCommentChange}
            />
            <button
              className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
              type="submit"
            >
              <BsSendFill />
            </button>
          </form>
        </div>

        {/* Display comments */}
        {isLoading ? (
          <p>Loading comments...</p> // Display loading message while fetching
        ) : (
          comments && (
            <ul className="comment-wrap list-unstyled">
              {comments.map((comment, index) => (
                <CommentItem key={index} comment={comment} />
              ))}
            </ul>
          )
        )}
      </CardBody>

      {comments && comments.length > 5 && <CardFooter className="border-0 pt-0 ">{item?.comments && <LoadContentButton name="Load more comments" />}</CardFooter>}
    </Card>
  );
};

export default PostCard;
