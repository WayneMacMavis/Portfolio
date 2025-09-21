// src/hooks/useBreathingMotion.js
import { useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function useBreathingMotion({
  scaleRange = [1, 1.015],
  inhale = 2.2,
  exhale = 2.8,
  pause = 0.3,
  cycleOffset = 0
} = {}) {
  const controls = useAnimation();
  const elementRef = useRef(null);
  const totalCycle = inhale + exhale + pause * 2;

  useEffect(() => {
    let isMounted = true;
    let observer;
    const el = elementRef.current; // ✅ capture ref value once

    const startLoop = async () => {
      // Wait until the next animation frame to ensure DOM is ready
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (!isMounted || !el) return;

      const now = (Date.now() / 1000 + cycleOffset) % totalCycle;
      let t = now;

      while (isMounted) {
        // Inhale
        const inhaleTime = Math.max(0, inhale - t);
        if (inhaleTime > 0) {
          await controls.start({
            scale: scaleRange[1],
            transition: { duration: inhaleTime, ease: [0.4, 0, 0.2, 1] }
          });
        }
        t = 0;

        // Pause at top
        await controls.start({
          scale: scaleRange[1],
          transition: { duration: pause }
        });

        // Exhale
        await controls.start({
          scale: scaleRange[0],
          transition: { duration: exhale, ease: [0.4, 0, 0.2, 1] }
        });

        // Pause at bottom
        await controls.start({
          scale: scaleRange[0],
          transition: { duration: pause }
        });
      }
    };

    if (el) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startLoop();
          } else {
            controls.stop();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    }

    return () => {
      isMounted = false;
      if (observer && el) {
        observer.unobserve(el); // ✅ use captured element
      }
    };
  }, [controls, scaleRange, inhale, exhale, pause, totalCycle, cycleOffset]);

  return { controls, ref: elementRef };
}
