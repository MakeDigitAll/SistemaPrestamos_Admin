import { Navbar, Text, Button } from "@nextui-org/react";
import ThemeToggleButton from "../../components/buttons/ThemeToggleButton";
import useDarkLight from "../../hooks/useDarkLight"; // Importa el hook useDarkLight
import { useTranslation } from 'react-i18next';
const lngs = {
    en: { nativeName: 'English' },
    es: { nativeName: 'Español' }
  };
const NavBarLogin = () => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useDarkLight(); // Usa el hook useDarkLight
  return (
      <Navbar isCompact disableBlur disableShadow variant="static" >
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
          <Button.Group size="xs" flat color="light" light>
          {Object.keys(lngs).map((lng) => (
            <Button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </Button>
          ))}
          </Button.Group>
          </Navbar.Link>
          <Navbar.Item>
          <ThemeToggleButton
          theme={theme}
          toggleTheme={toggleTheme}
          css={{ }}
        />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
  )
}

export default NavBarLogin