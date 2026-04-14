import { Navigate } from "react-router-dom";
import { isAdmin } from "../store/authStore";

export default function AdminRoute({ children }) {
  return isAdmin() ? children : <Navigate to="/admin-login" />;
}