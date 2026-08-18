"use client";

import { StarfieldBackground } from "@/components/ui/StarfieldBackground";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { AboutSection } from "@/components/ui/AboutSection";
import { GitHubDashboard } from "@/components/ui/GitHubDashboard";
import { ProjectsSection } from "@/components/ui/ProjectsSection";
import { ContactSection } from "@/components/ui/ContactSection";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { useActiveSectionTarget } from "@/lib/hooks/useActiveSectionTarget";

const SECTION_IDS = ["hero", "about", "github", "projects", "contact"];

export default function Home() {
  const guideTargetRef = useActiveSectionTarget(SECTION_IDS);
  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
      {/* Dynamic Interactive Starfield Background with Twinkle, Constellations & Parallax */}
      <StarfieldBackground guideTargetRef={guideTargetRef} />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 space-y-12 md:space-y-20 relative z-10 pt-16">
        
        {/* Section 1: Hero Section */}
        <HeroSection />

        {/* Section 2: About & Skill Matrix */}
        <Section delay={0.1}>
          <AboutSection />
        </Section>

        {/* Section 3: Live GitHub Activity */}
        <Section delay={0.2}>
          <GitHubDashboard />
        </Section>

        {/* Section 4: Featured Projects & Portfolio */}
        <Section delay={0.3}>
          <ProjectsSection />
        </Section>

        {/* Section 5: Call to Action & Contact */}
        <Section delay={0.4}>
          <ContactSection />
        </Section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
