import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const authKey = "authToken";

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem(authKey)

        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const updateToken = (newToken: string | null) => {
        setToken(newToken);

        if (newToken) {
            localStorage.setItem(authKey, newToken);
        } else {
            localStorage.removeItem(authKey);
        }
    }

    return (
        <AuthContext.Provider value={{ token, setToken: updateToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;