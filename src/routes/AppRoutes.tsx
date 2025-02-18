import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layouts/Layout";
import LoginPage from "../pages/LoginPage";
import OrderDetailsPage from "../pages/OrderDetailsPage";
import UserManagementPage from "../pages/UserManagementPage";
import RolesAndPermissionsPage from "../pages/RolesAndPermissionsPage";
import InventoryManagementPage from "../pages/InventoryManagementPage";
import NotificationsPage from "../pages/NotificationsPage";
import Orders from "../pages/Orders";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import ProfilePage from "../pages/ProfilePage";
import RedirectToDashboard from "./RedirectToProperPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<RedirectToDashboard />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes (Inside Layout) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<h2>Dashboard</h2>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="/not-found" element={<h2>404 Not Found</h2>} />

          {/* ✅ Only Admins Can Access User Management */}
          <Route
            path="/user-management"
            element={<ProtectedRoute requiredRoles={[1]} />}
          >
            <Route index element={<UserManagementPage />} />
          </Route>

          {/* ✅ Only Admins Can Access Roles & Permissions */}
          <Route
            path="/roles-permission"
            element={<ProtectedRoute requiredRoles={[1]} />}
          >
            <Route index element={<RolesAndPermissionsPage />} />
          </Route>

          {/* ✅ Admins & Staff Can Access Inventory */}
          <Route
            path="/inventory"
            element={<ProtectedRoute requiredRoles={[1, 2]} />}
          >
            <Route index element={<InventoryManagementPage />} />
          </Route>

          {/* ✅ Any Logged-in User Can Access Profile & Notifications */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>
      </Route>

      {/* Unauthorized Access Page */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Catch-All 404 Page */}
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default AppRoutes;
