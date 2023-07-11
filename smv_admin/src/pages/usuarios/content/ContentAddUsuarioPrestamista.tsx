import React, { useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Grid,
  Input,
  useInput,
  Dropdown,
} from "@nextui-org/react";
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
  let montoMinValue;
  let montoMaxValue;
  const [sliderValue, setSliderValue] = useState<number | number[]>([
    1000, 10000,
  ]);
  const [userSliderValue, setUserSliderValue] = useState<number | number[]>(
    100
  );

  const validateEmail = (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value);
  };

  if (Array.isArray(sliderValue)) {
    montoMinValue = sliderValue[0];
    montoMaxValue = sliderValue[1];
  } else {
    montoMinValue = sliderValue;
    montoMaxValue = sliderValue;
  }

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
      const encryptedNombreNivel = aesEncrypt("tier1");

      const data = {
        nombre: encryptedNombre,
        apellidos: encryptedApellidos,
        email: encryptedEmail,
        password: encryptedPassword,
        montoMinimo: encryptedMontoMinimo,
        montoMaximo: encryptedMontoMaximo,
        numeroTelefono: encryptedNumeroTelefono,
        numeroClientes: encryptedNumeroClientes,
        nombreNivel: encryptedNombreNivel,
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
        setUserSliderValue(100);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setEmailError("El correo electrónico ya está registrado.");
      }
    }
  };

  const handleSliderChange = (value: number | number[]): void => {
    setSliderValue(value);
  };

  const handleUserSliderChange = (value: number | number[]): void => {
    setUserSliderValue(value);
  };

  const handleMontoMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    const parsedValue = parseInt(value, 10);

    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 100000) {
      const newSliderValue = Array.isArray(sliderValue)
        ? [parsedValue, sliderValue[1]]
        : parsedValue;
      setSliderValue(newSliderValue);
    }
  };

  const handleMontoMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    const parsedValue = parseInt(value, 10);

    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 100000) {
      const newSliderValue = Array.isArray(sliderValue)
        ? [sliderValue[0], parsedValue]
        : parsedValue;
      setSliderValue(newSliderValue);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 2000) {
      setUserSliderValue(value);
    }
  };

  const renderInputField = (
    label: string,
    value: string,
    error: string,
    bindings: any,
    type: string,
    autoComplete: string
  ) => (
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
  );

  return (
    <div>
      <Card
        css={{
          width: "fit-content",
          margin: "auto",
        }}
      >
        <Card.Header>
          <Avatar
            src="https://i.pravatar.cc/300"
            css={{
              width: "20%",
              height: "20%",
              margin: "auto",
            }}
          />
        </Card.Header>
        <Card.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: "-10%",
            }}
          >
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
                  <Input
                    {...numeroTelefonoBindings}
                    rounded
                    bordered
                    width="100%"
                    type="number"
                    label="Numero de Teléfono a 10 dígitos"
                    status={numeroTelefonoError ? "error" : "default"}
                    color={numeroTelefonoError ? "error" : "default"}
                    helperColor={numeroTelefonoError ? "error" : "default"}
                    helperText={numeroTelefonoError ? numeroTelefonoError : ""}
                    name="numero-telefono"
                    aria-label="numero-telefono"
                    css={{ marginBottom: "10%" }}
                    autoComplete="new-telefono"
                    min="0" // Evita números negativos
                    onInput={(event) => {
                      const target = event.target as HTMLInputElement;
                      target.value = Math.max(0, parseInt(target.value))
                        .toString()
                        .slice(0, 10); // Limita a 10 dígitos
                    }}
                  />
                </div>

                <div style={{ flex: 1, marginRight: "1%" }}>
                  <Dropdown isDisabled={true}>
                    <Dropdown.Button
                      style={{
                        width: "200px",
                        marginTop: "10%",
                        marginLeft: "13%",
                      }}
                    >
                      Suscripcion
                    </Dropdown.Button>
                    <Dropdown.Menu aria-label="Tipos de Suscrpcion">
                      <Dropdown.Item key="tier1">Estandar</Dropdown.Item>
                      <Dropdown.Item key="tier2">Avanzado</Dropdown.Item>
                      <Dropdown.Item key="tier3">Premium</Dropdown.Item>
                      <Dropdown.Item key="tierCustom" withDivider>
                        Personalizar
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <h5>¿Cuánto dinero se va a prestar?</h5>
                <div>
                  <Slider
                    ariaLabelledByForHandle={"slider-handle-1"}
                    range
                    railStyle={{ backgroundColor: "#000000" }}
                    min={1}
                    value={sliderValue}
                    max={100000}
                    step={1000}
                    onChange={handleSliderChange}
                  />
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
                    "Monto Mínimo $Mxn",
                    montoMinValue.toLocaleString(),
                    "",
                    { value: montoMinValue, onChange: handleMontoMinChange },
                    "number",
                    "new-monto-min"
                  )}
                </div>
                <div style={{ flex: 1, marginRight: "1%" }}>
                  {renderInputField(
                    "Monto Máximo $Mxn",
                    montoMaxValue.toLocaleString(),
                    "",
                    { value: montoMaxValue, onChange: handleMontoMaxChange },
                    "number",
                    "new-monto-max"
                  )}
                </div>
              </div>
              <div style={{ flex: 1, marginTop: "5%" }}>
                <h5>¿A Cuántos Usuarios Planeas Prestar?</h5>
                <div>
                  <Slider
                    ariaLabelledByForHandle={"slider-handle-1"}
                    railStyle={{ backgroundColor: "#000000" }}
                    min={1}
                    max={2000}
                    step={10}
                    value={userSliderValue}
                    onChange={handleUserSliderChange}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "1%",
                    }}
                  >
                    <div style={{ flex: 1, marginRight: "1%" }}>
                      {renderInputField(
                        "Usuarios",
                        userSliderValue.toString(),
                        "", // Puedes agregar un mensaje de error si es necesario
                        { value: userSliderValue, onChange: handleUserChange }, // Actualiza el valor y el evento onChange
                        "number",
                        "new-usuarios"
                      )}
                    </div>

                    <div style={{ flex: 1, marginRight: "1%" }}></div>
                  </div>
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
