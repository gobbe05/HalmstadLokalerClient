import React from "react";

const initializeAuth = async (setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, setAuthId: React.Dispatch<React.SetStateAction<string | undefined>>) => {
    try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/`, {
          credentials: "include",
        });
      if (response.status === 200) {
        const data = await response.json()
        setIsAuthenticated(true);
        setAuthId(data._id)
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