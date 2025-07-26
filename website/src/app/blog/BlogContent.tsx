"use client";

import BlogCard from "@/components/BlogCard/BlogCard";
import { BlogPost } from "@/lib/blog";
import { useState } from "react";

interface BlogContentProps {
  posts: BlogPost[];
}

export default function BlogContent({ posts }: BlogContentProps) {
  const [filter, setFilter] = useState<string>("all");

  const brandFilters = ["all", "apple", "tesla", "openai"];

  const filteredPosts =
    filter === "all"
      ? posts
      : posts.filter((post) =>
          post.tags.some((tag) => tag.toLowerCase().includes(filter))
        );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center space-x-2 sm:space-x-4">
        {brandFilters.map((brand) => (
          <button
            key={brand}
            onClick={() => setFilter(brand)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-in-out ${
              filter === brand
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {brand.charAt(0).toUpperCase() + brand.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
