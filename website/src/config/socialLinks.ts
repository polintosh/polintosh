/**
 * Centralized social media and external links configuration
 * Update these URLs in one place to reflect across the entire application
 */

export const SOCIAL_LINKS = {
  // Professional networks
  linkedin: "https://www.linkedin.com/in/pol-hernàndez-319518299/",
  github: "https://github.com/polintosh",

  // Social media
  x: "https://x.com/polintosh",

  // Communication & meeting links
  cal: "https://cal.com/polintosh/30min", // Cal.com 30-minute booking link

  // Personal website/portfolio
  // website: "https://polintosh.dev", // Update with your actual domain

  // Other platforms (uncomment and update as needed)
  // discord: "https://discord.gg/your-server",
  // telegram: "https://t.me/your-username",
  // instagram: "https://instagram.com/your-handle",
  // youtube: "https://youtube.com/@your-channel",
  // twitch: "https://twitch.tv/your-channel",
  // medium: "https://medium.com/@your-username",
  // dev: "https://dev.to/your-username",
} as const;

// Type definition for better TypeScript support
export type SocialLinkKey = keyof typeof SOCIAL_LINKS;
