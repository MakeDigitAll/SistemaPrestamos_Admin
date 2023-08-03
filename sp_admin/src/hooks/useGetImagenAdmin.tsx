import { useContext, useEffect, useState } from "react";
import { ImageContext } from "../context/ImageContext";
import service from "../services/service";
import defaultImage from "../assets/images/defaultProfile.png";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { aesDecrypt, aesEncrypt } from "../utils/encryption";

const useGetImagenAdmin = () => {
  const [imagenPerfil, setImagenPerfil] = useState<string | undefined>(
    undefined
  );
  const { setProfileImage } = useContext(ImageContext);

  useEffect(() => {
    const userToken = Cookies.get("accessToken");
    if (!userToken) {
      setProfileImage(defaultImage);
      setImagenPerfil(defaultImage);
      return;
    }

    const encryptedUser: any = jwtDecode(userToken);
    const idUser = JSON.parse(aesDecrypt(encryptedUser.id));

    const encryptedUserID = aesEncrypt(JSON.stringify(idUser));

    const getProfileImage = async () => {
      try {
        if (encryptedUserID !== undefined) {
          const response = await service.getImageAdmin(encryptedUserID);
          const image = response.data; // Obtener el Blob de imagen de la respuesta

          // Crear un objeto URL para la imagen jpeg
          const imageUrl = URL.createObjectURL(image);
          setProfileImage(imageUrl);
          setImagenPerfil(imageUrl); // Actualizar el estado con la URL de la imagen
        } else {
          setProfileImage(defaultImage);
          setImagenPerfil(defaultImage); // Establecer la imagen por defecto si idUsuario es undefined
        }
      } catch (error: any) {
        if (error.response && error.response.status === 500) {
          console.error("No se encontró una imagen de perfil");
        }
        setProfileImage(defaultImage);
        setImagenPerfil(defaultImage);
      }
    };

    getProfileImage();
  }, [setProfileImage]);

  return imagenPerfil;
};

export default useGetImagenAdmin;
