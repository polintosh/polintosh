"use client";

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import NavBar from "@/components/NavBar/NavBar";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSplashFinished, setSplashFinished] = useState(false);
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  // Remove no-transition class after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.remove("no-transition");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashScreen onComplete={() => setSplashFinished(true)} />
      <NavBar isSplashActive={!isSplashFinished} />
      <AnimatePresence>
        {isSplashFinished && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="fixed top-0 right-0 h-screen w-[80vw] p-4 z-40"
          >
            <div
              className="flex flex-col h-full w-full p-4 rounded-2xl backdrop-blur-2xl shadow-2xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.background.solid}85, ${colors.background.solid}80)`,
                border: `1.5px solid ${colors.border}95`,
                boxShadow:
                  theme === "dark"
                    ? `0 20px 60px rgba(0, 0, 0, 0.6), 0 8px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.12), 0 4px 20px rgba(255, 255, 255, 0.08), 0 0 40px rgba(255, 255, 255, 0.03)`
                    : `0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 0 rgba(0, 0, 0, 0.05), 0 4px 20px rgba(0, 0, 0, 0.03)`,
              }}
            >
              <ContentWrapper fullScreen>{children}</ContentWrapper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
