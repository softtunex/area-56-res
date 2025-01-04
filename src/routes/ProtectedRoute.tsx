import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

interface ProtectedRouteProps {
  children: ReactNode; // Explicitly define children
  requiredRoles?: string[]; // Optional array of roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const { user } = React.useContext(UserContext);

  //   if (!user.isAuthenticated) {
  //     return <Navigate to="/login" />;
  //   }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
