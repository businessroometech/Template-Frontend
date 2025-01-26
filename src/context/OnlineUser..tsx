import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import makeApiRequest from '@/utils/apiServer';
interface OnlineUsersContextProps {
    onlineUsers: string[];
    fetchOnlineUsers: () => void;
}

const OnlineUsersContext = createContext<OnlineUsersContextProps | undefined>(undefined);

export const OnlineUsersProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const {user} = useAuthContext()
    const fetchOnlineUsers = async () => {
        
        if (!user.id) {
            console.error('No userId found in localStorage.');
            return;
        }

        try {
            const response = await makeApiRequest<{ data: any[] }>({
                method: 'POST',
                url: 'api/v1/auth/online-users',
                data: { userId: user?.id },
              })

            if (!response) {
                throw new Error('Network response was not ok');
            }

            console.log('Online users response:', response?.data);

            // Assuming `data.activeUsers` contains the list of online user IDs
            setOnlineUsers(response?.data?.onlineUsers);
        } catch (error) {
            console.error('Failed to fetch online users:', error);
        }
    };

    useEffect(() => {
        fetchOnlineUsers();

        // Polling every 1 minute to update the list of online users
        const interval = setInterval(fetchOnlineUsers, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <OnlineUsersContext.Provider value={{ onlineUsers, fetchOnlineUsers }}>
            {children}
        </OnlineUsersContext.Provider>
    );
};

export const useOnlineUsers = (): OnlineUsersContextProps => {
    const context = useContext(OnlineUsersContext);
    if (!context) {
        throw new Error('useOnlineUsers must be used within an OnlineUsersProvider');
    }
    return context;
};
