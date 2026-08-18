"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useTypewriter } from "@/lib/hooks/useTypewriter";

const CONTACT_PROMPTS = [
  "Build Something Amazing",
  "Launch Your Next Web Project",
  "Scale System Performance",
  "Collaborate on Open Source",
];

export const ContactSection = () => {
  const dynamicHeadline = useTypewriter(CONTACT_PROMPTS, 60, 30, 2500);

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div data-particle-collider className="rounded-3xl bg-gradient-to-b from-blue-900/20 via-indigo-950/40 to-slate-950 border border-blue-500/20 p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Availability Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Currently Open to Opportunities &amp; Freelance Work</span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Ready to <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              {dynamicHeadline}
            </span>
            <span className="animate-pulse text-purple-400">|</span>
          </h2>

          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Have a project idea, job opportunity, or technical question? Feel free to reach out directly or download my full CV below.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {/* Shimmer Download CV Button */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("CV Download initiated. (Add your custom resume link in site-config)");
              }}
              className="relative group overflow-hidden px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-2xl text-sm shadow-xl shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
              <Download size={16} />
              <span>Download Full Resume / CV</span>
            </a>

            {/* Email Contact Button */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-200 font-semibold rounded-2xl text-sm transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Mail size={16} className="text-blue-400" />
              <span>Send Me an Email</span>
            </a>
          </div>

          {/* Direct Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-2xl mx-auto">
            <a
              href={`https://github.com/${siteConfig.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/15 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-slate-300 group-hover:text-white group-hover:bg-blue-500/20 transition-colors">
                  <Github size={18} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-mono">GitHub</span>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">@{siteConfig.githubUsername}</span>
                </div>
              </div>
            </a>

            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/15 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-slate-300 group-hover:text-white group-hover:bg-blue-500/20 transition-colors">
                  <Linkedin size={18} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-mono">LinkedIn</span>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">Connect Profile</span>
                </div>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/15 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-slate-300 group-hover:text-white group-hover:bg-blue-500/20 transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Direct Mail</span>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors truncate block">Send Message</span>
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
