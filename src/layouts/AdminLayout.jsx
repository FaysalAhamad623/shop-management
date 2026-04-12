import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="flex">

      {/* Sidebar */}
      <div className="w-64 bg-gray-100 min-h-screen p-4">

        <h2 className="text-xl font-bold mb-6">
          E-commerce Admin
        </h2>

        <div className="space-y-3">

          <Link to="/dashboard" className="block hover:text-blue-500">
            Dashboard
          </Link>

          <Link to="/products" className="block hover:text-blue-500">
            Products
          </Link>

          <Link to="/orders" className="block hover:text-blue-500">
            Orders
          </Link>

          <Link to="/customer" className="block hover:text-blue-500">
            Customers
          </Link>

          <Link to="/profile" className="block hover:text-blue-500">
            Profile
          </Link>

        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white w-full py-2 rounded"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </div>

    </div>
  );
}