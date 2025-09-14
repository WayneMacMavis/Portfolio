// src/hooks/useBreathingMotion.js
import { useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function useBreathingMotion({
  scaleRange = [1, 1.015],
  inhale = 2.2,
  exhale = 2.8,
  pause = 0.3,
  cycleOffset = 0 // optional manual offset in seconds
} = {}) {
  const controls = useAnimation();
  const totalCycle = inhale + exhale + pause * 2;

  useEffect(() => {
    let isMounted = true;

    // Determine where we are in the cycle
    const now = (Date.now() / 1000 + cycleOffset) % totalCycle;

    const loop = async () => {
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

    loop();
    return () => { isMounted = false; };
  }, [controls, scaleRange, inhale, exhale, pause, totalCycle, cycleOffset]);

  return controls;
}
