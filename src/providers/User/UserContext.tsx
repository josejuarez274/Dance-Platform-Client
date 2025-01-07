import React, { createContext } from "react";

import { User } from "api/types/UserTypes";

interface UserContextValue {
    user: User;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export default UserContext;