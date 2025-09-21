import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiFolder, FiMail } from "react-icons/fi";
import logo from "../Assets/nav_icon.svg";
import useScrollProgress from "../hooks/useScrollProgress";
import DownloadCvBtn from "../components/DownloadCvBtn";
import { HERO_FADE_RANGE } from "../config";
import useThemeToggle from '../hooks/useThemeToggle';
import '../styles/NavBar.scss';

const NAV_LINKS = [
  { name: "Home", icon: FiHome },
  { name: "About", icon: FiUser },
  { name: "Skills", icon: FiCode },
  { name: "Projects", icon: FiFolder },
  { name: "Contact", icon: FiMail }
];

// Motion variants...
const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } }, exit: { opacity: 0, transition: { duration: 0.2 } } };
const mobileMenuContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }, exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } } };
const mobileLogoVariants = { hidden: { opacity: 0, y: -10, rotate: -5 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } } };
const mobileLinkVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } } };
const desktopLinksContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } };
const desktopLinkItem = { hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } } };
const logoVariants = { hidden: { opacity: 0, y: -10, rotate: -5 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } } };

// Scroll helper with navbar offset
const scrollToSection = (id, behavior = "smooth") => {
  const el = document.getElementById(id);
  if (!el) return;
  const nav = document.querySelector(".navbar");
  const navHeight = nav ? nav.getBoundingClientRect().height : 0;
  const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top: y, behavior });
};

// Nav Link Component
function NavLinkItem({ name, Icon, active, onClick, variants }) {
  const handleClick = (e) => {
    e.preventDefault();
    const id = name.toLowerCase();
    scrollToSection(id, "smooth");
    if (onClick) onClick();
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

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
        animate={active ? { scale: 1.05, rotate: 0 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Icon />
      </motion.span>
      <span className="nav-text">{name}</span>
    </motion.a>
  );
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const sectionsRef = useRef([]);
  const homeRef = useRef(null);
  const tickingRef = useRef(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  const { theme, toggleTheme } = useThemeToggle();

  useEffect(() => {
    const homeEl = document.getElementById("home");
    if (homeEl) homeRef.current = homeEl;
  }, []);

  const homeFadeProgress = useScrollProgress(homeRef, HERO_FADE_RANGE);

  // ✅ Moved up here so it's defined before use
  const evaluateActiveSection = useCallback(() => {
    const sections = sectionsRef.current;
    if (!sections.length) return;
    const focus = window.innerHeight * 0.5;
    let winner = null;
    for (const el of sections) {
      const r = el.getBoundingClientRect();
      if (r.top <= focus && r.bottom >= focus) {
        winner = el;
        break;
      }
    }
    if (!winner) {
      let best = { el: null, dist: Infinity };
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - focus);
        if (dist < best.dist) best = { el, dist };
      }
      winner = best.el;
    }
    if (!winner) return;
    const id = winner.id;
    const formatted = id.charAt(0).toUpperCase() + id.slice(1);
    if (homeRef.current) {
      const rh = homeRef.current.getBoundingClientRect();
      const focusInsideHome = rh.top <= focus && rh.bottom >= focus;
      if (homeFadeProgress < 1 && focusInsideHome) {
        if (activeLink !== "Home") {
          setActiveLink("Home");
          if (window.location.hash !== "#home") {
            window.history.replaceState(null, "", "#home");
          }
        }
        return;
      }
    }
    if (activeLink !== formatted) {
      setActiveLink(formatted);
      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, "", `#${id}`);
      }
    }
  }, [activeLink, homeFadeProgress]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.name.toLowerCase());
    sectionsRef.current = ids.map(id => document.getElementById(id)).filter(Boolean);

    const handleResize = () => {
      sectionsRef.current = ids.map(id => document.getElementById(id)).filter(Boolean);
      evaluateActiveSection();
    };

    window.addEventListener("resize", handleResize);
    const ready = () => evaluateActiveSection();
    if (document.readyState === "complete" || document.readyState === "interactive") {
      ready();
    } else {
      window.addEventListener("DOMContentLoaded", ready, { once: true });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("DOMContentLoaded", ready);
    };
  }, [evaluateActiveSection]);

  useEffect(() => {
    const onScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          evaluateActiveSection();
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(evaluateActiveSection, 50);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, [homeFadeProgress, evaluateActiveSection]);


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
