"use client";

import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Page Header */}
      <div className="mb-12">
        <motion.h1
          className="text-4xl font-baloo font-bold mb-4"
          style={{ color: colors.textPrimary }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Dashboard
        </motion.h1>
        <motion.p
          className="text-lg leading-relaxed"
          style={{ color: colors.textSecondary }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Real-time view of professional activity, GitHub contributions, and
          ongoing projects.
        </motion.p>
      </div>
    </motion.div>
  );
}
