import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/Home.scss";
import heroIllustration from "../Assets/home_illustration.svg";
import blobShape from "../Assets/blob.svg";
import useScrollProgress from "../hooks/useScrollProgress";

const SECTION_IDS = ["home", "about", "skills", "projects", "contact"];

// Optional presets if you want to tie fade to hero height fractions
const FADE_PRESETS = {
  cinematic: { start: 0.15, end: 0.65 },
  fast: { start: 0.05, end: 0.35 },
  slow: { start: 0.2, end: 0.85 },
};

export default function Home() {
  const heroRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [progressMap, setProgressMap] = useState({});
  const [scrollPercent, setScrollPercent] = useState(0);
  const [directNavTarget, setDirectNavTarget] = useState(null);

  // Choose preset for fade relative to hero height
  const { start: fadeStartFrac, end: fadeEndFrac } = FADE_PRESETS.cinematic;

  // Convert preset fractions to absolute document pixel positions for the hook
  const [fadeStartPx, setFadeStartPx] = useState(0);
  const [fadeEndPx, setFadeEndPx] = useState(200);

  useEffect(() => {
    const measure = () => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const topDocY = window.scrollY + rect.top; // absolute top of hero in doc space
      const h = rect.height || 1;
      setFadeStartPx(topDocY + h * fadeStartFrac);
      setFadeEndPx(topDocY + h * fadeEndFrac);
    };
    measure();
    window.addEventListener("resize", measure);
    // Re-measure after assets load (SVGs/images)
    window.addEventListener("load", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [fadeStartFrac, fadeEndFrac]);

  // Hero opacity synced with navbar easing/curve
  const heroOpacity = useScrollProgress(fadeStartPx, fadeEndPx, 0);

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

  // Scroll listeners: section progress + global progress bar
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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax intensity tied to heroOpacity for a cohesive feel
  const intensity = heroOpacity;
  const blobX = mousePos.x * 16 * intensity;
  const imgX = mousePos.x * 24 * intensity;
  const blobY = mousePos.y * 10 * intensity + (1 - heroOpacity) * 40;
  const imgY = mousePos.y * 14 * intensity + (1 - heroOpacity) * 70;

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
      <section
        className="home"
        id="home"
        ref={heroRef}
        style={{ opacity: heroOpacity }}
      >
        <motion.div
          className="home__content"
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
        >
          <h1>Hello, I’m Wayne 👋</h1>
          <h2>
            Full-Stack Developer  
            <br />& Creative Frontend Engineer
          </h2>
          <p>
            I design and build scalable web applications from database to UI.
            Whether it’s crafting intuitive, responsive interfaces or architecting
            solid backend services, I deliver performance, accessibility, and
            clean code at every layer.
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

      {/* SKILLS */}
      {/* <motion.section
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
      </motion.section> */}

      {/* PROJECTS */}
      {/* <motion.section
        id="projects"
        className="cinematic-section"
        style={getSectionAnim("skills", "projects")}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2>Projects</h2>
        <p>Here’s a selection of my recent work...</p>
      </motion.section> */}

      {/* CONTACT */}
      {/* <motion.section
        id="contact"
        className="cinematic-section"
        style={getSectionAnim("projects", "contact")}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2>Contact</h2>
        <p>Let’s work together! Drop me a message...</p>
      </motion.section> */}
    </>
  );
}
