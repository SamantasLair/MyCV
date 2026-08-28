"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, Sparkles, Code2, Terminal } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useTypewriter } from "@/lib/hooks/useTypewriter";
import { useCountUp } from "@/lib/hooks/useCountUp";

interface GitHubUser {
  name: string;
  login: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
  hireable: boolean | null;
}

const FALLBACK_USER: GitHubUser = {
  name: siteConfig.authorName,
  login: siteConfig.githubUsername,
  avatar_url: "https://avatars.githubusercontent.com/u/94610303?v=4",
  bio: "Passionate Software Engineer & Full-Stack Architect building modern web applications, scalable APIs, and high-performance systems.",
  public_repos: 38,
  followers: 12,
  html_url: `https://github.com/${siteConfig.githubUsername}`,
  hireable: true,
};

const ROLES = [
  "Full-Stack Web Engineer",
  "React & Next.js Architect",
  "Systems & C++ Developer",
  "AI & NLP Pipeline Builder",
];

interface HeroSectionProps {
  onOpenTerminal?: () => void;
}

export const HeroSection = ({ onOpenTerminal }: HeroSectionProps) => {
  const [user, setUser] = useState<GitHubUser>(FALLBACK_USER);
  const typewriterText = useTypewriter(ROLES, 60, 30, 2200);

  const animatedRepos = useCountUp(user.public_repos);
  const animatedFollowers = useCountUp(user.followers);

  useEffect(() => {
    fetch(`https://api.github.com/users/${siteConfig.githubUsername}`)
      .then((res) => (res.ok ? res.json() : FALLBACK_USER))
      .then((data) => setUser((prev) => ({ ...prev, ...data })))
      .catch(() => setUser(FALLBACK_USER));
  }, []);

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center py-20 lg:py-28">
      {/* Glow Orbs behind Avatar */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 w-full flex flex-col md:flex-row items-center gap-12 lg:gap-16 relative z-10">
        
        {/* Left Column: Avatar & Interactive Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative shrink-0 flex flex-col items-center"
        >
          {/* Rotating Gradient Aura */}
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
            
            {/* Spinning Gradient Border */}
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-cyan-400">
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden relative bg-slate-950 border-4 border-slate-950">
                <Image
                  src={user.avatar_url}
                  alt={user.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>

            {/* Orbiting Tech Badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-0 right-2 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/50">
                <Code2 size={14} />
              </div>
              {onOpenTerminal ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenTerminal();
                  }}
                  className="absolute bottom-2 left-0 w-7 h-7 bg-purple-600 hover:bg-purple-500 pointer-events-auto rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/50 transition-transform hover:scale-110"
                  aria-label="Open Terminal"
                  title="Launch Developer CLI"
                >
                  <Terminal size={14} />
                </button>
              ) : (
                <div className="absolute bottom-2 left-0 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/50">
                  <Terminal size={14} />
                </div>
              )}
            </motion.div>
          </div>

          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Available for New Projects</span>
          </motion.div>
        </motion.div>

        {/* Right Column: Identity, Typewriter & Actions */}
        <div className="flex-1 text-center md:text-left space-y-6">
          
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              <Sparkles size={13} className="animate-spin-slow" />
              <span>Welcome to my digital space</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">{user.name}</span>
            </h1>
          </motion.div>

          {/* Dynamic Typewriter Role */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-8 flex items-center justify-center md:justify-start"
          >
            <span className="text-xl md:text-2xl font-mono text-slate-300 font-medium">
              I am a <span className="text-blue-400 font-semibold underline decoration-blue-500/40 decoration-2 underline-offset-4">{typewriterText}</span>
              <span className="animate-pulse text-purple-400">|</span>
            </span>
          </motion.div>

          {/* Bio text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl"
          >
            {user.bio}
          </motion.p>

          {/* Live GitHub Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-3 max-w-md pt-2"
          >
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 text-center md:text-left">
              <span className="text-xs text-slate-400 block font-mono">Public Repos</span>
              <span className="text-xl font-bold text-white font-mono">{animatedRepos}</span>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 text-center md:text-left">
              <span className="text-xs text-slate-400 block font-mono">Followers</span>
              <span className="text-xl font-bold text-white font-mono">{animatedFollowers}</span>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 text-center md:text-left">
              <span className="text-xs text-slate-400 block font-mono">Location</span>
              <span className="text-sm font-bold text-emerald-400 font-sans block truncate">🇮🇩 Indonesia</span>
            </div>
          </motion.div>

          {/* Action CTAs & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 pt-4"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5"
            >
              Explore My Work
            </a>

            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="px-5 py-3 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 font-mono font-semibold rounded-xl text-sm transition-all hover:-translate-y-0.5 flex items-center gap-2 shadow-lg shadow-cyan-500/10"
              >
                <Terminal size={15} />
                <span>Dev CLI</span>
              </button>
            )}

            <a
              href={`mailto:${siteConfig.email}`}
              className="px-5 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-200 font-semibold rounded-xl text-sm transition-all hover:-translate-y-0.5"
            >
              Contact Me
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 text-xs font-mono"
      >
        <span>Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-blue-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};
