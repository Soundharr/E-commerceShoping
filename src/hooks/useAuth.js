import { useState, useEffect } from "react";

// Custom hook to check if the user is authenticated
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated (e.g., check localStorage for a token)
    const token = localStorage.getItem("token");

    if (token) {
      // Decode the token or check if the user is authenticated
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  return { user, isAuthenticated };
}
