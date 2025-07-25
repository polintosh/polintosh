"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// Detect system theme
const getSystemTheme = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

const getAccentColor = (theme: string) =>
  theme === "dark" ? "#a78bfa" : "#2563eb"; // dark: soft purple, light: blue

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [step, setStep] = useState<"loading" | "welcome">("loading");
  const [theme, setTheme] = useState(getSystemTheme());

  useEffect(() => {
    setTheme(getSystemTheme());
    const loadingTimeout = setTimeout(() => setStep("welcome"), 2000);
    const exitTimeout = setTimeout(() => setShow(false), 3200);
    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(exitTimeout);
    };
  }, []);

  const accentColor = getAccentColor(theme);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-500 ${
            theme === "dark" ? "bg-black" : "bg-white"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex flex-col items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Large avatar with loader arc close to the photo */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: 128, height: 128 }}
            >
              <Image
                src="/avatar.png" // Placeholder, replace with your image
                alt="Profile"
                width={128}
                height={128}
                className="rounded-full z-10 shadow-xl"
                priority
              />
              {/* Loader arc (1/4 circle), much larger and outside avatar */}
              <motion.svg
                width="192"
                height="192"
                viewBox="0 0 192 192"
                className="absolute"
                style={{ left: -32, top: -32, zIndex: 5 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              >
                <path
                  d="M172 96a80 80 0 0 0-80-80"
                  stroke={accentColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.8"
                  fill="none"
                />
              </motion.svg>
            </div>
            {/* Loading or Welcome text */}
            <motion.div
              className="mt-8 text-2xl font-semibold text-center"
              style={{ color: accentColor }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {step === "loading" ? "Loading..." : "Welcome"}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
