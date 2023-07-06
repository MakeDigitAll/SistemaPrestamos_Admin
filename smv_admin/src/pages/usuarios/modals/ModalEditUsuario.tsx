// ModalEditUsuario.tsx
import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Avatar,
  Radio,
  Card,
} from "@nextui-org/react";
import service from "../../../services/service";
import { aesEncrypt } from "../../../utils/encryption";
import { toast } from "react-toastify";
import { User } from "../../../types/types";

interface InformacionUsuarioProps {
  user: User;
  onClose: () => void;
  handleUpdate: (usuario: User) => void;
}

const ModalEditUsuario: React.FC<InformacionUsuarioProps> = ({
  user,
  onClose,
  handleUpdate,
}) => {
  const [visible, setVisible] = useState(false);
  const [nombre, setNombre] = useState(user.nombres);
  const [apellidos, setApellidos] = useState(user.apellidos);
  const [rol, setRol] = useState(user.tipoUsuario);

  const closeHandler = () => {
    setVisible(false);
    onClose();
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  const actualizarHandler = async () => {
    const encryptedNombre = aesEncrypt(nombre);
    const encryptedApellidos = aesEncrypt(apellidos);
    const encryptedRol = aesEncrypt(rol);

    const data = {
      nombres: encryptedNombre,
      apellidos: encryptedApellidos,
      tipoUsuario: encryptedRol,
    };

    try {
      const response = await service.updateUsuarioPrestamista(
        user.idUsuario,
        data
      );
      if (response.status === 200) {
        toast.success("Usuario Editado Correctamente");
        handleUpdate(user);
        closeHandler();
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data);
      }
    }
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
        width="25%"
      >
        <Card
          variant="flat"
          css={{ display: "flex", alignItems: "center", flexDirection: "row" }}
        >
          <Modal.Header>
            <Avatar
              src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-File.png"
              zoomed
              css={{
                margin: "auto",
                height: "100px",
                width: "100px",
              }}
            />
          </Modal.Header>
          <Modal.Body>
            <Text h5 css={{ textAlign: "center" }}>
              Nombre del Usuario
            </Text>
            <Input
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              aria-labelledby="Nombre"
            />
            <Text h5 css={{ textAlign: "center" }}>
              Apellidos del Usuario
            </Text>
            <Input
              value={apellidos}
              onChange={(event) => setApellidos(event.target.value)}
              aria-labelledby="Apellidos"
            />

            <Text h5 css={{ textAlign: "center" }}>
              Rol del Usuario
            </Text>
            <Radio.Group
              orientation="horizontal"
              value={rol}
              onChange={(value) => setRol(value)}
              color="primary"
              aria-labelledby="Afiliado"
            >
              <Radio
                size="sm"
                value="Prestamista"
                aria-labelledby="Prestamista"
              >
                Prestamista
              </Radio>
              <Radio size="sm" value="Afiliados" aria-labelledby="Afiliado">
                Afiliado
              </Radio>
            </Radio.Group>
          </Modal.Body>
        </Card>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <Button auto onPress={actualizarHandler}>
            Actualizar
          </Button>
          <Button auto color="error" onPress={closeHandler}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditUsuario;
