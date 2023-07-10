import React, { useContext, useEffect, useState } from "react";
import { Navbar, Text, Dropdown, Input, User, Button } from "@nextui-org/react";
import { Layout } from "../navbar/Layout";
import { SearchIcon } from "../../resources/icons/SearchIcon";
import useDarkLight from "../../hooks/useDarkLight";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetAdmin } from "../../hooks/useGetAdmin";
import Cookies from "js-cookie";
import ThemeToggleButton from "../buttons/ThemeToggleButton";
import LanguageDropdown from "../buttons/LanguageDropdown";
import { useTranslation } from "react-i18next";
import { SearchContext } from "../../context/SearchContext";

interface NavBarProps {
  handleLogout: () => void;
}

export const CustomNavBar: React.FC<NavBarProps> = ({ handleLogout }) => {
  const { setSearchTerm } = useContext(SearchContext);
  const { theme, toggleTheme } = useDarkLight();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const admin = useGetAdmin();

  const [searchValue, setSearchValue] = useState("");

  const handleDropdownAction = (key: React.Key) => {
    const actionKey = String(key);
    if (actionKey === "logout") {
      handleLogout();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchValue(value);
  };

  useEffect(() => {
    setSearchTerm(""); // Restablecer el término de búsqueda al cambiar de página
    setSearchValue(""); // Borrar el contenido de la barra de búsqueda
  }, [location.pathname]);

  if (!admin) {
    return null;
  }

  return (
    <Layout>
      <Navbar
        variant="static"
        isCompact
        css={{}}
        maxWidth="fluid"
        isBordered={false}
        disableShadow={true}
      >
        <Navbar.Brand css={{ mr: "$4" }}></Navbar.Brand>

        <Navbar.Brand css={{ mr: "$4" }}>
          <Navbar.Content>
            <Navbar.Item
              css={{
                "@xsMax": {
                  w: "100%",
                  jc: "center",
                },
              }}
            >
              <Input
                aria-label="Search"
                clearable
                onChange={handleSearch as any}
                value={searchValue}
                contentLeft={
                  <SearchIcon
                    fill={theme === "dark" ? "white" : "black"}
                    size={20}
                  />
                }
                contentLeftStyling={false}
                css={{
                  w: "100%",
                  "@xsMax": {
                    mw: "500px",
                  },
                  "& .nextui-input-content--left": {
                    h: "100%",
                    ml: "$4",
                    dflex: "center",
                  },
                }}
                placeholder={t("navbar.search")}
              />
            </Navbar.Item>
          </Navbar.Content>
        </Navbar.Brand>

        <Navbar.Brand css={{ mr: "$2" }}>
          <Navbar.Content
            css={{
              "@xsMax": {
                w: "100%",
                jc: "space-between",
              },
            }}
          >
            <Navbar.Content hideIn="xs">
              <Navbar.Item style={{ marginRight: "-20px" }}>
                <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
              </Navbar.Item>
              <Navbar.Item style={{ marginRight: "-30px" }}>
                <Button.Group size="sm" flat>
                  <LanguageDropdown />
                </Button.Group>
              </Navbar.Item>
            </Navbar.Content>

            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <User
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    size="md"
                    name={""}
                    zoomed
                    pointer
                  />
                </Dropdown.Trigger>
              </Navbar.Item>

              <Dropdown.Menu
                aria-label="toggle navigation"
                color="secondary"
                onAction={handleDropdownAction}
              >
                <Dropdown.Item>
                  <Text
                    b
                    color="inherit"
                    css={{ display: "flex" }}
                    onClick={() => navigate("/admin-profile")}
                  >
                    {t("navbar.profile")}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="logout" withDivider color="error">
                  {t("navbar.logout")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
        </Navbar.Brand>
      </Navbar>
    </Layout>
  );
};
