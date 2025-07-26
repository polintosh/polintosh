"use client";
import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";
import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { BlogPost } from "@/lib/blog";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import Link from "next/link";

interface BlogPostContentProps {
  post: BlogPost | null;
  slug: string;
}

export default function BlogPostContent({ post, slug }: BlogPostContentProps) {
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  if (!post) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm hover:scale-105 transition-transform duration-200"
              style={{ color: colors.textSecondary }}
            >
              <ArrowLeft size={16} />
              Back to Writing
            </Link>
          </motion.div>

          {/* Not Found Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div
              className="p-8 rounded-3xl border-2 border-dashed max-w-md mx-auto backdrop-blur-xl"
              style={{
                borderColor: colors.accent + "40",
                backgroundColor: colors.background.glass,
              }}
            >
              <h1
                className="text-3xl font-bold mb-3"
                style={{ color: colors.textPrimary }}
              >
                Article Not Found
              </h1>
              <p
                className="text-base mb-6"
                style={{ color: colors.textSecondary }}
              >
                The article &quot;{slug}&quot; doesn&apos;t exist yet or has
                been moved.
              </p>
              <Link
                href="/blog"
                className="inline-block px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.background.solid,
                }}
              >
                Browse All Articles
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm hover:scale-105 transition-transform duration-200"
            style={{ color: colors.textSecondary }}
          >
            <ArrowLeft size={16} />
            Back to Writing
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Category & Reading Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <span
              className="px-3 py-1 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: colors.accent + "20",
                color: colors.accent,
              }}
            >
              {post.category}
            </span>
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: colors.textSecondary }}
            >
              <Clock size={14} />
              {post.readingTime} min read
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            style={{ color: colors.textPrimary }}
          >
            {post.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl leading-relaxed mb-8"
            style={{ color: colors.textSecondary }}
          >
            {post.description}
          </motion.p>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 mb-12 pb-8 border-b"
            style={{ borderColor: colors.border }}
          >
            <div className="flex items-center gap-2">
              <Calendar size={16} style={{ color: colors.textSecondary }} />
              <span className="text-sm" style={{ color: colors.textSecondary }}>
                {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} style={{ color: colors.textSecondary }} />
              <span className="text-sm" style={{ color: colors.textSecondary }}>
                {post.author.name}
              </span>
            </div>
            {post.updatedAt && (
              <div className="flex items-center gap-2">
                <span
                  className="text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  Updated: {format(new Date(post.updatedAt), "MMM dd, yyyy")}
                </span>
              </div>
            )}
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {post.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm"
                style={{
                  backgroundColor: colors.background.glass,
                  color: colors.textSecondary,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <Tag size={12} />
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.article>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-16"
        >
          <MarkdownRenderer content={post.content} />
        </motion.div>

        {/* Author Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="p-8 rounded-3xl border backdrop-blur-xl"
          style={{
            backgroundColor: colors.background.glass,
            borderColor: colors.border,
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{
                backgroundColor: colors.accent + "20",
                color: colors.accent,
              }}
            >
              {post.author.name.charAt(0)}
            </div>
            <div>
              <h3
                className="text-lg font-semibold mb-1"
                style={{ color: colors.textPrimary }}
              >
                {post.author.name}
              </h3>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                {post.author.bio}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
