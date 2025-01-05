import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectSidebarItems } from "../../redux/slices/sidebarSlice";
import { LogoutOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useUserContext } from "../../context/UserContext";

const Sidebar: React.FC = () => {
  const menuItems = useSelector(selectSidebarItems);
  const { user, logout } = useUserContext();

  // Filter menu items based on the user's role
  const getFilteredMenuItems = () => {
    if (user.role === "waiter") {
      return menuItems.filter((item) =>
        [
          "Dashboard",
          "Orders",
          "Staff Schedule",
          "Stock Availability",
        ].includes(item.label)
      );
    }

    if (user.role === "superadmin") {
      return menuItems.filter((item) => item.label !== "Stock Availability");
    }

    return menuItems; // Default case for other roles (e.g., vendor)
  };

  const filteredMenuItems = getFilteredMenuItems();

  return (
    <div className="h-screen w-64 bg-white shadow-md flex flex-col">
      {/* Sidebar Menu */}
      <ul className="mt-4 flex-1">
        {filteredMenuItems.map((item, index) => (
          <li key={index} className="mb-2">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg ${
                  isActive
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <span className="mr-4 text-lg">
                <item.icon />
              </span>
              <span className="text-sm">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Support & Logout */}
      <div className="p-4 border-t">
        {/* Support Link */}
        <NavLink
          to="/support"
          className="block mb-2 text-gray-600 hover:text-red-600 flex items-center px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          <QuestionCircleOutlined className="mr-2 text-lg" />
          <span className="text-sm">Support</span>
        </NavLink>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="block text-gray-600 hover:text-red-600 flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 w-full"
        >
          <LogoutOutlined className="mr-2 text-lg" />
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
