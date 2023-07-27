import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import service from "../services/service";

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
    (async () => {
      // Obtener el token de acceso desde una cookie
      const accessToken = Cookies.get("accessToken");

      if (accessToken) {
        // Decodificar el token de acceso y obtener los datos del usuario
        const decodedAccessToken: any = jwt_decode(accessToken);
        const id = decodedAccessToken.id;

        await service.getAdminById(id).then((res) => {
          const admin = res.data;
          console.log(admin);
          setUser(admin);
        });
      } else {
        navigate("/");
      }
    })();
  }, []);

  return admin;
};
