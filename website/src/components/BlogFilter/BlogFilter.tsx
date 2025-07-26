"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface BlogFilterProps {
  categories: string[];
  onFilterChange: (category: string) => void;
}

// Helper to assign a consistent, vibrant color to each category
const categoryColors: { [key: string]: { light: string; dark: string } } = {
  default: { light: "#6366F1", dark: "#818CF8" }, // Indigo
  Engineering: { light: "#3B82F6", dark: "#60A5FA" }, // Blue
  Design: { light: "#EC4899", dark: "#F472B6" }, // Pink
  Tutorials: { light: "#10B981", dark: "#34D399" }, // Emerald
  Technology: { light: "#F59E0B", dark: "#FBBF24" }, // Amber
};

const getCategoryColor = (category: string) => {
  return categoryColors[category] || categoryColors.default;
};

export default function BlogFilter({
  categories,
  onFilterChange,
}: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? "" : category;
    setSelectedCategory(newCategory);
    onFilterChange(newCategory);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      className="flex justify-center items-center flex-wrap gap-3 md:gap-4 mb-12 md:mb-16"
    >
      {categories.map((category, index) => {
        const isActive = selectedCategory === category;
        const color = getCategoryColor(category);

        return (
          <motion.button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="px-5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ease-in-out transform-gpu"
            style={{
              color: isActive ? "#FFFFFF" : color.light,
              background: isActive
                ? `linear-gradient(135deg, ${color.light}, ${color.dark})`
                : "rgba(255, 255, 255, 0.05)",
              border: `1.5px solid ${
                isActive ? "transparent" : color.light + "50"
              }`,
              boxShadow: isActive
                ? `0 8px 25px ${color.light}40`
                : "0 4px 15px rgba(0,0,0,0.1)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.4 + index * 0.08,
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: `0 12px 30px ${color.light}50`,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
