import { LayoutDashboard, ReceiptText, ShieldCheck, Eye } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    {
      name: "Transactions",
      path: "transactions",
      icon: <ReceiptText size={20} />,
    },
  ];
  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white transition-transform duration-300 z-50 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="p-8 flex items-center">
        <h1 className="text-2xl font-bold text-indigo-400 tracking-tight">
          Financial Dashboard
        </h1>
        <div className="md:hidden flex justify-end">
          <button
            className="md:none flex justify-end"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            X
          </button>
        </div>
      </div>
      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({
              isActive,
            }) => `flex items-center p-3 rounded-xl hover:bg-slate-800 cursor-pointer group transition-all
                ${isActive ? "bg-slate-800 text-white" : "hover:bg-slate-800"}`}
          >
            <span className="text-slate-400 group-hover:text-indigo-400">
              {item.icon}
            </span>
            <span className="ml-3 font-medium text-slate-300 group-hover:text-white">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
