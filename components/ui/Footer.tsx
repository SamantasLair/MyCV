"use client";

import { ArrowUp, Heart } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 py-10 mt-16 bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left info */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-xs text-slate-400 flex items-center justify-center md:justify-start gap-1.5 font-mono">
            <span>Crafted with</span>
            <Heart size={12} className="text-red-500 fill-red-500" />
            <span>using Next.js 16 &amp; Tailwind CSS 4</span>
          </p>
          <p className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} {siteConfig.authorName}. All rights reserved.
          </p>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-2 text-xs font-mono group"
          aria-label="Back to Top"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
};
