import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import SidebarMenu from "./SidebarMenu";
import { useLogout, useAuth } from "../../hooks/useAuth";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true); // ✅ Controls sidebar expansion (desktop)
  const [isMobileOpen, setIsMobileOpen] = useState(false); // ✅ Controls mobile sidebar visibility
  const { mutate: logout } = useLogout();
  const { data: user } = useAuth();

  // ✅ Convert `user_type_id` to number & Default to `Super Admin`
  const userRoleId = user?.user_type_id ? Number(user.user_type_id) : 1;

  return (
    <>
      {/* ✅ Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-30 
    ${isMobileOpen ? "w-72 translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:relative
    ${isExpanded ? "md:w-72" : "md:w-20"}`} // ✅ Move width outside of template literals
      >
        {/* ✅ Sidebar Header with Toggle Buttons */}
        <div className="p-4 flex justify-between items-center border-b">
          {/* Toggle Button for Desktop */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xl md:block hidden"
          >
            {isExpanded ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </button>

          {/* Close Button for Mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden text-2xl mt-16"
          >
            ✖
          </button>
        </div>

        {/* ✅ Sidebar Menu */}
        <SidebarMenu isExpanded={isExpanded} userRoleId={userRoleId} />

        {/* ✅ Support & Logout Section */}
        <div className="p-4 border-t flex flex-col gap-2">
          {/* Support */}
          <NavLink
            to="/support"
            className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:text-primaryHover hover:bg-gray-100"
          >
            <QuestionCircleOutlined className="mr-2 text-lg" />
            <span className={`text-sm ${isExpanded ? "block" : "hidden"}`}>
              Support
            </span>
          </NavLink>

          {/* Logout */}
          <button
            onClick={() => logout()}
            className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:text-primaryHover hover:bg-gray-100 w-full"
          >
            <LogoutOutlined className="mr-2 text-lg" />
            <span className={`text-sm ${isExpanded ? "block" : "hidden"}`}>
              Log Out
            </span>
          </button>
        </div>
      </aside>

      {/* ✅ Mobile Overlay (Closes Sidebar on Click) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* ✅ Hamburger Button for Small Screens */}
      {!isMobileOpen && (
        <button
          className="fixed top-4 left-2 z-40 p-2 bg-white shadow-lg rounded-lg md:hidden"
          onClick={() => setIsMobileOpen(true)}
        >
          <MenuUnfoldOutlined className="text-xl" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
