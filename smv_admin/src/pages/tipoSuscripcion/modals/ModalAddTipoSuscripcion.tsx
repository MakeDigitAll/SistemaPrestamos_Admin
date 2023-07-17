import React, { useState } from "react";
import { Modal, Button, Text, Input, Card, useInput } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import service from "../../../services/service";
import { aesEncrypt } from "../../../utils/encryption";
import { TipoSuscripcion } from "../../../types/TipoSuscripcion";

interface AgregarUsuarioProps {
  onClose: () => void;
  handleUpdate: (tipoSuscripciones: TipoSuscripcion) => void;
}

const ModalEditFidelidad: React.FC<AgregarUsuarioProps> = ({
  onClose,
  handleUpdate,
}) => {
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

    if (numeroUsuariosMaxValue === "") {
      setnumeroUsuariosMaxError("El número de usuarios máximos es obligatorio");
      valid = false;
    } else if (
      Number(numeroUsuariosMaxValue) < 0 ||
      Number(numeroUsuariosMaxValue) > 1000000
    ) {
      setnumeroUsuariosMaxError(
        "El número de usuarios máximos debe estar entre 0 y 1000000"
      );
      valid = false;
    } else {
      setnumeroUsuariosMaxError("");
    }

    if (montoDesdeValue === "") {
      setMontoDesdeError("El monto de dinero mínimo es obligatorio");
      valid = false;
    } else if (Number(montoDesdeValue) < 0) {
      setMontoDesdeError(
        "El monto de dinero mínimo debe ser mayor o igual a 0"
      );
      valid = false;
    } else {
      setMontoDesdeError("");
    }

    if (montoHastaValue === "") {
      setMontoHastaError("El monto de dinero máximo es obligatorio");
      valid = false;
    } else if (Number(montoHastaValue) < 1) {
      setMontoHastaError("El monto de dinero máximo debe ser mayor a 1");
      valid = false;
    } else {
      setMontoHastaError("");
    }

    if (Number(montoDesdeValue) >= Number(montoHastaValue)) {
      setMontoHastaError("El número de monto máximo debe ser mayor al mínimo");
      valid = false;
    } else {
      setMontoHastaError("");
    }

    if (costoMembresiaValue === "") {
      setCostoMembresiaError("El costo de la Suscripcion es obligatorio");
      valid = false;
    } else if (Number(costoMembresiaValue) <= 0) {
      setCostoMembresiaError("El costo de la suscripcion debe ser mayor a 0");
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
        toast.success("Suscripción agregada correctamente");
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
              Nombre de la Suscripción
            </Text>
            <Input {...nombreBindings} aria-labelledby="Nombre" />
            {nombreError && <Text color="error">{nombreError}</Text>}
            <Text h5 css={{ textAlign: "center" }}>
              Número Máximo de Usuarios
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
              Monto a Presentar Desde
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
              Monto a Presentar Hasta
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
              Costo de la Suscripción
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

export default ModalEditFidelidad;
