import React, { useState, useEffect, createContext } from "react";

const getInitialTheme = () => {
  if (typeof window !== undefined && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }
    const userMedia = window.matchMedia("(prefer-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
    return "light";
  }
};

export const ThemeContext = createContext();
export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const setRawTheme = (theme) => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";
    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("color-theme", theme);
  };
  if (initialTheme) {
    setRawTheme(initialTheme);
  }
  useEffect(() => {
    setRawTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
