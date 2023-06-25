import { useState, useEffect } from "react";
import { useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Cookies from "js-cookie";

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
  }, [setTheme, theme]);

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

export default useDarkLight;
