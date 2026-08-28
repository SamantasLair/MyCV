"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  FolderGit2,
  Code2,
  Mail,
  Github,
  Linkedin,
  Terminal,
  Download,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Command,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

interface CommandItem {
  id: string;
  category: "Navigation" | "Projects" | "Actions" | "Socials";
  label: string;
  sublabel?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

export const CommandPalette = ({
  isOpen,
  onClose,
  onOpenTerminal,
}: CommandPaletteProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  const scrollTo = (id: string) => {
    handleClose();
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      handleClose();
    }, 1200);
  };

  const openResume = () => {
    handleClose();
    router.push("/resume");
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-about",
      category: "Navigation",
      label: "About & Technical Skills",
      sublabel: "Overview of background, skill matrix, and stack",
      icon: User,
      action: () => scrollTo("about"),
      shortcut: "G A",
    },
    {
      id: "nav-github",
      category: "Navigation",
      label: "GitHub Live Telemetry",
      sublabel: "Activity graph, language breakdown, contribution data",
      icon: FolderGit2,
      action: () => scrollTo("github"),
      shortcut: "G H",
    },
    {
      id: "nav-projects",
      category: "Navigation",
      label: "Featured Projects Portfolio",
      sublabel: "Web engines, AI models, and case studies",
      icon: Code2,
      action: () => scrollTo("projects"),
      shortcut: "G P",
    },
    {
      id: "nav-contact",
      category: "Navigation",
      label: "Contact & Collaboration",
      sublabel: "Direct messaging channels and inquiries",
      icon: Mail,
      action: () => scrollTo("contact"),
      shortcut: "G C",
    },
    {
      id: "nav-resume",
      category: "Navigation",
      label: "Interactive Resume & CV",
      sublabel: "Career history, skills matrix, and printable document",
      icon: Download,
      action: openResume,
      shortcut: "G R",
    },

    // Actions
    {
      id: "action-terminal",
      category: "Actions",
      label: "Launch Interactive Developer CLI",
      sublabel: "Open terminal sandbox with executable commands",
      icon: Terminal,
      action: () => {
        handleClose();
        onOpenTerminal();
      },
      shortcut: "CLI",
    },
    {
      id: "action-copy-email",
      category: "Actions",
      label: copied ? "Email Copied to Clipboard!" : "Copy Email Address",
      sublabel: siteConfig.email,
      icon: copied ? Check : Copy,
      action: copyEmail,
      shortcut: "CP",
    },
    {
      id: "action-download-cv",
      category: "Actions",
      label: "View & Print Full Resume / CV",
      sublabel: "Interactive verified CV with PDF print export",
      icon: Download,
      action: openResume,
      shortcut: "CV",
    },

    // Projects
    {
      id: "proj-examprep",
      category: "Projects",
      label: "Live Demo: ExamPrep Engine",
      sublabel: "Automated assessment web platform",
      icon: ExternalLink,
      action: () => {
        handleClose();
        window.open("https://exam-prep-eosin.vercel.app", "_blank");
      },
    },
    {
      id: "proj-stki-nlp",
      category: "Projects",
      label: "Live Demo: STKI-NLP Sandbox",
      sublabel: "Automated text classifier & tokenizer",
      icon: ExternalLink,
      action: () => {
        handleClose();
        router.push("/projects/stki-nlp");
      },
    },
    {
      id: "proj-dermagaboom",
      category: "Projects",
      label: "Live Demo: DermagaBoom Portal",
      sublabel: "Coastal & maritime tourism platform",
      icon: ExternalLink,
      action: () => {
        handleClose();
        window.open("https://dermaga-boom.vercel.app", "_blank");
      },
    },
    {
      id: "proj-umbullimus",
      category: "Projects",
      label: "Live Demo: UmbulLimus Web",
      sublabel: "Tourism destination showcase",
      icon: ExternalLink,
      action: () => {
        handleClose();
        window.open("https://umbullimus.vercel.app", "_blank");
      },
    },

    // Socials
    {
      id: "soc-github",
      category: "Socials",
      label: "Visit GitHub Profile",
      sublabel: `@${siteConfig.githubUsername}`,
      icon: Github,
      action: () => {
        handleClose();
        window.open(`https://github.com/${siteConfig.githubUsername}`, "_blank");
      },
    },
    {
      id: "soc-linkedin",
      category: "Socials",
      label: "Connect on LinkedIn",
      sublabel: siteConfig.authorName,
      icon: Linkedin,
      action: () => {
        handleClose();
        window.open(siteConfig.linkedinUrl, "_blank");
      },
    },
  ];

  const filtered = commands.filter((c) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      c.label.toLowerCase().includes(q) ||
      (c.sublabel && c.sublabel.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) handleClose();
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-xl bg-slate-950/95 border border-white/15 rounded-2xl shadow-2xl shadow-blue-500/10 overflow-hidden text-slate-100 z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search sections, projects, socials..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10 shrink-0">
                <Command size={10} />
                <span>K</span>
              </div>
            </div>

            {/* Command List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500 font-mono">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                        isSelected
                          ? "bg-blue-600/20 text-white border border-blue-500/30"
                          : "text-slate-300 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-white/5 text-slate-400"
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold block truncate">
                            {item.label}
                          </span>
                          {item.sublabel && (
                            <span className="text-[11px] text-slate-500 block truncate">
                              {item.sublabel}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        {item.shortcut && (
                          <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                            {item.shortcut}
                          </span>
                        )}
                        {isSelected && (
                          <ArrowRight size={14} className="text-blue-400" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-t border-white/5 text-[10px] text-slate-500 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-blue-400 font-semibold">{siteConfig.authorName}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
