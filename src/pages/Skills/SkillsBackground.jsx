import { useEffect, useRef, useMemo, useState } from "react";
import {
  // Core web/dev tech
  FaHtml5, FaSass, FaReact, FaNodeJs, FaPython, FaJs, FaCss3,
  // Tools & platforms
  FaGitAlt, FaGithub, FaFigma, FaCloud, FaTerminal,
  // Generic dev symbols
  FaCode, FaLaptopCode, FaCogs, FaTools,
} from "react-icons/fa";
import { DiVisualstudio } from "react-icons/di";
import "../../styles/skills/SkillsBackground.scss";

const icons = [
  FaHtml5, FaSass, FaReact, FaNodeJs, FaPython, FaJs, FaCss3,
  FaGitAlt, FaGithub, FaFigma, FaCloud, FaTerminal,
  FaCode, FaLaptopCode, FaCogs, FaTools, DiVisualstudio
];

export default function SkillsBackground() {
  const totalItems = 25;
  const minDistance = 10;
  const containerRef = useRef(null);

  // Generate stable positions, rotations, scales, layers
  const baseItems = useMemo(() => {
    const placed = [];
    const list = [];
    const isTooClose = (t, l) =>
      placed.some(([pt, pl]) => Math.hypot(pt - t, pl - l) < minDistance);

    for (let i = 0; i < totalItems; i++) {
      let top, left, attempts = 0;
      do {
        top = Math.random() * 85;
        left = Math.random() * 85;
        attempts++;
        if (attempts > 80) break;
      } while (isTooClose(top, left));
      placed.push([top, left]);

      const rotation = Math.random() * 360;
      const scale = Math.random() * 1.4 + 0.9;
      const delay = Math.random() * 3;
      const fadeDelay = Math.random() * 5;

      const r = Math.random();
      const layer = r < 0.33 ? "back" : r > 0.66 ? "front" : "mid";
      const factor = layer === "front" ? 0.12 : layer === "back" ? 0.05 : 0.08;

      list.push({
        top,
        left,
        rotation,
        scale,
        delay,
        fadeDelay,
        layer,
        factor
      });
    }
    return list;
  }, []);

  // State for current icon choice per slot
  const [iconSet, setIconSet] = useState(
    () => baseItems.map(() => icons[Math.floor(Math.random() * icons.length)])
  );

  // Smooth scroll + mouse parallax
  useEffect(() => {
    const target = { sx: 0, sy: 0, mx: 0, my: 0 };
    const eased = { sx: 0, sy: 0, mx: 0, my: 0 };

    const onScroll = () => {
      target.sx = window.scrollX || window.pageXOffset;
      target.sy = window.scrollY || window.pageYOffset;
    };
    const onMouse = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      target.mx = (e.clientX - cx) / cx;
      target.my = (e.clientY - cy) / cy;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);

    let raf;
    const ease = 0.06;
    const maxMousePx = 10;
    const loop = () => {
      eased.sx += (target.sx - eased.sx) * ease;
      eased.sy += (target.sy - eased.sy) * ease;
      eased.mx += (target.mx - eased.mx) * ease;
      eased.my += (target.my - eased.my) * ease;

      const el = containerRef.current;
      if (el) {
        el.style.setProperty("--mouse-x", `${eased.mx * maxMousePx}px`);
        el.style.setProperty("--mouse-y", `${eased.my * maxMousePx}px`);
        el.style.setProperty("--scroll-x", `${eased.sx}px`);
        el.style.setProperty("--scroll-y", `${eased.sy}px`);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Handle fade cycle completion to swap icon
  const handleFadeIteration = (index) => {
    setIconSet((prev) => {
      const next = [...prev];
      let newIcon;
      do {
        newIcon = icons[Math.floor(Math.random() * icons.length)];
      } while (newIcon === prev[index]); // avoid same icon
      next[index] = newIcon;
      return next;
    });
  };

  return (
    <div className="skills-bg" ref={containerRef}>
      {baseItems.map(({ top, left, rotation, scale, delay, fadeDelay, layer, factor }, i) => {
        const Icon = iconSet[i];
        return (
          <span
            key={`icon-${i}`}
            className={`bg-item layer-${layer}`}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              "--delay": `${delay}s`,
              "--fade-delay": `${fadeDelay}s`,
              "--factor": factor,
              "--rot": `${rotation}deg`,
              "--scale": scale
            }}
            onAnimationIteration={(e) => {
              if (e.animationName === "fade") {
                handleFadeIteration(i);
              }
            }}
          >
            <span className="icon-wrap">
              <Icon />
            </span>
          </span>
        );
      })}
    </div>
  );
}