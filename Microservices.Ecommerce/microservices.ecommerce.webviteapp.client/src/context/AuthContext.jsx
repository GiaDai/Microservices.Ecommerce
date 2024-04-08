import { createContext, useContext, useState } from 'react';

// create a context
const AuthContext = createContext();

// Provider context
export const AuthProvider = ({ children }) => {
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