// src/components/About/About.jsx
import React from "react";
import { motion } from "framer-motion";
import "../../styles/About/About.scss";

// Hooks
import useAboutParallax from "./useAboutParallax";
import useTilt from "./useTilt";

// Variants
import {
  masterVariants,
  illoVariants,
  makeIconVariants,
  textContainerVariants,
  textItemVariants,
  highlightVariants,
  bgVariants
} from "./about.variants";

// Components
import AboutBackground from "./AboutBackground";
import AboutIllustration from "./AboutIllustration";
import AboutContent from "./AboutContent";

export default function About({ scrollContainerRef }) {
  // Parallax + transforms
  const {
    sectionRef,
    bgY,
    illoY,
    icon1Y,
    icon2Y,
    icon3Y,
    textY,
    sweepAngle,
    sweepOffset,
    funfactBoxShadow
  } = useAboutParallax(scrollContainerRef);

  // Mouse tilt
  const { tilt, handleMouseMove, resetTilt } = useTilt();

  // Icon variants with delays
  const icon1Variants = makeIconVariants(0.8);
  const icon2Variants = makeIconVariants(1.05);
  const icon3Variants = makeIconVariants(1.3);

  return (
    <section id="about" className="about" ref={sectionRef}>
      {/* Background gradient with sweep */}
      <AboutBackground
        bgY={bgY}
        sweepAngle={sweepAngle}
        sweepOffset={sweepOffset}
        bgVariants={bgVariants}
      />

      {/* Sequence wrapper */}
      <motion.div
        className="about__sequence"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={masterVariants}
      >
        {/* Illustration + icons */}
        <AboutIllustration
          illoY={illoY}
          tilt={tilt}
          handleMouseMove={handleMouseMove}
          setTilt={resetTilt}
          illoVariants={illoVariants}
          icon1Y={icon1Y}
          icon1Variants={icon1Variants}
          icon2Y={icon2Y}
          icon2Variants={icon2Variants}
          icon3Y={icon3Y}
          icon3Variants={icon3Variants}
        />

        {/* Text + highlights + fun facts */}
        <AboutContent
          textY={textY}
          textContainerVariants={textContainerVariants}
          textItemVariants={textItemVariants}
          highlightVariants={highlightVariants}
          funfactBoxShadow={funfactBoxShadow}
        />
      </motion.div>
    </section>
  );
}
