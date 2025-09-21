import { useState } from "react";
import { motion, useSpring } from "framer-motion";
import bg1 from "../../Assets/bg1.jpg";
import bg2 from "../../Assets/bg2.jpg";
import bg3 from "../../Assets/bg3.jpg";
import bg4 from "../../Assets/bg4.jpg";
import bg5 from "../../Assets/bg5.jpg";
import "../../styles/ProjectsCarousel.scss";

// Balanced mode locked in
const balancedSettings = { 
  multiplier: 20, 
  perspective: 800, 
  stiffness: 180, 
  damping: 16 
};

const projects = [
  { title: "Project One", image: bg1, site: "#", code: "#", figma: "#" },
  { title: "Project Two", image: bg2, site: "#", code: "#", figma: "#" },
  { title: "Project Three", image: bg3, site: "#", code: "#", figma: "#" },
  { title: "Project Four", image: bg4, site: "#", code: "#", figma: "#" },
  { title: "Project Five", image: bg5, site: "#", code: "#", figma: "#" }
];

const slide = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1]
};

export default function ProjectsCarousel() {
  const [visible, setVisible] = useState([projects.length - 1, 0, 1]);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Springs for smooth feel
  const multiplier = useSpring(balancedSettings.multiplier, { stiffness: 120, damping: 20 });
  const perspective = useSpring(balancedSettings.perspective, { stiffness: 120, damping: 20 });
  const stiffnessSpring = useSpring(balancedSettings.stiffness, { stiffness: 120, damping: 20 });
  const dampingSpring = useSpring(balancedSettings.damping, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * multiplier.get();
    const rotateX = ((y / rect.height) - 0.5) * -multiplier.get();
    setTilt({ rotateX, rotateY });
  };

  const resetTilt = () => setTilt({ rotateX: 0, rotateY: 0 });

  const moveNext = () => {
    setVisible(([left, center, right]) => {
      const newCenter = right;
      const newLeft = center;
      const newRight = (right + 1) % projects.length;
      resetTilt();
      return [newLeft, newCenter, newRight];
    });
  };

  const movePrev = () => {
    setVisible(([left, center, right]) => {
      const newCenter = left;
      const newRight = center;
      const newLeft = (left - 1 + projects.length) % projects.length;
      resetTilt();
      return [newLeft, newCenter, newRight];
    });
  };

  const positions = [
    { x: -520, scale: 0.85, opacity: 0.25, z: -150, zIndex: 1 },
    { x: 0,    scale: 1,    opacity: 1,   z: 0,    zIndex: 3 },
    { x: 520,  scale: 0.85, opacity: 0.25, z: -150, zIndex: 1 }
  ];

  const sweepAngle = 75 + tilt.rotateY * 1.5;

  return (
    <div
      className="three-card-carousel"
      style={{ "--tilt-perspective": `${perspective.get()}px` }}
    >
      <button className="nav prev" onClick={movePrev}>‹</button>

      <div className="carousel-stage">
        {visible.map((projIndex, pos) => {
          const project = projects[projIndex];
          const isCenter = pos === 1;
          const isLeft = pos === 0;
          const isRight = pos === 2;
          const rimOpacity = isLeft || isRight ? 0.6 : 0;

          return (
            <motion.div
              key={projIndex}
              className={`card ${isCenter ? "center" : isLeft ? "left" : "right"}`}
              animate={{
                x: positions[pos].x,
                scale: positions[pos].scale,
                opacity: positions[pos].opacity,
                z: positions[pos].z,
                zIndex: positions[pos].zIndex
              }}
              transition={slide}
            >
              <motion.div
                className="card-tilt"
                style={isCenter ? { "--sweep-angle": `${sweepAngle}deg` } : undefined}
                animate={{
                  rotateX: isCenter ? tilt.rotateX : 0,
                  rotateY: isCenter ? tilt.rotateY : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: stiffnessSpring.get(),
                  damping: dampingSpring.get()
                }}
                onMouseMove={isCenter ? handleMouseMove : undefined}
                onMouseLeave={isCenter ? resetTilt : undefined}
              >
                {isLeft && (
                  <motion.div
                    className="rim rim-right"
                    aria-hidden="true"
                    animate={{ opacity: rimOpacity }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {isRight && (
                  <motion.div
                    className="rim rim-left"
                    aria-hidden="true"
                    animate={{ opacity: rimOpacity }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <img src={project.image} alt={project.title} />

                {isCenter && (
                  <>
                    <div className="light-sweep" />
                    <h3 className="title">{project.title}</h3>
                    <div className="buttons">
                      <a href={project.site} target="_blank" rel="noreferrer" className="btn-live">
                        🌐<span className="btn-label">Live Site</span>
                      </a>
                      <a href={project.code} target="_blank" rel="noreferrer" className="btn-code">
                        💻<span className="btn-label">Source Code</span>
                      </a>
                      <a href={project.figma} target="_blank" rel="noreferrer" className="btn-figma">
                        🎨<span className="btn-label">Figma Design</span>
                      </a>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <button className="nav next" onClick={moveNext}>›</button>
    </div>
  );
}
