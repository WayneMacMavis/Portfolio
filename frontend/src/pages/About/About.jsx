import React from "react";
import { motion } from "framer-motion";
import "../../styles/About.scss";

import useAboutParallax from "./useAboutParallax";
import useTilt from "./useTilt";
import useScrollProgress from "../../hooks/useScrollProgress";
import { ABOUT_FADE_RANGE } from "../../config";

import {
  masterVariants,
  illoVariants,
  makeIconVariants,
  textContainerVariants,
  textItemVariants,
  highlightVariants,
  bgVariants
} from "./about.variants";

import AboutBackground from "./AboutBackground";
import AboutIllustration from "./AboutIllustration";
import AboutContent from "./AboutContent";

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
    icon3Opacity,
    bgY // 👈 make sure your updated useAboutParallax returns this
  } = useAboutParallax(scrollContainerRef);

  // Fade progress using symmetrical fade with adjusted range
  const fadeProgress = useScrollProgress(sectionRef, ABOUT_FADE_RANGE);
  const eased = fadeProgress * fadeProgress * (3 - 2 * fadeProgress); // smoothstep
  const aboutOpacity = 1 - Math.abs(eased - 0.5) * 2; // symmetrical fade

  const { rotateX, rotateY, handleMouseMove, resetTilt } = useTilt();

  const icon1Variants = makeIconVariants(0.8);
  const icon2Variants = makeIconVariants(1.05);
  const icon3Variants = makeIconVariants(1.3);

  return (
    <section
      id="about"
      className="about"
      ref={sectionRef}
      style={{ opacity: aboutOpacity }}
    >
      {/* Background now also receives bgY for parallax drift */}
      <AboutBackground bgVariants={bgVariants} bgY={bgY} />

      <motion.div
        className="about__sequence"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={masterVariants}
      >
        <AboutIllustration
          rotateX={rotateX}
          rotateY={rotateY}
          handleMouseMove={handleMouseMove}
          resetTilt={resetTilt}
          illoY={illoY}
          illoOpacity={illoOpacity}
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
