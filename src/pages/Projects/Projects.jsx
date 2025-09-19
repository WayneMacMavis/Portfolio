import React, { useRef } from "react";
import "../../styles/Projects.scss";
import ProjectsCarousel from "../Projects/ProjectsCarousel";
import useScrollProgress from "../../hooks/useScrollProgress";
import { PROJECTS_FADE_RANGE } from "../../config";

export default function Projects() {
  const mainRef = useRef(null);

  // Symmetrical fade logic
  const fadeProgress = useScrollProgress(mainRef, PROJECTS_FADE_RANGE);
  const eased = fadeProgress * fadeProgress * (3 - 2 * fadeProgress); // smoothstep
  const projectsOpacity = 1 - Math.abs(eased - 0.5) * 2;

  return (
    <main
      id="projects"
      className="projects-page"
      ref={mainRef}
      style={{ opacity: projectsOpacity }}
    >
      <section className="projects-header">
        <h1 className="page-title">My Projects</h1>
        <p className="page-subtitle">
          A curated selection of my work — blending technical depth with playful, original design.
        </p>
      </section>

      <section className="projects-content">
        <ProjectsCarousel />
      </section>
    </main>
  );
}
