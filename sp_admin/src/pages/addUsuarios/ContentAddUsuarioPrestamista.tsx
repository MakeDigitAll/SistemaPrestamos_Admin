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
import { toast } from "react-toastify";

const ContentAddUsuario: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellidosError, setApellidosError] = useState("");
  const [numeroTelefonoError, setNumeroTelefonoError] = useState("");
  const [imagenUsuario, setImagenUsuario] = useState<string>("");
  //FileReader
  const [imageFile, setImageFile] = useState<File>();
  const [subscriptionTabEnabled, setSubscriptionTabEnabled] = useState(true);
  const getTipoSubcripciones = useGetTipoSuscripciones();
  const arrayTipoSuscripciones =
    getTipoSubcripciones?.decodedToken?.tipoSuscripcion;
  const [tipoSuscripciones, setTipoSuscripciones] = useState<TipoSuscripcion[]>(
    []
  );
  const navigate = useNavigate();
  const [selectedSubscription, setSelectedSubscription] = useState<any>();
  const [selectedIDSuscripcion, setSelectedIDSuscripcion] = useState<number>(0);
  const [montoMinimoSlider, setMontoMinimoSlider] = useState<number>(0);
  const [montoMaximoSlider, setMontoMaximoSlider] = useState<number>(0);
  const [numeroClientesSlider, setNumeroClientesSlider] = useState<number>(0);

  let montoMinValue = 100;
  let montoMaxValue = 100;

  // Función para encontrar la suscripción correspondiente a los valores de dinero y usuarios
  const findMatchingSuscripcion = useCallback(
    (usuariosAPrestar: any, dinero: any) => {
      // Tu lógica actual de la función aquí
      const matchingDinero = tipoSuscripciones.find(
        (suscripcion) =>
          Number(suscripcion.montoDesde) <= Number(dinero) &&
          Number(suscripcion.montoHasta) >= Number(dinero)
      );
      const matchingUsuarios = tipoSuscripciones.find(
        (suscripcion) => suscripcion.numeroUsuariosMax >= usuariosAPrestar
      );

      // Compara las suscripciones basadas en dinero y usuarios
      if (matchingDinero && matchingUsuarios) {
        if (matchingDinero.montoDesde > matchingUsuarios.montoDesde) {
          setSelectedIDSuscripcion(matchingDinero.idTipoSuscripcion);
          return matchingDinero.nombreSuscripcion;
        } else {
          setSelectedIDSuscripcion(matchingUsuarios.idTipoSuscripcion);
          return matchingUsuarios.nombreSuscripcion;
        }
      } else if (matchingDinero) {
        setSelectedIDSuscripcion(matchingDinero.idTipoSuscripcion);
        return matchingDinero.nombreSuscripcion;
      } else if (matchingUsuarios) {
        setSelectedIDSuscripcion(matchingUsuarios.idTipoSuscripcion);
        return matchingUsuarios.nombreSuscripcion;
      } else {
        return null;
      }
    },
    [tipoSuscripciones]
  );

  const [sliderValue, setSliderValue] = useState<number | number[]>([
    150000, 250000,
  ]);
  const [userSliderValue, setUserSliderValue] = useState<number | number[]>(20);
  //useEffect para si hay o no imagen de usuario
  useEffect(() => {
    if (imagenUsuario) {
      setImagenUsuario(imagenUsuario);
    } else {
      setImagenUsuario(defaultImage);
    }
  }, [imagenUsuario]);

  //useEffect para setear los tipos de suscripciones
  useEffect(() => {
    if (arrayTipoSuscripciones) {
      setTipoSuscripciones(arrayTipoSuscripciones);
    }
  }, [arrayTipoSuscripciones]);

  useEffect(() => {
    const selectedSubscription = findMatchingSuscripcion(
      userSliderValue as number,
      montoMaxValue
    );
    setSelectedSubscription(selectedSubscription);
  }, [
    sliderValue,
    userSliderValue,
    montoMinValue,
    montoMaxValue,
    findMatchingSuscripcion,
  ]);

  //useEffect para setear los montos minimos y maximos de los sliders
  useEffect(() => {
    if (!tipoSuscripciones || tipoSuscripciones.length === 0) {
      return;
    } else {
      const minimo = tipoSuscripciones[0].montoDesde;
      const maximo = tipoSuscripciones[tipoSuscripciones.length - 1].montoHasta;
      const numeroClientes =
        tipoSuscripciones[tipoSuscripciones.length - 1].numeroUsuariosMax;

      setMontoMinimoSlider(minimo);
      setMontoMaximoSlider(maximo);
      setNumeroClientesSlider(numeroClientes);
    }
  }, [tipoSuscripciones]);

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
      const encryptedNombreNivel = aesEncrypt(selectedSubscription);
      const encryptedIDSuscripcion = aesEncrypt(
        selectedIDSuscripcion.toString()
      );

      const data = {
        nombre: encryptedNombre,
        apellidos: encryptedApellidos,
        email: encryptedEmail,
        password: encryptedPassword,
        montoMinimo: encryptedMontoMinimo,
        montoMaximo: encryptedMontoMaximo,
        numeroTelefono: encryptedNumeroTelefono,
        numeroClientes: encryptedNumeroClientes,
        nombreSuscripcion: encryptedNombreNivel,
        idSuscripcion: encryptedIDSuscripcion,
      };
      const response = await service.createUsuarioPrestamista(data);

      if (response.status === 200) {
        // Obtener el id del usuario recién creado para configurar la imagen
        const idUsuario = response.data.idUsuarioPrestamista;

        if (imageFile) {
          const formData = new FormData();
          formData.append("image", imageFile);
          const response = await service.setImageUsuarioPrestamista(
            idUsuario,
            formData
          );
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
        } else {
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
    const value = event.target.value;
    const parsedValue = Number(value);
    if (
      !isNaN(parsedValue) &&
      parsedValue >= montoMinimoSlider &&
      parsedValue <= montoMaximoSlider
    ) {
      const newSliderValue = Array.isArray(sliderValue)
        ? [parsedValue, sliderValue[1]]
        : parsedValue;
      setSliderValue(newSliderValue);
    }

    const selectedSubscription = findMatchingSuscripcion(
      userSliderValue as number,
      montoMaxValue
    );
    setSelectedSubscription(selectedSubscription);
  };

  const handleMontoMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const parsedValue = Number(value);

    if (
      !isNaN(parsedValue) &&
      parsedValue >= montoMinimoSlider &&
      parsedValue <= montoMaximoSlider
    ) {
      const newSliderValue = Array.isArray(sliderValue)
        ? [sliderValue[0], parsedValue]
        : parsedValue;
      setSliderValue(newSliderValue);
    }

    const selectedSubscription = findMatchingSuscripcion(
      userSliderValue as number,
      parsedValue
    );
    setSelectedSubscription(selectedSubscription);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= numeroClientesSlider) {
      setUserSliderValue(value);
    }

    const selectedSubscription = findMatchingSuscripcion(value, montoMaxValue);
    setSelectedSubscription(selectedSubscription);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleImagenClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files![0];

      if (file) {
        // Validar el tamaño del archivo (4 MB máximo)
        if (file.size <= 4 * 1024 * 1024) {
          // Validar el tipo de archivo gif, png, jpg, jpeg
          const fileType = file.type;
          if (
            fileType === "image/png" ||
            fileType === "image/jpeg" ||
            fileType === "image/jpg"
          ) {
            const reader = new FileReader();
            setImageFile(file);
            reader.onload = () => {
              if (reader.readyState === 2) {
                setImagenUsuario(reader.result as string);
              }
            };
            reader.readAsDataURL(file);
          }
        } else {
          //toast error
          const errorMessage = "El tamaño máximo de la imagen es de max 4 MB.";
          toast.error(errorMessage);
        }
      }
    };

    input.click();
  };

  const handleNext = () => {
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

      const subscriptionName = findMatchingSuscripcion(
        userSliderValue as number,
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
            src={imagenUsuario}
            zoomed
            css={{
              width: "180px",
              height: "180px",
              margin: "auto",
              marginLeft: "30px",
              cursor: "pointer",
            }}
            onClick={handleImagenClick}
          />
          <div style={{ flex: 1, marginRight: "60px", marginLeft: "30px" }}>
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
            src={imagenUsuario}
            css={{
              width: "180px",
              height: "180px",
              margin: "auto",
              marginLeft: "30px",
              cursor: "pointer",
            }}
            onClick={handleImagenClick}
          />
          <div style={{ flex: 1, marginRight: "60px", marginLeft: "30px" }}>
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
                  min={0}
                  value={sliderValue}
                  max={montoMaximoSlider}
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
                  min={10}
                  max={100}
                  step={1}
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
                          width: "260px",
                          marginTop: "11.5%",
                          marginLeft: "3%",
                        }}
                      >
                        {selectedSubscription || "Suscripción"}
                      </Dropdown.Button>
                      <Dropdown.Menu aria-label="Tipos de Suscrpcion">
                        {tipoSuscripciones.map((tipoSuscripcion) => (
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
    _value: string,
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
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          style={{ marginLeft: "10px" }}
        >
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
