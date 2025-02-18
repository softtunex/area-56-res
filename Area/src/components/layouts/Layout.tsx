import React from "react";
import Navbar from "./Navbar"; // Existing Navbar component
import Sidebar from "./Sidebar"; // Existing Sidebar component

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </header>

      {/* Sidebar and Main Content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
