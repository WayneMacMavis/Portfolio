import { useState, useEffect } from "react";

// easeInOutCubic
const easeInOutCubic = t =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Returns an eased opacity value between 1 and minOpacity
 * based on window.scrollY between startPx and endPx.
 */
export default function useScrollProgress(startPx = 0, endPx = 200, minOpacity = 0.2) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const range = Math.max(endPx - startPx, 1);
      let t = (y - startPx) / range;
      t = Math.min(Math.max(t, 0), 1);
      t = easeInOutCubic(t);
      setOpacity(1 - t * (1 - minOpacity));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [startPx, endPx, minOpacity]);

  return opacity;
}
