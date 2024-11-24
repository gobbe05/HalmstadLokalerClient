// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import register from "./register";
import initializeAuth from "./initializeAuth";

interface AuthContextType {
  isAuthenticated: boolean;
  authId: string | undefined,
  isLoading: boolean,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (username: string, password: string) => Promise<number>;
  register: (email: string, username: string, password: string, confirmPassword: string) => Promise<number | Error>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authId, setAuthId] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication status on initial load
  useEffect(() => {
    initializeAuth(setIsAuthenticated, setIsLoading, setAuthId)
  }, []);
  
  const login = async (username: string, password: string): Promise<number> => {
    const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/auth/login`, {
        method: "POST",
        body: JSON.stringify({username, password}),
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(response.status == 200) {
        const data = await response.json()   
        setIsAuthenticated(true)
        setAuthId(data._id)
        localStorage.setItem("isAuthenticated", "true"); // Save to localStorage
        return response.status
    }
    throw new Error("401")
  }
  const logout = async () => {
    const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/auth/logout`, {
        credentials: "include"
    })
    if(response.status == 200) {
        setIsAuthenticated(false)
        localStorage.removeItem("isAuthenticated"); // Remove from localStorage
    }
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, authId, setIsAuthenticated, logout, login, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};