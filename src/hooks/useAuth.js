import { useState, useEffect } from "react";

export function useAuth() {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("access") || undefined;
    } catch {
      return undefined; // in SSR or restricted environments
    }
  });

  useEffect(() => {
    function syncToken() {
      try {
        const t = localStorage.getItem("access");
        setToken(t || undefined);
      } catch {
        setToken(undefined);
      }
    }
    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);

  console.log("Auth token from useAuth:", token);
  console.log(
    "Auth token directly from localStorage:",
    localStorage.getItem("access")
  );

  return { token };
}
