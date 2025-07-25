"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Color system for light and dark themes
 * - Uses professional color contrasts for accessibility
 * - Includes glassmorphism effects with transparency
 * - Optimized for performance and minimal re-renders
 */
const colorSystem = {
  light: {
    background: {
      primary: "#FFFFFF",
      gradient: "linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)",
    },
    text: {
      primary: "#1D1D1F",
      secondary: "#6E6E73",
      accent: "#007AFF",
    },
    glass: {
      background: "rgba(255, 255, 255, 0.7)",
      border: "rgba(255, 255, 255, 0.3)",
      shadow: "rgba(0, 0, 0, 0.1)",
    },
    loader: "#007AFF",
  },
  dark: {
    background: {
      primary: "#000000",
      gradient: "linear-gradient(135deg, #000000 0%, #1C1C1E 100%)",
    },
    text: {
      primary: "#F2F2F7",
      secondary: "#AEAEB2",
      accent: "#0A84FF",
    },
    glass: {
      background: "rgba(255, 255, 255, 0.1)",
      border: "rgba(255, 255, 255, 0.2)",
      shadow: "rgba(0, 0, 0, 0.3)",
    },
    loader: "#0A84FF",
  },
} as const;

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
  bouncy: [0.68, -0.55, 0.265, 1.55],
  gentle: [0.4, 0, 0.2, 1],
} as const;

/**
 * Splash Screen Component
 *
 * Features:
 * - Glassmorphism effects with transparency
 * - Smooth animations with professional easing curves
 * - Responsive design optimized for all devices
 * - Accessibility-compliant color contrasts (WCAG AA)
 * - Performance-optimized with minimal re-renders
 */
export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [step, setStep] = useState<"loading" | "welcome">("loading");
  const [theme, setTheme] = useState<"dark" | "light">("light");

  // Initialize theme and manage splash screen lifecycle
  useEffect(() => {
    setTheme(getSystemTheme());

    // Professional timing for optimal user experience
    const loadingTimeout = setTimeout(() => setStep("welcome"), 1800);
    const exitTimeout = setTimeout(() => setShow(false), 4500); // Extended duration for better readability

    // Cleanup function to prevent memory leaks
    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(exitTimeout);
    };
  }, []);

  // Get current theme colors
  const colors = colorSystem[theme];

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: colors.background.primary,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easingCurves.gentle }}
        >
          {/* Glassmorphism Container - Fixed Size */}
          <motion.div
            className="relative flex flex-col items-center justify-center rounded-3xl"
            style={{
              width: "400px",
              height: "500px",
              background: colors.glass.background,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${colors.glass.border}`,
              boxShadow: `0 20px 40px ${colors.glass.shadow}`,
            }}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -10 }}
            transition={{
              duration: 0.8,
              ease: easingCurves.smooth,
              delay: 0.1,
            }}
          >
            {/* Avatar Container with Enhanced Depth */}
            <div className="relative mb-8">
              {/* Background glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${colors.loader}20 0%, transparent 70%)`,
                  transform: "scale(1.5)",
                }}
                animate={{
                  scale: [1.5, 1.7, 1.5],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Avatar Image */}
              <motion.div
                className="relative z-10 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: easingCurves.gentle }}
              >
                <Image
                  src="/avatar.png"
                  alt="Profile Avatar"
                  width={120}
                  height={120}
                  className="rounded-full shadow-2xl ring-4 ring-white/20"
                  style={{
                    boxShadow: `0 25px 50px ${colors.glass.shadow}`,
                  }}
                  priority
                />
                {/* Subtle Lucide Sparkle icon */}
                <Sparkle
                  size={22}
                  strokeWidth={2}
                  className="absolute bottom-2 right-2 text-blue-400 dark:text-orange-300 opacity-70"
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
                  opacity="0.3"
                  strokeDasharray="440"
                  strokeDashoffset="330"
                  animate={{
                    rotate: [0, 360],
                    strokeDashoffset: [330, 110, 330],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.svg>
            </div>

            {/* Dynamic Text with Smooth Transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: easingCurves.gentle }}
              >
                <h1
                  className="text-2xl font-semibold mb-2 tracking-tight"
                  style={{ color: colors.text.accent }}
                >
                  {step === "loading" ? "Loading..." : "Welcome"}
                </h1>
                <p
                  className="text-sm font-medium"
                  style={{ color: colors.text.secondary }}
                >
                  {step === "loading"
                    ? "Preparing your experience"
                    : "Ready to explore"}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Subtle Progress Indicator */}
            <motion.div
              className="mt-6 w-32 h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: `${colors.loader}20` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: step === "loading" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: colors.loader }}
                initial={{ width: "0%" }}
                animate={{ width: step === "loading" ? "100%" : "0%" }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
