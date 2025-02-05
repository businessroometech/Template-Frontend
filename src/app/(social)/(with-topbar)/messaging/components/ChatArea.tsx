import { Spinner } from 'react-bootstrap'
import { useChatContext } from '@/context/useChatContext'
import type { ChatMessageType, UserType } from '@/types/data'
import { useAuthContext } from '@/context/useAuthContext'
import GifPicker from 'gif-picker-react'
import { addOrSubtractMinutesFromDate } from '@/utils/date'
import { yupResolver } from '@hookform/resolvers/yup'
import makeApiRequest from '@/utils/apiServer'
import { formatDistanceToNow } from 'date-fns';
import avatar from '@/assets/images/avatar/default avatar.png'
import InfiniteScroll from 'react-infinite-scroll-component'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, CardFooter } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BsEmojiSmile } from 'react-icons/bs'
import { FaCheck, FaCheckDouble } from 'react-icons/fa6'
import { BsThreeDots } from 'react-icons/bs'
import * as yup from 'yup'
import debounce from 'lodash.debounce'
import { useOnlineUsers } from '@/context/OnlineUser.'
import { io } from 'socket.io-client'
import TextFormInput from '@/components/form/TextFormInput'
import Picker from 'emoji-picker-react'
import { SOCKET_URL } from '@/utils/api'

const socket = io(`${SOCKET_URL}`, {
  // path: "/socket.io",
  transports: ['websocket'],
})

const UserMessage = ({ message, toUser, profile }: { message: ChatMessageType; toUser: UserType; profile: string }) => {
  const sentByMe = message.receiverId === toUser.id;
  const gifPattern = /GIF:\[([^\]]+)\]/;
  const match = message.content.match(gifPattern);
  // console.log('match', message)
  return (
    <div className={clsx('d-flex mb-1', { 'justify-content-end text-end': sentByMe })}>
      <div className="flex-shrink-0 avatar avatar-xs me-2">
        {!sentByMe && <img className="avatar-img rounded-circle" src={profile || avatar} alt="User Avatar" />}
      </div>
      <div className="flex-grow-1">
        <div className="w-100">
          <div className={clsx('d-flex flex-column', sentByMe ? 'align-items-end' : 'align-items-start')}>
            {message.gif ? (
              <Card className="shadow-none p-2 border border-2 rounded mt-2">
                <img width={87} height={91} src={message.gif} alt={message.content || 'Message GIF'} />
              </Card>
            ) : match ? (
              <Card className="shadow-none p-2 border border-2 rounded mt-2">
                <img width={107} height={111} src={match[1]} alt="Message GIF" />
              </Card>
            ) : message.image ? (
              <Card className="shadow-none p-2 border border-2 rounded mt-2">
                <img width={87} height={91} src={message.image} alt={message.content || 'Message Image'} />
              </Card>
            ) : (
              <div className={clsx('p-2 px-3 rounded-2', sentByMe ? 'bg-primary text-white' : 'bg-light text-secondary')}>
                {message.content}
              </div>
            )}
            <div className="d-flex my-2 align-items-center">
              <div className="small text-secondary">
                {message.createdAt
                  ? formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })
                  : 'Just now'}
              </div>
              {sentByMe && (
                <>
                  {message.isRead ? (
                    <FaCheckDouble className="text-info small ms-2" />
                  ) : (
                    <FaCheck className="small ms-2" />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const ChatArea = () => {
  const { activeChat } = useChatContext()
  const { user } = useAuthContext()
  const [userMessages, setUserMessages] = useState<ChatMessageType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isGifPickerVisible, setIsGifPickerVisible] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const messageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [userMessages])

  useEffect(() => {
    if (!activeChat) return

    const roomId = `${user.id}-${activeChat.personalDetails.id}`
    // const roomId = `${activeChat.personalDetails.id}-${user.id}`
    // console.log(roomId)
    socket.emit('joinRoom', roomId)
    socket.on('connections', () => {

      console.log('Socket connected:', socket.id)
    })

    socket.on('connect_error', (err) => {
      console.error('Connection Error:', err.message)
    })

    socket.on('newMessage', (message) => {
      
      if (
        (message.senderId === user.id && message.receiverId === activeChat.personalDetails.id) ||
        (message.receiverId === user.id && message.senderId === activeChat.personalDetails.id)
      ) {
        setUserMessages((prevMessages) => [message, ...prevMessages])
      }
    })

    return () => {
      socket.emit('leaveRoom', roomId)
      socket.off('connect_error')
      socket.off('newMessage')
    }
  }, [user.id, activeChat]) 

  const messageSchema = yup.object({
    newMessage: yup.string().required('Please enter a message'),
  })

  const { reset, handleSubmit, control, setValue, getValues } = useForm({
    resolver: yupResolver(messageSchema),
  })

  const fetchMessages = useCallback(async () => {
    if (!activeChat) return
    setUserMessages([])
    setIsLoading(true)
    try {
      const response = await makeApiRequest<{ data: any[] }>({
        method: 'POST',
        url: 'api/v1/chat/get-messages-user-wise',
        data: {
          senderId: user?.id,
          receiverId: activeChat.personalDetails.id,
          page: page,
          limit: 100,
        },
      })
      // socket.emit('sendMessage', newMessage)

      if (response?.data?.messages) {
        if (response.data.total === 0) {
          setHasMore(false)
        } else {
          const sortedMessages = response.data.messages.sort((a, b) => new Date(a.sentOn).getTime() - new Date(b.sentOn).getTime())
          setUserMessages(sortedMessages)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [activeChat, page, user?.id])

  useEffect(() => {
    if (activeChat) {
      fetchMessages()
    }
  }, [activeChat, fetchMessages, page])

  const loadMore = () => {
    if (!hasMore) return
    setPage((prevPage) => prevPage + 1)
  }

  const sendChatMessage = async (values: { newMessage?: string }) => {
    if (!values.newMessage || !activeChat) return
    setUserMessages((prevMessages) => [newMessage, ...prevMessages])
    reset()
    const newMessage: ChatMessageType = {
      id: (userMessages.length + 1).toString(),
      senderId: user.id,
      receiverId: activeChat.personalDetails.id,
      content: values.newMessage,
      sentOn: addOrSubtractMinutesFromDate(-0.1),
      isSend: true,
      isRead: false,
    }
    try {
      await makeApiRequest({
        method: 'POST',
        url: 'api/v1/chat/send-message',
        data: { senderId: user.id, receiverId: activeChat.personalDetails.id, content: values.newMessage },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleEmojiClick = (emoji: any) => {
    const currentMessage = getValues('newMessage') || ''
    setValue('newMessage', currentMessage + emoji.emoji)
    setShowEmojiPicker(false)
  }

  const handleGifClick = (gif) => {
    const currentMessage = getValues('newMessage') || ''
    setValue('newMessage', currentMessage + `GIF:[${gif.url}]`)
    setIsGifPickerVisible(false)
  }

  if (!activeChat) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <h5 className="text-secondary">Tap on a name to start chatting</h5>
      </div>
    )
  }

  if (isLoading && userMessages.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  const { firstName, lastName } = activeChat.personalDetails
  const { profileImgUrl } = activeChat
  const {onlineUsers} = useOnlineUsers()
  const status = onlineUsers?.includes(activeChat.personalDetails.id) ? 'online' : 'offline'

  return (
    <Card className="card-chat rounded-0 border-0 mx-5" >
  <CardBody className="d-flex flex-column h-100 p-0 ">
    {/* Header */}
    <div className="d-flex align-items-center justify-content-between p-3 border-bottom bg-white sticky-top" style={{ top: 0, zIndex: 1, borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
      <div className="d-flex align-items-center">
        <img className="avatar-img rounded-circle me-2" src={profileImgUrl || avatar} alt={firstName} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
        <div>
          <h6 className="mb-0 text-dark" style={{ fontWeight: '600' }}>{`${firstName} ${lastName}`}</h6>
          <small className="text-secondary" style={{ fontSize: '0.85rem' }}>{status}</small>
        </div>
      </div>
    </div>

    {/* Message Box */}
    <div
      className="flex-grow-1 message-box bg-light"
      style={{
        overflowY: 'auto',
        padding: '20px',
        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px',
      }}>
      {/* <InfiniteScroll
        dataLength={userMessages.length}
        next={loadMore}
        hasMore={hasMore}
        inverse={true}
        loader={
          <div className="d-flex justify-content-center align-items-center py-3">
            <Spinner animation="border" variant="primary" />
          </div>
        }> */}
        {[...userMessages].reverse().map((message, index) => (
          <UserMessage key={index} message={message} toUser={activeChat.personalDetails} profile={profileImgUrl} />
        ))}
      {/* </InfiniteScroll> */}
      <div ref={messageEndRef} />
    </div>

    {/* Footer */}
    <CardFooter className="bg-white border-top p-3" style={{ borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
      <form onSubmit={handleSubmit(sendChatMessage)}>
        {/* Input Field */}
        <TextFormInput
          placeholder="Type a message"
          control={control}
          name="newMessage"
          maxLength={500}
          rows={1}
          autoComplete="off"
          className="form-control flex-grow-1 me-2 px-3 py-2 shadow-sm rounded"
          style={{
            fontSize: '1rem',
            border: '2px solid #ced4da',
            outline: 'none',
            borderRadius: '25px',
            transition: 'border-color 0.3s ease',
          }}
        />
        <div className='d-flex align-items-center'>
        {/* Emoji Button */}
        <Button
          variant="light"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="d-flex align-items-center m-2 justify-content-center p-2 rounded-circle border shadow-sm me-2"
          style={{ width: '45px', height: '45px' }}>
          <BsEmojiSmile size={20} />
        </Button>

        <Button
          variant="success-soft"
          // size="sm"
          className="d-flex align-items-center m-2 justify-content-center p-2 rounded-circle border shadow-sm me-3"
          onClick={() => setIsGifPickerVisible((prev) => !prev)}
          style={{ width: '45px', height: '45px' }}>
          Gif
        </Button>

        {/* Send Button */}
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="d-flex align-items-center justify-content-center px-3 py-2 rounded-pill ms-auto"
          style={{
            fontSize: '1rem',
            borderRadius: '25px',
            backgroundColor: '#007bff',
            padding: '8px 25px',
            boxShadow: '0 4px 6px rgba(0, 123, 255, 0.3)',
            transition: 'background-color 0.3s ease',
          }}>
          Send
        </Button>
        </div>
      </form>

      {/* Gif Picker */}
      {isGifPickerVisible && (
        <div
          className="gif-picker-container bg-white shadow-sm border rounded"
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '15px',
            zIndex: 10,
            maxWidth: '300px',
            maxHeight: '300px',
            overflow: 'hidden',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}>
          <GifPicker onGifClick={handleGifClick} tenorApiKey="AIzaSyD1wsKDALKwa8_pRGvhHcENUGFLq5DWhfs" />
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div
          className="emoji-picker-container bg-white shadow-sm border rounded"
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '15px',
            zIndex: 10,
            maxWidth: '300px',
            maxHeight: '300px',
            overflow: 'hidden',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}>
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </CardFooter>
  </CardBody>
</Card>

  )
}

export default ChatArea
