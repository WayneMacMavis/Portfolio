import { useState, useEffect } from "react";

export default function useScrollProgress(start, end, offset = 0) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startPx = 0;
    let endPx = 0;

    const measure = () => {
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
      } else {
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

    // Wrap scroll updates in rAF
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial measure
    measure();
    update();

    // Observe element size changes
    let resizeObserver;
    if (start && start.current instanceof Element) {
      resizeObserver = new ResizeObserver(() => {
        measure();
        update();
      });
      resizeObserver.observe(start.current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      update();
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (resizeObserver && start.current) {
        resizeObserver.unobserve(start.current);
        resizeObserver.disconnect();
      }
    };
  }, [start, end, offset]);

  return progress;
}
