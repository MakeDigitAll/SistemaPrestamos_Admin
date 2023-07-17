// ModalInfoTipoSuscripcion.tsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Card } from "@nextui-org/react";
import { TipoSuscripcion } from "../../../types/TipoSuscripcion";

interface InformacionUsuarioProps {
  tipoSuscripcion: TipoSuscripcion;
  onClose: () => void;
}

const ModalInfoTipoSuscripcion: React.FC<InformacionUsuarioProps> = ({
  tipoSuscripcion,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);
  const [nombre] = useState(tipoSuscripcion.nombreSuscripcion);
  const [numUsuariosMax] = useState(tipoSuscripcion.numeroUsuariosMax);
  const [montoDesde] = useState(tipoSuscripcion.montoDesde);
  const [montoHasta] = useState(tipoSuscripcion.montoHasta);
  const [costoMembresia] = useState(tipoSuscripcion.costoMembresia);

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
              <h4 style={{ marginRight: "10px" }}>
                <span style={{ fontWeight: "lighter" }}>
                  Numero de Usuarios Máximo:{" "}
                </span>
                <span style={{ fontWeight: "bold" }}>
                  {numUsuariosMax} Usuarios
                </span>
              </h4>
              <h4 style={{ marginLeft: "10px" }}>
                <span style={{ fontWeight: "lighter" }}>
                  Dinero Mínimo a Prestar:{" "}
                </span>
                <span style={{ fontWeight: "bold" }}>{montoDesde} Pesos</span>
              </h4>
            </div>
            <h4>
              <span style={{ fontWeight: "lighter" }}>
                Dinero Máximo a Prestar:{" "}
              </span>
              <span style={{ fontWeight: "bold" }}>{montoHasta} Pesos</span>
            </h4>
            <h4>
              <span style={{ fontWeight: "lighter" }}>
                Costo de la Suscripcion:{" "}
              </span>
              <span style={{ fontWeight: "bold" }}>{costoMembresia} Pesos</span>
            </h4>
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

export default ModalInfoTipoSuscripcion;
