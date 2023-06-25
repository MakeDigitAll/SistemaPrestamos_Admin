import React from "react";
import { IconButton } from "../../resources/icons/IconButton";
import { SunIcon } from "../../resources/icons/SunIcon";
import { MoonIcon } from "../../resources/icons/MoonIcon";

interface ThemeToggleButtonProps {
  theme: string;
  toggleTheme: () => void;
  css?: React.CSSProperties; // Agrega la prop css con tipo React.CSSProperties
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  theme,
  toggleTheme,
  css,
}) => {
  return (
    <IconButton
      onClick={toggleTheme}
      css={{ ...css }} // Agrega el estilo css al IconButton
    >
      {theme === "dark" ? (
        <SunIcon filled={true} size={18} height={22} width={22} label="Sun" />
      ) : (
        <MoonIcon filled={true} size={19} height={22} width={22} label="Moon" />
      )}
    </IconButton>
  );
};

export default ThemeToggleButton;
