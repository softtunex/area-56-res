import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Layout from "./components/layouts/Layout";
import Orders from "./pages/Orders";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import UserManagementPage from "./pages/UserManagementPage";
import RolesAndPermissionsPage from "./pages/RolesAndPermissionsPage";
import InventoryManagementPage from "./pages/InventoryManagementPage";
import LoginPage from "./pages/LoginPage";
import { UserProvider, useUserContext } from "./context/UserContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import StockAvailabilityPage from "./pages/StockAvailabilityPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";

// Redirect component to handle "/" routing
const RedirectToProperPage: React.FC = () => {
  const { user } = useUserContext();
  return user.isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<RedirectToProperPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <h1>Dashboard</h1>
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Orders />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:orderId"
              element={
                <ProtectedRoute>
                  <Layout>
                    <OrderDetailsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-management"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UserManagementPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/roles-permission"
              element={
                <ProtectedRoute requiredRoles={["superadmin"]}>
                  <Layout>
                    <RolesAndPermissionsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <ProtectedRoute requiredRoles={["superadmin"]}>
                  <Layout>
                    <InventoryManagementPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff-schedule"
              element={
                <ProtectedRoute>
                  <Layout>
                    <h1>Staff Schedule</h1>
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock-availability"
              element={
                <ProtectedRoute requiredRoles={["waiter"]}>
                  <Layout>
                    <StockAvailabilityPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Layout>
                    <NotificationsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Catch-All Route */}
            <Route
              path="*"
              element={
                <Layout>
                  <h1>Page Not Found</h1>
                </Layout>
              }
            />
          </Routes>
        </Router>
      </UserProvider>
    </Provider>
  );
};

export default App;
