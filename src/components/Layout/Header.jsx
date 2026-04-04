import { useUser } from "../../context/UserContext";
import { Menu } from "lucide-react";

const Header = ({ isMobileOpen, setIsMobileOpen }) => {
  const { role, setRole } = useUser();
  return (
    <header className="flex justify-between p-3">
      <button
        className=" p-2 text-indigo-500"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu />
      </button>
      <select
        className="p-2"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="Viewer">Viewer</option>
        <option value="Admin">Admin</option>
      </select>
    </header>
  );
};

export default Header;
