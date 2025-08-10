import { useState, useCallback } from "react";

// Custom hook for API calls with common configuration
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const defaultHeaders = {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      };

      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { apiCall, loading, error };
};

// Utility function for creating common API request configurations
export const createApiConfig = (method = "GET", body = null) => ({
  method,
  ...(body && { body: JSON.stringify(body) }),
});
