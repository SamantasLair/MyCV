"use client";

import { useEffect, useRef } from "react";
import { Card } from "./Card";
import { BentoGrid } from "./BentoGrid";
import { MapPin, GraduationCap, Briefcase, Globe, Cpu, Award } from "lucide-react";
import { TechStack } from "./TechStack";

// Radar Chart Component using Canvas
const SkillsRadarChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 28;

    const skills = [
      { name: "Frontend", value: 92 },
      { name: "Backend", value: 85 },
      { name: "Mobile", value: 78 },
      { name: "DevOps", value: 70 },
      { name: "Data Science", value: 75 },
      { name: "UI/UX", value: 80 },
    ];

    const numAxes = skills.length;
    const angleStep = (Math.PI * 2) / numAxes;

    let progress = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background grid circles/polygons (3 levels)
      for (let level = 1; level <= 3; level++) {
        const levelRadius = (radius / 3) * level;
        ctx.beginPath();
        for (let i = 0; i < numAxes; i++) {
          const angle = i * angleStep - Math.PI / 2;
          const x = centerX + Math.cos(angle) * levelRadius;
          const y = centerY + Math.sin(angle) * levelRadius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw axis lines and labels
      for (let i = 0; i < numAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const axisX = centerX + Math.cos(angle) * radius;
        const axisY = centerY + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(axisX, axisY);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.stroke();

        // Labels
        const labelRadius = radius + 16;
        const labelX = centerX + Math.cos(angle) * labelRadius;
        const labelY = centerY + Math.sin(angle) * labelRadius;

        ctx.font = "10px system-ui";
        ctx.fillStyle = "rgba(148, 163, 184, 0.9)";
        ctx.textAlign = Math.abs(Math.cos(angle)) < 0.1 ? "center" : Math.cos(angle) > 0 ? "left" : "right";
        ctx.textBaseline = "middle";
        ctx.fillText(skills[i].name, labelX, labelY);
      }

      // Draw data polygon
      ctx.beginPath();
      for (let i = 0; i < numAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const currentVal = (skills[i].value / 100) * radius * progress;
        const x = centerX + Math.cos(angle) * currentVal;
        const y = centerY + Math.sin(angle) * currentVal;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Polygon fill & stroke
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      grad.addColorStop(0, "rgba(59, 130, 246, 0.4)");
      grad.addColorStop(1, "rgba(147, 51, 234, 0.15)");
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Data points
      for (let i = 0; i < numAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const currentVal = (skills[i].value / 100) * radius * progress;
        const x = centerX + Math.cos(angle) * currentVal;
        const y = centerY + Math.sin(angle) * currentVal;

        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (progress < 1) {
        progress += 0.03;
        animId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-48 block" />;
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          About &amp; Skill Matrix
        </h2>
        <p className="text-sm md:text-base text-slate-400">
          A breakdown of my software engineering background, technical proficiency, and passions.
        </p>
      </div>

      <BentoGrid>
        {/* Bio Card */}
        <Card colSpan={2} title="Engineering Mindset">
          <p className="text-slate-300 leading-relaxed text-sm">
            I am a full-stack engineer dedicated to creating resilient software architectures and fluid user interfaces.
            My approach blends mathematical rigor with aesthetic polish — whether optimizing C++ low-level algorithms or crafting modern Next.js micro-frontends.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2.5">
              <Cpu size={18} className="text-blue-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">Clean Architecture &amp; OOP</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2.5">
              <Globe size={18} className="text-purple-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">Scalable Web &amp; APIs</span>
            </div>
          </div>
        </Card>

        {/* Skills Radar Chart */}
        <Card title="Skill Radar">
          <SkillsRadarChart />
        </Card>

        {/* Location & Remote Availability */}
        <Card title="Location & Remote">
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-2.5 text-slate-300">
              <MapPin size={16} className="text-rose-400 shrink-0" />
              <span>Base: <strong>Indonesia (WIB / UTC+7)</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Globe size={16} className="text-blue-400 shrink-0" />
              <span>Open to <strong>Remote &amp; Worldwide</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Award size={16} className="text-emerald-400 shrink-0" />
              <span>CS Graduate &amp; Lifelong Learner</span>
            </div>
          </div>
        </Card>

        {/* Timeline Summary */}
        <Card colSpan={2} title="Journey & Milestones">
          <div className="space-y-4 text-xs">
            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <GraduationCap size={14} />
              </div>
              <div>
                <span className="font-semibold text-slate-200 block text-sm">Bachelor in Computer Science</span>
                <span className="text-slate-400">Deepened algorithms, data structures, software patterns, and AI foundations.</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                <Briefcase size={14} />
              </div>
              <div>
                <span className="font-semibold text-slate-200 block text-sm">Full-Stack &amp; Mobile Software Development</span>
                <span className="text-slate-400">Architected web apps, cross-platform Android/iOS applications, and open-source packages.</span>
              </div>
            </div>
          </div>
        </Card>
      </BentoGrid>

      {/* Tech Stack Component */}
      <div className="mt-12">
        <TechStack />
      </div>
    </section>
  );
};
