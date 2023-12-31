import React from "react";
import { Navbar, Text, Button } from "@nextui-org/react";
import ThemeToggleButton from "../../utils/buttons/ThemeToggleButton";
import useDarkLight from "../../hooks/useDarkLight";
import LanguageDropdown from "../../utils/buttons/LanguageDropdown";

const NavBarLogin: React.FC = () => {
  const { theme, toggleTheme } = useDarkLight();

  return (
    <Navbar isCompact disableBlur disableShadow variant="static">
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs"></Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Item>
          <ThemeToggleButton
            theme={theme}
            toggleTheme={toggleTheme}
            css={{ marginLeft: "100%" }}
          />
        </Navbar.Item>
        <Button.Group size="sm" flat>
          <LanguageDropdown />
        </Button.Group>
      </Navbar.Content>
    </Navbar>
  );
};

export default NavBarLogin;
