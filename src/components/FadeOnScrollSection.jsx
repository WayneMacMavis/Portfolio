import React, { useRef } from "react";
import useScrollProgress from "../hooks/useScrollProgress";
import { HERO_FADE_RANGE } from "../config"; // or pass as prop

export default function FadeOnScrollSection({ children, fadeRange = HERO_FADE_RANGE, className }) {
  const sectionRef = useRef(null);
  const fadeProgress = useScrollProgress(sectionRef, fadeRange);

  // Smoothstep easing
  const eased = fadeProgress * fadeProgress * (3 - 2 * fadeProgress);
  const opacity = 1 - eased;

  return (
    <section ref={sectionRef} className={className} style={{ opacity }}>
      {children}
    </section>
  );
}
