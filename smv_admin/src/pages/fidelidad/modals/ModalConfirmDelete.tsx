import React from "react";
import { Modal, Button, Text } from "@nextui-org/react";
import { NivelesFidelidad } from "../../../types/NivelesFidelidad";

interface ConfirmacionUsuarioProps {
  nivel: NivelesFidelidad;
  onClose: () => void;
  handleDeleteFidelidad: (nivel: NivelesFidelidad) => Promise<void>;
}

const ModalConfirmDelete: React.FC<ConfirmacionUsuarioProps> = ({
  nivel,
  onClose,
  handleDeleteFidelidad,
}) => {
  const confirmHandler = async () => {
    await handleDeleteFidelidad(nivel);
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
          ¿Estás seguro que deseas eliminar este nivel?
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text h3 css={{ lineHeight: "$xl", textAlign: "center" }}>
          {nivel.nombreNivelFidelidad}
        </Text>
      </Modal.Body>
      <Modal.Footer style={{ alignSelf: "center" }}>
        <Button auto color="success" onClick={confirmHandler}>
          Confirmar
        </Button>
        <Button auto color="error" onClick={onClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmDelete;
