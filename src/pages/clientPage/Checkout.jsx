import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

export default function Checkout() {

  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // 🔥 Modal state
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cash",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🔥 Place order click
  const handleOrder = () => {
    console.log("CLICKED");

    if (!form.name || !form.phone || !form.address) {
      showToast("Please fill all fields ❌", "error");
      return;
    }

    if (cart.length === 0) {
      showToast("Cart is empty ❌", "error");
      return;
    }

    // 🔥 show modal
    setShowModal(true);
  };

  // 🔥 Confirm order
  const confirmOrder = () => {
    clearCart();
    setShowModal(false);

    showToast("Order placed successfully 🎉");

    setTimeout(() => {
      navigate("/home");
    }, 700);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        🧾 Checkout
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {/* 🧍 Form */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">
            Customer Info
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Phone"
              className="w-full border p-2 rounded"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <textarea
              placeholder="Address"
              className="w-full border p-2 rounded"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            {/* 💳 Payment */}
            <div>
              <p className="mb-2 font-semibold">Payment Method</p>

              <div className="flex gap-4">

                <button
                  type="button"
                  onClick={() =>
                    setForm({ ...form, payment: "cash" })
                  }
                  className={`px-4 py-2 rounded ${
                    form.payment === "cash"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Cash
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm({ ...form, payment: "card" })
                  }
                  className={`px-4 py-2 rounded ${
                    form.payment === "card"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Card
                </button>

              </div>
            </div>

          </div>

        </div>

        {/* 💰 Summary */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">

          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} x{item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-3" />

          <h3 className="font-bold text-lg mb-4">
            Total: ${total}
          </h3>

          <button
            type="button"
            onClick={handleOrder}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 active:scale-95 transition"
          >
            Place Order
          </button>

        </div>

      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-xl shadow-lg w-[300px] text-center">

            <h2 className="text-xl font-bold mb-3">
              Confirm Order
            </h2>

            <p className="text-gray-600 mb-4">
              Cash on Delivery?
            </p>

            <div className="flex justify-center gap-4">

              <button
                onClick={confirmOrder}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                Confirm
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-1 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}