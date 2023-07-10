import { useState, useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import service from "../services/service";

interface User {
  correo_electronico: string;
  nombres: string;
  apellidos: string;
  id: number;
}

const useTokenRenewal = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const renewToken = useCallback(async () => {
    // Obtener el token de actualización desde una cookie
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
      console.log(error);
      navigate("/admin-login");
    }
  }, [navigate]);

  useEffect(() => {
    const checkSession = async () => {
      // Obtener el token JWT desde una cookie
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if (!accessToken || !refreshToken) {
        // No se encontró el token en la cookie, redireccionar a la página de inicio de sesión
        navigate("/admin-login");
        return;
      }

      // Decodificar el token JWT para obtener los datos del usuario
      try {
        const decodedAccessToken: any = jwt_decode(accessToken);
        // Renovar el token de acceso si está a 5 minutos de expirar
        if (decodedAccessToken.exp - Date.now() / 1000 < 5 * 60) {
          await renewToken();
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
        navigate("/admin-login");
      }
    };

    checkSession();
  }, [navigate, renewToken]);

  return user;
};

export default useTokenRenewal;
