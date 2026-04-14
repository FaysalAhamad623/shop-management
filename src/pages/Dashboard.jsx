import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getOrders, updateOrderStatus, deleteOrder } from "../store/orderStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
export default function Dashboard() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const refresh = () => setOrders(getOrders());

  const changeStatus = (id, status) => {
    updateOrderStatus(id, status);
    refresh();
  };
  const navigate = useNavigate();
  const chartData = orders.map((o) => ({
    date: new Date(o.date).toLocaleDateString(),
    total: o.total,
  }));
  const handleDelete = (id) => {
    deleteOrder(id);
    refresh();
  };
  // 🔥 Analytics
  const totalOrders = orders.length;

  const totalSales = orders.reduce(
    (sum, o) => sum + Number(o.total || 0),
    0
  );

  const pending = orders.filter(o => o.status === "Pending").length;
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const cancelled = orders.filter(o => o.status === "Cancelled").length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        📊 Admin Dashboard
      </h1>
      

      {/* 🔥 Analytics Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Sales</h2>
          <p className="text-2xl font-bold">${totalSales}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-xl">
          <h2>Pending</h2>
          <p className="text-xl font-bold">{pending}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-xl">
          <h2>Delivered</h2>
          <p className="text-xl font-bold">{delivered}</p>
        </div>

        <div className="bg-red-100 p-4 rounded-xl">
          <h2>Cancelled</h2>
          <p className="text-xl font-bold">{cancelled}</p>
        </div>


      </div>
      <div className="bg-white p-5 rounded-xl shadow mb-6">

        <h2 className="text-xl font-bold mb-4">
          📈 Sales Overview
        </h2>

        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#3b82f6" />
        </LineChart>

      </div>

      {/* 🔥 Orders List */}
      {orders.length === 0 ? (
        <p>No orders found 😢</p>
      ) : (
        <div className="space-y-4">

          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold">
                  Order #{order.id}
                </h2>

                <span className={`px-3 py-1 rounded text-sm ${order.status === "Delivered"
                  ? "bg-green-100 text-green-600"
                  : order.status === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                  }`}>
                  {order.status}
                </span>
              </div>

              <p className="text-gray-500 text-sm mb-2">
                {order.date}
              </p>

              <p className="mb-2 font-semibold">
                Payment: {order.payment}
              </p>

              <p className="mb-3 font-bold">
                Total: ${order.total}
              </p>

              {/* Items */}
              <div className="mb-3">
                {order.items.map((item) => (
                  <p key={item.id} className="text-sm">
                    {item.name} x{item.quantity}
                  </p>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">

                <button
                  onClick={() => changeStatus(order.id, "Delivered")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Delivered
                </button>

                <button
                  onClick={() => changeStatus(order.id, "Cancelled")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="bg-black text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}