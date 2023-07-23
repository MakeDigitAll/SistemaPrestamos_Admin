import React, { useState } from "react";
import { Modal, Button, Text, Input, Card, useInput } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import service from "../../../services/service";
import { aesEncrypt } from "../../../utils/crypto/encryption";
import { TipoSuscripcion } from "../../../types/TipoSuscripcion";
import { useTranslation } from "react-i18next";

interface AgregarUsuarioProps {
  onClose: () => void;
  handleUpdate: (tipoSuscripciones: TipoSuscripcion) => void;
}

const ModalAddTipoSuscripcion: React.FC<AgregarUsuarioProps> = ({
  onClose,
  handleUpdate,
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const { value: nombreValue, bindings: nombreBindings } = useInput("");
  const { value: numeroUsuariosMaxValue, bindings: numeroUsuariosMaxBindings } =
    useInput("");
  const { value: montoDesdeValue, bindings: montoDesdeBindings } = useInput("");
  const { value: montoHastaValue, bindings: montoHastaBindings } = useInput("");
  const { value: costoMembresiaValue, bindings: costoMembresiaBindings } =
    useInput("");

  const [nombreError, setNombreError] = useState("");
  const [numeroUsuariosMaxError, setnumeroUsuariosMaxError] = useState("");
  const [montoDesdeError, setMontoDesdeError] = useState("");
  const [montoHastaError, setMontoHastaError] = useState("");
  const [costoMembresiaError, setCostoMembresiaError] = useState("");

  const closeHandler = () => {
    setVisible(false);
    onClose();
  };

  const validarNombre = (nombre: string) => {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(nombre)) {
      return t("modalAddTipoSuscripcion.onlyLettersName");
    }
    return "";
  };

  const agregarUsuarioHandler = async () => {
    let valid = true;

    if (!nombreValue) {
      setNombreError(t("modalAddTipoSuscripcion.requiredName"));
      valid = false;
    } else {
      const nombreError = validarNombre(nombreValue);
      if (nombreError) {
        setNombreError(nombreError);
        valid = false;
      } else {
        setNombreError("");
      }
    }

    if (numeroUsuariosMaxValue === "") {
      setnumeroUsuariosMaxError(t("modalAddTipoSuscripcion.requiredMaxUsers"));
      valid = false;
    } else if (
      Number(numeroUsuariosMaxValue) < 0 ||
      Number(numeroUsuariosMaxValue) > 1000000
    ) {
      setnumeroUsuariosMaxError(t("modalAddTipoSuscripcion.userBetween"));
      valid = false;
    } else {
      setnumeroUsuariosMaxError("");
    }

    if (montoDesdeValue === "") {
      setMontoDesdeError(t("modalAddTipoSuscripcion.requiredMinAmount"));
      valid = false;
    } else if (Number(montoDesdeValue) < 0) {
      setMontoDesdeError(t("modalAddTipoSuscripcion.amountZero"));
      valid = false;
    } else {
      setMontoDesdeError("");
    }

    if (montoHastaValue === "") {
      setMontoHastaError(t("modalAddTipoSuscripcion.requiredMaxAmount"));
      valid = false;
    } else if (Number(montoHastaValue) < 1) {
      setMontoHastaError(t("modalAddTipoSuscripcion.maxAmountOne"));
      valid = false;
    } else {
      setMontoHastaError("");
    }

    if (Number(montoDesdeValue) >= Number(montoHastaValue)) {
      setMontoHastaError(t("modalAddTipoSuscripcion.maxAmountThat"));
      valid = false;
    } else {
      setMontoHastaError("");
    }

    if (costoMembresiaValue === "") {
      setCostoMembresiaError(t("modalAddTipoSuscripcion.requiredCost"));
      valid = false;
    } else if (Number(costoMembresiaValue) <= 0) {
      setCostoMembresiaError(t("modalAddTipoSuscripcion.costZero"));
      valid = false;
    } else {
      setCostoMembresiaError("");
    }

    if (!valid) {
      return;
    }

    const encryptedNombre = aesEncrypt(nombreValue);
    const encryptednumeroUsuariosMax = aesEncrypt(numeroUsuariosMaxValue);
    const encryptedmontoDesde = aesEncrypt(montoDesdeValue);
    const encryptedmontoHasta = aesEncrypt(montoHastaValue);
    const encryptedcostoMembresia = aesEncrypt(costoMembresiaValue);

    const data = {
      nombreSuscripcion: encryptedNombre,
      numeroUsuariosMax: encryptednumeroUsuariosMax,
      montoDesde: encryptedmontoDesde,
      montoHasta: encryptedmontoHasta,
      costoMembresia: encryptedcostoMembresia,
    };

    try {
      const response = await service.agregarTipoSuscripcion(data);
      if (response.status === 200) {
        toast.success(t("modalAddTipoSuscripcion.addedSuscripcion"));
        handleUpdate(response.data);
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
              {t("modalAddTipoSuscripcion.suscripcionName")}
            </Text>
            <Input {...nombreBindings} aria-labelledby="Nombre" />
            {nombreError && <Text color="error">{nombreError}</Text>}
            <Text h5 css={{ textAlign: "center" }}>
              {t("modalAddTipoSuscripcion.maxUsers")}
            </Text>
            <Input
              {...numeroUsuariosMaxBindings}
              type="number"
              min={0}
              max={1000000}
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(
                  0,
                  Math.min(1000000, parseInt(target.value) || 0)
                ).toString();
              }}
              aria-labelledby="numeroUsuariosMax"
            />

            {numeroUsuariosMaxError && (
              <Text color="error">{numeroUsuariosMaxError}</Text>
            )}
            <Text h5 css={{ textAlign: "center" }}>
              {t("modalAddTipoSuscripcion.minAmount")}
            </Text>
            <Input
              type="number"
              {...montoDesdeBindings}
              min={0}
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(0, parseInt(target.value) || 0)
                  .toString()
                  .slice(0, 7);
              }}
              aria-labelledby="Numero de meses minimo"
            />
            {montoDesdeError && <Text color="error">{montoDesdeError}</Text>}
            <Text h5 css={{ textAlign: "center" }}>
              {t("modalAddTipoSuscripcion.maxAmount")}
            </Text>
            <Input
              type="number"
              {...montoHastaBindings}
              min={0}
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(0, parseInt(target.value) || 0)
                  .toString()
                  .slice(0, 7);
              }}
              aria-labelledby="Numero de meses maximo"
            />
            {montoHastaError && <Text color="error">{montoHastaError}</Text>}

            <Text h5 css={{ textAlign: "center" }}>
              {t("modalAddTipoSuscripcion.cost")}
            </Text>
            <Input
              {...costoMembresiaBindings}
              type="number"
              min={0}
              max={100}
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(
                  0,
                  Math.min(1000000, parseInt(target.value) || 0)
                ).toString();
              }}
              aria-labelledby="numeroUsuariosMax"
            />

            {costoMembresiaError && (
              <Text color="error">{costoMembresiaError}</Text>
            )}
          </Modal.Body>
        </Card>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <Button auto onPress={agregarUsuarioHandler}>
            {t("modalAddTipoSuscripcion.addSuscripcion")}
          </Button>
          <Button auto color="error" onPress={closeHandler}>
            {t("modalAddTipoSuscripcion.cancel")}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ModalAddTipoSuscripcion;
