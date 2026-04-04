import { Outlet } from "react-router-dom";

import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./Header";

const Layout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50">
      <Header isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        aria-label="Main Sidebar"
      />
      <div className="md:ml-64 transition-all duration-300">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
