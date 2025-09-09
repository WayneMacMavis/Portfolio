import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "../styles/Home.scss";
import heroIllustration from "../Assets/home_illustration.svg";
import blobShape from "../Assets/blob.svg";
import useScrollProgress from "../hooks/useScrollProgress";



// Optional presets if you want to tie fade to hero height fractions
const FADE_PRESETS = {
  cinematic: { start: 0.15, end: 0.65 },
  fast: { start: 0.05, end: 0.35 },
  slow: { start: 0.2, end: 0.85 },
};

export default function Home() {
  const heroRef = useRef(null);

  // Scroll progress UI
  const [scrollPercent, setScrollPercent] = useState(0);

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
    window.addEventListener("load", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [fadeStartFrac, fadeEndFrac]);

  // Hero opacity synced with navbar easing/curve
  const heroOpacity = useScrollProgress(fadeStartPx, fadeEndPx, 0);

  // Track global page scroll percent (progress bar)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax via motion values (no React re-renders per mousemove)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Smooth springs
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });

  // Respect reduced motion and mobile
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || window.innerWidth <= 768) {
      mx.set(0);
      my.set(0);
      return;
    }

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // Parallax intensity tied to heroOpacity for a cohesive feel
  const intensity = heroOpacity;

  // Derived transforms (useTransform keeps it on the animation thread)
  const blobX = useTransform(smx, (v) => v * 16 * intensity);
  const imgX = useTransform(smx, (v) => v * 24 * intensity);
  const blobY = useTransform(smy, (v) => v * 10 * intensity + (1 - heroOpacity) * 40);
  const imgY = useTransform(smy, (v) => v * 14 * intensity + (1 - heroOpacity) * 70);

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
          <a className="btn-primary" href="#projects">View My Work</a>
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
              x: blobX,
              y: blobY,
            }}
          />
          <motion.img
            className="home__illustration-image"
            src={heroIllustration}
            alt="Working remotely illustration"
            style={{ x: imgX, y: imgY }}
          />
        </motion.div>
      </section>
    </>
  );
}
