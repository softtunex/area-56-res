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

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
            <Route path="/user-management" element={<UserManagementPage />} />
            <Route
              path="/roles-permission"
              element={<RolesAndPermissionsPage />}
            />
            <Route path="/inventory" element={<InventoryManagementPage />} />
            <Route path="/staff-schedule" element={<h1>Staff Schedule</h1>} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
