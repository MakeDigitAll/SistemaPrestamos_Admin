import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Login from "../pages/login/LoginForm";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import UsuariosActivos from "../pages/usuarios/UsuariosActivos";
import UsuariosInactivos from "../pages/usuarios/UsuariosInactivos";
import Suscripciones from "../pages/suscripciones/Suscripciones";
import AddUsuario from "../pages/usuarios/AddUsuario";
import UsuariosEliminados from "../pages/usuarios/UsuariosEliminados";
import cookies from "js-cookie";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";

function AppRouter() {
  const accessToken = cookies.get("accessToken");
  const isLoggedIn = !!accessToken;

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
            <Route path="/admin-login" element={<Login />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/admin-profile" element={<Profile />} />
            <Route
              path="/admin-usuarios-activos"
              element={<UsuariosActivos />}
            />
            <Route
              path="/admin-usuarios-inactivos"
              element={<UsuariosInactivos />}
            />
            <Route path="/admin-suscripciones" element={<Suscripciones />} />
            <Route path="/admin-add-usuario" element={<AddUsuario />} />
            <Route
              path="/admin-usuarios-eliminados"
              element={<UsuariosEliminados />}
            />
            {isLoggedIn ? (
              <Route
                path="/"
                element={<Navigate to="/admin-dashboard" replace />}
              />
            ) : (
              <Route
                path="/"
                element={<Navigate to="/admin-login" replace />}
              />
            )}
          </Routes>
        </NextUIProvider>
      </NextThemesProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
