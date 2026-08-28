# 🗺️ Project Index: Samuel Ananta Developer Portfolio

Konteks: Bagian dari [[INDEX]]

## 📌 Project Overview
- **Name**: Samuel Ananta Developer Portfolio
- **Framework**: Next.js 16.1.6 (App Router) + React 19.2.3 + TypeScript 5
- **Styling**: Tailwind CSS 4 + Framer Motion 12.34.0 + Lucide React
- **Hosting / Deploy**: Vercel
- **Repository**: [SamantasLair/MyCV](https://github.com/SamantasLair)

---

## 🏛️ Directory Architecture
- `app/`
  - [`layout.tsx`](file:///c:/laragon/www/_MyCV/portfolio/app/layout.tsx): Root layout, Geist font definitions, OpenGraph metadata, JSON-LD Schema.org.
  - [`page.tsx`](file:///c:/laragon/www/_MyCV/portfolio/app/page.tsx): Main landing page composing interactive sections and global modals.
  - [`not-found.tsx`](file:///c:/laragon/www/_MyCV/portfolio/app/not-found.tsx): Deep Cosmos Drift custom 404 recovery portal with celestial gyro HUD and warp navigation.
  - [`resume/page.tsx`](file:///c:/laragon/www/_MyCV/portfolio/app/resume/page.tsx): Stellar Trajectory interactive and print-optimized Curriculum Vitae page.
  - [`projects/stki-nlp/page.tsx`](file:///c:/laragon/www/_MyCV/portfolio/app/projects/stki-nlp/page.tsx): Live interactive Indonesian NLP tokenizer, stemmer, and classifier sandbox.
  - [`globals.css`](file:///c:/laragon/www/_MyCV/portfolio/app/globals.css): Tailwind CSS 4 directives, custom scrollbar, animations.
- `components/ui/`
  - [`Navbar.tsx`](file:///c:/laragon/www/_MyCV/portfolio/components/ui/Navbar.tsx): Sticky navigation header with scroll detection & Command Palette trigger.
  - [`HeroSection.tsx`](file:///c:/laragon/www/_MyCV/portfolio/components/ui/HeroSection.tsx): Hero profile, typewriter dynamic role, live GitHub stats, CLI trigger.
  - [`AboutSection.tsx`](file:///c:/laragon/www/_MyCV/portfolio/components/ui/AboutSection.tsx): Engineering mindset BentoGrid, Canvas radar chart, milestones.
  - [`TechStack.tsx`](file:///c:/laragon/www/_MyCV/portfolio/components/ui/TechStack.tsx): Interactive tech badges with Devicon icons and glassmorphism hover cards.
  - [`GitHubDashboard.tsx`](file:///c:/laragon/www/_MyCV/portfolio/components/ui/GitHubDashboard.tsx): Live GitHub metrics, top language progress bars, Canvas line graph & contribution calendar.
  - [`ProjectsSection.tsx`](file:///c:/laragon/www/_MyCV/portfolio/components/ui/ProjectsSection.tsx): Filterable projects portfolio with featured highlight and case study modal triggers.
  - [`ProjectDetailModal.tsx`](file:///c:/laragon/www/_MyCV/portfolio/components/ui/ProjectDetailModal.tsx): Deep-dive case study modal with architecture, challenges, and metrics.
  - [`ContactSection.tsx`](file:///c:/laragon/www/_MyCV/portfolio/components/ui/ContactSection.tsx): Interactive contact message form, direct channels, and CV download/preview.
  - [`CommandPalette.tsx`](file:///c:/laragon/www/_MyCV/portfolio/components/ui/CommandPalette.tsx): Global `Cmd+K` / `Ctrl+K` search & quick action launcher.
  - [`TerminalModal.tsx`](file:///c:/laragon/www/_MyCV/portfolio/components/ui/TerminalModal.tsx): Interactive retro/modern developer CLI sandbox.
  - [`StarfieldBackground.tsx`](file:///c:/laragon/www/_MyCV/portfolio/components/ui/StarfieldBackground.tsx): Canvas-based interactive galactic starfield with parallax and hyperlanes.
  - [`GalacticSgaBackground.tsx`](file:///c:/laragon/www/_MyCV/portfolio/components/ui/GalacticSgaBackground.tsx): Canvas-based Standard Galactic Alphabet (SGA) animated rune matrix with transliteration tooltips.
  - [`Footer.tsx`](file:///c:/laragon/www/_MyCV/portfolio/components/ui/Footer.tsx): Footer component with back-to-top button.
- `lib/`
  - [`site-config.ts`](file:///c:/laragon/www/_MyCV/portfolio/lib/site-config.ts): Central site metadata, social profiles, and project definitions.
  - [`utils.ts`](file:///c:/laragon/www/_MyCV/portfolio/lib/utils.ts): Tailwind merge helper (`cn`).
  - `hooks/`: Custom hooks (`useActiveSectionTarget`, `useCountUp`, `useTypewriter`).
- `_memory/`
  - [[INDEX]]: Central map of the codebase.
  - [[CHANGELOG]]: Historical record of changes.
  - [[TASKS]]: Portfolio project deep-dive roadmap & assignments checklist.
