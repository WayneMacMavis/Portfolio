// src/components/About/about.variants.js

// Master container — staggers children
export const masterVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

// Illustration (portrait) entrance
export const illoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 30,
    rotate: -2,
    filter: "drop-shadow(0 0 0 rgba(255,179,71,0))",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    filter: [
      "drop-shadow(0 0 0 rgba(255,179,71,0))",
      "drop-shadow(0 0 12px rgba(71, 99, 255, 0.6))",
      "drop-shadow(0 0 0 rgba(255,179,71,0))",
    ],
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      filter: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 },
    },
  },
};

// Factory for icon variants with delay
export const makeIconVariants = (delay) => ({
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    color: "#4f52ffff",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
  },
  visible: {
    opacity: 1,
    scale: [1, 1.15, 0.97, 1],
    y: 0,
    color: ["#5571f0ff", "#00d9ffff", "#5662d1ff"],
    filter: [
      "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
      "drop-shadow(0 0 8px rgba(71, 83, 255, 0.8))",
      "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
    ],
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  },
});

// Text container — staggers children
export const textContainerVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.4, staggerChildren: 0.25 } },
};

// Text item — slide up & fade in
export const textItemVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] },
  },
};

// Highlighted text — glow effect
export const highlightVariants = {
  hidden: { color: "inherit", textShadow: "none" },
  visible: {
    color: "#00d9ff",
    textShadow: "0 0 8px rgba(0, 217, 255, 0.8)",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// Background gradient — fade & subtle scale
export const bgVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px) brightness(1) hue-rotate(0deg)",
    scale: 1,
  },
  visible: {
    opacity: 1,
    filter: [
      "blur(0px) brightness(1) hue-rotate(0deg)",
      "blur(0px) brightness(1.05) hue-rotate(8deg)",
      "blur(0px) brightness(1) hue-rotate(0deg)",
      "blur(0px) brightness(1.03) hue-rotate(-6deg)",
      "blur(0px) brightness(1) hue-rotate(0deg)",
    ],
    scale: [1, 1.02, 1, 1.015, 1],
    transition: {
      duration: 2.3,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.8,
      times: [0, 0.15, 0.4, 0.55, 1],
    },
  },
};
