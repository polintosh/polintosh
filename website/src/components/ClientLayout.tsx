"use client";

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import NavBar from "@/components/NavBar/NavBar";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSplashFinished, setSplashFinished] = useState(false);

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
            className="w-full"
          >
            <ContentWrapper>{children}</ContentWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
