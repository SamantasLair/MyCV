"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Laptop, Cpu, Sparkles, Star, FolderGit2, Info } from "lucide-react";
import { ProjectDetailModal, ProjectDetail } from "./ProjectDetailModal";

const PROJECTS_DATA: ProjectDetail[] = [
  {
    id: "examprep",
    title: "ExamPrep — Online Assessment Engine",
    category: "web",
    description: "Modern, high-performance web-based examination platform featuring real-time question evaluation, responsive UI architecture, and cloud deployment.",
    longDescription: "ExamPrep is an automated examination engine engineered to deliver seamless, cheat-resilient computerized testing experiences. Built on Next.js and TypeScript, it ensures sub-second client-side question transitions, deterministic scoring pipelines, and optimized state persistence across network fluctuations.",
    architecture: [
      "Modular Component Hierarchy leveraging Next.js App Router for optimized bundle splitting.",
      "Optimistic State Updates with deterministic scoring validator to eliminate UI latency during question navigation.",
      "Strict Tailwind CSS Design Tokens ensuring high-contrast readability and accessible typography.",
    ],
    challenges: [
      {
        problem: "Network instability during live assessments leading to lost state.",
        solution: "Implemented client-side LocalStorage journal synchronization with automated retry queues on reconnection.",
      },
      {
        problem: "Rendering large question catalogs without frame drops.",
        solution: "Integrated virtualization and memoized question fragments to sustain smooth 60 FPS scrolling.",
      },
    ],
    metrics: [
      { label: "Lighthouse Performance", value: "98/100" },
      { label: "Average Response Time", value: "< 120ms" },
      { label: "Test Completeness", value: "100%" },
    ],
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/SamantasLair/ExamPrep",
    liveUrl: "https://exam-prep-eosin.vercel.app",
    featured: true,
  },
  {
    id: "dermagaboom",
    title: "DermagaBoom — Tourism Information Portal",
    category: "web",
    description: "Interactive single-page web portal for beach and port tourism destinations, featuring dynamic schedules, facility showcase, and responsive design.",
    longDescription: "DermagaBoom serves as the primary digital gateway for maritime and coastal tourism. It delivers real-time weather feeds, interactive venue maps, arrival schedules, and responsive booking inquiries for domestic and international travelers.",
    architecture: [
      "Component-Driven Vue.js Reactive State Architecture.",
      "Dynamic Route Prefetching and Asset Optimization via Vercel Edge CDN.",
      "Mobile-First Glassmorphic Interface with responsive media queries.",
    ],
    challenges: [
      {
        problem: "Heavy multimedia assets slowing down initial mobile load times.",
        solution: "Applied lazy asset loading, WebP responsive image sets, and browser cache warming.",
      },
      {
        problem: "Dynamic schedule updates requiring instant reactivity without full reload.",
        solution: "Built reactive computed filter hooks for instantaneous category filtering.",
      },
    ],
    metrics: [
      { label: "Mobile Speed Score", value: "95/100" },
      { label: "Interactive Time (TTI)", value: "0.8s" },
      { label: "Asset Compression", value: "65% Saved" },
    ],
    tags: ["Vue.js", "JavaScript", "CSS3", "Vercel"],
    githubUrl: "https://github.com/SamantasLair/DermagaBoom",
    liveUrl: "https://dermaga-boom.vercel.app",
    featured: false,
  },
  {
    id: "umbullimus",
    title: "UmbulLimus — Tourism Web Destination",
    category: "web",
    description: "Comprehensive tourism destination landing page with rich multimedia presentation, location guides, and interactive visitor attraction highlights.",
    longDescription: "A high-conversion landing page and interactive portal built to spotlight natural spring recreational attractions. Employs micro-interactions, rich typography, and seamless navigation to maximize tourist engagement.",
    architecture: [
      "Semantic HTML5 Structure with SEO-compliant Open Graph tags.",
      "Tailwind CSS Utility Architecture with customized smooth scrolling anchors.",
      "Accessible ARIA landmarks and zero cumulative layout shift (CLS).",
    ],
    challenges: [
      {
        problem: "Ensuring cross-browser compatibility across legacy mobile browsers.",
        solution: "Configured PostCSS autoprefixer and verified polyfills for flexbox/grid layouts.",
      },
    ],
    metrics: [
      { label: "SEO Score", value: "100/100" },
      { label: "Cumulative Layout Shift", value: "0.00" },
    ],
    tags: ["HTML5", "JavaScript", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/SamantasLair/Umbullimus",
    liveUrl: "https://umbullimus.vercel.app",
    featured: false,
  },
  {
    id: "stki-nlp",
    title: "Automated Text Labeling & NLP Pipeline",
    category: "ai",
    description: "Information retrieval and natural language processing system for automatic corpus classification, tokenization, text normalization, and high-precision labeling.",
    longDescription: "An end-to-end NLP data preprocessing and automated document classification engine designed to clean, tokenize, vectorize, and label unstructured text corpora for machine learning pipelines with high recall and precision.",
    architecture: [
      "Modular Python Pipeline with separated Tokenization, Stemming, and TF-IDF Vectorizer stages.",
      "Scikit-Learn Classifier Integration for probabilistic categorization.",
      "Automated Corpus Quality Assertions preventing dirty token propagation.",
    ],
    challenges: [
      {
        problem: "Ambiguous vernacular Indonesian tokens reducing classification accuracy.",
        solution: "Constructed custom stopword lexicon and morphological normalization rules prior to vectorization.",
      },
    ],
    metrics: [
      { label: "Classification F1-Score", value: "91.4%" },
      { label: "Corpus Throughput", value: "10k docs/sec" },
    ],
    tags: ["Python", "NLP", "Information Retrieval", "Machine Learning"],
    githubUrl: "https://github.com/SamantasLair/STKI-PelabelanOtomatis",
    liveUrl: "/projects/stki-nlp",
    featured: false,
  },
];

const CATEGORIES = [
  { key: "all", label: "All Projects" },
  { key: "web", label: "Web Platforms" },
  { key: "ai", label: "AI & NLP Systems" },
];

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const filteredProjects = PROJECTS_DATA.filter(
    (p) => activeTab === "all" || p.category === activeTab
  );

  const featuredProject = PROJECTS_DATA.find((p) => p.featured);

  return (
    <section id="projects" className="py-16 md:py-24 relative">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-purple-400 uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
          <FolderGit2 size={13} />
          <span>Crafted Works &amp; Repositories</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Featured Projects
        </h2>
        <p className="text-sm md:text-base text-slate-400">
          A showcase of full-stack web platforms, mobile solutions, and systems programming work. Click any project for an architectural case study.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-300 ${
                isActive
                  ? "text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-400 hover:text-slate-200 bg-white/5 hover:bg-white/10"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeProjectTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Project Showcase */}
      {featuredProject && (activeTab === "all" || activeTab === featuredProject.category) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-8xl font-black text-white pointer-events-none">
            01
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Visual Graphic */}
            <div className="lg:col-span-6 rounded-2xl h-64 md:h-72 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-white/10 overflow-hidden relative p-6 flex flex-col justify-between group-hover:scale-[1.01] transition-transform duration-500">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5">
                  <Star size={12} className="fill-amber-300" /> Featured Highlight
                </span>
                <div className="flex gap-2">
                  <Laptop size={18} className="text-slate-400" />
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-1">{featuredProject.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{featuredProject.description}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {featuredProject.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-white/10 text-slate-300 rounded text-[10px] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description & Actions */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20">
                <Sparkles size={12} />
                <span>Featured Showcase</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                {featuredProject.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {featuredProject.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {featuredProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-300 text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => setSelectedProject(featuredProject)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-blue-500/25"
                >
                  <Info size={15} />
                  <span>Case Study &amp; Architecture</span>
                </button>

                {featuredProject.liveUrl && (
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    <ExternalLink size={15} />
                    <span>Live Demo</span>
                  </a>
                )}
                {featuredProject.githubUrl && (
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    <Github size={15} />
                    <span>Repo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              data-particle-collider
              className="group relative rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    {project.category === "web" && <Laptop size={20} />}
                    {project.category === "ai" && <Cpu size={20} />}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2.5 py-1 bg-white/5 rounded-md border border-white/5">
                    {project.category === "ai" ? "AI & NLP" : project.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-white/5 text-slate-400 rounded text-[10px] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    <Info size={14} />
                    <span>Case Study</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors p-1"
                        aria-label="GitHub Repository"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-blue-400 transition-colors p-1"
                        aria-label="Live Preview"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
