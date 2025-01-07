import React, { useState, useEffect } from "react";

import UserContext from "providers/User/UserContext";
import { User } from "api/types/UserTypes";

const userKey = "user";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem(userKey);

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const updateUser = (user: User | null) => {
        setUser(user);

        if (user) {
            localStorage.setItem(userKey, JSON.stringify(user));
        } else {
            localStorage.removeItem(userKey);
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser: updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;