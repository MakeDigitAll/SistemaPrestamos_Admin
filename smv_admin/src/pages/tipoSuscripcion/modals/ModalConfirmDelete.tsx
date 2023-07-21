import React from "react";
import { Modal, Button, Text } from "@nextui-org/react";
import { TipoSuscripcion } from "../../../types/TipoSuscripcion";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
          {t("modalConfirmDeleteSuscripcion.confirmDelete")}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text h3 css={{ lineHeight: "$xl", textAlign: "center" }}>
          {tipoSuscripcion.nombreSuscripcion}
        </Text>
      </Modal.Body>
      <Modal.Footer style={{ alignSelf: "center" }}>
        <Button auto color="success" onClick={confirmHandler}>
          {t("modalConfirmDeleteSuscripcion.confirm")}
        </Button>
        <Button auto color="error" onClick={onClose}>
          {t("modalConfirmDeleteSuscripcion.cancel")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmDelete;
