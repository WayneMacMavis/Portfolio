import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiFolder, FiMail } from "react-icons/fi";
import logo from "../Assets/nav_icon.svg";
import DownloadCvBtn from "../components/DownloadCvBtn";
import useThemeToggle from '../hooks/useThemeToggle';
import '../styles/NavBar.scss';

const NAV_LINKS = [
  { name: "Home", icon: FiHome },
  { name: "About", icon: FiUser },
  { name: "Skills", icon: FiCode },
  { name: "Projects", icon: FiFolder },
  { name: "Contact", icon: FiMail }
];

// Motion variants
const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } }, exit: { opacity: 0, transition: { duration: 0.2 } } };
const mobileMenuContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }, exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } } };
const mobileLogoVariants = { hidden: { opacity: 0, y: -10, rotate: -5 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } } };
const mobileLinkVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } } };
const desktopLinksContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } };
const desktopLinkItem = { hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } } };
const logoVariants = { hidden: { opacity: 0, y: -10, rotate: -5 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } } };

// Memoized NavLinkItem
const NavLinkItem = React.memo(function NavLinkItem({ name, Icon, active, onClick, variants, scrollToSection }) {
  const handleClick = useCallback((e) => {
    e.preventDefault();
    const id = name.toLowerCase();
    scrollToSection(id, "smooth");
    onClick?.();
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `#${id}`);
    }
  }, [name, onClick, scrollToSection]);

  return (
    <motion.a
      href={`#${name.toLowerCase()}`}
      onClick={handleClick}
      className={`nav-link ${active ? "active" : ""}`}
      aria-current={active ? "page" : undefined}
      variants={variants}
    >
      <motion.span
        className="nav-icon"
        whileHover={{ scale: 1.15, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
        animate={active ? { scale: 1.05 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Icon />
      </motion.span>
      <span className="nav-text">{name}</span>
    </motion.a>
  );
});

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const navHeightRef = useRef(0);
  const sectionsRef = useRef([]);

  const { theme, toggleTheme } = useThemeToggle();

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  // Cache navbar height
  useEffect(() => {
    const nav = document.querySelector(".navbar");
    if (nav) navHeightRef.current = nav.getBoundingClientRect().height;
  }, []);

  // IntersectionObserver for active section detection + URL hash update
useEffect(() => {
  const ids = NAV_LINKS.map(l => l.name.toLowerCase());
  sectionsRef.current = ids.map(id => document.getElementById(id)).filter(Boolean);

  const onScroll = () => {
    const scrollY = window.scrollY + navHeightRef.current + 1;
    const pageBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;

    let currentSection = null;
    for (const sec of sectionsRef.current) {
      if (scrollY >= sec.offsetTop) {
        currentSection = sec.id;
      }
    }

    // 👇 Force Contact active if at bottom of page
    if (pageBottom) {
      currentSection = "contact";
    }

    if (currentSection && currentSection !== activeLink.toLowerCase()) {
      const formatted = currentSection.charAt(0).toUpperCase() + currentSection.slice(1);
      setActiveLink(formatted);
      if (window.location.hash !== `#${currentSection}`) {
        window.history.replaceState(null, "", `#${currentSection}`);
      }
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on mount

  return () => window.removeEventListener("scroll", onScroll);
}, [activeLink]);


  // Scroll listener for scrolled state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = useCallback((id, behavior = "smooth") => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - navHeightRef.current;
    window.scrollTo({ top: y, behavior });
  }, []);
  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Left side */}
      <div className="nav-left">
        <motion.a
          href="#home"
          className="navbar__brand"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home", "smooth");
            if (window.location.hash !== "#home") {
              window.history.replaceState(null, "", "#home");
            }
          }}
        >
          <span className='logo'>Portfolio</span>
          <DownloadCvBtn />
        </motion.a>
      </div>

      {/* Theme toggle */}
      <button
        id="theme-toggle"
        className={`theme-toggle ${theme}-mode`}
        aria-label="Toggle theme"
        type="button"
        onClick={toggleTheme}
      >
        <motion.span
          className="icon sun"
          aria-hidden="true"
          animate={{ scale: theme === 'light' ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.25, times: [0, 0.5, 1], ease: "easeOut" }}
        >
          ☀️
        </motion.span>
        <motion.span
          className="icon moon"
          aria-hidden="true"
          animate={{ scale: theme === 'dark' ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.25, times: [0, 0.5, 1], ease: "easeOut" }}
        >
          🌙
        </motion.span>
        <motion.span
          className="toggle-knob"
          aria-hidden="true"
          animate={{ x: theme === 'light' ? 40 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5, duration: 0.5 }}
        />
      </button>

      {/* Right side */}
      <div className="nav-right">
        {/* Desktop Nav */}
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
                onClick={undefined}
                scrollToSection={scrollToSection}
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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence presenceAffectsLayout={false}>
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
              <motion.li
                variants={mobileLogoVariants}
                style={{ marginBottom: '1.5rem' }}
              >
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("home", "smooth");
                    closeMenu();
                    if (window.location.hash !== "#home") {
                      window.history.replaceState(null, "", "#home");
                    }
                  }}
                  className="navbar__brand"
                >
                  <img src={logo} alt="Portfolio logo" className="navbar__icon" />
                  <span className='logo'>Portfolio</span>
                </a>
              </motion.li>

              {/* Mobile links */}
              {NAV_LINKS.map(({ name, icon: Icon }) => (
                <motion.li key={name} variants={mobileLinkVariants}>
                <NavLinkItem
  name={name}
  Icon={Icon}
  active={activeLink === name}
  onClick={(e) => {
    e.preventDefault();
    scrollToSection(name.toLowerCase(), "smooth");

    // 👇 Instantly set active link
    setActiveLink(name);

    // Update URL hash immediately
    if (window.location.hash !== `#${name.toLowerCase()}`) {
      window.history.replaceState(null, "", `#${name.toLowerCase()}`);
    }
  }}
  scrollToSection={scrollToSection}
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
