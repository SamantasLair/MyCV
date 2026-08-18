"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Laptop, Cpu, Sparkles, Star, FolderGit2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: "web" | "ai" | "mobile" | "desktop";
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  colorGradient: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "examprep",
    title: "ExamPrep — Online Assessment Engine",
    category: "web",
    description: "Modern, high-performance web-based examination platform featuring real-time question evaluation, responsive UI architecture, and cloud deployment.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/SamantasLair/ExamPrep",
    liveUrl: "https://exam-prep-eosin.vercel.app",
    featured: true,
    colorGradient: "from-blue-600/80 to-indigo-600/80",
  },
  {
    id: "dermagaboom",
    title: "DermagaBoom — Tourism Information Portal",
    category: "web",
    description: "Interactive single-page web portal for beach and port tourism destinations, featuring dynamic schedules, facility showcase, and responsive design.",
    tags: ["Vue.js", "JavaScript", "CSS3", "Vercel"],
    githubUrl: "https://github.com/SamantasLair/DermagaBoom",
    liveUrl: "https://dermaga-boom.vercel.app",
    featured: false,
    colorGradient: "from-cyan-500/80 to-teal-600/80",
  },
  {
    id: "umbullimus",
    title: "UmbulLimus — Tourism Web Destination",
    category: "web",
    description: "Comprehensive tourism destination landing page with rich multimedia presentation, location guides, and interactive visitor attraction highlights.",
    tags: ["HTML5", "JavaScript", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/SamantasLair/Umbullimus",
    liveUrl: "https://umbullimus.vercel.app",
    featured: false,
    colorGradient: "from-teal-500/80 to-cyan-600/80",
  },
  {
    id: "stki-nlp",
    title: "Automated Text Labeling & NLP Pipeline",
    category: "ai",
    description: "Information retrieval and natural language processing system for automatic corpus classification, tokenization, text normalization, and high-precision labeling.",
    tags: ["Python", "NLP", "Information Retrieval", "Machine Learning"],
    githubUrl: "https://github.com/SamantasLair/STKI-PelabelanOtomatis",
    featured: false,
    colorGradient: "from-emerald-500/80 to-green-600/80",
  },
];

const CATEGORIES = [
  { key: "all", label: "All Projects" },
  { key: "web", label: "Web Platforms" },
  { key: "ai", label: "AI & NLP Systems" },
];

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("all");

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
          A showcase of full-stack web platforms, mobile solutions, and systems programming work.
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

      {/* Featured Project Showcase (Show when 'all' or matching category) */}
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
            {/* Visual Graphic Representation */}
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

            {/* Description & Action Links */}
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

              <div className="flex items-center gap-3 pt-4">
                {featuredProject.githubUrl && (
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    <Github size={15} />
                    <span>View Repository</span>
                  </a>
                )}
                {featuredProject.liveUrl && (
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-lg shadow-blue-500/25"
                  >
                    <ExternalLink size={15} />
                    <span>Live Demo</span>
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

                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
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
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
