// ModalInfoUsuaio.tsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Avatar, Card, Text } from "@nextui-org/react";
import { UserPrestamista } from "../../../types/UserPrestamista";

interface InformacionUsuarioProps {
  user: UserPrestamista;
  onClose: () => void;
}

const ModalInfoUsuaio: React.FC<InformacionUsuarioProps> = ({
  user,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);
  const [nombre] = useState(user.nombres);
  const [apellidos] = useState(user.apellidos);
  const [correoElectronico] = useState(user.correoElectronico);
  const [codigoReferencia] = useState(user.codigoReferencia);
  const [telefono] = useState(user.numeroTelefono);
  //const [imagenPerfil] = useState(user.imagenPerfil);

  const closeHandler = () => {
    setVisible(false);
    onClose();
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
      width="30%"
    >
      <Modal.Body>
        <Card
          variant="flat"
          css={{ display: "flex", alignItems: "center", flexDirection: "row" }}
        >
          <Avatar
            src="https://i.pravatar.cc/300"
            css={{
              marginRight: "10%",
              width: "30%",
              height: "30%",
            }}
          />
          <div>
            <Text h4 css={{ lineHeight: "$2xl" }}>
              {nombre} {apellidos}
            </Text>
            <Text h5 css={{ lineHeight: "$xs" }}>
              {correoElectronico}
            </Text>
            <Text h5 css={{ lineHeight: "$xs" }}>
              <span>Código de Referencia: </span>
              <span style={{ fontWeight: "bold" }}>{codigoReferencia}</span>
            </Text>
            <Text h5 css={{ lineHeight: "$xs" }}>
              <span>Numero de Telefono: </span>
              <span style={{ fontWeight: "bold" }}>{telefono}</span>
            </Text>
          </div>
        </Card>
      </Modal.Body>
      <Modal.Footer css={{ alignSelf: "center" }}>
        <Button auto color="error" onPress={closeHandler}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInfoUsuaio;
