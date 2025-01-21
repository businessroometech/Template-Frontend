
import { useChatContext } from '@/context/useChatContext'
import useViewPort from '@/hooks/useViewPort'
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'react-bootstrap'
import ChatUsers from './ChatUsers'
import { useAuthContext } from '@/context/useAuthContext'
import { useEffect, useState } from 'react'
import makeApiRequest from '@/utils/apiServer'

const ChatUserList = ({ setTotalChats }) => {
  const { width } = useViewPort();
  const { chatList } = useChatContext();
  const { user } = useAuthContext();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await makeApiRequest({
        method: 'POST',
        url: 'api/v1/connection/get-connection-list',
        data: { userId: user?.id, profileId: user?.id },
      });
      setChats(res.connections);
      setTotalChats(res.connections.length);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <>
      {width >= 992 ? (
        chats && <ChatUsers chats={chats} />
      ) : (
        <Offcanvas show={chatList.open} onHide={chatList.toggle} placement="start" tabIndex={-1} id="offcanvasNavbar">
          <OffcanvasHeader closeButton />
          <OffcanvasBody className="p-0">{chats && <ChatUsers chats={chats} />}</OffcanvasBody>
        </Offcanvas>
      )}
    </>
  );
};

export default ChatUserList;