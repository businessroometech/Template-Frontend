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

import { Spinner } from 'react-bootstrap';
import { useChatContext } from '@/context/useChatContext';
import type { ChatMessageType, UserType } from '@/types/data';
import { useAuthContext } from '@/context/useAuthContext';
import { addOrSubtractMinutesFromDate } from '@/utils/date';
import { yupResolver } from '@hookform/resolvers/yup';
import makeApiRequest from '@/utils/apiServer';
import avatar from '@/assets/images/avatar/default avatar.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, CardFooter } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { BsEmojiSmile } from 'react-icons/bs';
import * as yup from 'yup';
import debounce from 'lodash.debounce';
import { io } from 'socket.io-client';
import TextFormInput from '@/components/form/TextFormInput';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import Picker from 'emoji-picker-react';

const socket = io('http://3.101.12.130:5000/', {
  transports: ['websocket'],
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 20000, // 20 seconds
});

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (elementRef?.current?.scrollIntoView) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  return <div ref={elementRef} />;
};

const UserMessage = ({ message, toUser }: { message: ChatMessageType; toUser: UserType }) => {
  const received = message.senderId === toUser.id;

  return (
    <div
      className={clsx('d-flex mb-1', {
        'justify-content-start': received,
        'justify-content-end text-end': !received,
      })}
    >
      {received && (
        <div className="flex-shrink-0 avatar avatar-xs me-2">
          <img className="avatar-img rounded-circle" src={avatar} alt="User Avatar" />
        </div>
      )}
      <div className="flex-grow-1">
        <div
          className={clsx(
            'd-flex flex-column',
            received ? 'align-items-start' : 'align-items-end'
          )}
        >
          <div
            className={clsx(
              'p-2 px-3 rounded-2',
              received ? 'bg-light text-secondary' : 'bg-primary text-white'
            )}
          >
            <p className="small mb-0">{message.content}</p>
          </div>
        </div>
      </div>
      {!received && (
        <div className="flex-shrink-0 avatar avatar-xs ms-2">
          <img className="avatar-img rounded-circle" src={avatar} alt="User Avatar" />
        </div>
      )}
    </div>
  );
};

const ChatArea = () => {
  const { activeChat } = useChatContext();
  const { user } = useAuthContext();
  const [userMessages, setUserMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [userMessages]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id); // Logs the unique socket ID
    });
  
    socket.on('connect_error', (err) => {
      console.error('Connection Error:', err.message);
    });

    socket.on('newMessage', (message) => {
      setUserMessages((prevMessages) => [...prevMessages, message]);
      console.log(userMessages)
    });

    return () => {
      socket.off('connect_error');
      socket.off('newMessage');
    };
  }, [activeChat]);

  const messageSchema = yup.object({
    newMessage: yup.string().required('Please enter a message'),
  });

  const { reset, handleSubmit, control, setValue, getValues } = useForm({
    resolver: yupResolver(messageSchema),
  });

  const fetchMessages = useCallback(async () => {
    if (!activeChat) return;
    setIsLoading(true);
    try {
      const response = await makeApiRequest<{ data: any[] }>({
        method: 'POST',
        url: 'api/v1/chat/get-messages-user-wise',
        data: {
          senderId: user?.id,
          receiverId: activeChat.personalDetails.id,
          page: 1,
          limit: 10,
        },
      });
      setUserMessages(response.data.messages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [activeChat, user]);

  useEffect(() => {
    if (activeChat) {
      fetchMessages();
    }
  }, [activeChat, fetchMessages]);

  const sendChatMessage = debounce(async (values: { newMessage?: string }) => {
    if (!values.newMessage || !activeChat) return;
    const newMessage: ChatMessageType = {
      id: (userMessages.length + 1).toString(),
      senderId: user.id,
      receiverId: activeChat.personalDetails.id,
      content: values.newMessage,
      sentOn: addOrSubtractMinutesFromDate(-0.1),
      isSend: true,
      isRead: false,
    };

    try {
      await makeApiRequest({
        method: 'POST',
        url: 'api/v1/chat/send-message',
        data: { senderId: user.id, receiverId: activeChat.personalDetails.id, content: values.newMessage },
      });

      setUserMessages((prevMessages) => [...prevMessages, newMessage]);
      reset();
    } catch (error) {
      console.error(error);
    }
  }, 1000);

  const handleEmojiClick = (emoji: any) => {
    const currentMessage = getValues('newMessage') || '';
    setValue('newMessage', currentMessage + emoji.emoji);
    setShowEmojiPicker(false);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!activeChat) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <h5 className="text-secondary">Tap on a name to start chatting</h5>
      </div>
    );
  }

  const { firstName, lastName } = activeChat.personalDetails;
  const { profileImgUrl } = activeChat;

  return (
    <Card className="card-chat rounded-start-lg-0 border-start-lg-0">
      <CardBody className="h-100 d-flex flex-column">
        <div className="d-sm-flex justify-content-between align-items-center mb-3">
          <div className="d-flex mb-2 mb-sm-0">
            <div className="flex-shrink-0 avatar me-2">
              <img className="avatar-img rounded-circle" src={profileImgUrl || avatar} alt={firstName} />
            </div>
            <div className="d-block flex-grow-1">
              <h6 className="mb-0 text-dark">{`${firstName} ${lastName}`}</h6>
              <div className="small text-secondary">{activeChat?.isOnline ? 'Online' : 'Offline'}</div>
            </div>
          </div>
        </div>

        <SimplebarReactClient className="flex-grow-1 message-box">
          {userMessages.map((message, index) => (
            <UserMessage key={index} message={message} toUser={activeChat.personalDetails} />
          ))}
          <div ref={messageEndRef} />
        </SimplebarReactClient>
      </CardBody>

      <CardFooter className="border-0 pb-0 pt-2 bg-light">
        <form onSubmit={handleSubmit(sendChatMessage)} className="d-flex align-items-center">
          <TextFormInput
            placeholder="Type a message"
            control={control}
            name="newMessage"
            autoFocus
            maxLength={500}
            autoComplete="off"
            className="flex-grow-1 me-2"
          />
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            type="button"
          >
            <BsEmojiSmile />
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            Send
          </Button>
        </form>

        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ChatArea;

const styles = `
.card-chat .card-body {
  height: calc(100% - 150px); 
  overflow-y: auto;
}

.card-chat .card-footer {
  position: relative;
  bottom: 0;
}

.emoji-picker-container {
  position: absolute;
  bottom: 60px;
  right: 15px;
  z-index: 10;
}
`;


