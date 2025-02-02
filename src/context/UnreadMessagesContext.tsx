import { createContext, useContext, useEffect, useState } from "react";
import { LIVE_URL } from "@/utils/api";
import { useAuthContext } from "./useAuthContext";

const UnreadMessagesContext = createContext<{
  unreadMessages: string[]; // Define a more specific type
  fetchUnreadMessages: () => Promise<void>;
}>({
  unreadMessages: [],
  fetchUnreadMessages: async () => {},
});

export const UnreadMessagesProvider = ({ children }: { children: React.ReactNode }) => {
  const [unreadMessages, setUnreadMessages] = useState<string[]>([]);
  const { user } = useAuthContext();

  const fetchUnreadMessages = async () => {
    if (!user?.id) return; // Prevent API call if user is not available

    try {
      const response = await fetch(`${LIVE_URL}/api/v1/chat/get-messages-unread`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiverId: user.id }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log("--------data----------",data);
      const senderData = data?.data?.result?.map((msg: any) => ({
        senderId: msg.senderId,
        messageCount: msg.messageCount,
      })) || [];
      
      // Remove duplicates and merge counts if necessary
      const uniqueSenderData = senderData.reduce((acc, current) => {
        const existing = acc.find((item) => item.senderId === current.senderId);
        if (existing) {
          existing.messageCount += current.messageCount; // Sum message count if sender already exists
        } else {
          acc.push(current);
        }
        return acc;
      }, [] as { senderId: string; messageCount: number }[]);
      
      setUnreadMessages(uniqueSenderData);
    } catch (error) {
      console.error("Failed to fetch unread messages:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUnreadMessages();
    }
  }, [user?.id]); // Fetch messages when user ID changes

  return (
    <UnreadMessagesContext.Provider value={{ unreadMessages, fetchUnreadMessages }}>
      {children}
    </UnreadMessagesContext.Provider>
  );
};

// Custom Hook to use Unread Messages Context
export const useUnreadMessages = () => useContext(UnreadMessagesContext);
