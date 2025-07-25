"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isSystemTheme: boolean;
  resetToSystemTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Queries the system's preferred color scheme.
 */
const getSystemTheme = (): Theme => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

/**
 * System-wide theme provider that manages light/dark mode across the entire application.
 * Provides smooth transitions and automatic adaptation to system theme changes.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const initialTheme = savedTheme || getSystemTheme();
    setTheme(initialTheme);
    setIsMounted(true);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (!isMounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only auto-update if no manual theme is saved
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [isMounted]);

  // Apply theme changes to document
  useEffect(() => {
    if (isMounted) {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.className = theme;

      // Only save to localStorage if manually set (not system default)
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme !== null) {
        localStorage.setItem("theme", theme);
      }

      // Apply smooth transition to root element
      document.documentElement.style.transition =
        "background-color 0.3s ease, color 0.3s ease";

      // Apply background color to body for full coverage
      document.body.style.backgroundColor = colorSystem[theme].pageBackground;
      document.body.style.color = colorSystem[theme].textPrimary;
    }
  }, [theme, isMounted]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const resetToSystemTheme = () => {
    localStorage.removeItem("theme");
    setTheme(getSystemTheme());
  };

  const isSystemTheme = isMounted ? !localStorage.getItem("theme") : true;

  // Prevent hydration mismatch
  if (!isMounted) {
    return <div className="min-h-screen bg-white dark:bg-black" />;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (newTheme: Theme) => {
          setTheme(newTheme);
          localStorage.setItem("theme", newTheme);
        },
        toggleTheme,
        isSystemTheme,
        resetToSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * System-level color configuration for consistent theming.
 * Enhanced colors for better contrast and glassmorphism effects.
 */
export const colorSystem = {
  light: {
    background: "rgba(255, 255, 255, 0.80)",
    border: "rgba(0, 0, 0, 0.08)",
    shadow: "rgba(0, 0, 0, 0.12)",
    textPrimary: "#1D1D1F",
    textSecondary: "rgba(60, 60, 67, 0.85)",
    accent: "#007AFF",
    controlBg: "rgba(0, 0, 0, 0.05)",
    pageBackground: "#F2F2F7",
  },
  dark: {
    background: "rgba(28, 28, 30, 0.85)",
    border: "rgba(255, 255, 255, 0.12)",
    shadow: "rgba(0, 0, 0, 0.35)",
    textPrimary: "#F2F2F7",
    textSecondary: "rgba(235, 235, 245, 0.65)",
    accent: "#0A84FF",
    controlBg: "rgba(255, 255, 255, 0.08)",
    pageBackground: "#000000",
  },
} as const;
