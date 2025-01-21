
import { useChatContext } from '@/context/useChatContext'
import useViewPort from '@/hooks/useViewPort'
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'react-bootstrap'
import ChatUsers from './ChatUsers'
import { useAuthContext } from '@/context/useAuthContext'
import { useEffect, useState } from 'react'
import makeApiRequest from '@/utils/apiServer'

const ChatUserList = () => {
 // const chats = useFetchData(getAllUsers)
  const { width } = useViewPort()
  const { chatList } = useChatContext()
  const { user } = useAuthContext()
  const [chats, setChats] = useState<chat[]>([])
  const [loading, setLoading] = useState(false)
  const [chatsList, setChatsList] = useState<any[]>([])

  const fetchConnections = async () =>{
    console.log(width)
    try {
      setLoading(true)
      const res = await makeApiRequest<{ data: any[] }>({
        method: 'POST',
        url: 'api/v1/connection/get-connection-list',
        data: { userId: user?.id, profileId:user?.id},
      }) 
      setChats(res.connections)
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchConnections();
  },[])
  

  return (
    <>
      {width >= 992 ? (
        <>
        {chats &&
          <ChatUsers chats={chats} />}
        </>
      ) : (
         <Offcanvas show={chatList.open} onHide={chatList.toggle} placement="start" tabIndex={-1} id="offcanvasNavbar">
         <OffcanvasHeader closeButton />
         <OffcanvasBody className="p-0">{chats && <ChatUsers chats={chats} />}</OffcanvasBody>
         </Offcanvas>
      )}
    </>
  )
}
export default ChatUserList
