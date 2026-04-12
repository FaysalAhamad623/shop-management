import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    // fake delay (backend pore add korbo)
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "1234") {
        localStorage.setItem("token", "fake-token");
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[350px]">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Shop Login
        </h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-2 top-2 cursor-pointer text-sm text-gray-500"
              >
                {showPass ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}