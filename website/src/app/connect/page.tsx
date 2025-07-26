"use client";

import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ConnectPage() {
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "/icons/socials/linkedin.svg",
      url: "https://www.linkedin.com/in/pol-hernandez-benet/",
      color: "#0A66C2",
      position: "top",
      rotation: -8,
    },
    {
      name: "GitHub",
      icon: "/icons/socials/github.svg",
      url: "https://github.com/polintosh",
      color: theme === "light" ? "#181717" : "#F0F6FF",
      position: "bottom-left",
      rotation: 12,
    },
    {
      name: "X",
      icon: "/icons/socials/twitter.svg",
      url: "https://x.com/polhbenet",
      color: "#000000",
      position: "bottom-right",
      rotation: -6,
    },
  ];

  const getPosition = (position: string) => {
    const baseDistance = 100;
    switch (position) {
      case "top":
        return { x: 0, y: -baseDistance };
      case "bottom-left":
        return { x: -baseDistance * 0.8, y: baseDistance * 0.6 };
      case "bottom-right":
        return { x: baseDistance * 0.8, y: baseDistance * 0.6 };
      default:
        return { x: 0, y: 0 };
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Apple/OpenAI Style Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #111111 50%, #0a0a0a 75%, #000000 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #f1f5f9 50%, #f8fafc 75%, #ffffff 100%)",
        }}
      >
        {/* Subtle animated mesh gradient */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              theme === "dark"
                ? "radial-gradient(ellipse 80% 50% at 50% 120%, rgba(59, 130, 246, 0.12), transparent), radial-gradient(ellipse 60% 80% at 20% 30%, rgba(168, 85, 247, 0.08), transparent), radial-gradient(ellipse 100% 60% at 80% 70%, rgba(99, 102, 241, 0.1), transparent)"
                : "radial-gradient(ellipse 80% 50% at 50% 120%, rgba(59, 130, 246, 0.08), transparent), radial-gradient(ellipse 60% 80% at 20% 30%, rgba(168, 85, 247, 0.05), transparent), radial-gradient(ellipse 100% 60% at 80% 70%, rgba(99, 102, 241, 0.06), transparent)",
          }}
          animate={{
            background:
              theme === "dark"
                ? [
                    "radial-gradient(ellipse 80% 50% at 50% 120%, rgba(59, 130, 246, 0.12), transparent), radial-gradient(ellipse 60% 80% at 20% 30%, rgba(168, 85, 247, 0.08), transparent), radial-gradient(ellipse 100% 60% at 80% 70%, rgba(99, 102, 241, 0.1), transparent)",
                    "radial-gradient(ellipse 60% 60% at 40% 100%, rgba(168, 85, 247, 0.12), transparent), radial-gradient(ellipse 80% 80% at 80% 20%, rgba(59, 130, 246, 0.08), transparent), radial-gradient(ellipse 90% 50% at 20% 80%, rgba(99, 102, 241, 0.1), transparent)",
                    "radial-gradient(ellipse 90% 70% at 60% 110%, rgba(99, 102, 241, 0.12), transparent), radial-gradient(ellipse 70% 60% at 10% 40%, rgba(59, 130, 246, 0.08), transparent), radial-gradient(ellipse 80% 80% at 90% 60%, rgba(168, 85, 247, 0.1), transparent)",
                    "radial-gradient(ellipse 80% 50% at 50% 120%, rgba(59, 130, 246, 0.12), transparent), radial-gradient(ellipse 60% 80% at 20% 30%, rgba(168, 85, 247, 0.08), transparent), radial-gradient(ellipse 100% 60% at 80% 70%, rgba(99, 102, 241, 0.1), transparent)",
                  ]
                : [
                    "radial-gradient(ellipse 80% 50% at 50% 120%, rgba(59, 130, 246, 0.08), transparent), radial-gradient(ellipse 60% 80% at 20% 30%, rgba(168, 85, 247, 0.05), transparent), radial-gradient(ellipse 100% 60% at 80% 70%, rgba(99, 102, 241, 0.06), transparent)",
                    "radial-gradient(ellipse 60% 60% at 40% 100%, rgba(168, 85, 247, 0.08), transparent), radial-gradient(ellipse 80% 80% at 80% 20%, rgba(59, 130, 246, 0.05), transparent), radial-gradient(ellipse 90% 50% at 20% 80%, rgba(99, 102, 241, 0.06), transparent)",
                    "radial-gradient(ellipse 90% 70% at 60% 110%, rgba(99, 102, 241, 0.08), transparent), radial-gradient(ellipse 70% 60% at 10% 40%, rgba(59, 130, 246, 0.05), transparent), radial-gradient(ellipse 80% 80% at 90% 60%, rgba(168, 85, 247, 0.06), transparent)",
                    "radial-gradient(ellipse 80% 50% at 50% 120%, rgba(59, 130, 246, 0.08), transparent), radial-gradient(ellipse 60% 80% at 20% 30%, rgba(168, 85, 247, 0.05), transparent), radial-gradient(ellipse 100% 60% at 80% 70%, rgba(99, 102, 241, 0.06), transparent)",
                  ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              theme === "dark"
                ? "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)"
                : "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <h1
              className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
              style={{
                fontFamily:
                  "SF Pro Display, -apple-system, system-ui, sans-serif",
              }}
            >
              Let&apos;s Connect
            </h1>
            <p
              className="text-xl md:text-2xl font-medium opacity-70"
              style={{
                color: colors.textSecondary,
                fontFamily: "SF Pro Text, -apple-system, system-ui, sans-serif",
              }}
            >
              Building the future, one connection at a time
            </p>
          </motion.div>

          {/* Triangle Formation Social Icons */}
          <motion.div
            className="relative w-72 h-72 mx-auto mb-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            {socialLinks.map((link, index) => {
              const pos = getPosition(link.position);
              return (
                <motion.div
                  key={link.name}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    x: pos.x,
                    y: pos.y,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    rotate: link.rotation + 180,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: link.rotation,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-7 rounded-3xl backdrop-blur-2xl border transition-all duration-500 group"
                    style={{
                      background:
                        theme === "dark"
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(255, 255, 255, 0.7)",
                      borderColor:
                        theme === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.1)",
                      boxShadow:
                        theme === "dark"
                          ? "0 8px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                          : "0 8px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                    }}
                    whileHover={{
                      scale: 1.12,
                      transition: { duration: 0.3, ease: "easeInOut" },
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: { duration: 0.2, ease: "easeInOut" },
                    }}
                    animate={{
                      y: [0, -4, 0],
                      scale: [1, 1.01, 1],
                    }}
                    transition={{
                      duration: 5 + index * 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.6,
                    }}
                  >
                    <div className="relative">
                      <Image
                        src={link.icon}
                        alt={link.name}
                        width={32}
                        height={32}
                        className="transition-all duration-400"
                        style={{
                          filter: `drop-shadow(0 0 20px ${link.color}40)`,
                          color: link.color,
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${link.color}15 0%, transparent 60%)`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{
                          scale: 1.8,
                          opacity: 0.6,
                          transition: { duration: 0.3, ease: "easeInOut" },
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.a>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="https://cal.com/pol-hernandez-benet/30min">
              <motion.button
                className="inline-flex items-center px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-2xl border group"
                style={{
                  background:
                    theme === "dark"
                      ? "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.2))"
                      : "linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(99, 102, 241, 0.12))",
                  borderColor:
                    theme === "dark"
                      ? "rgba(59, 130, 246, 0.3)"
                      : "rgba(59, 130, 246, 0.2)",
                  color: colors.textPrimary,
                  boxShadow:
                    theme === "dark"
                      ? "0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                      : "0 12px 40px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    theme === "dark"
                      ? "0 16px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                      : "0 16px 60px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 1)",
                  transition: { duration: 0.3, ease: "easeInOut" },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.15, ease: "easeInOut" },
                }}
              >
                <Send className="mr-3 h-5 w-5" />
                Schedule a Call w/ Cal.com
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
