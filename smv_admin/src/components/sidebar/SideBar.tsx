import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { BsFillPersonFill, BsFillPersonXFill } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Cookies from "js-cookie";

import "./Sidebar.css";

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

  const handleDashboardClick = () => {
    if (isMenuItemActive("/dashboard")) {
      window.location.reload();
    } else {
      navigate("/dashboard");
    }
  };

  const handleUsuariosClick = () => {
    if (isMenuItemActive("/usuarios-activos")) {
      window.location.reload();
    } else {
      navigate("/usuarios-activos");
    }
  };

  const handleInactivosClick = () => {
    if (isMenuItemActive("/usuarios-inactivos")) {
      window.location.reload();
    } else {
      navigate("/usuarios-inactivos");
    }
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
    button: ({ level, active, disabled }: any) => {
      if (level === 0) {
        return {
          color: disabled ? "#eee" : isDark ? "#fff" : "#000000",
          backgroundColor: active ? "#fff" : "transparent",
          "&:hover": {
            backgroundColor: isDark ? "#335B8C" : "#E2F1F8",
            color: isDark ? "#fff" : "#000",
            borderRadius: "15px",
          },
        };
      }
    },
  };

  return (
    <Sidebar
      backgroundColor={isDark ? "dark-mode" : "light-mode"}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Menu menuItemStyles={menuItemStyles} style={{ marginTop: "60px" }}>
        <MenuItem
          icon={<BiSolidDashboard />}
          onClick={handleDashboardClick}
          className={isMenuItemActive("/dashboard") ? "selected" : ""}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          icon={<BsFillPersonFill />}
          onClick={handleUsuariosClick}
          className={isMenuItemActive("/usuarios-activos") ? "selected" : ""}
        >
          Usuarios Activos
        </MenuItem>
        <MenuItem
          icon={<BsFillPersonXFill />}
          onClick={handleInactivosClick}
          className={isMenuItemActive("/usuarios-inactivos") ? "selected" : ""}
        >
          Usuarios Inactivos
        </MenuItem>
        <MenuItem
          icon={<FaMoneyBillAlt />}
          onClick={handleSuscripcionesClick}
          className={isMenuItemActive("/suscripciones") ? "selected" : ""}
        >
          Suscripciones
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SideBar;
