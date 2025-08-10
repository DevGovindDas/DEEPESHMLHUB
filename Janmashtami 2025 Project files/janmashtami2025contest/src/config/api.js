// API Configuration
// Centralized URL configuration for entire application

// Environment-aware configuration
const getBaseUrl = () => {
  // Check if running in development mode
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_BASE_URL || "http://192.168.31.37:8080";
  }

  // Production URL - use environment variable or fallback
  return import.meta.env.VITE_API_BASE_URL || "https://your-api.yourdomain.com";
};

const getFrontendUrl = () => {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_FRONTEND_URL || "http://192.168.31.37:5173";
  }

  // Production URL - use environment variable or fallback
  return import.meta.env.VITE_FRONTEND_URL || "https://your-app.yourdomain.com";
};

// This executes when the JavaScript bundle loads in the browser
export const FRONTEND_URL = getFrontendUrl();
export const API_BASE_URL = getBaseUrl();

// API endpoints with better organization
const createEndpoint = (path) => `${API_BASE_URL}${path}`;

export const API_ENDPOINTS = {
  // Admin endpoints
  ADMIN: {
    LOGIN: createEndpoint("/admin/login"),
    CREATE: createEndpoint("/admin/update"),
    GET_ALL: createEndpoint("/admin/getAll"),
    VALIDATE_TOKEN: createEndpoint("/admin/validateToken"),
  },

  // Quiz endpoints
  QUIZ: {
    GET_PIN: createEndpoint("/quiz/getPin"),
    RESET_PIN: createEndpoint("/quiz/resetPin"),
    WIN_IN_RANGE: createEndpoint("/quiz/winInRange"),
    QUESTIONS: createEndpoint("/quiz/questions"),
    SUBMIT: createEndpoint("/quiz/submit"),
    DISPATCH_PRIZE: createEndpoint("/quiz/dispatchPrize"),
  },

  // Question endpoints
  QUESTIONS: {
    GET_ALL: createEndpoint("/questions/getAll"),
  },

  // Player endpoints
  PLAYER: {
    REGISTER: createEndpoint("/player/register"),
  },
};

// Legacy support - maintain backwards compatibility
export const ADMIN_LOGIN = API_ENDPOINTS.ADMIN.LOGIN;
export const ADMIN_CREATE = API_ENDPOINTS.ADMIN.CREATE;
export const ADMIN_GET_ALL = API_ENDPOINTS.ADMIN.GET_ALL;
export const ADMIN_VALIDATE_TOKEN = API_ENDPOINTS.ADMIN.VALIDATE_TOKEN;
export const QUIZ_DISPATCH_PRIZE = API_ENDPOINTS.QUIZ.DISPATCH_PRIZE;
export const QUIZ_GET_PIN = API_ENDPOINTS.QUIZ.GET_PIN;
export const QUIZ_RESET_PIN = API_ENDPOINTS.QUIZ.RESET_PIN;
export const QUIZ_WIN_IN_RANGE = API_ENDPOINTS.QUIZ.WIN_IN_RANGE;
export const QUIZ_QUESTIONS = API_ENDPOINTS.QUIZ.QUESTIONS;
export const QUIZ_SUBMIT = API_ENDPOINTS.QUIZ.SUBMIT;
export const QUESTIONS_GET_ALL = API_ENDPOINTS.QUESTIONS.GET_ALL;
export const PLAYER_REGISTER = API_ENDPOINTS.PLAYER.REGISTER;
