import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import service from "../../services/service";
import { CustomNavBar } from "../../components/navbar/NavBar";
interface User {
  correo_electronico: string;
  nombres: string;
  apellidos: string;
  id: number;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el token JWT desde una cookie
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (!accessToken || !refreshToken) {
      // No se encontró el token en la cookie, redireccionar a la página de inicio de sesión
      navigate("/");
      return;
    }

    // Decodificar el token JWT para obtener los datos del usuario
    try {
      const decodedAccessToken: any = jwt_decode(accessToken);
      // renovar el token de acceso si está a 5 minutos de expirar
      if (decodedAccessToken.exp - Date.now() / 1000 < 5 * 60) {
        renewToken();
      } else {
        // El token de acceso es válido, establecer los datos del usuario
        const currentUser: User = {
          correo_electronico: decodedAccessToken.correo_electronico,
          nombres: decodedAccessToken.nombres,
          apellidos: decodedAccessToken.apellidos,
          id: decodedAccessToken.id,
        };

        setUser(currentUser);
      }
    } catch (error) {
      // El token no es válido, redireccionar a la página de inicio de sesión
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Eliminar las cookies y redireccionar a la página de inicio de sesión
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/");
  };

  const renewToken = async () => {
    const refreshToken = Cookies.get("refreshToken");

    try {
      // Realizar la solicitud de renovación de token al servidor
      const response = await service.refreshToken(refreshToken);
      const newAccessToken = response.data.accessToken;

      // Actualizar el token de acceso en las cookies
      Cookies.set("accessToken", newAccessToken);

      // Decodificar el nuevo token de acceso y obtener los datos del usuario
      const decodedNewAccessToken: any = jwt_decode(newAccessToken);

      // Establecer los datos del usuario en el estado
      const currentUser: User = {
        correo_electronico: decodedNewAccessToken.correo_electronico,
        nombres: decodedNewAccessToken.nombres,
        apellidos: decodedNewAccessToken.apellidos,
        id: decodedNewAccessToken.id,
      };

      setUser(currentUser);
    } catch (error) {
      // Error al renovar el token, redireccionar a la página de inicio de sesión
      navigate("/");
    }
  };

  if (!user) {
    return null; // Mostrar un spinner de carga o mensaje mientras se comprueba la sesión
  }

  return (
    <div>
      <CustomNavBar />
      <h1>Dashboard</h1>
      <h2>
        Bienvenido {user.nombres} {user.apellidos}
      </h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
