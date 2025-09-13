// pages/Projects.jsx
import React from "react";
import "../../styles/Projects.scss";
import ProjectsCarousel from "../Projects/ProjectsCarousel";

export default function Projects() {
  return (
    <main id="projects" className="projects-page">
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
