/**
 * Cal.com booking configuration
 * Centralized configuration for meeting scheduling
 */

export const CALCOM_BOOKING_URL = "https://cal.com/polintosh/30min"; // Your 30-minute booking link

// Additional Cal.com configuration (if needed)
export const CALCOM_CONFIG = {
  // Default meeting duration options
  defaultDuration: 30,

  // Available meeting types (customize as needed)
  meetingTypes: {
    consultation: "consultation-30min",
    project: "project-discussion-60min",
    quick: "quick-chat-15min",
    coffee: "coffee-chat-30min",
  },

  // Timezone preference
  timezone: "UTC",

  // Available time slots (if you want to define them)
  availableSlots: {
    weekdays: "9:00-17:00",
    weekends: "10:00-16:00",
  },
} as const;
