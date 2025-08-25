import React from 'react';
import { motion } from 'framer-motion';
import './NavBar.scss';

export default function NavBar() {
  const navLinks = ["Home", "Projects", "About", "Contact"];

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="logo">🌟 MyPortfolio</div>
      <ul>
        {navLinks.map((link, i) => (
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