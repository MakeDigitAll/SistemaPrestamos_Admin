import React, { useState } from "react";
import { Card, Avatar, Button, Grid, Input, useInput } from "@nextui-org/react";
import { aesEncrypt } from "../../../utils/encryption";
import service from "../../../services/service";
import { toast } from "react-toastify";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ContentAddUsuario: React.FC = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellidosError, setApellidosError] = useState("");
  const [numeroTelefonoError, setNumeroTelefonoError] = useState("");

  const [sliderValue, setSliderValue] = useState<number | number[]>([
    1000, 10000,
  ]);
  const [userSliderValue, setUserSliderValue] = useState<number | number[]>(20);

  const validateEmail = (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value);
  };

  const {
    value: emailValue,
    reset: resetEmail,
    bindings: emailBindings,
  } = useInput("");

  const {
    value: passwordValue,
    reset: resetPassword,
    bindings: passwordBindings,
  } = useInput("");

  const {
    value: nombreValue,
    reset: resetNombre,
    bindings: nombreBindings,
  } = useInput("");

  const {
    value: apellidosValue,
    reset: resetApellidos,
    bindings: apellidosBindings,
  } = useInput("");

  const {
    value: numeroTelefonoValue,
    reset: resetNumeroTelefono,
    bindings: numeroTelefonoBindings,
  } = useInput("");

  const handleRegister = async () => {
    let hasError = false;

    if (nombreValue === "") {
      setNombreError("Ingrese su nombre.");
      hasError = true;
    } else {
      setNombreError("");
    }

    if (apellidosValue === "") {
      setApellidosError("Ingrese sus apellidos.");
      hasError = true;
    } else {
      setApellidosError("");
    }

    if (emailValue === "") {
      setEmailError("Ingrese su correo electrónico.");
      hasError = true;
    } else if (!validateEmail(emailValue)) {
      setEmailError("Ingrese un correo electrónico válido.");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (passwordValue === "") {
      setPasswordError("Ingrese su contraseña.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (numeroTelefonoValue === "") {
      setNumeroTelefonoError("Ingrese su número de teléfono.");
      hasError = true;
    } else if (numeroTelefonoValue.length !== 10) {
      setNumeroTelefonoError("El número de teléfono debe tener 10 dígitos.");
      hasError = true;
    } else {
      setNumeroTelefonoError("");
    }

    if (hasError) {
      return;
    }

    try {
      // Registro de datos en la base de datos
      const encryptedNombre = aesEncrypt(nombreValue);
      const encryptedApellidos = aesEncrypt(apellidosValue);
      const encryptedEmail = aesEncrypt(emailValue.toLowerCase());
      const encryptedPassword = aesEncrypt(passwordValue);
      const encryptedMontoMinimo = aesEncrypt(
        Array.isArray(sliderValue)
          ? sliderValue[0].toString()
          : sliderValue.toString()
      );
      const encryptedMontoMaximo = aesEncrypt(
        Array.isArray(sliderValue)
          ? sliderValue[1].toString()
          : sliderValue.toString()
      );
      const encryptedNumeroTelefono = aesEncrypt(numeroTelefonoValue);
      const encryptedNumeroClientes = aesEncrypt(userSliderValue.toString());

      const data = {
        nombre: encryptedNombre,
        apellidos: encryptedApellidos,
        email: encryptedEmail,
        password: encryptedPassword,
        montoMinimo: encryptedMontoMinimo,
        montoMaximo: encryptedMontoMaximo,
        numeroTelefono: encryptedNumeroTelefono,
        numeroClientes: encryptedNumeroClientes,
      };

      const response = await service.createUsuarioPrestamista(data);

      if (response.status === 200) {
        toast.success("Usuario registrado con éxito.");
        resetNombre();
        resetApellidos();
        resetEmail();
        resetPassword();
        resetNumeroTelefono();
        setSliderValue([1000, 10000]);
        setUserSliderValue(20);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setEmailError("El correo electrónico ya está registrado.");
      }
    }
  };

  const formatValue = (value: number | number[]): string => {
    let minValue = 0;
    let maxValue = 0;

    if (typeof value === "number") {
      minValue = value;
      maxValue = value;
    } else if (Array.isArray(value)) {
      [minValue, maxValue] = value;
    }

    const formattedMinValue = minValue.toLocaleString();
    const formattedMaxValue = maxValue.toLocaleString();

    return `Desde: $${formattedMinValue} Hasta: $${formattedMaxValue}`;
  };

  const handleSliderChange = (value: number | number[]): void => {
    setSliderValue(value);
  };

  const handleUserSliderChange = (value: number | number[]): void => {
    setUserSliderValue(value);
  };

  const renderInputField = (
    label: string,
    value: string,
    error: string,
    bindings: any,
    type: string,
    autoComplete: string
  ) => (
    <>
      <Grid
        css={{
          justifyContent: "left",
          alignSelf: "left",
        }}
      >
        <Input
          {...bindings}
          rounded
          bordered
          width="100%"
          type={type}
          label={label}
          status={error ? "error" : "default"}
          color={error ? "error" : "default"}
          helperColor={error ? "error" : "default"}
          helperText={error ? error : ""}
          name={label.toLowerCase()}
          aria-label={label.toLowerCase()}
          css={{ marginBottom: "10%" }}
          autoComplete={autoComplete}
        />
      </Grid>
    </>
  );

  return (
    <div>
      <Card
        css={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          width: "70%",
          height: "700px",
          marginLeft: "15%",
          marginTop: "8%",
        }}
      >
        <Card.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Avatar
              src="https://i.pravatar.cc/300"
              css={{
                marginRight: "10%",
                width: "20%",
                height: "20%",
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1, marginRight: "1%" }}>
                  {renderInputField(
                    "Nombre",
                    nombreValue,
                    nombreError,
                    nombreBindings,
                    "text",
                    "new-nombre"
                  )}
                </div>
                <div style={{ flex: 1, marginLeft: "1%" }}>
                  {renderInputField(
                    "Apellidos",
                    apellidosValue,
                    apellidosError,
                    apellidosBindings,
                    "text",
                    "new-apellidos"
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "1%",
                }}
              >
                <div style={{ flex: 1, marginRight: "1%" }}>
                  {renderInputField(
                    "Correo Electrónico",
                    emailValue,
                    emailError,
                    emailBindings,
                    "email",
                    "new-correo"
                  )}
                </div>
                <div style={{ flex: 1, marginLeft: "1%" }}>
                  {renderInputField(
                    "Contraseña",
                    passwordValue,
                    passwordError,
                    passwordBindings,
                    "password",
                    "new-password"
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "1%",
                }}
              >
                <div style={{ flex: 1, marginRight: "1%" }}>
                  {renderInputField(
                    "Numero de Teléfono",
                    numeroTelefonoValue,
                    numeroTelefonoError,
                    numeroTelefonoBindings,
                    "number",
                    "new-telefono"
                  )}
                </div>
                <div style={{ flex: 1, marginLeft: "1%" }}></div>
              </div>

              <div style={{ flex: 1 }}>
                <h5>¿Cuánto dinero se va a prestar?</h5>
                <div>
                  <Slider
                    ariaLabelledByForHandle={"slider-handle-1"}
                    range
                    railStyle={{ backgroundColor: "#000000" }}
                    min={1000}
                    max={1000000}
                    step={1000}
                    defaultValue={[1000, 10000]}
                    onChange={handleSliderChange}
                  />
                  <div>{formatValue(sliderValue)}</div>
                </div>
              </div>
              <div style={{ flex: 1, marginTop: "5%" }}>
                <h5>¿A Cuántos Usuarios Planeas Prestar?</h5>
                <div>
                  <Slider
                    ariaLabelledByForHandle={"slider-handle-1"}
                    railStyle={{ backgroundColor: "#000000" }}
                    min={10}
                    max={10000}
                    step={10}
                    defaultValue={userSliderValue}
                    onChange={handleUserSliderChange}
                  />
                  <div>{`${userSliderValue} Usuarios`}</div>
                </div>
              </div>
            </div>
          </div>
          <Button style={{ marginTop: "10%" }} onClick={handleRegister}>
            Registrar
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ContentAddUsuario;
