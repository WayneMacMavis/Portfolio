// src/components/About/AboutBackground.jsx
import { motion } from "framer-motion";

export default function AboutBackground({ bgVariants, bgY }) {
  return (
    <motion.div
      className="about__bg about__bg--animated"
      aria-hidden="true"
      variants={bgVariants}
      initial="hidden"
      animate="visible"
      style={{
        y: bgY, // 👈 motion value from useAboutParallax
      }}
    />
  );
}
