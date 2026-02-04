// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import authService from '../services/authService';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  // Get the current user from the service (which reads from localStorage)
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  // The value provided to the rest of the app
  const value = {
    currentUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};