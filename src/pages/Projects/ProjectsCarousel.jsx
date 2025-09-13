// ProjectsCarousel.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import bg1 from "../../Assets/bg1.jpg";
import bg2 from "../../Assets/bg2.jpg";
import bg3 from "../../Assets/bg3.jpg";
import bg4 from "../../Assets/bg4.jpg";
import bg5 from "../../Assets/bg5.jpg";
import "../../styles/ProjectsCarousel.scss";

const projects = [
  { title: "Project One", image: bg1, site: "#", code: "#", figma: "#" },
  { title: "Project Two", image: bg2, site: "#", code: "#", figma: "#" },
  { title: "Project Three", image: bg3, site: "#", code: "#", figma: "#" },
  { title: "Project Four", image: bg4, site: "#", code: "#", figma: "#" },
  { title: "Project Five", image: bg5, site: "#", code: "#", figma: "#" },
];

const slide = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1]
};

export default function ProjectsCarousel() {
  const [visible, setVisible] = useState([
    projects.length - 1, // left
    0,                   // center
    1                    // right
  ]);

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, sweepAngle: 75 });

  const moveNext = () => {
    setVisible(([left, center, right]) => {
      const newCenter = right;
      const newLeft = center;
      const newRight = (right + 1) % projects.length;
      return [newLeft, newCenter, newRight];
    });
  };

  const movePrev = () => {
    setVisible(([left, center, right]) => {
      const newCenter = left;
      const newRight = center;
      const newLeft = (left - 1 + projects.length) % projects.length;
      return [newLeft, newCenter, newRight];
    });
  };

  const positions = [
    { x: -520, scale: 0.85, opacity: 0.25, rotateY: 25, z: -150, zIndex: 1 }, // left
    { x: 0, scale: 1, opacity: 1, rotateY: 0, z: 0, zIndex: 3 },              // center
    { x: 520, scale: 0.85, opacity: 0.25, rotateY: -25, z: -150, zIndex: 1 }  // right
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const sweepAngle = 75 + rotateY * 1.5;
    setTilt({ rotateX, rotateY, sweepAngle });
  };

  const resetTilt = () => {
    setTilt({ rotateX: 0, rotateY: 0, sweepAngle: 75 });
  };

  return (
    <div className="three-card-carousel">
      <button className="nav prev" onClick={movePrev}>‹</button>

      <div className="carousel-stage">
        {visible.map((projIndex, pos) => {
          const project = projects[projIndex];
          const isCenter = pos === 1;
          const isLeft = pos === 0;
          const isRight = pos === 2;

          // Rim opacity: fade in for side cards, off for center
          const rimOpacity = isLeft || isRight ? 0.6 : 0;

          return (
            <motion.div
              key={projIndex}
              className={`card ${isCenter ? "center" : isLeft ? "left" : "right"}`}
              style={isCenter ? { "--sweep-angle": `${tilt.sweepAngle}deg` } : {}}
              animate={{
                x: positions[pos].x,
                scale: positions[pos].scale,
                opacity: positions[pos].opacity,
                rotateY: positions[pos].rotateY + (isCenter ? tilt.rotateY : 0),
                rotateX: isCenter ? tilt.rotateX : 0,
                z: positions[pos].z,
                zIndex: positions[pos].zIndex
              }}
              transition={slide}
              drag={isCenter ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500;
                if (swipe) {
                  if (offset.x < 0) moveNext();
                  else movePrev();
                }
              }}
              onMouseMove={isCenter ? handleMouseMove : undefined}
              onMouseLeave={isCenter ? resetTilt : undefined}
            >
              {/* Rim-light overlays for side cards with animated opacity */}
              {isLeft && (
                <motion.div
                  className="rim rim-right"
                  aria-hidden="true"
                  animate={{ opacity: rimOpacity }}
                  transition={{ duration: 0.4 }}
                />
              )}
              {isRight && (
                <motion.div
                  className="rim rim-left"
                  aria-hidden="true"
                  animate={{ opacity: rimOpacity }}
                  transition={{ duration: 0.4 }}
                />
              )}

              <img src={project.image} alt={project.title} />

              {isCenter && (
                <>
                  <div className="light-sweep" />
                  <h3 className="title">{project.title}</h3>
                  <div className="buttons">
  <a href={project.site} target="_blank" rel="noreferrer" className="btn-live">
    🌐
    <span className="btn-label">Live Site</span>
  </a>
  <a href={project.code} target="_blank" rel="noreferrer" className="btn-code">
    💻
    <span className="btn-label">Source Code</span>
  </a>
  <a href={project.figma} target="_blank" rel="noreferrer" className="btn-figma">
    🎨
    <span className="btn-label">Figma Design</span>
  </a>
</div>


                </>
              )}
            </motion.div>
          );
        })}
      </div>

      <button className="nav next" onClick={moveNext}>›</button>
    </div>
  );
}