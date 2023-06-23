import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/LoginForm.tsx";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import { NextUIProvider } from "@nextui-org/react";

function AppRouter() {
  return (
    <BrowserRouter>
      <NextUIProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </NextUIProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
