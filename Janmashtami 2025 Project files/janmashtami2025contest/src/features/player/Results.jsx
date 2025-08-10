import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { playerStorage } from "../../utils/playerStorage";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get player data from localStorage
  const playerData = playerStorage.getPlayerData();

  const {
    userAnswers = [],
    completed = false,
    failedLevel = null,
    backendResponse = null,
    error = null,
  } = location.state || {};

  // If there's an error (submission failed or unauthorized), show error message
  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Submission Error
          </h1>
          <p className="text-lg text-gray-700 mb-6">{error}</p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/start")}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-200 font-medium"
            >
              🔄 Try Again
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200 font-medium"
            >
              🏠 Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate results
  const totalQuestions = userAnswers.length;
  const correctAnswers = userAnswers.filter(
    (answer) => answer.isCorrect
  ).length;

  // Use prize code from backend response if available, otherwise generate one
  const prizeCode =
    backendResponse?.prizeCode ||
    (completed
      ? `KRISHNA-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
      : null);

  const handleExit = () => {
    // Navigate back to home page and replace history to prevent back navigation
    navigate("/", { replace: true });
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {completed ? (
              <span className="text-green-600">
                🏆 Quiz Completed Successfully!
              </span>
            ) : prizeCode ? (
              <span className="text-orange-600">🎉 Great Performance!</span>
            ) : (
              <span className="text-red-600">📊 Quiz Results</span>
            )}
          </h1>

          {completed ? (
            <p className="text-lg text-gray-700">
              Congratulations! You have successfully completed all three levels!
            </p>
          ) : prizeCode ? (
            <p className="text-lg text-gray-700">
              {backendResponse?.levelCleared
                ? `You completed Level ${backendResponse.levelCleared} and earned a prize!`
                : "You earned a prize for your performance!"}
            </p>
          ) : (
            <p className="text-lg text-gray-700">
              Quiz ended at Level {failedLevel}. Better luck next time!
            </p>
          )}
        </div>

        {/* Backend Submission Status */}
        {backendResponse && (
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
            <h2 className="text-xl font-bold text-center text-blue-800 mb-4">
              ✅ Submission Confirmed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {(backendResponse.name || playerData.name) && (
                <div>
                  <strong className="text-blue-700">Name:</strong>
                  <p className="text-gray-700">
                    {backendResponse.name || playerData.name}
                  </p>
                </div>
              )}
              {(backendResponse.mobileNumber || playerData.mobileNumber) && (
                <div>
                  <strong className="text-blue-700">Mobile:</strong>
                  <p className="text-gray-700">
                    {backendResponse.mobileNumber || playerData.mobileNumber}
                  </p>
                </div>
              )}
              <div>
                <strong className="text-blue-700">Level Cleared:</strong>
                <p className="text-gray-700">{backendResponse.levelCleared}</p>
              </div>
              {backendResponse.submittedAt && (
                <div>
                  <strong className="text-blue-700">Submitted At:</strong>
                  <p className="text-gray-700">
                    {new Date(backendResponse.submittedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-blue-800">
              Total Questions
            </h3>
            <p className="text-2xl font-bold text-blue-600">{totalQuestions}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-green-800">
              Correct Answers
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {correctAnswers}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-orange-800">Accuracy</h3>
            <p className="text-2xl font-bold text-orange-600">
              {totalQuestions > 0
                ? Math.round((correctAnswers / totalQuestions) * 100)
                : 0}
              %
            </p>
          </div>
        </div>

        {/* Level-wise Results */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Level-wise Performance:
          </h2>

          {[1, 2, 3].map((level) => {
            const levelAnswers = userAnswers.filter((a) => a.level === level);
            const levelCorrect = levelAnswers.filter((a) => a.isCorrect).length;
            const levelTotal = levelAnswers.length;
            const levelPassed = levelTotal > 0 && levelCorrect === levelTotal;

            if (levelTotal === 0) return null;

            return (
              <div key={level} className="mb-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">Level {level}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      levelPassed
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {levelPassed ? "✅ Passed" : "❌ Failed"}
                  </span>
                </div>
                <p className="text-gray-600">
                  {levelCorrect} out of {levelTotal} questions correct
                </p>
              </div>
            );
          })}
        </div>

        {/* Detailed Question Review */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Question Review:
          </h2>
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {userAnswers.map((answer, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  answer.isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 mb-2">
                      Level {answer.level}: {answer.question}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Your Answer:</strong> {answer.selectedAnswer}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Correct Answer:</strong> {answer.correctAnswer}
                    </p>
                  </div>
                  <span className="text-2xl">
                    {answer.isCorrect ? "✅" : "❌"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prize Section */}
        {prizeCode && (
          <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300">
            <h2 className="text-2xl font-bold text-center text-orange-800 mb-4">
              🎁 Congratulations! You Won a Prize!
            </h2>
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-2">
                Your Prize Code for Krishna Merchandise:
              </p>
              {backendResponse?.levelCleared && (
                <p className="text-sm text-blue-600 mb-4">
                  🏆 Level {backendResponse.levelCleared} Completed!
                </p>
              )}
              <div className="bg-white p-4 rounded-lg border-2 border-dashed border-orange-400 inline-block">
                <p className="text-2xl font-bold text-orange-600 tracking-wider">
                  {prizeCode}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Present this code at the temple to claim your prize! 🎊
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center">
          <button
            onClick={handleExit}
            className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 font-medium"
          >
            🚪 Exit Application
          </button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            🙏 Thank you for participating in the Krishna Janmashtami Quiz!
          </p>
          <p className="text-sm text-gray-600">Hare Krishna! 🕉️</p>
        </div>
      </div>
    </div>
  );
}
