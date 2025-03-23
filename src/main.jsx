import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // em caso de duplicaça e esse cara aqui
  <StrictMode>
    <App />
  </StrictMode>
);
