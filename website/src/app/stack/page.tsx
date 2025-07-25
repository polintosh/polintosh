"use client";

import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { motion } from "framer-motion";

export default function StackPage() {
  return (
    <PageWrapper
      title="Stack"
      subtitle="Technologies, frameworks, and tools that power my development workflow and creative process."
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {/* Tech stack content will go here */}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
