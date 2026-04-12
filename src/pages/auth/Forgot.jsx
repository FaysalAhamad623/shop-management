import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Forgot() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [step, setStep] = useState(1);

  const handleCheckEmail = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((u) => u.email === email);

    if (!user) {
      alert("User not found ❌");
      return;
    }

    setStep(2);
  };

  const handleReset = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updated = users.map((u) =>
      u.email === email ? { ...u, password: newPass } : u
    );

    localStorage.setItem("users", JSON.stringify(updated));

    alert("Password updated successfully 🎉");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">

      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96 text-white">

        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password 🔐
        </h2>

        {step === 1 ? (
          <>
            {/* Email step */}
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded bg-white/30 placeholder-white outline-none mb-4"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleCheckEmail}
              className="w-full bg-black py-2 rounded hover:bg-gray-800"
            >
              Next
            </button>
          </>
        ) : (
          <>
            {/* New password step */}
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 rounded bg-white/30 placeholder-white outline-none mb-4"
              onChange={(e) => setNewPass(e.target.value)}
            />

            <button
              onClick={handleReset}
              className="w-full bg-green-500 py-2 rounded hover:bg-green-600"
            >
              Reset Password
            </button>
          </>
        )}

        {/* Back */}
        <p
          onClick={() => navigate("/")}
          className="text-sm mt-4 text-center underline cursor-pointer"
        >
          Back to Login
        </p>

      </div>

    </div>
  );
}