// src/components/About/AboutIllustration.jsx
import { motion } from "framer-motion";
import illustration from "../../Assets/Wayne.jpg";

export default function AboutIllustration({
  illoY,
  tilt,
  handleMouseMove,
  setTilt,
  illoVariants,
  icon1Y,
  icon1Variants,
  icon2Y,
  icon2Variants,
  icon3Y,
  icon3Variants
}) {
  return (
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
  );
}
