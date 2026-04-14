import { useEffect, useState } from "react";
import { getOrders } from "../store/orderStore";

export default function Customers() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const orders = getOrders();

    // 🔥 group by customer (phone as unique)
    const map = {};

    orders.forEach((order) => {
      const key = order.phone;

      if (!map[key]) {
        map[key] = {
          name: order.name,
          phone: order.phone,
          email: order.email || "N/A",
          orders: 1,
          total: Number(order.total),
        };
      } else {
        map[key].orders += 1;
        map[key].total += Number(order.total);
      }
    });

    setCustomers(Object.values(map));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">
        👥 Customers
      </h1>

      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Email</th>
            <th className="p-2">Orders</th>
            <th className="p-2">Total Spent</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c, i) => (
            <tr key={i} className="text-center border-t">
              <td className="p-2">{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.orders}</td>
              <td>${c.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}