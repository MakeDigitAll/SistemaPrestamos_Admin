import { createTheme } from "@nextui-org/react";

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      textLight: "#E8E8E8", // El color utilizado para el texto claro.
      text: "#FFFFFF", // El color utilizado para el texto.
      linkLight: "#9A4EDD", // El color claro utilizado para los enlaces.
      link: "#5E1DAD", // El color utilizado para los enlaces.
      codeLight: "#B4B4B4", // El color claro utilizado para el código.
      code: "#FFFFFF", // El color utilizado para el código.
      selection: "#4ADE7B", // El color utilizado para los elementos seleccionados.
      border: "#4D4D4D", // El color utilizado para los bordes.
      background: "#363636", // El color utilizado para el fondo.
      backgroundAlpha: "rgba(54, 54, 54, 0.7)", // El valor de transparencia para el color de fondo.
      foreground: "#FFFFFF", // El color utilizado para el primer plano.
      backgroundContrast: "#414141", // El color de contraste utilizado para el fondo.
      white: "#FFFFFF", // El color blanco.
      black: "#000000", // El color negro.
      primaryLight: "#C4F3D6", // El color claro utilizado para el tema primario.
      primaryLightHover: "#A7EBBC", // El color claro utilizado para el tema primario cuando se pasa el cursor sobre él.
      primaryLightActive: "#8AE2A2", // El color claro utilizado para el tema primario cuando está activo.
      primaryLightContrast: "#207D55", // El color de contraste utilizado para el tema primario.
      primary: "#4ADE7B", // El color utilizado para el tema primario.
      primaryBorder: "#207D55", // El color utilizado para el borde del tema primario.
      primaryBorderHover: "#196842", // El color utilizado para el borde del tema primario cuando se pasa el cursor sobre él.
      primarySolidHover: "#125530", // El color utilizado para el tema primario cuando es sólido y se pasa el cursor sobre él.
      primarySolidContrast: "#ffffff", // El color de contraste utilizado para el tema primario cuando es sólido.
      primaryShadow: "#207D55", // El color de sombra utilizado para el tema primario.
      secondaryLight: "#D6D4F4", // El color claro utilizado para el tema secundario.
      secondaryLightHover: "#BAB8E8", // El color claro utilizado para el tema secundario cuando se pasa el cursor sobre él.
      secondaryLightActive: "#AFADE0", // El color claro utilizado para el tema secundario cuando está activo.
      secondaryLightContrast: "#372E6C", // El color de contraste utilizado para el tema secundario.
      secondary: "#6C63FF", // El color utilizado para el tema secundario.
      secondaryBorder: "#372E6C", // El color utilizado para el borde del tema secundario.
      secondaryBorderHover: "#2B2359", // El color utilizado para el borde del tema secundario cuando se pasa el cursor sobre él.
      secondarySolidHover: "#1E1946", // El color utilizado para el tema secundario cuando es sólido y se pasa el cursor sobre él.
      secondarySolidContrast: "#ffffff", // El color de contraste utilizado para el tema secundario cuando es sólido.
      secondaryShadow: "#372E6C", // El color de sombra utilizado para el tema secundario.
      neutralLight: "#E8E8E8", // El color claro utilizado para el tema neutro.
      neutralLightHover: "#CCCCCC", // El color claro utilizado para el tema neutro cuando se pasa el cursor sobre él.
      neutralLightActive: "#BFBFBF", // El color claro utilizado para el tema neutro cuando está activo.
      neutralLightContrast: "#3D3D3D", // El color de contraste utilizado para el tema neutro.
      neutral: "#7F7F7F", // El color utilizado para el tema neutro.
      neutralBorder: "#3D3D3D", // El color utilizado para el borde del tema neutro.
      neutralBorderHover: "#2E2E2E", // El color utilizado para el borde del tema neutro cuando se pasa el cursor sobre él.
      neutralSolidHover: "#1F1F1F", // El color utilizado para el tema neutro cuando es sólido y se pasa el cursor sobre él.
      neutralSolidContrast: "#ffffff", // El color de contraste utilizado para el tema neutro cuando es sólido.
      neutralShadow: "#3D3D3D", // El color de sombra utilizado para el tema neutro.
      gradient:
        "linear-gradient(112deg, #DFE2E8 -25%, #F4CDDF -10%, #E6CEEB 80%)", // El degradado utilizado para el tema.
    },
    space: {},
    fonts: {},
  },
});

export default darkTheme;
