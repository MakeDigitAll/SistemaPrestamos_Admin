import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Avatar,
  Button,
  Grid,
  Input,
  useInput,
  Dropdown,
} from "@nextui-org/react";
import { aesEncrypt } from "../../utils/encryption";
import service from "../../services/service";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import defaultImage from "../../assets/images/defaultProfile.png";
import { useGetTipoSuscripciones } from "../../hooks/useGetTipoSuscripciones";
import { TipoSuscripcion } from "../../types/TipoSuscripcion";

const ContentAddUsuario: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellidosError, setApellidosError] = useState("");
  const [numeroTelefonoError, setNumeroTelefonoError] = useState("");
  const [subscriptionTabEnabled, setSubscriptionTabEnabled] = useState(true);
  const getTipoSubcripciones = useGetTipoSuscripciones();
  const arrayTipoSuscripciones =
    getTipoSubcripciones?.decodedToken?.tipoSuscripcion;
  const [TipoSuscripciones, setTipoSuscripciones] = useState<TipoSuscripcion[]>(
    []
  );
  const navigate = useNavigate();
  const [selectedSubscription, setSelectedSubscription] = useState<string>("");

  let montoMinValue = 100;
  let montoMaxValue = 100;

  const getSelectedSubscription = useCallback(
    (usuariosAPrestar: number, montoMinimo: number, montoMaximo: number) => {
      // Iterar sobre cada tipo de suscripción
      for (const tipoSuscripcion of TipoSuscripciones) {
        // Verificar si los datos del usuario están dentro del rango de la suscripción actual
        if (
          usuariosAPrestar <= tipoSuscripcion.numeroUsuariosMax &&
          montoMinimo >= tipoSuscripcion.montoDesde &&
          montoMaximo <= tipoSuscripcion.montoHasta
        ) {
          return tipoSuscripcion.nombreSuscripcion;
        }
      }

      // Si no se encontró ninguna suscripción que cumpla con los criterios, devolver un valor por defecto o null
      return "Suscripción no encontrada";
    },
    [TipoSuscripciones]
  );

  const [sliderValue, setSliderValue] = useState<number | number[]>([
    1000, 10000,
  ]);
  const [userSliderValue, setUserSliderValue] = useState<number | number[]>(
    100
  );

  //useEffect para setear los tipos de suscripciones
  useEffect(() => {
    if (arrayTipoSuscripciones) {
      setTipoSuscripciones(arrayTipoSuscripciones);
    }
  }, [arrayTipoSuscripciones]);

  useEffect(() => {
    const selectedSubscription = getSelectedSubscription(
      userSliderValue as number,
      montoMinValue,
      montoMaxValue
    );
    setSelectedSubscription(selectedSubscription);
  }, [
    sliderValue,
    userSliderValue,
    montoMinValue,
    montoMaxValue,
    getSelectedSubscription,
  ]);

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
        const successMessage = "Usuario registrado con éxito.";
        localStorage.setItem("toastMessageAddusuario", successMessage);
        resetNombre();
        resetApellidos();
        resetEmail();
        resetPassword();
        resetNumeroTelefono();
        setSliderValue([1000, 10000]);
        setUserSliderValue(100);
        navigate("/admin-suscribir-usuario");
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.errors
      ) {
        //para la lista de errores que halla si type=correo o type= phone
        const errors = error.response.data.errors;
        for (const error of errors) {
          if (error.type === "correo") {
            setEmailError(error.message);
            setTabValue(0); // Switch to the "Datos Personales" tab
            setSubscriptionTabEnabled(false); // Deshabilitar la pestaña de suscripciones
          } else if (error.type === "phone") {
            setNumeroTelefonoError(error.message);
            setTabValue(0); // Switch to the "Datos Personales" tab
            setSubscriptionTabEnabled(false); // Deshabilitar la pestaña de suscripciones
          }
        }
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

    const selectedSubscription = getSelectedSubscription(
      userSliderValue as number,
      parsedValue,
      montoMaxValue
    );
    setSelectedSubscription(selectedSubscription);
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

    const selectedSubscription = getSelectedSubscription(
      userSliderValue as number,
      montoMinValue,
      parsedValue
    );
    setSelectedSubscription(selectedSubscription);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 2000) {
      setUserSliderValue(value);
    }

    const selectedSubscription = getSelectedSubscription(
      value,
      montoMinValue,
      montoMaxValue
    );
    setSelectedSubscription(selectedSubscription);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleNext = () => {
    console.log("Tab value: " + tabValue);
    if (tabValue === 0) {
      // Comprobar errores en los datos personales
      let hasPersonalInfoError = false;

      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Expresión regular para letras y acentos

      if (nombreValue === "") {
        setNombreError("Ingrese su nombre.");
        hasPersonalInfoError = true;
      } else if (!regex.test(nombreValue)) {
        setNombreError("Ingrese un nombre válido.");
        hasPersonalInfoError = true;
      } else {
        setNombreError("");
      }

      if (apellidosValue === "") {
        setApellidosError("Ingrese sus apellidos.");
        hasPersonalInfoError = true;
      } else if (!regex.test(apellidosValue)) {
        setApellidosError("Ingrese apellidos válidos.");
        hasPersonalInfoError = true;
      } else {
        setApellidosError("");
      }

      if (emailValue === "") {
        setEmailError("Ingrese su correo electrónico.");
        hasPersonalInfoError = true;
      } else if (!validateEmail(emailValue)) {
        setEmailError("Ingrese un correo electrónico válido.");
        hasPersonalInfoError = true;
      } else {
        setEmailError("");
      }

      if (passwordValue === "") {
        setPasswordError("Ingrese su contraseña.");
        hasPersonalInfoError = true;
      } else if (passwordValue.length < 6) {
        setPasswordError("Deben tene al menos 6 caracteres.");
        hasPersonalInfoError = true;
      } else {
        setPasswordError("");
      }

      if (numeroTelefonoValue === "") {
        setNumeroTelefonoError("Ingrese su número de teléfono.");
        hasPersonalInfoError = true;
      } else if (numeroTelefonoValue.length !== 10) {
        setNumeroTelefonoError("El número de teléfono debe tener 10 dígitos.");
        hasPersonalInfoError = true;
      } else {
        setNumeroTelefonoError("");
      }

      // Si hay errores en los datos personales, no avanzar a la siguiente pestaña
      if (hasPersonalInfoError) {
        setSubscriptionTabEnabled(false); // Deshabilitar la pestaña de suscripciones
        return;
      } else {
        setSubscriptionTabEnabled(true); // Habilitar la pestaña de suscripciones
        setTabValue(1); // Avanzar a la siguiente pestaña
      }

      const subscriptionName = getSelectedSubscription(
        userSliderValue as number,
        montoMinValue,
        montoMaxValue
      );
      setSelectedSubscription(subscriptionName);
    } else if (tabValue === 1) {
      handleRegister();
    }
  };

  const renderPersonalInfoTab = () => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            marginBottom: "-5%",
            marginTop: "1.5%",
          }}
        >
          <Avatar
            src={defaultImage}
            css={{
              width: "18%",
              height: "18%",
              margin: "auto",
              marginLeft: "2%",
              marginRight: "6%",
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ marginRight: "3%" }}>
                {renderInputField(
                  "Nombre",
                  nombreValue,
                  nombreError,
                  nombreBindings,
                  "text",
                  "new-nombre",
                  false // Deshabilitar el campo si hay errores en los datos personales
                )}
              </div>
              <div style={{}}>
                {renderInputField(
                  "Apellidos",
                  apellidosValue,
                  apellidosError,
                  apellidosBindings,
                  "text",
                  "new-apellidos",
                  false // Deshabilitar el campo si hay errores en los datos personales
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ marginRight: "3%" }}>
                {renderInputField(
                  "Correo Electrónico",
                  emailValue,
                  emailError,
                  emailBindings,
                  "email",
                  "new-correo",
                  false // Deshabilitar el campo si hay errores en los datos personales
                )}
              </div>

              <div style={{}}>
                {renderInputField(
                  "Contraseña",
                  passwordValue,
                  passwordError,
                  passwordBindings,
                  "password",
                  "new-password",
                  false // Deshabilitar el campo si hay errores en los datos personales
                )}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{}}>
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
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSubscriptionTab = () => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            marginBottom: "-5%",
          }}
        >
          <Avatar
            src={defaultImage}
            css={{
              width: "18%",
              height: "18%",
              margin: "auto",
              marginLeft: "2%",
              marginRight: "6%",
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  flex: 1,
                  marginRight: "1%",
                  marginLeft: "1%",
                }}
              ></div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            ></div>

            <div style={{ flex: 1 }}>
              <h5>¿Cuánto dinero se va a prestar?</h5>
              <div>
                <Slider
                  style={{ maxWidth: "90%", marginLeft: "2%" }}
                  ariaLabelledByForHandle={"slider-handle-1"}
                  range
                  railStyle={{ backgroundColor: "#000000" }}
                  min={1}
                  value={sliderValue}
                  max={100000}
                  step={1000}
                  onChange={handleSliderChange}
                  disabled={!subscriptionTabEnabled} // Deshabilitar el slider si la pestaña de suscripciones no está habilitada
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
                  "Monto Mínimo a Prestar $Mxn",
                  montoMinValue.toLocaleString(),
                  "",
                  { value: montoMinValue, onChange: handleMontoMinChange },
                  "number",
                  "new-monto-min",
                  !subscriptionTabEnabled // Deshabilitar el campo si la pestaña de suscripciones no está habilitada
                )}
              </div>
              <div style={{ flex: 1, marginRight: "1%" }}>
                {renderInputField(
                  "Monto Máximo a Prestar  $Mxn",
                  montoMaxValue.toLocaleString(),
                  "",
                  { value: montoMaxValue, onChange: handleMontoMaxChange },
                  "number",
                  "new-monto-max",
                  !subscriptionTabEnabled // Deshabilitar el campo si la pestaña de suscripciones no está habilitada
                )}
              </div>
            </div>
            <div style={{ flex: 1, marginTop: "-3%" }}>
              <h5>¿A Cuántos Usuarios Planeas Prestar?</h5>
              <div>
                <Slider
                  style={{ maxWidth: "90%", marginLeft: "2%" }}
                  ariaLabelledByForHandle={"slider-handle-1"}
                  railStyle={{ backgroundColor: "#000000" }}
                  min={1}
                  max={2000}
                  step={10}
                  value={userSliderValue}
                  onChange={handleUserSliderChange}
                  disabled={!subscriptionTabEnabled} // Deshabilitar el slider si la pestaña de suscripciones no está habilitada
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
                      {
                        value: userSliderValue,
                        onChange: handleUserChange,
                      }, // Actualiza el valor y el evento onChange
                      "number",
                      "new-usuarios",
                      !subscriptionTabEnabled // Deshabilitar el campo si la pestaña de suscripciones no está habilitada
                    )}
                  </div>

                  <div style={{ flex: 1, marginRight: "1%" }}>
                    <Dropdown isDisabled={!subscriptionTabEnabled}>
                      <Dropdown.Button
                        value={selectedSubscription}
                        onChange={(value: any) =>
                          setSelectedSubscription(value)
                        }
                        style={{
                          width: "200px",
                          marginTop: "14%",
                          marginLeft: "33%",
                        }}
                      >
                        {selectedSubscription || "Suscripción"}
                      </Dropdown.Button>
                      <Dropdown.Menu aria-label="Tipos de Suscrpcion">
                        {TipoSuscripciones.map((tipoSuscripcion) => (
                          <Dropdown.Item
                            key={tipoSuscripcion.idTipoSuscripcion}
                          >
                            {tipoSuscripcion.nombreSuscripcion}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div style={{ flex: 1, marginRight: "1%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInputField = (
    label: string,
    value: string,
    error: string,
    bindings: any,
    type: string,
    autoComplete: string,
    disabled: boolean
  ) => (
    <Grid>
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
        disabled={disabled} // Deshabilitar el campo si es necesario
      />
    </Grid>
  );

  return (
    <div>
      <Card style={{ width: "fit-content", margin: "auto", marginTop: "3%" }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Datos Personales" />
          <Tab label="Suscripcion" disabled={!subscriptionTabEnabled} />{" "}
        </Tabs>
        {tabValue === 0 ? renderPersonalInfoTab() : renderSubscriptionTab()}
        <Button
          style={{ marginTop: "10%", alignSelf: "center", marginBottom: "2%" }}
          onPress={handleNext}
        >
          {tabValue === 0 ? "Siguiente" : "Registrar"}
        </Button>
      </Card>
    </div>
  );
};

export default ContentAddUsuario;
