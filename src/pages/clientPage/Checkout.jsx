import { useState } from "react";

import { cart } from "../../store/cartStore";
export default function Checkout() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Order Placed Successfully 🎉");

    // optional clear cart
    cart.length = 0;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">🧾 Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* 🔥 Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >

          <h2 className="text-xl font-bold">Customer Info</h2>

          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <textarea
            placeholder="Address"
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          {/* 🔥 Payment */}
          <select
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, payment: e.target.value })
            }
          >
            <option>Cash</option>
            <option>bKash</option>
            <option>Nagad</option>
          </select>

          <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Place Order
          </button>
        </form>

        {/* 🔥 Summary */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-3" />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total}</span>
          </div>

        </div>

      </div>

    </div>
  );
}