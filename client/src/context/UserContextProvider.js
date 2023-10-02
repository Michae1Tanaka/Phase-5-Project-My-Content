import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState([]);

  const value = {
    user,
    setUser,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    content,
    setContent,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
