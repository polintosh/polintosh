"use client";

import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <PageWrapper
      title="Contact"
      subtitle="Let's connect and explore opportunities for collaboration, partnership, or just a great conversation."
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {/* Contact form and information will go here */}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
