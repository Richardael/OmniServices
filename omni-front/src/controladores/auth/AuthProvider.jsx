import React, { useContext, createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    getAccessToken: () => {},
    saveUser: (userData) => {},
    rol: "", // Agregar el campo "rol" al contexto
});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState("");

    function getAccessToken() {
        return accessToken;
    }

    function saveUser(userData) {
        setAccessToken(userData.accessToken);
        localStorage.setItem("accessToken", JSON.stringify(userData.accessToken));
        setIsAuthenticated(true);
        setRol(userData.rol); // Agregar esta línea para guardar el rol
    }

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");

        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, getAccessToken, saveUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
