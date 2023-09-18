import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Text,
  Dropdown,
  Input,
  User,
  Button,
  Badge,
} from "@nextui-org/react";
import { Layout } from "../navbar/Layout";
import { SearchIcon } from "../../resources/icons/SearchIcon";
import useDarkLight from "../../hooks/useDarkLight";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeToggleButton from "../../utils/buttons/ThemeToggleButton";
import LanguageDropdown from "../../utils/buttons/LanguageDropdown";
import { useTranslation } from "react-i18next";
import { SearchContext } from "../../context/SearchContext";
import { ImageContext } from "../../context/ImageContext";
import { AuthContext } from "../../context/AuthContext";
import { IoIosNotifications } from "react-icons/io";

//atributos de la interfaz notificaciones
interface CustomNavBarProps {
  notificaciones: any;
}

export const CustomNavBar = ({ notificaciones }: CustomNavBarProps) => {
  const { logout } = useContext(AuthContext);
  const { setSearchTerm } = useContext(SearchContext);
  const { theme, toggleTheme } = useDarkLight();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  var { profileImage } = useContext(ImageContext);
  const [unreadNotifications, setUnreadNotifications] = useState<any>([]);
  const hideSearch =
    location.pathname === "/admin-suscripciones" ||
    location.pathname === "/admin-add-usuario" ||
    location.pathname === "/admin-add-suscripcion" ||
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/admin-profile";
  const [searchValue, setSearchValue] = useState("");

  const handleDropdownAction = (key: React.Key) => {
    const actionKey = String(key);
    if (actionKey === "logout") {
      logout();
    }
  };

  // filtrar notificaciones que solo sean las isReaded= false
  useEffect(() => {
    if (!notificaciones) {
      return;
    }
    const unread = notificaciones.filter(
      (notification: any) => JSON.parse(notification.isRead) === false
    );
    setUnreadNotifications(unread);
  }, [notificaciones]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchValue(value);
  };

  useEffect(() => {
    setSearchTerm(""); // Restablecer el término de búsqueda al cambiar de página
    setSearchValue(""); // Borrar el contenido de la barra de búsqueda
  }, [location.pathname, setSearchTerm]);

  return (
    <Layout>
      <Navbar
        variant="static"
        isCompact
        isBordered={false}
        maxWidth="fluid"
        disableShadow={true}
      >
        <Navbar.Brand css={{ mr: "$4" }}></Navbar.Brand>

        <Navbar.Brand css={{ mr: "$4" }}>
          <Navbar.Content>
            {/* Verifica si hideSearch es verdadero antes de renderizar el componente */}
            {!hideSearch && (
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
            )}
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
              <Navbar.Item
                onClick={() => navigate("/admin-notificaciones")}
                style={{ marginRight: "0px", cursor: "pointer" }}
              >
                <Badge
                  style={{ marginRight: "-3px" }}
                  color="error"
                  content={unreadNotifications.length}
                  shape="circle"
                >
                  <IoIosNotifications fill="currentColor" size={20} />
                </Badge>
              </Navbar.Item>
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
                  <User src={profileImage} size="md" name={""} zoomed pointer />
                </Dropdown.Trigger>
              </Navbar.Item>

              <Dropdown.Menu
                aria-label="toggle navigation"
                color="secondary"
                onAction={handleDropdownAction}
              >
                <Dropdown.Item textValue={t("navbar.profile")}>
                  <Text
                    b
                    color="inherit"
                    css={{ display: "flex" }}
                    onClick={() => navigate("/admin-profile")}
                  >
                    {" "}
                    {t("navbar.profile")}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item
                  key="logout"
                  withDivider
                  color="error"
                  textValue={t("navbar.logout")}
                >
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
