
import { createContext, useContext, useEffect, useState } from 'react'
import makeApiRequest from '@/utils/apiServer'
import { getUserById } from '@/helpers/data'
import type { ChatContextType, ChatOffcanvasStatesType, OffcanvasControlType } from '@/types/context'
import type { UserType } from '@/types/data'
import type { ChildrenType } from '@/types/component'

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const useChatContext = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext can only be used within ChatProvider')
  }
  return context
}

export const ChatProvider = ({ children }: ChildrenType) => {
  const [activeChat, setActiveChat] = useState(null)
  const [offcanvasStates, setOffcanvasStates] = useState<ChatOffcanvasStatesType>({
    showChatList: false,
    showMessageToast: false,
  })

  const changeActiveChat = async (userId) => {

    if (userId == 102) {
      return;
    }
  
    try {
      const res = await makeApiRequest<{ data: any[] }>({
        method: 'POST',
        url: 'api/v1/auth/get-user-Profile',
        data: { userId },
      });
      setActiveChat(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const toggleChatList: OffcanvasControlType['toggle'] = () => {
    setOffcanvasStates({ ...offcanvasStates, showChatList: !offcanvasStates.showChatList })
  }

  const toggleMessageToast: OffcanvasControlType['toggle'] = () => {
    setOffcanvasStates({ ...offcanvasStates, showMessageToast: !offcanvasStates.showMessageToast })
  }

  const chatList: ChatContextType['chatList'] = {
    open: offcanvasStates.showChatList,
    toggle: toggleChatList,
  }

  const chatToast: ChatContextType['chatToast'] = {
    open: offcanvasStates.showMessageToast,
    toggle: toggleMessageToast,
  }

  useEffect(() => {
    changeActiveChat('102')
  }, [])

  return (
    <ChatContext.Provider
      value={{
        activeChat,
        changeActiveChat,
        chatList,
        chatToast,
      }}>
      {children}
    </ChatContext.Provider>
  )
}
