import React, { useEffect } from "react";
import { Modal, Button, Text, Input, Avatar, Radio } from "@nextui-org/react";
import service from "../../../services/service";
import { aesEncrypt } from "../../../utils/encryption";
import { toast } from "react-toastify";

interface InformacionUsuarioProps {
  user: any;
  onClose: () => void;
}

const InfoUsuario: React.FC<InformacionUsuarioProps> = ({ user, onClose }) => {
  const [visible, setVisible] = React.useState(false);
  const [nombre, setNombre] = React.useState(user.nombres);
  const [apellidos, setApellidos] = React.useState(user.apellidos);
  const [rol, setRol] = React.useState(user.tipoUsuario);

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
      >
        <Modal.Header>
          <Avatar
            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-File.png"
            zoomed
            css={{
              margin: "auto",
              height: "100px",
              width: "100px",
              marginTop: "2%",
            }}
          />
        </Modal.Header>
        <Modal.Body>
          <Text h4 css={{ textAlign: "center" }}>
            Nombre del Usuario
          </Text>
          <Input
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            aria-labelledby="Nombre"
          />
          <Text h4 css={{ textAlign: "center" }}>
            Apellidos del Usuario
          </Text>
          <Input
            value={apellidos}
            onChange={(event) => setApellidos(event.target.value)}
            aria-labelledby="Apellidos"
          />

          <Text h4 css={{ textAlign: "center" }}>
            Rol del Usuario
          </Text>
          <Radio.Group
            orientation="horizontal"
            value={rol}
            onChange={(value) => setRol(value)}
            color="primary"
            aria-labelledby="Afiliado"
          >
            <Radio size="sm" value="Prestamista" aria-labelledby="Prestamista">
              Prestamista
            </Radio>
            <Radio size="sm" value="Afiliados" aria-labelledby="Afiliado">
              Afiliado
            </Radio>
          </Radio.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button auto onClick={actualizarHandler}>
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

export default InfoUsuario;
