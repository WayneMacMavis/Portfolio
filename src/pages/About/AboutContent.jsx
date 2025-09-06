// src/components/About/AboutContent.jsx
import { motion } from "framer-motion";

export default function AboutContent({
  textY,
  textContainerVariants,
  textItemVariants,
  highlightVariants,
  funfactBoxShadow
}) {
  return (
    <motion.div
      className="about__content"
      style={{ y: textY }}
      variants={textContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      <h1 className="about__heading">
        <motion.span variants={textItemVariants}>About Me</motion.span>
        <motion.span
          className="about__underline"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
        />
      </h1>

      <p>
        <motion.span variants={textItemVariants}>
          I’m Wayne — a{" "}
          <motion.span variants={highlightVariants} className="highlight">
            full‑stack developer
          </motion.span>{" "}
          and creative engineer who blends{" "}
          <motion.span variants={highlightVariants} className="highlight">
            technical precision
          </motion.span>{" "}
          with playful, original design. I’ve built everything from{" "}
          <motion.span variants={highlightVariants} className="highlight">
            immersive front‑end experiences
          </motion.span>{" "}
          to scalable back‑end systems — always chasing that feeling when
          an interface becomes a story.
        </motion.span>
      </p>

      <p>
        <motion.span variants={textItemVariants}>
          My work starts with intention:{" "}
          <motion.span variants={highlightVariants} className="highlight">
            every interaction should feel earned
          </motion.span>
          . From micro‑timed reveals to breathing layouts, I design for
          rhythm, clarity, and a touch of whimsy. If something doesn’t
          belong, it goes — composition is everything.
        </motion.span>
      </p>

      <p>
        <motion.span variants={textItemVariants}>
          I love blending{" "}
          <motion.span variants={highlightVariants} className="highlight">
            illustration, animation, and interactivity
          </motion.span>{" "}
          into cohesive narratives. The web is my canvas, and my goal is to
          make the experience feel{" "}
          <motion.span variants={highlightVariants} className="highlight">
            memorable
          </motion.span>
          — personal enough to smile at, and crafted enough to trust.
        </motion.span>
      </p>

      {/* Fun Facts strip */}
      <motion.div
        className="about__funfacts"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={textContainerVariants}
      >
        {[
          { label: "Favourite Debugging Snack", value: "Salt & Vinegar Chips" },
          { label: "Most Used CSS Property", value: "transform" },
          { label: "First Line of Code", value: "print('Hello World')" },
          { label: "Current Obsession", value: "Micro‑interactions" },
        ].map((fact, i) => (
          <motion.div
            key={i}
            className="funfact"
            variants={textItemVariants}
            style={{ boxShadow: funfactBoxShadow }}
          >
            <motion.span
              className="funfact__label"
              variants={highlightVariants}
            >
              {fact.label}:
            </motion.span>{" "}
            <span className="funfact__value">{fact.value}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
