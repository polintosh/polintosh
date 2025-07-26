/**
 * Centralized external links configuration
 * This is the single source of truth for all external URLs used throughout the application
 */

import { SOCIAL_LINKS } from "./socialLinks";

// Re-export from social links for convenience
export { SOCIAL_LINKS, type SocialLinkKey } from "./socialLinks";

// Additional external links
export const EXTERNAL_LINKS = {
  // Documentation & Resources
  nextjs: "https://nextjs.org",
  react: "https://reactjs.org",
  tailwind: "https://tailwindcss.com",
  framerMotion: "https://framer.com/motion",

  // Code repositories
  portfolioRepo: "https://github.com/polintosh/website",

  // Services
  vercel: "https://vercel.com",
  github: "https://github.com",

  // Personal links
  resume: "/resume.pdf", // Relative link to resume in public folder
  cv: "/cv.pdf", // Alternative CV link

  // Blog/Newsletter (if applicable)
  // newsletter: "https://your-newsletter-link.com",
  // rss: "/rss.xml",
} as const;

// Combined links for easy access
export const ALL_LINKS = {
  ...SOCIAL_LINKS,
  ...EXTERNAL_LINKS,
} as const;

// Type definitions
export type ExternalLinkKey = keyof typeof EXTERNAL_LINKS;
export type AllLinkKey = keyof typeof ALL_LINKS;
