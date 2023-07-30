import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { AdminType } from "../types/AdminType";
import { aesDecrypt } from "../utils/encryption";

export const useGetAdmin = () => {
  const [admin, setAdmin] = useState<AdminType>();

  useEffect(() => {
    // Obtener el token de acceso desde una cookie
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      // Decodificar el token de acceso y obtener los datos del usuario
      const decodedAccessToken: any = jwt_decode(accessToken);
      const id = aesDecrypt(decodedAccessToken.id);
      const nombre = aesDecrypt(decodedAccessToken.nombres);
      const apellidos = aesDecrypt(decodedAccessToken.apellidos);
      const correoElectronico = aesDecrypt(
        decodedAccessToken.correoElectronico
      );

      const admin = {
        nombres: nombre,
        apellidos: apellidos,
        correoElectronico: correoElectronico,
        id: Number(id),
      };

      setAdmin(admin);
    }
  }, []);

  return admin;
};
