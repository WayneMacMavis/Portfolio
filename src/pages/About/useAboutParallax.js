// src/components/About/useAboutParallax.js
import { useRef } from "react";
import { useScroll, useTransform, useVelocity } from "framer-motion";

export default function useAboutParallax(scrollContainerRef) {
  const sectionRef = useRef(null);

  // Track scroll progress for the About section
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
  const textY = icon2Y; // text moves with icon 2

  // Scroll velocity → fun fact pulse intensity
  const scrollVelocity = useVelocity(scrollYProgress);
  const funfactGlow = useTransform(scrollVelocity, [-2, 0, 2], [0.4, 0.2, 0.4]);
  const funfactBoxShadow = useTransform(
    funfactGlow,
    (g) => `0 0 ${g * 30}px rgba(0, 217, 255, ${g})`
  );

  // Sweep angle & offset from scroll
  const sweepAngle = useTransform(scrollYProgress, [0, 1], ["85deg", "95deg"]);
  const sweepOffset = useTransform(scrollVelocity, [-2, 0, 2], ["-3deg", "0deg", "3deg"]);

  return {
    sectionRef,
    bgY,
    illoY,
    icon1Y,
    icon2Y,
    icon3Y,
    textY,
    sweepAngle,
    sweepOffset,
    funfactBoxShadow,
  };
}
