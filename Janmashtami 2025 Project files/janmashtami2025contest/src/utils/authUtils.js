// Utility functions for making authenticated API requests

export const getAuthToken = () => {
  try {
    return localStorage.getItem("userToken");
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

export const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = getAuthToken();

  const defaultHeaders = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const requestOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    return response;
  } catch (error) {
    console.error("Authenticated request error:", error);
    throw error;
  }
};

export const makeAuthenticatedAPICall = async (url, options = {}) => {
  try {
    const response = await makeAuthenticatedRequest(url, options);

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid - clear localStorage and redirect to login
        localStorage.removeItem("userName");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userType");
        window.location.href = "/login";
        throw new Error("Authentication expired. Please login again.");
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};
