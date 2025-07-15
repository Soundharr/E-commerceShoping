// src/context/UserContext.js
import React, { createContext, useState } from "react";

// Create the UserContext
export const UserContext = createContext();

// Create a provider component to wrap your app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
