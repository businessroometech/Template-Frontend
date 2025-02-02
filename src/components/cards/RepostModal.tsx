import { useAuthContext } from '@/context/useAuthContext';
import { CREATE_POST } from '@/utils/api';
import makeApiRequest from '@/utils/apiServer';
import React, { useState } from 'react';
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
            <textarea
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
            />
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
