import { useState, useEffect } from "react";
import {
  UserIcon,
  LockClosedIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { Sidebar } from "./sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const [profileFormData, setProfileFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  const [passwordFormData, setPasswordFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // For sidebar display (combined name)
  const [user, setUser] = useState({
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
  });

  // Load user data on component mount
  useEffect(() => {
    const storedFirstName = localStorage.getItem("first_name") || "";
    const storedLastName = localStorage.getItem("last_name") || "";
    const storedEmail = localStorage.getItem("email") || "";
    const storedPhone = localStorage.getItem("phone_number") || "";

    setProfileFormData({
      first_name: storedFirstName,
      last_name: storedLastName,
      email: storedEmail,
      phone_number: storedPhone,
    });
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileFormData({ ...profileFormData, [name]: value });

    // Format phone number if needed
    if (name === "phone_number") {
      // Remove non-digits and plus sign (except at beginning)
      const formattedPhone = value.replace(/[^\d+]/g, "");
      if (formattedPhone !== value) {
        setProfileFormData({
          ...profileFormData,
          phone_number: formattedPhone,
        });
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFormData({ ...passwordFormData, [name]: value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");
    setProfileLoading(true);    

    try {
      // Prepare request body
      const requestBody = {
        first_name: profileFormData.first_name,
        last_name: profileFormData.last_name,
        phone_number: profileFormData.phone_number,
      };

      // Get user ID from localStorage or from API
      const userId = localStorage.getItem("user_id") || "";

      if (!userId) {
        throw new Error("User ID not found. Please login again.");
      }

      const response = await axios.put(
        `http://localhost:8000/api/users/${userId}/`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        // Update localStorage with new values
        localStorage.setItem("first_name", profileFormData.first_name);
        localStorage.setItem("last_name", profileFormData.last_name);
        localStorage.setItem("phone_number", profileFormData.phone_number);
        localStorage.setItem(
          "name",
          `${profileFormData.first_name} ${profileFormData.last_name}`
        );

        // Update sidebar user info
        setUser({
          name: `${profileFormData.first_name} ${profileFormData.last_name}`,
          email: profileFormData.email,
        });

        setProfileSuccess("Profile updated successfully!");
      }

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/");
      }
    } catch (err: any) {
      setProfileError("Failed to update profile. Please try again.");
      if (err.response.status === 401 || err.response.status === 403) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/");
      }
      console.log(err);
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    setPasswordLoading(true);

    // Validate passwords match
    if (passwordFormData.new_password !== passwordFormData.confirm_password) {
      setPasswordError("New passwords do not match");
      setPasswordLoading(false);
      return;
    }

    try {
      // Prepare request body
      const requestBody = {
        password: passwordFormData.current_password,
        new_password: passwordFormData.new_password,
      };

      // Get user ID from localStorage or from API
      const userId = localStorage.getItem("user_id") || "";

      if (!userId) {
        throw new Error("User ID not found. Please login again.");
      }

      const response = await axios.post(
        `http://localhost:8000/api/users/${userId}/change-password/`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        setPasswordSuccess("Password updated successfully!");
        // Clear password form
        setPasswordFormData({
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
      }
    } catch (err: any) {
      setPasswordError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to update password. Please verify current password is correct."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar user={user} active="settings" />

      {/* Main Settings Panel */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Information Section */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Profile Information
            </h2>

            {profileError && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                {profileError}
              </div>
            )}

            {profileSuccess && (
              <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                {profileSuccess}
              </div>
            )}

            {/* Profile Form */}
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block font-semibold text-gray-700">
                    First Name
                  </label>
                  <div className="flex items-center border rounded-lg p-3">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="text"
                      name="first_name"
                      value={profileFormData.first_name}
                      onChange={handleProfileChange}
                      className="flex-1 outline-none bg-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-semibold text-gray-700">
                    Last Name
                  </label>
                  <div className="flex items-center border rounded-lg p-3">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="text"
                      name="last_name"
                      value={profileFormData.last_name}
                      onChange={handleProfileChange}
                      className="flex-1 outline-none bg-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-gray-700">
                  Email
                </label>
                <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="email"
                    name="email"
                    value={profileFormData.email}
                    className="flex-1 outline-none bg-transparent text-gray-500"
                    disabled
                  />
                </div>
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-gray-700">
                  Phone Number
                </label>
                <div className="flex items-center border rounded-lg p-3">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="tel"
                    name="phone_number"
                    value={profileFormData.phone_number}
                    onChange={handleProfileChange}
                    className="flex-1 outline-none bg-transparent"
                    placeholder="+999999999"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Format: +999999999 (up to 15 digits)
                </p>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full py-3 btn-primary text-white rounded-lg font-semibold transition disabled:bg-blue-400"
                disabled={profileLoading}
              >
                {profileLoading ? "Saving..." : "Update Profile"}
              </button>
            </form>
          </div>

          {/* Password Section */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Change Password
            </h2>

            {passwordError && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                {passwordSuccess}
              </div>
            )}

            {/* Password Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block font-semibold text-gray-700">
                  Current Password
                </label>
                <div className="flex items-center border rounded-lg p-3">
                  <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="password"
                    name="current_password"
                    value={passwordFormData.current_password}
                    onChange={handlePasswordChange}
                    className="flex-1 outline-none bg-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-gray-700">
                  New Password
                </label>
                <div className="flex items-center border rounded-lg p-3">
                  <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="password"
                    name="new_password"
                    value={passwordFormData.new_password}
                    onChange={handlePasswordChange}
                    className="flex-1 outline-none bg-transparent"
                    required
                    minLength={6}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Must be at least 6 characters
                </p>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-gray-700">
                  Confirm New Password
                </label>
                <div className="flex items-center border rounded-lg p-3">
                  <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="password"
                    name="confirm_password"
                    value={passwordFormData.confirm_password}
                    onChange={handlePasswordChange}
                    className="flex-1 outline-none bg-transparent"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full py-3 btn-primary text-white rounded-lg font-semibold transition disabled:bg-blue-400"
                disabled={passwordLoading}
              >
                {passwordLoading ? "Updating..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
