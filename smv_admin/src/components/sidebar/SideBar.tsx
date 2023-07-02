import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme, Divider } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Cookies from "js-cookie";
import logodark from "../../assets/images/logodark.png";
import logolight from "../../assets/images/logolight.png";

// Icons
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import {
  FaUserCheck,
  FaUserPlus,
  FaUserSlash,
  FaUserTimes,
  FaUserFriends,
} from "react-icons/fa";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

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
    const savedTheme = Cookies.get("theme");
    if (savedTheme && savedTheme !== theme) {
      setLocalTheme(savedTheme);
      setTheme(savedTheme);
    }
  }, [setTheme, theme, isDark]);

  const toggleTheme = () => {
    setLocalTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      Cookies.set("theme", newTheme);
      setTheme(newTheme);
      return newTheme;
    });
  };

  return { theme, toggleTheme };
};

function SideBar() {
  const { theme } = useDarkLight();
  const isDark = theme === "dark";
  const location = useLocation();
  const navigate = useNavigate();
  const [isUsuariosSubMenuOpen, setIsUsuariosSubMenuOpen] = useState(
    localStorage.getItem("isUsuariosSubMenuOpen") === "true"
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    localStorage.getItem("isSidebarCollapsed") === "true"
  );
  const [isSidebarPersistCollapsed, setIsSidebarPersistCollapsed] = useState(
    localStorage.getItem("isSidebarPersistCollapsed") === "true"
  );

  const handleDashboardClick = () => {
    if (isMenuItemActive("/dashboard")) {
      window.location.reload();
    } else {
      navigate("/dashboard");
    }
  };

  const handleUsuariosClick = () => {
    setIsUsuariosSubMenuOpen(!isUsuariosSubMenuOpen);
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

  const logo = isDark ? logodark : logolight;

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
  }, [isSidebarPersistCollapsed]);

  const renderSidebarToggle = () => {
    if (window.innerWidth < 1080) {
      return null;
    }

    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSidebarToggle}
          style={{
            border: "none",
            background: "none",
            marginRight: "10px",
            marginTop: "10px",
            cursor: "pointer",
            fontSize: "24px", // Tamaño del icono
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
        backgroundColor={isDark ? "dark-mode-sidebar" : "light-mode-sidebar"}
        width="16%"
        rootStyles={{
          borderRight: `0.5px solid ${isDark ? "#262626" : "#d9d9d9"}`,
        }}
        collapsed={isSidebarCollapsed}
      >
        {renderSidebarToggle()}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "70%", marginLeft: "15%" }}
          />
        </div>

        <Menu menuItemStyles={menuItemStyles} style={{ marginTop: "20px" }}>
          <Divider style={{ height: "0.5px", marginTop: "10px" }} />
          <MenuItem
            style={{ marginTop: "10px" }}
            icon={<MdSpaceDashboard />}
            onClick={handleDashboardClick}
            className={isMenuItemActive("/dashboard") ? "selected" : ""}
          >
            Dashboard
          </MenuItem>

          <Divider style={{ height: "0.5px" }} />
          <SubMenu
            label="Usuarios"
            className="custom-submenu"
            open={isUsuariosSubMenuOpen}
            onOpenChange={handleUsuariosClick}
            icon={<FaUserFriends />}
          >
            <MenuItem
              style={{ marginTop: "10px" }}
              icon={<FaUserCheck />}
              onClick={() => handleMenuItemClick("/usuarios-activos")}
              className={
                isMenuItemActive("/usuarios-activos") ? "selected" : ""
              }
            >
              Usuarios Activos
            </MenuItem>
            <MenuItem
              icon={<FaUserTimes />}
              onClick={() => handleMenuItemClick("/usuarios-inactivos")}
              className={
                isMenuItemActive("/usuarios-inactivos") ? "selected" : ""
              }
            >
              Usuarios Inactivos
            </MenuItem>

            <MenuItem
              icon={<FaUserPlus />}
              onClick={() => handleMenuItemClick("/add-usuario")}
              className={isMenuItemActive("/add-usuario") ? "selected" : ""}
            >
              Nuevo Usuario
            </MenuItem>

            <MenuItem
              icon={<FaUserSlash />}
              onClick={() => handleMenuItemClick("/usuarios-eliminados")}
              className={
                isMenuItemActive("/usuarios-eliminados") ? "selected" : ""
              }
            >
              Usuarios Eliminados
            </MenuItem>
          </SubMenu>

          <Divider style={{ height: "0.5px" }} />
          <MenuItem
            icon={<FaMoneyBillAlt />}
            onClick={() => handleMenuItemClick("/suscripciones")}
            className={isMenuItemActive("/suscripciones") ? "selected" : ""}
          >
            Suscripciones
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}

export default SideBar;
