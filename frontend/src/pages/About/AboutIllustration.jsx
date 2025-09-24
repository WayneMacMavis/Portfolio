// src/components/About/AboutIllustration.jsx
import { motion, useSpring, useAnimation } from "framer-motion";
import { useEffect } from "react";
import illustration from "../../Assets/Wayne.jpg";

export default function AboutIllustration({
  illoY,
  illoOpacity,
  icon1Y,
  icon1Opacity,
  icon2Y,
  icon2Opacity,
  icon3Y,
  icon3Opacity,
  rotateX,          // 👈 now passed directly
  rotateY,          // 👈 now passed directly
  handleMouseMove,
  resetTilt,        // 👈 smoother reset
  illoVariants,
  icon1Variants,
  icon2Variants,
  icon3Variants,
  settleTrigger
}) {
  // Softer spring for illo
  const illoSpringConfig = { stiffness: 180, damping: 20, mass: 0.8 };
  // Snappier spring for icons
  const iconSpringConfig = { stiffness: 300, damping: 18, mass: 0.6 };

  const illoScaleSpring = useSpring(illoOpacity, illoSpringConfig);
  const icon1Scale = useSpring(icon1Opacity, iconSpringConfig);
  const icon2Scale = useSpring(icon2Opacity, iconSpringConfig);
  const icon3Scale = useSpring(icon3Opacity, iconSpringConfig);

  // Controls for one-shot breathing
  const illoControls = useAnimation();

  // Trigger breath when settleTrigger changes
  useEffect(() => {
    if (settleTrigger) {
      illoControls.start({
        scale: [1, 1.015, 1],
        transition: { duration: 0.8, ease: "easeInOut" }
      });
    }
  }, [settleTrigger, illoControls]);

  return (
    <motion.div
      className="about__illustration"
      style={{
        y: illoY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      variants={illoVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      {/* Illo — fade + bounce, breath on settle */}
      <motion.img
        src={illustration}
        alt="Wayne portrait"
        className="about__image"
        style={{
          opacity: illoOpacity,
          scale: illoScaleSpring,
          willChange: "transform, opacity",
        }}
        animate={illoControls}
        draggable="false"
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
        style={{
          y: icon1Y,
          opacity: icon1Opacity,
          scale: icon1Scale,
          willChange: "transform, opacity",
        }}
        variants={icon1Variants}
        animate={{ rotate: [-2, 2, -2], x: [0, 3, -3, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.45
        }}
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
        style={{
          y: icon2Y,
          opacity: icon2Opacity,
          scale: icon2Scale,
          willChange: "transform, opacity",
        }}
        variants={icon2Variants}
        animate={{ rotate: [2, -2, 2], x: [0, -2, 2, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.53
        }}
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
        style={{
          y: icon3Y,
          opacity: icon3Opacity,
          scale: icon3Scale,
          willChange: "transform, opacity",
        }}
        variants={icon3Variants}
        animate={{ rotate: [-1.5, 1.5, -1.5], x: [0, 2, 0, -2, 0] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.61
        }}
      >
        <rect x="4" y="12" width="56" height="40" rx="4" ry="4" />
        <polyline points="14 24 22 32 14 40" />
        <line x1="28" y1="40" x2="40" y2="40" />
      </motion.svg>
    </motion.div>
  );
}
