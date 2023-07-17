import { useEffect, useState, useCallback } from "react";
import service from "../services/service";
import defaultImage from "../assets/images/defaultProfile.png";

const useGetImagenAdmin = (idAdmin: number | undefined) => {
  const [imagenPerfil, setImagenPerfil] = useState<string | undefined>(
    undefined
  );

  const getImageAdmin = useCallback(async () => {
    try {
      if (idAdmin !== undefined) {
        const response = await service.getImageAdmin(idAdmin);
        const image = response.data; // Obtener el Blob de imagen de la respuesta

        // Crear un objeto URL para la imagen jpeg
        const imageUrl = URL.createObjectURL(image);
        setImagenPerfil(imageUrl); // Actualizar el estado con la URL de la imagen
      } else {
        setImagenPerfil(defaultImage); // Establecer la imagen por defecto si idAdmin es undefined
      }
    } catch (error) {
      console.log("Error:" + error);
      setImagenPerfil(defaultImage); // Establecer la imagen por defecto en caso de error
    }
  }, [idAdmin]);

  useEffect(() => {
    getImageAdmin();
  }, [idAdmin, getImageAdmin]);

  return imagenPerfil;
};

export default useGetImagenAdmin;
