// src/components/About/AboutBackground.jsx
import { motion } from "framer-motion";

export default function AboutBackground({ bgY, sweepAngle, sweepOffset, bgVariants }) {
  return (
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
  );
}
