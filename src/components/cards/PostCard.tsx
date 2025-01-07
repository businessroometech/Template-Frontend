import { useState, useEffect } from 'react'
import { BsSendFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { ThumbsUp } from 'lucide-react'
import { Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, DropdownDivider } from 'react-bootstrap'
import CommentItem from './components/CommentItem'
import LoadContentButton from '../LoadContentButton'
import { CircleUserRound } from 'lucide-react'

const PostCard = ({ item }) => {
  console.log(item);
  const [comments, setComments] = useState([])  // State to store comments
  const [commentText, setCommentText] = useState('')  // State to manage comment input
  const [isLoading, setIsLoading] = useState(true)  // State to manage loading state

  // Fetch comments from API when the post is available
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('https://app-backend-8r74.onrender.com/api/v1/post/get-comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "page": 1,
            "postId": "1d5b61a399792f3239e1824ec46cb70b"
        }),
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch comments')
        }
        
        const data = await response.json();
        console.log(data);
        setComments(data.data.data)  // Set comments to state
        // Log the fetched comments
        setIsLoading(false)  // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching comments:', error)
        setIsLoading(false)  // Set loading to false even if there's an error
      }
    }

    if (item?.post?.Id) {
      fetchComments()  // Call the function to fetch comments
    }
  }, [])  // Dependency array ensures the effect runs when the post ID changes

  const userInfo = item?.userDetails
  const post = item?.post

  const handleCommentChange = (e) => {
    setCommentText(e.target.value)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (commentText.trim()) {
      // Add your comment submission logic here
      console.log('Comment Submitted:', commentText)
      setCommentText('')  // Clear the textarea after submission
    }
  }

 
  return (
    <Card className='mb-10' >
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
        {isLoading  ? (
          <p>Loading comments...</p>  // Display loading message while fetching
        ) : (
          comments && <ul className="comment-wrap list-unstyled">
          {comments.map((comment, index) => (
            <CommentItem key={index} commentText={comment.content} />  // Render each comment dynamically
          ))}
        </ul>
        )}
      </CardBody>

      <CardFooter className="border-0 pt-0 ">{item?.comments && <LoadContentButton name="Load more comments" />}</CardFooter>
    </Card>
  )
}

export default PostCard
