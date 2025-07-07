import React from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useDarkMode } from "../Context/ThemeContaxt";

const SwicthTheme = () => {
  const { darkMode, handleTheme } = useDarkMode();
  return (
    <div className="flex items-center justify-center">
      <button className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white text-sm font-semibold">
        {darkMode !== "dark" ? (
          <span
            onClick={() => handleTheme("dark")}
            className="flex items-center  transition-all duration-300 group-hover:scale-105"
          >
            <IoMoon className="text-lg" />
          </span>
        ) : (
          <span
            onClick={() => handleTheme("light")}
            className="flex items-center transition-all duration-300 group-hover:scale-105"
          >
            <IoSunny className="text-lg" />
          </span>
        )}
      </button>
    </div>
  );
};

export default SwicthTheme;
