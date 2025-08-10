import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_ENDPOINTS } from "../../config/api.js";

export default function WinnerOperations() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("time");
  const [timePeriod, setTimePeriod] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const authErrorShownRef = useRef(false);
  const { userToken } = useSelector((state) => state.user);

  const handleAuthError = () => {
    if (!authErrorShownRef.current) {
      authErrorShownRef.current = true;
      alert("Session expired. Please login again.");
      navigate("/login");
    }
  };

  const searchWinners = async () => {
    setLoading(true);
    setError("");
    setSearchResults([]);

    try {
      let url;

      if (searchType === "time") {
        if (!timePeriod) {
          setError("Please select a time period");
          setLoading(false);
          return;
        }
        // Use GET call with lapsedMinutes parameter for time-based search
        url = `${
          API_ENDPOINTS.QUIZ.WIN_IN_RANGE
        }?lapsedMinutes=${getMinutesFromTimePeriod(timePeriod)}`;
      } else {
        if (!mobileNumber) {
          setError("Please enter a mobile number");
          setLoading(false);
          return;
        }
        if (!timePeriod) {
          setError("Please select a time period (lapsedMinutes is mandatory)");
          setLoading(false);
          return;
        }
        // Use GET call with mandatory lapsedMinutes and optional mobileNumber parameters
        url = `${
          API_ENDPOINTS.QUIZ.WIN_IN_RANGE
        }?lapsedMinutes=${getMinutesFromTimePeriod(
          timePeriod
        )}&mobileNumber=${encodeURIComponent(mobileNumber)}`;
      }

      console.log(`Making GET request to: ${url}`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      console.log(`Response status: ${response.status}`);

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        // The API returns an array of winners directly
        const results = Array.isArray(data) ? data : [];

        // Debug: Log the actual field names received
        if (results.length > 0) {
          console.log("First winner object keys:", Object.keys(results[0]));
          console.log("Sample winner object:", results[0]);
        }

        setSearchResults(results);
      } else {
        setError(data.message || "Failed to search winners");
      }
    } catch (error) {
      console.error("Error searching winners:", error);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDispatchPrize = async (winner) => {
    if (!winner.prizeCode) {
      alert("No prize code available for this winner");
      return;
    }

    try {
      // Append prizeCode as path variable to the URL
      const response = await fetch(
        `${API_ENDPOINTS.QUIZ.DISPATCH_PRIZE}/${winner.prizeCode}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      const data = await response.json();

      if (response.ok) {
        alert("Prize dispatched successfully");
        return true; // Return success status
      } else {
        alert(data.message || "Failed to dispatch prize");
        return false; // Return failure status
      }
    } catch (error) {
      console.error("Error dispatching prize:", error);
      alert("Network error occurred");
      return false; // Return failure status
    }
  };

  const getMinutesFromTimePeriod = (timePeriod) => {
    // Now timePeriod is directly the number of minutes
    return parseInt(timePeriod) || 14400; // Default to 24 hours if invalid
  };

  const getLevelBadge = (level) => {
    const colors = {
      1: "bg-green-100 text-green-800",
      2: "bg-blue-100 text-blue-800",
      3: "bg-purple-100 text-purple-800",
      4: "bg-red-100 text-red-800",
      5: "bg-yellow-100 text-yellow-800",
    };
    return colors[level] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-around items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Search Winners
          </h3>
        </div>

        {/* Search Form */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setSearchType("time")}
              className={`px-4 py-2 rounded-md transition-colors ${
                searchType === "time"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Search by Time Period
            </button>
            <button
              onClick={() => setSearchType("mobile")}
              className={`px-4 py-2 rounded-md transition-colors ${
                searchType === "mobile"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Search by Mobile Number
            </button>
          </div>

          {searchType === "time" ? (
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Period
                </label>
                <select
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select time period</option>
                  <option value="1">Last 1 minute</option>
                  <option value="5">Last 5 minutes</option>
                  <option value="15">Last 15 minutes</option>
                  <option value="60">Last 1 hour</option>
                  <option value="1440">Last 24 hours</option>
                  <option value="10080">Last 7 days</option>
                </select>
              </div>
              <button
                onClick={searchWinners}
                disabled={loading || !timePeriod}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Period (Required)
                  </label>
                  <select
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select time period</option>
                    <option value="1">Last 1 minute</option>
                    <option value="5">Last 5 minutes</option>
                    <option value="15">Last 15 minutes</option>
                    <option value="60">Last 1 hour</option>
                    <option value="1440">Last 24 hours</option>
                    <option value="10080">Last 7 days</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter mobile number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={searchWinners}
                  disabled={loading || !mobileNumber || !timePeriod}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prize Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level Cleared
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dispatch Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dispatch Prize
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Questions Attempted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.map((winner, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {String(winner.name || "N/A")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {String(winner.mobileNumber || "N/A")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {String(winner.prizeCode || "N/A")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {winner.submittedAt
                        ? String(new Date(winner.submittedAt).toLocaleString())
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelBadge(
                          winner.levelCleared
                        )}`}
                      >
                        Level {String(winner.levelCleared || 0)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {winner.isPrizeDispatched ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={async () => {
                          const success = await handleDispatchPrize(winner);
                          if (success) {
                            // Only refresh if dispatch was successful
                            searchWinners();
                          }
                        }}
                        disabled={!winner.prizeCode || winner.isPrizeDispatched}
                        className="text-blue-600 hover:text-blue-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        {winner.isPrizeDispatched ? "Dispatched" : "Dispatch"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(() => {
                        const attempted = winner.questionsAttempted;
                        if (attempted === null || attempted === undefined) {
                          return "0";
                        }
                        if (typeof attempted === "number") {
                          return String(attempted);
                        }
                        if (typeof attempted === "string") {
                          return attempted;
                        }
                        if (Array.isArray(attempted)) {
                          return String(attempted.length);
                        }
                        if (typeof attempted === "object") {
                          // If it's an object, try to extract meaningful data
                          return JSON.stringify(attempted);
                        }
                        return "0";
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-gray-500 text-lg">Searching...</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No search results</p>
            <p className="text-gray-400 text-sm mt-2">
              Use the search form above to find winners
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
