/**
 * Configuration barrel export
 * Import all configuration from a single entry point
 */

// Main links configuration
export * from "./links";
export * from "./socialLinks";

// Specific service configurations
export * from "./calcom";

// Default export for convenience
export { SOCIAL_LINKS as default } from "./socialLinks";
