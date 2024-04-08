import { createContext, useContext, useState } from 'react';

// create a context
import { ReactNode } from 'react';

const AuthContext = createContext({});

// Provider context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {
        currentUser,
        setCurrentUser
    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
};

export const UserAuth = () => {
    return useContext(AuthContext);
}