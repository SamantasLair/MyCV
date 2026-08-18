"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Code2, FolderGit2, Mail, Github } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const NAV_ITEMS = [
  { label: "About", href: "#about", icon: User },
  { label: "Activity", href: "#github", icon: FolderGit2 },
  { label: "Projects", href: "#projects", icon: Code2 },
  { label: "Contact", href: "#contact", icon: Mail },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section intersection observer fallback via scroll position
      const sections = ["hero", "about", "github", "projects", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#010206]/85 backdrop-blur-2xl border-b border-cyan-950/30 shadow-[0_4px_30px_rgba(0,0,0,0.85)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="#hero"
          onClick={(e) => scrollToSection(e, "#hero")}
          className="group flex items-center gap-2.5 font-bold text-white tracking-wide hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#02040a] rounded-[11px] flex items-center justify-center">
              <span className="text-xs font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                SA
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
              {siteConfig.authorName}
            </span>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Developer
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-1.5 rounded-full shadow-inner">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-400/40 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={14} className={`relative z-10 ${isActive ? "text-cyan-400" : ""}`} />
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href={`https://github.com/${siteConfig.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold text-xs transition-all duration-300 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            <Github size={14} />
            <span>GitHub Profile</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-white/10 bg-slate-950/95 backdrop-blur-2xl px-4 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-blue-600/20 border border-blue-500/30 text-white"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-blue-400" : ""} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
              <div className="pt-4 border-t border-white/10 mt-2">
                <a
                  href={`https://github.com/${siteConfig.githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/20"
                >
                  <Github size={16} />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
