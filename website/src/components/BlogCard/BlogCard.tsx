"use client";
import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { BlogPost } from "@/lib/blog";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2 }}
      className={`group relative overflow-hidden rounded-3xl border backdrop-blur-xl ${
        post.featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      style={{
        backgroundColor: colors.background.glass,
        borderColor: colors.border,
        boxShadow: `0 10px 40px ${colors.shadow}10, 0 4px 16px ${colors.shadow}05`,
      }}
    >
      <motion.div
        whileHover={{ scale: 1, rotateY: 0, rotateX: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative h-full p-6 md:p-8"
      >
        {/* Featured Badge */}
        {post.featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 right-4 z-10"
          >
            <div
              className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-xl"
              style={{
                backgroundColor: colors.accent + "20",
                color: colors.accent,
                border: `1px solid ${colors.accent}30`,
              }}
            >
              Featured
            </div>
          </motion.div>
        )}

        {/* Cover Image Placeholder or Gradient */}
        <div
          className={`relative overflow-hidden rounded-2xl mb-6 ${
            post.featured ? "h-48 md:h-64" : "h-32 md:h-40"
          }`}
          style={{
            background: `linear-gradient(135deg, ${colors.accent}20, ${colors.accent}05)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
          <motion.div
            className="absolute bottom-4 left-4 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-xl"
                style={{
                  backgroundColor: colors.background.solid + "80",
                  color: colors.textSecondary,
                }}
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Category */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: colors.accent }}
            >
              {post.category}
            </span>
            <div
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: colors.accent }}
            />
            <span className="text-xs" style={{ color: colors.textSecondary }}>
              {post.readingTime} min read
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`font-bold leading-tight group-hover:text-opacity-80 transition-colors duration-300 ${
              post.featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
            }`}
            style={{ color: colors.textPrimary }}
          >
            {post.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`leading-relaxed ${
              post.featured ? "text-base md:text-lg" : "text-sm md:text-base"
            }`}
            style={{ color: colors.textSecondary }}
          >
            {post.description}
          </motion.p>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 pt-4"
          >
            <div className="flex items-center gap-2">
              <Calendar size={14} style={{ color: colors.textSecondary }} />
              <span className="text-xs" style={{ color: colors.textSecondary }}>
                {format(new Date(post.publishedAt), "MMM dd, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} style={{ color: colors.textSecondary }} />
              <span className="text-xs" style={{ color: colors.textSecondary }}>
                {post.readingTime} min
              </span>
            </div>
          </motion.div>
        </div>

        {/* Hover Arrow */}
        <motion.div
          className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ rotate: -45 }}
          whileHover={{ rotate: 0 }}
        >
          <ArrowUpRight size={20} style={{ color: colors.accent }} />
        </motion.div>

        {/* Link Overlay */}
        <Link
          href={`/blog/${post.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`Read article: ${post.title}`}
        />
      </motion.div>

      {/* Glassmorphism Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${colors.accent}05, transparent)`,
        }}
      />
    </motion.article>
  );
}
