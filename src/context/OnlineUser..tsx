import React, { createContext, useContext, useEffect, useState } from 'react';

interface OnlineUsersContextProps {
    onlineUsers: string[];
    fetchOnlineUsers: () => void;
}

const OnlineUsersContext = createContext<OnlineUsersContextProps | undefined>(undefined);

export const OnlineUsersProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    const fetchOnlineUsers = async () => {
        try {
            const response = await fetch('http://54.177.193.30:5000/api/v1/auth/online-users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //  console.log('response', response)
            const data = await response.json();
            console.log('data', data)
            setOnlineUsers(data.onlineUsers); // Adjust key based on API response
        } catch (error) {
            console.error('Failed to fetch online users:', error);
        }
    };

    useEffect(() => {
        fetchOnlineUsers();

        // Polling every 1 minute for updated online status
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
