import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { BsFillPersonFill, BsFillPersonXFill } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme, Divider } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Cookies from "js-cookie";
import logodark from "../../assets/images/logodark.png";
import logolight from "../../assets/images/logolight.png";

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
  }, [isUsuariosSubMenuOpen]);

  const logo = isDark ? logodark : logolight;

  return (
    <>
      <Sidebar
        backgroundColor={isDark ? "dark-mode-sidebar" : "light-mode-sidebar"}
        width="100%"
        rootStyles={{
          borderRight: `0.5px solid ${isDark ? "#262626" : "#d9d9d9"}`,
        }}
      >
        <Menu menuItemStyles={menuItemStyles} style={{ marginTop: "20px" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "150px", marginLeft: "20%" }}
          />

          <Divider style={{ height: "0.5px", marginTop: "10px" }} />
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
            icon={<HiUsers />}
          >
            <MenuItem
              style={{ marginTop: "10px" }}
              icon={<BsFillPersonFill />}
              onClick={() => handleMenuItemClick("/usuarios-activos")}
              className={
                isMenuItemActive("/usuarios-activos") ? "selected" : ""
              }
            >
              Usuarios Activos
            </MenuItem>
            <MenuItem
              icon={<BsFillPersonXFill />}
              onClick={() => handleMenuItemClick("/usuarios-inactivos")}
              className={
                isMenuItemActive("/usuarios-inactivos") ? "selected" : ""
              }
            >
              Usuarios Inactivos
            </MenuItem>

            <MenuItem
              icon={<BsFillPersonXFill />}
              onClick={() => handleMenuItemClick("/usuarios-eliminados")}
              className={
                isMenuItemActive("/usuarios-eliminados") ? "selected" : ""
              }
            >
              Usuarios Eliminados
            </MenuItem>

            <MenuItem
              icon={<BsFillPersonXFill />}
              onClick={() => handleMenuItemClick("/add-usuario")}
              className={isMenuItemActive("/add-usuario") ? "selected" : ""}
            >
              Agregar Usuario
            </MenuItem>
          </SubMenu>
          <Divider style={{ height: "0.5px" }} />
          <MenuItem
            style={{ marginTop: "10px" }}
            icon={<FaMoneyBillAlt />}
            onClick={() => handleMenuItemClick("/suscripciones")}
            className={isMenuItemActive("/suscripciones") ? "selected" : ""}
          >
            Suscripciones
          </MenuItem>
          <Divider style={{ height: "0.5px" }} />
        </Menu>
      </Sidebar>
    </>
  );
}

export default SideBar;
