import { Navigate, Outlet } from "react-router-dom";

import { checkTokenExpiration } from "../utils/checkTokenExpiration";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token && !checkTokenExpiration(token);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Render child routes if authenticated
};

export default ProtectedRoute;