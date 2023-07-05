import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          login: {
            bienvenido: "Welcome",
            login: "Login",
            password: "Password",
            email: "Email",
          },
        },
      },
      es: {
        translation: {
          login: {
            bienvenido: "Bienvenido",
            login: "Iniciar sesión",
            password: "Contraseña",
            email: "Correo electrónico",
          },
        },
      },
    },
  });

export default i18n;
