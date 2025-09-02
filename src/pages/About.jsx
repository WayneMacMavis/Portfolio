import React, {useRef} from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import "../styles/About.scss";
import illustration from "../assets/about-illustration.svg";
import icon1 from "../assets/floating-icon1.svg";
import icon2 from "../assets/floating-icon2.svg";


export default function About({ scrollContainerRef }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef,
    offset: ["start 90%", "end 10%"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8vh", "8vh"]);
  const illoY = useTransform(scrollYProgress, [0, 1], ["-4vh", "4vh"]);
  const icon1Y = useTransform(scrollYProgress, [0, 1], ["-6vh", "6vh"]);
  const icon2Y = useTransform(scrollYProgress, [0, 1], ["-5vh", "5vh"]);

  const icon1Rotate = useTransform(scrollYProgress, [0, 1], ["-4deg", "4deg"]);
  const icon2Rotate = useTransform(scrollYProgress, [0, 1], ["3deg", "-3deg"]);

  // Master container controls the whole sequence
  const masterVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25, // time between each child
      },
    },
  };

  // Illustration + icon variants
  const illoVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Text container waits until icons are done
  const textContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.75, // wait after last icon before starting text
        staggerChildren: 0.2,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="about" ref={sectionRef}>
      {/* Background gradient */}
      <motion.div className="about__bg" aria-hidden="true" style={{ y: bgY }} />

      {/* Grid container for side-by-side layout */}
      <motion.div
        className="about__sequence"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={masterVariants}
      >
        {/* Illustration */}
        <motion.div className="about__illustration" style={{ y: illoY }}>
          <motion.img
            src={illustration}
            alt="Cartoon developer"
            variants={illoVariants}
          />

          <motion.img
            src={icon1}
            alt="Floating code icon"
            className="about__icon about__icon--1"
            style={{ y: icon1Y, rotate: icon1Rotate }}
            variants={iconVariants}
            whileHover={{ rotate: 8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          />

          <motion.img
            src={icon2}
            alt="Floating star icon"
            className="about__icon about__icon--2"
            style={{ y: icon2Y, rotate: icon2Rotate }}
            variants={iconVariants}
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="about__content"
          variants={textContainerVariants}
        >
          <motion.h1 variants={textItemVariants}>About Me</motion.h1>
          <motion.p variants={textItemVariants}>
            I’m Wayne — a full‑stack developer who blends technical depth with playful,
            original design. I love crafting immersive web experiences that feel
            personal, memorable, and just a little whimsical.
          </motion.p>
          <motion.p variants={textItemVariants}>
            Whether it’s a quirky SVG animation or a scalable backend, I believe
            every detail should tell a story.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}