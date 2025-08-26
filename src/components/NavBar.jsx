import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './NavBar.scss';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["Home", "Projects", "About", "Contact"];

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="logo">🌟 MyPortfolio</div>

      <div 
        className={`menu-toggle ${isOpen ? "open" : ""}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={isOpen ? "active" : ""}>
        {navLinks.map(link => (
          <motion.li 
            key={link}
            whileHover={{ scale: 1.1, color: "#ff6f61" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {link}
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}