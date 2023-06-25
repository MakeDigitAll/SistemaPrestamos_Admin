import React from "react";
import {
  Navbar,
  Text,
  Avatar,
  Dropdown,
  Input,
  useTheme,
  Button,
} from "@nextui-org/react";
import { Layout } from "../navbar/Layout";
import { SearchIcon } from "../../resources/icons/SearchIcon";
import { SunIcon } from "../../resources/icons/SunIcon";
import { MoonIcon } from "../../resources/icons/MoonIcon";
import { useTheme as useNextTheme } from "next-themes";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../hooks/useGetUser";
import { IconButton } from "../../resources/icons/IconButton";

export const CustomNavBar: React.FC = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const user = useGetUser();

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

  if (!user) {
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
            <IconButton onClick={() => setTheme(isDark ? "light" : "dark")}>
              {isDark ? (
                <SunIcon
                  filled={true}
                  size={18}
                  height={22}
                  width={22}
                  label="Sun"
                />
              ) : (
                <MoonIcon
                  filled={true}
                  size={19}
                  height={22}
                  width={22}
                  label="Moon"
                />
              )}
            </IconButton>
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
                <Avatar
                  bordered
                  as="button"
                  color="primary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="toggle navigation"
              color="secondary"
              onAction={handleDropdownAction}
            >
              <Dropdown.Item
                key="profile"
                css={{ height: "$18" }}
                textValue={`${user.correo_electronico}`}
              >
                <Text b color="inherit" css={{ display: "flex" }}>
                  {user.nombres} {user.apellidos}
                </Text>
                <Text b color="inherit" css={{ display: "flex" }}>
                  {user.correo_electronico}
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
