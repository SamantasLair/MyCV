import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.authorName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords as unknown as string[],
  authors: [{ name: siteConfig.authorName, url: siteConfig.siteUrl }],
  creator: siteConfig.authorName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: `${siteConfig.authorName} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    jobTitle: "Software Engineer & Full-Stack Architect",
    url: siteConfig.siteUrl,
    sameAs: [
      siteConfig.linkedinUrl,
      `https://github.com/${siteConfig.githubUsername}`,
    ],
    knowsAbout: [
      "TypeScript",
      "Next.js",
      "React",
      "Python",
      "C++",
      "Java",
      "Software Engineering",
      "Artificial Intelligence",
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
