"use client";

import styles from "./themeToggle.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  return (
    <button
      className={`${styles.toggle} ${darkMode ? styles.active : ""}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className={styles.circle}>
        {darkMode ? (
          <Image
            src="/images/Icons/moon.svg"
            alt="moon"
            width={24}
            height={24}
          />
        ) : (
          <Image src="/images/Icons/sun.svg" alt="sun" width={24} height={24} />
        )}
      </span>
    </button>
  );
}
