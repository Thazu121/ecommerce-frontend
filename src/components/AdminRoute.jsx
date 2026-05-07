import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Not admin
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Admin access
  return children;
}