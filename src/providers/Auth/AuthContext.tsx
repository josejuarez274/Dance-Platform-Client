import React, { createContext } from "react";

interface AuthContextValue {
    token: string | null;
    setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(null);

export default AuthContext;