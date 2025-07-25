"use client";

import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * Automatic content wrapper that handles:
 * - Proper spacing from fixed NavBar
 * - Full-height scrollable area
 * - Theme-aware background transitions with enhanced colors
 * - Responsive padding and margins
 * - Dynamic system theme support
 */
export default function ContentWrapper({
  children,
  className = "",
}: ContentWrapperProps) {
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  return (
    <motion.div
      className={`
        min-h-screen
        ml-[280px]
        transition-all duration-300 ease-in-out
        ${className}
      `}
      style={{
        backgroundColor: colors.pageBackground,
        color: colors.textPrimary,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Content area with proper scrolling */}
      <div className="relative h-screen overflow-y-auto">
        <div
          className="p-8 pb-16"
          style={{
            minHeight: "100vh",
            backgroundColor: colors.pageBackground,
          }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}
