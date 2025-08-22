// src/hooks/useAuth.js
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("access"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    const handleAuthChange = () => {
      const newToken = localStorage.getItem("access");
      setToken(newToken);
      setIsAuthenticated(!!newToken);
    };

    // Listen to token changes (e.g., after login)
    window.addEventListener("authChanged", handleAuthChange);
    return () => window.removeEventListener("authChanged", handleAuthChange);
  }, []);

  return { token, isAuthenticated };
};
