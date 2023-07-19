import { useEffect, useState, useCallback } from "react";
import service from "../services/service";
import defaultImage from "../assets/images/defaultProfile.png";

const useGetPrestamista = (idUsuarioPrestamista: number | undefined) => {
  const [imagenPerfil, setImagenPerfil] = useState<string | undefined>(
    undefined
  );

  const getImagenPrestamista = useCallback(async () => {
    try {
      if (idUsuarioPrestamista !== undefined) {
        const response = await service.getImagenPrestamista(
          idUsuarioPrestamista
        );
        const image = response.data; // Obtener el Blob de imagen de la respuesta
        // Crear un objeto URL para la imagen de cualquier tipo
        const imageUrl = URL.createObjectURL(image);
        setImagenPerfil(imageUrl); // Actualizar el estado con la URL de la imagen
      } else {
        setImagenPerfil(defaultImage); // Establecer la imagen por defecto si idUsuarioPrestamista es undefined
      }
    } catch (error) {
      console.log("Error:" + error);
      setImagenPerfil(defaultImage); // Establecer la imagen por defecto en caso de error
    }
  }, [idUsuarioPrestamista]);

  useEffect(() => {
    getImagenPrestamista();
  }, [idUsuarioPrestamista, getImagenPrestamista]);
  return imagenPerfil;
};

export default useGetPrestamista;
