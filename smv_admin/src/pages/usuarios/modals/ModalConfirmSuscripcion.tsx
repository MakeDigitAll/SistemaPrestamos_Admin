import React from "react";
import { Modal, Button, Text } from "@nextui-org/react";
import { UserPrestamista } from "../../../types/UserPrestamista";
import { useTranslation } from "react-i18next";
interface ConfirmacionUsuarioProps {
  user: UserPrestamista;
  onClose: () => void;
  handleUpdate: (usuario: UserPrestamista) => Promise<void>;
}

const ModalConfirmSuscripcion: React.FC<ConfirmacionUsuarioProps> = ({
  user,
  onClose,
  handleUpdate,
}) => {
  const confirmHandler = async () => {
    await handleUpdate(user);
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
          {t("modalConfirmSuscripcion.confirmSuscripcion")}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text h3 css={{ lineHeight: "$xl", textAlign: "center" }}>
          {user.nombres} {user.apellidos}
        </Text>
      </Modal.Body>
      <Modal.Footer style={{ alignSelf: "center" }}>
        <Button auto color="success" onPress={confirmHandler}>
          {t("modalConfirmSuscripcion.confirm")}
        </Button>
        <Button auto color="error" onPress={onClose}>
          {t("modalConfirmSuscripcion.cancel")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmSuscripcion;
