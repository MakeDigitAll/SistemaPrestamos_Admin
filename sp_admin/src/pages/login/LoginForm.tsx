import { useState, useEffect, useContext } from "react";
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
import { aesEncrypt } from "../../utils/encryption"; // Importa la función aesEncrypt del archivo encryption.tsx
import { Layout } from "../../components/navbar/Layout";
import NavBarLogin from "./NavBarLogin";
import logodark from "../../assets/images/logodark.png";
import logolight from "../../assets/images/logolight.png";
import { useTheme as useNextTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { t } = useTranslation();

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

  const validateEmail = (value: string) => {
    return value.match(/^[A-Z0-9._%+-]+@makedigitall\.com$/i);
  };

  const handleValidated = async () => {
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

    handleLogin();
  };

  const handleLogin = async () => {
    try {
      // Encriptar correo electrónico y contraseña
      const encryptedEmail = aesEncrypt(emailValue);
      const encryptedPassword = aesEncrypt(passwordValue);
      const response = await service.login(encryptedEmail, encryptedPassword);

      if (response.data) {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        login(accessToken, refreshToken);
        window.location.href = "/admin-dashboard";
      }
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
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
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme && savedTheme !== theme) {
        setLocalTheme(savedTheme);
        setTheme(savedTheme);
      }
    }, [setTheme, theme, isDark]);

    const toggleTheme = () => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setLocalTheme(newTheme);
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    };

    return { theme, toggleTheme };
  };

  const { theme } = useDarkLight();
  const isDark = theme === "dark";
  const logo = isDark ? logodark : logolight;
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
            onPress={handleValidated}
          >
            {t("login.login")}
          </Button>
        </Card.Footer>
      </Card>
    </Layout>
  );
};

export default LoginForm;
