import React, { createContext, useContext, useEffect, useState } from 'react';
import makeApiRequest from '@/utils/apiServer';
import { useAuthContext } from './useAuthContext';

interface Message {
    id: string;
    message: string;
}

interface LastMessageContextProps {
    lastMessages: { [receiverId: string]: Message | null };
    fetchLastMessage: (receiverId: string) => void;
}

const LastMessageContext = createContext<LastMessageContextProps | undefined>(undefined);

export const LastMessageProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [lastMessages, setLastMessages] = useState<{ [receiverId: string]: Message | null }>(() => {
        const savedMessages = localStorage.getItem('lastMessages');
        return savedMessages ? JSON.parse(savedMessages) : {};
    });
    const { user } = useAuthContext();

    const fetchLastMessage = async (receiverId: string) => {
        if (!user?.id) {
            console.error('No userId found.');
            return;
        }
        console.log('Fetching last message for receiver:', receiverId);
        try {
            const response = await makeApiRequest<{ data: { messages: { content: string }[] } }>({
                method: 'POST',
                url: 'api/v1/chat/get-messages-user-wise',
                data: {
                    senderId: user.id,
                    receiverId: receiverId,
                    page: 1,
                    limit: 1,
                },
            });
            console.log('Last message response:', response);
            const message = response?.data?.messages[0]?.content;
            setLastMessages(prevMessages => {
                const updatedMessages = {
                    ...prevMessages,
                    [receiverId]: message,
                };
                localStorage.setItem('lastMessages', JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        } catch (error) {
            console.error('Error fetching last message:', error);
        }
    };

    useEffect(() => {
        const savedMessages = localStorage.getItem('lastMessages');
        if (savedMessages) {
            setLastMessages(JSON.parse(savedMessages));
        }
    }, []);

    return (
        <LastMessageContext.Provider value={{ lastMessages, fetchLastMessage }}>
            {children}
        </LastMessageContext.Provider>
    );
};

export const useLastMessage = (): LastMessageContextProps => {
    const context = useContext(LastMessageContext);
    if (!context) {
        throw new Error('useLastMessage must be used within a LastMessageProvider');
    }
    return context;
};