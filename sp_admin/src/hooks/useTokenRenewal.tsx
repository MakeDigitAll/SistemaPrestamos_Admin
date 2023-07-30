import { useState, useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import service from "../services/service";
import { aesDecrypt } from "../utils/encryption";

interface User {
  correoElectronico: string;
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

      const accessTokenDurationMinutes = 60;
      const accessTokenDurationDays = accessTokenDurationMinutes / (60 * 24);

      // Actualizar el token de acceso en las cookies
      Cookies.set("accessToken", newAccessToken, {
        expires: accessTokenDurationDays,
      });

      // Decodificar el nuevo token de acceso y obtener los datos del usuario
      const decodedNewAccessToken: any = jwt_decode(newAccessToken);
      const id = aesDecrypt(decodedNewAccessToken.id.toString());
      const nombres = aesDecrypt(decodedNewAccessToken.nombres);
      const apellidos = aesDecrypt(decodedNewAccessToken.apellidos);
      const correoElectronico = aesDecrypt(
        decodedNewAccessToken.correoElectronico
      );

      // Establecer los datos del usuario en el estado
      const currentUser: User = {
        correoElectronico: correoElectronico,
        nombres: nombres,
        apellidos: apellidos,
        id: Number(id),
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

      if (!accessToken) {
        //Eliminar la cookie del refresh token
        Cookies.remove("refreshToken");
        // No se encontró el token en la cookie, redireccionar a la página de inicio de sesión
        navigate("/admin-login");
        return;
      }

      // Decodificar el token JWT para obtener los datos del usuario
      try {
        const decodedAccessToken: any = jwt_decode(accessToken);
        // Renovar el token de acceso si está a 10 minutos de expirar
        if (decodedAccessToken.exp - Date.now() / 1000 < 10 * 60) {
          await renewToken();
        } else {
          const id = aesDecrypt(decodedAccessToken.id);
          const nombres = aesDecrypt(decodedAccessToken.nombres);
          const apellidos = aesDecrypt(decodedAccessToken.apellidos);
          const correoElectronico = aesDecrypt(
            decodedAccessToken.correoElectronico
          );
          // El token de acceso es válido, establecer los datos del usuario
          const currentUser: User = {
            correoElectronico: correoElectronico,
            nombres: nombres,
            apellidos: apellidos,
            id: Number(id),
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
