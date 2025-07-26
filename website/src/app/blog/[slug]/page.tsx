import { getBlogPostBySlug } from "@/lib/blog";
import BlogPostContent from "./BlogPostContent";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  return <BlogPostContent post={post} slug={params.slug} />;
}
