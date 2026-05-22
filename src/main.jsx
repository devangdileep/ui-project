import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./css/global.css";
import "./css/navbar.css";
import "./css/home.css";
import "./css/login.css";
import "./css/packages.css";
import "./css/request.css";
import "./css/agent.css";
import "./css/responsive.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
