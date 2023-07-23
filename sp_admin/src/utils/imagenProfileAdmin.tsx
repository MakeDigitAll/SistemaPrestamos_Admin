import React, { useRef, useState, useEffect, useContext } from "react";
import { Avatar } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import service from "../services/service";
import { toast } from "react-toastify";
import { ImageContext } from "../context/ImageContext";

const ProfileImageUpload = ({
  idAdmin,
  imagenPerfil,
}: {
  idAdmin: number | undefined;
  imagenPerfil: string | undefined;
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    imagenPerfil
  );
  const { setProfileImage } = useContext(ImageContext);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle image change event
  // Handle image change event
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      // Validar el tamaño del archivo (4 MB máximo)
      if (file.size <= 4 * 1024 * 1024) {
        // Validar el tipo de archivo gif, png, jpg, jpeg
        const fileType = file.type;
        if (
          fileType === "image/png" ||
          fileType === "image/jpeg" ||
          fileType === "image/jpg"
        ) {
          const formData = new FormData();
          formData.append("image", file);
          service
            .setImageAdmin(idAdmin as number, formData)
            .then(() => {
              toast.success(t("profile.imagenActualizada"));
              setImagePreview(URL.createObjectURL(file));
              setProfileImage(URL.createObjectURL(file)); // Update the profile image in the context
            })
            .catch((error) => {
              console.error(error);
              toast.error(t("profile.errorSolicitud"));
            });
        } else {
          // Si el tipo de archivo no es válido, mostrar un mensaje de error
          toast.error(t("profile.errorTipoArchivo"));
          console.error("Tipo de archivo no válido" + fileType);
        }
      } else {
        // Si el tamaño del archivo excede los 4 MB, mostrar un mensaje de error
        toast.error(t("profile.errorTamanoArchivo"));
        console.error("Tamaño de archivo excedido: " + file.size);
      }
    }
  };

  // Limpiar el campo de archivo al desmontar el componente
  const cleanupFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return cleanupFileInput;
  }, []);

  useEffect(() => {
    setImagePreview(imagenPerfil);
    setProfileImage(imagenPerfil); // Update the profile image in the context
  }, [imagenPerfil, setProfileImage]);

  return (
    <div>
      <Avatar
        zoomed
        src={imagePreview}
        css={{
          height: "150px",
          width: "150px",
          marginTop: "2%",
          cursor: "pointer",
        }}
        onClick={handleImageClick}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfileImageUpload;
