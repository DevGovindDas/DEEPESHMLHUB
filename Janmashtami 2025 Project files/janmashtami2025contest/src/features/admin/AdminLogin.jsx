import React, { useEffect } from "react";
import {
  Form,
  redirect,
  useNavigation,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../../store/store.js";
import {
  setAdminName,
  setUserType,
  setUserToken,
  login,
} from "../userSlice.js";
import FormElement from "../../components/common/FormElement.jsx";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import { API_ENDPOINTS } from "../../config/api.js";

// Action function to handle admin login form submission
export async function adminLoginAction({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const password = formData.get("password");

  if (name && password) {
    try {
      console.log("Attempting login to:", API_ENDPOINTS.ADMIN.LOGIN);
      console.log("Admin login attempt:", { name, password });

      const response = await fetch(API_ENDPOINTS.ADMIN.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        throw new Error(`Login failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Login response data:", data);

      // Check if login was successful and user is admin
      if (data.loginType === "ADMIN" && data.token) {
        store.dispatch(setAdminName(data.userName));
        store.dispatch(setUserType("admin"));
        store.dispatch(setUserToken(data.token));
        store.dispatch(login());

        return redirect("/dashboard");
      } else if (data.loginType === "USER") {
        // User credentials are valid but not admin
        return {
          error:
            "Access denied. This login is for administrators only. Please use admin credentials.",
        };
      } else if (!data.token) {
        // No token returned
        return {
          error: "Login failed. Invalid credentials or server error.",
        };
      }

      return {
        error: "Unexpected login response. Please try again.",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        error: error.message || "Invalid credentials or server error",
      };
    }
  } else {
    return {
      error: "Please fill in all required fields",
    };
  }
}

export default function AdminLogin() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();
  const { loggedIn, userType } = useSelector((state) => state.user);

  const isSubmitting = navigation.state === "submitting";
  const isLoading = navigation.state === "loading";

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (loggedIn && userType === "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [loggedIn, userType, navigate]);

  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-white rounded-lg px-4 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        {/* Error Message */}
        <ErrorMessage
          message={actionData?.error}
          type="error"
          className="mb-4"
        />

        <Form method="post" className="space-y-6">
          {/* Username Field */}
          <FormElement
            label="Username"
            name="name"
            placeholder="Enter admin username"
            defaultValue="Admin"
            disabled={isSubmitting}
            required
          />

          {/* Password Field */}
          <FormElement
            label="Password"
            type="password"
            name="password"
            placeholder="Enter admin password"
            defaultValue="9555936977"
            disabled={isSubmitting}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 font-medium ${
              isSubmitting
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
            }`}
          >
            {isSubmitting ? (
              <LoadingSpinner text="Logging in..." />
            ) : (
              "Login as Admin 🔐"
            )}
          </button>
        </Form>

        {/* Loading State Message */}
        {isLoading && (
          <div className="mt-4 text-center">
            <p className="text-sm text-blue-600">
              Redirecting to admin dashboard...
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Administrative access to Krishna Janmashtami 2025 contest
          </p>
          <p className="text-xs text-gray-500 mt-2">
            * Authorized personnel only
          </p>
        </div>
      </div>
    </div>
  );
}
