"use client";
import { motion } from "framer-motion";
import {
  Briefcase,
  Code,
  FolderGit2,
  Globe,
  Home,
  LayoutDashboard,
  Mail,
  Moon,
  PenSquare,
  Sun,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * System-level color palette.
 * This configuration defines the foundational colors for both light and dark themes,
 * ensuring a consistent and accessible user interface. The backdrop-blur effect
 * is implemented via Tailwind CSS utilities.
 */
const colorSystem = {
  light: {
    background: "rgba(255, 255, 255, 0.65)",
    border: "rgba(0, 0, 0, 0.08)",
    shadow: "rgba(0,0,0,0.1)",
    textPrimary: "#1D1D1F",
    textSecondary: "rgba(60, 60, 67, 0.85)",
    accent: "#007AFF",
    controlBg: "rgba(0,0,0,0.05)",
  },
  dark: {
    background: "rgba(29, 29, 31, 0.75)",
    border: "rgba(255, 255, 255, 0.1)",
    shadow: "rgba(0,0,0,0.25)",
    textPrimary: "#F5F5F7",
    textSecondary: "rgba(235, 235, 245, 0.65)",
    accent: "#0A84FF",
    controlBg: "rgba(255,255,255,0.1)",
  },
} as const;

/**
 * Queries the system's preferred color scheme.
 * @returns {'dark' | 'light'} The preferred theme. Defaults to 'light' if unavailable.
 */
const getSystemTheme = (): "dark" | "light" => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

/**
 * Navigation structure definition.
 * Each section is defined with a name and a corresponding Lucide icon component.
 * This structure is used to dynamically generate the navigation items.
 */
const navSections = [
  { name: "Home", icon: Home },
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Career", icon: Briefcase },
  { name: "Projects", icon: FolderGit2 },
  { name: "Stack", icon: Code },
  { name: "Writing", icon: PenSquare },
  { name: "Contact", icon: Mail },
];

/**
 * A full-height, floating glassmorphism navigation bar.
 *
 * This component provides the primary navigation for the portfolio. It is designed
 * to be persistent, responsive, and visually unobtrusive. The implementation uses
 * Framer Motion for fluid animations and is structured to separate branding,
 * navigation, and utility controls (theme/language).
 *
 * @param {object} props - Component properties.
 * @param {boolean} props.isSplashActive - Indicates if the splash screen is currently active.
 */
export default function NavBar({
  isSplashActive,
}: {
  isSplashActive: boolean;
}) {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [activeItem, setActiveItem] = useState("Home");

  // Effect for initializing and updating the theme based on system preference.
  useEffect(() => {
    const currentTheme = getSystemTheme();
    setTheme(currentTheme);
    document.documentElement.className = currentTheme;
  }, []);

  const handleThemeToggle = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    document.documentElement.className = newTheme;
  };

  const colors = colorSystem[theme];

  return (
    <motion.nav
      className="fixed top-0 left-0 h-screen p-4 z-40"
      initial={{ x: -280, opacity: 0 }}
      animate={!isSplashActive ? { x: 0, opacity: 1 } : { x: -280, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Main navigation"
    >
      <div
        className="flex flex-col h-full w-60 p-4 rounded-2xl backdrop-blur-2xl shadow-2xl"
        style={{
          background: colors.background,
          border: `1px solid ${colors.border}`,
          boxShadow: `0 16px 48px ${colors.shadow}`,
        }}
      >
        {/* Profile Section */}
        <div className="flex items-center gap-3 pt-2 pb-6">
          <Image
            src="/avatar.png"
            alt="Polintosh Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span
            className="font-baloo font-bold text-lg"
            style={{ color: colors.textPrimary }}
          >
            Polintosh
          </span>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{ backgroundColor: colors.border }}
        />

        {/* Navigation Links */}
        <div className="flex-grow flex flex-col justify-center">
          <div className="space-y-1">
            {navSections.map((item) => (
              <motion.a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                onClick={() => setActiveItem(item.name)}
                className="flex items-center gap-4 px-3 py-2.5 rounded-lg font-baloo font-semibold text-base transition-colors relative"
                style={{ color: colors.textPrimary }}
                whileHover={{ backgroundColor: colors.accent + "20" }}
                animate={
                  activeItem === item.name
                    ? { backgroundColor: colors.accent, color: "#FFF" }
                    : { backgroundColor: "transparent" }
                }
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{ backgroundColor: colors.border }}
        />

        {/* Utility Controls: Theme & Language */}
        <div className="space-y-2 pt-6 pb-2">
          {/* Segmented Control for Theme */}
          <div
            className="grid grid-cols-2 gap-1 p-1 rounded-lg"
            style={{ backgroundColor: colors.controlBg }}
          >
            <button
              onClick={() => handleThemeToggle("light")}
              className={`relative flex justify-center items-center p-1.5 rounded-md`}
            >
              {theme === "light" && (
                <motion.div
                  layoutId="theme-bg"
                  className="absolute inset-0 bg-white dark:bg-gray-600 rounded-md shadow-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Sun
                size={18}
                className="relative z-10"
                style={{
                  color:
                    theme === "light"
                      ? colors.textPrimary
                      : colors.textSecondary,
                }}
              />
            </button>
            <button
              onClick={() => handleThemeToggle("dark")}
              className={`relative flex justify-center items-center p-1.5 rounded-md`}
            >
              {theme === "dark" && (
                <motion.div
                  layoutId="theme-bg"
                  className="absolute inset-0 bg-white dark:bg-gray-600 rounded-md shadow-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Moon
                size={18}
                className="relative z-10"
                style={{
                  color:
                    theme === "dark"
                      ? colorSystem.light.textPrimary // Black icon on white toggle
                      : colors.textSecondary,
                }}
              />
            </button>
          </div>
          <button
            className="flex items-center justify-center gap-2 w-full p-2 rounded-lg font-baloo font-semibold text-sm"
            style={{
              backgroundColor: colors.controlBg,
              color: colors.textSecondary,
            }}
          >
            <Globe size={16} />
            <span>English</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
