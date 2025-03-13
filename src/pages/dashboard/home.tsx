import { useState } from "react";
import {} from "@heroicons/react/24/outline";
import { Sidebar } from "./sidebar";

function Dashboard() {
  const [user] = useState({ name: "John Doe", email: "johndoe@example.com" });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">Here is your dashboard overview.</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Health Score</h3>
            <p className="text-4xl font-bold text-green-600">87%</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Completed Sessions</h3>
            <p className="text-4xl font-bold text-blue-600">24</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
            <p className="text-4xl font-bold text-orange-600">3</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
