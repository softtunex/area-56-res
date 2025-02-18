import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  // eslint-disable-next-line
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Toggle Sidebar Visibility
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* ✅ Pass toggleSidebar to Navbar */}
      <header style={{ zIndex: 31 }} className="fixed top-0 left-0 right-0">
        <Navbar toggleSidebar={toggleSidebar} />
      </header>

      <div className="flex flex-1 pt-16">
        {/* ✅ Sidebar with slide-in effect */}
        <aside>
          <Sidebar />
        </aside>

        {/* ✅ Main Content */}
        <main className="flex-1 bg-white p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
