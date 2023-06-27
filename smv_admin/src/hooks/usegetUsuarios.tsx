import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import services from "../services/service";

export const useGetUsuarios = () => {
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await services.getAllUsuarios();
        const token = response.data.tokenUsuarios;

        // Decodificar el token utilizando jwt-decode
        const decoded = jwtDecode(token);

        setDecodedToken(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    fetchData();
  }, []);

  return decodedToken;
};
