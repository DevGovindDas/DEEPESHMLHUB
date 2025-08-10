import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../userSlice.js";
import { API_ENDPOINTS } from "../../config/api.js";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminName, loggedIn, userType, userToken } = useSelector(
    (state) => state.user
  );
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  // Dashboard data states - no longer needed here
  const [currentPin, setCurrentPin] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const authErrorInProgress = useRef(false);

  // Protect dashboard - redirect if not authenticated
  useEffect(() => {
    if (!loggedIn || userType !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [loggedIn, userType, navigate]);

  // Fetch dashboard data on mount
  useEffect(() => {
    if (loggedIn && userType === "admin" && userToken) {
      fetchDashboardData();
    }
  }, [loggedIn, userType, userToken]);

  // Logging utility function (console only)
  const addApiLog = (endpoint, method, request, response, error = null) => {
    const timestamp = new Date().toLocaleString();
    const logEntry = {
      timestamp,
      endpoint,
      method,
      request: {
        url: endpoint,
        headers: request.headers || {},
        body: request.body || null,
      },
      response: response
        ? {
            status: response.status,
            statusText: response.statusText,
            data: response.data || null,
          }
        : null,
      error: error
        ? {
            message: error.message,
            type: error.name || "Unknown",
          }
        : null,
      success: !error && response?.status >= 200 && response?.status < 300,
    };

    console.log(`[API LOG] ${method} ${endpoint}:`, logEntry);
  };

  // Handle authentication errors
  const handleAuthError = (response, endpoint) => {
    console.log("Checking auth error for response:", response.status, endpoint);

    if (response.status === 401 || response.status === 403) {
      console.log(
        "Auth error detected, current ref state:",
        authErrorInProgress.current
      );

      addApiLog(endpoint, "ERROR", {}, response, {
        message:
          "Authentication failed - Session expired or logged in from another device",
        name: "AuthenticationError",
      });

      // Use ref to prevent multiple simultaneous auth errors
      if (!authErrorInProgress.current) {
        authErrorInProgress.current = true;
        console.log("Showing auth error popup...");

        // Show alert with session expired message
        setTimeout(() => {
          alert(
            "🔐 SESSION EXPIRED\n\nYour session has expired or you have been logged in from another device.\n\nYou will be redirected to the login page."
          );
          console.log("Alert shown, now logging out...");

          // Logout and redirect
          dispatch(logout());
          navigate("/login", { replace: true });
        }, 100);
      } else {
        console.log("Auth error already in progress, skipping popup...");
      }

      return true;
    }
    return false;
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      authErrorInProgress.current = false; // Reset auth error flag for new session

      // Only fetch PIN data - charts and stats are handled by child components
      await fetchCurrentPin();
      if (authErrorInProgress.current) return; // Stop if auth error occurred
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      if (!authErrorInProgress.current) {
        setError("Failed to load dashboard data");
      }
    } finally {
      if (!authErrorInProgress.current) {
        setLoading(false);
      }
    }
  };

  const fetchCurrentPin = async () => {
    const endpoint = API_ENDPOINTS.QUIZ.GET_PIN;
    const requestConfig = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "ngrok-skip-browser-warning": "true",
      },
    };

    try {
      addApiLog(endpoint, "GET", requestConfig, null);

      const response = await fetch(endpoint, requestConfig);
      console.log("PIN API Token:", userToken);
      console.log("PIN API Response status:", response.status);

      // Check for authentication errors first
      if (handleAuthError(response, endpoint)) {
        return;
      }

      if (response.ok) {
        // The API returns the pin string directly with 200 status
        const pinString = await response.text();
        console.log("PIN API Response:", pinString);

        addApiLog(endpoint, "GET", requestConfig, {
          status: response.status,
          statusText: response.statusText,
          data: `PIN: ${pinString}`,
        });

        setCurrentPin(pinString || "Not Set");
      } else {
        const errorData = await response.text();
        console.error("PIN API failed with status:", response.status);

        addApiLog(
          endpoint,
          "GET",
          requestConfig,
          {
            status: response.status,
            statusText: response.statusText,
            data: errorData,
          },
          {
            message: `Failed to fetch pin: ${response.status}`,
            name: "FetchError",
          }
        );

        throw new Error(`Failed to fetch pin: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching pin:", error.message);

      addApiLog(endpoint, "GET", requestConfig, null, {
        message: error.message,
        name: error.name || "NetworkError",
      });

      // Set a default PIN instead of "Error" to avoid confusion
      if (error.message.includes("fetch")) {
        setCurrentPin("CORS Error - Fix Backend");
      } else {
        setCurrentPin("Network Error");
      }
    }
  };

  const handleResetPin = async () => {
    if (
      !window.confirm(
        "Are you sure you want to reset the PIN? This will affect all ongoing quizzes."
      )
    ) {
      return;
    }

    const endpoint = API_ENDPOINTS.QUIZ.RESET_PIN;
    const requestConfig = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "ngrok-skip-browser-warning": "true",
      },
    };

    try {
      addApiLog(endpoint, "GET", requestConfig, null);

      const response = await fetch(endpoint, requestConfig);
      console.log("Reset PIN - Token:", userToken);
      console.log("Reset PIN - Response status:", response.status);

      // Check for authentication errors first
      if (handleAuthError(response, endpoint)) {
        return;
      }

      // The API only returns status code 200 for successful reset
      if (response.ok) {
        const responseText = await response.text();

        addApiLog(endpoint, "GET", requestConfig, {
          status: response.status,
          statusText: response.statusText,
          data: responseText || "PIN reset successful",
        });

        await fetchCurrentPin(); // Refresh pin to get the new value
        alert("PIN has been reset successfully!");
      } else {
        const errorData = await response.text();
        console.error("Reset PIN failed with status:", response.status);

        addApiLog(
          endpoint,
          "GET",
          requestConfig,
          {
            status: response.status,
            statusText: response.statusText,
            data: errorData,
          },
          {
            message: `Failed to reset pin: ${response.status}`,
            name: "FetchError",
          }
        );

        throw new Error(`Failed to reset pin: ${response.status}`);
      }
    } catch (error) {
      console.error("Error resetting pin:", error.message);

      addApiLog(endpoint, "GET", requestConfig, null, {
        message: error.message,
        name: error.name || "NetworkError",
      });

      if (error.message.includes("CORS") || error.message.includes("fetch")) {
        alert(
          "Failed to reset PIN: CORS or Network error. Please configure CORS in your Spring Boot backend or check your connection."
        );
      } else {
        alert(`Failed to reset PIN: ${error.message}`);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const toggleDesktopDropdown = () => {
    setIsDesktopDropdownOpen(!isDesktopDropdownOpen);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside desktop dropdown area
      const isDesktopDropdown = event.target.closest(".user-dropdown");
      if (!isDesktopDropdown) {
        setIsDesktopDropdownOpen(false);
      }

      // For mobile dropdown, only close if clicking outside the entire mobile dropdown container
      const isMobileDropdown = event.target.closest(".mobile-dropdown");
      const isMobileMenuButton = event.target.closest(".mobile-menu-button");

      if (!isMobileDropdown && !isMobileMenuButton) {
        setIsMobileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-lg text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Title (responsive) */}
            <div className="flex items-center min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                <span className="hidden sm:inline">
                  🕉️ Krishna Janmashtami 2025 - Admin Dashboard
                </span>
                <span className="sm:hidden">🕉️ Admin Dashboard</span>
              </h1>
            </div>

            {/* Right side - Actions (responsive) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* PIN Action Buttons - Hidden on mobile */}
              <button
                onClick={handleResetPin}
                className="hidden lg:inline-flex px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 font-medium text-sm"
                title="Reset PIN"
              >
                🔄 Reset PIN
              </button>

              <button
                onClick={fetchCurrentPin}
                className="hidden md:inline-flex px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium text-sm"
                title="Refresh PIN"
              >
                🔄 Refresh
              </button>

              {/* Player Registration Link - Hidden on mobile, shown on larger screens */}
              <Link
                to="/registerPlayer"
                className="hidden md:inline-flex px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-medium text-sm"
              >
                🎯 Register Player
              </Link>

              {/* Current PIN Display - Responsive */}
              <div className="bg-blue-50 px-2 py-1 sm:px-3 sm:py-1 rounded-lg">
                <span className="text-xs sm:text-sm font-medium text-blue-700">
                  <span className="hidden sm:inline">Current PIN: </span>
                  <span className="sm:hidden">PIN: </span>
                  <strong>{currentPin}</strong>
                </span>
              </div>

              {/* Mobile Menu Button - Only shown on mobile */}
              <button
                onClick={toggleMobileDropdown}
                className="mobile-menu-button md:hidden flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
              >
                <span className="text-sm">☰</span>
              </button>

              {/* User Profile Dropdown - Hidden on mobile, shown on larger screens */}
              <div className="relative user-dropdown hidden md:block">
                <button
                  onClick={toggleDesktopDropdown}
                  className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
                  title={`Logged in as ${adminName}`}
                >
                  <span className="font-semibold text-sm">
                    {adminName ? adminName.charAt(0).toUpperCase() : "A"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isDesktopDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {adminName}
                      </p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsDesktopDropdownOpen(false);
                        handleResetPin();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      🔄 Reset PIN
                    </button>
                    <button
                      onClick={() => {
                        setIsDesktopDropdownOpen(false);
                        fetchCurrentPin();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                    >
                      🔄 Refresh PIN
                    </button>
                    <button
                      onClick={() => {
                        setIsDesktopDropdownOpen(false);
                        navigate("/registerPlayer");
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors duration-150"
                    >
                      🎯 Register Player
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileDropdownOpen && (
            <div className="mobile-dropdown md:hidden border-t border-gray-200 bg-white">
              <div className="px-4 py-3 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full">
                    <span className="font-semibold text-sm">
                      {adminName ? adminName.charAt(0).toUpperCase() : "A"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {adminName}
                    </p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Mobile Reset PIN clicked");
                      setIsMobileDropdownOpen(false);
                      setTimeout(() => handleResetPin(), 50);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-150"
                  >
                    🔄 Reset PIN
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Mobile Refresh PIN clicked");
                      setIsMobileDropdownOpen(false);
                      setTimeout(() => fetchCurrentPin(), 50);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-150"
                  >
                    🔄 Refresh PIN
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Mobile Register Player clicked");
                      setIsMobileDropdownOpen(false);
                      setTimeout(() => navigate("/registerPlayer"), 50);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-150"
                  >
                    🎯 Register Player
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Mobile Logout clicked");
                      setIsMobileDropdownOpen(false);
                      setTimeout(() => handleLogout(), 50);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-150"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p className="font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Action Buttons & Navigation */}
        <div className="mb-6">
          {/* Navigation Bar */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium text-sm"
              >
                📊 Dashboard
              </button>
              <button
                onClick={() => navigate("/dashboard/winners")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-medium text-sm"
              >
                🏆 Winners
              </button>
              <button
                onClick={() => navigate("/dashboard/admins")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 font-medium text-sm"
              >
                👥 Admin Management
              </button>
            </div>
          </div>
        </div>

        {/* Child Route Content */}
        <Outlet />
      </main>
    </div>
  );
}
