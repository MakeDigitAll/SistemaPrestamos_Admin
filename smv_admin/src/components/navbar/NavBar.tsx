import React from "react";
import { Navbar, Text, Dropdown, Input, User } from "@nextui-org/react";
import { Layout } from "../navbar/Layout";
import { SearchIcon } from "../../resources/icons/SearchIcon";
import useDarkLight from "../../hooks/useDarkLight";
import { useNavigate } from "react-router-dom";
import { useGetAdmin } from "../../hooks/useGetAdmin";
import Cookies from "js-cookie";
import ThemeToggleButton from "../buttons/ThemeToggleButton";

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

  const handleDropdownAction = (key: React.Key) => {
    const actionKey = String(key);
    if (actionKey === "logout") {
      handleLogout();
    }
  };

  if (!admin) {
    return null; // Opcional: Mostrar un spinner de carga o mensaje mientras se obtienen los datos del usuario
  }

  return (
    <Layout>
      <Navbar isBordered variant="sticky" isCompact>
        <Navbar.Brand css={{ mr: "$4" }}>
          <Navbar.Content hideIn="xs" variant="highlight-rounded">
            <Navbar.Link isActive href="/dashboard">
              Dashboard
            </Navbar.Link>
            <Navbar.Link href="/">Settings</Navbar.Link>
          </Navbar.Content>
        </Navbar.Brand>
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
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
              }
              contentLeftStyling={false}
              css={{
                w: "100%",
                "@xsMax": {
                  mw: "300px",
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
                <Text b color="inherit" css={{ display: "flex" }}>
                  Opcion
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
