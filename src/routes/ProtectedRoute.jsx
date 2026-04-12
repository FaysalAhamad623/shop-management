import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  // ❌ Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/home" />;
  }

  // ✅ Allowed
  return children;
}