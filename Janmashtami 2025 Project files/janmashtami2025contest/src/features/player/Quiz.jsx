import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { playerStorage } from "../../utils/playerStorage.js";
import { API_ENDPOINTS } from "../../config/api.js";

export default function Quiz() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [showLevelResult, setShowLevelResult] = useState(false);
  const [levelPassed, setLevelPassed] = useState(false);
  const [highestLevelCleared, setHighestLevelCleared] = useState(0); // Track highest level cleared
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get player data from localStorage
  const playerData = playerStorage.getPlayerData();

  // Scroll to top when component mounts
  useEffect(() => {
    // Try scrolling the window
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Also try scrolling the document body
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // If there's a specific container, you might need to target it
    const container =
      document.querySelector(".main-content") || document.querySelector("main");
    if (container) {
      container.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    // Load quiz data from sessionStorage
    try {
      const storedQuestions = sessionStorage.getItem("quizQuestions");
      if (storedQuestions) {
        const questionsData = JSON.parse(storedQuestions);
        setQuizData(questionsData);
        setLoading(false);
      } else {
        setError("No quiz data found. Please start from the beginning.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error loading quiz data:", err);
      setError("Failed to load quiz questions.");
      setLoading(false);
    }
  }, []);

  // Scroll to top when moving to next question or level
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentLevel, currentQuestionIndex]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Quiz...
          </h2>
          <p className="text-gray-600">Preparing your questions</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/start")}
            className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition duration-200"
          >
            Back to Start
          </button>
        </div>
      </div>
    );
  }

  const getCurrentQuestions = () => {
    if (!quizData) return [];

    switch (currentLevel) {
      case 1:
        return quizData.level1Questions || [];
      case 2:
        return quizData.level2Questions || [];
      case 3:
        return quizData.level3Questions || [];
      default:
        return [];
    }
  };

  const currentQuestions = getCurrentQuestions();
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!currentQuestion) return;

    // Get the correct answer from the API format
    const correctAnswer =
      currentQuestion.options[currentQuestion.correctOptionIndex];

    // Store the answer
    const answerData = {
      level: currentLevel,
      questionId: currentQuestion.id,
      question: currentQuestion.questionText,
      selectedAnswer,
      correctAnswer,
      isCorrect: selectedAnswer === correctAnswer,
      options: currentQuestion.options,
      correctOptionIndex: currentQuestion.correctOptionIndex,
    };

    setUserAnswers((prev) => [...prev, answerData]);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      // Move to next question in current level
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else {
      // End of level - check if all answers are correct
      const allCurrentLevelAnswers = [...userAnswers, answerData];
      const currentLevelAnswers = allCurrentLevelAnswers.filter(
        (a) => a.level === currentLevel
      );
      const allCorrect = currentLevelAnswers.every((a) => a.isCorrect);

      setLevelPassed(allCorrect);
      setShowLevelResult(true);
    }
  };

  const submitQuizResults = async (
    isCompleted,
    finalLevel,
    levelsClearedSoFar = 0
  ) => {
    try {
      const accessCode = sessionStorage.getItem("accessCode");
      if (!accessCode) {
        throw new Error("Access code not found. Please restart the quiz.");
      }

      // Determine the actual level cleared
      const levelCleared = isCompleted
        ? 3
        : Math.max(levelsClearedSoFar, highestLevelCleared);

      console.log("Prize code debug info:");
      console.log("- isCompleted:", isCompleted);
      console.log("- finalLevel:", finalLevel);
      console.log("- levelsClearedSoFar:", levelsClearedSoFar);
      console.log("- highestLevelCleared:", highestLevelCleared);
      console.log("- calculated levelCleared:", levelCleared);

      // Generate prize code if player clears any level (level 1, 2, or 3)
      const generatedPrizeCode =
        levelCleared >= 1
          ? `KRISHNA-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
          : null;

      console.log("- generated prize code:", generatedPrizeCode);

      // Prepare the submission data with player info from localStorage
      const submissionData = {
        mobileNumber: playerData.mobileNumber || "", // From localStorage
        name: playerData.name || "", // From localStorage
        levelCleared: levelCleared,
        prizeCode: generatedPrizeCode, // Send generated prize code to backend
        answers: userAnswers.map((answer) => ({
          questionText: answer.question,
          answerText: answer.selectedAnswer,
        })),
      };

      console.log("Submitting quiz data:", submissionData);
      console.log("Using access code:", accessCode);

      const response = await fetch(API_ENDPOINTS.QUIZ.SUBMIT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          pin: accessCode,
        },
        body: JSON.stringify(submissionData),
      });

      console.log("Quiz submission response status:", response.status);
      console.log("Quiz submission response ok:", response.ok);

      // Handle different response scenarios
      if (response.ok) {
        // Try to parse response data
        let responseData;
        try {
          responseData = await response.json();
          console.log("Quiz submission response data:", responseData);
        } catch (parseError) {
          console.warn(
            "Failed to parse response as JSON, using text:",
            parseError
          );
          responseData = { message: await response.text() };
        }

        // Successful submission - navigate to results with backend data
        navigate("/results", {
          state: {
            userAnswers,
            completed: isCompleted,
            failedLevel: isCompleted ? null : finalLevel,
            backendResponse: responseData,
          },
          replace: true, // Prevent back navigation to quiz
        });
      } else if (response.status === 400) {
        // Handle 400 errors (bad request, pin issues)
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: await response.text() };
        }

        console.log("400 error response:", errorData);

        if (errorData.matchStatus === false) {
          // Pin verification failed
          navigate("/results", {
            state: {
              error:
                "Quiz submission failed: Invalid or expired PIN. The quiz may have been reset by the administrator. Please contact support.",
              userAnswers,
              completed: isCompleted,
              failedLevel: isCompleted ? null : finalLevel,
            },
            replace: true,
          });
        } else {
          // Other 400 errors
          navigate("/results", {
            state: {
              error: `Quiz submission failed: ${
                errorData.message || "Bad request. Please try again."
              }`,
              userAnswers,
              completed: isCompleted,
              failedLevel: isCompleted ? null : finalLevel,
            },
            replace: true,
          });
        }
      } else if (response.status === 401 || response.status === 403) {
        // Authentication/Authorization errors
        console.error("Authentication error during quiz submission");
        navigate("/results", {
          state: {
            error:
              "Session expired or unauthorized access. You may have been logged in from another device. Please restart the quiz.",
            userAnswers,
            completed: isCompleted,
            failedLevel: isCompleted ? null : finalLevel,
          },
          replace: true,
        });
      } else if (response.status >= 500) {
        // Server errors
        const errorData = await response.text();
        console.error("Server error during quiz submission:", errorData);
        navigate("/results", {
          state: {
            error:
              "Server error occurred. Please try again later or contact support.",
            userAnswers,
            completed: isCompleted,
            failedLevel: isCompleted ? null : finalLevel,
          },
          replace: true,
        });
      } else {
        // Other unexpected status codes
        const errorData = await response.text();
        console.error(
          "Unexpected response status:",
          response.status,
          errorData
        );
        throw new Error(`Unexpected server response: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);

      // Determine error type for better user messaging
      let errorMessage = "Failed to submit quiz results. ";

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        errorMessage +=
          "Network connection failed. Please check your internet connection and try again.";
      } else if (error.message.includes("Access code not found")) {
        errorMessage += "Session expired. Please restart the quiz.";
      } else {
        errorMessage += error.message;
      }

      // Navigate to results with error
      navigate("/results", {
        state: {
          error: errorMessage,
          userAnswers,
          completed: isCompleted,
          failedLevel: isCompleted ? null : finalLevel,
        },
        replace: true, // Prevent back navigation to quiz
      });
    }
  };

  const handleLevelComplete = () => {
    console.log("Level completion debug:");
    console.log("- levelPassed:", levelPassed);
    console.log("- currentLevel:", currentLevel);
    console.log("- highestLevelCleared before update:", highestLevelCleared);

    if (levelPassed && currentLevel < 3) {
      // Level passed - update highest level cleared and move to next level
      console.log(
        "- Player passed level",
        currentLevel,
        "moving to next level"
      );
      setHighestLevelCleared(currentLevel);
      setCurrentLevel(currentLevel + 1);
      setCurrentQuestionIndex(0);
      setSelectedAnswer("");
      setShowLevelResult(false);
      setLevelPassed(false);
    } else if (levelPassed && currentLevel === 3) {
      // All levels completed successfully - submit to backend
      console.log("- Player completed all levels, submitting results");
      setHighestLevelCleared(3);
      submitQuizResults(true, 3, 3);
    } else {
      // Failed current level - submit with highest level cleared so far
      console.log(
        "- Player failed level",
        currentLevel,
        "submitting with highest cleared:",
        highestLevelCleared
      );
      submitQuizResults(false, currentLevel, highestLevelCleared);
    }
  };

  if (showLevelResult) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6">
            Level {currentLevel} {levelPassed ? "Completed! 🎉" : "Failed 😞"}
          </h2>

          {levelPassed ? (
            <div className="text-green-600 mb-6">
              <p className="text-lg mb-4">
                Excellent work! All answers correct!
              </p>
              {currentLevel < 3 ? (
                <div>
                  <p className="mb-4">Ready for Level {currentLevel + 1}?</p>
                  <p className="text-sm text-blue-600 mb-4">
                    🏆 You&apos;ve earned a prize for completing Level{" "}
                    {currentLevel}! You can claim it now or continue for a
                    chance at higher prizes.
                  </p>
                </div>
              ) : (
                <p>Congratulations! You have completed all levels!</p>
              )}
            </div>
          ) : (
            <div className="text-red-600 mb-6">
              <p className="text-lg mb-4">Some answers were incorrect.</p>
              <p>You cannot proceed to the next level.</p>
              {highestLevelCleared > 0 && (
                <p className="text-blue-600 mt-2">
                  🏆 But you&apos;ve earned a prize for completing Level{" "}
                  {highestLevelCleared}!
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3">
            {levelPassed && currentLevel < 3 && (
              <>
                <button
                  onClick={() => {
                    // Claim prize and submit results for current level
                    setHighestLevelCleared(currentLevel);
                    submitQuizResults(false, currentLevel, currentLevel);
                  }}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-medium"
                >
                  🏆 Claim Prize & Exit (Level {currentLevel} Complete)
                </button>
                <button
                  onClick={handleLevelComplete}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
                >
                  Continue to Level {currentLevel + 1}
                </button>
              </>
            )}

            {((levelPassed && currentLevel === 3) || !levelPassed) && (
              <button
                onClick={handleLevelComplete}
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition duration-200 font-medium"
              >
                {levelPassed && currentLevel === 3
                  ? "Complete Quiz"
                  : highestLevelCleared > 0
                  ? "Claim Your Prize"
                  : "View Results"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-orange-800 mb-2">
            Level {currentLevel} - Question {currentQuestionIndex + 1} of{" "}
            {currentQuestions.length}
          </h1>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / currentQuestions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestion?.questionText}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion?.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition duration-200 ${
                  selectedAnswer === option
                    ? "border-orange-500 bg-orange-50 text-orange-800"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                }`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="text-center">
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className={`px-8 py-3 rounded-lg font-medium transition duration-200 ${
              selectedAnswer
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentQuestionIndex < currentQuestions.length - 1
              ? "Next Question"
              : "Submit Level"}
          </button>
        </div>

        {/* Level Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            💡 Answer all questions correctly to advance to the next level
          </p>
        </div>
      </div>
    </div>
  );
}
