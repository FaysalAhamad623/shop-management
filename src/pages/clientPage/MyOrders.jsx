import { useEffect, useState } from "react";
import { getOrders } from "../../store/orderStore";

export default function MyOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = getOrders();
    console.log("ORDERS:", data); // 🔥 debug
    setOrders(data);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6 text-green-700">
        🌿 Your Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders yet 😢</p>
      ) : (
        <div className="space-y-4">

          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500"
            >

              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID: #{order.id}
                  </p>
                  <p className="font-bold">
                    {order.date}
                  </p>
                </div>

                <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  {order.status}
                </span>
              </div>

              <div className="mt-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-3 font-bold text-green-600">
                <span>Total:</span>
                <span>${order.total}</span>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}