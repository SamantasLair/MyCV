/**
 * Site Configuration
 * 
 * Centralized configuration based on Environment Variables to adhere to Clean Code 
 * principles (DRY) and Next.js Best Practices for managing environment context.
 */

export const siteConfig = {
  authorName: "Samuel Ananta",
  title: "Samuel Ananta | Software Engineer & Full-Stack Architect",
  description: "Passionate Software Engineer & Full-Stack Architect building modern web applications, scalable APIs, AI/NLP pipelines, and high-performance system solutions.",
  siteUrl: "https://samuel-ananta.vercel.app",
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "SamantasLair",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/samuel-ananta",
  email: process.env.NEXT_PUBLIC_EMAIL || "samuelananta.work@gmail.com",
  resumeUrl: "/resume.pdf",
  resumePageUrl: "/resume",
  location: "Indonesia (WIB / UTC+7)",
  openToWork: true,
  keywords: [
    "Samuel Ananta",
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "C++",
    "Java",
    "NLP",
    "Web Architecture",
    "Portfolio"
  ],
} as const;

