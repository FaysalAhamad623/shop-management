import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../store/authStore";

export default function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const success = loginAdmin(email, password);

    if (success) {
      navigate("/dashboard");
    } else {
      alert("Invalid admin credentials ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow w-[300px]">

        <h2 className="text-xl font-bold mb-4 text-center">
          🔐 Admin Login
        </h2>

        <input
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}