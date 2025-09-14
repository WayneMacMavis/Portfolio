import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useBreathingMotion from "../../hooks/useBreathingMotion";
import "../../styles/Contact.scss";

export default function Contact() {
  const [sent, setSent] = useState(false);

  // Breathing animation controls
  const breathingControls = useBreathingMotion({
    scaleRange: [1, 1.015],
    duration: 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <section className="contact" id="contact">
      {/* Header */}
      <motion.div
        className="contact__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1>Let’s Connect</h1>
        <p>
          Whether you’ve got a project in mind, a question, or just want to say hi — I’d love to hear from you.
        </p>
      </motion.div>

      {/* Form with breathing + fade-in */}
      <motion.form
        className="contact__form"
        animate={breathingControls} // breathing loop
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }} // fade-in on scroll
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit}
      >
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Message
          <textarea name="message" rows="5" required></textarea>
        </label>

        {/* Morphing button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className={sent ? "sent" : ""}
        >
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                ✓ Sent!
              </motion.span>
            ) : (
              <motion.span
                key="text"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                Send Message
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.form>

      {/* Social links */}
      <motion.div
        className="contact__socials"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <a href="mailto:you@example.com">Email</a>
        <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer">LinkedIn</a>
      </motion.div>
    </section>
  );
}