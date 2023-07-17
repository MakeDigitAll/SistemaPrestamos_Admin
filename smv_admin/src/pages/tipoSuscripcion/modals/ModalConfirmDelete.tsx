import React from "react";
import { Modal, Button, Text } from "@nextui-org/react";
import { TipoSuscripcion } from "../../../types/TipoSuscripcion";

interface ConfirmacionUsuarioProps {
  tipoSuscripcion: TipoSuscripcion;
  onClose: () => void;
  handleDeleteFidelidad: (tipoSuscripcion: TipoSuscripcion) => Promise<void>;
}

const ModalConfirmDelete: React.FC<ConfirmacionUsuarioProps> = ({
  tipoSuscripcion,
  onClose,
  handleDeleteFidelidad,
}) => {
  const confirmHandler = async () => {
    await handleDeleteFidelidad(tipoSuscripcion);
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
          ¿Estás seguro que deseas eliminar este Tipo de Suscripcion?
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text h3 css={{ lineHeight: "$xl", textAlign: "center" }}>
          {tipoSuscripcion.nombreSuscripcion}
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
