"use client";
import { motion } from "framer-motion";
import {
  BookText,
  Briefcase,
  Flag,
  FolderOpen,
  Github,
  Home,
  Layers,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Color system for light and dark themes
 * - Matches SplashScreen for visual consistency
 */
const colorSystem = {
  light: {
    background: "rgba(255,255,255,0.7)",
    border: "rgba(255,255,255,0.3)",
    shadow: "rgba(0,0,0,0.08)",
    text: "#1D1D1F",
    accent: "#007AFF",
  },
  dark: {
    background: "rgba(30,30,40,0.7)",
    border: "rgba(255,255,255,0.15)",
    shadow: "rgba(0,0,0,0.25)",
    text: "#F2F2F7",
    accent: "#0A84FF",
  },
} as const;

/**
 * Detects user's system theme preference
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
 * Navigation Bar Component
 * - Glassmorphism floating bar
 * - Responsive, rounded, animated
 * - Section names from portfolio instructions
 */
export default function NavBar() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    setTheme(getSystemTheme());
  }, []);

  const colors = colorSystem[theme];

  // Portfolio sections
  const sections = [
    "Home",
    "Career",
    "Tech Stack",
    "Projects",
    "GitHub Stats",
    "Roadmap",
    "Blog",
    "Contact",
  ];

  const sectionIcons = {
    Home: Home,
    Career: Briefcase,
    "Tech Stack": Layers,
    Projects: FolderOpen,
    "GitHub Stats": Github,
    Roadmap: Flag,
    Blog: BookText,
    Contact: Mail,
  };

  return (
    <motion.nav
      className="fixed top-8 left-1/2 z-40 flex justify-center"
      style={{
        transform: "translateX(-50%)",
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-label="Main navigation"
    >
      <motion.div
        className="flex gap-2 px-6 py-3 rounded-2xl backdrop-blur-xl shadow-lg border"
        style={{
          background: colors.background,
          border: `1px solid ${colors.border}`,
          boxShadow: `0 8px 32px ${colors.shadow}`,
        }}
      >
        {sections.map((section) => {
          // Fix type error by using keyof typeof sectionIcons
          const Icon = sectionIcons[section as keyof typeof sectionIcons];
          return (
            <motion.a
              key={section}
              href="#"
              className="flex items-center gap-2 px-3 py-1 rounded-xl font-medium text-sm transition-colors"
              style={{
                color: colors.text,
              }}
              whileHover={{
                scale: 1.08,
                backgroundColor: colors.accent + "22",
                color: colors.accent,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              tabIndex={0}
              aria-label={section}
            >
              <Icon size={18} strokeWidth={2} className="opacity-70" />
              {section}
            </motion.a>
          );
        })}
      </motion.div>
    </motion.nav>
  );
}
