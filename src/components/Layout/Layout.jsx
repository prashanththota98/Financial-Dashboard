/**
 * Component: Layout
 * Description: main page layout for pages including header, sidebar, main content and used react router dom outlet to render child routes
 * Highlight: component that is similar to hoc by wrapping main content
 */

import { Outlet } from "react-router-dom";
import { useSystem } from "../../context/SystemContext";
import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./Header";

const Layout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { darkMode } = useSystem();
  return (
    <div className={` ${darkMode ? "bg-slate-900" : "bg-slate-300"}`}>
      <Header isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        aria-label="Main Sidebar"
      />
      <div className="md:ml-64 transition-all duration-300">
        <main className={`flex-1 ${darkMode ? "bg-gray-900" : "bg-gray-300"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
