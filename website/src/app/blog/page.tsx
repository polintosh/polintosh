import { getAllBlogPosts } from "@/lib/blog";
import BlogContent from "./BlogContent";

export default function BlogPage() {
  // Fetch data server-side
  const allPosts = getAllBlogPosts();

  return <BlogContent posts={allPosts} />;
}
export async function generateMetadata() {
  return {
    title: "Blog - Pol's Portfolio",
    description:
      "A dedicated space for articles, tutorials, and thoughts on engineering, design, and technology.",
    openGraph: {
      title: "Blog - Pol's Portfolio",
      description:
        "A dedicated space for articles, tutorials, and thoughts on engineering, design, and technology.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog - Pol's Portfolio",
      description:
        "A dedicated space for articles, tutorials, and thoughts on engineering, design, and technology.",
    },
  };
}
