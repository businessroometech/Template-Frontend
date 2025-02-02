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
      const senderIds = data?.data?.result?.map((msg: any) => msg.senderId) || [];

      if (senderIds.length > 0) {
        const uniqueSenderIds = senderIds.filter((id, index, self) => self.indexOf(id) === index);
        setUnreadMessages(uniqueSenderIds.map(String));
      }
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
