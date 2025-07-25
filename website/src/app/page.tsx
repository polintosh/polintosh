"use client";

import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

export default function HomePage() {
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  return (
    <PageWrapper
      title="Home"
      subtitle="Welcome to my personal portfolio. Discover my journey, projects, and passion for creating exceptional digital experiences."
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {/* Quick intro section */}
          <div
            className="p-6 rounded-2xl"
            style={{
              backgroundColor: colors.background,
              border: `1px solid ${colors.border}`,
            }}
          >
            <h2
              className="text-2xl font-baloo font-bold mb-4"
              style={{ color: colors.textPrimary }}
            >
              Hi, I&apos;m Pol! 👋
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              Software Developer passionate about iOS development, AI/ML, and
              creating user-centered applications. I blend creativity with
              technical expertise to build products that make a difference.
            </p>
          </div>

          {/* Quick stats or highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "iOS Apps Built", value: "10+" },
              { label: "Years Experience", value: "3+" },
              { label: "Technologies", value: "15+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-xl"
                style={{
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.border}`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div
                  className="text-2xl font-baloo font-bold"
                  style={{ color: colors.accent }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: colors.textSecondary }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
