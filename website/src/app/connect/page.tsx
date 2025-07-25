"use client";

import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { motion } from "framer-motion";
import { Github, Linkedin, Send, Twitter } from "lucide-react";
import Link from "next/link";

export default function ConnectPage() {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-8 w-8" />,
      url: "https://www.linkedin.com/in/pol-hernandez-benet/",
    },
    {
      name: "X / Twitter",
      icon: <Twitter className="h-8 w-8" />,
      url: "https://x.com/polhbenet",
    },
    {
      name: "GitHub",
      icon: <Github className="h-8 w-8" />,
      url: "https://github.com/polintosh",
    },
  ];

  return (
    <PageWrapper
      title="Connect to Grow"
      subtitle="Interested in a project? Want to follow me on my social networks?"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          <div className="mt-12">
            <Link href="https://cal.com/pol-hernandez-benet/30min" passHref>
              <motion.button
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="mr-3 h-6 w-6" />
                Schedule a Call
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
