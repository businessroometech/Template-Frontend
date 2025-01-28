import { useCallback, useEffect, useRef, useState } from 'react'
import { messages } from '@/assets/data/other'
import makeApiRequest from '@/utils/apiServer'
import { useFetchData } from '@/hooks/useFetchData'
import Picker from 'emoji-picker-react'
import { useAuthContext } from '@/context/useAuthContext'
import GifPicker from 'gif-picker-react';
import useToggle from '@/hooks/useToggle'
import { useOnlineUsers } from '@/context/OnlineUser.'
import { formatDistanceToNow } from 'date-fns';
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

const socket = io('http://54.177.193.30:5000/', {
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
  const received = message.receiverId === toUser.userId;
  const gifPattern = /GIF:\[([^\]]+)\]/;
  const match = message.content.match(gifPattern);
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
            <div className={clsx('p-2 px-3 rounded-2', received ? 'bg-primary text-white' : 'bg-light text-secondary')}>
              {message.content}
            </div>
          )}
          <div className="d-flex my-2 align-items-center">
            <div className="small text-secondary">
              {/* Calculate relative time */}
              {message.createdAt
                ? formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })
                : 'Just now'}
            </div>
            {message.isRead && <FaCheckDouble className="text-info small ms-2" />}
            {!message.isRead && message.isSend && <FaCheck className="small ms-2" />}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const UserCard = ({ user, openToast }: { user: UserType; openToast: () => void }) => {
  const [isLoading, setIsLoading] = useState(true)
  const {onlineUsers} = useOnlineUsers(); 
  const status = onlineUsers?.includes(user.id) ? 'online' : 'offline';
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
  const { isTrue: isOpen, toggle, setTrue } = useToggle()
  const { activeChat } = useChatContext()
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const { isTrue: isOpenCollapseToast, toggle: toggleToastCollapse } = useToggle(true)
  const [loading, setIsLoading] = useState(true)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [allUserMessages, setAllUserMessages] = useState<UserType[]>([])
  const [userMessages, setUserMessages] = useState<ChatMessageType[]>([])
  const { user } = useAuthContext()
  const [isGifPickerVisible, setIsGifPickerVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const messageSchema = yup.object({
    newMessage: yup.string().required('Please enter message'),
  })

  const { reset, handleSubmit, control, getValues, setValue } = useForm({
    resolver: yupResolver(messageSchema),
  })

  useEffect(() => {
    if (!selectedUser) return

    const roomId = `${user.id}-${selectedUser.userId}`
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
        (message.senderId === user.id && message.receiverId === selectedUser.userId) ||
        (message.receiverId === user.id && message.senderId === selectedUser.userId)
      ) {
        setUserMessages((prevMessages) => [message, ...prevMessages])
      }
    })

    return () => {
      socket.emit('leaveRoom', roomId)
      socket.off('connect_error')
      socket.off('newMessage')
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
      // console.log(res.connections)
      setAllUserMessages(res.connections)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChatsList()
  }, [])

  const fetchMessages = useCallback(async () => {
    // console.log('selectedUser', selectedUser)
    if (!selectedUser) return
    setUserMessages([])
    setIsLoading(true)
    try {
      const response = await makeApiRequest<{ data: any[] }>({
        method: 'POST',
        url: 'api/v1/chat/get-messages-user-wise',
        data: {
          senderId: user?.id,
          receiverId: selectedUser.userId,
          page: 1,
          limit: 50,
        },
      })

      if (response?.data?.messages) {
        if (response.data.total === 0) {
          setHasMore(false)
        } else {
          const sortedMessages = response.data.messages.sort((a, b) => new Date(a.sentOn).getTime() - new Date(b.sentOn).getTime())
          // console.log('sortedMessages', sortedMessages)
          setUserMessages(sortedMessages)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedUser, page, user])
  useEffect(() => {
    if (selectedUser) {
      fetchMessages()
    }
  }, [selectedUser, page, user, toggle])

  const sendChatMessage = async (values: { newMessage?: string }) => {
    if (!values.newMessage || !selectedUser) return
    setUserMessages((prevMessages) => [newMessage, ...prevMessages])
    reset()
    const newMessage: ChatMessageType = {
      id: (userMessages.length + 1).toString(),
      senderId: user.id,
      receiverId: selectedUser.userId,
      content: values.newMessage,
      sentOn: addOrSubtractMinutesFromDate(-0.1),
      isSend: true,
      isRead: false,
    }
    try {
      await makeApiRequest({
        method: 'POST',
        url: 'api/v1/chat/send-message',
        data: { senderId: user.id, receiverId: selectedUser.userId, content: values.newMessage },
      })
      // console.log('newMessage', newMessage)
      reset()
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
    const currentMessage = getValues('newMessage') || '';
    setValue('newMessage', currentMessage + `GIF:[${gif.url}]`);
    setIsGifPickerVisible(false);  
  };

  const handleUserToggle = (user: UserType) => {
    setSelectedUser(user) // Set the selected user
    // console.log(user)
    setTrue() // Open the toast
  }

  // const handleEmojiClick = (emoji: any) => {
  //   const currentMessage = getValues('newMessage') || ''
  //   setValue('newMessage', currentMessage + emoji.emoji)
  //   setShowEmojiPicker(false)
  // }
  const {onlineUsers} = useOnlineUsers(); 
  const status = onlineUsers?.includes(selectedUser.userId) ? 'online' : 'offline';

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
          <Toast
            show={isOpen}
            onClose={toggle}
            id="chatToast"
            className="mb-0 bg-mode"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-bs-autohide="false">
            <ToastHeader closeButton={false} className="bg-mode">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex">
                  <div className={clsx('flex-shrink-0 avatar me-2', { 'avatar-story': activeChat?.isStory })}>
                    {selectedUser && selectedUser.profilePictureUrl ? (
                      <img className="avatar-img rounded-circle" src={selectedUser.profilePictureUrl} alt="avatar" />
                    ) : (
                      <img className="avatar-img rounded-circle" src={avatar} alt="default avatar" />
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0 mt-1">{`${selectedUser?.firstName || ''} ${selectedUser?.lastName || ''}`}</h6>
                    <div className="small text-secondary">
                      <FaCircle className={`text-${ status === 'offline' ? 'danger' : 'success'} me-1`} />
                      {status ===  'online' ? 'Online' : 'Offline'}
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
                      <li>
                        <DropdownItem>
                          <BsChatSquareText className="me-2 fw-icon" />
                          Mark as unread
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem>
                          <BsVolumeUp className="me-2 fw-icon" />
                          Muted
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem>
                          <BsArchive className="me-2 fw-icon" />
                          Archive
                        </DropdownItem>
                      </li>
                      <li className="dropdown-divider" />
                      <li>
                        <DropdownItem>
                          <BsFlag className="me-2 fw-icon" />
                          Report
                        </DropdownItem>
                      </li>
                    </DropdownMenu>
                  </Dropdown>
                  <a className="btn btn-secondary-soft-hover py-1 px-2" data-bs-toggle="collapse" onClick={toggleToastCollapse}>
                    <BsDashLg />
                  </a>
                  <button onClick={toggle} className="btn btn-secondary-soft-hover py-1 px-2" data-bs-dismiss="toast" aria-label="Close">
                    <FaXmark />
                  </button>
                </div>
              </div>
            </ToastHeader>
            <Collapse in={isOpenCollapseToast} className="toast-body">
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
                  {[...userMessages].reverse().map((message, index) => (
                    <UserMessage message={message} key={index} toUser={selectedUser} />
                  ))}
                  <AlwaysScrollToBottom />
                </SimplebarReactClient>
                <form onSubmit={handleSubmit(sendChatMessage)} className="mt-2">
                  <TextFormInput
                    className="mb-sm-0 mb-3"
                    name="newMessage"
                    control={control}
                    // rows={1}
                    placeholder="Type a message"
                    autoFocus
                    containerClassName="w-100"
                    style={{ fontSize: '1rem', border: '2px solid #ced4da', outline: 'none' }}
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
                {
                  isGifPickerVisible && (
                    <div className="gif-picker-container bg-white shadow-sm border rounded" style={{ position: 'absolute', bottom: '60px', right: '15px', zIndex: 10, maxWidth: '300px', maxHeight: '300px', overflow: 'hidden' }}>
                      <GifPicker onGifClick={handleGifClick} tenorApiKey="AIzaSyD1wsKDALKwa8_pRGvhHcENUGFLq5DWhfs" />
                    </div>
                    )
                }
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
        </ToastContainer>
      </div>
    </>
  )
}
export default Messaging
