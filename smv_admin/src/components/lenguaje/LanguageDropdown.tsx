import React from "react";
import { Dropdown } from "@nextui-org/react";
import { BiGlobe } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

interface Language {
  [key: string]: { nativeName: string };
}

const lngs: Language = {
  en: { nativeName: "English" },
  es: { nativeName: "Español" },
};

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();
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
  }, [i18n]);

  React.useEffect(() => {
    i18n.changeLanguage(selectedValue);
    Cookies.set("language", selectedValue, { expires: 365 });
  }, [selectedValue, i18n]);

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
        onSelectionChange={(keys: any) => setSelected(keys)}
      >
        {Object.keys(lngs).map((lng) => (
          <Dropdown.Item key={lng}>{lngs[lng].nativeName}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
