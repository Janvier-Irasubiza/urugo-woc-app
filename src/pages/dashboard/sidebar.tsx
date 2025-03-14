import { UserCircleIcon, ChartBarIcon } from "@heroicons/react/16/solid";
import {
  ArrowRightOnRectangleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../configs/configs";

interface SidebarProps {
  user: {
    name?: string;
    email?: string;
  };
  active?: string;
}

export const Sidebar = ({ user, active }: SidebarProps) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      await axios.post(
        `${API_ENDPOINTS.LOGOUT}/`,
        { refresh: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // Always clear tokens regardless of response
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);

      // Force clear tokens even on failure
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/");
    }
  };

  return (
    <aside className="w-64 bg-white shadow-md p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <UserCircleIcon className="h-12 w-12 text-gray-600" />
        <div>
          <h2 className="text-lg font-bold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <nav className="space-y-4">
        <Link
          to="/me"
          className={`flex items-center p-3 rounded-lg ${
            active === "dashboard" ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
        >
          <ChartBarIcon className="h-5 w-5 text-gray-600 mr-2" /> Dashboard
        </Link>
        <Link
          to="/me/cart"
          className={`flex items-center p-3 hover:bg-gray-200 rounded-lg ${
            active === "cart" ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
        >
          <ShoppingCartIcon className="h-5 w-5 text-gray-600 mr-2" /> Cart
        </Link>
        {/* <Link
          to="/me/settings"
          className={`flex items-center p-3 hover:bg-gray-200 rounded-lg ${
            active === "settings" ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
        >
          <CogIcon className="h-5 w-5 text-gray-600 mr-2" /> Settings
        </Link> */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center p-3 hover:bg-red-200 rounded-lg text-red-600"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-600 mr-2" />{" "}
          Logout
        </button>
      </nav>
    </aside>
  );
};
