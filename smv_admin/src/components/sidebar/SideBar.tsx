import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { BsFillPersonFill, BsFillPersonXFill } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme, Divider } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Cookies from "js-cookie";

import "./Sidebar.css";

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

  const handleUsuariosActivosClick = () => {
    navigate("/usuarios-activos");
  };

  const handleUsuariosInactivosClick = () => {
    navigate("/usuarios-inactivos");
  };

  const handleSuscripcionesClick = () => {
    if (isMenuItemActive("/suscripciones")) {
      window.location.reload();
    } else {
      navigate("/suscripciones");
    }
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
  }, [isUsuariosSubMenuOpen]);

  return (
    <Sidebar
      backgroundColor={isDark ? "dark-mode" : "light-mode"}
      width="100%"
      rootStyles={{
        borderRight: `0.5px solid ${isDark ? "#262626" : "#d9d9d9"}`,
      }}
    >
      <Menu menuItemStyles={menuItemStyles} style={{ marginTop: "60px" }}>
        <Divider style={{ height: "0.5px" }} />
        <MenuItem
          style={{ marginTop: "10px" }}
          icon={<BiSolidDashboard />}
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
        >
          <MenuItem
            style={{ marginTop: "10px" }}
            icon={<BsFillPersonFill />}
            onClick={handleUsuariosActivosClick}
            className={`${
              isMenuItemActive("/usuarios-activos") ? "selected" : ""
            } ${isDark ? "dark-mode" : "light-mode"}`}
          >
            Usuarios Activos
          </MenuItem>
          <MenuItem
            icon={<BsFillPersonXFill />}
            onClick={handleUsuariosInactivosClick}
            className={`${
              isMenuItemActive("/usuarios-inactivos") ? "selected" : ""
            } ${isDark ? "dark-mode" : "light-mode"}`}
          >
            Usuarios Inactivos
          </MenuItem>
        </SubMenu>
        <Divider style={{ height: "0.5px" }} />
        <MenuItem
          style={{ marginTop: "10px" }}
          icon={<FaMoneyBillAlt />}
          onClick={handleSuscripcionesClick}
          className={isMenuItemActive("/suscripciones") ? "selected" : ""}
        >
          Suscripciones
        </MenuItem>
        <Divider style={{ height: "0.5px" }} />
      </Menu>
    </Sidebar>
  );
}

export default SideBar;
