import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme, Divider } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { useTranslation } from "react-i18next";
// Icons
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import {
  FaUserCheck,
  FaUserPlus,
  FaUserSlash,
  FaUserFriends,
} from "react-icons/fa";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { MdMoreTime } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
import { MdAutoGraph } from "react-icons/md";
interface MenuItemStyleProps {
  level: number;
  active: boolean;
  disabled: boolean;
}

const useDarkLight = () => {
  const { isDark } = useTheme();
  const { setTheme } = useNextTheme();
  const [theme, setLocalTheme] = useState(isDark ? "dark" : "light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && savedTheme !== theme) {
      setLocalTheme(savedTheme);
      setTheme(savedTheme);
    }
  }, [setTheme, theme, isDark]);

  const toggleTheme = () => {
    setLocalTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return { theme, toggleTheme };
};

function SideBar() {
  const { t } = useTranslation();
  const { theme } = useDarkLight();
  const isDark = theme === "dark";
  const location = useLocation();
  const navigate = useNavigate();
  const [isUsuariosSubMenuOpen, setIsUsuariosSubMenuOpen] = useState(
    localStorage.getItem("isUsuariosSubMenuOpen") === "true"
  );
  const [isAdministracionSubMenuOpen, setIsAdministracionSubMenuOpen] =
    useState(localStorage.getItem("isAdministracionSubMenuOpen") === "true");

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    localStorage.getItem("isSidebarCollapsed") === "true"
  );
  const [isSidebarPersistCollapsed, setIsSidebarPersistCollapsed] = useState(
    localStorage.getItem("isSidebarPersistCollapsed") === "true"
  );

  const handleDashboardClick = () => {
    if (isMenuItemActive("/admin-dashboard")) {
    } else {
      navigate("/admin-dashboard");
    }
  };

  const handleUsuariosClick = () => {
    setIsUsuariosSubMenuOpen(!isUsuariosSubMenuOpen);
  };

  const handleAdministracionClick = () => {
    setIsAdministracionSubMenuOpen(!isAdministracionSubMenuOpen);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  const isMenuItemActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const menuItemStyles = {
    button: ({ level, active, disabled }: MenuItemStyleProps) => {
      if (level === 0) {
        return {
          color: disabled ? "#eee" : isDark ? "#fff" : "#000000",
          backgroundColor: active ? "#fff" : "transparent",
          "&:hover": {
            backgroundColor: isDark ? "#335B8C" : "#335B8C",
            color: isDark ? "#fff" : "#fff",
            borderRadius: "15px",
          },
        };
      }
    },
  };

  useEffect(() => {
    localStorage.setItem(
      "isUsuariosSubMenuOpen",
      String(isUsuariosSubMenuOpen)
    );
    localStorage.setItem("isSidebarCollapsed", String(isSidebarCollapsed));
    localStorage.setItem(
      "isSidebarPersistCollapsed",
      String(isSidebarPersistCollapsed)
    );
  }, [isUsuariosSubMenuOpen, isSidebarCollapsed, isSidebarPersistCollapsed]);

  useEffect(() => {
    localStorage.setItem(
      "isAdministracionSubMenuOpen",
      String(isAdministracionSubMenuOpen)
    );
    localStorage.setItem("isSidebarCollapsed", String(isSidebarCollapsed));
    localStorage.setItem(
      "isSidebarPersistCollapsed",
      String(isSidebarPersistCollapsed)
    );
  }, [
    isAdministracionSubMenuOpen,
    isSidebarCollapsed,
    isSidebarPersistCollapsed,
  ]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed((prevIsSidebarCollapsed) => !prevIsSidebarCollapsed);
    setIsSidebarPersistCollapsed(
      (prevIsSidebarPersistCollapsed) => !prevIsSidebarPersistCollapsed
    );
  };

  const handleResize = () => {
    if (window.innerWidth < 1080) {
      setIsSidebarCollapsed(true);
    } else {
      setIsSidebarCollapsed(isSidebarPersistCollapsed);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const renderSidebarToggle = () => {
    if (window.innerWidth < 1280) {
      return null;
    }

    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSidebarToggle}
          style={{
            border: "none",
            background: "none",
            marginRight: "-10px",
            cursor: "pointer",
            fontSize: "28px", // Tamaño del icono
          }}
        >
          {isSidebarCollapsed ? (
            <BsFillArrowRightCircleFill />
          ) : (
            <BsFillArrowLeftCircleFill />
          )}
        </button>
      </div>
    );
  };

  return (
    <>
      <Sidebar
        transitionDuration={400}
        width="250px"
        backgroundColor={isDark ? "dark-mode-sidebar" : "light-mode-sidebar"}
        rootStyles={{
          borderRight: `0.1px  ${isDark ? "#D1D1D1" : "#262626"}`,
          height: "100%",
          //box shadow en modo dark y light
          boxShadow: isDark
            ? "0px 0px 20px rgba(0, 0, 0, 0.5)"
            : "0px 0px 20px rgba(0, 0, 0, 0.3)",
          borderRadius: "20px",
        }}
        collapsed={isSidebarCollapsed}
      >
        {renderSidebarToggle()}
        <Menu transitionDuration={400} menuItemStyles={menuItemStyles}>
          <Divider style={{ height: "0.5px" }} />
          <MenuItem
            style={{ marginTop: "10px" }}
            icon={<MdSpaceDashboard />}
            onClick={handleDashboardClick}
            className={isMenuItemActive("/admin-dashboard") ? "selected" : ""}
          >
            {t("sidebar.dashboard")}
          </MenuItem>

          <Divider style={{ height: "0.5px" }} />
          <SubMenu
            label={t("sidebar.usuarios")}
            className="custom-submenu"
            open={isUsuariosSubMenuOpen}
            onOpenChange={handleUsuariosClick}
            icon={<FaUserFriends />}
          >
            <MenuItem
              style={{ marginTop: "10px" }}
              icon={<MdMoreTime />}
              onClick={() => handleMenuItemClick("/admin-suscribir-usuario")}
              className={
                isMenuItemActive("/admin-suscribir-usuario") ? "selected" : ""
              }
            >
              {t("sidebar.suscribir")}
            </MenuItem>

            <MenuItem
              style={{ marginTop: "10px" }}
              icon={<FaUserCheck />}
              onClick={() => handleMenuItemClick("/admin-usuarios-activos")}
              className={
                isMenuItemActive("/admin-usuarios-activos") ? "selected" : ""
              }
            >
              {t("sidebar.usuariosActivos")}
            </MenuItem>

            <MenuItem
              icon={<FaUserSlash />}
              onClick={() => handleMenuItemClick("/admin-usuarios-eliminados")}
              className={
                isMenuItemActive("/admin-usuarios-eliminados") ? "selected" : ""
              }
            >
              {t("sidebar.usuariosEliminados")}
            </MenuItem>

            <MenuItem
              icon={<FaUserPlus />}
              onClick={() => handleMenuItemClick("/admin-add-usuario")}
              className={
                isMenuItemActive("/admin-add-usuario") ? "selected" : ""
              }
            >
              {t("sidebar.addUsuario")}
            </MenuItem>
          </SubMenu>
          <Divider style={{ height: "0.5px" }} />
          <SubMenu
            label={t("sidebar.administracion")}
            className="custom-submenu"
            open={isAdministracionSubMenuOpen}
            onOpenChange={handleAdministracionClick}
            icon={<GoProjectRoadmap />}
          >
            <MenuItem
              icon={<MdAutoGraph />}
              onClick={() => handleMenuItemClick("/admin-fidelidad")}
              className={isMenuItemActive("/admin-fidelidad") ? "selected" : ""}
            >
              {t("sidebar.fidelidad")}
            </MenuItem>

            <MenuItem
              icon={<FaMoneyBillAlt />}
              onClick={() => handleMenuItemClick("/admin-tipo-suscripcion")}
              className={
                isMenuItemActive("/admin-tipo-suscripcion") ? "selected" : ""
              }
            >
              {t("sidebar.suscripciones")}
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </>
  );
}

export default SideBar;
