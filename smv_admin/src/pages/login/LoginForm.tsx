import { useState, useEffect } from "react";
import {
  Button,
  Input,
  useInput,
  Avatar,
  Card,
  Text,
  Spacer,
  useTheme,
} from "@nextui-org/react";
import service from "../../services/service";
import Cookies from "js-cookie";
import { aesEncrypt } from "../../utils/encryption"; // Importa la función aesEncrypt del archivo encryption.tsx
import { Layout } from "../../components/navbar/Layout";
import NavBarLogin from "./NavBarLogin";
import logodark from "../../assets/images/logodark.png";
import logolight from "../../assets/images/logolight.png";
import { useTheme as useNextTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
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
  var expirationDate = new Date();

  useEffect(() => {
    const accessToken = cookies.get("accessToken");
    const authenticated = !!accessToken;
    setIsLoggedIn(authenticated);
  }, []);

  //si esta logueado redirige al dashboard
  if (isLoggedIn) {
    navigate("/admin-dashboard");
  }

  const validateEmail = (value: string) => {
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
      setEmailError("Ingrese un correo válido de Makedigitall.");
      return;
    }

    if (passwordValue === "") {
      setPasswordError("Ingrese su contraseña.");
      return;
    }

    try {
      // Encriptar correo electrónico y contraseña
      const encryptedEmail = aesEncrypt(emailValue);
      const encryptedPassword = aesEncrypt(passwordValue);
      const response = await service.login(encryptedEmail, encryptedPassword);

      if (response.data) {
        // Obtener el access token y el refresh token de la respuesta
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        // Duración en minutos
        const accessTokenDurationMinutes = 55;
        const refreshTokenDurationMinutes = 20 * 60; // 20 horas en minutos

        // Convertir la duración en días
        const accessTokenDurationDays = accessTokenDurationMinutes / (60 * 24);
        const refreshTokenDurationDays =
          refreshTokenDurationMinutes / (60 * 24);

        // Establecer la cookie del access token con una duración de 55 minutos
        Cookies.set("accessToken", accessToken, {
          expires: accessTokenDurationDays,
        });

        // Establecer la cookie del refresh token con una duración de 20 horas
        Cookies.set("refreshToken", refreshToken, {
          expires: refreshTokenDurationDays,
        });

        // Redireccionar a la página de dashboard
        window.location.href = "/admin-dashboard";
      }
    } catch (error: any) {
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
  const useDarkLight = () => {
    const { isDark } = useTheme();
    const { setTheme } = useNextTheme();
    const [theme, setLocalTheme] = useState(isDark ? "dark" : "light");

    useEffect(() => {
      const savedTheme = Cookies.get("theme");
      if (savedTheme && savedTheme !== theme) {
        setLocalTheme(savedTheme);
        setTheme(savedTheme);
      }
    }, [setTheme, theme, isDark]);

    const toggleTheme = () => {
      setLocalTheme((prevTheme) => {
        const newTheme = prevTheme === "dark" ? "light" : "dark";
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 10); // Caducará en 10 años
        Cookies.set("theme", newTheme, { expires: expirationDate });
        setTheme(newTheme);
        return newTheme;
      });
    };

    return { theme, toggleTheme };
  };
  const { theme } = useDarkLight();
  const isDark = theme === "dark";
  const logo = isDark ? logodark : logolight;
  const { t } = useTranslation();

  return (
    <Layout>
      <NavBarLogin />
      <Card
        css={{
          width: "400px",
          height: "550px",
          margin: "auto",
          marginTop: "5%",
        }}
      >
        <Text h3 css={{ margin: "auto", marginTop: "15%" }}>
          {t("login.bienvenido")}
        </Text>

        <Card.Header>
          <Avatar
            src={logo}
            zoomed
            css={{
              margin: "auto",
              height: "100px",
              width: "100px",
              marginTop: "2%",
            }}
          />
        </Card.Header>

        <Card.Body
          css={{ py: "$3", alignContent: "center", alignItems: "center" }}
        >
          <Input
            {...emailBindings}
            onClearClick={resetEmail}
            status={emailError ? "error" : "default"}
            color={emailError ? "error" : "default"}
            helperColor={emailError ? "error" : "default"}
            helperText={emailError ? emailError : ""}
            type="email"
            label={t("login.email")}
            width="300px"
          />
          <Spacer y={2} />
          <Input.Password
            {...passwordBindings}
            label={t("login.password")}
            status={passwordError ? "error" : "default"}
            color={passwordError ? "error" : "default"}
            helperColor={passwordError ? "error" : "default"}
            helperText={passwordError || ""}
            type="password"
            width="300px"
          />
        </Card.Body>

        <Card.Footer>
          <Button
            color="gradient"
            auto
            css={{ width: "40%", margin: "auto", marginBottom: "10%" }}
            onPress={handleLogin}
          >
            {t("login.login")}
          </Button>
        </Card.Footer>
      </Card>
    </Layout>
  );
};

export default LoginForm;
