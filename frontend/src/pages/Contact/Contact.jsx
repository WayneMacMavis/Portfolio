import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaEnvelope, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import useBreathingMotion from "../../hooks/useBreathingMotion";
import useScrollProgress from "../../hooks/useScrollProgress";
import { CONTACT_FADE_RANGE } from "../../config";
import contactImage from "../../Assets/contact-img.png";
import "../../styles/Contact.scss";

const modeOrder = ["subtle", "balanced", "extreme"];

// ...imports stay the same

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [setModeIndex] = useState(1); // start at "balanced"

  const sectionRef = useRef(null);

  // Fade logic
  const fadeProgress = useScrollProgress(sectionRef, CONTACT_FADE_RANGE);
  const eased = fadeProgress * fadeProgress * (3 - 2 * fadeProgress);
  const contactOpacity = 1 - Math.abs(eased - 0.5) * 2;

  const breathingSettings = { inhale: 2.2, exhale: 2.8, pause: 0.3 };

  // Breathing animations
  const { controls: formControls, ref: formRef } = useBreathingMotion({
    scaleRange: [1, 1.015],
    ...breathingSettings
  });
  const { controls: iconControls, ref: iconsRef } = useBreathingMotion({
    scaleRange: [1, 1.01],
    ...breathingSettings,
    cycleOffset:
      (breathingSettings.inhale +
        breathingSettings.exhale +
        breathingSettings.pause * 2) / 2
  });

  useEffect(() => {
    const handleKey = (event) => {
      if (!event || typeof event.key !== "string") return;
      const key = event.key.toLowerCase();
      if (key === "t" || key === "arrowright") {
        setModeIndex((prev) => (prev + 1) % modeOrder.length);
      } else if (key === "arrowleft") {
        setModeIndex((prev) => (prev - 1 + modeOrder.length) % modeOrder.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setModeIndex]);

// Updated backend form submission with environment detection
const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/contact"
    : "https://portfolio-c6vy.onrender.com/contact";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (res.ok) {
      console.log(data.success);
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 2500);
    } else {
      console.error(data.error || "Failed to send message");
    }
  } catch (err) {
    console.error("Form submission error:", err);
  }
};


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const iconVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <section
      className="contact"
      id="contact"
      ref={sectionRef}
      style={{ opacity: contactOpacity }}
    >
      <div className={`contact__inner ${iconHovered ? "hover-sync" : ""}`}>
        {/* Left column */}
        <div className="contact__image">
          <img src={contactImage} alt="Contact visual" />
        </div>

        {/* Right column */}
        <div className="contact__content">
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

          {/* Backend-enabled form */}
          <motion.form
            className="contact__form"
            ref={formRef}
            animate={iconHovered ? { scale: [1, 1.015, 1] } : formControls}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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

          {/* Social icons */}
          <motion.div
            className="contact__socials"
            ref={iconsRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { href: "tel:+27728627957", label: "Phone", icon: <FaPhone />, className: "phone" },
              { href: "mailto:you@example.com", label: "Email", icon: <FaEnvelope />, className: "email" },
              { href: "https://github.com/yourusername", label: "GitHub", icon: <FaGithub />, className: "github" },
              { href: "https://linkedin.com/in/yourusername", label: "LinkedIn", icon: <FaLinkedin />, className: "linkedin" },
              { href: "https://facebook.com/yourusername", label: "Facebook", icon: <FaFacebook />, className: "facebook" }
            ].map(({ href, label, icon, className }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className={`tooltip ${className}`}
                data-tooltip={label}
                variants={iconVariants}
                animate={iconControls}
                whileHover={{
                  scale: 1.2,
                  transition: { type: "spring", stiffness: 300, damping: 10 }
                }}
                onHoverStart={() => setIconHovered(true)}
                onHoverEnd={() => setIconHovered(false)}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
