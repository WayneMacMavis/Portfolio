import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../Assets/nav_icon.svg";
import './NavBar.scss';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["Home", "About", "Skills", "Projects", "Contact"];

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

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
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
   <a href="#home" className="navbar__brand">
  <img src={logo} alt="Portfolio logo" className="navbar__icon" />
  <span className='logo'>Portfolio</span>
</a>

      {/* Desktop links (show on desktop, hide on mobile via CSS) */}
      <ul className="nav-links">
        {navLinks.map(link => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`}>{link}</a>
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
            />

            {/* Full-screen UL catches clicks outside links */}
            <motion.ul
              className="mobile-menu-links"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeMenu} // click anywhere closes
            >
              {navLinks.map(link => (
                <motion.li 
                  key={link}
                  variants={linkVariants}
                  whileHover={{ scale: 1.05 }}
                  onClick={e => e.stopPropagation()} // prevent UL click from firing when tapping a link area
                >
                  <a href={`#${link.toLowerCase()}`} onClick={closeMenu}>
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
