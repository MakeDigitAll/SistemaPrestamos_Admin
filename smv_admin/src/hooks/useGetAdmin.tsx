import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface Admin {
  correoElectronico: string;
  nombres: string;
  apellidos: string;
  id: number;
  imagenPerfil: Blob;
}

export const useGetAdmin = () => {
  const navigate = useNavigate();
  const [admin, setUser] = useState<Admin | null>(null);

  useEffect(() => {
    // Obtener el token de acceso desde una cookie
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      // Decodificar el token de acceso y obtener los datos del usuario
      const decodedAccessToken: any = jwt_decode(accessToken);

      // Establecer los datos del usuario en el estado
      const currentUser: Admin = {
        correoElectronico: decodedAccessToken.correoElectronico,
        nombres: decodedAccessToken.nombres,
        apellidos: decodedAccessToken.apellidos,
        imagenPerfil: decodedAccessToken.imagenPerfil,
        id: decodedAccessToken.id,
      };

      setUser(currentUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return admin;
};
