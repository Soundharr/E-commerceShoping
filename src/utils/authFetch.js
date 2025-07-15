// src/utils/authFetch.js
export const authFetch = async (url, options = {}) => {
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  // Add access token to request headers
  const headers = {
    "Content-Type": "application/json",
    ...(access && { Authorization: `Bearer ${access}` }),
    ...options.headers,
  };

  // First API call with current access token
  let response = await fetch(url, {
    ...options,
    headers,
  });

  // If access token is expired (401), try refreshing
  if (response.status === 401 && refresh) {
    const refreshRes = await fetch("http://localhost:8000/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (refreshRes.ok) {
      const { access: newAccess } = await refreshRes.json();
      localStorage.setItem("access", newAccess);

      // Retry original request with new token
      const retryRes = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${newAccess}`,
        },
      });
      return retryRes;
    } else {
      // Refresh token expired or invalid → logout
      localStorage.clear();
      window.location.href = "/login";
      throw new Error("Session expired. Please login again.");
    }
  }

  return response;
};
