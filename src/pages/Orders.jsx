import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../store/orderStore";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleStatusChange = (id, status) => {
    updateOrderStatus(id, status);
    setOrders(getOrders()); // 🔥 refresh
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">
        📦 Orders
      </h1>

      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="text-center border-t">

              <td className="p-2">#{o.id}</td>
              <td>{o.name}</td>
              <td>${o.total}</td>

              {/* Status */}
              <td>
                <span className={`px-2 py-1 rounded text-white ${
                  o.status === "Delivered"
                    ? "bg-green-500"
                    : o.status === "Cancelled"
                    ? "bg-red-500"
                    : o.status === "Processing"
                    ? "bg-blue-500"
                    : "bg-yellow-500"
                }`}>
                  {o.status}
                </span>
              </td>

              {/* Update */}
              <td>
                <select
                  value={o.status}
                  onChange={(e) =>
                    handleStatusChange(o.id, e.target.value)
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}