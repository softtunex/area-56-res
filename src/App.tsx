import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Layout from "./components/layouts/Layout";
import Orders from "./pages/Orders";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import UserManagementPage from "./pages/UserManagementPage";
import RolesAndPermissionsPage from "./pages/RolesAndPermissionsPage";
import InventoryManagementPage from "./pages/InventoryManagementPage";
import LoginPage from "./pages/LoginPage"; // Import Login Page
import { UserProvider } from "./context/UserContext"; // Import User Context
import ProtectedRoute from "./routes/ProtectedRoute"; // Import ProtectedRoute

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />

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
