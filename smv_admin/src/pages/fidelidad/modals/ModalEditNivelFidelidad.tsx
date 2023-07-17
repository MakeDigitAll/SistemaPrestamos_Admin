import React, { useEffect, useState } from "react";
import { Modal, Button, Text, Input, Card } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import service from "../../../services/service";
import { aesEncrypt } from "../../../utils/encryption";
import { NivelesFidelidad } from "../../../types/NivelesFidelidad";

interface InformacionNivelProps {
  nivel: NivelesFidelidad;
  onClose: () => void;
  handleUpdate: (niveles: NivelesFidelidad) => void;
}

const ModalEditFidelidad: React.FC<InformacionNivelProps> = ({
  nivel,
  onClose,
  handleUpdate,
}) => {
  const [visible, setVisible] = useState(false);
  const [nombre, setNombre] = useState(nivel.nombreNivelFidelidad);
  const [descuento, setDescuento] = useState(nivel.descuento);
  const [numeroMesesMinimo, setNumeroMesesMinimo] = useState(
    nivel.numeroMesesMinimo
  );
  const [numeroMesesMaximo, setNumeroMesesMaximo] = useState(
    nivel.numeroMesesMaximo
  );

  const [nombreError, setNombreError] = useState("");
  const [descuentoError, setDescuentoError] = useState("");
  const [numeroMesesMinimoError, setNumeroMesesMinimoError] = useState("");
  const [numeroMesesMaximoError, setNumeroMesesMaximoError] = useState("");

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
      return "El nombre solo debe contener letras";
    }
    return "";
  };

  const actualizarHandler = async () => {
    let valid = true;

    if (!nombre) {
      setNombreError("El nombre es obligatorio");
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

    if (descuento === null || descuento < 0 || descuento > 100) {
      setDescuentoError("El descuento es obligatorio");
      valid = false;
    } else {
      setDescuentoError("");
    }

    if (numeroMesesMinimo === null || numeroMesesMinimo < 0) {
      setNumeroMesesMinimoError("El número de meses mínimo es obligatorio");
      valid = false;
    } else {
      setNumeroMesesMinimoError("");
    }

    if (numeroMesesMaximo === null || numeroMesesMaximo < 1) {
      setNumeroMesesMaximoError("El número de meses máximo es obligatorio");
      valid = false;
    } else {
      setNumeroMesesMaximoError("");
    }

    if (numeroMesesMinimo >= numeroMesesMaximo) {
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
    const encryptedNombre = aesEncrypt(nombre);
    const encryptedDescuento = aesEncrypt(descuento.toString());
    const encryptedNumeroMesesMinimo = aesEncrypt(numeroMesesMinimo.toString());
    const encryptedNumeroMesesMaximo = aesEncrypt(numeroMesesMaximo.toString());

    const data = {
      nombreNivelFidelidad: encryptedNombre,
      descuento: encryptedDescuento,
      numeroMesesMinimo: encryptedNumeroMesesMinimo,
      numeroMesesMaximo: encryptedNumeroMesesMaximo,
    };

    try {
      const response = await service.updateNivelFidelidad(
        nivel.idNivelFidelidad,
        data
      );
      if (response.status === 200) {
        toast.success("Nivel Editado Correctamente");
        handleUpdate(nivel);
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
              Nombre del Nivel
            </Text>
            <Input
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              aria-labelledby="Nombre"
            />
            {nombreError && <Text color="error">{nombreError}</Text>}
            <Text h5 css={{ textAlign: "center" }}>
              Descuento
            </Text>
            <Input
              value={descuento}
              type="number"
              min={0}
              max={100}
              pattern="[0-9]*"
              onChange={(event) => setDescuento(Number(event.target.value))}
              aria-labelledby="Descuento"
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(
                  0,
                  Math.min(100, parseInt(target.value) || 0)
                ).toString();
              }}
            />

            {descuentoError && <Text color="error">{descuentoError}</Text>}
            <Text h5 css={{ textAlign: "center" }}>
              Numero de meses minimo
            </Text>
            <Input
              type="number"
              value={numeroMesesMinimo}
              min={0}
              pattern="[0-9]*"
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(0, parseInt(target.value) || 0)
                  .toString()
                  .slice(0, 4);
              }}
              onChange={(event) =>
                setNumeroMesesMinimo(Number(event.target.value))
              }
              aria-labelledby="Numero de meses minimo"
            />
            {numeroMesesMinimoError && (
              <Text color="error">{numeroMesesMinimoError}</Text>
            )}
            <Text h5 css={{ textAlign: "center" }}>
              Numero de meses maximo
            </Text>
            <Input
              type="number"
              min={0}
              pattern="[0-9]*"
              value={numeroMesesMaximo}
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                target.value = Math.max(0, parseInt(target.value) || 0)
                  .toString()
                  .slice(0, 4);
              }}
              onChange={(event) =>
                setNumeroMesesMaximo(Number(event.target.value))
              }
              aria-labelledby="Numero de meses maximo"
            />
            {numeroMesesMaximoError && (
              <Text color="error">{numeroMesesMaximoError}</Text>
            )}
          </Modal.Body>
        </Card>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <Button auto onPress={actualizarHandler}>
            Actualizar
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
