"use client";

import NavBar from "@/components/NavBar/NavBar";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSplashFinished, setSplashFinished] = useState(false);

  return (
    <>
      <SplashScreen onComplete={() => setSplashFinished(true)} />
      <NavBar isSplashActive={!isSplashFinished} />
      <AnimatePresence>
        {isSplashFinished && (
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="pl-24 pr-8 pt-8" // Adjust padding to avoid overlap with NavBar
          >
            {children}
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
