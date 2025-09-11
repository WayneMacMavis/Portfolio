// hooks/useSectionProgress.js
import { useState, useEffect } from "react";

export default function useScrollProgress(start, end, offset = 0) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startPx = 0;
    let endPx = 0;

    const measure = () => {
      // Element mode
      if (start && start.current instanceof Element) {
        const el = start.current;
        if (!el) {
          setProgress(0);
          return;
        }
        const rect = el.getBoundingClientRect();
        const topDocY = window.scrollY + rect.top;
        const h = rect.height || 1;

        const startFrac = typeof end === "object" && end.startFrac ? end.startFrac : 0;
        const endFrac   = typeof end === "object" && end.endFrac   ? end.endFrac   : 1;

        startPx = topDocY + h * startFrac;
        endPx   = topDocY + h * endFrac;
      }
      // Pixel mode
      else {
        startPx = typeof start === "number" ? start : 0;
        endPx   = typeof end === "number" ? end : startPx + 1;
      }
    };

    const update = () => {
      const range = Math.max(1, endPx - startPx);
      const t = (window.scrollY - startPx + offset) / range;
      const clamped = Math.min(Math.max(t, 0), 1);
      setProgress(clamped);
    };

    measure();
    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      update();
    });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
    };
  }, [start, end, offset]);

  return progress;
}