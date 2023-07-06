import React from "react";
import { Dropdown } from "@nextui-org/react";
import { BiGlobe } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

interface Language {
  [key: string]: { nativeName: string };
}

const lngs: Language = {
  es: { nativeName: "Español" },
  en: { nativeName: "English" },
};

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();
  const [selected, setSelected] = React.useState(() => {
    const cookieLanguage = Cookies.get("language");
    return new Set([cookieLanguage || "es"]);
  });

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  //si no hay cookie, se selecciona el idioma por defecto selected
  React.useEffect(() => {
    if (!Cookies.get("language")) {
      i18n.changeLanguage(Array.from(selected)[0]);
    }
  }, [i18n, selected]);

  //cambiar el idioma
  const handleSelectionChange = React.useCallback(
    (keys: any) => {
      setSelected(keys);
      const selectedLanguage = Array.from(keys)[0];
      if (selectedLanguage) {
        i18n.changeLanguage(selectedLanguage as string);
        Cookies.set("language", selectedLanguage as string, { expires: 365 });
      }
    },
    [i18n]
  );

  return (
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
        onSelectionChange={handleSelectionChange}
      >
        {Object.keys(lngs).map((lng) => (
          <Dropdown.Item key={lng}>{lngs[lng].nativeName}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
