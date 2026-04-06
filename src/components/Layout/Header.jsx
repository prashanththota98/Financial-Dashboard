import { useUser } from "../../context/UserContext";
import { useSystem } from "../../context/SystemContext";
import { Menu, Moon, Sun } from "lucide-react";

const Header = ({ isMobileOpen, setIsMobileOpen }) => {
  const { role, setRole } = useUser();
  const { darkMode, setDarkMode } = useSystem();
  return (
    <header
      className={`flex justify-between p-3 ${darkMode ? "bg-slate-900" : "bg-gray-300"}`}
    >
      <button
        className={`${darkMode ? "text-gray-300" : "text-gray-800"}`}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu />
      </button>
      <div className="flex items-center">
        <select
          className={`p-2 ${darkMode ? "text-gray-300 bg-slate-900" : "text-gray-800 bg-gray-300 outline-none"}`}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Viewer">Viewer</option>
          <option value="Admin">Admin</option>
        </select>
        <button className="pl-3 pr-2" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun style={{ color: "white" }} /> : <Moon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
