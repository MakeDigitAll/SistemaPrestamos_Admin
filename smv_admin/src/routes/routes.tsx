import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Login from "../pages/login/LoginForm";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
const lightTheme = createTheme({
  type: "light",
  theme: {},
});

const darkTheme = createTheme({
  type: "dark",
  theme: {},
});

function AppRouter() {
  return (
    <BrowserRouter>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </NextUIProvider>
      </NextThemesProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
