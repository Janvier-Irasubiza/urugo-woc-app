import { useState } from "react";
import {} from "@heroicons/react/24/outline";
import { Sidebar } from "./sidebar";

function Dashboard() {
  const [user] = useState({
    name:
      `${localStorage.getItem("first_name")} ${localStorage.getItem(
        "last_name"
      )}` || "",
    email: localStorage.getItem("email") || "",
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar user={user} active="dashboard" />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">Here is your dashboard overview.</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Pending Orders</h3>
            {/* <p className="text-4xl font-bold text-green-600">87</p> */}
            <p className="text-4xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Completed Orderes</h3>
            <p className="text-4xl font-bold text-blue-600">0</p>
            {/* <p className="text-4xl font-bold text-blue-600">24</p> */}
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Dinning Appointments</h3>
            {/* <p className="text-4xl font-bold text-orange-600">3</p> */}
            <p className="text-4xl font-bold text-orange-600">0</p>
          </div>
        </div>

        {/* Recent Orders */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Order #1234</h3>
                <span className="text-sm text-green-600">Completed</span>
              </div>
              <p className="text-gray-600">2 items</p>
              <p className="text-gray-600">Total: 120 RWF</p>
              <button className="mt-4 text-blue-600 hover:text-blue-800">
                View Details
              </button>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Order #1234</h3>
                <span className="text-sm text-green-600">Completed</span>
              </div>
              <p className="text-gray-600">1 item</p>
              <p className="text-gray-600">Total: 80 RWF</p>

              <button className="mt-4 text-blue-600 hover:text-blue-800">
                View Details
              </button>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Order #1234</h3>
                <span className="text-sm text-green-600">Completed</span>
              </div>
              <p className="text-gray-600">3 items</p>
              <p className="text-gray-600">Total: 200 RWF</p>
              <button className="mt-4 text-blue-600 hover:text-blue-800">
                View Details
              </button>
            </div>
          </div> */}
          <p className="mt-4 text-gray-600">You do not have any orders</p>
        </section>

        {/* DInning appointments */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Dinning Appointments</h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Table #1</h3>
                <span className="text-sm text-green-600">Completed</span>
              </div>
              <p className="text-gray-600">2 people</p>
              <p className="text-gray-600">Time: 12:00 PM</p>
              <button className="mt-4 text-blue-600 hover:text-blue-800">
                View Details
              </button>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Table #2</h3>
                <span className="text-sm text-green-600">Completed</span>
              </div>
              <p className="text-gray-600">4 people</p>
              <p className="text-gray-600">Time: 1:00 PM</p>

              <button className="mt-4 text-blue-600 hover:text-blue-800">
                View Details
              </button>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Table #3</h3>
                <span className="text-sm text-green-600">Completed</span>
              </div>
              <p className="text-gray-600">6 people</p>
              <p className="text-gray-600">Time: 2:00 PM</p>
              <button className="mt-4 text-blue-600 hover:text-blue-800">
                View Details
              </button>
            </div>
          </div> */}
          <p className="mt-4 text-gray-600">You do not have any appointment</p>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
