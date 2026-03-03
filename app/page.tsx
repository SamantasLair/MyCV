"use client";

import { BentoGrid } from "@/components/ui/BentoGrid";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { HexagonCard } from "@/components/ui/HexagonCard";
import { MagneticParticles } from "@/components/ui/MagneticParticles";
import { GitHubProfile } from "@/components/ui/GitHubProfile";
import { GitHubDashboard } from "@/components/ui/GitHubDashboard";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <main className="min-h-screen text-slate-100 p-4 md:p-8 relative">
      <MagneticParticles />

      <div className="max-w-5xl mx-auto space-y-6 relative z-10">

        {/* Header Section */}
        <Section className="py-16 md:py-24 lg:py-28">
          <GitHubProfile />
        </Section>

        {/* Bento Grid Layout */}
        <Section delay={0.2} className="py-8 md:py-12 lg:py-16">
          <BentoGrid>
            {/* About / Bio Card */}
            <Card colSpan={2} title="About Me">
              <p className="text-slate-400 leading-relaxed text-sm">
                I am a passionate software engineer specializing in modern web technologies
                and systems programming. With a strong foundation in both frontend and backend
                development, I create scalable applications that solve real-world problems.
                I believe in clean code, continuous learning, and sharing knowledge with the community.
              </p>
            </Card>

            {/* Quick Stats Card */}
            <Card title="Quick Facts">
              <div className="space-y-2 text-sm text-slate-400">
                <p>📍 Indonesia</p>
                <p>🎓 Computer Science</p>
                <p>💼 Open to opportunities</p>
                <p>🌐 38 public repos</p>
              </div>
            </Card>
          </BentoGrid>
        </Section>

        {/* GitHub Activity Dashboard */}
        <Section delay={0.3} className="py-8 md:py-12 lg:py-16">
          <GitHubDashboard />
        </Section>

        {/* Featured Projects */}
        <Section delay={0.4} className="py-8 md:py-12 lg:py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
            <p className="text-slate-500 text-sm mt-1">Hexagonal Collection</p>
          </div>
          <div id="projects" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <HexagonCard
              title="Fitness App"
              description="React Native Tracking"
              platform="mobile"
              className="mx-auto"
            >
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 opacity-80" />
            </HexagonCard>
            <HexagonCard
              title="Admin Panel"
              description="Next.js Dashboard"
              platform="desktop"
              className="mx-auto md:mt-12"
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 opacity-80" />
            </HexagonCard>
            <HexagonCard
              title="E-Commerce"
              description="PWA & Mobile Ready"
              platform="both"
              className="mx-auto"
            >
              <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-80" />
            </HexagonCard>
            <HexagonCard
              title="Social Feed"
              description="iOS & Android"
              platform="mobile"
              className="mx-auto md:mt-12"
            >
              <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 opacity-80" />
            </HexagonCard>
          </div>
        </Section>

        {/* CTA Section */}
        <Section delay={0.5} className="py-8 md:py-12 lg:py-16">
          <div data-particle-collider className="rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/10 p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Want to work together?</h3>
                <p className="text-slate-500 text-sm">Download my full resume or get in touch directly.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-white text-black rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors">
                  Download CV
                </button>
                <Link href={`mailto:${siteConfig.email}`} className="px-5 py-2.5 border border-white/10 rounded-xl font-semibold text-sm text-slate-300 hover:bg-white/5 transition-colors">
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </Section>

        <footer className="text-center text-sm text-slate-600 py-8">
          <p>Built with Next.js 16 & Tailwind 4</p>
          <p className="mt-1">© {new Date().getFullYear()} {siteConfig.authorName}. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
