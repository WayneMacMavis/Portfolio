import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useVelocity } from "framer-motion";
import "../styles/About.scss";
import illustration from "../assets/Wayne.jpg";

export default function About({ scrollContainerRef }) {
  const sectionRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8vh", "8vh"]);
  const illoY = useTransform(scrollYProgress, [0, 1], ["-4vh", "4vh"]);
  const icon1Y = useTransform(scrollYProgress, [0, 1], ["-6vh", "6vh"]);
  const icon2Y = useTransform(scrollYProgress, [0, 1], ["-5vh", "5vh"]);
  const icon3Y = useTransform(scrollYProgress, [0, 1], ["-7vh", "7vh"]);
  const textY = icon2Y;

  // Scroll velocity → funfact pulse intensity
  const scrollVelocity = useVelocity(scrollYProgress);
  const funfactGlow = useTransform(scrollVelocity, [-2, 0, 2], [0.4, 0.2, 0.4]);
  const funfactBoxShadow = useTransform(
    funfactGlow,
    (g) => `0 0 ${g * 30}px rgba(0, 217, 255, ${g})`
  );

  // Sweep angle & offset from scroll
  const sweepAngle = useTransform(scrollYProgress, [0, 1], ["85deg", "95deg"]);
  const sweepOffset = useTransform(scrollVelocity, [-2, 0, 2], ["-3deg", "0deg", "3deg"]);

  // Mouse tilt
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    const rotateX = ((y / rect.height) - 0.5) * -6;
    setTilt({ rotateX, rotateY });
  };

  // Variants
  const masterVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
  };

  const illoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: 30,
      rotate: -2,
      filter: "drop-shadow(0 0 0 rgba(255,179,71,0))",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      filter: [
        "drop-shadow(0 0 0 rgba(255,179,71,0))",
        "drop-shadow(0 0 12px rgba(71, 99, 255, 0.6))",
        "drop-shadow(0 0 0 rgba(255,179,71,0))",
      ],
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        filter: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 },
      },
    },
  };

  const makeIconVariants = (delay) => ({
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      color: "#4f52ffff",
      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
    },
    visible: {
      opacity: 1,
      scale: [1, 1.15, 0.97, 1],
      y: 0,
      color: ["#5571f0ff", "#00d9ffff", "#5662d1ff"],
      filter: [
        "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
        "drop-shadow(0 0 8px rgba(71, 83, 255, 0.8))",
        "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
      ],
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay,
      },
    },
  });

  const icon1Variants = makeIconVariants(0.8);
  const icon2Variants = makeIconVariants(1.05);
  const icon3Variants = makeIconVariants(1.3);

  const textContainerVariants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.4, staggerChildren: 0.25 } },
  };

  const textItemVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] },
    },
  };

  const highlightVariants = {
    hidden: { color: "inherit", textShadow: "none" },
    visible: {
      color: "#00d9ff",
      textShadow: "0 0 8px rgba(0, 217, 255, 0.8)",
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const bgVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px) brightness(1) hue-rotate(0deg)",
      scale: 1,
    },
    visible: {
      opacity: 1,
      filter: [
        "blur(0px) brightness(1) hue-rotate(0deg)",
        "blur(0px) brightness(1.05) hue-rotate(8deg)",
        "blur(0px) brightness(1) hue-rotate(0deg)",
        "blur(0px) brightness(1.03) hue-rotate(-6deg)",
        "blur(0px) brightness(1) hue-rotate(0deg)",
      ],
      scale: [1, 1.02, 1, 1.015, 1],
      transition: {
        duration: 2.3,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.8,
        times: [0, 0.15, 0.4, 0.55, 1],
      },
    },
  };

  return (
      <section id="about" className="about" ref={sectionRef}>
      {/* Background gradient with sweep */}
      <motion.div
        className="about__bg about__bg--animated"
        aria-hidden="true"
        style={{
          y: bgY,
          "--sweep-angle": sweepAngle,
          "--sweep-offset": sweepOffset
        }}
        variants={bgVariants}
        initial="visible"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      />

      {/* Sequence */}
      <motion.div
        className="about__sequence"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={masterVariants}
      >
        {/* Illustration + Icons with tilt */}
        <motion.div
          className="about__illustration"
          style={{
            y: illoY,
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
            transformStyle: "preserve-3d",
          }}
          variants={illoVariants}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
        >
          {/* Portrait breathing */}
          <motion.img
            src={illustration}
            alt="Wayne portrait"
            className="about__image"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Icon 1 */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="about__icon about__icon--1"
            style={{ y: icon1Y }}
            variants={icon1Variants}
            animate={{ rotate: [-2, 2, -2], x: [0, 3, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M22 8c-6 0-10 4-10 10v6c0 4-2 6-6 6v4c4 0 6 2 6 6v6c0 6 4 10 10 10" />
            <path d="M42 8c6 0 10 4 10 10v6c0 4 2 6 6 6v4c-4 0-6 2-6 6v6c0 6-4 10-10 10" />
          </motion.svg>

          {/* Icon 2 */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="about__icon about__icon--2"
            style={{ y: icon2Y }}
            variants={icon2Variants}
            animate={{ rotate: [2, -2, 2], x: [0, -2, 2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <polyline points="24 8 8 32 24 56" />
            <polyline points="40 8 56 32 40 56" />
            <line x1="28" y1="48" x2="36" y2="16" />
          </motion.svg>

          {/* Icon 3 */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="about__icon about__icon--3"
            style={{ y: icon3Y }}
            variants={icon3Variants}
            animate={{ rotate: [-1.5, 1.5, -1.5], x: [0, 2, 0, -2, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="4" y="12" width="56" height="40" rx="4" ry="4" />
            <polyline points="14 24 22 32 14 40" />
            <line x1="28" y1="40" x2="40" y2="40" />
          </motion.svg>
        </motion.div>

        {/* Text with highlights */}
        <motion.div
          className="about__content"
          style={{ y: textY }}
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <h1 className="about__heading">
            <motion.span variants={textItemVariants}>About Me</motion.span>
            <motion.span
              className="about__underline"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
            />
          </h1>

          <p>
            <motion.span variants={textItemVariants}>
              I’m Wayne — a{" "}
              <motion.span variants={highlightVariants} className="highlight">
                full‑stack developer
              </motion.span>{" "}
              and creative engineer who blends{" "}
              <motion.span variants={highlightVariants} className="highlight">
                technical precision
              </motion.span>{" "}
              with playful, original design. I’ve built everything from{" "}
              <motion.span variants={highlightVariants} className="highlight">
                immersive front‑end experiences
              </motion.span>{" "}
              to scalable back‑end systems — always chasing that feeling when
              an interface becomes a story.
            </motion.span>
          </p>

          <p>
            <motion.span variants={textItemVariants}>
              My work starts with intention:{" "}
              <motion.span variants={highlightVariants} className="highlight">
                every interaction should feel earned
              </motion.span>
              . From micro‑timed reveals to breathing layouts, I design for
              rhythm, clarity, and a touch of whimsy. If something doesn’t
              belong, it goes — composition is everything.
            </motion.span>
          </p>

          <p>
            <motion.span variants={textItemVariants}>
              I love blending{" "}
              <motion.span variants={highlightVariants} className="highlight">
                illustration, animation, and interactivity
              </motion.span>{" "}
              into cohesive narratives. The web is my canvas, and my goal is to
              make the experience feel{" "}
              <motion.span variants={highlightVariants} className="highlight">
                memorable
              </motion.span>
              — personal enough to smile at, and crafted enough to trust.
            </motion.span>
          </p>

          {/* Fun Facts strip */}
          <motion.div
            className="about__funfacts"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={textContainerVariants}
          >
            {[
              { label: "Favourite Debugging Snack", value: "Salt & Vinegar Chips" },
              { label: "Most Used CSS Property", value: "transform" },
              { label: "First Line of Code", value: "print('Hello World')" },
              { label: "Current Obsession", value: "Micro‑interactions" },
            ].map((fact, i) => (
              <motion.div
                key={i}
                className="funfact"
                variants={textItemVariants}
                style={{ boxShadow: funfactBoxShadow }}
              >
                <motion.span
                  className="funfact__label"
                  variants={highlightVariants}
                >
                  {fact.label}:
                </motion.span>{" "}
                <span className="funfact__value">{fact.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
