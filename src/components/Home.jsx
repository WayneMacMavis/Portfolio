import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Home.scss";
import heroIllustration from "../assets/home_illustration.svg";
import blobShape from "../assets/blob.svg";

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse tracking (desktop only)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll tracking for hero + about sync
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const rawProgress = Math.min(window.scrollY / heroHeight, 1);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
      setScrollProgress(easedProgress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const intensity = 1 - scrollProgress;
  const fadeStart = 0.8; // when hero starts fading

  // Hero opacity
  const heroOpacity =
    scrollProgress < fadeStart
      ? 1
      : 1 - (scrollProgress - fadeStart) / (1 - fadeStart);

  // About section opacity + scale + upward motion (linked to hero fade)
  const aboutOpacity =
    scrollProgress < fadeStart
      ? 0
      : (scrollProgress - fadeStart) / (1 - fadeStart);

  const aboutScale = 0.98 + aboutOpacity * 0.02;
  const aboutY = 20 - aboutOpacity * 20;

  // Parallax offsets
  const blobX = mousePos.x * 10 * intensity;
  const blobY = mousePos.y * 6 * intensity + scrollProgress * 20;
  const imgX = mousePos.x * 15 * intensity;
  const imgY = mousePos.y * 8 * intensity + scrollProgress * 30;

  return (
    <>
      {/* HERO SECTION */}
      <section className="home" id="home">
        <motion.div
          className="home__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ opacity: heroOpacity }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
        >
          <h1>Hi, I’m Wayne 👋</h1>
          <h2>Creative Frontend Developer</h2>
          <p>
            I design and build modern, responsive websites with a focus on
            performance, accessibility, and clean design.
          </p>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            View My Work
          </motion.button>
        </motion.div>

        <motion.div
          className="home__illustration-wrapper"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ opacity: heroOpacity }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
        >
          <motion.div
            className="home__illustration-blob"
            style={{
              WebkitMask: `url(${blobShape}) no-repeat center / 116% 116%`,
              mask: `url(${blobShape}) no-repeat center / 116% 116%`,
            }}
            animate={{ x: blobX, y: blobY }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
          <motion.img
            className="home__illustration-image"
            src={heroIllustration}
            alt="Working remotely illustration"
            animate={{ x: imgX, y: imgY }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </motion.div>
      </section>

      {/* ABOUT SECTION — synced to hero fade */}
      <motion.section
        id="about"
        className="next-section"
        style={{
          opacity: aboutOpacity,
          scale: aboutScale,
          y: aboutY
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2>About Me</h2>
        <p>
          I’m a creative frontend developer with a passion for illustrated,
          modern web design. I love crafting immersive, responsive experiences
          that feel intentional and polished.
        </p>
        <p>
          This section fades and rises into place exactly as the hero fades out,
          creating a seamless cinematic hand‑off.
        </p>
      </motion.section>
    </>
  );
};

export default Home;
