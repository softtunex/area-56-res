import React from "react";
import { NavLink } from "react-router-dom";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LockOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

interface SidebarMenuProps {
  isExpanded: boolean;
  userRoleId: number;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  allowedRoles: number[];
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  isExpanded,
  userRoleId,
}) => {
  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
      path: "/dashboard",
      allowedRoles: [1, 2, 5],
    },
    {
      label: "Orders",
      icon: <ShoppingCartOutlined />,
      path: "/orders",
      allowedRoles: [1, 2, 5],
    },
    {
      label: "User Management",
      icon: <UserOutlined />,
      path: "/user-management",
      allowedRoles: [1],
    },
    {
      label: "Roles & Permissions",
      icon: <LockOutlined />,
      path: "/roles-permission",
      allowedRoles: [1],
    },
    {
      label: "Inventory",
      icon: <AppstoreOutlined />,
      path: "/inventory",
      allowedRoles: [1, 2],
    },
    {
      label: "Staff Schedule",
      icon: <CalendarOutlined />,
      path: "/staff-schedule",
      allowedRoles: [1, 2],
    },
    {
      label: "Stock Availability",
      icon: <CheckCircleOutlined />,
      path: "/stock-availability",
      allowedRoles: [2],
    },
  ];

  return (
    <ul className="mt-4 flex-1">
      {menuItems
        .filter((item) => item.allowedRoles.includes(userRoleId))
        .map((item, index) => (
          <li key={index} className="mb-2">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center w-[80%] mx-3 px-4 py-3 rounded-lg ${
                  isActive
                    ? "bg-primary text-white hover:bg-primaryHover"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span
                className={`text-sm ml-4 ${isExpanded ? "block" : "hidden"}`}
              >
                {item.label}
              </span>
            </NavLink>
          </li>
        ))}
    </ul>
  );
};

export default SidebarMenu;
