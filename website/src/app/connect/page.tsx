"use client";

import { SOCIAL_LINKS } from "@/config/socialLinks";
import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ConnectPage() {
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  // Social links with adaptive icons based on theme
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "/icons/linkedin.svg",
      url: SOCIAL_LINKS.linkedin,
      color: "#0A66C2",
      position: "top",
      rotation: -8,
    },
    {
      name: "GitHub",
      icon:
        theme === "dark" ? "/icons/github-dark.svg" : "/icons/github-light.svg",
      url: SOCIAL_LINKS.github,
      color: theme === "light" ? "#181717" : "#F0F6FF",
      position: "bottom-left",
      rotation: 12,
    },
    {
      name: "X",
      icon: theme === "dark" ? "/icons/x-dark.svg" : "/icons/x-light.svg",
      url: SOCIAL_LINKS.x,
      color: theme === "light" ? "#000000" : "#FFFFFF",
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
    <>
      {/* Full-screen background that extends behind NavBar */}
      <div className="fixed inset-0 z-0">
        {/* Apple Design Static Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              theme === "dark"
                ? `
                  radial-gradient(ellipse 150% 100% at 50% 0%, rgba(15, 15, 15, 1) 0%, rgba(0, 0, 0, 1) 50%),
                  radial-gradient(ellipse 120% 120% at 20% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 60%),
                  radial-gradient(ellipse 120% 120% at 80% 20%, rgba(168, 85, 247, 0.03) 0%, transparent 60%),
                  radial-gradient(ellipse 100% 100% at 50% 50%, rgba(99, 102, 241, 0.02) 0%, transparent 70%),
                  #000000
                `
                : `
                  radial-gradient(ellipse 150% 100% at 50% 0%, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 50%),
                  radial-gradient(ellipse 120% 120% at 20% 80%, rgba(59, 130, 246, 0.02) 0%, transparent 60%),
                  radial-gradient(ellipse 120% 120% at 80% 20%, rgba(168, 85, 247, 0.015) 0%, transparent 60%),
                  radial-gradient(ellipse 100% 100% at 50% 50%, rgba(99, 102, 241, 0.01) 0%, transparent 70%),
                  #ffffff
                `,
          }}
        >
          {/* Subtle grain texture for premium feel */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                theme === "dark"
                  ? "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)"
                  : "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.01) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>
      </div>

      {/* Content Container - No scroll, fixed height */}
      <div className="relative z-10 h-screen overflow-hidden px-8 py-6">
        <div className="flex items-center justify-center h-full">
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
                  fontFamily:
                    "SF Pro Text, -apple-system, system-ui, sans-serif",
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
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4,
              }}
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
                          key={`${link.name}-${theme}`}
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
              transition={{
                duration: 0.6,
                delay: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link href={SOCIAL_LINKS.cal}>
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
    </>
  );
}
