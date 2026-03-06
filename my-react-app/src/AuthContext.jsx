import { create, useState, useContext, createContext } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };
    const logout = () => {
        localStorage.setItem('token');
        setIsLoggedIn(false);
    };
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
};