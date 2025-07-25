"use client";

import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

/**
 * Custom 404 page with theme-aware styling and smooth animations.
 * Provides clear navigation back to the main site.
 */
export default function NotFound() {
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-8"
      style={{
        backgroundColor: colors.pageBackground,
        color: colors.textPrimary,
      }}
    >
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* 404 Number */}
        <motion.h1
          className="text-8xl font-baloo font-bold mb-4"
          style={{ color: colors.accent }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          className="text-2xl font-baloo font-semibold mb-2"
          style={{ color: colors.textPrimary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-base mb-8 leading-relaxed"
          style={{ color: colors.textSecondary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/">
            <motion.button
              className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-xl font-baloo font-semibold text-white transition-all"
              style={{ backgroundColor: colors.accent }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Home size={20} />
              Go to Homepage
            </motion.button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-xl font-baloo font-semibold transition-all"
            style={{
              backgroundColor: colors.controlBg,
              color: colors.textPrimary,
              border: `1px solid ${colors.border}`,
            }}
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
