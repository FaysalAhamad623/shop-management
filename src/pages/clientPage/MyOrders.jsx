import { useEffect, useState } from "react";
import { getOrders } from "../../store/orderStore";

export default function MyOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = getOrders();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const userOrders = allOrders.filter(
      (o) => o.userEmail === currentUser.email
    );

    setOrders(userOrders);
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
            <div key={order.id} className="bg-white p-5 rounded-xl shadow">
              <p><b>ID:</b> #{order.id}</p>
              <p><b>Date:</b> {order.date}</p>
              <p><b>Status:</b> {order.status}</p>
              <p><b>Total:</b> ${order.total}</p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}