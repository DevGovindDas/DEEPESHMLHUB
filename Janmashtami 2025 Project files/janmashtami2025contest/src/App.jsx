import React, { useEffect, useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Test AppLayout first
import AppLayout from "./features/layout/AppLayout.jsx";

// Test userSlice next
import { validateToken } from "./features/userSlice.js";

// Test SignInForm next
import SignInForm, { signInFormAction } from "./features/player/SignInForm.jsx";

// Test AdminLogin next
import AdminLogin, { adminLoginAction } from "./features/admin/AdminLogin.jsx";

// Test all player components
import StartPage, { startPageAction } from "./features/player/StartPage.jsx";
import Quiz from "./features/player/Quiz.jsx";
import Results from "./features/player/Results.jsx";

// Test admin dashboard components
import DashboardHome from "./features/admin/DashboardHome.jsx";
import WinnerOperations from "./features/admin/WinnerOperations.jsx";
import AdminManagement from "./features/admin/AdminManagement.jsx";
import AdminDashboard from "./features/admin/AdminDashboard.jsx";

// eslint-disable-next-line react/prop-types
function ProtectedRouteInitializer({ children }) {
  const dispatch = useDispatch();
  const validationStarted = useRef(false);
  const { needsTokenValidation, userToken, isValidatingToken } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    // Validate token on protected route access if needed
    // Use ref to prevent duplicate calls during Strict Mode or remounts
    if (needsTokenValidation && userToken && !validationStarted.current) {
      console.log("Protected route accessed: Validating stored token...");
      validationStarted.current = true;
      dispatch(validateToken());
    }
  }, [dispatch, needsTokenValidation, userToken]);

  // Show loading screen while validating token for protected routes
  if (needsTokenValidation || isValidatingToken) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Verifying Session...
          </h2>
          <p className="text-gray-600">
            Please wait while we check your login status
          </p>
        </div>
      </div>
    );
  }

  return children;
}

// Route configuration for better maintainability
const publicRoutes = [
  {
    index: true,
    element: <SignInForm />,
    action: signInFormAction,
  },
  {
    path: "registerPlayer",
    element: <SignInForm />,
    action: signInFormAction,
  },
  {
    path: "login",
    element: <AdminLogin />,
    action: adminLoginAction,
  },
  {
    path: "start",
    element: <StartPage />,
    action: startPageAction,
  },
  {
    path: "quiz",
    element: <Quiz />,
  },
  {
    path: "results",
    element: <Results />,
  },
];

const dashboardRoutes = [
  {
    index: true,
    element: <DashboardHome />,
  },
  {
    path: "winners",
    element: <WinnerOperations />,
  },
  {
    path: "admins",
    element: <AdminManagement />,
  },
];

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: publicRoutes,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRouteInitializer>
        <AdminDashboard />
      </ProtectedRouteInitializer>
    ),
    children: dashboardRoutes,
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
