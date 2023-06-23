import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/routes"; // Update the path if necessary

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<AppRouter />);
