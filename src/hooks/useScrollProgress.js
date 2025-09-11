import { useState, useEffect } from "react";

/**
 * Universal scroll progress hook.
 * 
 * @param {number|object} start - Pixel value OR element ref for fade start.
 * @param {number|object} end - Pixel value OR fractional offset (if using ref).
 * @param {number} offset - Optional pixel offset to shift the range.
 * @returns {number} progress - Normalized 0 → 1 scroll progress.
 */
export default function useScrollProgress(start, end, offset = 0) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const measure = () => {
      let startPx = 0;
      let endPx = 0;

      // Element mode
      if (start?.current) {
        const el = start.current;
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

      const update = () => {
        const scrollY = window.scrollY;
        const range = Math.max(1, endPx - startPx);
        const t = (scrollY - startPx + offset) / range;
        const clamped = Math.min(Math.max(t, 0), 1);
        setProgress(clamped);
      };

      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", measure);
      return () => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", measure);
      };
    };

    measure();
  }, [start, end, offset]);

  return progress;
}
