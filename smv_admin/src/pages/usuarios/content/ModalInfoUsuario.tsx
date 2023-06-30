// ModalEditUsuario.tsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Text, Input, Avatar, Radio } from "@nextui-org/react";
import { User } from "../../../types/types";

interface InformacionUsuarioProps {
  user: User;
  onClose: () => void;
}

const ModalEditUsuario: React.FC<InformacionUsuarioProps> = ({
  user,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);
  const [nombre] = useState(user.nombres);
  const [apellidos] = useState(user.apellidos);
  const [rol] = useState(user.tipoUsuario);
  const [correoElectronico] = useState(user.correoElectronico);
  const [codigoReferencia] = useState(user.codigoReferencia);

  const closeHandler = () => {
    setVisible(false);
    onClose();
  };

  useEffect(() => {
    setVisible(true);
  }, []);

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
          <Input disabled value={nombre} label="Nombre" />
          <Input disabled value={apellidos} label="Apellidos" />
          <Input disabled value={rol} label="Tipo de Usuario" />
          <Input
            disabled
            value={correoElectronico}
            label="Correo Electronico"
          />
          <Input
            disabled
            value={codigoReferencia || ""} // Utiliza un valor predeterminado en caso de que codigoReferencia sea null
            label="Codigo de Referencia"
          />
        </Modal.Body>
        <Modal.Footer css={{ alignSelf: "center" }}>
          <Button auto color="error" onPress={closeHandler}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditUsuario;
