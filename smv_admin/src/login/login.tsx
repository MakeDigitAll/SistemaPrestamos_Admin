import React, { useState } from "react";
import { Button, Input, useInput, Avatar, Card, Text } from "@nextui-org/react";
import "./login.css";
import service from "../services/service";

const LoginForm = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userNotFoundError, setUserNotFoundError] = useState(false);

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

  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@makedigitall\.com$/i);
  };

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setUserNotFoundError(false);

    if (emailValue === "") {
      setEmailError("Ingrese su correo electrónico.");
      return;
    }

    if (!validateEmail(emailValue)) {
      setEmailError(
        "Ingrese un correo electrónico válido de la empresa Makedigitall."
      );
      return;
    }

    if (passwordValue === "") {
      setPasswordError("Ingrese su contraseña.");
      return;
    }

    try {
      const response = await service.login(emailValue, passwordValue);
      console.log(response);
      if (response.data) {
        console.log("Usuario logeado correctamente");
        // window.location.href = "/admin";
      } else {
        setUserNotFoundError(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setUserNotFoundError(true);
      } else {
        console.log("Error en la solicitud. Compruebe su conexión a Internet.");
      }
    }

    resetEmail();
    resetPassword();
  };

  return (
    <Card
      css={{
        width: "400px",
        height: "500px",
        margin: "auto",
        marginTop: "10%",
      }}
    >
      <Text h2 css={{ margin: "auto", marginTop: "2%" }}>
        Inicio de Sesion
      </Text>
      <Card.Header>
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          zoomed
          css={{
            margin: "auto",
            height: "150px",
            width: "150px",
            marginTop: "2%",
          }}
        />
      </Card.Header>

      <Card.Body css={{ py: "$2" }}>
        <Input
          {...emailBindings}
          clearable
          shadow={false}
          onClearClick={resetEmail}
          status={emailError || userNotFoundError ? "error" : "default"}
          color={emailError || userNotFoundError ? "error" : "default"}
          helperColor={emailError || userNotFoundError ? "error" : "default"}
          helperText={
            emailError || (userNotFoundError ? "El usuario no existe." : "")
          }
          type="email"
          label="Email"
        />
        <Input.Password
          {...passwordBindings}
          label="Contraseña"
          status={passwordError ? "error" : "default"}
          color={passwordError ? "error" : "default"}
          helperColor={passwordError ? "error" : "default"}
          helperText={passwordError || ""}
          css={{ marginTop: "5%" }}
        />
      </Card.Body>

      <Card.Footer>
        <Button
          color="gradient"
          auto
          css={{ width: "40%", margin: "auto" }}
          onPress={handleLogin}
        >
          Login
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default LoginForm;
