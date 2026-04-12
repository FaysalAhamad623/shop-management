import { useState } from "react";

export default function ClientOrder() {

  const [orders] = useState([
    {
      id: 1,
      date: "2026-04-10",
      status: "Delivered",
      total: 120,
    },
    {
      id: 2,
      date: "2026-04-11",
      status: "Pending",
      total: 80,
    },
  ]);

  return (
    <div className="p-6 bg-green-50 min-h-screen">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        🌿 Your Orders
      </h1>

      {/* Orders list */}
      <div className="space-y-4">

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 rounded-xl shadow-md border-l-4 border-green-400 hover:shadow-lg transition"
          >

            <div className="flex justify-between items-center">

              {/* Left */}
              <div>
                <p className="text-sm text-gray-500">
                  Order ID: #{order.id}
                </p>

                <p className="font-semibold text-lg">
                  {order.date}
                </p>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

            </div>

            {/* Bottom */}
            <div className="flex justify-between mt-4">

              <span className="text-gray-600">
                Total:
              </span>

              <span className="font-bold text-green-600">
                ${order.total}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}