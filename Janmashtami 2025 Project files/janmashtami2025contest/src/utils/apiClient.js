// Centralized API client utility
// Handles ngrok header and common configurations

export const apiClient = {
  // Common headers including ngrok bypass
  getHeaders: (authToken = null, additionalHeaders = {}) => {
    const headers = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      ...additionalHeaders,
    };

    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    return headers;
  },

  // GET request
  get: async (url, authToken = null, additionalHeaders = {}) => {
    return fetch(url, {
      method: "GET",
      headers: apiClient.getHeaders(authToken, additionalHeaders),
    });
  },

  // POST request
  post: async (url, data, authToken = null, additionalHeaders = {}) => {
    return fetch(url, {
      method: "POST",
      headers: apiClient.getHeaders(authToken, additionalHeaders),
      body: JSON.stringify(data),
    });
  },

  // PUT request
  put: async (url, data, authToken = null, additionalHeaders = {}) => {
    return fetch(url, {
      method: "PUT",
      headers: apiClient.getHeaders(authToken, additionalHeaders),
      body: JSON.stringify(data),
    });
  },

  // DELETE request
  delete: async (url, authToken = null, additionalHeaders = {}) => {
    return fetch(url, {
      method: "DELETE",
      headers: apiClient.getHeaders(authToken, additionalHeaders),
    });
  },
};
