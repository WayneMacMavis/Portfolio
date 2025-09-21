import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "../../styles/Home.scss";
import heroIllustration from "../../Assets/home_illustration.svg";
import blobShape from "../../Assets/blob.svg";
import useScrollProgress from "../../hooks/useScrollProgress";
import { HERO_FADE_RANGE } from "../../config"; // shared fade range

export default function Home() {
  const heroRef = useRef(null);

  // Fade progress using shared config
  const fadeProgress = useScrollProgress(heroRef, HERO_FADE_RANGE);
  const eased = fadeProgress * fadeProgress * (3 - 2 * fadeProgress); // smoothstep
  const heroOpacity = 1 - eased;

  // Parallax motion values
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || window.innerWidth <= 768) {
      mx.set(0);
      my.set(0);
      return;
    }

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // Tie parallax intensity to heroOpacity
  const blobX = useTransform(smx, (v) => v * 16 * heroOpacity);
  const imgX  = useTransform(smx, (v) => v * 24 * heroOpacity);
  const blobY = useTransform(smy, (v) => v * 10 * heroOpacity + (1 - heroOpacity) * 40);
  const imgY  = useTransform(smy, (v) => v * 14 * heroOpacity + (1 - heroOpacity) * 70);

  // Intro variants
  const heroTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const heroImageVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="home" id="home" ref={heroRef} style={{ opacity: heroOpacity }}>
      <motion.div
        className="home__content"
        variants={heroTextVariants}
        initial="hidden"
        animate="visible"
      >
        <h1>Hello, I’m Wayne 👋</h1>
        <h2>
          Full-Stack Developer
          <br />& Creative Frontend Engineer
        </h2>
        <p>
          I design and build scalable web applications from database to UI.
          Whether it’s crafting intuitive, responsive interfaces or architecting
          solid backend services, I deliver performance, accessibility, and
          clean code at every layer.
        </p>
        <a className="btn-primary" href="#projects">View My Work</a>
      </motion.div>

      <motion.div
        className="home__illustration-wrapper"
        variants={heroImageVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="home__illustration-blob"
          style={{
            WebkitMask: `url(${blobShape}) no-repeat center / 115% 115%`,
            mask: `url(${blobShape}) no-repeat center / 115% 115%`,
            x: blobX,
            y: blobY,
          }}
        />
        <motion.img
          className="home__illustration-image"
          src={heroIllustration}
          alt="Working remotely illustration"
          style={{ x: imgX, y: imgY }}
        />
      </motion.div>
    </section>
  );
}
