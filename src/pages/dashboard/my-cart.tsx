import { useState } from "react";
import Cart from "../../partials/cart";
import { Sidebar } from "./sidebar";

function MyCart() {
  const [user] = useState({
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
  });
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar user={user} active="cart" />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Cart />
        </div>
      </main>
    </div>
  );
}

export default MyCart;
