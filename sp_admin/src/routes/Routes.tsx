import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Login from "../pages/login/LoginForm";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import UsuariosActivos from "../pages/usuarios/UsuariosActivos";
import Suscripciones from "../pages/suscripciones/Suscripciones";
import Fidelidad from "../pages/fidelidad/Fidelidad";
import AddUsuario from "../pages/addUsuarios/AddUsuario";
import UsuariosEliminados from "../pages/usuarios/UsuariosEliminados";
import { SearchContextProvider } from "../context/SearchContext";
import SuscribirUsuario from "../pages/usuarios/SuscribirUsuario";
import { ImageProvider } from "../context/ImageContext";
import TipoSuscripcion from "../pages/tipoSuscripcion/TipoSuscripcion";
import Notificaciones from "../pages/notificaciones/Notificaciones";

function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchContextProvider>
          <ImageProvider>
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
              <Route path="/admin-suscripciones" element={<Suscripciones />} />
              <Route path="/admin-add-usuario" element={<AddUsuario />} />
              <Route
                path="/admin-usuarios-eliminados"
                element={<UsuariosEliminados />}
              />
              <Route path="/admin-fidelidad" element={<Fidelidad />} />
              <Route
                path="/admin-tipo-suscripcion"
                element={<TipoSuscripcion />}
              />
              <Route
                path="/admin-notificaciones"
                element={<Notificaciones />}
              />
            </Routes>
          </ImageProvider>
        </SearchContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
