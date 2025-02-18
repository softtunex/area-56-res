import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RedirectToDashboard: React.FC = () => {
  const { data: user } = useAuth();
  const token = localStorage.getItem("token"); // ✅ Ensure token exists

  if (user && token) {
    return <Navigate to="/dashboard" replace />; // ✅ Redirect to dashboard if logged in
  }

  return <Navigate to="/login" replace />; // ✅ Redirect to login if NOT logged in
};

export default RedirectToDashboard;
