import { motion } from "framer-motion";
import "../styles/DownloadCvBtn.scss";

export default function DownloadCVButton({ label = "", filePath = "/Wayne-CV.pdf" }) {
  return (
    <motion.a
      href={filePath}
      download
      className="cv-button"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="cv-icon">📄</span>
      {label}
    </motion.a>
  );
}
