import { Outlet } from "react-router-dom";
import { useSystem } from "../../context/SystemContext";

import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./Header";

const Layout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { darkMode } = useSystem();
  return (
    <div className=" bg-slate-50">
      <Header isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        aria-label="Main Sidebar"
      />
      <div className="md:ml-64 transition-all duration-300">
        <main className={` ${darkMode ? "bg-gray-900" : "bg-gray-300"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
