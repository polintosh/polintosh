"use client";

import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * Page wrapper component that provides:
 * - Consistent page structure
 * - Theme-aware styling
 * - Smooth page transitions
 * - Optional title and subtitle display
 */
export default function PageWrapper({
  children,
  title,
  subtitle,
  className = "",
}: PageWrapperProps) {
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {(title || subtitle) && (
        <motion.header
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title && (
            <h1
              className="text-4xl md:text-5xl font-baloo font-bold mb-3"
              style={{ color: colors.textPrimary }}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              {subtitle}
            </p>
          )}
        </motion.header>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
