import React from "react";
import { Form, redirect, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FormElement from "../../components/common/FormElement";
import { playerStorage } from "../../utils/playerStorage";

// Action function to handle form submission
export async function signInFormAction({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const mobile = formData.get("mobile");

  if (name && mobile) {
    // Save player data to localStorage
    playerStorage.savePlayerData(name, mobile);

    // Redirect directly to start page
    return redirect("/start");
  } else {
    throw new Error("Please fill in all required fields");
  }
}

export default function SignInForm() {
  // Load existing player data to pre-fill form
  const existingPlayerData = playerStorage.getPlayerData();

  // Check if admin is already logged in
  const { loggedIn, userType } = useSelector((state) => state.user);
  console.log(loggedIn, userType);

  const isAdminLoggedIn = loggedIn && userType === "admin";
  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-white rounded-lg px-4 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Join Krishna Janmashtami 2025
        </h2>

        <Form method="post" className="space-y-6">
          {/* Name Field */}
          <FormElement
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            defaultValue={existingPlayerData.name}
            required
          />

          {/* Mobile Field */}
          <FormElement
            label="Mobile Number"
            type="tel"
            name="mobile"
            placeholder="Enter 10-digit mobile number"
            defaultValue={existingPlayerData.mobileNumber}
            pattern="[0-9]{10}"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-200 font-medium"
          >
            Join 🎉
          </button>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Join us in celebrating the divine birth of Lord Krishna
          </p>
          <p className="text-xs text-gray-500 mt-2">* Required fields</p>

          {/* Admin Login Link */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Administrative Access</p>
            <Link
              to={isAdminLoggedIn ? "/dashboard" : "/login"}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium underline transition-colors duration-150"
            >
              {isAdminLoggedIn ? "🏠 Admin Dashboard" : "🔐 Admin Login"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
