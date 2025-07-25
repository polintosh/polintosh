"use client";

import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <PageWrapper
      title="Dashboard"
      subtitle="Real-time view of professional activity, GitHub contributions, and ongoing projects."
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {/* Dashboard widgets and data will go here */}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
