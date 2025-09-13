// src/components/About/AboutIllustration.jsx
import { motion, useSpring, useTransform, easeInOut } from "framer-motion";
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
  tilt,
  handleMouseMove,
  setTilt,
  illoVariants,
  icon1Variants,
  icon2Variants,
  icon3Variants
}) {
  // Softer spring for illo
  const illoSpringConfig = { stiffness: 180, damping: 20, mass: 0.8 };
  // Snappier spring for icons
  const iconSpringConfig = { stiffness: 300, damping: 20, mass: 0.6 };

  // Base springs
  const illoScaleSpring  = useSpring(illoOpacity,  illoSpringConfig);
  const icon1ScaleSpring = useSpring(icon1Opacity, iconSpringConfig);
  const icon2ScaleSpring = useSpring(icon2Opacity, iconSpringConfig);
  const icon3ScaleSpring = useSpring(icon3Opacity, iconSpringConfig);

  // Apply easing to the bounce motion itself
  const illoScale  = useTransform(illoScaleSpring,  [0, 1], [0.95, 1], { ease: easeInOut });
  const icon1Scale = useTransform(icon1ScaleSpring, [0, 1], [0.95, 1], { ease: easeInOut });
  const icon2Scale = useTransform(icon2ScaleSpring, [0, 1], [0.95, 1], { ease: easeInOut });
  const icon3Scale = useTransform(icon3ScaleSpring, [0, 1], [0.95, 1], { ease: easeInOut });

  return (
    <motion.div
      className="about__illustration"
      style={{
        y: illoY,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      variants={illoVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
    >
      {/* Illo */}
      <motion.img
        src={illustration}
        alt="Wayne portrait"
        className="about__image"
        style={{
          opacity: illoOpacity,
          scale: illoScale,
          willChange: "transform, opacity",
        }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{
          scale: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4
          },
        }}
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
