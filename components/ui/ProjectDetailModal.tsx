"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Layers, Cpu, Activity } from "lucide-react";

export interface ProjectDetail {
  id: string;
  title: string;
  category: "web" | "ai" | "mobile" | "desktop";
  description: string;
  longDescription: string;
  architecture: string[];
  challenges: { problem: string; solution: string }[];
  metrics: { label: string; value: string }[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-slate-950/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-500/10 text-slate-100 z-10 custom-scrollbar"
          >
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5 mb-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-400 text-[11px] font-mono font-semibold uppercase">
                  <Sparkles size={11} />
                  <span>Case Study &amp; Architecture</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {project.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-sans">
                  {project.description}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-6">
              {/* Metrics Grid */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 bg-white/[0.03] border border-white/5 rounded-2xl">
                      <span className="text-[11px] text-slate-400 block font-mono">{m.label}</span>
                      <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-mono">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Overview & Architecture */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Layers size={16} className="text-indigo-400" />
                  <span>Architectural Overview</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.longDescription}
                </p>
                <div className="space-y-2 pt-1">
                  {project.architecture.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Challenges & Solutions */}
              {project.challenges && project.challenges.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Cpu size={16} className="text-purple-400" />
                    <span>Technical Challenges &amp; Engineering Solutions</span>
                  </div>
                  <div className="space-y-2.5">
                    {project.challenges.map((c, idx) => (
                      <div key={idx} className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                        <div className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                          <Activity size={13} />
                          <span>Challenge: {c.problem}</span>
                        </div>
                        <div className="text-xs text-slate-300 pl-4 border-l-2 border-emerald-500/40">
                          <span className="font-semibold text-emerald-400">Solution: </span>
                          {c.solution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Chips */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono font-semibold text-slate-400 block uppercase tracking-wider">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-300 rounded-lg text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-blue-500/25"
                  >
                    <ExternalLink size={14} />
                    <span>Visit Live Deployment</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-all"
                  >
                    <Github size={14} />
                    <span>Explore Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
