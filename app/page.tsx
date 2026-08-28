"use client";

import { useState, useEffect } from "react";
import { StarfieldBackground } from "@/components/ui/StarfieldBackground";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { AboutSection } from "@/components/ui/AboutSection";
import { GitHubDashboard } from "@/components/ui/GitHubDashboard";
import { ProjectsSection } from "@/components/ui/ProjectsSection";
import { ContactSection } from "@/components/ui/ContactSection";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { TerminalModal } from "@/components/ui/TerminalModal";
import { useActiveSectionTarget } from "@/lib/hooks/useActiveSectionTarget";

const SECTION_IDS = ["hero", "about", "github", "projects", "contact"];

export default function Home() {
  const guideTargetRef = useActiveSectionTarget(SECTION_IDS);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "`" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
      {/* Dynamic Interactive Starfield Background */}
      <StarfieldBackground guideTargetRef={guideTargetRef} />

      {/* Sticky Navigation Bar */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 space-y-12 md:space-y-20 relative z-10 pt-16">
        
        {/* Section 1: Hero Section with Terminal Launcher */}
        <HeroSection onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Section 2: About & Skill Matrix */}
        <Section delay={0.1}>
          <AboutSection />
        </Section>

        {/* Section 3: Live GitHub Activity */}
        <Section delay={0.2}>
          <GitHubDashboard />
        </Section>

        {/* Section 4: Featured Projects & Portfolio with Case Studies */}
        <Section delay={0.3}>
          <ProjectsSection />
        </Section>

        {/* Section 5: Call to Action & Interactive Contact Form */}
        <Section delay={0.4}>
          <ContactSection />
        </Section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Global Command Palette Modal (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Interactive Developer CLI Sandbox Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
}
