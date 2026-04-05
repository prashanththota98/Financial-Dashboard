import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { SystemProvider } from "./context/SystemContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <SystemProvider>
        <App />
      </SystemProvider>
    </UserProvider>
  </StrictMode>,
);
