import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔥 Check duplicate
    const exist = users.find((u) => u.email === form.email);
    if (exist) {
      alert("User already exists!");
      return;
    }

    // 🔥 Save user
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully 🎉");

    navigate("/"); // back to login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">

      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96 text-white">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 rounded bg-white/30 placeholder-white outline-none"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-white/30 placeholder-white outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-white/30 placeholder-white outline-none"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* 🔥 Role Select */}
          <div className="flex justify-between">

            <button
              type="button"
              onClick={() => setForm({ ...form, role: "user" })}
              className={`w-1/2 mr-2 py-2 rounded ${
                form.role === "user"
                  ? "bg-blue-500"
                  : "bg-white/30"
              }`}
            >
              User
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, role: "admin" })}
              className={`w-1/2 py-2 rounded ${
                form.role === "admin"
                  ? "bg-purple-500"
                  : "bg-white/30"
              }`}
            >
              Admin
            </button>

          </div>

          <button className="w-full bg-black py-2 rounded hover:bg-gray-800 transition">
            Register
          </button>

        </form>

        {/* 🔗 Login link */}
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="underline cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}