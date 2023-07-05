import React from "react";
import { Navbar, Text, Button, Dropdown } from "@nextui-org/react";
import { BiGlobe } from "react-icons/bi"; // Import the icon from React Icons
import ThemeToggleButton from "../../components/buttons/ThemeToggleButton";
import useDarkLight from "../../hooks/useDarkLight";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

interface Language {
  [key: string]: { nativeName: string };
}

const lngs: Language = {
  en: { nativeName: "English" },
  es: { nativeName: "Español" },
};

const NavBarLogin: React.FC = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useDarkLight();
  const [selected, setSelected] = React.useState(new Set([""]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  if (!Cookies.get("language")) {
    Cookies.set("language", "es", { expires: 365 });
  }

  React.useEffect(() => {
    const cookieLanguage = Cookies.get("language");
    if (cookieLanguage) {
      i18n.changeLanguage(cookieLanguage);
      setSelected(new Set([cookieLanguage]));
    }
  }, []);

  React.useEffect(() => {
    i18n.changeLanguage(selectedValue);
    Cookies.set("language", selectedValue, { expires: 365 });
  }, [selectedValue]);

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
        <Navbar.Link color="inherit">
          <Button.Group size="sm" flat color="gradient" light>
            <Dropdown>
              <Dropdown.Button flat css={{ tt: "uppercase" }}>
                <BiGlobe style={{ marginRight: "0.4rem" }} /> {selectedValue}
              </Dropdown.Button>
              <Dropdown.Menu
                variant="light"
                selectionMode="single"
                aria-label="Actions"
                disabledKeys={selected}
                selectedKeys={selected}
                onSelectionChange={(keys: any) => setSelected(keys)}
              >
                {Object.keys(lngs).map((lng) => (
                  <Dropdown.Item key={lng}>
                    {lngs[lng].nativeName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Button.Group>
        </Navbar.Link>
      </Navbar.Content>
    </Navbar>
  );
};

export default NavBarLogin;
