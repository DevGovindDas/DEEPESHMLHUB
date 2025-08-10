// Utility functions for managing player data in localStorage
// This is separate from Redux since it's just temporary form data for quiz submission

export const playerStorage = {
  // Save player data to localStorage
  savePlayerData: (name, mobileNumber) => {
    try {
      if (name) localStorage.setItem("playerName", name);
      if (mobileNumber)
        localStorage.setItem("playerMobileNumber", mobileNumber);
    } catch (error) {
      console.error("Error saving player data:", error);
    }
  },

  // Get player data from localStorage
  getPlayerData: () => {
    try {
      return {
        name: localStorage.getItem("playerName") || "",
        mobileNumber: localStorage.getItem("playerMobileNumber") || "",
      };
    } catch (error) {
      console.error("Error loading player data:", error);
      return {
        name: "",
        mobileNumber: "",
      };
    }
  },

  // Clear player data from localStorage
  clearPlayerData: () => {
    try {
      localStorage.removeItem("playerName");
      localStorage.removeItem("playerMobileNumber");
    } catch (error) {
      console.error("Error clearing player data:", error);
    }
  },

  // Check if player data exists
  hasPlayerData: () => {
    try {
      const name = localStorage.getItem("playerName");
      const mobile = localStorage.getItem("playerMobileNumber");
      return !!(name && mobile);
    } catch (error) {
      console.error("Error checking player data:", error);
      return false;
    }
  },
};
