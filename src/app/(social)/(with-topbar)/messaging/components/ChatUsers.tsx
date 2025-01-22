import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
import { useChatContext } from '@/context/useChatContext'
import type { UserType } from '@/types/data'
import avatar from '@/assets/images/avatar/default avatar.png'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { Card, Spinner } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'


const ChatItem = ({ userId,connectionId, profilePictureUrl, lastMessage, firstName, lastName, status='online', isStory }: UserType) => {
  const { changeActiveChat, activeChat } = useChatContext()
  const socket = io('http://3.101.12.130:5000',{ transports: ["websocket",'polling'],withCredentials: true});
  const handleChange = () => {
    changeActiveChat(userId)
    socket.emit('joinRoom', userId);
  }
  return (
    <li data-bs-dismiss="offcanvas" onClick={()=>handleChange()
    }>
      <div className={clsx('nav-link text-start', { active: activeChat?.id === connectionId })} id="chat-1-tab" data-bs-toggle="pill" role="tab" >
        <div className="d-flex">
          <div className={clsx('flex-shrink-0 avatar me-2', status === 'online' ? 'status-online' : 'status-offline', { 'avatar-story': isStory })}>
            <img className="avatar-img rounded-circle" src={profilePictureUrl || avatar} alt="" />
          </div>
          <div className="flex-grow-1 d-block">
            <h6 className="mb-0 mt-1">{`${firstName} ${lastName}`}</h6>
            <div className="small text-secondary">{lastMessage}</div>
          </div>
        </div>
      </div>
    </li>
  )
}

const ChatUsers = ({ chats }: { chats: UserType[] }) => {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (chats.length > 0) {
      setUsers([...chats])
      setLoading(false)
    }
  }, [chats])

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
        <button className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="button">
          <BsSearch className="fs-5" />
        </button>
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
                <ChatItem {...chat} key={chat.connectionId} />
              ))}
            </ul>
          </SimplebarReactClient>
        )}
      </div>
    </Card>
  )
}

export default ChatUsers
