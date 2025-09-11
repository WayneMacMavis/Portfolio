// src/hooks/useScrollProgress.js
import { useState, useEffect } from "react";

export default function useScrollProgress(refOrStart, maybeConfig, maybeOffset = 0) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startPx = 0;
    let endPx = 0;

    const measure = () => {
      // Element mode
      if (refOrStart && refOrStart.current instanceof Element) {
        const el = refOrStart.current;
        if (!el) {
          setProgress(0);
          return;
        }
        const rect = el.getBoundingClientRect();
        const topDocY = window.scrollY + rect.top;
        const h = rect.height || 1;

        // Accept config object directly (e.g., HERO_FADE_RANGE)
        const startFrac = maybeConfig?.startFrac ?? 0;
        const endFrac   = maybeConfig?.endFrac ?? 1;

        startPx = topDocY + h * startFrac;
        endPx   = topDocY + h * endFrac;
      }
      // Pixel mode
      else {
        startPx = typeof refOrStart === "number" ? refOrStart : 0;
        endPx   = typeof maybeConfig === "number" ? maybeConfig : startPx + 1;
      }
    };

    const update = () => {
      const range = Math.max(1, endPx - startPx);
      const t = (window.scrollY - startPx + maybeOffset) / range;
      setProgress(Math.min(Math.max(t, 0), 1));
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
  }, [refOrStart, maybeConfig, maybeOffset]);

  return progress;
}
