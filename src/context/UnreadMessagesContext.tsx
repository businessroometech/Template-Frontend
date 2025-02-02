import { createContext, useContext, useState } from "react";
import { LIVE_URL } from "@/utils/api";
// import { useAuthContext } from "./useAuthContext";

const UnreadMessagesContext = createContext<{
  unreadMessages: any[];
  fetchUnreadMessages: (receiverId: string) => Promise<void>;
}>({
  unreadMessages: [],
  fetchUnreadMessages: async () => {},
});

export const UnreadMessagesProvider = ({ children }: { children: React.ReactNode }) => {
    // const { user } = useAuthContext();
  const [unreadMessages, setUnreadMessages] = useState<any[]>([]);

  const fetchUnreadMessages = async (receiverId: string) => {
    try {
      const response = await fetch(`${LIVE_URL}/api/v1/chat/get-messages-unread`, {
        method: "POST", // Change to "GET" if your API requires it
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiverId }), // Sending receiverId in the request body
      });
    //   console.log("___Response___", response);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
    //   console.log("___beforeData___", data.data);
      const senderIds = data.data.result.map((id: any) => id.senderId);
    //   console.log("___senderIds___", senderIds);
    setUnreadMessages(senderIds); // Store unread messages in state with senderId mapped
    // console.log("___Data___", senderIds);
    // console.log("___Data___", unreadMessages);
    } catch (error) {
      console.error("Failed to fetch unread messages:", error);
    }
  };

  return (
    <UnreadMessagesContext.Provider value={{ unreadMessages, fetchUnreadMessages }}>
      {children}
    </UnreadMessagesContext.Provider>
  );
};

// Custom Hook to use Unread Messages Context
export const useUnreadMessages = () => useContext(UnreadMessagesContext);
