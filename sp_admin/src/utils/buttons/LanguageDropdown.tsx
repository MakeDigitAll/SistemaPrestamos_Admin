import React from "react";
import { Dropdown } from "@nextui-org/react";
import { BiGlobe } from "react-icons/bi";
import { useTranslation } from "react-i18next";

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
    const localStorageLanguage = localStorage.getItem("i18nextLng");
    return new Set([localStorageLanguage || "es"]);
  });

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replace(/_/g, " "),
    [selected]
  );

  // Si no hay valor en localStorage, se selecciona el idioma por defecto (selected)
  React.useEffect(() => {
    if (!localStorage.getItem("i18nextLng")) {
      i18n.changeLanguage(Array.from(selected)[0]);
    }
  }, [i18n, selected]);

  // Cambiar el idioma
  const handleSelectionChange = React.useCallback(
    (keys: any) => {
      setSelected(keys);
      const selectedLanguage = Array.from(keys)[0];
      if (selectedLanguage) {
        i18n.changeLanguage(selectedLanguage as string);
        localStorage.setItem("i18nextLng", selectedLanguage as string);
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
