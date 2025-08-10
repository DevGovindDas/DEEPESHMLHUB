import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../config/api.js"; // Import the endpoints

// Constants for localStorage keys
const STORAGE_KEYS = {
  ADMIN_NAME: "adminName",
  USER_TOKEN: "userToken",
  USER_TYPE: "userType",
};

// Enhanced localStorage utilities with error handling
const localStorage_utils = {
  load: () => {
    try {
      const data = {};
      Object.values(STORAGE_KEYS).forEach((key) => {
        data[key] = localStorage.getItem(key) || "";
      });

      return {
        adminName: data[STORAGE_KEYS.ADMIN_NAME],
        userToken: data[STORAGE_KEYS.USER_TOKEN] || null,
        userType: data[STORAGE_KEYS.USER_TYPE],
        loggedIn: false, // Always start false, validate after initialization
        isValidatingToken: false,
        needsTokenValidation: Boolean(data[STORAGE_KEYS.USER_TOKEN]), // Flag for auto-validation
      };
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return {
        adminName: "",
        userToken: null,
        userType: "",
        loggedIn: false,
        isValidatingToken: false,
        needsTokenValidation: false,
      };
    }
  },

  save: (data) => {
    try {
      const keyMapping = {
        adminName: STORAGE_KEYS.ADMIN_NAME,
        userToken: STORAGE_KEYS.USER_TOKEN,
        userType: STORAGE_KEYS.USER_TYPE,
      };

      Object.entries(data).forEach(([key, value]) => {
        if (value && keyMapping[key]) {
          localStorage.setItem(keyMapping[key], value);
        }
      });
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  clear: () => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

// This runs first - loads data from localStorage
const initialState = localStorage_utils.load();

// Async thunk for token validation
export const validateToken = createAsyncThunk(
  "user/validateToken",
  async (_, { getState, rejectWithValue }) => {
    const { userToken } = getState().user;

    if (!userToken) {
      console.log("❌ No token available for validation");
      return rejectWithValue("No token available");
    }

    try {
      const response = await fetch(API_ENDPOINTS.ADMIN.VALIDATE_TOKEN, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const isValid = await response.json();
        if (isValid === true) {
          return true;
        } else {
          return rejectWithValue("Token is invalid");
        }
      } else {
        return rejectWithValue("Validation request failed");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAdminName: (state, action) => {
      state.adminName = action.payload;
      localStorage_utils.save({
        adminName: action.payload,
        userToken: state.userToken,
        userType: state.userType,
      });
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
      // Auto-set loggedIn to true for players, keep current state for admin
      if (action.payload === "player") {
        state.loggedIn = true;
      }
      localStorage_utils.save({
        adminName: state.adminName,
        userToken: state.userToken,
        userType: action.payload,
      });
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      localStorage_utils.save({
        adminName: state.adminName,
        userToken: action.payload,
        userType: state.userType,
      });
    },
    login: (state) => {
      // Only allow login for admin userType
      if (state.userType === "admin") {
        state.loggedIn = true;
      }
    },
    logout: (state) => {
      // Only allow logout for admin userType
      if (state.userType === "admin") {
        state.loggedIn = false;
        state.userToken = null; // Clear token on logout
        localStorage_utils.clear(); // Clear all admin localStorage data
        state.adminName = "";
        state.userType = "";
      }
    },
    resetUser: (state) => {
      state.adminName = "";
      state.userType = "";
      state.loggedIn = false;
      state.userToken = null;
      localStorage_utils.clear(); // Clear all localStorage data
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle validateToken thunk
      .addCase(validateToken.pending, (state) => {
        console.log("🔄 Token validation started");
        state.isValidatingToken = true;
      })
      .addCase(validateToken.fulfilled, (state) => {
        console.log("✅ Token validation successful");
        state.isValidatingToken = false;
        state.needsTokenValidation = false;
        if (state.userType === "admin" && state.userToken) {
          state.loggedIn = true;
        }
      })
      .addCase(validateToken.rejected, (state, action) => {
        console.log("❌ Token validation rejected:", action.payload);
        state.isValidatingToken = false;
        state.needsTokenValidation = false;
        state.loggedIn = false;
        state.userToken = null;
        localStorage_utils.clear();

        // Show alert when token validation fails
        setTimeout(() => {
          alert(
            "🔐 SESSION EXPIRED\n\nYour session has expired or you have been logged in from another device.\n\nYou will be redirected to the login page.\n\nFrom the Admin Dashboard loading component."
          );
        }, 100);
      });
  },
});

export const {
  setAdminName,
  setUserType,
  setUserToken,
  login,
  logout,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
