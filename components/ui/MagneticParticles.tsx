"use client";

import { useEffect, useRef } from "react";

/**
 * FOCUS OBJECTS LIST (Target IDs)
 * - #profile      : Header/Hero profile image
 * - #tech-stack   : Bento grid item for technologies
 * - #projects     : Hexagonal project cards section
 * - #contact      : Contact section or footer
 * - #github       : Social link
 * - #linkedin     : Social link
 *
 * COLLISION SYSTEM:
 * All elements with `data-particle-collider` are treated as solid boundaries.
 * Particle AABB rects are cached every 500ms to avoid layout thrashing.
 */

interface Point { x: number; y: number; }

interface ActiveTarget { x: number; y: number; id: string; }

interface ColliderRect { left: number; top: number; right: number; bottom: number; }

interface Particle {
  x: number;
  y: number;
  baseVx: number;
  baseVy: number;
  forceVx: number;
  forceVy: number;
  size: number;
  speed: number;
  color: string;
  seed: number;
}

export const MagneticParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targets = ["profile", "tech-stack", "projects", "contact", "github", "linkedin"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let isMobile = false;
    let colliderRects: ColliderRect[] = [];
    let lastRectUpdate = 0;
    const RECT_UPDATE_INTERVAL = 500;
    const RESTITUTION = 0.7;
    const PUSH_OUT = 2;

    // Arrow shape (high-density)
    const baseArrowShape: Point[] = [];
    for (let x = -50; x <= -10; x += 2) {
      for (let y = -3; y <= 3; y += 2) {
        baseArrowShape.push({ x, y });
      }
    }
    for (let x = -15; x <= 5; x += 1.5) {
      const progress = (x + 15) / 20;
      const maxY = 12 * (1 - progress);
      for (let y = -maxY; y <= maxY; y += 2) {
        baseArrowShape.push({ x, y });
      }
    }

    const updateColliderRects = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll("[data-particle-collider]");
      colliderRects = Array.from(elements).map((el) => {
        const r = el.getBoundingClientRect();
        return {
          left: r.left,
          top: r.top + scrollY,
          right: r.right,
          bottom: r.bottom + scrollY,
        };
      });
    };

    const resolveCollision = (p: Particle) => {
      const scrollY = window.scrollY;
      const py = p.y + scrollY;
      for (const rect of colliderRects) {
        if (p.x > rect.left && p.x < rect.right && py > rect.top && py < rect.bottom) {
          const dLeft = p.x - rect.left;
          const dRight = rect.right - p.x;
          const dTop = py - rect.top;
          const dBottom = rect.bottom - py;
          const minD = Math.min(dLeft, dRight, dTop, dBottom);
          if (minD === dLeft) {
            p.x = rect.left - PUSH_OUT;
            p.baseVx = -Math.abs(p.baseVx) * RESTITUTION;
            p.forceVx = -Math.abs(p.forceVx) * RESTITUTION;
          } else if (minD === dRight) {
            p.x = rect.right + PUSH_OUT;
            p.baseVx = Math.abs(p.baseVx) * RESTITUTION;
            p.forceVx = Math.abs(p.forceVx) * RESTITUTION;
          } else if (minD === dTop) {
            p.y = (rect.top - scrollY) - PUSH_OUT;
            p.baseVy = -Math.abs(p.baseVy) * RESTITUTION;
            p.forceVy = -Math.abs(p.forceVy) * RESTITUTION;
          } else {
            p.y = (rect.bottom - scrollY) + PUSH_OUT;
            p.baseVy = Math.abs(p.baseVy) * RESTITUTION;
            p.forceVy = Math.abs(p.forceVy) * RESTITUTION;
          }
          return;
        }
      }
    };

    const init = () => {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      isMobile = canvasWidth < 768;
      const numberOfParticles = Math.floor((canvasWidth * canvasHeight) / 5000) * 2; // Increase density
      particles = [];
      for (let i = 0; i < numberOfParticles; i++) {
        const isBright = Math.random() > 0.8;
        particles.push({
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight,
          baseVx: (Math.random() - 0.5) * 0.5, // Slightly faster ambient
          baseVy: (Math.random() - 0.5) * 0.5,
          forceVx: 0,
          forceVy: 0,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 3 + 2,
          color: isBright ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
          seed: Math.random(),
        });
      }
      updateColliderRects();
    };

    let mouseX = -1000;
    let mouseY = -1000;
    const onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };

    const getActiveTarget = (): ActiveTarget | null => {
      const focusX = isMobile ? window.innerWidth / 2 : mouseX;
      const focusY = isMobile ? window.innerHeight / 2 : mouseY;
      let bestTarget: ActiveTarget | null = null;
      let minDistance = Infinity;
      const activationDistance = isMobile ? 300 : 350;
      targets.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const dist = Math.hypot(focusX - cx, focusY - cy);
            if (dist < minDistance && dist < activationDistance) {
              minDistance = dist;
              bestTarget = { x: cx, y: cy, id };
            }
          }
        }
      });
      return bestTarget;
    };

    let lastScrollY = 0;
    let scrollSpeed = 0;
    const onScroll = () => {
      scrollSpeed = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", init);
    window.addEventListener("scroll", onScroll);
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      scrollSpeed *= 0.9;

      // Throttled collider rect update
      const now = performance.now();
      if (now - lastRectUpdate > RECT_UPDATE_INTERVAL) {
        updateColliderRects();
        lastRectUpdate = now;
      }

      const activeTarget = getActiveTarget();
      let arrowAngle = 0;
      let arrowCenterX = 0;
      let arrowCenterY = 0;
      let targetActive = false;

      if (activeTarget) {
        targetActive = true;
        const focusX = isMobile ? canvasWidth / 2 : mouseX;
        const focusY = isMobile ? canvasHeight / 2 : mouseY;
        arrowAngle = Math.atan2(activeTarget.y - focusY, activeTarget.x - focusX);
        const offset = 60;
        arrowCenterX = focusX + Math.cos(arrowAngle) * offset;
        arrowCenterY = focusY + Math.sin(arrowAngle) * offset;
      }

      particles.forEach((p, index) => {
        p.x += p.baseVx + p.forceVx;
        p.y += p.baseVy + p.forceVy;
        p.forceVx *= 0.92;
        p.forceVy *= 0.92;

        // Wrap
        if (p.x < 0) p.x = canvasWidth;
        if (p.x > canvasWidth) p.x = 0;
        if (p.y < 0) p.y = canvasHeight;
        if (p.y > canvasHeight) p.y = 0;

        const focusX = isMobile ? canvasWidth / 2 : mouseX;
        const focusY = isMobile ? canvasHeight / 2 : mouseY;
        const distToFocus = Math.hypot(p.x - focusX, p.y - focusY);
        let targetColor = p.color;

        // 40% kept as ambient (exclude from recruitment)
        // Recruited if: Target active AND Close enough AND eligible (60%)
        const isRecruit = (index % 10) >= 4; // Keep 0,1,2,3 as ambient (40%)

        if (targetActive && distToFocus < 350 && isRecruit) {
          const shapeIndex = index % baseArrowShape.length;
          const basePoint = baseArrowShape[shapeIndex];
          
          // Enhanced normX calculation for sharper head priority
          const normX = (basePoint.x + 50) / 55;
          const r = Math.floor(30 + (255 - 30) * normX);
          const g = Math.floor(41 + (255 - 41) * normX);
          const b = Math.floor(59 + (255 - 59) * normX);
          const a = 0.6 + (0.4 * normX);
          targetColor = `rgba(${r},${g},${b},${a})`;
          
          const rotatedX = basePoint.x * Math.cos(arrowAngle) - basePoint.y * Math.sin(arrowAngle);
          const rotatedY = basePoint.x * Math.sin(arrowAngle) + basePoint.y * Math.cos(arrowAngle);
          const targetX = arrowCenterX + rotatedX * 2.5;
          const targetY = arrowCenterY + rotatedY * 2.5;
          const dx = targetX - p.x;
          const dy = targetY - p.y;
          const distToTarget = Math.sqrt(dx * dx + dy * dy);

          if (scrollSpeed > 2) {
            p.forceVx += (Math.random() - 0.5) * scrollSpeed * 0.15;
            p.forceVy += (Math.random() - 0.5) * scrollSpeed * 0.15;
          } else if (distToTarget > 1) {
             // ULTRA Head Priority: Head particles move much faster to position
            const headPriority = 1 + (4 * Math.pow(normX, 2)); // Quadratic priority for tip
            const lerpFactor = (0.1 + p.speed * 0.03) * headPriority;
            
            p.x += dx * lerpFactor;
            p.y += dy * lerpFactor;
            
            // Heavy Damping to stop jitter once near target
            p.baseVx *= 0.3;
            p.baseVy *= 0.3;
          } else {
            // SNAP to position if very close to prevent micro-jitter
            p.x = targetX;
            p.y = targetY;
            p.baseVx = 0;
            p.baseVy = 0;
            p.forceVx = 0;
            p.forceVy = 0;
          }
          resolveCollision(p);
        } else {
          // Collision detection REMOVED for non-recruited particles to allow pass-through
          // resolveCollision(p); 

          if (!isMobile) {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              const force = (150 - dist) / 150;
              p.forceVx += dx * force * 0.001;
              p.forceVy += dy * force * 0.001;
            }
          }
        }

        if (scrollSpeed > 5) {
          const angle = Math.random() * Math.PI * 2;
          const force = scrollSpeed * 0.05;
          p.forceVx += Math.cos(angle) * force;
          p.forceVy += Math.sin(angle) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = targetColor;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", init);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <div className="absolute inset-0 bg-neutral-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-neutral-950/80 to-neutral-950" />
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
};
