import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    adminCode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔥 duplicate check
    const exist = users.find((u) => u.email === form.email);
    if (exist) {
      alert("User already exists ❌");
      return;
    }

    const ADMIN_SECRET = "1234admin";

    // 🔥 role assign
    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
      role:
        form.adminCode === ADMIN_SECRET
          ? "admin"
          : "user",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully 🎉");
    navigate("/");
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
            className="w-full p-2 rounded bg-white/30 outline-none"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-white/30 outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-white/30 outline-none"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* 🔐 Admin Code */}
          <input
            type="text"
            placeholder="Admin Code (optional)"
            className="w-full p-2 rounded bg-white/30 outline-none"
            onChange={(e) =>
              setForm({ ...form, adminCode: e.target.value })
            }
          />

          <button className="w-full bg-black py-2 rounded">
            Register
          </button>

        </form>

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