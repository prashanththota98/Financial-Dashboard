import { createContext, useContext, useEffect, useState } from "react";

const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  return (
    <SystemContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => useContext(SystemContext);
