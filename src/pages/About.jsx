import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useScrollProgress from "../hooks/useScrollProgress";
import "../styles/About.scss";

// SVG imports
import timelineSvg from "../assets/timeline.svg";
import coffeeSvg  from "../assets/coffee-mascot.svg";
import quoteSvg   from "../assets/quote-mascot.svg";
import wayneSvg   from "../assets/wayne.svg";

export default function About() {
  const heroRef = useRef(null);
  const [startPx, setStartPx] = useState(0);
  const [endPx,   setEndPx]   = useState(200);

  // Measure scroll range for fade
  useEffect(() => {
    const measure = () => {
      if (!heroRef.current) return;
      const rect   = heroRef.current.getBoundingClientRect();
      const topDoc = window.scrollY + rect.top;
      setStartPx(topDoc + rect.height * 0.15);
      setEndPx(  topDoc + rect.height * 0.65);
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load",   measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load",   measure);
    };
  }, []);

  const opacity = useScrollProgress(startPx, endPx, 1);

  const fadeIn = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section
      id="about"
      className="about-page"
      ref={heroRef}
      style={{ opacity }}
    >
      {/* Top section: Wayne + text */}
      <div className="about-page__top">
        <motion.img
          src={wayneSvg}
          alt="Cartoon Wayne with blonde hair"
          className="about-page__wayne"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        />

        <motion.div
          className="about-page__content"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <h1>About Me</h1>
          <p>
            I’m Wayne—a full-stack developer and creative frontend engineer.
            I build end-to-end web experiences that are performant,
            accessible, and visually engaging.
          </p>
        </motion.div>
      </div>

      {/* Illustration grid */}
      <motion.div
        className="about-page__grid"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="about-page__item">
          <img src={timelineSvg} alt="Project timeline" />
          <span>Timeline</span>
        </div>
        <div className="about-page__item">
          <img src={coffeeSvg} alt="Coffee mascot" />
          <span>Coffee Break</span>
        </div>
        <div className="about-page__item">
          <img src={quoteSvg} alt="Quote mascot" />
          <span>Words to Live By</span>
        </div>
      </motion.div>
    </section>
  );
}