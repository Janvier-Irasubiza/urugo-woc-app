import { useState } from "react";
import {
  UserIcon,
  LockClosedIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { Sidebar } from "./sidebar";

function Settings() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated settings:", user);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main Settings Panel */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Settings</h2>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block font-semibold">Full Name</label>
              <div className="flex items-center border rounded-lg p-3">
                <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-semibold">Email</label>
              <div className="flex items-center border rounded-lg p-3">
                <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Password Change Section */}
            <div className="space-y-2">
              <label className="block font-semibold">Current Password</label>
              <div className="flex items-center border rounded-lg p-3">
                <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-semibold">New Password</label>
              <div className="flex items-center border rounded-lg p-3">
                <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="password"
                  name="newPassword"
                  value={user.newPassword}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Notification Settings */}
            <div className="flex items-center space-x-4 mt-4">
              <BellIcon className="h-6 w-6 text-gray-600" />
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="hidden peer" />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 relative">
                  <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-1 peer-checked:left-5 transition-all"></div>
                </div>
                <span className="ml-3 text-gray-700">Enable Notifications</span>
              </label>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
