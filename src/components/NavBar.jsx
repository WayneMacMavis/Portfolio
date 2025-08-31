import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../assets/nav_icon.svg";
import './NavBar.scss';

// ✅ Moved outside so it's a stable reference
const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  // Detect scroll for navbar shrink
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const sections = NAV_LINKS.map(link => document.getElementById(link.toLowerCase()));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1));
          }
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach(sec => sec && observer.observe(sec));
    return () => observer.disconnect();
  }, []); // ✅ No warning now

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

  return (
    <motion.nav 
  className={`navbar ${scrolled ? "scrolled" : ""}`}
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }} // slightly shorter
>
      <a href="#home" className="navbar__brand">
        <img src={logo} alt="Portfolio logo" className="navbar__icon" />
        <span className='logo'>Portfolio</span>
      </a>

      {/* Desktop links */}
      <ul className="nav-links">
        {NAV_LINKS.map(link => (
          <li key={link}>
            <a 
              href={`#${link.toLowerCase()}`} 
              className={activeLink === link ? "active" : ""}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger toggle */}
      <button 
        className={`menu-toggle ${isOpen ? "open" : ""}`} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span><span></span><span></span>
      </button>

      {/* Mobile overlay + links */}
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
              {NAV_LINKS.map(link => (
                <motion.li 
                  key={link}
                  variants={linkVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    onClick={closeMenu}
                    className={activeLink === link ? "active" : ""}
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
