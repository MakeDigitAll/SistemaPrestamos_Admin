import React, { useState } from "react";
import { Modal, Button, Text, Input, Card, useInput } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import service from "../../../services/service";
import { aesEncrypt } from "../../../utils/encryption";
import { NivelesFidelidad } from "../../../types/NivelesFidelidad";

interface AgregarUsuarioProps {
  onClose: () => void;
  handleUpdate: (niveles: NivelesFidelidad) => void;
}

const InfoNivelFidelidad: React.FC<AgregarUsuarioProps> = ({
  onClose,
  handleUpdate,
}) => {
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
      return "El nombre solo debe contener letras";
    }
    return "";
  };

  const agregarUsuarioHandler = async () => {
    let valid = true;

    if (!nombreValue) {
      setNombreError("El nombre es obligatorio");
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
      setDescuentoError("El descuento es obligatorio");
      valid = false;
    } else if (Number(descuentoValue) < 0 || Number(descuentoValue) > 100) {
      setDescuentoError("El descuento debe estar entre 0 y 100");
      valid = false;
    } else {
      setDescuentoError("");
    }

    if (numeroMesesMinimoValue === "") {
      setNumeroMesesMinimoError("El número de meses mínimo es obligatorio");
      valid = false;
    } else if (Number(numeroMesesMinimoValue) < 0) {
      setNumeroMesesMinimoError(
        "El número de meses mínimo debe ser mayor o igual a 0"
      );
      valid = false;
    } else {
      setNumeroMesesMinimoError("");
    }

    if (numeroMesesMaximoValue === "") {
      setNumeroMesesMaximoError("El número de meses máximo es obligatorio");
      valid = false;
    } else if (Number(numeroMesesMaximoValue) <= 1) {
      setNumeroMesesMaximoError("El número de meses máximo debe ser mayor a 1");
      valid = false;
    } else {
      setNumeroMesesMaximoError("");
    }

    if (Number(numeroMesesMinimoValue) >= Number(numeroMesesMaximoValue)) {
      setNumeroMesesMaximoError(
        "El número de meses máximo debe ser mayor al mínimo"
      );
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
        const successMessage = "Nivel registrado con éxito.";
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
              Nombre del Nivel de Fidelidad
            </Text>
            <Input {...nombreBindings} aria-labelledby="Nombre" />
            {nombreError && <Text color="error">{nombreError}</Text>}
            <Text h5 css={{ textAlign: "center" }}>
              Descuento en %
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
              Numero de meses mínimo
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
              Numero de meses máximo
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
            Agregar
          </Button>
          <Button auto color="error" onPress={closeHandler}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default InfoNivelFidelidad;
