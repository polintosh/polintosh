import fs from "fs";
import matter from "gray-matter";
import path from "path";

const blogDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  draft: boolean;
  coverImage?: string;
  tags: string[];
  category: string;
  language: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl?: string;
  };
  content: string;
  readingTime: number;
}

export function getAllBlogPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(blogDirectory);

    const allPostsData = fileNames
      .filter(
        (fileName) => fileName.endsWith(".md") && !fileName.startsWith("_")
      )
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        return getBlogPostBySlug(slug);
      })
      .filter((post) => post !== null && !post.draft)
      .sort((a, b) => {
        if (new Date(a!.publishedAt) < new Date(b!.publishedAt)) {
          return 1;
        } else {
          return -1;
        }
      });

    return allPostsData as BlogPost[];
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: data.title,
      description: data.description,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      featured: data.featured || false,
      draft: data.draft || false,
      coverImage: data.coverImage,
      tags: data.tags || [],
      category: data.category,
      language: data.language,
      author: data.author,
      seo: data.seo,
      content,
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getAllTags(): string[] {
  const posts = getAllBlogPosts();
  const allTags = posts.flatMap((post) => post.tags);
  return [...new Set(allTags)].sort();
}

export function getAllCategories(): string[] {
  const posts = getAllBlogPosts();
  const allCategories = posts.map((post) => post.category);
  return [...new Set(allCategories)].sort();
}

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter((post) => post.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter((post) => post.featured);
}
