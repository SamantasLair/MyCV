"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Laptop, Smartphone, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface HexagonCardProps {
  children?: ReactNode;
  className?: string;
  title: string;
  description?: string;
  href?: string;
  platform: "mobile" | "desktop" | "both";
  delay?: number;
}

export const HexagonCard = ({
  children,
  className,
  title,
  description,
  href = "#",
  platform,
  delay = 0,
}: HexagonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      data-particle-collider
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay }}
      className={cn(
        "relative w-full aspect-square flex items-center justify-center p-1 hover:z-10 transition-all",
        className
      )}
    >
      {/* Hexagon Shape Container */}
      <div
        className="w-full h-full bg-zinc-900 shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden group"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        {/* Background / Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 z-0 transition-transform group-hover:scale-110 duration-500">
             {children}
        </div>
        
        {/* Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-black/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Platform Indicator (Top Left) */}
        <div className="absolute top-[12%] left-[10%] md:top-[12%] md:left-[10%] z-20 flex items-center gap-1 text-xs font-bold text-slate-300 bg-black/50 px-2 py-1 rounded-br-lg rounded-tl-lg shadow-sm backdrop-blur-sm">
          {platform === "mobile" && <Smartphone size={14} />}
          {platform === "desktop" && <Laptop size={14} />}
          {platform === "both" && (
            <>
              <Smartphone size={14} />
              <span className="mx-0.5 opacity-50">/</span>
              <Laptop size={14} />
            </>
          )}
        </div>

        {/* Content Content (Centered) */}
        <div className="relative z-20 px-6 pointer-events-none">
             <h3 className="font-bold text-xl md:text-2xl text-white drop-shadow-md mb-1">{title}</h3>
             <p className="text-xs md:text-sm text-slate-300 font-medium drop-shadow-md line-clamp-2">{description}</p>
        </div>

         {/* Link Action */}
         <Link
            href={href}
            className="absolute bottom-[15%] opacity-0 group-hover:opacity-100 transition-all z-30 bg-zinc-800 text-white p-2 rounded-full shadow-lg hover:bg-zinc-700"
         >
            <ArrowUpRight size={20} />
         </Link>

      </div>
    </motion.div>
  );
};
