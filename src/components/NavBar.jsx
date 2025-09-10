import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiFolder, FiMail } from "react-icons/fi";
import logo from "../Assets/nav_icon.svg";
import '../styles/NavBar.scss';
import useScrollProgress from "../hooks/useScrollProgress";

// Config
const NAV_LINKS = [
  { name: "Home", icon: FiHome },
  { name: "About", icon: FiUser },
  { name: "Skills", icon: FiCode },
  { name: "Projects", icon: FiFolder },
  { name: "Contact", icon: FiMail }
];

// Motion variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

// Mobile menu container — logo first, then links ripple
const mobileMenuContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
};

const mobileLogoVariants = {
  hidden: { opacity: 0, y: -10, rotate: -5 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
};

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
};

// Desktop ripple
const desktopLinksContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4 // after logo
    }
  }
};

const desktopLinkItem = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
};

// Logo intro (desktop)
const logoVariants = {
  hidden: { opacity: 0, y: -10, rotate: -5 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
};

// Reusable Nav Link Component
function NavLinkItem({ name, Icon, active, onClick, variants }) {
  return (
    <motion.a
      href={`#${name.toLowerCase()}`}
      onClick={onClick}
      className={`nav-link ${active ? "active" : ""}`}
      aria-current={active ? "page" : undefined}
      variants={variants}
    >
      <motion.span
        className="nav-icon"
        whileHover={{ scale: 1.15, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
        animate={active ? { scale: 1.05, rotate: 0 } : { scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <Icon />
      </motion.span>
      <span className="nav-text">{name}</span>
    </motion.a>
  );
}

export default function NavBar() {
  const fadeAmount = useScrollProgress(0, 200, 0.2);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const sectionsRef = useRef([]);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    sectionsRef.current = NAV_LINKS.map(link => document.getElementById(link.name.toLowerCase()));
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
    sectionsRef.current.forEach(sec => sec && observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      style={{ '--fade-opacity': fadeAmount }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Brand (desktop) */}
      <motion.a
        href="#home"
        className="navbar__brand"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      >
        <img src={logo} alt="Portfolio logo" className="navbar__icon" />
        <span className='logo'>Portfolio</span>
      </motion.a>

      {/* Desktop Nav with ripple */}
      <motion.ul
        className="nav-links"
        variants={desktopLinksContainer}
        initial="hidden"
        animate="visible"
      >
        {NAV_LINKS.map(({ name, icon: Icon }) => (
          <li key={name}>
            <NavLinkItem
              name={name}
              Icon={Icon}
              active={activeLink === name}
              variants={desktopLinkItem}
            />
          </li>
        ))}
      </motion.ul>

      {/* Mobile Menu Toggle */}
      <button
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
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
              variants={mobileMenuContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Mobile logo intro */}
              <motion.li variants={mobileLogoVariants} style={{ marginBottom: '1.5rem' }}>
                <a href="#home" onClick={closeMenu} className="navbar__brand">
                  <img src={logo} alt="Portfolio logo" className="navbar__icon" />
                  <span className='logo'>Portfolio</span>
                </a>
              </motion.li>

              {/* Mobile links ripple after logo */}
              {NAV_LINKS.map(({ name, icon: Icon }) => (
                <motion.li key={name} variants={mobileLinkVariants}>
                  <NavLinkItem
                    name={name}
                    Icon={Icon}
                    active={activeLink === name}
                    onClick={closeMenu}
                  />
                </motion.li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
