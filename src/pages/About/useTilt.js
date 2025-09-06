// src/components/About/useTilt.js
import { useState } from "react";

export default function useTilt() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;   // mouse X within element
    const y = e.clientY - rect.top;    // mouse Y within element

    // Map mouse position to rotation angles
    const rotateY = ((x / rect.width) - 0.5) * 6;   // horizontal tilt
    const rotateX = ((y / rect.height) - 0.5) * -6; // vertical tilt

    setTilt({ rotateX, rotateY });
  };

  const resetTilt = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return { tilt, handleMouseMove, resetTilt, setTilt };
}
