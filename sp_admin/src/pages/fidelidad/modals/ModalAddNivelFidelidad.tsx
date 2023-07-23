import React, { useState } from "react";
import { Modal, Button, Text, Input, Card, useInput } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import service from "../../../services/service";
import { aesEncrypt } from "../../../utils/encryption";
import { NivelesFidelidad } from "../../../types/NivelesFidelidad";
import { useTranslation } from "react-i18next";

interface AgregarUsuarioProps {
  onClose: () => void;
  handleUpdate: (niveles: NivelesFidelidad) => void;
}

const InfoNivelFidelidad: React.FC<AgregarUsuarioProps> = ({
  onClose,
  handleUpdate,
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const { value: nombreValue, bindings: nombreBindings } = useInput("");
  const { value: descuentoValue, bindings: descuentoBindings } = useInput("");

  const { value: numeroMesesMinimoValue, bindings: numeroMesesMinimoBindings } =
    useInput("");

  const { value: numeroMesesMaximoValue, bindings: numeroMesesMaximoBindings } =
    useInput("");

  const [nombreError, setNombreError] = useState("");
  const [descuentoError, setDescuentoError] = useState("");
  const [numeroMesesMinimoError, setNumeroMesesMinimoError] = useState("");
  const [numeroMesesMaximoError, setNumeroMesesMaximoError] = useState("");

  const closeHandler = () => {
    setVisible(false);
    onClose();
  };

  const validarNombre = (nombre: string) => {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(nombre)) {
      return t("modalAddTipoFidelidad.onlyLettersName");
    }
    return "";
  };

  const agregarUsuarioHandler = async () => {
    let valid = true;

    if (!nombreValue) {
      setNombreError(t("modalAddTipoFidelidad.requiredName"));
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

    if (descuentoValue === "") {
      setDescuentoError(t("modalAddTipoFidelidad.requiredDiscount"));
      valid = false;
    } else if (Number(descuentoValue) < 0 || Number(descuentoValue) > 100) {
      setDescuentoError(t("modalAddTipoFidelidad.discountBetween"));
      valid = false;
    } else {
      setDescuentoError("");
    }

    if (numeroMesesMinimoValue === "") {
      setNumeroMesesMinimoError(t("modalAddTipoFidelidad.requiredMinMonths"));
      valid = false;
    } else if (Number(numeroMesesMinimoValue) < 0) {
      setNumeroMesesMinimoError(t("modalAddTipoFidelidad.minMonthsZero"));
      valid = false;
    } else {
      setNumeroMesesMinimoError("");
    }

    if (numeroMesesMaximoValue === "") {
      setNumeroMesesMaximoError(t("modalAddTipoFidelidad.requiredMaxMonths"));
      valid = false;
    } else if (Number(numeroMesesMaximoValue) <= 1) {
      setNumeroMesesMaximoError(t("modalAddTipoFidelidad.maxMonthsOne"));
      valid = false;
    } else {
      setNumeroMesesMaximoError("");
    }

    if (Number(numeroMesesMinimoValue) >= Number(numeroMesesMaximoValue)) {
      setNumeroMesesMaximoError(t("modalAddTipoFidelidad.maxMonthsThat"));
      valid = false;
    } else {
      setNumeroMesesMaximoError("");
    }

    if (!valid) {
      return;
    }

    const encryptedNombre = aesEncrypt(nombreValue);
    const encryptedDescuento = aesEncrypt(descuentoValue.toString());
    const encryptedNumeroMesesMinimo = aesEncrypt(
      numeroMesesMinimoValue.toString()
    );
    const encryptedNumeroMesesMaximo = aesEncrypt(
      numeroMesesMaximoValue.toString()
    );

    const data = {
      nombreNivelFidelidad: encryptedNombre,
      descuento: encryptedDescuento,
      numeroMesesMinimo: encryptedNumeroMesesMinimo,
      numeroMesesMaximo: encryptedNumeroMesesMaximo,
    };

    try {
      const response = await service.agregarNivelFidelidad(data);
      console.log(response);
      if (response.status === 200) {
        const successMessage = t("modalAddTipoFidelidad.addedFidelidad");
        toast.success(successMessage);
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
              {t("modalAddTipoFidelidad.fidelidadName")}
            </Text>
            <Input {...nombreBindings} aria-labelledby="Nombre" />
            {nombreError && <Text color="error">{nombreError}</Text>}
            <Text h5 css={{ textAlign: "center" }}>
              {t("modalAddTipoFidelidad.discount")}
            </Text>
            <Input
              {...descuentoBindings}
              type="number"
              min={0}
              max={100}
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(
                  0,
                  Math.min(100, parseInt(target.value) || 0)
                ).toString();
              }}
              aria-labelledby="Descuento"
            />
            {descuentoError && <Text color="error">{descuentoError}</Text>}
            <Text h5 css={{ textAlign: "center" }}>
              {t("modalAddTipoFidelidad.minMonths")}
            </Text>
            <Input
              {...numeroMesesMinimoBindings}
              type="number"
              min={0}
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(0, parseInt(target.value) || 0)
                  .toString()
                  .slice(0, 4);
              }}
              aria-labelledby="Numero de meses mínimo"
            />
            {numeroMesesMinimoError && (
              <Text color="error">{numeroMesesMinimoError}</Text>
            )}
            <Text h5 css={{ textAlign: "center" }}>
              {t("modalAddTipoFidelidad.maxMonths")}
            </Text>
            <Input
              {...numeroMesesMaximoBindings}
              type="number"
              min={0}
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(0, parseInt(target.value) || 0)
                  .toString()
                  .slice(0, 4);
              }}
              aria-labelledby="Numero de meses máximo"
            />
            {numeroMesesMaximoError && (
              <Text color="error">{numeroMesesMaximoError}</Text>
            )}
          </Modal.Body>
        </Card>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <Button auto onPress={agregarUsuarioHandler}>
            {t("modalAddTipoFidelidad.addFidelidad")}
          </Button>
          <Button auto color="error" onPress={closeHandler}>
            {t("modalAddTipoFidelidad.cancel")}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default InfoNivelFidelidad;
