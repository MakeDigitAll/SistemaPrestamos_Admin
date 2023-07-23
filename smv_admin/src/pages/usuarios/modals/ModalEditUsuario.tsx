import React, { useEffect, useState } from "react";
import { Modal, Button, Text, Input, Avatar, Card } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import service from "../../../services/service";
import { aesEncrypt } from "../../../utils/crypto/encryption";
import { UserPrestamista } from "../../../types/UserPrestamista";
import useGetPrestamista from "../../../hooks/useGetImagenPrestamista";
import defaultImage from "../../../assets/images/defaultProfile.png";
import { useTranslation } from "react-i18next";
interface InformacionUsuarioProps {
  user: UserPrestamista;
  onClose: () => void;
  handleUpdate: (usuario: UserPrestamista) => void;
}

const ModalEditUsuario: React.FC<InformacionUsuarioProps> = ({
  user,
  onClose,
  handleUpdate,
}) => {
  const [visible, setVisible] = useState(false);
  const [nombre, setNombre] = useState(user.nombres);
  const [apellidos, setApellidos] = useState(user.apellidos);
  const [numeroTelefono, setNumeroTelefono] = useState(user.numeroTelefono);
  const [nombreError, setNombreError] = useState("");
  const [apellidosError, setApellidosError] = useState("");
  const [numeroTelefonoError, setNumeroTelefonoError] = useState("");
  const [idUsuarioPrestamista] = useState(user.idUsuarioPrestamista);
  const imagenPerfil = useGetPrestamista(idUsuarioPrestamista);
  const [imageFile, setImageFile] = useState<File>();
  const [imagenUsuario, setImagenUsuario] = useState<string>("");
  const { t } = useTranslation();
  const closeHandler = () => {
    setVisible(false);
    onClose();
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  // Set default or user image when the component mounts or imagePerfil changes
  useEffect(() => {
    if (imagenPerfil) {
      setImagenUsuario(imagenPerfil as string);
    } else {
      setImagenUsuario(defaultImage);
    }
  }, [imagenPerfil]);

  const validarNumeroTelefono = (telefono: string) => {
    const regex = /^\d+$/;
    if (!regex.test(telefono)) {
      return t("modalEditUser.onlyDigits");
    }
    if (telefono.length !== 10) {
      return t("modalEditUser.tenDigits");
    }
    if (parseInt(telefono) < 0) {
      return t("modalEditUser.negativeNumber");
    }
    return "";
  };

  const validarNombre = (nombre: string) => {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(nombre)) {
      return t("modalEditUser.onlyLettersName");
    }
    return "";
  };

  const validarApellidos = (apellidos: string) => {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(apellidos)) {
      return t("modalEditUser.onlyLettersLastName");
    }
    return "";
  };

  const actualizarHandler = async () => {
    let valid = true;
    if (!nombre) {
      setNombreError(t("modalEditUser.errorNombre"));
      valid = false;
    } else {
      const nombreError = validarNombre(nombre);
      if (nombreError) {
        setNombreError(nombreError);
        valid = false;
      } else {
        setNombreError("");
      }
    }

    if (!apellidos) {
      setApellidosError(t("modalEditUser.errorApellido"));
      valid = false;
    } else {
      const apellidosError = validarApellidos(apellidos);
      if (apellidosError) {
        setApellidosError(apellidosError);
        valid = false;
      } else {
        setApellidosError("");
      }
    }

    if (!numeroTelefono) {
      setNumeroTelefonoError(t("modalEditUser.errorTelefono"));
      valid = false;
    } else {
      const numeroTelefonoError = validarNumeroTelefono(
        numeroTelefono as string
      );
      if (numeroTelefonoError) {
        setNumeroTelefonoError(numeroTelefonoError);
        valid = false;
      } else {
        setNumeroTelefonoError("");
      }
    }

    if (!valid) {
      return;
    }

    const encryptedNombre = aesEncrypt(nombre);
    const encryptedApellidos = aesEncrypt(apellidos);
    const encryptedNumeroTelefono = aesEncrypt(numeroTelefono as string);

    const data = {
      nombres: encryptedNombre,
      apellidos: encryptedApellidos,
      numeroTelefono: encryptedNumeroTelefono,
    };

    try {
      const response = await service.updateUsuarioPrestamista(
        idUsuarioPrestamista,
        data
      );
      if (response.status === 200) {
        // If the profile image is edited, update the image
        if (imageFile) {
          const formData = new FormData();
          formData.append("image", imageFile);
          const response = await service.setImageUsuarioPrestamista(
            idUsuarioPrestamista,
            formData
          );
          if (response.status === 200) {
            toast.success(t("modalEditUser.userEdited"));
            handleUpdate(user);
            closeHandler();
          }
        } else {
          toast.success(t("modalEditUser.userEdited"));
          handleUpdate(user);
          closeHandler();
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data);
      }
    }
  };

  const handleImagenClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files![0];

      if (file) {
        // Validate file size (maximum 4 MB)
        if (file.size <= 4 * 1024 * 1024) {
          // Validate file type: gif, png, jpg, jpeg
          const fileType = file.type;
          if (
            fileType === "image/png" ||
            fileType === "image/jpeg" ||
            fileType === "image/jpg"
          ) {
            const reader = new FileReader();
            setImageFile(file);
            reader.onload = () => {
              if (reader.readyState === 2) {
                setImagenUsuario(reader.result as string);
              }
            };
            reader.readAsDataURL(file);
          }
        } else {
          // Toast error
          const errorMessage = t("modalEditUser.errorTamanoArchivo");
          toast.error(errorMessage);
        }
      }
    };

    input.click();
  };

  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        preventClose
        blur
        width="35%"
      >
        <Card
          variant="flat"
          css={{ display: "flex", alignItems: "center", flexDirection: "row" }}
        >
          <Modal.Header>
            <Avatar
              src={imagenUsuario}
              zoomed
              css={{
                margin: "auto",
                height: "150px",
                width: "150px",
                cursor: "pointer",
              }}
              onClick={handleImagenClick}
            />
          </Modal.Header>
          <Modal.Body>
            <Text h5 css={{ textAlign: "center" }}>
              {t("modalEditUser.nameUser")}
            </Text>
            <Input
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              aria-labelledby="Nombre"
            />
            {nombreError && <Text color="error">{nombreError}</Text>}
            <Text h5 css={{ textAlign: "center" }}>
              {t("modalEditUser.lastNameUser")}
            </Text>
            <Input
              value={apellidos}
              onChange={(event) => setApellidos(event.target.value)}
              aria-labelledby="Apellidos"
            />
            {apellidosError && <Text color="error">{apellidosError}</Text>}
            <Text h5 css={{ textAlign: "center" }}>
              {t("modalEditUser.phoneUser")}
            </Text>
            <Input
              maxLength={10}
              value={numeroTelefono as string}
              onChange={(event) => setNumeroTelefono(event.target.value)}
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(0, parseInt(target.value))
                  .toString()
                  .slice(0, 10);
              }}
              aria-labelledby="Numero"
              type="number"
            />
            {numeroTelefonoError && (
              <Text color="error">{numeroTelefonoError}</Text>
            )}
          </Modal.Body>
        </Card>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <Button auto onPress={actualizarHandler}>
            {t("modalEditUser.update")}
          </Button>
          <Button auto color="error" onPress={closeHandler}>
            {t("modalEditUser.cancel")}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ModalEditUsuario;
