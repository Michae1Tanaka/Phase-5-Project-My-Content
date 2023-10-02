import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    user,
    setUser,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
