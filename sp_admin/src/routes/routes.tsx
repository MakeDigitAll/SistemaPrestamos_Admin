import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState, useEffect, useCallback } from "react";
import Login from "../pages/login/LoginForm";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import UsuariosActivos from "../pages/usuarios/UsuariosActivos";
import Suscripciones from "../pages/suscripciones/Suscripciones";
import Fidelidad from "../pages/fidelidad/Fidelidad";
import AddUsuario from "../pages/addUsuarios/AddUsuario";
import UsuariosEliminados from "../pages/usuarios/UsuariosEliminados";
import cookies from "js-cookie";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";
import { SearchContextProvider } from "../context/SearchContext";
import { CustomNavBar } from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import SideBar from "../components/sidebar/SideBar";
import SuscribirUsuario from "../pages/usuarios/SuscribirUsuario";
import { ImageProvider } from "../context/ImageContext";
import TipoSuscripcion from "../pages/tipoSuscripcion/TipoSuscripcion";

const handleLogout = () => {
  // Eliminar las cookies y actualizar el estado de autenticación
  cookies.remove("accessToken");
  cookies.remove("refreshToken");
  // Redirigir a la página de inicio de sesión
  window.location.reload();
};

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = cookies.get("accessToken");
    const authenticated = !!accessToken;
    setIsLoggedIn(authenticated);
  }, []);

  //si no hay access token, eliminar refresh token
  if (!cookies.get("accessToken")) {
    cookies.remove("refreshToken");
  }

  const handleLogoutCallback = useCallback(handleLogout, []);

  return (
    <SearchContextProvider>
      <ImageProvider>
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
              <div className="app-container">
                {isLoggedIn && <SideBar />}
                <div className="content-body">
                  {isLoggedIn && (
                    <div className="header">
                      <CustomNavBar handleLogout={handleLogoutCallback} />
                    </div>
                  )}
                  <div className="content-scrollable">
                    <Routes>
                      <Route path="/admin-login" element={<Login />} />
                      <Route path="/admin-dashboard" element={<Dashboard />} />
                      <Route path="/admin-profile" element={<Profile />} />
                      <Route
                        path="/admin-usuarios-activos"
                        element={<UsuariosActivos />}
                      />
                      <Route
                        path="/admin-suscribir-usuario"
                        element={<SuscribirUsuario />}
                      />
                      <Route
                        path="/admin-suscripciones"
                        element={<Suscripciones />}
                      />
                      <Route
                        path="/admin-add-usuario"
                        element={<AddUsuario />}
                      />
                      <Route
                        path="/admin-usuarios-eliminados"
                        element={<UsuariosEliminados />}
                      />
                      <Route path="/admin-fidelidad" element={<Fidelidad />} />
                      <Route
                        path="/admin-tipo-suscripcion"
                        element={<TipoSuscripcion />}
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
                  </div>
                </div>
              </div>
              <div className="footer">
                <Footer />
              </div>
            </NextUIProvider>
          </NextThemesProvider>
        </BrowserRouter>
      </ImageProvider>
    </SearchContextProvider>
  );
}

export default AppRouter;
