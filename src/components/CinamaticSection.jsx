import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CinematicSection = ({
  id,
  children,
  fadeStart = 0.8,
  background = "#fff",
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sectionEl = document.getElementById(id);
    if (!sectionEl) return;

    const handleScroll = () => {
      const rect = sectionEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress: 0 when top hits viewport, 1 when bottom leaves viewport
      const progress = Math.min(
        Math.max(1 - rect.top / windowHeight, 0),
        1
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  const opacity =
    scrollProgress < fadeStart
      ? 0
      : (scrollProgress - fadeStart) / (1 - fadeStart);

  const scale = 0.98 + opacity * 0.02;
  const y = 20 - opacity * 20;

  return (
    <motion.section
      id={id}
      className="cinematic-section"
      style={{
        opacity,
        scale,
        y,
        background,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

export default CinematicSection;
