// ModalEditUsuario.tsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Text, Input, Avatar, Card } from "@nextui-org/react";
import service from "../../../services/service";
import { aesEncrypt } from "../../../utils/encryption";
import { toast } from "react-toastify";
import { UserPrestamista } from "../../../types/types";

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

    const data = {
      nombres: encryptedNombre,
      apellidos: encryptedApellidos,
    };

    try {
      const response = await service.updateUsuarioPrestamista(
        user.idUsuarioPrestamista,
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
        width="30%"
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
