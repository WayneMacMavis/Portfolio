// src/components/About/AboutFunFacts.jsx
import { motion } from "framer-motion";

export default function AboutFunFacts({
  funfactsY,
  textContainerVariants,
  textItemVariants,
  highlightVariants,
  funfactBoxShadow
}) {
  const facts = [
    { label: "Favourite Debugging Snack", value: "Salt & Vinegar Chips" },
    { label: "Most Used CSS Property", value: "transform" },
    { label: "First Line of Code", value: "print('Hello World')" },
    { label: "Current Obsession", value: "Micro‑interactions" },
  ];

  // Spark burst animation
  const sparkVariants = {
    initial: { scale: 0, opacity: 0 },
    burst: {
      scale: [0, 1.2, 0.8, 0],
      opacity: [0, 1, 1, 0],
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="about__funfacts"
      style={{ y: funfactsY }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={textContainerVariants}
    >
      {facts.map((fact, i) => (
        <motion.div
          key={i}
          className="funfact"
          variants={textItemVariants}
          style={{ boxShadow: funfactBoxShadow }}
        >
          <motion.span
            className="funfact__label"
            variants={highlightVariants}
            onHoverStart={(e) => {
              const spark = e.currentTarget.querySelector(".spark");
              spark && spark.start("burst");
            }}
          >
            {fact.label}:
            {/* Spark element */}
            <motion.span
              className="spark"
              variants={sparkVariants}
              initial="initial"
              animate="initial"
              whileHover="burst"
            />
          </motion.span>{" "}
          <span className="funfact__value">{fact.value}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
