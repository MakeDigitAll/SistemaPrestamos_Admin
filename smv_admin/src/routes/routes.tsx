import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Login from "../pages/login/LoginForm";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import UsuariosActivos from "../pages/usuarios/UsuariosActivos";
import UsuariosInactivos from "../pages/usuarios/UsuariosInactivos";
import Suscripciones from "../pages/suscripciones/Suscripciones";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";

function AppRouter() {
  return (
    <BrowserRouter>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/usuarios-activos" element={<UsuariosActivos />} />
            <Route path="/usuarios-inactivos" element={<UsuariosInactivos />} />
            <Route path="/suscripciones" element={<Suscripciones />} />
          </Routes>
        </NextUIProvider>
      </NextThemesProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
