import React, { useState } from "react";
import { Card, Avatar, Button, Grid, Input, useInput } from "@nextui-org/react";
import { aesEncrypt } from "../../../utils/encryption";
import "./css/AddUsuario.css";
import service from "../../../services/service";
import { toast } from "react-toastify";

const ContentAddUsuario: React.FC = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellidosError, setApellidosError] = useState("");

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

    if (hasError) {
      return;
    }

    try {
      // Registro de datos en la base de datos
      const encryptedNombre = aesEncrypt(nombreValue);
      const encryptedApellidos = aesEncrypt(apellidosValue);
      const encryptedEmail = aesEncrypt(emailValue.toLowerCase());
      const encryptedPassword = aesEncrypt(passwordValue);

      const data = {
        nombre: encryptedNombre,
        apellidos: encryptedApellidos,
        email: encryptedEmail,
        password: encryptedPassword,
      };

      const response = await service.createUsuarioPrestamista(data);

      if (response.status === 200) {
        toast.success("Usuario registrado con éxito.", {
          position: "top-center",
          autoClose: 3000,
        });
        resetNombre();
        resetApellidos();
        resetEmail();
        resetPassword();
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setEmailError("El correo electrónico ya está registrado.");
      }
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
    <>
      <Grid css={{ justifyContent: "center", alignSelf: "center" }}>
        <Input
          {...bindings}
          rounded
          bordered
          width="300px"
          type={type}
          label={label}
          status={error ? "default" : "default"}
          color={error ? "error" : "default"}
          helperColor={error ? "error" : "default"}
          helperText={error ? error : ""}
          name={label.toLowerCase()}
          aria-label={label.toLowerCase()}
          css={{ marginBottom: "10px" }}
          autoComplete={autoComplete}
        />
      </Grid>
    </>
  );

  return (
    <div>
      <Card
        css={{
          width: "450px",
          height: "600px",
          margin: "auto",
          marginTop: "3%",
        }}
      >
        <Card.Header>
          <Avatar
            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-File.png"
            zoomed
            css={{
              margin: "auto",
              height: "100px",
              width: "100px",
              marginTop: "2%",
            }}
          />
        </Card.Header>

        <Card.Body>
          {renderInputField(
            "Nombre",
            nombreValue,
            nombreError,
            nombreBindings,
            "text",
            "new-nombre"
          )}
          {renderInputField(
            "Apellidos",
            apellidosValue,
            apellidosError,
            apellidosBindings,
            "text",
            "new-apellidos"
          )}
          {renderInputField(
            "Correo Electrónico",
            emailValue,
            emailError,
            emailBindings,
            "email",
            "new-correo"
          )}
          {renderInputField(
            "Contraseña",
            passwordValue,
            passwordError,
            passwordBindings,
            "password",
            "new-password"
          )}
        </Card.Body>
        <Card.Footer>
          <Button
            color="gradient"
            auto
            css={{ width: "40%", margin: "auto" }}
            onPress={handleRegister}
          >
            Registrar
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ContentAddUsuario;
