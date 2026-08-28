"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Download, Send, Check, Copy, Sparkles, MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useTypewriter } from "@/lib/hooks/useTypewriter";

const CONTACT_PROMPTS = [
  "Build Something Amazing",
  "Launch Your Next Web Project",
  "Scale System Performance",
  "Collaborate on Open Source",
];

export const ContactSection = () => {
  const router = useRouter();
  const dynamicHeadline = useTypewriter(CONTACT_PROMPTS, 60, 30, 2500);

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus("submitting");

    // Construct mailto link with encoded parameters
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Hello Samuel,\n\n${formState.message}\n\nBest regards,\n${formState.name}\n${formState.email}`
    );

    setTimeout(() => {
      window.location.assign(`mailto:${siteConfig.email}?subject=${subject}&body=${body}`);
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 600);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDownloadCV = () => {
    router.push("/resume");
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div
          data-particle-collider
          className="rounded-3xl bg-gradient-to-b from-blue-900/20 via-indigo-950/40 to-slate-950 border border-blue-500/20 p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Availability Status */}
          <div className="text-center">
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
              Have a project idea, job opportunity, or technical question? Send a direct message or download my resume below.
            </p>
          </div>

          {/* Contact Form & CV Options */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-8">
            
            {/* Left Column: Interactive Contact Form */}
            <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative">
              <div className="flex items-center gap-2 mb-4 text-white font-semibold text-sm">
                <MessageSquare size={16} className="text-cyan-400" />
                <span>Send Direct Inquiry</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-[11px] font-mono text-slate-400 mb-1">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex Johnson"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-[11px] font-mono text-slate-400 mb-1">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[11px] font-mono text-slate-400 mb-1">
                    Message / Project Details
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your vision, timeline, or engineering inquiry..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
                >
                  {status === "submitting" ? (
                    <span>Preparing Message...</span>
                  ) : status === "success" ? (
                    <>
                      <Check size={15} className="text-emerald-300" />
                      <span>Email Client Triggered!</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Dispatch Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: CV Actions & Direct Email Copy */}
            <div className="lg:col-span-5 space-y-4">
              {/* Resume Card */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Sparkles size={16} className="text-amber-400" />
                  <span>Curriculum Vitae</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Download the latest comprehensive CV detailing engineering history, academic awards, and core skills.
                </p>
                <button
                  onClick={handleDownloadCV}
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5"
                >
                  <Download size={15} />
                  <span>Download Resume (PDF)</span>
                </button>
              </div>

              {/* Quick Copy Email Card */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 block">Direct Inquiries</span>
                <div className="flex items-center justify-between gap-2 p-2.5 bg-black/40 border border-white/5 rounded-xl">
                  <span className="text-xs font-mono text-slate-300 truncate">{siteConfig.email}</span>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors shrink-0"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Direct Social Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-2xl mx-auto">
            <a
              href={`https://github.com/${siteConfig.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/15 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-slate-300 group-hover:text-white group-hover:bg-blue-500/20 transition-colors">
                  <Github size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">GitHub</span>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                    @{siteConfig.githubUsername}
                  </span>
                </div>
              </div>
            </a>

            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/15 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-slate-300 group-hover:text-white group-hover:bg-blue-500/20 transition-colors">
                  <Linkedin size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">LinkedIn</span>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                    Connect Profile
                  </span>
                </div>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/15 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-slate-300 group-hover:text-white group-hover:bg-blue-500/20 transition-colors">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Email</span>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors truncate block">
                    Direct Mail
                  </span>
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
