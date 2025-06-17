// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import register from "./register";
import initializeAuth from "./initializeAuth";
import Loading from "../../components/layout/loading";
import { toast } from "react-toastify";
import INewUser from "./INewUser";
interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  authId: string | undefined,
  type: string | undefined,
  isLoading: boolean,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (username: string, password: string) => Promise<number>;
  register: (newUser: INewUser) => Promise<number | Error>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authId, setAuthId] = useState<string | undefined>(undefined)
  const [type, setType] = useState<string | undefined>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  // Check authentication status on initial load
  useEffect(() => {
    initializeAuth(setIsAuthenticated, setIsAdmin, setIsLoading, setAuthId, setType)
  }, []);
  
  const login = async (username: string, password: string): Promise<number> => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/login`, {
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
        setType(data.type)
        localStorage.setItem("isAuthenticated", "true"); // Save to localStorage
        toast.success("Inloggning lyckades.")
        return 200
    }
    if(response.status == 403) {
      toast.warning("Användare väntar på att bli accepterad. Du kommer att få ett mail när du kan logga in.")
      return 403
    }
    
    if(response.status == 400) {
      toast.error("Fel användarnamn eller lösenord.")
      return 401
    }
    return 500
  }
  const logout = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/logout`, {
        credentials: "include"
    })
    if(response.status == 200) {
        setIsAuthenticated(false)
        initializeAuth(setIsAuthenticated, setIsAdmin, setIsLoading, setAuthId, setType)
        localStorage.removeItem("isAuthenticated"); // Remove from localStorage
    }
  };
  
  if(isLoading)
    return <Loading />
  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, authId, type, setIsAuthenticated, logout, login, register, isLoading }}>
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