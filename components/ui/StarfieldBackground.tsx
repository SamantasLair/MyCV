"use client";

import { useEffect, useRef } from "react";
import type { SectionTarget } from "@/lib/hooks/useActiveSectionTarget";

// ─── Props ────────────────────────────────────────────────────────────────────

interface StarfieldProps {
  guideTargetRef?: React.RefObject<SectionTarget | null> | React.MutableRefObject<SectionTarget | null>;
}

// ─── Galactic Types ──────────────────────────────────────────────────────────

type StarType = "capital" | "binary" | "pulsar" | "giant" | "standard" | "uncharted" | "solitary";

interface StarSystem {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  sectorIndex: number; // -1 for solitary/void, 0..4 for main sectors, 10..13 for cosmic bubbles
  type: StarType;
  radius: number;
  baseAlpha: number;
  deltaAlpha: number;
  phase: number;
  twinkleSpeed: number;
  r: number;
  g: number;
  b: number;
  layer: 1 | 2 | 3;
  hasHyperlane: boolean;
}

interface Hyperlane {
  from: StarSystem;
  to: StarSystem;
  sectorIndex: number;
  isGateway: boolean;
  length: number;
  pulseProgress: number;
  pulseSpeed: number;
}

interface SectorCluster {
  id: string;
  name: string;
  normX: number;
  normY: number;
  r: number;
  g: number;
  b: number;
  radius: number;
}

interface CosmicBubble {
  id: string;
  normX: number;
  normY: number;
  radius: number;
  r: number;
  g: number;
  b: number;
}

// ─── 5 Major Galactic Sectors ─────────────────────────────────────────────────

const SECTOR_DEFS: SectorCluster[] = [
  { id: "hero", name: "Capital Core", normX: 0.22, normY: 0.20, r: 56, g: 189, b: 248, radius: 175 },     // Cyan
  { id: "about", name: "Archive Nebula", normX: 0.78, normY: 0.25, r: 168, g: 85, b: 247, radius: 165 },  // Violet
  { id: "github", name: "Telemetry Grid", normX: 0.18, normY: 0.58, r: 52, g: 211, b: 153, radius: 170 }, // Emerald
  { id: "projects", name: "Foundry Forge", normX: 0.82, normY: 0.68, r: 251, g: 191, b: 36, radius: 180 },// Solar Amber
  { id: "contact", name: "Deep Relay", normX: 0.50, normY: 0.88, r: 251, g: 113, b: 133, radius: 160 },   // Rose
];

// ─── 4 Cosmic Bubble Pockets (Isolated Nebula Clusters) ───────────────────────

const COSMIC_BUBBLES: CosmicBubble[] = [
  { id: "bubble-1", normX: 0.52, normY: 0.14, radius: 95, r: 99, g: 102, b: 241 },   // Indigo Pocket (Top Center)
  { id: "bubble-2", normX: 0.88, normY: 0.44, radius: 85, r: 14, g: 165, b: 233 },   // Sky Pocket (Far Right)
  { id: "bubble-3", normX: 0.12, normY: 0.82, radius: 90, r: 139, g: 92, b: 246 },   // Purple Pocket (Bottom Left)
  { id: "bubble-4", normX: 0.48, normY: 0.52, radius: 110, r: 20, g: 184, b: 166 }, // Teal Void Pocket (Galactic Mid-Core)
];

// ─── Seeded Pseudo-Random Number Generator ────────────────────────────────────

function createPrng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ─── Helper Colors ────────────────────────────────────────────────────────────

function getStarColor(type: StarType, secColor: { r: number; g: number; b: number }): { r: number; g: number; b: number } {
  switch (type) {
    case "capital":
      return { r: 224, g: 242, b: 254 }; // Brilliant Cyan-White
    case "pulsar":
      return { r: 216, g: 180, b: 254 }; // Pulsing Violet-White
    case "giant":
      return { r: 254, g: 240, b: 138 }; // Warm Solar Amber
    case "binary":
      return { r: 199, g: 210, b: 254 }; // Cool Blue Binary
    case "uncharted":
      return { r: 186, g: 230, b: 253 }; // Ice Cyan Uncharted
    case "solitary":
      return { r: 241, g: 245, b: 249 }; // Cold Pure White Rogue Star
    case "standard":
    default:
      return {
        r: Math.round(220 * 0.7 + secColor.r * 0.3),
        g: Math.round(230 * 0.7 + secColor.g * 0.3),
        b: Math.round(255 * 0.7 + secColor.b * 0.3),
      };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const StarfieldBackground = ({ guideTargetRef }: StarfieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let starSystems: StarSystem[] = [];
    let hyperlanes: Hyperlane[] = [];
    let backgroundNebulaStars: { x: number; y: number; r: number; alpha: number; twinkleSpeed: number; phase: number }[] = [];

    let animId: number;
    let mouseX = 0;
    let mouseY = 0;
    let W = 0, H = 0;
    let t = 0;

    const buildGalacticMap = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;

      const prng = createPrng(2026);
      starSystems = [];
      hyperlanes = [];
      backgroundNebulaStars = [];

      let currentStarId = 0;

      // ── 1. Main Sector Clusters (22-26 stars per sector) ────────────────────
      const sectorCapitals: StarSystem[] = [];

      SECTOR_DEFS.forEach((sector, secIdx) => {
        const cx = sector.normX * W;
        const cy = sector.normY * H;
        const totalStarsInSector = 24;

        // Anchor / Capital System
        const capitalType: StarType = secIdx === 0 ? "capital" : secIdx === 1 ? "pulsar" : secIdx === 3 ? "giant" : secIdx === 4 ? "binary" : "capital";
        const capColor = getStarColor(capitalType, sector);
        const capitalSystem: StarSystem = {
          id: currentStarId++,
          x: cx,
          y: cy,
          baseX: cx,
          baseY: cy,
          sectorIndex: secIdx,
          type: capitalType,
          radius: capitalType === "giant" ? 3.2 : 2.5,
          baseAlpha: 0.95,
          deltaAlpha: 0.25,
          phase: prng() * Math.PI * 2,
          twinkleSpeed: 0.8 + prng() * 0.8,
          r: capColor.r,
          g: capColor.g,
          b: capColor.b,
          layer: 3,
          hasHyperlane: true,
        };
        starSystems.push(capitalSystem);
        sectorCapitals.push(capitalSystem);

        // Clustered Stars
        for (let i = 1; i < totalStarsInSector; i++) {
          const u1 = Math.max(0.0001, prng());
          const u2 = prng();
          const rad = Math.sqrt(-2.0 * Math.log(u1)) * (sector.radius * 0.45);
          const theta = 2.0 * Math.PI * u2;

          const sx = cx + rad * Math.cos(theta);
          const sy = cy + rad * Math.sin(theta);

          // ~25% of stars are "Uncharted" (no hyperlanes)
          const isUncharted = prng() > 0.72;
          const isPoi = !isUncharted && prng() > 0.75;
          const type: StarType = isUncharted ? "uncharted" : isPoi ? (prng() > 0.5 ? "binary" : "giant") : "standard";
          const color = getStarColor(type, sector);

          const star: StarSystem = {
            id: currentStarId++,
            x: sx,
            y: sy,
            baseX: sx,
            baseY: sy,
            sectorIndex: secIdx,
            type,
            radius: type === "standard" ? 0.7 + prng() * 0.8 : type === "uncharted" ? 1.2 + prng() * 0.6 : 1.7 + prng() * 0.6,
            baseAlpha: 0.35 + prng() * 0.55,
            deltaAlpha: 0.15 + prng() * 0.35,
            phase: prng() * Math.PI * 2,
            twinkleSpeed: 0.5 + prng() * 1.5,
            r: color.r,
            g: color.g,
            b: color.b,
            layer: (prng() < 0.5 ? 2 : 3) as 2 | 3,
            hasHyperlane: !isUncharted,
          };
          starSystems.push(star);
        }
      });

      // ── 2. Cosmic Bubble Pockets (6-9 stars per bubble) ─────────────────────
      COSMIC_BUBBLES.forEach((bubble, bIdx) => {
        const bx = bubble.normX * W;
        const by = bubble.normY * H;
        const starsInBubble = 7;

        for (let i = 0; i < starsInBubble; i++) {
          const u1 = Math.max(0.0001, prng());
          const u2 = prng();
          const rad = Math.sqrt(-2.0 * Math.log(u1)) * (bubble.radius * 0.38);
          const theta = 2.0 * Math.PI * u2;

          const sx = bx + rad * Math.cos(theta);
          const sy = by + rad * Math.sin(theta);

          const isPoi = i === 0 || prng() > 0.7;
          const type: StarType = isPoi ? "pulsar" : "standard";
          const color = getStarColor(type, bubble);

          const star: StarSystem = {
            id: currentStarId++,
            x: sx,
            y: sy,
            baseX: sx,
            baseY: sy,
            sectorIndex: 10 + bIdx,
            type,
            radius: isPoi ? 2.0 : 0.8 + prng() * 0.7,
            baseAlpha: 0.4 + prng() * 0.5,
            deltaAlpha: 0.2 + prng() * 0.3,
            phase: prng() * Math.PI * 2,
            twinkleSpeed: 0.6 + prng() * 1.4,
            r: color.r,
            g: color.g,
            b: color.b,
            layer: 2,
            hasHyperlane: prng() > 0.4, // Some have local bubble lanes, some are free
          };
          starSystems.push(star);
        }
      });

      // ── 3. Solitary / Deep Void Isolated Rogue Stars (Benar-benar sendiri) ───
      const solitaryCount = 38;
      for (let i = 0; i < solitaryCount; i++) {
        const sx = prng() * W;
        const sy = prng() * H;

        // Verify it is away from major clusters (in the void)
        const nearMajor = SECTOR_DEFS.some(sec => Math.hypot(sx - sec.normX * W, sy - sec.normY * H) < sec.radius * 0.9);
        if (nearMajor && prng() > 0.3) continue;

        const hasTinyCompanion = prng() > 0.65;
        const star: StarSystem = {
          id: currentStarId++,
          x: sx,
          y: sy,
          baseX: sx,
          baseY: sy,
          sectorIndex: -1,
          type: "solitary",
          radius: 1.1 + prng() * 0.9,
          baseAlpha: 0.45 + prng() * 0.5,
          deltaAlpha: 0.25 + prng() * 0.4,
          phase: prng() * Math.PI * 2,
          twinkleSpeed: 0.4 + prng() * 1.6,
          r: 240 + Math.round(prng() * 15),
          g: 245 + Math.round(prng() * 10),
          b: 255,
          layer: 2,
          hasHyperlane: false, // Absolutely no hyperlane
        };
        starSystems.push(star);

        // Optional tiny companion micro-star nearby (dwarf companion)
        if (hasTinyCompanion) {
          const compAngle = prng() * Math.PI * 2;
          const compDist = 12 + prng() * 18;
          starSystems.push({
            id: currentStarId++,
            x: sx + Math.cos(compAngle) * compDist,
            y: sy + Math.sin(compAngle) * compDist,
            baseX: sx + Math.cos(compAngle) * compDist,
            baseY: sy + Math.sin(compAngle) * compDist,
            sectorIndex: -1,
            type: "solitary",
            radius: 0.5 + prng() * 0.4,
            baseAlpha: 0.3 + prng() * 0.3,
            deltaAlpha: 0.15 + prng() * 0.2,
            phase: prng() * Math.PI * 2,
            twinkleSpeed: 1.0 + prng() * 1.0,
            r: 186,
            g: 200,
            b: 240,
            layer: 1,
            hasHyperlane: false,
          });
        }
      }

      // ── 4. Build Intra-Sector Hyperlanes (Only for stars with hasHyperlane) ──
      SECTOR_DEFS.forEach((_, secIdx) => {
        const sectorStars = starSystems.filter((s) => s.sectorIndex === secIdx && s.hasHyperlane);
        const maxDist = 115;

        for (let i = 0; i < sectorStars.length; i++) {
          const s1 = sectorStars[i];
          const neighbors = sectorStars
            .filter((s2) => s2.id !== s1.id)
            .map((s2) => ({ star: s2, dist: Math.hypot(s1.baseX - s2.baseX, s1.baseY - s2.baseY) }))
            .filter((n) => n.dist < maxDist)
            .sort((a, b) => a.dist - b.dist)
            .slice(0, 2);

          neighbors.forEach(({ star: s2, dist }) => {
            const exists = hyperlanes.some(
              (h) => (h.from.id === s1.id && h.to.id === s2.id) || (h.from.id === s2.id && h.to.id === s1.id)
            );
            if (!exists) {
              hyperlanes.push({
                from: s1,
                to: s2,
                sectorIndex: secIdx,
                isGateway: false,
                length: dist,
                pulseProgress: prng(),
                pulseSpeed: 0.0035 + prng() * 0.004,
              });
            }
          });
        }
      });

      // ── 5. Build Inter-Sector Gateway Hyperlanes (The Galactic Backbone) ────
      const gatewayRoute = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
      ];

      gatewayRoute.forEach(([fromIdx, toIdx]) => {
        const fromCap = sectorCapitals[fromIdx];
        const toCap = sectorCapitals[toIdx];
        if (fromCap && toCap) {
          const dist = Math.hypot(fromCap.baseX - toCap.baseX, fromCap.baseY - toCap.baseY);
          hyperlanes.push({
            from: fromCap,
            to: toCap,
            sectorIndex: -1,
            isGateway: true,
            length: dist,
            pulseProgress: prng(),
            pulseSpeed: 0.002 + prng() * 0.0025,
          });
        }
      });

      // ── 6. Dense Deep Void Cosmic Dust Micro-Stars ───────────────────────────
      const voidFieldCount = Math.round((W * H) / 5500);
      for (let i = 0; i < voidFieldCount; i++) {
        backgroundNebulaStars.push({
          x: prng() * W,
          y: prng() * H,
          r: 0.3 + prng() * 0.6,
          alpha: 0.15 + prng() * 0.35,
          twinkleSpeed: 0.5 + prng() * 1.5,
          phase: prng() * Math.PI * 2,
        });
      }
    };

    // ─── Render Pass: Tactical Polar Grid & Deep Core ─────────────────────────

    const drawTacticalGrid = () => {
      const cx = W * 0.5;
      const cy = H * 0.45;

      ctx.save();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.025)";
      ctx.lineWidth = 1;

      // Concentric Galactic Orbital Range Rings
      const maxRadius = Math.max(W, H) * 0.75;
      for (let r = 180; r < maxRadius; r += 170) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Faint Tactical Crosshair Core
      ctx.beginPath();
      ctx.moveTo(cx, cy - 30);
      ctx.lineTo(cx, cy + 30);
      ctx.moveTo(cx - 30, cy);
      ctx.lineTo(cx + 30, cy);
      ctx.stroke();

      ctx.restore();
    };

    // ─── Render Pass: Cosmic Bubbles & Sector Territory Nebulae ───────────────

    const drawCosmicBubblesAndTerritories = (activeSectorIdx: number) => {
      // 1. Render 4 Cosmic Bubble Pockets (Translucent bubble membranes)
      COSMIC_BUBBLES.forEach((bubble) => {
        const bx = bubble.normX * W;
        const by = bubble.normY * H;

        // Bubble gas core glow
        const grd = ctx.createRadialGradient(bx, by, 0, bx, by, bubble.radius);
        grd.addColorStop(0, `rgba(${bubble.r}, ${bubble.g}, ${bubble.b}, 0.05)`);
        grd.addColorStop(0.7, `rgba(${bubble.r}, ${bubble.g}, ${bubble.b}, 0.025)`);
        grd.addColorStop(1, `rgba(${bubble.r}, ${bubble.g}, ${bubble.b}, 0)`);

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(bx, by, bubble.radius, 0, Math.PI * 2);
        ctx.fill();

        // Faint cosmic bubble membrane ring
        ctx.strokeStyle = `rgba(${bubble.r}, ${bubble.g}, ${bubble.b}, 0.08)`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.arc(bx, by, bubble.radius * 0.95, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 2. Render 5 Main Sector Territorial Clouds
      SECTOR_DEFS.forEach((sector, idx) => {
        const cx = sector.normX * W;
        const cy = sector.normY * H;
        const isActive = idx === activeSectorIdx;
        const rad = sector.radius * (isActive ? 1.25 : 1.0);
        const alpha = isActive ? 0.08 : 0.035;

        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        grd.addColorStop(0, `rgba(${sector.r}, ${sector.g}, ${sector.b}, ${alpha})`);
        grd.addColorStop(0.6, `rgba(${sector.r}, ${sector.g}, ${sector.b}, ${alpha * 0.35})`);
        grd.addColorStop(1, `rgba(${sector.r}, ${sector.g}, ${sector.b}, 0)`);

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // ─── Render Pass: Hyperlanes & Pulse Transit ──────────────────────────────

    const drawHyperlanes = (activeSectorIdx: number) => {
      ctx.save();

      hyperlanes.forEach((hl) => {
        const isSectorActive = hl.sectorIndex === activeSectorIdx && activeSectorIdx !== -1;
        const isGateway = hl.isGateway;

        let strokeStyle = "rgba(148, 163, 184, 0.07)";
        let lineWidth = 0.8;

        if (isSectorActive) {
          const sec = SECTOR_DEFS[hl.sectorIndex];
          strokeStyle = `rgba(${sec.r}, ${sec.g}, ${sec.b}, 0.35)`;
          lineWidth = 1.2;
        } else if (isGateway) {
          strokeStyle = "rgba(186, 230, 253, 0.12)";
          lineWidth = 0.9;
        }

        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.setLineDash(isGateway ? [4, 8] : []);
        ctx.beginPath();
        ctx.moveTo(hl.from.x, hl.from.y);
        ctx.lineTo(hl.to.x, hl.to.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Energy Pulse Transit Packets
        if (isSectorActive || isGateway) {
          hl.pulseProgress = (hl.pulseProgress + hl.pulseSpeed) % 1.0;
          const px = hl.from.x + (hl.to.x - hl.from.x) * hl.pulseProgress;
          const py = hl.from.y + (hl.to.y - hl.from.y) * hl.pulseProgress;

          const pRadius = isSectorActive ? 1.6 : 1.1;
          ctx.fillStyle = isSectorActive ? "rgba(255, 255, 255, 0.95)" : "rgba(186, 230, 253, 0.65)";
          ctx.beginPath();
          ctx.arc(px, py, pRadius, 0, Math.PI * 2);
          ctx.fill();

          if (isSectorActive) {
            const pulseGlow = ctx.createRadialGradient(px, py, 0, px, py, 5);
            pulseGlow.addColorStop(0, "rgba(255, 255, 255, 0.35)");
            pulseGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
            ctx.fillStyle = pulseGlow;
            ctx.beginPath();
            ctx.arc(px, py, 5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      ctx.restore();
    };

    // ─── Render Pass: Star Systems & POIs ─────────────────────────────────────

    const drawStarSystems = (activeSectorIdx: number) => {
      const parallaxScale = 0.012;
      const cx = W / 2;
      const cy = H / 2;

      starSystems.forEach((s) => {
        const pFactor = (s.layer / 3) * parallaxScale;
        s.x = s.baseX + (mouseX - cx) * pFactor;
        s.y = s.baseY + (mouseY - cy) * pFactor;

        const isSectorActive = s.sectorIndex === activeSectorIdx && activeSectorIdx !== -1;
        const alphaMultiplier = isSectorActive ? 1.25 : 1.0;

        const alpha = Math.min(
          1.0,
          Math.max(0.1, (s.baseAlpha + s.deltaAlpha * Math.sin(s.phase + t * s.twinkleSpeed * 0.02)) * alphaMultiplier)
        );

        // 1. Binary Star System (Two orbiting companion dots)
        if (s.type === "binary") {
          const orbitAngle = t * 0.025 + s.phase;
          const orbitR = 4.5;
          const c1x = s.x + Math.cos(orbitAngle) * orbitR;
          const c1y = s.y + Math.sin(orbitAngle) * orbitR;
          const c2x = s.x - Math.cos(orbitAngle) * orbitR;
          const c2y = s.y - Math.sin(orbitAngle) * orbitR;

          ctx.fillStyle = `rgba(${s.r}, ${s.g}, ${s.b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(c1x, c1y, 1.2, 0, Math.PI * 2);
          ctx.arc(c2x, c2y, 1.0, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(${s.r}, ${s.g}, ${s.b}, ${alpha * 0.25})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.arc(s.x, s.y, orbitR, 0, Math.PI * 2);
          ctx.stroke();
          return;
        }

        // 2. Pulsar (Radar-like pulse wave)
        if (s.type === "pulsar") {
          const pulseWave = (t * 0.02 + s.phase) % 1.0;
          const waveRadius = 4 + pulseWave * 16;
          const waveAlpha = (1.0 - pulseWave) * 0.4 * alphaMultiplier;

          ctx.strokeStyle = `rgba(${s.r}, ${s.g}, ${s.b}, ${waveAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(s.x, s.y, waveRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 3. Capital & Giant Star Corona Glow
        if (s.type === "capital" || s.type === "giant") {
          const glowR = s.radius * 3.5;
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
          glow.addColorStop(0, `rgba(${s.r}, ${s.g}, ${s.b}, ${alpha * 0.5})`);
          glow.addColorStop(1, `rgba(${s.r}, ${s.g}, ${s.b}, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2);
          ctx.fill();

          if (s.type === "capital") {
            ctx.strokeStyle = `rgba(${s.r}, ${s.g}, ${s.b}, ${alpha * 0.35})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.arc(s.x, s.y, 7, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // 4. Uncharted Star Marker (Faint solitary halo to signify route-less star)
        if (s.type === "uncharted") {
          ctx.strokeStyle = `rgba(${s.r}, ${s.g}, ${s.b}, ${alpha * 0.25})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius + 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 5. Solitary Void Star (Clean cold pure dot with subtle atmospheric pulse)
        if (s.type === "solitary") {
          const voidGlow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 2.8);
          voidGlow.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.45})`);
          voidGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = voidGlow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star Core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r}, ${s.g}, ${s.b}, ${alpha})`;
        ctx.fill();
      });
    };

    // ─── Render Pass: Deep Void Micro Stars ───────────────────────────────────

    const drawVoidField = () => {
      backgroundNebulaStars.forEach((star) => {
        const alpha = Math.max(
          0.05,
          star.alpha + 0.15 * Math.sin(star.phase + t * star.twinkleSpeed * 0.015)
        );
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 245, ${alpha})`;
        ctx.fill();
      });
    };

    // ─── Main Animation Loop ──────────────────────────────────────────────────

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      t++;

      const target = guideTargetRef?.current;
      let activeSectorIdx = -1;
      if (target) {
        activeSectorIdx = SECTOR_DEFS.findIndex((s) => s.id === target.id);
      }

      drawTacticalGrid();
      drawVoidField();
      drawCosmicBubblesAndTerritories(activeSectorIdx);
      drawHyperlanes(activeSectorIdx);
      drawStarSystems(activeSectorIdx);

      animId = requestAnimationFrame(animate);
    };

    // ─── Event Handlers ───────────────────────────────────────────────────────

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onResize = () => {
      buildGalacticMap();
    };

    buildGalacticMap();
    mouseX = W / 2;
    mouseY = H / 2;

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, [guideTargetRef]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden="true">
      {/* Deep Cold Obsidian Space Void Base */}
      <div className="absolute inset-0 bg-[#010206]" />
      {/* Cold Deep Interstellar Abyss Radial Ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_45%,rgba(10,22,48,0.12),transparent)]" />
      {/* Bottom Readability Fade to True Cold Black */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#010206] to-transparent" />
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
};
