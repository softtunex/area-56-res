import { createSlice } from "@reduxjs/toolkit";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LockOutlined,
  AppstoreOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

export interface SidebarState {
  menuItems: {
    label: string;
    icon: React.FC;
    path: string;
  }[];
}

const initialState: SidebarState = {
  menuItems: [
    { label: "Dashboard", icon: DashboardOutlined, path: "/dashboard" },
    { label: "Orders", icon: ShoppingCartOutlined, path: "/orders" },
    {
      label: "User Management",
      icon: UserOutlined,
      path: "/user-management",
    },
    {
      label: "Roles and Permissions",
      icon: LockOutlined,
      path: "/roles-permission",
    },
    {
      label: "Inventory Management",
      icon: AppstoreOutlined,
      path: "/inventory",
    },
    {
      label: "Staff Schedule",
      icon: CalendarOutlined,
      path: "/staff-schedule",
    },
  ],
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {},
});

export const selectSidebarItems = (state: { sidebar: SidebarState }) =>
  state.sidebar.menuItems;

export default sidebarSlice.reducer;
