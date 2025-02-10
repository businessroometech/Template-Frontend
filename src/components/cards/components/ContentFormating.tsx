import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// If you're using built in layout, you will need to import this css
import '@ashwamegh/react-link-preview/dist/index.css'
import CustomLinkPreview from "./CustomLinkPreview";
import Loading from "@/components/Loading";


const formatContent = (content: string) => {
  if (!content) return null;
  const [mentionMap, setMentionMap] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
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
      toast.success("navigate to user profile");
      navigate(`/profile/feed/${data.data.id}`);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('User not available');
    }
  };

  useEffect(() => {
    const fetchMentions = async () => {
      const uniqueMentions = Object.keys(mentionMap).filter((mention) => mentionMap[mention] === mention);

      if (uniqueMentions.length === 0) return;

      const updatedMap = { ...mentionMap };

      await Promise.all(
        uniqueMentions.map(async (username) => {
          try {
            const res = await fetch('http://13.216.146.100/api/v1/auth/get-user-userName', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userName: username }),
            });

            if (!res.ok) throw new Error('Failed to fetch user data');

            const data = await res.json();
            updatedMap[username] = `${data.data.firstName} ${data.data.lastName}`;
          } catch (error) {
            console.error('Error fetching username:', error);
            updatedMap[username] = username;
          }
        })
      );

      setMentionMap(updatedMap);
    };

    fetchMentions();
  }, [mentionMap]);

  // Regex patterns
  const mentionRegex = /(@[a-zA-Z0-9_]+)/g;
  const hashtagRegex = /(#\w+)/g;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const imageRegex = /(https?:\/\/[^\s]+(?:\.(?:png|jpg|jpeg|gif|webp|svg)|\?[^ ]*(?:format=|auto=format))[^ ]*)/gi;
  const videoRegex = /(https?:\/\/.*\.(?:mp4|webm|ogg))/i;
  const youtubeRegex =
    /(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+))/;
  const pptRegex = /(https?:\/\/[^\s]+\.pptx?)/g;
  const googleDocsRegex =
    /https:\/\/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/([a-zA-Z0-9-_]+)/;

  return content.split(/(\s+)/).map((word, index) => {
    if (mentionRegex.test(word)) {
      const username = word.substring(1);

      if (!mentionMap[username]) {
        setMentionMap((prev) => ({ ...prev, [username]: username })); 
      }

      return (
        <span
          key={index}
          onClick={() => handleMentionClick(username)}
          style={{ color: '#0a66c2', fontWeight: '500', cursor: 'pointer' }}
        >
          {mentionMap[username]?mentionMap[username]:<Loading size={5} loading />}
        </span>
      );
    } else if (hashtagRegex.test(word)) {
      return (
        <span
          key={index}
          style={{color: '#0a66c2', fontWeight: '500', cursor: 'pointer' 
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
        <a href={word} target="_blank">
          <CustomLinkPreview
            key={index}
            url={word}
          />
        </a>
      );
    }

    return word;
  });
};

export default formatContent