import React from "react";
import { Modal, Button, Text } from "@nextui-org/react";
import { UserPrestamista } from "../../../types/UserPrestamista";

interface ConfirmacionUsuarioProps {
  user: UserPrestamista;
  onClose: () => void;
  handleUpdate: (usuario: UserPrestamista) => Promise<void>;
}

const ModalHabilitarUsuario: React.FC<ConfirmacionUsuarioProps> = ({
  user,
  onClose,
  handleUpdate,
}) => {
  const confirmHandler = async () => {
    await handleUpdate(user);
    onClose();
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open
      onClose={onClose}
      width="30%"
    >
      <Modal.Header>
        <Text h4 css={{ fontWeight: "normal", textAlign: "center" }}>
          ¿Estás seguro que deseas habilitar al usuario?
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text h3 css={{ lineHeight: "$xl", textAlign: "center" }}>
          {user.nombres} {user.apellidos}
        </Text>
      </Modal.Body>
      <Modal.Footer style={{ alignSelf: "center" }}>
        <Button auto color="success" onPress={confirmHandler}>
          Confirmar
        </Button>
        <Button auto color="error" onPress={onClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalHabilitarUsuario;
