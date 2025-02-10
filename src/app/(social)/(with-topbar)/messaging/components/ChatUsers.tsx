import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
import { useChatContext } from '@/context/useChatContext'
import type { UserType } from '@/types/data'
import avatar from '@/assets/images/avatar/default avatar.png'
import clsx from 'clsx'
import { useAuthContext } from '@/context/useAuthContext'
import { useUnreadMessages } from '@/context/UnreadMessagesContext'
import { useOnlineUsers } from '@/context/OnlineUser.'
import { useState, useEffect } from 'react'
//import { io } from 'socket.io-client'
import { Card, Spinner } from 'react-bootstrap'
// import { useLastMessage } from '@/context/LastMesageContext'
import { LIVE_URL } from '@/utils/api'
import { BsSearch } from 'react-icons/bs'
// import { useContext } from 'react'


const ChatItem = ({ userId, connectionId,lastMessage ,profilePictureUrl, firstName, lastName, isStory }: UserType) => {
  const { changeActiveChat, activeChat } = useChatContext();
  const { onlineUsers } = useOnlineUsers();
  const { user } = useAuthContext();
  // const { fetchLastMessage, lastMessage } = useLastMessage();
  const { unreadMessages } = useUnreadMessages();
  // console.log(lastMessage)
  // const [done, setDone] = useState(false);

  // useEffect(() => {
  //   if (!done && userId) {
  //     fetchLastMessage(userId);
  //     setDone(true); 
  //   }
  // }, [userId, fetchLastMessage, done]);
  // const content = lastMessage?.content || "No messages yet";
  const status = onlineUsers?.includes(userId) ? "online" : "offline";
  const unreadMessageData = unreadMessages.find((msg) => msg.senderId === userId);
  const unreadCount = unreadMessageData?.messageCount || 0;
  const handleChange = async () => {
    try {
      changeActiveChat(userId);
      await fetch(`${LIVE_URL}/api/v1/chat/mark-as-read`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderId: userId, receiverId: user?.id }),
      });
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  };

  return (
    <li data-bs-dismiss="offcanvas" onClick={handleChange}>
      <div
        className={clsx("nav-link text-start px-3 py-2 rounded", {
          active: activeChat?.id === connectionId,
        })}
        id="chat-1-tab"
        data-bs-toggle="pill"
        role="tab"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "background 0.2s ease-in-out",
        }}
      >
        <div
          className={clsx("flex-shrink-0 avatar position-relative", {
            "status-online": status === "online",
            "status-offline": status === "offline",
            "avatar-story": isStory,
          })}
          style={{ width: "50px", height: "50px" }}
        >
          <img
            className="avatar-img rounded-circle"
            src={profilePictureUrl || avatar}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          className="flex-grow-1"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ maxWidth: "180px" }}>
            <h6 className="mb-0 mt-1 text-dark" style={{ fontWeight: "500" }}>
              {`${firstName} ${lastName}`}
            </h6>
            <div className="small text-dark" style={{ color: "#333" }}>
            {"No message yet"}  {/* {lastMessage.length > 25 ? `${lastMessage.substring(0, 25)}...` : lastMessage} */}
            </div>
          </div>
          {unreadCount > 0 && (
            <span
              className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
              style={{
                background: "#FF3B30",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "4px 8px",
                minWidth: "22px",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                marginLeft: "auto",
              }}
            >
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </li>
  );
};



const ChatUsers = ({ chats }: { chats: UserType[] }) => {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)
  // const { lastMessages } = useLastMessage()
  // console.log('lastMessage', lastMessages);


  useEffect(() => {
    if (chats.length > 0) {
      // console.log(lastMessages);
      // const updatedChats = chats.map(chat => {
        // const lastMessage = lastMessages[chat.userId]; // Accessing object property
      //   return {
      //     ...chat,
      //     lastMessage: lastMessage ? lastMessage : 'No message yet'
      //   };
      // });
      setUsers(chats);
      setLoading(false);
    }
  }, [chats]);

  const search = (text: string) => {
    setUsers(
      text
        ? chats.filter((u) => {
            const name = `${u.firstName} ${u.lastName}`.toLowerCase()
            return name.includes(text.toLowerCase())
          })
        : [...chats]
    )
  }

  return (
    <Card className="card-chat-list rounded-end-lg-0 card-body border-end-lg-0 rounded-top-0 overflow-hidden">
      <form className="position-relative">
        <input
          className="form-control py-2"
          type="search"
          placeholder="Search for chats"
          aria-label="Search"
          onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => search(e.target.value)}
        />
        {/* <button className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="button">
          <BsSearch className="fs-5" />
        </button> */}
      </form>
      <div className="mt-4 h-100">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <SimplebarReactClient className="chat-tab-list custom-scrollbar">
            <ul className="nav flex-column nav-pills nav-pills-soft">
              {users.map((chat) => (
                // console.log(chat);
                <ChatItem {...chat} key={chat.connectionId} />
              ))}
            </ul>
          </SimplebarReactClient>
        )}
      </div>
    </Card>
  )
}

export default ChatUsers;
