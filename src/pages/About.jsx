// src/components/About/About.jsx
import React from "react";
import { motion } from "framer-motion";
import "../styles/About/About.scss";

import useAboutParallax from "./About/useAboutParallax";
import useTilt from "./About/useTilt";

import {
  masterVariants,
  illoVariants,
  makeIconVariants,
  textContainerVariants,
  textItemVariants,
  highlightVariants,
  bgVariants
} from "./About/about.variants";

import AboutBackground from "./About/AboutBackground";
import AboutIllustration from "./About/AboutIllustration";
import AboutContent from "./About/AboutContent";

export default function About({ scrollContainerRef }) {
  const {
    sectionRef,
    textY,
    illoY,
    icon1Y,
    icon2Y,
    icon3Y,
    illoOpacity,
    icon1Opacity,
    icon2Opacity,
    icon3Opacity
  } = useAboutParallax(scrollContainerRef);

  const { tilt, handleMouseMove, resetTilt } = useTilt();

  const icon1Variants = makeIconVariants(0.8);
  const icon2Variants = makeIconVariants(1.05);
  const icon3Variants = makeIconVariants(1.3);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <AboutBackground bgVariants={bgVariants} />

      <motion.div
        className="about__sequence"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={masterVariants}
      >
        <AboutIllustration
          illoY={illoY}
          illoOpacity={illoOpacity}
          tilt={tilt}
          handleMouseMove={handleMouseMove}
          setTilt={resetTilt}
          illoVariants={illoVariants}
          icon1Y={icon1Y}
          icon1Opacity={icon1Opacity}
          icon1Variants={icon1Variants}
          icon2Y={icon2Y}
          icon2Opacity={icon2Opacity}
          icon2Variants={icon2Variants}
          icon3Y={icon3Y}
          icon3Opacity={icon3Opacity}
          icon3Variants={icon3Variants}
        />

        <motion.div style={{ y: textY }}>
          <AboutContent
            textContainerVariants={textContainerVariants}
            textItemVariants={textItemVariants}
            highlightVariants={highlightVariants}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
