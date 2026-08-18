"use client";

import { useEffect, useRef } from "react";

export interface SectionTarget {
  id: string;
  label: string;
  x: number; // viewport cx
  y: number; // viewport cy
}

const SECTION_MAP: Record<string, string> = {
  hero: "Hero",
  about: "About",
  github: "GitHub",
  projects: "Projects",
  contact: "Contact",
};

const ACTIVATION_RADIUS = 450;

export function useActiveSectionTarget(
  sectionIds: string[]
): React.MutableRefObject<SectionTarget | null> {
  const targetRef = useRef<SectionTarget | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const visibleIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const updateTarget = () => {
      const { x: mx, y: my } = mouseRef.current;
      const isMobile = window.innerWidth < 768;
      const focusX = isMobile ? window.innerWidth / 2 : mx;
      const focusY = isMobile ? window.innerHeight / 2 : my;

      let best: SectionTarget | null = null;
      let minDist = Infinity;

      sectionIds.forEach((id) => {
        if (!visibleIds.current.has(id)) return;
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(focusX - cx, focusY - cy);
        if (dist < minDist && dist < ACTIVATION_RADIUS) {
          minDist = dist;
          best = { id, label: SECTION_MAP[id] ?? id, x: cx, y: cy };
        }
      });

      targetRef.current = best;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      updateTarget();
    };

    const onScroll = () => {
      updateTarget();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Track which sections are in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          if (entry.isIntersecting) visibleIds.current.add(id);
          else visibleIds.current.delete(id);
        });
        updateTarget();
      },
      { threshold: 0.05 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    updateTarget();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [sectionIds]);

  return targetRef;
}
