import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { applyTheme, readStoredTheme } from "./theme";
import "../../style.css";
import "./auth.css";
import "./discover.css";
import "./event-maps.css";
import "./theme.css";

applyTheme(readStoredTheme());

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
