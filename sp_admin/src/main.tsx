import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./language/i18n";
import lightTheme from "./themes/lightTheme";
import darkTheme from "./themes/darkTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <App />
    </NextThemesProvider>
  </NextUIProvider>
);
