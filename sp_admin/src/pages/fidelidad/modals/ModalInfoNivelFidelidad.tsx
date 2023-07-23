// ModalInfoFidelidad.tsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Card } from "@nextui-org/react";
import { NivelesFidelidad } from "../../../types/NivelesFidelidad";
import { useTranslation } from "react-i18next";
interface InformacionUsuarioProps {
  nivel: NivelesFidelidad;
  onClose: () => void;
}

const ModalInfoFidelidad: React.FC<InformacionUsuarioProps> = ({
  nivel,
  onClose,
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [nombre] = useState(nivel.nombreNivelFidelidad);
  const [descuento] = useState(nivel.descuento);
  const [numeroMesesMinimo] = useState(nivel.numeroMesesMinimo);
  const [numeroMesesMaximo] = useState(nivel.numeroMesesMaximo);

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
        <Card variant="flat">
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h1 style={{ marginBottom: "10px" }}>{nombre}</h1>
            <div
              style={{
                justifyContent: "center",
                marginBottom: "15px",
              }}
            >
              <h3 style={{ marginRight: "10px" }}>
                <span style={{ fontWeight: "lighter" }}>
                  {t("modalInfoFidelidad.discount")}{" "}
                </span>
                <span style={{ fontWeight: "bold" }}>{descuento}</span>%
              </h3>
              <h3 style={{ marginLeft: "10px" }}>
                <span style={{ fontWeight: "lighter" }}>
                  {t("modalInfoFidelidad.minMonths")}
                </span>
                <span style={{ fontWeight: "bold" }}>{numeroMesesMinimo}</span>
              </h3>
            </div>
            <h3>
              <span style={{ fontWeight: "lighter" }}>
                {t("modalInfoFidelidad.maxMonths")}
              </span>
              <span style={{ fontWeight: "bold" }}>{numeroMesesMaximo}</span>
            </h3>
          </div>
        </Card>
      </Modal.Body>

      <Modal.Footer css={{ alignSelf: "center" }}>
        <Button auto color="error" onPress={closeHandler}>
          {t("modalInfoFidelidad.close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInfoFidelidad;
