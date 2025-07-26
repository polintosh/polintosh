"use client";
import BlogCard from "@/components/BlogCard/BlogCard";
import BlogFilter from "@/components/BlogFilter/BlogFilter";
import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { BlogPost } from "@/lib/blog";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, PenTool, Sparkles, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

interface BlogContentProps {
  posts: BlogPost[];
  tags: string[];
  categories: string[];
}

export default function BlogContent({
  posts,
  tags,
  categories,
}: BlogContentProps) {
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    selectedTags: [] as string[],
    selectedCategory: "",
  });

  // Filter posts based on current filters
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        filters.search === "" ||
        post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        post.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        post.content.toLowerCase().includes(filters.search.toLowerCase());

      const matchesTags =
        filters.selectedTags.length === 0 ||
        filters.selectedTags.some((tag) => post.tags.includes(tag));

      const matchesCategory =
        filters.selectedCategory === "" ||
        post.category === filters.selectedCategory;

      return matchesSearch && matchesTags && matchesCategory;
    });
  }, [posts, filters]);

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  const stats = [
    {
      icon: BookOpen,
      label: "Articles",
      value: posts.length,
      color: colors.accent,
    },
    {
      icon: TrendingUp,
      label: "Featured",
      value: featuredPosts.length,
      color: "#10b981",
    },
    {
      icon: Sparkles,
      label: "Categories",
      value: categories.length,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center justify-center p-4 rounded-3xl mb-8"
            style={{ backgroundColor: colors.accent + "10" }}
          >
            <PenTool size={40} style={{ color: colors.accent }} />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${colors.textPrimary}, ${colors.accent})`,
            }}
          >
            Writing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-8"
            style={{ color: colors.textSecondary }}
          >
            A dedicated space for articles, tutorials, and thoughts on
            engineering, design, and technology.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-8 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div
                  className="inline-flex items-center justify-center p-3 rounded-2xl mb-2"
                  style={{ backgroundColor: stat.color + "20" }}
                >
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: colors.textPrimary }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Filter Section */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <div
              className="p-6 rounded-3xl border backdrop-blur-xl"
              style={{
                backgroundColor: colors.background.glass,
                borderColor: colors.border,
              }}
            >
              <BlogFilter
                tags={tags}
                categories={categories}
                onFilterChange={setFilters}
              />
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div
              key="posts-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold mb-6"
                    style={{ color: colors.textPrimary }}
                  >
                    Featured Articles
                  </motion.h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {featuredPosts.map((post, index) => (
                      <BlogCard
                        key={post.slug}
                        post={post}
                        index={index}
                        featured={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              {regularPosts.length > 0 && (
                <div>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold mb-6"
                    style={{ color: colors.textPrimary }}
                  >
                    All Articles
                  </motion.h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularPosts.map((post, index) => (
                      <BlogCard
                        key={post.slug}
                        post={post}
                        index={index + featuredPosts.length}
                        featured={false}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : posts.length === 0 ? (
            /* Coming Soon Section */
            <motion.div
              key="coming-soon"
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
                <div className="mb-6">
                  <PenTool
                    size={64}
                    style={{ color: colors.accent }}
                    className="mx-auto"
                  />
                </div>
                <h3
                  className="text-3xl font-bold mb-4"
                  style={{ color: colors.textPrimary }}
                >
                  Coming Soon
                </h3>
                <p
                  className="text-lg mb-6"
                  style={{ color: colors.textSecondary }}
                >
                  I&apos;m working on creating high-quality content. Check back
                  soon for articles on engineering, design, and tutorials.
                </p>

                {/* Categories Preview */}
                <div className="grid grid-cols-1 gap-4 mt-8">
                  {[
                    {
                      title: "Engineering",
                      description: "Technical deep-dives and best practices",
                      icon: "⚡",
                    },
                    {
                      title: "Design",
                      description: "UI/UX principles and design systems",
                      icon: "🎨",
                    },
                    {
                      title: "Tutorials",
                      description: "Step-by-step guides",
                      icon: "📚",
                    },
                  ].map((category, index) => (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="p-4 rounded-2xl border"
                      style={{
                        backgroundColor: colors.background.solid,
                        borderColor: colors.border,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div className="text-left">
                          <h4
                            className="font-semibold"
                            style={{ color: colors.textPrimary }}
                          >
                            {category.title}
                          </h4>
                          <p
                            className="text-sm"
                            style={{ color: colors.textSecondary }}
                          >
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* No Results */
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div
                className="p-8 rounded-3xl max-w-md mx-auto backdrop-blur-xl"
                style={{
                  backgroundColor: colors.background.glass,
                }}
              >
                <div className="mb-6">
                  <BookOpen
                    size={64}
                    style={{ color: colors.textSecondary }}
                    className="mx-auto"
                  />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: colors.textPrimary }}
                >
                  No articles found
                </h3>
                <p
                  className="text-base"
                  style={{ color: colors.textSecondary }}
                >
                  Try adjusting your search criteria or browse all articles.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
