import React, { useEffect } from "react";
import { Navbar, Text, Dropdown, Input, User } from "@nextui-org/react";
import { Layout } from "../navbar/Layout";
import { SearchIcon } from "../../resources/icons/SearchIcon";
import useDarkLight from "../../hooks/useDarkLight";
import { useNavigate } from "react-router-dom";
import { useGetAdmin } from "../../hooks/useGetAdmin";
import Cookies from "js-cookie";
import ThemeToggleButton from "../buttons/ThemeToggleButton";
import "./NavBar.css";

export const CustomNavBar: React.FC = () => {
  const { theme, toggleTheme } = useDarkLight();
  const navigate = useNavigate();
  const admin = useGetAdmin();
  const handleLogout = () => {
    // Eliminar las cookies y redireccionar a la página de inicio de sesión
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/");
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode-navbar", theme === "dark");
  }, [theme]);

  const handleDropdownAction = (key: React.Key) => {
    const actionKey = String(key);
    if (actionKey === "logout") {
      handleLogout();
    }
  };

  if (!admin) {
    return null;
  }

  return (
    <Layout>
      <Navbar variant="floating" isCompact isBordered css={{}}>
        <Navbar.Content
          css={{
            "@xsMax": {
              w: "100%",
              jc: "space-between",
            },
          }}
        >
          <Navbar.Item
            css={{
              "@xsMax": {
                w: "100%",
                jc: "center",
              },
            }}
          >
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          </Navbar.Item>
          <Navbar.Brand css={{ marginLeft: "370px" }}></Navbar.Brand>
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
              placeholder="Search..."
            />
          </Navbar.Item>
          <Navbar.Brand css={{ marginLeft: "280px" }}></Navbar.Brand>
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <User
                  bordered
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  name={admin.nombres + " " + admin.apellidos}
                  description={admin.correoElectronico}
                  size="md"
                  color="primary"
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
                  onClick={() => navigate("/profile")}
                >
                  Mi Perfil
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
};
