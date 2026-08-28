"use client";

import { useEffect, useRef } from "react";

// ─── Standard Galactic Alphabet Dictionary with Exact Meanings ────────────────
export interface SgaRuneDef {
  latin: string;
  sga: string;
  meaning: string;
  category: "genetic" | "quantum" | "informational" | "cosmic";
}

export const SGA_DICTIONARY: SgaRuneDef[] = [
  { latin: "A", sga: "ᔑ", meaning: "Astral Origin / Adenine Nucleotide", category: "genetic" },
  { latin: "B", sga: "ʖ", meaning: "Binary Pulse / Bit State", category: "informational" },
  { latin: "C", sga: "ᓵ", meaning: "Cosmic Core / Cytosine Base", category: "genetic" },
  { latin: "D", sga: "↸", meaning: "Dimensional Shift / DNA Lattice", category: "genetic" },
  { latin: "E", sga: "ᒷ", meaning: "Energy Horizon / Shannon Entropy", category: "quantum" },
  { latin: "F", sga: "⎓", meaning: "Fusion Node / Frequency Tensor", category: "quantum" },
  { latin: "G", sga: "⊣", meaning: "Graviton Well / Guanine Matrix", category: "genetic" },
  { latin: "H", sga: "⍑", meaning: "Hyperlane / Hamiltonian Operator", category: "quantum" },
  { latin: "I", sga: "╎", meaning: "Ion Stream / Information Quantum", category: "informational" },
  { latin: "J", sga: "⋮", meaning: "Junction Array / Joint Probability", category: "informational" },
  { latin: "K", sga: "ꖌ", meaning: "Kinetic Core / Kolmogorov Complexity", category: "informational" },
  { latin: "L", sga: "ꖎ", meaning: "Luminosity / Landauer Bound", category: "quantum" },
  { latin: "M", sga: "ᒲ", meaning: "Matrix Lattice / Mass-Energy Invariant", category: "quantum" },
  { latin: "N", sga: "ᓗ", meaning: "Nebula Vector / Normalization Factor", category: "informational" },
  { latin: "O", sga: "𝙹", meaning: "Orbit / Observable State", category: "quantum" },
  { latin: "P", sga: "!¡", meaning: "Particle Flux / Probability Density", category: "quantum" },
  { latin: "Q", sga: "ᑑ", meaning: "Quantum Field / Qubit Superposition", category: "quantum" },
  { latin: "R", sga: "ꋪ", meaning: "Radial Wave / RNA Transcription", category: "genetic" },
  { latin: "S", sga: "ᓭ", meaning: "Stellar Drift / Semantic Vector", category: "informational" },
  { latin: "T", sga: "ℸ", meaning: "Temporal Tensor / Thymine Base", category: "genetic" },
  { latin: "U", sga: "⚍", meaning: "Universal Nexus / Uracil Codon", category: "genetic" },
  { latin: "V", sga: "⍊", meaning: "Void Singularity / Vector Space", category: "informational" },
  { latin: "W", sga: "∴", meaning: "Warp Filament / Wavefunction", category: "quantum" },
  { latin: "X", sga: "̇/", meaning: "Xenon Beam / Cross-Entropy", category: "informational" },
  { latin: "Y", sga: "||", meaning: "Yield Horizon / Young Modulus", category: "quantum" },
  { latin: "Z", sga: "⨅", meaning: "Zenith Point / Zero-Point Energy", category: "quantum" },
];

// ─── Mathematical & Information Formulae Floating in Deep Ambient Space ───────
const FLOATING_FORMULAE = [
  "H(X) = -Σ P(x) log₂ P(x)",
  "I(X;Y) = D_KL(P(X,Y) || P(X)P(Y))",
  "dE = T·dS - P·dV",
  "E = mc² = ħω",
  "S_BH = (k·c³·A) / (4·G·ħ)",
  "sim(u, v) = (u · v) / (||u|| ||v||)",
  "TF-IDF(t, d) = TF(t,d) · log(N / DF(t))",
  "DNA::[A ≡ T] ⇌ [G ≡ C]",
];

interface InfoBit {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  alpha: number;
  size: number;
  phase: number;
}

interface FloatingFormula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  alpha: number;
  size: number;
  phase: number;
}

export const GalacticSgaBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let mouseX = W / 2;
    let mouseY = H / 2;
    let targetMouseX = W / 2;
    let targetMouseY = H / 2;
    let isMouseActive = false;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    // ─── Initialize Ambient Floating Information Bits & Formulae ─────────────
    const infoBits: InfoBit[] = [];
    for (let i = 0; i < 40; i++) {
      const isRune = Math.random() < 0.5;
      const rune = SGA_DICTIONARY[Math.floor(Math.random() * SGA_DICTIONARY.length)];
      infoBits.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.3 - 0.1,
        text: isRune ? rune.sga : Math.random() < 0.5 ? "1" : "0",
        alpha: Math.random() * 0.12 + 0.05, // Subtle ambient alpha
        size: isRune ? Math.random() * 4 + 11 : Math.random() * 3 + 8,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const formulae: FloatingFormula[] = [];
    for (let i = 0; i < FLOATING_FORMULAE.length; i++) {
      formulae.push({
        x: W * 0.08 + Math.random() * (W * 0.84),
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.2 - 0.05,
        text: FLOATING_FORMULAE[i],
        alpha: Math.random() * 0.1 + 0.05, // Subtle ambient alpha to prevent cognitive noise
        size: Math.random() * 2 + 10,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let t = 0;

    // ─── Main Render Loop ─────────────────────────────────────────────────────
    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, W, H);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      const normMouseX = (mouseX / W - 0.5) * 2;
      const normMouseY = (mouseY / H - 0.5) * 2;

      // 1. Soft Deep Space Nebula Gradients
      const g1 = ctx.createRadialGradient(W * 0.2, H * 0.4, 0, W * 0.2, H * 0.4, W * 0.65);
      g1.addColorStop(0, "rgba(16, 185, 129, 0.09)");
      g1.addColorStop(0.5, "rgba(13, 148, 136, 0.04)");
      g1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W * 0.8, H * 0.6, 0, W * 0.8, H * 0.6, W * 0.6);
      g2.addColorStop(0, "rgba(6, 182, 212, 0.08)");
      g2.addColorStop(0.5, "rgba(5, 150, 105, 0.03)");
      g2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // 2. Soft Ambient 3D SGA Genetic Double Helices in Left & Right Margins
      const helixConfigs = [
        { centerX: W * 0.12 + normMouseX * 18, radius: 55, waveLength: 0.012, speed: 0.9, r: 52, g: 211, b: 153 },
        { centerX: W * 0.88 + normMouseX * 18, radius: 55, waveLength: 0.012, speed: -0.9, r: 45, g: 212, b: 191 },
      ];

      helixConfigs.forEach((cfg) => {
        const stepY = 32;
        const totalNodes = Math.ceil(H / stepY) + 2;

        // Render Base-Pair Rungs (Hydrogen Bonds)
        for (let i = 0; i < totalNodes; i++) {
          const y = i * stepY;
          const angleA = y * cfg.waveLength + t * cfg.speed;
          const angleB = angleA + Math.PI;

          const xA = cfg.centerX + Math.cos(angleA) * cfg.radius;
          const xB = cfg.centerX + Math.cos(angleB) * cfg.radius;

          const bondAlpha = (Math.sin(y * 0.01 + t) + 1) * 0.04 + 0.03; // Gentle ambient bond

          ctx.beginPath();
          ctx.moveTo(xA, y);
          ctx.lineTo(xB, y);
          ctx.strokeStyle = `rgba(${cfg.r}, ${cfg.g}, ${cfg.b}, ${bondAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Center Recombination Dot
          const midX = (xA + xB) / 2;
          ctx.beginPath();
          ctx.arc(midX, y, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(167, 243, 208, ${bondAlpha * 1.5})`;
          ctx.fill();
        }

        // Render Strand Nodes with SGA Genetic Codons
        for (let strand = 0; strand < 2; strand++) {
          const phaseOffset = strand === 0 ? 0 : Math.PI;

          for (let i = 0; i < totalNodes; i++) {
            const y = i * stepY;
            const angle = y * cfg.waveLength + t * cfg.speed + phaseOffset;
            const x = cfg.centerX + Math.cos(angle) * cfg.radius;
            const z = Math.sin(angle) * cfg.radius;

            const depthScale = 1 + (z / cfg.radius) * 0.25;
            const depthAlpha = 0.12 + ((z + cfg.radius) / (cfg.radius * 2)) * 0.18; // Soft readable ambient opacity

            const runeIdx = (i * 2 + strand) % SGA_DICTIONARY.length;
            const rune = SGA_DICTIONARY[runeIdx];

            const dx = mouseX - x;
            const dy = mouseY - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const isHovered = isMouseActive && dist < 60;

            ctx.save();
            ctx.font = `${Math.round(12 * depthScale * (isHovered ? 1.3 : 1))}px monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            if (isHovered) {
              ctx.shadowColor = "#34d399";
              ctx.shadowBlur = 14;
              ctx.fillStyle = "#ffffff";
              ctx.fillText(rune.sga, x, y);

              // Laser thread to mouse
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(mouseX, mouseY);
              ctx.strokeStyle = "rgba(52, 211, 153, 0.4)";
              ctx.lineWidth = 0.8;
              ctx.stroke();

              ctx.shadowBlur = 0;
              ctx.font = "bold 9px monospace";
              ctx.fillStyle = "#a7f3d0";
              ctx.fillText(`[${rune.latin}] ${rune.meaning}`, x, y + 16);
            } else {
              ctx.fillStyle = `rgba(${cfg.r}, ${cfg.g}, ${cfg.b}, ${depthAlpha})`;
              ctx.fillText(rune.sga, x, y);
            }

            ctx.restore();
          }
        }
      });

      // 3. Floating Ambient Information Bit Streams
      for (let i = 0; i < infoBits.length; i++) {
        const b = infoBits[i];
        b.x += b.vx;
        b.y += b.vy;
        b.phase += 0.02;

        if (b.y < -20) {
          b.y = H + 20;
          b.x = Math.random() * W;
        }
        if (b.x < -20) b.x = W + 20;
        if (b.x > W + 20) b.x = -20;

        const pulse = (Math.sin(b.phase) + 1) * 0.5;
        const alpha = b.alpha * (0.7 + pulse * 0.3);

        ctx.save();
        ctx.font = `${Math.round(b.size)}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(110, 231, 183, ${alpha})`;
        ctx.fillText(b.text, b.x, b.y);
        ctx.restore();
      }

      // 4. Floating Ambient Information Formulae
      for (let i = 0; i < formulae.length; i++) {
        const f = formulae[i];
        f.x += f.vx;
        f.y += f.vy;
        f.phase += 0.015;

        if (f.y < -30) {
          f.y = H + 30;
          f.x = W * 0.08 + Math.random() * (W * 0.84);
        }

        const pulse = (Math.sin(f.phase) + 1) * 0.5;
        const alpha = f.alpha * (0.7 + pulse * 0.3);

        ctx.save();
        ctx.font = `italic ${Math.round(f.size)}px monospace, serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.fillText(f.text, f.x, f.y);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      isMouseActive = true;
    };

    const onMouseLeave = () => {
      isMouseActive = false;
      targetMouseX = W / 2;
      targetMouseY = H / 2;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Deep Cold Obsidian Space Void Base */}
      <div className="absolute inset-0 bg-[#010609]" />
      {/* Soft Ambient Information Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />
    </div>
  );
};
