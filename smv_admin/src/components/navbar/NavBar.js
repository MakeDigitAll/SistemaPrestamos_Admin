import {
  Navbar,
  Text,
  Avatar,
  Dropdown,
  Input,
  useTheme,
  Button,
} from "@nextui-org/react";
import { Layout } from "../navbar/Layout.js";
import { SearchIcon } from "../../resources/icons/SearchIcon.js";
import { SunIcon } from "../../resources/icons/SunIcon.js";
import { MoonIcon } from "../../resources/icons/MoonIcon";
import { useTheme as useNextTheme } from "next-themes";

export const CustomNavBar = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  return (
    <Layout>
      <Navbar isBordered variant="sticky" isCompact>
        <Navbar.Brand css={{ mr: "$4" }}>
          <Navbar.Content hideIn="xs" variant="highlight">
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
            <Button
              auto
              rounded
              bordered="true"
              borderWeight="normal"
              size="sm"
              ripple="true"
              color="gradient"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </Button>
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
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
};
