"use client";

import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  fullScreen?: boolean; // Add this prop
}

/**
 * A wrapper for page content that provides consistent layout, spacing,
 * and animated page transitions. It includes optional title and description.
 */
export default function ContentWrapper({
  children,
  className = "",
  title,
  description,
  fullScreen = false, // Default to false
}: ContentWrapperProps) {
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  const baseClasses = fullScreen
    ? "w-full p-8 md:p-12 lg:p-16"
    : "ml-[20vw] w-[80vw] p-8 md:p-12 lg:p-16";

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`${baseClasses} w-full ${className}`}
    >
      {(title || description) && (
        <div className="mb-8 md:mb-12 text-center">
          {title && (
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
              style={{ color: colors.textPrimary }}
            >
              {title}
            </motion.h1>
          )}
          {description && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mt-3 text-lg md:text-xl max-w-3xl mx-auto"
              style={{ color: colors.textSecondary }}
            >
              {description}
            </motion.p>
          )}
        </div>
      )}
      {children}
    </motion.main>
  );
}
