import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Create a root using React 18's createRoot API
const container = document.getElementById("root");
const root = createRoot(container!);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance logging (optional)
reportWebVitals();
