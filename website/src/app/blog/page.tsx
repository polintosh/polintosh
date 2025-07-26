import { getAllBlogPosts, getAllCategories, getAllTags } from "@/lib/blog";
import BlogContent from "./BlogContent";

export default function BlogPage() {
  // Fetch data server-side
  const allPosts = getAllBlogPosts();
  const allTags = getAllTags();
  const allCategories = getAllCategories();

  return (
    <BlogContent posts={allPosts} tags={allTags} categories={allCategories} />
  );
}
export async function generateMetadata() {
  return {
    title: "Writing - Pol's Portfolio",
    description:
      "A dedicated space for articles, tutorials, and thoughts on engineering, design, and technology.",
    openGraph: {
      title: "Writing - Pol's Portfolio",
      description:
        "A dedicated space for articles, tutorials, and thoughts on engineering, design, and technology.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Writing - Pol's Portfolio",
      description:
        "A dedicated space for articles, tutorials, and thoughts on engineering, design, and technology.",
    },
  };
}
