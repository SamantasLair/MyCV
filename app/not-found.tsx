"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Home, ArrowRight, CornerDownLeft, ShieldAlert, Orbit, Compass } from "lucide-react";
import { animate } from "animejs";
import { StarfieldBackground } from "@/components/ui/StarfieldBackground";

// Edge-star definition along the perimeter of the Great Void Bubble
const EDGE_STARS = [
  { id: 1, angle: 0, size: 4, color: "#60a5fa", speed: 14000, name: "Alpha-Void" },
  { id: 2, angle: 45, size: 3, color: "#a855f7", speed: 18000, name: "Epsilon-Rim" },
  { id: 3, angle: 90, size: 5, color: "#38bdf8", speed: 12000, name: "Vega-Boundary" },
  { id: 4, angle: 135, size: 3.5, color: "#34d399", speed: 20000, name: "Nova-Edge" },
  { id: 5, angle: 180, size: 4.5, color: "#f472b6", speed: 15000, name: "Sirius-Horizon" },
  { id: 6, angle: 225, size: 3, color: "#818cf8", speed: 17000, name: "Pulsar-Void" },
  { id: 7, angle: 270, size: 5, color: "#22d3ee", speed: 13000, name: "Polaris-Edge" },
  { id: 8, angle: 315, size: 3.5, color: "#fbbf24", speed: 19000, name: "Deneb-Rim" },
];

export default function NotFound() {
  const accretionRingRef = useRef<SVGCircleElement>(null);
  const gravitationalPulseRef = useRef<SVGCircleElement>(null);
  const starsGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Kinetic rotation of the Great Void Bubble's accretion boundary
    if (accretionRingRef.current) {
      animate(accretionRingRef.current, {
        rotate: 360,
        duration: 24000,
        loop: true,
        ease: "linear",
      });
    }

    // Gravitational lensing wave expansion from the bubble edge
    if (gravitationalPulseRef.current) {
      animate(gravitationalPulseRef.current, {
        scale: [0.95, 1.15, 0.95],
        opacity: [0.3, 0.7, 0.3],
        duration: 3200,
        loop: true,
        ease: "inOutSine",
      });
    }

    // Orbiting perimeter edge-stars around the great void
    if (starsGroupRef.current) {
      animate(starsGroupRef.current, {
        rotate: 360,
        duration: 30000,
        loop: true,
        ease: "linear",
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#010206] text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-purple-500/30 selection:text-purple-200 overflow-hidden">
      {/* Background Starfield Canvas */}
      <StarfieldBackground />

      {/* Atmospheric Void Horizon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-900/20 rounded-full blur-[110px] pointer-events-none" />

      <main className="relative z-10 max-w-xl w-full text-center space-y-8 p-6 md:p-10 rounded-3xl bg-slate-950/85 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-purple-500/10">
        
        {/* The Great Void Bubble Visualizer */}
        <div className="relative w-52 h-52 mx-auto flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            <defs>
              {/* Void Bubble Radial Darkness & Horizon Gradients */}
              <radialGradient id="voidGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="70%" stopColor="#02040a" />
                <stop offset="90%" stopColor="#0b0f19" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </radialGradient>

              {/* Accretion Ring Glow */}
              <linearGradient id="accretionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Gravitational Wave Pulse */}
            <circle
              ref={gravitationalPulseRef}
              cx="100"
              cy="100"
              r="76"
              fill="none"
              stroke="rgba(168, 85, 247, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              style={{ transformOrigin: "center" }}
            />

            {/* The Great Void Sphere Body */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="url(#voidGradient)"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />

            {/* Accretion Horizon Ring */}
            <circle
              ref={accretionRingRef}
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="url(#accretionGrad)"
              strokeWidth="2.5"
              strokeDasharray="25 15 40 20"
              filter="url(#glow)"
              style={{ transformOrigin: "center" }}
            />

            {/* Orbiting Stars along the Edge of the Bubble */}
            <g ref={starsGroupRef} style={{ transformOrigin: "center" }}>
              {EDGE_STARS.map((star) => {
                const rad = (star.angle * Math.PI) / 180;
                const r = 70; // Positioned right along the circumference edge
                const cx = 100 + Math.cos(rad) * r;
                const cy = 100 + Math.sin(rad) * r;

                return (
                  <g key={star.id}>
                    {/* Star Glow */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={star.size * 1.8}
                      fill={star.color}
                      opacity="0.3"
                      filter="url(#glow)"
                    />
                    {/* Star Core */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={star.size}
                      fill={star.color}
                      stroke="#ffffff"
                      strokeWidth="0.8"
                    />
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Core Telemetry Icon inside the Void */}
          <div className="relative z-10 w-16 h-16 rounded-full bg-black/80 border border-purple-500/30 flex flex-col items-center justify-center text-purple-300 shadow-inner">
            <Orbit size={24} className="animate-spin-slow text-cyan-400" />
            <span className="text-[9px] font-mono font-bold text-purple-300 mt-0.5">VOID-404</span>
          </div>
        </div>

        {/* Status Badge & Headline */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
            <ShieldAlert size={13} className="text-purple-400" />
            <span>Gravitational Anomaly: The Great Void Bubble</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Trapped in the Void
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            You have entered an uncharted cosmic void bubble. All standard trajectories have collapsed at the event horizon.
            <span className="block text-xs font-mono text-cyan-400/90 mt-2 font-medium">
              &quot;Every single star is unique yet none of them doesn&apos;t shine.&quot;
            </span>
          </p>
        </div>

        {/* Warp Actions */}
        <div className="space-y-3 pt-2">
          <Link
            href="/"
            className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl text-sm shadow-xl shadow-purple-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Home size={16} />
            <span>Escape Void &bull; Warp to Galactic Hub</span>
            <ArrowRight size={15} />
          </Link>

          {/* Quick Teleport Coordinates */}
          <div className="pt-4 border-t border-white/5">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-3">
              Orbital Waypoint Jump Gates
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <Link
                href="/#about"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-cyan-400 text-slate-300 transition-colors border border-white/5 text-center"
              >
                #about
              </Link>
              <Link
                href="/#projects"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-cyan-400 text-slate-300 transition-colors border border-white/5 text-center"
              >
                #projects
              </Link>
              <Link
                href="/#contact"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-cyan-400 text-slate-300 transition-colors border border-white/5 text-center"
              >
                #contact
              </Link>
              <Link
                href="/resume"
                className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 transition-colors border border-blue-500/20 text-center flex items-center justify-center gap-1"
              >
                <Sparkles size={11} />
                <span>/resume</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Telemetry Coordinate Readout */}
        <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between pt-2 border-t border-white/5">
          <span>EVENT HORIZON: [RADIUS=70AU]</span>
          <span className="flex items-center gap-1 text-cyan-400">
            <CornerDownLeft size={10} /> ORBITAL JUMP READY
          </span>
        </div>

      </main>
    </div>
  );
}
