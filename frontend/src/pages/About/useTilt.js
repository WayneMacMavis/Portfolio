// src/components/About/useTilt.js
import { useMotionValue, useSpring, animate } from "framer-motion";

export default function useTilt() {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rotateY.set(((x / rect.width) - 0.5) * 6);
    rotateX.set(((y / rect.height) - 0.5) * -6);
  };

  const resetTilt = () => {
    // 👇 Animate back to 0 with a tiny overshoot
    animate(rotateX, [rotateX.get(), -2, 1, 0], {
      duration: 0.6,
      ease: "easeInOut"
    });
    animate(rotateY, [rotateY.get(), 2, -1, 0], {
      duration: 0.6,
      ease: "easeInOut"
    });
  };

  return { rotateX: springX, rotateY: springY, handleMouseMove, resetTilt };
}
