import { useAuthContext } from '@/context/useAuthContext';
import { CREATE_POST } from '@/utils/api';
import makeApiRequest from '@/utils/apiServer';
import React, { useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { PostSchema } from './PostCard';


interface ApiResponse<T> {
    status: number
    data: T
}

const RepostModal = ({ isOpen, onClose, authorName,item,setIsCreated,isCreated } 
: 
{
  isOpen : boolean;
  onClose : () => void;
  authorName : string;
  item : PostSchema;
  setIsCreated  : React.Dispatch<React.SetStateAction<boolean>>;
  isCreated  : boolean;
}) => {
  const [includeThoughts, setIncludeThoughts] = useState(false);
  const [thoughts, setThoughts] = useState('');
  const [hoveredOption, setHoveredOption] = useState(null); // To track which option is hovered
  const [isSubmittingPost,setIsSubmittingPost] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useAuthContext();
//   console.log('item in repost modal',item);

  const handleRepost = () => {
    if (includeThoughts) {
      console.log('Reposting with thoughts:', thoughts);
      handlePostClick();
    } else {
      console.log('Simple repost');
      handlePostClick();
    }
    onClose();
    setIncludeThoughts(false);
  };

  const handlePostClick = async () => {
    // Check if thoughts is empty
    setIsSubmittingPost(true);
    try {
      const hashtagRegex = /#\w+/g
      const hashtags = thoughts.match(hashtagRegex) || []
      const response = await makeApiRequest<ApiResponse<{ url: string }>>({
        method: 'POST',
        url: CREATE_POST,
        data: {
          hashtags: hashtags,
          repostedFrom : item.post.repostedFrom ? item.post.repostedFrom : item.post.userId,
          userId : user?.id,
          content : item.post.content,   
          mediaKeys : (item as PostSchema).post.mediaKeys,    
          repostText : thoughts,
        },
      })

      if (response.data) {
        setThoughts('')
        console.log(response.data);
        
      }
    } catch (err) {
      console.log('Error in the posting', err)
    }
    finally {
      setIsSubmittingPost(false);
      setIsCreated(() => !isCreated)
    }
  }

  
    const [mentionDropdownVisible, setMentionDropdownVisible] = useState(false);
    const textareaRef = useRef(null);
  
  
    // Function to handle textarea change
    const handleChange = (e: string) => {
      const value = e.target.value;
      setThoughts(value);
  
      const lastWord = value.split(/\s+/).pop();
      if (lastWord.startsWith("@")) {
        fetchUsers(lastWord);
      } else {
        setMentionDropdownVisible(false);
      }
    };
  
  // Function to fetch users when '@' is typed
  const fetchUsers = async (query: string) => {
    if (!query.startsWith("@")) return;
    setLoading(true);

    try {
      const response = await fetch(`http://13.216.146.100/api/v1/post/mention`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userId:user?.id, query }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setSearchResults(data?.data || []);
      setMentionDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching users:", error);
    }

    setLoading(false);
  };


   // Function to insert mention
   const handleMentionClick = (user:any, type:string) => {
    const mention = `${user.userName} `;

      setThoughts((prev) => prev + mention);
    setMentionDropdownVisible(false); 
  };

  return (
    <Modal
      show={isOpen}
      onHide={() => {
        setIncludeThoughts(false);
        onClose();
      }}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Share Post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Option 1: Repost with Thoughts */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: hoveredOption === 'thoughts' ? '#f5f5f5' : 'transparent',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={() => setHoveredOption('thoughts')}
          onMouseLeave={() => setHoveredOption(null)}
          onClick={() => setIncludeThoughts(true)}
        >
          <span style={{ marginRight: '10px', fontSize: '18px' }}>✏️</span>
          <div>
            <h5 style={{ margin: 0 }}>Repost with your thoughts</h5>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              Create a new post with {authorName}'s post attached
            </p>
          </div>
        </div>

        {/* Option 2: Quick Repost */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: hoveredOption === 'quick' ? '#f5f5f5' : 'transparent',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={() => setHoveredOption('quick')}
          onMouseLeave={() => setHoveredOption(null)}
          onClick={handleRepost}
        >
          <span style={{ marginRight: '10px', fontSize: '18px' }}>↗️</span>
          <div>
            <h5 style={{ margin: 0 }}>Quick Repost</h5>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              Instantly share {authorName}'s post to your feed
            </p>
          </div>
        </div>

        {/* Thoughts Input Section */}
        {includeThoughts && (
          <div style={{ marginTop: '15px' }}>
            {/* <textarea
              style={{
                width: '100%',
                height: '100px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginBottom: '10px',
                resize: 'none',
                boxSizing: 'border-box',
              }}
              placeholder="Add your thoughts..."
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
            /> */}


<div style={{ position: "relative", width: "100%" }}>
            <textarea
              ref={textareaRef}
              className="form-control pe-4 border rounded"
              style={{
                borderColor: "#212529",
                color: "#212529",
                backgroundColor: "#f8f9fa",
                fontSize: "14px",
                width: "100%",
                resize: "none",
              }}
              rows={2}
              placeholder="Start a post"
              value={thoughts}
              onChange={handleChange}
            />

            {/* Mention Dropdown */}
            {mentionDropdownVisible && searchResults.length > 0 && (
              <div
                className="position-absolute bg-white shadow rounded w-100 mt-1"
                style={{
                  zIndex: 1000,
                  maxHeight: "200px",
                  overflowY: "auto",
                  border: "1px solid #ddd",
                }}
              >
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    className="d-flex align-items-center p-2 cursor-pointer"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMentionClick(user, "thoughts")}
                  >
                    <img
                      src={user.avatar ? user.avatar : avatar7}
                      alt={user.fullName}
                      className="rounded-circle me-2"
                      width={40}
                      height={35}
                    />
                    <div>
                      <h6 className="mb-0">{user.fullName}</h6>
                      <small className="text-muted">{user.userRole}</small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

            <Button
              onClick={handleRepost}
              style={{
                width: '100%',
                backgroundColor: '#1a8cd8',
                border: 'none',
              }}
            >
              Repost
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default RepostModal;
