import React, { useEffect, useState } from "react";
import { Modal, Button, Text, Input, Card } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import service from "../../../services/service";
import { aesEncrypt } from "../../../utils/encryption";
import { TipoSuscripcion } from "../../../types/TipoSuscripcion";
import { useTranslation } from "react-i18next";

interface InformacionSuscripcionProps {
  tipoSuscripcion: TipoSuscripcion;
  onClose: () => void;
  handleUpdate: (tipoSuscripciones: TipoSuscripcion) => void;
}

const ModalEditFidelidad: React.FC<InformacionSuscripcionProps> = ({
  tipoSuscripcion,
  onClose,
  handleUpdate,
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [nombre, setNombre] = useState(tipoSuscripcion.nombreSuscripcion);
  const [numeroUsuariosMax, setnumeroUsuariosMax] = useState(
    tipoSuscripcion.numeroUsuariosMax
  );
  const [montoDesde, setMontoDesde] = useState(tipoSuscripcion.montoDesde);
  const [montoHasta, setMontoHasta] = useState(tipoSuscripcion.montoHasta);
  const [costoMembresia, setCostoMembresia] = useState(
    tipoSuscripcion.costoMembresia
  );

  const [nombreError, setNombreError] = useState("");
  const [numeroUsuariosMaxError, setnumeroUsuariosMaxError] = useState("");
  const [montoDesdeError, setMontoDesdeError] = useState("");
  const [montoHastaError, setMontoHastaError] = useState("");
  const [costoMembresiaError, setCostoMembresiaError] = useState("");

  const closeHandler = () => {
    setVisible(false);
    onClose();
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  const validarNombre = (nombre: string) => {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(nombre)) {
      return t("modalEditTipoSuscripcion.onlyLettersName");
    }
    return "";
  };

  const actualizarHandler = async () => {
    let valid = true;

    if (!nombre) {
      setNombreError(t("modalEditTipoSuscripcion.requiredName"));
      valid = false;
    } else {
      const nombreError = validarNombre(nombre);
      if (nombreError) {
        setNombreError(nombreError);
        valid = false;
      } else {
        setNombreError("");
      }
    }

    if (
      numeroUsuariosMax === null ||
      numeroUsuariosMax < 0 ||
      numeroUsuariosMax > 1000000
    ) {
      setnumeroUsuariosMaxError(t("modalEditTipoSuscripcion.requiredMaxUsers"));
      valid = false;
    } else {
      setnumeroUsuariosMaxError("");
    }

    if (montoDesde === null || montoDesde < 0) {
      setMontoDesdeError(t("modalEditTipoSuscripcion.requiredMinAmount"));
      valid = false;
    } else {
      setMontoDesdeError("");
    }

    if (montoHasta === null || montoHasta < 1) {
      setMontoHastaError(t("modalEditTipoSuscripcion.requiredMaxAmount"));
      valid = false;
    } else {
      setMontoHastaError("");
    }

    if (montoDesde >= montoHasta) {
      setMontoHastaError(t("modalEditTipoSuscripcion.maxAmountThat"));
      valid = false;
    } else {
      setMontoHastaError("");
    }

    if (costoMembresia === null) {
      setCostoMembresiaError(t("modalEditTipoSuscripcion.requiredCost"));
      valid = false;
    } else {
      setCostoMembresiaError("");
    }

    if (costoMembresia <= 0) {
      setCostoMembresiaError(t("modalEditTipoSuscripcion.costZero"));
      valid = false;
    } else {
      setCostoMembresiaError("");
    }

    if (!valid) {
      return;
    }
    const encryptedNombre = aesEncrypt(nombre);
    const encryptednumeroUsuariosMax = aesEncrypt(numeroUsuariosMax.toString());
    const encryptedmontoDesde = aesEncrypt(montoDesde.toString());
    const encryptedmontoHasta = aesEncrypt(montoHasta.toString());
    const encryptedcostoMembresia = aesEncrypt(costoMembresia.toString());

    const data = {
      nombreSuscripcion: encryptedNombre,
      numeroUsuariosMax: encryptednumeroUsuariosMax,
      montoDesde: encryptedmontoDesde,
      montoHasta: encryptedmontoHasta,
      costoMembresia: encryptedcostoMembresia,
    };

    try {
      const response = await service.updateTipoSuscripcion(
        tipoSuscripcion.idTipoSuscripcion,
        data
      );
      if (response.status === 200) {
        toast.success(t("modalEditTipoSuscripcion.suscripcionEdited"));
        handleUpdate(tipoSuscripcion);
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
        preventClose
        blur
        width="30%"
      >
        <Card
          variant="flat"
          css={{ display: "flex", alignItems: "center", flexDirection: "row" }}
        >
          <Modal.Body>
            <Text h5 css={{ textAlign: "center" }}>
              {t("modalEditTipoSuscripcion.suscripcionName")}
            </Text>
            <Input
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              aria-labelledby="Nombre"
            />
            {nombreError && <Text color="error">{nombreError}</Text>}
            <Text h5 css={{ textAlign: "center" }}>
              {t("modalEditTipoSuscripcion.maxUsers")}
            </Text>
            <Input
              value={numeroUsuariosMax}
              type="number"
              min={0}
              max={100}
              pattern="[0-9]*"
              onChange={(event) =>
                setnumeroUsuariosMax(Number(event.target.value))
              }
              aria-labelledby="numeroUsuariosMax"
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(
                  0,
                  Math.min(1000000, parseInt(target.value) || 0)
                ).toString();
              }}
            />

            {numeroUsuariosMaxError && (
              <Text color="error">{numeroUsuariosMaxError}</Text>
            )}
            <Text h5 css={{ textAlign: "center" }}>
              {t("modalEditTipoSuscripcion.minAmount")}
            </Text>
            <Input
              type="number"
              value={montoDesde}
              min={0}
              pattern="[0-9]*"
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(0, parseInt(target.value) || 0)
                  .toString()
                  .slice(0, 7);
              }}
              onChange={(event) => setMontoDesde(Number(event.target.value))}
              aria-labelledby="Numero de meses minimo"
            />
            {montoDesdeError && <Text color="error">{montoDesdeError}</Text>}
            <Text h5 css={{ textAlign: "center" }}>
              {t("modalEditTipoSuscripcion.maxAmount")}
            </Text>
            <Input
              type="number"
              min={0}
              pattern="[0-9]*"
              value={montoHasta}
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(0, parseInt(target.value) || 0)
                  .toString()
                  .slice(0, 7);
              }}
              onChange={(event) => setMontoHasta(Number(event.target.value))}
              aria-labelledby="Numero de meses maximo"
            />
            {montoHastaError && <Text color="error">{montoHastaError}</Text>}

            <Text h5 css={{ textAlign: "center" }}>
              {t("modalEditTipoSuscripcion.cost")}
            </Text>
            <Input
              value={costoMembresia}
              type="number"
              min={0}
              max={100}
              pattern="[0-9]*"
              onChange={(event) =>
                setCostoMembresia(Number(event.target.value))
              }
              aria-labelledby="numeroUsuariosMax"
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(
                  0,
                  Math.min(1000000, parseInt(target.value) || 0)
                ).toString();
              }}
            />

            {costoMembresiaError && (
              <Text color="error">{costoMembresiaError}</Text>
            )}
          </Modal.Body>
        </Card>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <Button auto onPress={actualizarHandler}>
            {t("modalEditTipoSuscripcion.update")}
          </Button>
          <Button auto color="error" onPress={closeHandler}>
            {t("modalEditTipoSuscripcion.cancel")}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ModalEditFidelidad;
