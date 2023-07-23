import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import services from "../../services/service";

export const useGetUsuariosEliminados = () => {
  const [decodedToken, setDecodedToken] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await services.getAllUsuariosEliminados();
      const token = response.data.tokenUsuarios;

      // Decodificar el token utilizando jwt-decode
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { decodedToken, refetch };
};
