/**
 * Site Configuration
 * 
 * Centralized configuration based on Environment Variables to adhere to Clean Code 
 * principles (DRY) and Next.js Best Practices for managing environment context.
 */

export const siteConfig = {
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "SamantasLair",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/samuel-ananta",
  email: process.env.NEXT_PUBLIC_EMAIL || "email@example.com",
  authorName: "Samuel Ananta",
} as const;
