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

      // Apply theme colors using CSS custom properties for full coverage
      document.documentElement.style.setProperty(
        "--page-background",
        colorSystem[theme].pageBackground
      );
      document.documentElement.style.setProperty(
        "--text-primary",
        colorSystem[theme].textPrimary
      );
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

// Complete color system following the design instructions
export const colorSystem = {
  light: {
    // Backgrounds
    pageBackground: "#ffffff",
    background: {
      solid: "#ffffff",
      gradient: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    },

    // Text colors
    textPrimary: "#000000",
    textSecondary: "#6b7280",

    // UI elements
    border: "#e5e7eb",
    accent: "#3b82f6",
    controlBg: "#f3f4f6",

    // Splash screen specific
    loader: "#3b82f6",
  },
  dark: {
    // Backgrounds
    pageBackground: "#0f0f0f",
    background: {
      solid: "#1f1f1f",
      gradient: "linear-gradient(135deg, #0f0f0f 0%, #1f1f1f 100%)",
    },

    // Text colors
    textPrimary: "#ffffff",
    textSecondary: "#a1a1aa",

    // UI elements
    border: "#374151",
    accent: "#60a5fa",
    controlBg: "#27272a",

    // Splash screen specific
    loader: "#60a5fa",
  },
} as const;
