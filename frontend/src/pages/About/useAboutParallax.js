// src/components/About/useAboutParallax.js
import { useRef, useEffect, useState } from "react";
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
    container: scrollContainerRef || undefined,
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Debounced settle trigger
  const [settleTrigger, setSettleTrigger] = useState(0);
  const lastTriggerRef = useRef(0);
  const lastScrollStartRef = useRef(scrollY.get());

  const DEBOUNCE_MS = 1000;
  const DISTANCE_THRESHOLD = 50;

  // ✅ Text parallax: arrive and hold at center
  const textYBase = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["-20vh", "0vh", "0vh"],
    { ease: easeInOut, clamp: true }
  );
  const textY = useSpring(textYBase, { stiffness: 100, damping: 22, mass: 0.8 });

  // 🎯 Illustration parallax: arrive and hold
  const illoYBase = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["-6vh", "0vh", "0vh"],
    { ease: easeInOut, clamp: true }
  );
  const illoY = useSpring(illoYBase, { stiffness: 120, damping: 20, mass: 0.7 });

  // 🌌 Background drift: subtle, locks at center
  const bgYBase = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["-10vh", "0vh", "0vh"], // subtle drift, then hold
    { ease: easeInOut, clamp: true }
  );
  const bgY = useSpring(bgYBase, { stiffness: 60, damping: 18, mass: 0.9 });

  // 🎯 Icons: float with jitter
  const icon1YBase = useTransform(scrollYProgress, [0, 1], ["-8vh", "8vh"], {
    ease: (t) => easeInOut(t * 0.95),
  });
  const icon2YBase = useTransform(scrollYProgress, [0, 1], ["-7vh", "7vh"], {
    ease: (t) => easeInOut(Math.pow(t, 1.1)),
  });
  const icon3YBase = useTransform(scrollYProgress, [0, 1], ["-9vh", "9vh"], {
    ease: (t) => easeInOut(Math.pow(t, 0.9)),
  });

  // ✨ Direction‑aware jitter overlay
  const jitter1 = motionValue(0);
  const jitter2 = motionValue(0);
  const jitter3 = motionValue(0);

  useEffect(() => {
    let lastY = scrollY.get();
    let phaseOffset = 0;
    let settleTimer;
    let frameId;

    const bouncePeriod = 1000 / 2.2;

    const loop = () => {
      const currentY = scrollY.get();
      const delta = currentY - lastY;
      const speed = Math.abs(delta);
      const direction = Math.sign(delta);
      lastY = currentY;

      if (speed > 0.5 && Math.abs(currentY - lastScrollStartRef.current) > DISTANCE_THRESHOLD) {
        lastScrollStartRef.current = currentY;
      }

      if (direction !== 0 && direction !== Math.sign(phaseOffset)) {
        phaseOffset = direction * Math.PI;
      }

      const amp = Math.min(3, 0.5 + speed * 0.1);
      const freq = 1 + Math.min(1.5, speed * 0.05);

      jitter1.set(Math.sin(performance.now() / (60 / freq) + phaseOffset) * amp);
      jitter2.set(Math.sin(performance.now() / (75 / freq) + 1 + phaseOffset) * amp * 0.8);
      jitter3.set(Math.sin(performance.now() / (90 / freq) + 2 + phaseOffset) * amp * 1.1);

      clearTimeout(settleTimer);
      if (speed < 0.2) {
        settleTimer = setTimeout(() => {
          const overshoot = 1.5;
          jitter1.set(jitter1.get() + overshoot * Math.sign(jitter1.get() || 1));
          jitter2.set(jitter2.get() + overshoot * 0.8 * Math.sign(jitter2.get() || 1));
          jitter3.set(jitter3.get() + overshoot * 1.1 * Math.sign(jitter3.get() || 1));

          const now = Date.now();
          const distanceSinceStart = Math.abs(currentY - lastScrollStartRef.current);
          const timeSinceLast = now - lastTriggerRef.current;

          if (timeSinceLast > DEBOUNCE_MS && distanceSinceStart > DISTANCE_THRESHOLD) {
            lastTriggerRef.current = now;
            setSettleTrigger(now);
          }
        }, bouncePeriod / 4);
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(settleTimer);
    };
  }, [scrollY, jitter1, jitter2, jitter3]);

  // 🎛 Apply spring personalities to icons
  const icon1Y = useSpring(
    useTransform([icon1YBase, jitter1], ([y, j]) => y + j),
    { stiffness: 180, damping: 15, mass: 0.5 }
  );
  const icon2Y = useSpring(
    useTransform([icon2YBase, jitter2], ([y, j]) => y + j),
    { stiffness: 180, damping: 15, mass: 0.5 }
  );
  const icon3Y = useSpring(
    useTransform([icon3YBase, jitter3], ([y, j]) => y + j),
    { stiffness: 180, damping: 15, mass: 0.5 }
  );

  // Overlapping fade timings
  const illoOpacity  = useTransform(scrollYProgress, [0.00, 0.15, 0.85, 1], [0, 1, 1, 0], { ease: easeInOut });
  const icon1Opacity = useTransform(scrollYProgress, [0.10, 0.25, 0.85, 1], [0, 1, 1, 0], { ease: easeInOut });
  const icon2Opacity = useTransform(scrollYProgress, [0.18, 0.33, 0.85, 1], [0, 1, 1, 0], { ease: easeInOut });
  const icon3Opacity = useTransform(scrollYProgress, [0.26, 0.41, 0.85, 1], [0, 1, 1, 0], { ease: easeInOut });

  return {
    sectionRef,
    textY,
    illoY,
    bgY,
    icon1Y,
    icon2Y,
    icon3Y,
    illoOpacity,
    icon1Opacity,
    icon2Opacity,
    icon3Opacity,
    settleTrigger
  };
}
