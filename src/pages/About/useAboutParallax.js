// src/pages/About/useAboutParallax.js
import { useRef, useEffect } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  motionValue,
  easeInOut
} from "framer-motion";

export default function useAboutParallax(scrollContainerRef) {
  const sectionRef = useRef(null);

  const { scrollYProgress, scrollY } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) =>
      console.log("[About::progress]", v)
    );
    return () => unsub();
  }, [scrollYProgress]);

  // ✅ Content parallax — steady ease
  const textY = useTransform(scrollYProgress, [0, 1], ["-20vh", "20vh"], { ease: easeInOut });

  // 🎯 Depth parallax with desynced easing
  const illoYBase  = useTransform(scrollYProgress, [0, 1], ["-6vh", "6vh"], { ease: easeInOut });
  const icon1YBase = useTransform(scrollYProgress, [0, 1], ["-8vh", "8vh"], { ease: t => easeInOut(t * 0.95) });
  const icon2YBase = useTransform(scrollYProgress, [0, 1], ["-7vh", "7vh"], { ease: t => easeInOut(Math.pow(t, 1.1)) });
  const icon3YBase = useTransform(scrollYProgress, [0, 1], ["-9vh", "9vh"], { ease: t => easeInOut(Math.pow(t, 0.9)) });

  // ✨ Direction‑aware reactive jitter overlay for icons
  const jitter1 = motionValue(0);
  const jitter2 = motionValue(0);
  const jitter3 = motionValue(0);

  useEffect(() => {
    let lastY = scrollY.get();
    let frame = 0;
    let phaseOffset = 0;
    let settleTimer;

    // Match overshoot timing to bounce spring frequency (~stiffness 300, damping 18)
    const bouncePeriod = 1000 / 2.2; // ~2.2Hz natural frequency → ~455ms per cycle

    const loop = () => {
      frame++;

      // Calculate scroll speed and direction
      const currentY = scrollY.get();
      const delta = currentY - lastY;
      const speed = Math.abs(delta);
      const direction = Math.sign(delta);
      lastY = currentY;

      // Flip phase instantly on direction change
      if (direction !== 0 && direction !== Math.sign(phaseOffset)) {
        phaseOffset = direction * Math.PI; // 180° phase shift
      }

      // Map speed to jitter amplitude (min 0.5px, max ~3px)
      let amp = Math.min(3, 0.5 + speed * 0.1);

      // Map speed to jitter frequency multiplier (min 1x, max ~2.5x)
      const freq = 1 + Math.min(1.5, speed * 0.05);

      // Apply sine wave jitter with reactive amplitude, frequency, and phase
      jitter1.set(Math.sin(frame / (60 / freq) + phaseOffset) * amp);
      jitter2.set(Math.sin(frame / (75 / freq) + 1 + phaseOffset) * amp * 0.8);
      jitter3.set(Math.sin(frame / (90 / freq) + 2 + phaseOffset) * amp * 1.1);

      // Inertia settle synced to bounce period
      clearTimeout(settleTimer);
      if (speed < 0.2) {
        settleTimer = setTimeout(() => {
          const overshoot = 1.5; // px
          jitter1.set(jitter1.get() + overshoot * Math.sign(jitter1.get() || 1));
          jitter2.set(jitter2.get() + overshoot * 0.8 * Math.sign(jitter2.get() || 1));
          jitter3.set(jitter3.get() + overshoot * 1.1 * Math.sign(jitter3.get() || 1));
          // Let springs pull them back naturally
        }, bouncePeriod / 4); // overshoot hits at quarter-cycle for max visual sync
      }

      requestAnimationFrame(loop);
    };
    loop();
  }, [scrollY, jitter1, jitter2, jitter3]);

  // Combine base parallax with jitter for icons
  const illoY  = illoYBase; // no jitter for illo
  const icon1Y = useSpring(useTransform([icon1YBase, jitter1], ([y, j]) => `calc(${y} + ${j}px)`));
  const icon2Y = useSpring(useTransform([icon2YBase, jitter2], ([y, j]) => `calc(${y} + ${j}px)`));
  const icon3Y = useSpring(useTransform([icon3YBase, jitter3], ([y, j]) => `calc(${y} + ${j}px)`));

  // Overlapping fade timings with global ease
  const illoOpacity  = useTransform(scrollYProgress, [0.00, 0.15, 0.85, 1], [0, 1, 1, 0], { ease: easeInOut });
  const icon1Opacity = useTransform(scrollYProgress, [0.10, 0.25, 0.85, 1], [0, 1, 1, 0], { ease: easeInOut });
  const icon2Opacity = useTransform(scrollYProgress, [0.18, 0.33, 0.85, 1], [0, 1, 1, 0], { ease: easeInOut });
  const icon3Opacity = useTransform(scrollYProgress, [0.26, 0.41, 0.85, 1], [0, 1, 1, 0], { ease: easeInOut });

  return {
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
  };
}
