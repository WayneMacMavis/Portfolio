import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiFolder, FiMail } from "react-icons/fi";
import logo from "../Assets/nav_icon.svg";
import '../styles/NavBar.scss';
import useScrollProgress from "../hooks/useScrollProgress";

// Map each link to an icon
const NAV_LINKS = [
  { name: "Home", icon: <FiHome /> },
  { name: "About", icon: <FiUser /> },
  { name: "Skills", icon: <FiCode /> },
  { name: "Projects", icon: <FiFolder /> },
  { name: "Contact", icon: <FiMail /> }
];

export default function NavBar() {
  // Shared eased fade (same curve/range as hero for sync)
  const fadeAmount = useScrollProgress(0, 200, 0.2);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver to track active section
  useEffect(() => {
    const sections = NAV_LINKS.map(link => document.getElementById(link.name.toLowerCase()));
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveLink(id.charAt(0).toUpperCase() + id.slice(1));
          }
        }
      },
      { threshold: 0.6 }
    );
    sections.forEach(sec => sec && observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  // Helper to render a nav link (desktop or mobile)
  const renderNavLink = (name, icon, isMobile = false) => {
    const isActive = activeLink === name;
    const isNearby = !isActive && fadeAmount > 0.5;
    const baseGlow = isMobile ? 10 : 8;
    const glowSize = isActive ? baseGlow : baseGlow * fadeAmount;

    return (
      <a
        href={`#${name.toLowerCase()}`}
        onClick={isMobile ? closeMenu : undefined}
        className={isActive ? "active" : ""}
      >
       <motion.span
  className={`nav-icon ${isNearby ? "pulse" : ""}`}
  style={{
    color: isActive ? "var(--accent-color)" : "inherit",
    '--glow-size': `${glowSize}px`
  }}
  whileHover={{ scale: 1.2, rotate: 5 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  {icon}
</motion.span>
        <span className="nav-text">{name}</span>
      </a>
    );
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      style={{ '--fade-opacity': fadeAmount }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Brand */}
      <a href="#home" className="navbar__brand">
        <img src={logo} alt="Portfolio logo" className="navbar__icon" />
        <span className='logo'>Portfolio</span>
      </a>

      {/* Desktop Nav */}
      <ul className="nav-links">
        {NAV_LINKS.map(({ name, icon }) => (
          <li key={name}>{renderNavLink(name, icon)}</li>
        ))}
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span><span></span><span></span>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeMenu}
            />
            <motion.ul
              className="mobile-menu-links"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {NAV_LINKS.map(({ name, icon }) => (
                <motion.li
                  key={name}
                  variants={linkVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  {renderNavLink(name, icon, true)}
                </motion.li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
