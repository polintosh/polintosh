"use client";
import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Folder, Hash, Search, X } from "lucide-react";
import { useState } from "react";

interface BlogFilterProps {
  tags: string[];
  categories: string[];
  onFilterChange: (filters: {
    search: string;
    selectedTags: string[];
    selectedCategory: string;
  }) => void;
}

export default function BlogFilter({
  tags,
  categories,
  onFilterChange,
}: BlogFilterProps) {
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value, selectedTags, selectedCategory });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onFilterChange({ search, selectedTags: newTags, selectedCategory });
  };

  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategory === category ? "" : category;
    setSelectedCategory(newCategory);
    onFilterChange({ search, selectedTags, selectedCategory: newCategory });
  };

  const clearAllFilters = () => {
    setSearch("");
    setSelectedTags([]);
    setSelectedCategory("");
    onFilterChange({ search: "", selectedTags: [], selectedCategory: "" });
  };

  const hasActiveFilters =
    search || selectedTags.length > 0 || selectedCategory;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Search Bar */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          style={{ color: colors.textSecondary }}
        />
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-opacity-50 placeholder-opacity-60"
          style={{
            backgroundColor: colors.background.glass,
            borderColor: colors.border,
            color: colors.textPrimary,
            outlineColor: colors.accent,
          }}
        />
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Folder size={16} style={{ color: colors.accent }} />
          <span
            className="text-sm font-medium"
            style={{ color: colors.textPrimary }}
          >
            Categories
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(category)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border backdrop-blur-xl"
              style={{
                backgroundColor:
                  selectedCategory === category
                    ? colors.accent + "20"
                    : colors.background.glass,
                borderColor:
                  selectedCategory === category ? colors.accent : colors.border,
                color:
                  selectedCategory === category
                    ? colors.accent
                    : colors.textPrimary,
              }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Hash size={16} style={{ color: colors.accent }} />
          <span
            className="text-sm font-medium"
            style={{ color: colors.textPrimary }}
          >
            Tags
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTagToggle(tag)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border backdrop-blur-xl"
              style={{
                backgroundColor: selectedTags.includes(tag)
                  ? colors.accent + "20"
                  : colors.background.glass,
                borderColor: selectedTags.includes(tag)
                  ? colors.accent
                  : colors.border,
                color: selectedTags.includes(tag)
                  ? colors.accent
                  : colors.textSecondary,
              }}
            >
              #{tag}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearAllFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border backdrop-blur-xl"
            style={{
              backgroundColor: colors.background.glass,
              borderColor: colors.border,
              color: colors.textSecondary,
            }}
          >
            <X size={14} />
            Clear all filters
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
