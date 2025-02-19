import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  requiredRoles?: number[]; // ✅ Allow specifying required roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRoles }) => {
  const { data: user, isLoading } = useAuth();
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (isLoading) return <p>Loading...</p>;

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Check if user has permission to access the route
  if (requiredRoles && !requiredRoles.includes(Number(user.user_type_id))) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
