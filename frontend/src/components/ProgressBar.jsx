import React from "react";
import { motion } from "framer-motion";
import useScrollProgress from "../hooks/useScrollProgress";
import "../styles/ProgressBar.scss";

export default function ProgressBar({ activeLink }) {
  const progress = useScrollProgress(null, { startFrac: 0, endFrac: 1 });

  // Normalize key matching (e.g., "home" → "Home")
  const normalizedLink =
    activeLink && activeLink.charAt(0).toUpperCase() + activeLink.slice(1);

  const sectionColors = {
    Home: "var(--accent-color, #ff6600)",
    About: "var(--about-color, #00ff00ff)",
    Skills: "var(--skills-color, #ff6600)",
    Projects: "var(--projects-color, #ff6600)",
    Contact: "var(--contact-color, #ff6600)"
  };

  return (
    <motion.div
      className="progress-bar"
      style={{
        scaleX: progress,
        transformOrigin: "left center",
        background:
          sectionColors[normalizedLink] ||
          "var(--brand-gradient, #ff6600)" // safe fallback
      }}
    />
  );
}
