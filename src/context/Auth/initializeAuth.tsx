import React from "react";

const initializeAuth = async (setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        setIsLoading(true);
      const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/auth/`, {
        credentials: "include",
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
        setIsLoading(false)
    }
  };

export default initializeAuth