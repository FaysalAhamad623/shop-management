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

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        alert("Invalid email or password ❌");
        setLoading(false);
        return;
      }

      // 🔥 save logged user
      localStorage.setItem("currentUser", JSON.stringify(user));

      // 🔥 redirect based on role
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }

      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-[350px] text-white">

        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 rounded bg-white/30 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative mb-4">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 rounded bg-white/30 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-2 top-2 cursor-pointer text-sm"
            >
              {showPass ? "Hide" : "Show"}
            </span>
          </div>

          <button className="w-full bg-black py-2 rounded">
            {loading ? "Logging..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <span onClick={() => navigate("/forgot")} className="cursor-pointer underline">
            Forgot Password?
          </span>

          <span onClick={() => navigate("/register")} className="cursor-pointer underline">
            Register
          </span>
        </div>

      </div>
    </div>
  );
}