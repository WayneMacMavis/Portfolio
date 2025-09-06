import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaSass,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaJs
} from "react-icons/fa";
import "../../styles/skills/Skills.scss";

const skills = [
  { name: "HTML", color: "#E44D26", icon: <FaHtml5 />, description: "Semantic, accessible markup for solid foundations", hover: { rotate: 10 } },
  { name: "CSS", color: "#1572B6", icon: <FaCss3Alt />, description: "Pixel‑perfect layouts with responsive finesse", hover: { scale: 1.2 } },
  { name: "Sass", color: "#CC6699", icon: <FaSass />, description: "Modular, DRY styling with mixins and variables", hover: { y: -5 } },
  { name: "SCSS", color: "#CC6699", icon: <FaSass />, description: "Structured Sass syntax for maintainable codebases", hover: { y: -5 } },
  { name: "JavaScript", color: "#F7DF1E", icon: <FaJs />, description: "Dynamic, interactive experiences with clean logic", hover: { rotate: 360, transition: { type: "tween", duration: 0.6 } } },
  { name: "React", color: "#61DAFB", icon: <FaReact />, description: "Component‑driven UIs with smooth state management", hover: { rotate: 360, transition: { type: "tween", duration: 0.6 } } },
  { name: "Node.js", color: "#68A063", icon: <FaNodeJs />, description: "Fast, scalable backend APIs and services", hover: { scale: 1.3 } },
  { name: "Python", color: "#3776AB", icon: <FaPython />, description: "Data scripts, automation, and backend logic", hover: { scale: 1.2, rotate: -5 } },
  { name: "Git & GitHub", color: "#181717", icon: <FaGitAlt />, description: "Version control and collaborative workflows", hover: { rotate: -10 } },
  { name: "Figma", color: "#F24E1E", icon: <FaFigma />, description: "UI/UX design and prototyping with precision", hover: { y: 5 } }
];

export default function Skills() {
  return (
    <section className="skills">
      <h2 className="skills__heading">Skills & Tools</h2>
      <div className="skills__grid">
        {skills.map((skill, index) => (
          <motion.div
            className="skill-card"
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={skill.hover}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: index * 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              className="skill-card__icon"
              style={{ backgroundColor: skill.color, color: "#fff" }}
            >
              {skill.icon}
            </div>
            <span className="skill-card__name">{skill.name}</span>
            <div
              className="skill-card__tooltip"
              style={{ backgroundColor: skill.color }}
            >
              {skill.description}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}