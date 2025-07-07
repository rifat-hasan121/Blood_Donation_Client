import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext("light");
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleTheme = (theme) => {
    setDarkMode(theme);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useDarkMode = () => useContext(ThemeContext);
