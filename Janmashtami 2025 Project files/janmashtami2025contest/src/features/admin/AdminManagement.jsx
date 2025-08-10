import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../userSlice.js";
import { API_ENDPOINTS } from "../../config/api.js";

export default function AdminManagement() {
  const [activeTab, setActiveTab] = useState("create");
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Create admin form state
  const [createForm, setCreateForm] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const authErrorShownRef = useRef(false);
  const { userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAuthError = () => {
    if (!authErrorShownRef.current) {
      authErrorShownRef.current = true;
      alert("Session expired. Please login again.");
      dispatch(logout());
      navigate("/login");
    }
  };

  // Fetch all admins when component mounts or when switching to view tab
  useEffect(() => {
    if (activeTab === "view") {
      fetchAllAdmins();
    }
  }, [activeTab]);

  const fetchAllAdmins = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("Fetching all admins...");

      const response = await fetch(API_ENDPOINTS.ADMIN.GET_ALL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      console.log(`Get admins response status: ${response.status}`);

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Admins data:", data);

        // Handle Iterable<Admin> response - convert to array if needed
        let adminArray = [];
        if (Array.isArray(data)) {
          adminArray = data;
        } else if (
          data &&
          typeof data === "object" &&
          Symbol.iterator in data
        ) {
          // Handle if it's an iterable object
          adminArray = Array.from(data);
        } else if (data && typeof data === "object") {
          // Handle if it's a single object wrapped
          adminArray = [data];
        }

        console.log("Processed admin array:", adminArray);
        setAdmins(adminArray);
      } else {
        const errorData = await response.text();
        console.error("Failed to fetch admins:", errorData);
        setError("Failed to fetch admins");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      setError("Network error occurred while fetching admins");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (!createForm.name || !createForm.password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (createForm.password !== createForm.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (createForm.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      console.log("Creating/updating admin with data:", {
        name: createForm.name,
        password: "***hidden***",
      });

      const response = await fetch(API_ENDPOINTS.ADMIN.CREATE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          name: createForm.name,
          password: createForm.password,
        }),
      });

      console.log(`Create admin response status: ${response.status}`);

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Admin created/updated successfully:", data);
        setSuccess("Admin created/updated successfully!");
        setCreateForm({
          name: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        const errorData = await response.text();
        console.error("Failed to create/update admin:", errorData);
        setError(errorData || "Failed to create/update admin");
      }
    } catch {
      console.error("Error creating/updating admin");
      setError("Network error occurred while creating/updating admin");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Management
        </h1>
        <p className="text-gray-600">
          Create new admin users and manage existing administrators
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("create")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "create"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              ➕ Create/Update Admin
            </button>
            <button
              onClick={() => setActiveTab("view")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "view"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              👥 View All Admins
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Success/Error Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          {/* Create/Update Admin Tab */}
          {activeTab === "create" && (
            <div className="max-w-md mx-auto">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> If an admin with this name already
                  exists, their password will be updated. If the admin
                  doesn&apos;t exist, a new admin will be created.
                </p>
              </div>
              <form onSubmit={handleCreateAdmin} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Admin Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={createForm.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter admin name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={createForm.password}
                    onChange={handleInputChange}
                    required
                    minLength="6"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter password (min 6 characters)"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={createForm.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Confirm password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Create/Update Admin"}
                </button>
              </form>
            </div>
          )}

          {/* View All Admins Tab */}
          {activeTab === "view" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  All Administrators
                </h3>
                <button
                  onClick={fetchAllAdmins}
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 font-medium text-sm disabled:bg-gray-400"
                >
                  {loading ? "Loading..." : "🔄 Refresh"}
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⏳</div>
                  <p className="text-gray-500 text-lg">Loading admins...</p>
                </div>
              ) : admins.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {admins.map((admin, index) => (
                        <tr
                          key={admin.id || index}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {admin.id || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {admin.name || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👥</div>
                  <p className="text-gray-500 text-lg">
                    No administrators found
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Create a new admin using the &ldquo;Create Admin&rdquo; tab
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
