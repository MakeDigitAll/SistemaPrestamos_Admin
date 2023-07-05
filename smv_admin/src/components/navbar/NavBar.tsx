import React from "react";
import { Navbar, Text, Dropdown, Input, User, Button } from "@nextui-org/react";
import { Layout } from "../navbar/Layout";
import { SearchIcon } from "../../resources/icons/SearchIcon";
import useDarkLight from "../../hooks/useDarkLight";
import { useNavigate } from "react-router-dom";
import { useGetAdmin } from "../../hooks/useGetAdmin";
import Cookies from "js-cookie";
import ThemeToggleButton from "../buttons/ThemeToggleButton";
import LanguageDropdown from "../lenguaje/LanguageDropdown";

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
                <Button.Group size="sm" flat color="gradient" light>
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
        </Navbar.Brand>
      </Navbar>
    </Layout>
  );
};
