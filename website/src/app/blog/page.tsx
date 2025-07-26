"use client";

import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <PageWrapper
      title="Blog"
      subtitle="Thoughts, tutorials, and insights on software engineering, design, and technology trends."
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {/* Blog posts content will go here */}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
