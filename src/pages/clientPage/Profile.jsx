import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);

  // 🔥 Load user
  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    setUser(current);
  }, []);

  const handleSave = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map((u) =>
      u.email === user.email ? user : u
    );

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Profile updated ✅");
    setEdit(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">

      <div className="bg-white p-6 rounded-xl shadow w-[420px]">

        <h1 className="text-2xl font-bold mb-4 text-center">
          👤 Profile
        </h1>

        {/* 🔥 Name */}
        <div className="mb-3">
          <label className="text-sm">Name</label>
          <input
            type="text"
            value={user.name}
            disabled={!edit}
            onChange={(e) =>
              setUser({ ...user, name: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
        </div>

        {/* 🔥 Email */}
        <div className="mb-3">
          <label className="text-sm">Email</label>
          <input
            type="text"
            value={user.email}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* 🔥 Role */}
        <div className="mb-4">
          <label className="text-sm">Role</label>
          <input
            type="text"
            value={user.role}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* 🔥 ROLE BASED OPTIONS */}
        <div className="mb-4 space-y-2">

          {user.role === "admin" ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-purple-500 text-white py-2 rounded"
              >
                Go to Dashboard
              </button>

              <button
                onClick={() => navigate("/products")}
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                Manage Products
              </button>

              <button
                onClick={() => navigate("/orders")}
                className="w-full bg-green-500 text-white py-2 rounded"
              >
                Manage Orders
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/my-orders")}
                className="w-full bg-green-500 text-white py-2 rounded"
              >
                My Orders
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                Go to Cart
              </button>
            </>
          )}

        </div>

        {/* 🔥 Buttons */}
        <div className="flex justify-between">

          {edit ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}