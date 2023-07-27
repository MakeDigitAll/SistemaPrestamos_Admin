import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import service from "../services/service";
import { AdminType } from "../types/AdminType";

export const useGetAdmin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminType>();

  useEffect(() => {
    // Obtener el token de acceso desde una cookie
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      // Decodificar el token de acceso y obtener los datos del usuario
      const decodedAccessToken: any = jwt_decode(accessToken);
      const id = decodedAccessToken.id;
      getAdminByID(id);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const getAdminByID = async (id: number) => {
    await service.getAdminById(id).then((res) => {
      const admin = res.data;
      setAdmin(admin);
    });
  };

  return admin;
};
