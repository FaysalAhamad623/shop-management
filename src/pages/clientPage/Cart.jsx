import { useState } from "react";
import { cart as initialCart } from "../../store/cartStore";
export default function Cart() {

  const [cart, setCart] = useState([...initialCart]);

  // 🔥 Increase qty
  const increase = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // 🔥 Decrease qty
  const decrease = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  // 🔥 Remove item
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // 🔥 Total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* 🔥 Cart Items */}
        <div className="md:col-span-2 space-y-4">

          {cart.map(item => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow flex items-center justify-between hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  className="w-16 h-16 rounded object-cover"
                />

                <div>
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="text-gray-500">${item.price}</p>
                </div>
              </div>

              {/* 🔥 Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrease(item.id)}
                  className="px-2 bg-gray-300 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increase(item.id)}
                  className="px-2 bg-gray-300 rounded"
                >
                  +
                </button>
              </div>

              {/* ❌ Remove */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:scale-110"
              >
                ✕
              </button>
            </div>
          ))}

        </div>

        {/* 🔥 Summary Card */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">

          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Total Price</span>
            <span className="font-bold">${total}</span>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Checkout
          </button>

        </div>

      </div>

    </div>
  );
}