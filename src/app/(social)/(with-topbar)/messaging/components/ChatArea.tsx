// import { Spinner } from 'react-bootstrap'
// import { useChatContext } from '@/context/useChatContext'
// import type { ChatMessageType, UserType } from '@/types/data'
// import { useAuthContext } from '@/context/useAuthContext'
// import { addOrSubtractMinutesFromDate } from '@/utils/date'
// import avatar from '@/assets/images/avatar/default avatar.png'
// import { yupResolver } from '@hookform/resolvers/yup'
// import clsx from 'clsx'
// import io from 'socket.io-client'
// import { useCallback, useEffect, useRef, useState } from 'react'
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   Dropdown,
//   DropdownDivider,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
// } from 'react-bootstrap'
// import { useForm } from 'react-hook-form'
// import { BsThreeDotsVertical, BsTrash } from 'react-icons/bs'
// import * as yup from 'yup'

// import TextFormInput from '@/components/form/TextFormInput'
// import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
// import { FaCheck, FaCheckDouble, FaPaperPlane } from 'react-icons/fa6'
// import makeApiRequest from '@/utils/apiServer'
// import debounce from 'lodash.debounce'

// // const socket = io('https://strengthholdings.com')

// const AlwaysScrollToBottom = () => {
//   const elementRef = useRef<HTMLDivElement>(null)
//   useEffect(() => {
//     if (elementRef?.current?.scrollIntoView) elementRef.current.scrollIntoView({ behavior: 'smooth' })
//   })
//   return <div ref={elementRef} />
// }

// const UserMessage = ({ message, toUser }: { message: ChatMessageType; toUser: UserType }) => {
//   const received = message.from.id === toUser.id
//   return (
//     <div className={clsx('d-flex mb-1', { 'justify-content-end text-end': received })}>
//       <div className="flex-shrink-0 avatar avatar-xs me-2">
//         {!received && <img className="avatar-img rounded-circle" src={message.from.avatar} alt="" />}
//       </div>
//       <div className="flex-grow-1">
//         <div className="w-100">
//           <div className={clsx('d-flex flex-column', received ? 'align-items-end' : 'align-items-start')}>
//             {message.image ? (
//               <div className="bg-light text-secondary p-2 px-3 rounded-2">
//                 <p className="small mb-0">{message.message}</p>
//                 <Card className="shadow-none p-2 border border-2 rounded mt-2">
//                   <img width={87} height={91} src={message.image} alt="image" />
//                 </Card>
//               </div>
//             ) : (
//               <div className={clsx('p-2 px-3 rounded-2', received ? 'bg-primary text-white' : 'bg-light text-secondary')}>{message.message}</div>
//             )}
//             {message.isRead ? (
//               <div className="d-flex my-2">
//                 <div className="small text-secondary">
//                   {message.sentOn.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
//                 </div>
//                 <div className="small ms-2">
//                   <FaCheckDouble className="text-info" />
//                 </div>
//               </div>
//             ) : message.isSend ? (
//               <div className="d-flex my-2">
//                 <div className="small text-secondary">
//                   {message.sentOn.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
//                 </div>
//                 <div className="small ms-2">
//                   <FaCheck />
//                 </div>
//               </div>
//             ) : (
//               <div className="small my-2">{message.sentOn.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const ChatArea = () => {
//   const { activeChat } = useChatContext()
//   const { user } = useAuthContext()
//   const [userMessages, setUserMessages] = useState<ChatMessageType[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   console.log("user".user.id)
//   console.log("activeChat",activeChat.personalDetails.id)
//   const messageSchema = yup.object({
//     newMessage: yup.string().required('Please enter message'),
//   })

//   const { reset, handleSubmit, control } = useForm({
//     resolver: yupResolver(messageSchema),
//   })

//   // Optimized function to fetch messages once when the active chat changes
//   const fetchMessages = useCallback(async () => {
//     if (!activeChat) return
//     setIsLoading(true)
//     try {
//       const response = await makeApiRequest<{ data: any[] }>({
//         method: 'POST',
//         url: 'api/v1/chat/get-messages-user-wise',
//         data: { senderId: user?.id, receiverId: activeChat.personalDetails.id, page: 1, limit: 100 },
//       })
//       setUserMessages(response.data)
//     } catch (error) {
//       console.error(error)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [activeChat, user])

//   // Fetch messages when the active chat changes
//   useEffect(() => {
//     if (activeChat) {
//       fetchMessages()
//     }
//   }, [activeChat, fetchMessages])

//   // Debounced function for sending messages
//   const sendChatMessage = debounce(async (values: { newMessage?: string }) => {
//     if (!values.newMessage || !activeChat) return
//     const newMessage: ChatMessageType = {
//       id: (userMessages.length + 1).toString(),
//       from: user.id,
//       to: activeChat.personalDetails.id,
//       message: values.newMessage,
//       sentOn: addOrSubtractMinutesFromDate(-0.1),
//       isSend: true,
//       isRead: false,
//     }

//     try {
//       await makeApiRequest<{ data: any[] }>({
//         method: 'POST',
//         url: 'api/v1/chat/send-message',
//         data: { senderId: user.id, receiverId: activeChat.personalDetails.id, message: values.newMessage },
//       })

//       // socket.emit('sendMessage', newMessage)
//       console.log('Message sent:', newMessage)
//       setUserMessages((prevMessages) => [...prevMessages, newMessage])
//       reset()
//     } catch (error) {
//       console.error(error)
//     }
//   }, 1000)

//   // Socket message handling
//   useEffect(() => {
//     if (activeChat) {
//       // socket.on('receiveMessage', (message: ChatMessageType) => {
//         setUserMessages((prevMessages) => [...prevMessages, message])
//       // })
//     }
//     // return () => {
//     //   socket.off('receiveMessage')
//     // }
//   }, [activeChat])

//   if (isLoading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center h-100">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     )
//   }

//   if (!activeChat) {
//     return (
//       <div className="d-flex justify-content-center align-items-center h-100">
//         <h5 className="text-secondary">Tap on a name to start chatting</h5>
//       </div>
//     )
//   }

//   const { firstName, lastName } = activeChat.personalDetails
//   const { profileImgUrl } = activeChat

//   return (
//     <Card className="card-chat rounded-start-lg-0 border-start-lg-0">
//       <CardBody className="h-100">
//         <div className="h-100">
//           <div className="d-sm-flex justify-content-between align-items-center">
//             <div className="d-flex mb-2 mb-sm-0">
//               <div className="flex-shrink-0 avatar me-2">
//                 <img className="avatar-img rounded-circle" src={profileImgUrl || avatar} alt={firstName} />
//               </div>
//               <div className="d-block flex-grow-1">
//                 <h6 className="mb-0 text-dark">{`${firstName} ${lastName}`}</h6>
//                 <div className="small text-secondary">{activeChat?.isOnline ? 'Online' : 'Offline'}</div>
//               </div>
//             </div>
//           </div>

//           <SimplebarReactClient>
//             {userMessages.map((message, index) => (
//               <UserMessage key={index} message={message} toUser={activeChat.personalDetails} />
//             ))}
//             <AlwaysScrollToBottom />
//           </SimplebarReactClient>
//         </div>
//       </CardBody>

//       <CardFooter className="border-0 pb-0 pt-2 bg-light">
//         <form onSubmit={handleSubmit(sendChatMessage)}>
//           <TextFormInput
//             placeholder="Type a message"
//             control={control}
//             name="newMessage"
//             autoFocus
//             maxLength={500}
//             autoComplete="off"
//           />
//         </form>
//       </CardFooter>
//     </Card>
//   )
// }

// export default ChatArea

// import { Spinner } from 'react-bootstrap'
// import { useChatContext } from '@/context/useChatContext'
// import type { ChatMessageType, UserType } from '@/types/data'
// import { useAuthContext } from '@/context/useAuthContext'
// import { addOrSubtractMinutesFromDate } from '@/utils/date'
// import { yupResolver } from '@hookform/resolvers/yup'
// import makeApiRequest from '@/utils/apiServer'

// import avatar from '@/assets/images/avatar/default avatar.png'
// import InfiniteScroll from 'react-infinite-scroll-component'
// import clsx from 'clsx'
// import { useCallback, useEffect, useRef, useState } from 'react'
// import { Button, Card, CardBody, CardFooter } from 'react-bootstrap'
// import { useForm } from 'react-hook-form'
// import { BsEmojiSmile } from 'react-icons/bs'
// import * as yup from 'yup'
// import debounce from 'lodash.debounce'
// import { io } from 'socket.io-client'
// import TextFormInput from '@/components/form/TextFormInput'
// import Picker from 'emoji-picker-react'
// // import { CloudFog } from 'lucide-react'

// const socket = io('http://3.101.12.130:5000/', {
//   transports: ['websocket'],
//   withCredentials: true,
//   reconnection: true,
//   reconnectionAttempts: 5,
//   timeout: 20000,
// })

// const UserMessage = ({ message, toUser, profile }: { message: ChatMessageType; toUser: UserType; profile: image }) => {
//   const received = message.senderId === toUser.id
//   return (
//     <div
//       className={clsx('d-flex mb-1', {
//         'justify-content-start': received,
//         'justify-content-end text-end': !received,
//       })}>
//       {received && (
//         <div className="flex-shrink-0 avatar avatar-xs me-2">
//           <img className="avatar-img rounded-circle" src={profile ? profile : avatar} alt="User Avatar" />
//         </div>
//       )}
//       <div className="flex-grow-1">
//         <div className={clsx('d-flex flex-column', received ? 'align-items-start' : 'align-items-end')}>
//           <div className={clsx('p-2 px-3 rounded-2', received ? 'bg-white text-secondary' : 'bg-primary text-white')}>
//             <p className="small mb-0">{message.content}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const ChatArea = () => {
//   const { activeChat } = useChatContext()
//   const { user } = useAuthContext()
//   const [userMessages, setUserMessages] = useState<ChatMessageType[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false)
//   const [hasMore, setHasMore] = useState(true)
//   const [page, setPage] = useState(1)
//   const messageEndRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
//     }
//   }, [userMessages])

//   useEffect(() => {
//     socket.emit('joinRoom', user.id)
//     socket.on('connect', () => {
//       console.log('Socket connected:', socket.id)
//     })

//     socket.on('connect_error', (err) => {
//       console.error('Connection Error:', err.message)
//     })

//     socket.on('newMessage', (message) => {
//       // console.log('New message:', message)
//       setUserMessages((prevMessages) => [message, ...prevMessages])
//       // console.log(userMessages)
//     })

//     return () => {
//       socket.off('connect_error')
//       socket.off('newMessage')
//     }
//   }, [userMessages])

//   const messageSchema = yup.object({
//     newMessage: yup.string().required('Please enter a message'),
//   })

//   const { reset, handleSubmit, control, setValue, getValues } = useForm({
//     resolver: yupResolver(messageSchema),
//   })

//   const fetchMessages = useCallback(async () => {
//     if (!activeChat) return
//     setIsLoading(true)
//     try {
//       const response = await makeApiRequest<{ data: any[] }>({
//         method: 'POST',
//         url: 'api/v1/chat/get-messages-user-wise',
//         data: {
//           senderId: user?.id,
//           receiverId: activeChat.personalDetails.id,
//           page: page,
//           limit: 50,
//         },
//       })

//       if (response?.data?.messages) {
//         // console.log('Messages:', response.data.messages)
//         if(response?.data?.messages.total === 0){
//           return (
//             <div  className="d-flex justify-content-center align-items-center h-100">
//               <h5 className="text-secondary">No messages to display</h5>
//             </div>
//           )
//         }
//         const sortedMessages = response.data.messages.sort((a, b) => new Date(a.sentOn).getTime() - new Date(b.sentOn).getTime())
//         setUserMessages(sortedMessages)
//       }
//     } catch (error) {
//       console.error(error)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [activeChat, page])

//   // Function to mark messages as read
// // Function to mark specific messages as read using message IDs
// // const markMessagesAsRead = useCallback(async () => {
// //   if (!activeChat) return;
// //   // console.log('Marking messages as read', userMessages);
// // //  console.log('userMessages', userMessages)
// //   // Filter unread messages by the current user
// //   const unreadMessageIds = userMessages
// //     .filter((message) => !message.isRead && message.receiverId === user?.id)
// //     .map((message) => message.id);
// //     //  console.log('unreadMessageIds', message.receiverId)
// //     // console.log('same',user.id)

// //   if (unreadMessageIds.length === 0) return;

// //   try {
// //     await makeApiRequest({
// //       method: 'POST',
// //       url: 'api/v1/chat/mark-as-read',
// //       data: {
// //         messageIds: unreadMessageIds, // Pass the list of message IDs
// //       },
// //     });

// //     console.log('Messages marked as read');

// //     // Optimistically update the local state
// //     setUserMessages((prevMessages) =>
// //       prevMessages.map((message) =>
// //         unreadMessageIds.includes(message.id)
// //           ? { ...message, isRead: true }
// //           : message
// //       )
// //     );
// //   } catch (error) {
// //     console.error('Error marking messages as read:', error);
// //   }
// // }, [activeChat]);

//   useEffect(() => {
//     if (activeChat) {
//       fetchMessages()
//       // markMessagesAsRead()
//     }
//   }, [activeChat, fetchMessages])
//   // }, [activeChat, fetchMessages, markMessagesAsRead])

//   const loadMore = () => {
//     if (!hasMore) return
//     setPage((prevPage) => prevPage + 1)
//   }

//   const sendChatMessage = debounce(async (values: { newMessage?: string }) => {
//     if (!values.newMessage || !activeChat) return
//     const newMessage: ChatMessageType = {
//       id: (userMessages.length + 1).toString(),
//       senderId: user.id,
//       receiverId: activeChat.personalDetails.id,
//       content: values.newMessage,
//       sentOn: addOrSubtractMinutesFromDate(-0.1),
//       isSend: true,
//       isRead: false,
//     }

//     try {
//       await makeApiRequest({
//         method: 'POST',
//         url: 'api/v1/chat/send-message',
//         data: { senderId: user.id, receiverId: activeChat.personalDetails.id, content: values.newMessage },
//       })

//       setUserMessages((prevMessages) => [newMessage, ...prevMessages])
//       reset()
//     } catch (error) {
//       console.error(error)
//     }
//   }, 1000)

//   const handleEmojiClick = (emoji: any) => {
//     const currentMessage = getValues('newMessage') || ''
//     setValue('newMessage', currentMessage + emoji.emoji)
//     setShowEmojiPicker(false)
//   }

//   if (!activeChat) {
//     return (
//       <div className="d-flex justify-content-center align-items-center h-100">
//         <h5 className="text-secondary">Tap on a name to start chatting</h5>
//       </div>
//     )
//   }

//   if (isLoading && userMessages.length === 0) {
//     return (
//       <div className="d-flex justify-content-center align-items-center h-100">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     )
//   }

//   const { firstName, lastName } = activeChat.personalDetails
//   const { profileImgUrl } = activeChat

//   return (
//     <Card className="card-chat rounded-start-lg-0 border-start-lg-0" style={{ minHeight: '500px' }}>
//       <CardBody className="h-100 d-flex flex-column" style={{ padding: 0 }}>
//         <div className="d-sm-flex justify-content-between align-items-center p-3 border-bottom bg-white" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
//           <div className="d-flex mb-2 mb-sm-0">
//             <div className="flex-shrink-0 avatar me-2">
//               <img className="avatar-img rounded-circle" src={profileImgUrl || avatar} alt={firstName} />
//             </div>
//             <div className="d-block flex-grow-1">
//               <h6 className="mb-0 text-dark">{`${firstName} ${lastName}`}</h6>
//               <div className="small text-secondary">{activeChat?.isOnline ? 'Online' : 'Offline'}</div>
//             </div>
//           </div>
//         </div>

//         <div className="flex-grow-1 message-box" style={{ overflowY: 'auto', padding: '15px', background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)' }}>
//           <InfiniteScroll
//             dataLength={userMessages.length}
//             next={loadMore}
//             hasMore={hasMore}
//             inverse={true}
//             loader={
//               <div className="d-flex justify-content-center align-items-center">
//                 <Spinner animation="border" variant="primary" />
//               </div>
//             }>
//             {[...userMessages].reverse().map((message, index) => (
//               <UserMessage key={index} message={message} toUser={activeChat.personalDetails} profile={profileImgUrl} />
//             ))}
//           </InfiniteScroll>
//           <div ref={messageEndRef} />
//         </div>
//       </CardBody>

//       <CardFooter className="border-0 pb-0 pt-2 bg-light" style={{ flexShrink: 0, position: 'relative', bottom: 0, borderTop: '2px solid #ccc', background: '#f8f9fa', width: '100%' }}>
//         <form onSubmit={handleSubmit(sendChatMessage)} className="d-flex align-items-center" style={{ marginBottom: '1rem', width: '100%' }}>
//           <TextFormInput
//             placeholder="Type a message"
//             control={control}
//             name="newMessage"
//             autoFocus
//             maxLength={500}
//             autoComplete="off"
//             className="flex-grow-1 px-4 py-3 rounded-3 border shadow-sm"
//             style={{ height: '50px', fontSize: '1.4rem', border: '2px solid #ccc', outline: 'none', width: '100%' }}
//           />
//           <Button variant="outline-secondary" className="ms-2" onClick={() => setShowEmojiPicker((prev) => !prev)} type="button" style={{ height: '50px', width: '50px', padding: '0.5rem', margin: '0.5rem', borderRadius: '50%', border: '2px solid #ccc', backgroundColor: 'transparent', cursor: 'pointer' }}>
//             <BsEmojiSmile size={24} />
//           </Button>
//           <Button type="submit" variant="primary" disabled={isLoading} style={{ height: '50px', padding: '0.5rem 1rem', borderRadius: '50px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
//             Send
//           </Button>
//         </form>
//         {showEmojiPicker && (
//           <div className="emoji-picker-container bg-white shadow-sm border rounded" style={{ position: 'absolute', bottom: '60px', right: '15px', zIndex: 10, maxWidth: '300px', maxHeight: '300px', overflow: 'hidden' }}>
//             <Picker onEmojiClick={handleEmojiClick} />
//           </div>
//         )}
//       </CardFooter>
//     </Card>
//   )
// }

// export default ChatArea

import { Spinner } from 'react-bootstrap'
import { useChatContext } from '@/context/useChatContext'
import type { ChatMessageType, UserType } from '@/types/data'
import { useAuthContext } from '@/context/useAuthContext'
import GifPicker from 'gif-picker-react'
import { addOrSubtractMinutesFromDate } from '@/utils/date'
import { yupResolver } from '@hookform/resolvers/yup'
import makeApiRequest from '@/utils/apiServer'

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
import { io } from 'socket.io-client'
import TextFormInput from '@/components/form/TextFormInput'
import Picker from 'emoji-picker-react'
import { set } from 'date-fns'

const socket = io('http://54.177.193.30:5000/', {
  // path: "/socket.io",
  transports: ['websocket'],
})

const UserMessage = ({ message, toUser, profile }: { message: ChatMessageType; toUser: UserType; profile: string }) => {
  const received = message.receiverId === toUser.id
  const gifPattern = /GIF:\[([^\]]+)\]/
  const match = message.content.match(gifPattern)

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
              // If the message content contains the GIF pattern
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
                {message.createdAt?.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
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
    socket.on('connect', () => {
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
          limit: 50,
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

  return (
    <Card className="card-chat rounded-0 border-0 shadow-lg" style={{ minHeight: '595px', maxWidth: '800px', margin: '0 auto', borderRadius: '15px' }}>
  <CardBody className="d-flex flex-column h-100 p-0">
    {/* Header */}
    <div className="d-flex align-items-center justify-content-between p-3 border-bottom bg-white sticky-top" style={{ top: 0, zIndex: 1, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
      <div className="d-flex align-items-center">
        <img className="avatar-img rounded-circle me-2" src={profileImgUrl || avatar} alt={firstName} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
        <div>
          <h6 className="mb-0 text-dark" style={{ fontWeight: '600' }}>{`${firstName} ${lastName}`}</h6>
          <small className="text-secondary" style={{ fontSize: '0.85rem' }}>{activeChat?.isOnline ? 'Offline' : 'Online'}</small>
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
