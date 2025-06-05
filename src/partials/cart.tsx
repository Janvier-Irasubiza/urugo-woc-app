import { TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "../contexts/cart";
import { formatNumber } from "../configs/app";

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 space-y-12">
      <h2 className="text-3xl font-bold text-primary">My Shopping Cart</h2>

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
                      {formatNumber(item.price)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
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
            <span className="text-xl font-bold text-secondary">
              {formatNumber(totalPrice)}
            </span>
          </div>

          {/* Checkout Button */}
          <button className="w-full py-3 mt-4 rounded-full btn-primary text-white transition">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
