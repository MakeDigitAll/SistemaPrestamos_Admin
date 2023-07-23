import { useState, useEffect } from "react";
import { useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";

const useDarkLight = () => {
  const { isDark } = useTheme();
  const { setTheme } = useNextTheme();
  const [theme, setLocalTheme] = useState(isDark ? "dark" : "light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && savedTheme !== theme) {
      setLocalTheme(savedTheme);
      setTheme(savedTheme);
    }
  }, [setTheme, theme]);

  const toggleTheme = () => {
    setLocalTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
      return newTheme;
    });
  };

  return { theme, toggleTheme };
};

export default useDarkLight;
