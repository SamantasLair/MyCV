"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Printer,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  Download,
  GraduationCap,
  Briefcase,
  Code2,
  Cpu,
  Layers,
  Award,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/lib/site-config";
import { StarfieldBackground } from "@/components/ui/StarfieldBackground";

interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: "work" | "education";
  highlights: string[];
  technologies: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    period: "2023 — Present",
    role: "Full-Stack Software Engineer & Web Architect",
    organization: "Independent Engineering & Open Source",
    location: "Indonesia (Remote / Hybrid)",
    type: "work",
    highlights: [
      "Architected ExamPrep, a high-performance computerized assessment engine utilizing Next.js 16 and TypeScript with optimistic client state updates and sub-120ms interaction latency.",
      "Engineered DermagaBoom and UmbulLimus maritime & tourism digital portals with reactive Vue/Next architectures, achieving 98+ Lighthouse scores.",
      "Designed STKI-NLP, an automated Indonesian corpus preprocessing and tokenization classification engine with high precision vectorization pipelines.",
      "Built modern Developer CLI sandboxes, interactive radar telemetry visualizers, and zero-CLS glassmorphic web platforms.",
    ],
    technologies: ["TypeScript", "Next.js", "React", "Vue.js", "Python", "Tailwind CSS", "Vercel"],
  },
  {
    period: "2020 — 2024",
    role: "Bachelor of Computer Science (S.Kom)",
    organization: "Universitas",
    location: "Indonesia",
    type: "education",
    highlights: [
      "Specialized in Algorithms & Data Structures, Object-Oriented Design Patterns, Systems Programming, and Natural Language Processing.",
      "Conducted research on automated text classification, morphological stemming, and information retrieval evaluation metrics.",
      "Maintained academic excellence across software engineering, compiler design, and database systems coursework.",
    ],
    technologies: ["C++", "Java", "Python", "SQL", "Scikit-Learn", "Algorithms", "Data Structures"],
  },
];

const SKILL_GROUPS = [
  {
    title: "Programming Languages",
    skills: [
      { name: "TypeScript", level: "Expert", years: "3+ yrs" },
      { name: "JavaScript (ES6+)", level: "Expert", years: "4+ yrs" },
      { name: "Python", level: "Advanced", years: "3+ yrs" },
      { name: "C++", level: "Advanced", years: "3+ yrs" },
      { name: "Java", level: "Intermediate", years: "2+ yrs" },
      { name: "PHP", level: "Advanced", years: "3+ yrs" },
      { name: "Dart / Kotlin", level: "Intermediate", years: "2+ yrs" },
      { name: "SQL (PostgreSQL, MySQL, SQLite)", level: "Advanced", years: "3+ yrs" },
    ],
  },
  {
    title: "Frameworks & Architecture",
    skills: [
      { name: "Next.js 16 (App Router)", level: "Expert", years: "3+ yrs" },
      { name: "React 19", level: "Expert", years: "4+ yrs" },
      { name: "Vue.js", level: "Advanced", years: "2+ yrs" },
      { name: "Tailwind CSS v4", level: "Expert", years: "3+ yrs" },
      { name: "Laravel", level: "Advanced", years: "2+ yrs" },
      { name: "Framer Motion & Anime.js", level: "Advanced", years: "2+ yrs" },
      { name: "Scikit-Learn & NLP", level: "Intermediate", years: "2+ yrs" },
      { name: "RESTful & GraphQL APIs", level: "Advanced", years: "3+ yrs" },
    ],
  },
  {
    title: "Cloud, Systems & Tooling",
    skills: [
      { name: "Git & GitHub CI/CD", level: "Expert" },
      { name: "Vercel & Cloudflare Edge", level: "Expert" },
      { name: "Docker Containerization", level: "Intermediate" },
      { name: "Google Cloud Platform", level: "Intermediate" },
      { name: "Performance Optimization & SEO", level: "Expert" },
      { name: "Linux / Unix Shell Scripting", level: "Advanced" },
    ],
  },
];

const CERTIFICATIONS_AND_AWARDS = [
  {
    title: "Full-Stack Web Development & Modern Architecture",
    issuer: "Industry Credential",
    year: "2024",
  },
  {
    title: "Natural Language Processing & Machine Learning Pipelines",
    issuer: "Academic & Project Research",
    year: "2024",
  },
  {
    title: "Algorithms & Low-Level Data Optimization",
    issuer: "Computer Science Specialization",
    year: "2023",
  },
];

export default function ResumePage() {
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const handlePrint = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // safe fallback
    }
    setTimeout(() => {
      window.print();
    }, 250);
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
      {/* Background Starfield (Screen only) */}
      <div className="print:hidden">
        <StarfieldBackground />
      </div>

      {/* Screen Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 print:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            <ArrowLeft size={14} />
            <span>Galactic Hub</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
            >
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg text-xs font-semibold border border-white/10 transition-colors"
            >
              <Mail size={14} />
              <span>Hire Me</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Resume Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative z-10 print:p-0 print:max-w-none">
        
        {/* Printable/Digital CV Card */}
        <article className="rounded-3xl bg-slate-950/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 md:p-12 shadow-2xl space-y-10 print:bg-white print:text-black print:border-none print:shadow-none print:p-0 print:rounded-none">
          
          {/* Header Identity Section */}
          <section className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-white/10 pb-8 print:border-black/20">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-mono print:hidden">
                <Sparkles size={11} />
                <span>Verified Curriculum Vitae</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight print:text-black">
                {siteConfig.authorName}
              </h1>
              <p className="text-base font-medium text-cyan-400 font-mono print:text-slate-700">
                Software Engineer &amp; Full-Stack Architect
              </p>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed print:text-slate-600">
                {siteConfig.description}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-1.5 text-xs font-mono text-slate-300 print:text-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-rose-400 print:text-black" />
                <span>{siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-cyan-400 print:text-black" />
                <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github size={13} className="text-purple-400 print:text-black" />
                <a
                  href={`https://github.com/${siteConfig.githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  github.com/{siteConfig.githubUsername}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin size={13} className="text-blue-400 print:text-black" />
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  linkedin.com/in/samuel-ananta
                </a>
              </div>
            </div>
          </section>

          {/* Section: Technical Experience & Milestones */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 print:border-black/20">
              <Briefcase size={18} className="text-blue-400 print:text-black" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider print:text-black font-mono">
                Engineering Experience &amp; Highlights
              </h2>
            </div>

            <div className="space-y-8">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-base font-bold text-white print:text-black">
                        {exp.role}
                      </h3>
                      <span className="text-xs font-semibold text-blue-400 print:text-slate-700">
                        {exp.organization} &bull; {exp.location}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 px-2.5 py-1 bg-white/5 rounded-md border border-white/10 print:border-black/20 print:text-slate-700 w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-300 print:text-slate-800 leading-relaxed">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-slate-400 border border-white/5 print:border-black/20 print:text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Skills & Competency Matrix */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 print:border-black/20">
              <Cpu size={18} className="text-purple-400 print:text-black" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider print:text-black font-mono">
                Technical Skill Matrix
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILL_GROUPS.map((group, gIdx) => (
                <div
                  key={gIdx}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 print:border-black/20 print:p-2"
                >
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono print:text-slate-900">
                    {group.title}
                  </h3>
                  <div className="space-y-2">
                    {group.skills.map((s, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between text-xs">
                        <span className="text-slate-200 print:text-slate-800 font-medium">{s.name}</span>
                        <span className="text-[10px] font-mono text-slate-400 print:text-slate-600">
                          {s.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Key Projects Showcase */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 print:border-black/20">
              <Code2 size={18} className="text-emerald-400 print:text-black" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider print:text-black font-mono">
                Featured Architectures &amp; Repositories
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 print:border-black/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white print:text-black">ExamPrep — Online Assessment</h3>
                  <span className="text-[10px] font-mono text-blue-400">Next.js 16</span>
                </div>
                <p className="text-xs text-slate-400 print:text-slate-700">
                  Cheat-resilient online assessment platform with optimistic state sync and sub-120ms transitions.
                </p>
                <div className="flex items-center gap-3 text-[11px] font-mono text-cyan-400 pt-1 print:text-black">
                  <a href="https://exam-prep-eosin.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                    <span>Live Demo</span> <ExternalLink size={10} />
                  </a>
                  <a href="https://github.com/SamantasLair/ExamPrep" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                    <span>GitHub</span> <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 print:border-black/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white print:text-black">STKI-NLP — Text Classification</h3>
                  <span className="text-[10px] font-mono text-emerald-400">Python &amp; ML</span>
                </div>
                <p className="text-xs text-slate-400 print:text-slate-700">
                  Information retrieval and automated Indonesian text labeling engine with TF-IDF tokenization.
                </p>
                <div className="flex items-center gap-3 text-[11px] font-mono text-cyan-400 pt-1 print:text-black">
                  <Link href="/projects/stki-nlp" className="hover:underline flex items-center gap-1">
                    <span>Interactive Sandbox</span> <ExternalLink size={10} />
                  </Link>
                  <a href="https://github.com/SamantasLair/STKI-PelabelanOtomatis" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                    <span>GitHub</span> <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Academic & Certifications */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 print:border-black/20">
              <Award size={18} className="text-amber-400 print:text-black" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider print:text-black font-mono">
                Academic Specializations &amp; Awards
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CERTIFICATIONS_AND_AWARDS.map((c, idx) => (
                <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs space-y-1 print:border-black/20">
                  <span className="font-semibold text-slate-200 block print:text-black">{c.title}</span>
                  <span className="text-slate-400 text-[11px] block print:text-slate-600">{c.issuer} &bull; {c.year}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Statement */}
          <footer className="pt-6 border-t border-white/10 text-center text-xs font-mono text-slate-500 print:text-slate-600 print:border-black/20">
            <span>&copy; {new Date().getFullYear()} {siteConfig.authorName} &bull; Verified Portfolio CV &bull; samuel-ananta.vercel.app</span>
          </footer>

        </article>
      </main>
    </div>
  );
}
