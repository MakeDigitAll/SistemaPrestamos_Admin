import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface User {
  correo_electronico: string;
  nombres: string;
  apellidos: string;
  id: number;
}

export const useGetUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Obtener el token de acceso desde una cookie
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      // Decodificar el token de acceso y obtener los datos del usuario
      const decodedAccessToken: any = jwt_decode(accessToken);

      // Establecer los datos del usuario en el estado
      const currentUser: User = {
        correo_electronico: decodedAccessToken.correo_electronico,
        nombres: decodedAccessToken.nombres,
        apellidos: decodedAccessToken.apellidos,
        id: decodedAccessToken.id,
      };

      setUser(currentUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return user;
};
