// hooks/useSectionProgress.js
import { useState, useEffect } from "react";

export default function useSectionProgress(id) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sectionEl = document.getElementById(id);
    if (!sectionEl) return;

    const handleScroll = () => {
      const rect = sectionEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 0 when top hits viewport, 1 when bottom leaves viewport
      const raw = Math.min(Math.max(1 - rect.top / windowHeight, 0), 1);
      setProgress(raw);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  return progress;
}
