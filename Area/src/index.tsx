import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { LoadingProvider } from "./context/LoadingContext";

// Create a root using React 18's createRoot API
const container = document.getElementById("root");
const root = createRoot(container!);

// Render the app
root.render(
  <React.StrictMode>
    {/* <LoadingProvider> */}
    <App />
    {/* </LoadingProvider> */}
  </React.StrictMode>
);

// Performance logging (optional)
reportWebVitals();
