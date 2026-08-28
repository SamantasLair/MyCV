# 📝 Changelog

Konteks: Bagian dari [[INDEX]]

## [Unreleased] - 2026-08-26

### Added
- **UX Audit & Semantic NLP Usability Refinements (`app/projects/stki-nlp/page.tsx`)**:
  - **Readability**: Softened ambient background alpha on DNA helices and formulas, eliminating visual noise and cognitive overload.
  - **Semantic Clarity**: Replaced stylized labels with standardized academic/industry NLP operations (`1. Tokenization`, `2. Stopword Filtering`, `3. Morphological Stemming`, `4. TF-IDF Vectorization`).
  - **Typography**: Expanded vertical line-height (`leading-loose text-base md:text-lg`) on the raw input stream panel.
  - **Information Architecture**: Implemented direct non-linear tab click-to-jump navigation and elevated the primary action CTA button with prominent visual hierarchy.
- **3D SGA Genetic Double Helix & Information Theory Cosmos (`components/ui/GalacticSgaBackground.tsx`)**: Living information matrix featuring 3D rotating Standard Galactic Alphabet (SGA) Double Helices, genetic base pairs, floating physics & entropy formulae, and interactive laser decoding threads.

### Fixed
- **Resolved 3D Starfield Background Stacking Context**: Removed blocking background colors on parent containers and elevated the SGA background canvas to `z-0`, ensuring the vivid cosmos, double helices, and formulae shine through cleanly.
- **Internal Deep-Dive Task Tracker ([[TASKS]])**: Created internal project roadmap with `[ ]` markdown checklists and unique celestial background essence definitions for each CV project (ExamPrep, DermagaBoom, UmbulLimus).
- **The Great Void Bubble 404 (`app/not-found.tsx`)**: Redesigned into a massive dark gravitational void sphere with edge-orbiting perimeter stars, accretion rings, gravitational lensing waves, and an escape warp trigger.
- **Interactive Stellar Resume Page (`app/resume/page.tsx`)**: Built a comprehensive, high-density digital & print-ready CV with technical skill matrix, experience trajectory, academic awards, and `@media print` clean paper stylesheet.
- **Physical Resume Asset (`public/resume.pdf`)**: Created a valid PDF document to ensure direct PDF downloads never result in a blank 404.

### Fixed
- **Resolved Router Navigation Errors in `CommandPalette.tsx` & `ContactSection.tsx`**: Replaced direct `window.location.href` assignments with Next.js App Router `useRouter` (`router.push`) to adhere to React/Next.js clean component standards.
- **Resolved All Blank Links**: Resolved missing `/resume.pdf` 404 triggers across `ContactSection.tsx`, `Navbar.tsx`, and `CommandPalette.tsx`.
- **Linked STKI-NLP Live Demo**: Connected `stki-nlp` project card to `/projects/stki-nlp`.
- **Enhanced StarfieldBackground Flexibility**: Made `guideTargetRef` optional with safe null-checking so any subpage can render the dynamic cosmic starfield.

### Fixed
- **Resolved Dependency Warning in `CommandPalette.tsx`**: Wrapped `handleClose` in `useCallback` and included it in the `useEffect` dependency array.
- **Resolved Cascading Render Warning in `CommandPalette.tsx`**: Eliminated synchronous `setState` within `useEffect` by moving state resets to direct event callbacks (`onChange`, `handleClose`).
- **Resolved Effect Initialization Warning in `TerminalModal.tsx`**: Initialized welcome banner state statically (`INITIAL_WELCOME`) to prevent unnecessary effect execution.
- **Fixed Unused Import in `ContactSection.tsx`**: Cleaned up unused `AnimatePresence` import.

### Removed
- Removed dead/orphaned components: `GitHubProfile.tsx`, `MagneticParticles.tsx`, `HexagonCard.tsx`.

### Changed
- Refactored `site-config.ts` into a centralized data source.
- Connected `Navbar.tsx` and `HeroSection.tsx` with Command Palette and Terminal modal actions.
