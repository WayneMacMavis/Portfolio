// src/components/ProgressBar.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useScrollProgress from "../hooks/useScrollProgress";
import "../styles/ProgressBar.scss";

// Map each section to a brand color or gradient
const sectionColors = {
  home: "linear-gradient(90deg, #00d9ff, #00a3cc)",
  about: "linear-gradient(90deg, #ff7e5f, #feb47b)",
  skills: "linear-gradient(90deg, #7F00FF, #E100FF)",
  projects: "linear-gradient(90deg, #00c6ff, #0072ff)",
  contact: "linear-gradient(90deg, #f7971e, #ffd200)"
};

export default function ProgressBar() {
  const progress = useScrollProgress(0, 0, 0); // returns % scrolled
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = Object.keys(sectionColors).map(id =>
      document.getElementById(id)
    );

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.6 }
    );

    sections.forEach(sec => sec && observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="progress-bar"
      style={{
        scaleX: progress / 100,
        background: sectionColors[activeSection] || "var(--brand-gradient)"
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress / 100 }}
      transition={{ ease: "linear", duration: 0.1 }}
    />
  );
}
