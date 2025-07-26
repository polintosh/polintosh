"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { colorSystem } from "../../contexts/ThemeContext";

/**
 * Detects user's system theme preference
 * @returns {string} 'dark' or 'light' based on system preference
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
 * Easing curves for natural motion
 */
const easingCurves = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  gentle: [0.4, 0, 0.2, 1],
} as const;

/**
 * Splash Screen Component
 *
 * Features:
 * - Minimalist, full-screen design inspired by Apple.
 * - Smooth animations with professional easing curves.
 * - Responsive design optimized for all devices.
 * - Accessibility-compliant color contrasts (WCAG AA).
 * - Performance-optimized with minimal re-renders.
 */
export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [show, setShow] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("light");

  // Initialize theme and manage splash screen lifecycle
  useEffect(() => {
    setTheme(getSystemTheme());

    const exitTimeout = setTimeout(() => setShow(false), 2500); // Total duration for splash

    // Cleanup function to prevent memory leaks
    return () => {
      clearTimeout(exitTimeout);
    };
  }, []);

  // Get current theme colors
  const colors = colorSystem[theme];

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: colors.background.gradient,
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: easingCurves.gentle }}
        >
          {/* Avatar & Loader Container */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: easingCurves.smooth,
              delay: 0.2,
            }}
          >
            {/* Avatar Image */}
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: easingCurves.gentle }}
            >
              <Image
                src="/avatar.png"
                alt="Profile Avatar"
                width={100}
                height={100}
                className="rounded-full shadow-2xl"
                priority
              />
            </motion.div>

            {/* Elegant Loading Ring */}
            <motion.svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 5 }}
            >
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke={colors.loader}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ strokeDasharray: "0, 440", rotate: -90 }}
                animate={{
                  strokeDasharray: ["0, 440", "440, 440"],
                  rotate: 270,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop",
                }}
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
