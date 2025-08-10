import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../userSlice.js";
import { API_ENDPOINTS } from "../../config/api.js";

export default function DashboardHome() {
  const { userToken } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Dashboard data states
  const [currentPin, setCurrentPin] = useState("Loading...");
  const [questionsData, setQuestionsData] = useState({
    level1: 0,
    level2: 0,
    level3: 0,
    total: 0,
  });
  const [winnersData, setWinnersData] = useState({
    failed: 0,
    level1Passed: 0,
    level2Passed: 0,
    allLevelsPassed: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const authErrorInProgress = useRef(false);

  // Fetch dashboard data on mount
  useEffect(() => {
    if (userToken) {
      fetchDashboardData();
    }
  }, [userToken]);

  // Handle authentication errors
  const handleAuthError = (response) => {
    if (response.status === 401 || response.status === 403) {
      if (!authErrorInProgress.current) {
        authErrorInProgress.current = true;
        alert("Your session has expired. Please log in again.");
        dispatch(logout());
        navigate("/login", { replace: true });
      }
      return true;
    }
    return false;
  };

  // Logging utility function
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
        ? { message: error.message, type: error.name || "Unknown" }
        : null,
      success: !error && response?.status >= 200 && response?.status < 300,
    };
    console.log(`[API LOG] ${method} ${endpoint}:`, logEntry);
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      authErrorInProgress.current = false;

      await fetchCurrentPin();
      if (authErrorInProgress.current) return;

      await fetchQuestionsData();
      if (authErrorInProgress.current) return;

      await fetchWinnersData();
      if (authErrorInProgress.current) return;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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

      if (handleAuthError(response)) return;

      if (response.ok) {
        const pinString = await response.text();
        addApiLog(endpoint, "GET", requestConfig, {
          status: response.status,
          statusText: response.statusText,
          data: `PIN: ${pinString}`,
        });
        setCurrentPin(pinString || "Not Set");
      } else {
        const errorData = await response.text();
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
      if (error.message.includes("fetch")) {
        setCurrentPin("CORS Error - Fix Backend");
      } else {
        setCurrentPin("Network Error");
      }
    }
  };

  const fetchQuestionsData = async () => {
    const endpoint = API_ENDPOINTS.QUESTIONS.GET_ALL;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (handleAuthError(response)) return;

      if (response.ok) {
        const questions = await response.json();
        const level1Count = questions.filter(
          (q) => q.level === 1 || q.level === "1"
        ).length;
        const level2Count = questions.filter(
          (q) => q.level === 2 || q.level === "2"
        ).length;
        const level3Count = questions.filter(
          (q) => q.level === 3 || q.level === "3"
        ).length;

        setQuestionsData({
          level1: level1Count,
          level2: level2Count,
          level3: level3Count,
          total: questions.length,
        });
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestionsData({ level1: 0, level2: 0, level3: 0, total: 0 });
    }
  };

  const fetchWinnersData = async () => {
    const endpoint = `${API_ENDPOINTS.QUIZ.WIN_IN_RANGE}?lapsedMinutes=1440`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (handleAuthError(response)) return;

      if (response.ok) {
        const wins = await response.json();
        if (Array.isArray(wins)) {
          const level1Passed = wins.filter((w) => w.levelCleared === 1).length;
          const level2Passed = wins.filter((w) => w.levelCleared === 2).length;
          const allLevelsPassed = wins.filter(
            (w) => w.levelCleared === 3 || w.levelCleared >= 3
          ).length;
          const failedPlayers = wins.filter(
            (w) => !w.levelCleared || w.levelCleared === 0
          ).length;

          setWinnersData({
            failed: failedPlayers,
            level1Passed: level1Passed,
            level2Passed: level2Passed,
            allLevelsPassed: allLevelsPassed,
            total:
              level1Passed + level2Passed + allLevelsPassed + failedPlayers,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching wins:", error);
      setWinnersData({
        failed: 0,
        level1Passed: 0,
        level2Passed: 0,
        allLevelsPassed: 0,
        total: 0,
      });
    }
  };

  // Generate pie chart colors
  const questionColors = ["#FF6384", "#36A2EB", "#FFCE56"];
  const winnerColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

  const createPieChart = (data, colors, title) => {
    const total = Object.entries(data)
      .filter(([key, value]) => key !== "total" && typeof value === "number")
      .reduce((sum, [, value]) => sum + value, 0);
    let currentAngle = 0;

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {title}
        </h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              {Object.entries(data)
                .filter(([key, value]) => key !== "total" && value > 0)
                .map(([key, value], index) => {
                  const angle = (value / total) * 360;
                  const x1 = 96 + 80 * Math.cos((currentAngle * Math.PI) / 180);
                  const y1 = 96 + 80 * Math.sin((currentAngle * Math.PI) / 180);
                  const x2 =
                    96 +
                    80 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
                  const y2 =
                    96 +
                    80 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
                  const largeArc = angle > 180 ? 1 : 0;

                  const pathData = [
                    "M",
                    96,
                    96,
                    "L",
                    x1,
                    y1,
                    "A",
                    80,
                    80,
                    0,
                    largeArc,
                    1,
                    x2,
                    y2,
                    "Z",
                  ].join(" ");

                  currentAngle += angle;

                  return (
                    <path
                      key={key}
                      d={pathData}
                      fill={colors[index % colors.length]}
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {Object.entries(data)
            .filter(([key, value]) => key !== "total" && value > 0)
            .map(([key, value], index) => (
              <div key={key} className="flex items-center text-sm">
                <div
                  className="w-4 h-4 rounded mr-2"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}: {value}
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-lg text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Dashboard Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Questions Chart */}
        {createPieChart(questionsData, questionColors, "Questions by Level")}

        {/* Winners Chart */}
        {createPieChart(winnersData, winnerColors, "Player Results")}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">
            {questionsData.total}
          </div>
          <div className="text-sm text-gray-600">Total Questions</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">
            {winnersData.allLevelsPassed}
          </div>
          <div className="text-sm text-gray-600">Quiz Winners</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-orange-600">
            {winnersData.total}
          </div>
          <div className="text-sm text-gray-600">Total Participants</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-purple-600">{currentPin}</div>
          <div className="text-sm text-gray-600">Active PIN</div>
        </div>
      </div>
    </div>
  );
}
