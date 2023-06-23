import React, { useState } from "react";
import {
  Button,
  Input,
  useInput,
  Avatar,
  Card,
  Text,
  Spacer,
  Switch,
  useTheme,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import service from "../../services/service";
import Cookies from "js-cookie";

import { SunIcon } from "../../resources/icons/SunIcon";
import { MoonIcon } from "../../resources/icons/MoonIcon";

const LoginForm = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

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
      if (response.data) {
        // Obtener el access token y el refresh token de la respuesta
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        // Guardar los tokens en cookies o almacenarlos en el almacenamiento local según tus necesidades
        Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); // 1 hora de expiración
        Cookies.set("refreshToken", refreshToken, { expires: 7 / 24 }); // 7 días de expiración

        // Redireccionar a la página de dashboard
        window.location.href = "/dashboard";
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log(error.response.data.message);
        if (error.response.data.message === "Correo no registrado") {
          setEmailError("Usuario no encontrado.");
          resetEmail();
          resetPassword();
        }
        if (error.response.data.message === "Contraseña incorrecta") {
          setPasswordError("Contraseña incorrecta.");
          resetPassword();
        }
      } else {
        console.log("Error en la solicitud. Compruebe su conexión a Internet.");
      }
    }
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
      <Switch
        checked={isDark}
        onChange={() => setTheme(type === "dark" ? "light" : "dark")}
        iconOn={<SunIcon filled size={24} height={24} width={24} label="Sun" />}
        iconOff={
          <MoonIcon filled size={24} height={24} width={24} label="Moon" />
        }
        shadow
        color="secondary"
        //alineado a la derecha
        css={{
          position: "absolute",
          right: "0",
          margin: "5%",
        }}
      />
      <Text h2 css={{ margin: "auto", marginTop: "1.3%" }}>
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
          bordered
          clearable
          shadow={false}
          onClearClick={resetEmail}
          status={emailError ? "error" : "default"}
          color={emailError ? "error" : "default"}
          helperColor={emailError ? "error" : "default"}
          helperText={emailError ? emailError : ""}
          type="email"
          label="Email"
        />
        <Spacer y={1.0} />
        <Input.Password
          {...passwordBindings}
          bordered
          label="Contraseña"
          status={passwordError ? "error" : "default"}
          color={passwordError ? "error" : "default"}
          helperColor={passwordError ? "error" : "default"}
          helperText={passwordError || ""}
          type="password"
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
