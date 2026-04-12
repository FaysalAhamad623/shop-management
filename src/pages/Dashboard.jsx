import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Demo Data
  const stats = {
    totalSales: 5000,
    todaySales: 300,
    monthlySales: 1200,
    totalProducts: 45,
    totalOrders: 120,
    pendingOrders: 10,
    customers: 25,
  };

  const products = [
    { name: "T-Shirt", stock: 3 },
    { name: "Jeans", stock: 10 },
    { name: "Shirt", stock: 2 },
  ];

  const lowStock = products.filter((p) => p.stock < 5);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5">
        <h2 className="text-xl font-bold mb-6">E-commerce Admin</h2>

        <ul className="space-y-3">
          <li className="hover:text-blue-500 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-500 cursor-pointer">Products</li>
          <li className="hover:text-blue-500 cursor-pointer">Orders</li>
          <li className="hover:text-blue-500 cursor-pointer">Customers</li>
        </ul>

        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        {/* Title */}
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-4 rounded shadow">
            <h3>Total Sales</h3>
            <p className="text-xl font-bold text-blue-500">${stats.totalSales}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Today Sales</h3>
            <p className="text-xl font-bold text-green-500">${stats.todaySales}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Monthly Sales</h3>
            <p className="text-xl font-bold text-purple-500">${stats.monthlySales}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Products</h3>
            <p className="text-xl font-bold">{stats.totalProducts}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Total Orders</h3>
            <p className="text-xl font-bold">{stats.totalOrders}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Pending Orders</h3>
            <p className="text-xl font-bold text-yellow-500">{stats.pendingOrders}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Customers</h3>
            <p className="text-xl font-bold">{stats.customers}</p>
          </div>

        </div>

        {/* Low Stock Alert */}
        <div className="bg-white p-5 rounded shadow mb-6">
          <h3 className="text-lg font-semibold mb-3 text-red-500">
            ⚠️ Low Stock Products
          </h3>

          {lowStock.length === 0 ? (
            <p>No low stock items</p>
          ) : (
            <ul>
              {lowStock.map((p, i) => (
                <li key={i} className="flex justify-between border-b py-1">
                  <span>{p.name}</span>
                  <span className="text-red-500">{p.stock} left</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white p-5 rounded shadow">
          <h3 className="mb-3 font-semibold">Sales Chart</h3>

          <div className="h-40 flex items-center justify-center text-gray-400">
            Chart will be added (Chart.js)
          </div>
        </div>

      </div>
    </div>
  );
}