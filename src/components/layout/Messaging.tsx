import { useCallback, useEffect, useRef, useState } from 'react'
import { messages } from '@/assets/data/other'
import makeApiRequest from '@/utils/apiServer'
import { useFetchData } from '@/hooks/useFetchData'
import Picker from 'emoji-picker-react'
import { useAuthContext } from '@/context/useAuthContext'
import GifPicker from 'gif-picker-react'
import useToggle from '@/hooks/useToggle'
import { useOnlineUsers } from '@/context/OnlineUser.'
import { formatDistanceToNow } from 'date-fns'
import { type ChatMessageType, type UserType } from '@/types/data'
import { addOrSubtractMinutesFromDate, timeSince } from '@/utils/date'
// import { io } from 'socket.io-client'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Toast,
  ToastContainer,
  ToastHeader,
  Spinner,
} from 'react-bootstrap'
import { useChatContext } from '@/context/useChatContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { BsArchive, BsCameraVideo, BsChatSquareText, BsDashLg, BsFlag, BsTelephone, BsThreeDotsVertical, BsTrash, BsVolumeUp } from 'react-icons/bs'
import debounce from 'lodash.debounce'
import { FaCheck, FaCheckDouble, FaCircle, FaFaceSmile, FaPaperclip, FaXmark } from 'react-icons/fa6'
import * as yup from 'yup'
import { io } from 'socket.io-client'
import TextFormInput from '../form/TextFormInput'
import SimplebarReactClient from '../wrappers/SimplebarReactClient'
import avatar from '@/assets/images/avatar/default avatar.png'
import avatar10 from '@/assets/images/avatar/10.jpg'

const socket = io('http://13.216.146.100/', {
  // path: "/socket.io",
  transports: ['websocket'],
})

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (elementRef?.current?.scrollIntoView) elementRef.current.scrollIntoView({ behavior: 'smooth' })
  })
  return <div ref={elementRef} />
}

const UserMessage = ({ message, toUser, profile }: { message: ChatMessageType; toUser: UserType; profile: string }) => {
  const received = message.receiverId === toUser.userId
  const gifPattern = /GIF:\[([^\]]+)\]/
  const match = message.content.match(gifPattern)
  // const {onlineUsers} = useOnlineUsers();
  // const status = onlineUsers?.includes(toUser.userId) ? 'online' : 'offline';

  return (
    <div className={clsx('d-flex mb-1', { 'justify-content-end text-end': received })}>
      <div className="flex-shrink-0 avatar avatar-xs me-2">
        {!received && <img className="avatar-img rounded-circle" src={profile || avatar} alt="User Avatar" />}
      </div>
      <div className="flex-grow-1">
        <div className="w-100">
          <div className={clsx('d-flex flex-column', received ? 'align-items-end' : 'align-items-start')}>
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
              <div className={clsx('p-2 px-3 rounded-2', received ? 'bg-primary text-white' : 'bg-light text-secondary')}>{message.content}</div>
            )}
            <div className="d-flex my-2 align-items-center">
              <div className="small text-secondary">
                {/* Calculate relative time */}
                {message.createdAt ? formatDistanceToNow(new Date(message.createdAt), { addSuffix: true }) : 'Just now'}
              </div>
              {message.isRead && <FaCheckDouble className="text-info small ms-2" />}
              {!message.isRead && message.isSend && <FaCheck className="small ms-2" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const UserCard = ({ user, openToast }: { user: UserType; openToast: () => void }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { onlineUsers } = useOnlineUsers()
  const status = onlineUsers?.includes(user.userId) ? 'online' : 'offline'
  // console.log(user)
  useEffect(() => {
    if (user) {
      setIsLoading(false)
    }
  }, [user])

  if (isLoading) {
    return (
      <li className="mt-3 hstack gap-3 align-items-center position-relative toast-btn">
        <Spinner animation="border" size="sm" className="ms-auto" />
        <span className="ms-2">Loading user...</span>
      </li>
    )
  }

  return (
    <li
      onClick={() => {
        openToast()
      }}
      className="mt-3 hstack gap-3 align-items-center position-relative toast-btn"
      data-target="chatToast">
      <div className={clsx(`avatar status-${status}`, { 'avatar-story': user.isStory })}>
        {user.profilePictureUrl ? (
          <img className="avatar-img rounded-circle" src={user.profilePictureUrl} alt="avatar" />
        ) : (
          <img className="avatar-img rounded-circle" src={avatar} alt="avatar" />
        )}
      </div>
      <div className="overflow-hidden">
        <Link className="h6 mb-0 stretched-link" to="">
          {`${user.firstName} ${user.lastName}`}
        </Link>
        <div className="small text-secondary text-truncate">{user.lastMessage}</div>
      </div>
      {/* <div className="small ms-auto text-nowrap">{timeSince(user.lastActivity)}</div> */}
    </li>
  )
}

const Messaging = () => {
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [loading, setIsLoading] = useState(true)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [allUserMessages, setAllUserMessages] = useState<UserType[]>([])
  const [userMessages, setUserMessages] = useState<{ [key: string]: ChatMessageType[] }>({})
  const { user } = useAuthContext()
  const [openToasts, setOpenToasts] = useState<{ [key: string]: boolean }>({})
  const [activeChats, setActiveChats] = useState<UserType[]>([])
  const [isGifPickerVisible, setIsGifPickerVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [messageMap, setMessageMap] = useState<{ [key: string]: string }>({}) // Track messages per user
  const [isOpenCollapseToast, setIsOpenCollapseToast] = useState<{ [key: string]: boolean }>({})
  const messageSchema = yup.object({
    newMessage: yup.string().required('Please enter message'),
  })

  const { reset, handleSubmit, control, getValues, setValue } = useForm({
    resolver: yupResolver(messageSchema),
  })

  useEffect(() => {
    if (!selectedUser) return

    const roomId = `${user.id}-${selectedUser.userId}`
    socket.emit('joinRoom', roomId)

    const handleNewMessage = (message) => {
      if (
        (message.senderId === user.id && message.receiverId === selectedUser.userId) ||
        (message.receiverId === user.id && message.senderId === selectedUser.userId)
      ) {
        setUserMessages((prevMessages) => ({
          ...prevMessages,
          [selectedUser.userId]: [...(prevMessages[selectedUser.userId] || []), message],
        }))
      }
    }

    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.emit('leaveRoom', roomId)
      socket.off('newMessage', handleNewMessage) // Properly remove listener
    }
  }, [user.id, selectedUser])

  const fetchChatsList = async () => {
    try {
      setIsLoading(true)
      const res = await makeApiRequest<{ data: any[] }>({
        method: 'POST',
        url: 'api/v1/connection/get-connection-list',
        data: { userId: user?.id, profileId: user?.id },
      })
      setAllUserMessages(res.connections)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChatsList()
  }, [page])

  const fetchMessages = useCallback(async () => {
    if (!selectedUser) return
    setIsLoading(true)

    try {
      const response = await makeApiRequest<{ data: { messages: ChatMessageType[]; total: number } }>({
        method: 'POST',
        url: 'api/v1/chat/get-messages-user-wise',
        data: {
          senderId: user?.id,
          receiverId: selectedUser.userId,
          page,
          limit: 50,
        },
      })
      if (response?.data?.messages) {
        if (response.data.total === 0) {
          setHasMore(false)
        } else {
          const sortedMessages = response.data.messages.sort((a, b) => new Date(a.sentOn).getTime() - new Date(b.sentOn).getTime())
          setUserMessages((prevMessages) => ({
            ...prevMessages,
            [selectedUser.userId]: sortedMessages.reverse(),
          }))
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedUser?.userId, page, user])

  const sendChatMessage = async (values, chatUser) => {
    console.log('values', values)
    if (!values.newMessage || !chatUser) return

    const newMessage = {
      id: ((userMessages[chatUser.userId]?.length || 0) + 1).toString(),
      senderId: user.id,
      receiverId: chatUser.userId,
      content: values.newMessage,
      sentOn: addOrSubtractMinutesFromDate(-0.1),
      isSend: true,
      isRead: false,
    }

    try {
      await makeApiRequest({
        method: 'POST',
        url: 'api/v1/chat/send-message',
        data: { senderId: user.id, receiverId: chatUser.userId, content: values.newMessage },
      })

      setUserMessages((prevMessages) => ({
        ...prevMessages,
        [chatUser.userId]: [...(prevMessages[chatUser.userId] || []), newMessage],
      }))

      setMessageMap((prevState) => ({ ...prevState, [chatUser.userId]: '' })) // Reset input after send
    } catch (error) {
      console.error(error)
    }
  }

  const handleEmojiClick = (emoji: any) => {
    const currentMessage = messageMap[selectedUser?.userId] || '' // Get message for specific user
    setMessageMap((prev) => ({
      ...prev,
      [selectedUser?.userId]: currentMessage + emoji.emoji,
    }))
    setShowEmojiPicker(false)
  }

  const handleGifClick = (gif) => {
    const currentMessage = messageMap[selectedUser?.userId] || ''
    setMessageMap((prev) => ({
      ...prev,
      [selectedUser?.userId]: currentMessage + `GIF:[${gif.url}]`,
    }))
    setIsGifPickerVisible(false)
  }

  const handleUserToggle = (user) => {
    setOpenToasts((prevState) => ({
      ...prevState,
      [user.userId]: !prevState[user.userId],
    }))

    setActiveChats((prevChats) => {
      const updatedChats = prevChats.find((chat) => chat.userId === user.userId) ? prevChats : [...prevChats, user]

      if (updatedChats.length > 3) {
        updatedChats.shift()
      }

      return updatedChats
    })

    setSelectedUser(user)
    fetchMessages()
    setIsOpenCollapseToast((prevState) => ({
      ...prevState,
      [user.userId]: true,
    }))
  }

  const closeChat = (userId) => {
    setActiveChats((prevChats) => prevChats.filter((chat) => chat.userId !== userId))
    setOpenToasts((prevState) => ({
      ...prevState,
      [userId]: false,
    }))
  }

  const toggleToastCollapse = (userId) => {
    setIsOpenCollapseToast((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }))
  }

  const { onlineUsers } = useOnlineUsers()

  return (
    <>
      <ul className="list-unstyled">
        {allUserMessages?.map((user, index) => <UserCard user={user} key={index} openToast={() => handleUserToggle(user)} />)}
        <li className="mt-3 d-grid">
          <Link className="btn btn-primary-soft" to="/messaging">
            See all in messaging
          </Link>
        </li>
      </ul>
      <div aria-live="polite" aria-atomic="true" className="position-relative">
        <ToastContainer className="toast-chat d-flex gap-3 align-items-end">
          {activeChats?.map((chatUser) => {
            const isOnline = onlineUsers?.includes(chatUser?.userId) // Check if user is online

            return (
              <Toast
                key={chatUser?.userId}
                show={openToasts[chatUser.userId]}
                onClose={() => closeChat(chatUser?.userId)}
                style={{ marginBottom: '0px' }}>
                <ToastHeader closeButton={false} className="bg-mode">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex">
                      <div className={clsx('flex-shrink-0 avatar me-2', { 'avatar-story': chatUser?.isStory })}>
                        {chatUser && chatUser.profilePictureUrl ? (
                          <img className="avatar-img rounded-circle" src={chatUser.profilePictureUrl} alt="avatar" />
                        ) : (
                          <img className="avatar-img rounded-circle" src={avatar} alt="default avatar" />
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0 mt-1">{`${chatUser?.firstName || ''} ${chatUser?.lastName || ''}`}</h6>
                        <div className="small text-secondary">
                          <FaCircle className={`text-${isOnline ? 'success' : 'danger'} me-1`} />
                          {isOnline ? 'Online' : 'Offline'}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <Dropdown drop="start">
                        <DropdownToggle
                          as="a"
                          className="btn btn-secondary-soft-hover py-1 px-2 content-none"
                          id="chatcoversationDropdown"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="outside"
                          aria-expanded="false">
                          <BsThreeDotsVertical />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end" aria-labelledby="chatcoversationDropdown">
                          <li>
                            <DropdownItem>
                              <BsCameraVideo className="me-2 fw-icon" />
                              Video call
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem>
                              <BsTelephone className="me-2 fw-icon" />
                              Audio call
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem>
                              <BsTrash className="me-2 fw-icon" />
                              Delete
                            </DropdownItem>
                          </li>
                        </DropdownMenu>
                      </Dropdown>
                      <a
                        className="btn btn-secondary-soft-hover py-1 px-2"
                        data-bs-toggle="collapse"
                        onClick={() => toggleToastCollapse(chatUser.userId)}>
                        <BsDashLg />
                      </a>
                      <button
                        onClick={() => closeChat(chatUser.userId)}
                        className="btn btn-secondary-soft-hover py-1 px-2"
                        data-bs-dismiss="toast"
                        aria-label="Close">
                        <FaXmark />
                      </button>
                    </div>
                  </div>
                </ToastHeader>
                <Collapse in={isOpenCollapseToast[chatUser.userId]} className="toast-body">
                  <div>
                    <SimplebarReactClient className="chat-conversation-content custom-scrollbar h-200px">
                      <div className="text-center small my-2">
                        {new Date().toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        })}
                      </div>
                      {userMessages[chatUser?.userId]?.map((message, index) => (
                        <UserMessage message={message} key={index} toUser={chatUser} profile={avatar} />
                      ))}
                      <AlwaysScrollToBottom />
                    </SimplebarReactClient>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        const message = getValues(`newMessage_${chatUser?.userId}`) || ''

                        if (!message.trim()) return

                        sendChatMessage({ newMessage: message }, chatUser)

                        setValue(`newMessage_${chatUser?.userId}`, '')
                        setMessageMap((prev) => ({
                          ...prev,
                          [chatUser?.userId]: '',
                        }))
                      }}
                      className="mt-2">
                      <input
                        className="mb-sm-0 mb-3"
                        name={`newMessage_${chatUser?.userId}`}
                        placeholder="Type a message"
                        autoFocus
                        control={control}
                        containerClassName="w-100"
                        value={messageMap[chatUser?.userId] || ''}
                        onChange={(e) => {
                          const newMessage = e.target.value
                          setSelectedUser(chatUser)
                          setMessageMap((prev) => ({
                            ...prev,
                            [chatUser?.userId]: newMessage,
                          }))

                          setValue(`newMessage_${chatUser?.userId}`, newMessage)
                        }}
                        style={{
                          fontSize: '1rem',
                          border: '2px solid #ced4da',
                          borderRadius: '10px',
                          padding: '10px',
                          width: '100%',
                          outline: 'none',
                          backgroundColor: '#f8f9fa',
                        }}
                      />

                      <div className="d-sm-flex align-items-end mt-2">
                        <Button variant="danger-soft" size="sm" className="me-2" onClick={() => setShowEmojiPicker((prev) => !prev)}>
                          <FaFaceSmile className="fs-6" />
                        </Button>
                        <Button variant="secondary-soft" size="sm" className="me-2">
                          <FaPaperclip className="fs-6" />
                        </Button>
                        <Button variant="success-soft" size="sm" className="me-2" onClick={() => setIsGifPickerVisible((prev) => !prev)}>
                          Gif
                        </Button>
                        <Button variant="primary" size="sm" className="ms-auto" type="submit">
                          Send
                        </Button>
                      </div>
                    </form>
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
                        }}>
                        <GifPicker onGifClick={handleGifClick} tenorApiKey="YOUR_API_KEY" />
                      </div>
                    )}
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
                        }}>
                        <Picker onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                  </div>
                </Collapse>
              </Toast>
            )
          })}
        </ToastContainer>
      </div>
    </>
  )
}
export default Messaging
