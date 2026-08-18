"use client";

import { useState, useEffect } from "react";

export function useCountUp(target: number, duration = 1500, startOnMount = true) {
  const [count, setCount] = useState(target > 0 && startOnMount ? 0 : target);

  useEffect(() => {
    if (!startOnMount || target <= 0) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, startOnMount]);

  return count;
}
