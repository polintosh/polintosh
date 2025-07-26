"use client";
import { colorSystem, useTheme } from "@/contexts/ThemeContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { theme } = useTheme();
  const colors = colorSystem[theme];

  return (
    <div
      className="prose prose-lg max-w-none"
      style={
        {
          "--tw-prose-body": colors.textPrimary,
          "--tw-prose-headings": colors.textPrimary,
          "--tw-prose-lead": colors.textSecondary,
          "--tw-prose-links": colors.accent,
          "--tw-prose-bold": colors.textPrimary,
          "--tw-prose-counters": colors.textSecondary,
          "--tw-prose-bullets": colors.textSecondary,
          "--tw-prose-hr": colors.border,
          "--tw-prose-quotes": colors.textPrimary,
          "--tw-prose-quote-borders": colors.accent,
          "--tw-prose-captions": colors.textSecondary,
          "--tw-prose-code": colors.accent,
          "--tw-prose-pre-code": colors.textPrimary,
          "--tw-prose-pre-bg": colors.background.solid,
          "--tw-prose-th-borders": colors.border,
          "--tw-prose-td-borders": colors.border,
        } as React.CSSProperties
      }
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1
              className="text-4xl font-bold mb-6 mt-8"
              style={{ color: colors.textPrimary }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              className="text-3xl font-bold mb-4 mt-8"
              style={{ color: colors.textPrimary }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              className="text-2xl font-semibold mb-3 mt-6"
              style={{ color: colors.textPrimary }}
            >
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p
              className="mb-4 leading-relaxed"
              style={{ color: colors.textPrimary }}
            >
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium hover:underline transition-colors duration-200"
              style={{ color: colors.accent }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="px-2 py-1 rounded text-sm font-medium"
                  style={{
                    backgroundColor: colors.accent + "20",
                    color: colors.accent,
                  }}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} style={{ color: colors.textPrimary }}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre
              className="p-6 rounded-2xl overflow-x-auto my-6 border"
              style={{
                backgroundColor: colors.background.solid,
                borderColor: colors.border,
              }}
            >
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote
              className="border-l-4 pl-6 my-6 italic"
              style={{
                borderColor: colors.accent,
                color: colors.textSecondary,
              }}
            >
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul
              className="mb-4 space-y-2 list-disc list-inside"
              style={{ color: colors.textPrimary }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              className="mb-4 space-y-2 list-decimal list-inside"
              style={{ color: colors.textPrimary }}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li
              className="leading-relaxed"
              style={{ color: colors.textPrimary }}
            >
              {children}
            </li>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
