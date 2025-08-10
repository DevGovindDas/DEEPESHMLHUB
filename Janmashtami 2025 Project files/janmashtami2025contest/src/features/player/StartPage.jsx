import React from "react";
import {
  Form,
  redirect,
  useNavigation,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api.js";

// Action function to handle form submission
export async function startPageAction({ request }) {
  const formData = await request.formData();
  const accessCode = formData.get("accessCode");

  try {
    console.log("Attempting to fetch questions with PIN:", accessCode);

    // Send access code to backend for validation and questions
    const response = await fetch(API_ENDPOINTS.QUIZ.QUESTIONS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        pinText: accessCode,
      }),
    });

    console.log("Questions API response status:", response.status);
    console.log("Questions API response ok:", response.ok);

    if (response.ok) {
      // Try to parse response data
      let responseData;
      try {
        responseData = await response.json();
        console.log(
          "Questions received:",
          responseData?.length || "Unknown count"
        );
      } catch (parseError) {
        console.error("Failed to parse response JSON:", parseError);
        return {
          error: "Server returned invalid data. Please try again.",
        };
      }

      // Success - store questions and redirect
      sessionStorage.setItem("quizQuestions", JSON.stringify(responseData));
      sessionStorage.setItem("accessCode", accessCode);
      return redirect("/quiz");
    } else if (response.status === 400) {
      // Handle 400 errors (pin verification, etc.)
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: await response.text() };
      }

      console.log("400 error response:", errorData);

      if (errorData.matchStatus === false) {
        // Pin verification failed
        return {
          error:
            errorData.message ||
            "Invalid PIN. Please check your PIN and try again.",
        };
      } else {
        return {
          error: errorData.message || "Bad request. Please try again.",
        };
      }
    } else if (response.status === 401 || response.status === 403) {
      // Authentication errors
      console.error("Authentication error during questions fetch");
      return {
        error:
          "Session expired or unauthorized access. Please contact the administrator.",
      };
    } else if (response.status >= 500) {
      // Server errors
      const errorData = await response.text();
      console.error("Server error during questions fetch:", errorData);
      return {
        error: "Server error occurred. Please try again later.",
      };
    } else {
      // Other unexpected status codes
      const errorData = await response.text();
      console.error("Unexpected response status:", response.status, errorData);
      return {
        error: `Unexpected server response (${response.status}). Please try again.`,
      };
    }
  } catch (error) {
    console.error("Error fetching questions:", error);

    // Determine error type for better user messaging
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return {
        error:
          "Network connection failed. Please check your internet connection and try again.",
      };
    } else {
      return {
        error: "Failed to connect to server. Please try again.",
      };
    }
  }
}

export default function StartPage() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  const handleExit = () => {
    if (window.confirm("Are you sure you want to exit the application?")) {
      window.close();
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-800 mb-4">
            🎯 Krishna Janmashtami Quiz Challenge
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Test your knowledge about Lord Krishna and win amazing prizes!
          </p>
        </div>

        {/* Quiz Features */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🏆 Quiz Features:
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start">
              <span className="text-orange-500 mr-2">📚</span>
              <div>
                <strong>Level 1:</strong> 3 Questions about Krishna&#39;s
                childhood
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-orange-500 mr-2">🎭</span>
              <div>
                <strong>Level 2:</strong> 2 Questions about Krishna&#39;s divine
                leelas
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-orange-500 mr-2">📖</span>
              <div>
                <strong>Level 3:</strong> 1 Advanced question about Bhagavad
                Gita and Bhagvatam
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-orange-500 mr-2">🎁</span>
              <div>
                <strong>Prize:</strong> Complete all levels to win exclusive
                Krishna merchandise!
              </div>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-yellow-50 rounded-lg p-6 mb-8 border-l-4 border-yellow-400">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">
            📋 Quiz Rules:
          </h3>
          <ul className="text-yellow-700 space-y-2 text-sm">
            <li>• Answer all questions correctly in each level to proceed</li>
            <li>• Incorrect answers will prevent progression to next level</li>
            <li>• Multiple choice questions with only one correct answer</li>
            <li>• Get your prize advanced with each level completed!</li>
          </ul>
        </div>

        {/* Access Code Form */}
        <Form method="post" className="space-y-6">
          {/* Error Message */}
          {actionData?.error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <p className="text-sm font-medium">⚠️ {actionData.error}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="accessCode"
              className="block text-lg font-medium text-gray-700 mb-3"
            >
              Enter 4-Digit Access Code to Start Quiz:
            </label>
            <input
              type="password"
              id="accessCode"
              name="accessCode"
              maxLength={4}
              pattern="[0-9]{4}"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                isSubmitting
                  ? "border-gray-300 bg-gray-100 text-gray-500"
                  : "border-orange-300"
              }`}
              placeholder="****"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 font-medium text-lg ${
                isSubmitting
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading Questions...
                </span>
              ) : (
                "🚀 Start Quiz"
              )}
            </button>

            <button
              type="button"
              onClick={handleExit}
              disabled={isSubmitting}
              className={`flex-1 py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 font-medium text-lg ${
                isSubmitting
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500"
              }`}
            >
              🚪 Exit Application
            </button>
          </div>
        </Form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            🙏 May Lord Krishna bless you with wisdom and knowledge!
          </p>
        </div>
      </div>
    </div>
  );
}
