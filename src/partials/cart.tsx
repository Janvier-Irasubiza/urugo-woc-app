import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Handwoven Basket",
      price: 45,
      quantity: 2,
      image: "https://source.unsplash.com/100x100/?basket",
    },
    {
      id: 2,
      name: "Eco-Friendly Mug",
      price: 25,
      quantity: 1,
      image: "https://source.unsplash.com/100x100/?mug",
    },
  ]);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-blue-900">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">
          Your cart is currently empty.
        </p>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-500">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-xl font-bold text-orange-600">
              ${totalPrice}
            </span>
          </div>

          {/* Checkout Button */}
          <button className="w-full py-3 mt-4 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
