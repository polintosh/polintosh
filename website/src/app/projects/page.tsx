"use client";

import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <PageWrapper
      title="Projects"
      subtitle="A curated selection of my most significant work, showcasing creativity and technical expertise."
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {/* Project cards or content will go here */}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
