import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Home.scss";
import heroIllustration from "../assets/home_illustration.svg";
import blobShape from "../assets/blob.svg";

const SECTION_IDS = ["home", "about", "skills", "projects", "contact"];

// 🎯 Fade presets for quick testing
const FADE_PRESETS = {
  cinematic: { start: 0.15, end: 0.65 }, // gentle, stretched fade
  fast: { start: 0.05, end: 0.35 },      // quick fade
  slow: { start: 0.2, end: 0.85 },       // very gradual fade
};

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [progressMap, setProgressMap] = useState({});
  const [scrollPercent, setScrollPercent] = useState(0);
  const [directNavTarget, setDirectNavTarget] = useState(null);
  const [heroScroll, setHeroScroll] = useState(0);

  // Pick your preset here 👇
  const { start: fadeStart, end: fadeEnd } = FADE_PRESETS.cinematic;

  // Detect direct navigation via hash
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && SECTION_IDS.includes(hash)) {
      setDirectNavTarget(hash);
    }
  }, []);

  // Mouse tracking (desktop only)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      // Section progress
      const newProgress = {};
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        newProgress[id] = Math.min(
          Math.max(1 - rect.top / window.innerHeight, 0),
          1
        );
      });
      setProgressMap(newProgress);

      // Page scroll %
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);

      // Hero scroll fraction
      const homeEl = document.getElementById("home");
      if (homeEl) {
        const rect = homeEl.getBoundingClientRect();
        const scrolledPast = Math.min(Math.max(-rect.top, 0), rect.height);
        const fraction = scrolledPast / rect.height;
        setHeroScroll(fraction);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🎬 Tuned fade-out timing
  let heroOpacity;
  if (heroScroll <= fadeStart) {
    heroOpacity = 1;
  } else if (heroScroll >= fadeEnd) {
    heroOpacity = 0;
  } else {
    const fadeFraction = (heroScroll - fadeStart) / (fadeEnd - fadeStart);
    heroOpacity = 1 - fadeFraction;
  }

  // Parallax intensity
  const intensity = 1 - heroScroll;
  const blobX = mousePos.x * 16 * intensity;
  const imgX = mousePos.x * 24 * intensity;
  const blobY = mousePos.y * 10 * intensity + heroScroll * 40;
  const imgY = mousePos.y * 14 * intensity + heroScroll * 70;

  // Section animation helper
  const getSectionAnim = (prevId, curId) => {
    const prev = progressMap[prevId] || 0;
    const isDirect = directNavTarget === curId;
    const start = 0.5;
    const minOp = 0.1;
    const op = isDirect
      ? 1
      : prev < start
      ? minOp
      : Math.min(1, (prev - start) / (1 - start));
    return { opacity: op, scale: 0.98 + op * 0.02, y: 20 - op * 20 };
  };

  // Mount fade-in variants
  const heroTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const heroImageVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="scroll-progress">
        <div
          className="scroll-progress__bar"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* HERO */}
      <section className="home" id="home" style={{ opacity: heroOpacity }}>
        <motion.div
          className="home__content"
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
        >
          <h1>Hi, I’m Wayne 👋</h1>
          <h2>Creative Frontend Developer</h2>
          <p>
            I design and build modern, responsive websites with a focus on
            performance, accessibility, and clean design.
          </p>
          <button className="btn-primary">View My Work</button>
        </motion.div>

        <motion.div
          className="home__illustration-wrapper"
          variants={heroImageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="home__illustration-blob"
            style={{
              WebkitMask: `url(${blobShape}) no-repeat center / 116% 116%`,
              mask: `url(${blobShape}) no-repeat center / 116% 116%`,
            }}
            animate={{ x: blobX, y: blobY }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
          />
          <motion.img
            className="home__illustration-image"
            src={heroIllustration}
            alt="Working remotely illustration"
            animate={{ x: imgX, y: imgY }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
          />
        </motion.div>
      </section>

      {/* ABOUT */}
      <motion.section
        id="about"
        className="cinematic-section"
        style={getSectionAnim("home", "about")}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2>About Me</h2>
        <p>
          I’m a creative frontend developer with a passion for illustrated,
          modern web design. I love crafting immersive, responsive experiences
          that feel intentional and polished.
        </p>
      </motion.section>

      {/* SKILLS */}
      <motion.section
        id="skills"
        className="cinematic-section"
        style={getSectionAnim("about", "skills")}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2>Skills</h2>
        <ul>
          <li>React & SCSS</li>
          <li>Framer Motion</li>
          <li>SVG Editing</li>
          <li>Responsive Design</li>
        </ul>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        className="cinematic-section"
        style={getSectionAnim("skills", "projects")}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2>Projects</h2>
        <p>Here’s a selection of my recent work...</p>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        className="cinematic-section"
        style={getSectionAnim("projects", "contact")}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2>Contact</h2>
        <p>Let’s work together! Drop me a message...</p>
      </motion.section>
    </>
  );
}
