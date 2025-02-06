import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LinkPreview from "@ashwamegh/react-link-preview"

// If you're using built in layout, you will need to import this css
import '@ashwamegh/react-link-preview/dist/index.css'
const formatContent = (content: string) => {
    if (!content) return null;

  
    // Regex patterns
    const mentionRegex = /(@[a-zA-Z0-9_]+)/g;
    const hashtagRegex = /(#\w+)/g;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
    const videoRegex = /(https?:\/\/.*\.(?:mp4|webm|ogg))/i;
    const youtubeRegex =
      /(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+))/;
    const pptRegex = /(https?:\/\/[^\s]+\.pptx?)/g;
  
    // **New regex for Google Docs, Sheets, and Slides**
    const googleDocsRegex =
      /https:\/\/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/([a-zA-Z0-9-_]+)/;
  
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
      } else if (pptRegex.test(word)) {
        return (
          <div key={index} className="ppt-preview">
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(word)}`}
              width="100%"
              height="300px"
              style={{
                borderRadius: '8px',
                marginTop: '8px',
                border: '1px solid #ddd',
              }}
              allowFullScreen
            ></iframe>
          </div>
        );
      } else if (googleDocsRegex.test(word)) {
        const match = word.match(googleDocsRegex);
        if (match) {
          const docType = match[1];
          const docId = match[2];
  
          let embedUrl = '';
          if (docType === 'document') {
            embedUrl = `https://docs.google.com/document/d/${docId}/preview`;
          } else if (docType === 'spreadsheets') {
            embedUrl = `https://docs.google.com/spreadsheets/d/${docId}/preview`;
          } else if (docType === 'presentation') {
            embedUrl = `https://docs.google.com/presentation/d/${docId}/embed`;
          }
  
          return (
            <iframe
              key={index}
              src={embedUrl}
              width="100%"
              height="400px"
              style={{
                borderRadius: '8px',
                marginTop: '8px',
                border: '1px solid #ddd',
              }}
              allowFullScreen
            ></iframe>
          );
        }
      } else if (urlRegex.test(word)) {
        return (
          <LinkPreview
            key={index}
            url={word}
            width="100%"
            descriptionLength={90}
            imageHeight={200}
            borderRadius="8px"
            marginTop="8px"
          />
        );
      }
  
      return word;
    });
  };

  
  const navigate = useNavigate();

  // Function to navigate to a user profile when clicking a mention
 

  const handleMentionClick = async (username: string) => {
   
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
 
      navigate(`/profile/feed/${data.data.id}`);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('User not available');
    }

  };

  
  export default formatContent