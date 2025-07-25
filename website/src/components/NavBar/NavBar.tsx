"use client";
import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import {
  Briefcase,
  Code,
  FolderGit2,
  Globe,
  Moon,
  PenSquare,
  Send,
  Sun,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navigation structure definition.
 * Each section is defined with a name, corresponding Lucide icon component, and route path.
 */
const navSections = [
  { name: "About", icon: User, path: "/" },
  { name: "Career", icon: Briefcase, path: "/career" },
  { name: "Projects", icon: FolderGit2, path: "/projects" },
  { name: "Stack", icon: Code, path: "/stack" },
  { name: "Blog", icon: PenSquare, path: "/blog" },
  { name: "Connect", icon: Send, path: "/connect" },
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
  const { theme, setTheme, isSystemTheme } = useTheme();
  const pathname = usePathname();

  const handleThemeToggle = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
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
          <div className="space-y-6">
            {" "}
            {/* Ensure spacing between navigation links */}
            {navSections.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.name} href={item.path}>
                  <motion.div
                    className="flex items-center gap-4 px-3 py-2.5 rounded-lg font-baloo font-semibold text-base transition-colors relative cursor-pointer"
                    style={{
                      color: colors.textPrimary,
                      border: isActive
                        ? `1px solid ${colors.accent}`
                        : "1px solid transparent",
                      marginBottom: "12px", // Explicit margin added for spacing
                    }}
                    whileHover={{ backgroundColor: colors.accent + "20" }}
                    animate={
                      isActive
                        ? { borderColor: colors.accent }
                        : { borderColor: "transparent" }
                    }
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{ backgroundColor: colors.border }}
        />

        {/* Utility Controls: Theme & Language */}
        <div className="space-y-2 pt-6 pb-2">
          {/* System Theme Indicator */}
          {isSystemTheme && (
            <div
              className="text-xs text-center py-1 px-2 rounded-md"
              style={{
                backgroundColor: colors.controlBg,
                color: colors.textSecondary,
              }}
            >
              Following system theme
            </div>
          )}

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
