import { useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Faysal",
      total: 120,
      status: "Pending",
    },
    {
      id: 2,
      customer: "Rahim",
      total: 250,
      status: "Delivered",
    },
    {
      id: 3,
      customer: "Karim",
      total: 80,
      status: "Processing",
    },
  ]);

  // 🔥 Status change
  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Table */}
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="text-center border-t">

              <td className="p-2">#{order.id}</td>
              <td>{order.customer}</td>
              <td>${order.total}</td>

              {/* Status */}
              <td>
                <span
                  className={`px-2 py-1 rounded text-white ${
                    order.status === "Pending"
                      ? "bg-yellow-500"
                      : order.status === "Processing"
                      ? "bg-blue-500"
                      : order.status === "Delivered"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {order.status}
                </span>
              </td>

              {/* Change status */}
              <td>
                <select
                  className="border p-1"
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
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