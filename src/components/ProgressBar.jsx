import React from "react";
import { motion } from "framer-motion";
import useScrollProgress from "../hooks/useScrollProgress";
import "../styles/ProgressBar.scss";

export default function ProgressBar({ activeLink }) {
  // Full-page scroll progress
  const progress = useScrollProgress(null, { startFrac: 0, endFrac: 1 });

  // Map section names to colors
  const sectionColors = {
    Home: "var(--accent-color)",
    About: "var(--about-color)",
    Skills: "var(--skills-color)",
    Projects: "var(--projects-color)",
    Contact: "var(--contact-color)"
  };

  return (
    <motion.div
      className="progress-bar"
      style={{
        scaleX: progress,
        transformOrigin: "left center",
        backgroundColor: sectionColors[activeLink] || "var(--brand-color)"
      }}
    />
  );
}
