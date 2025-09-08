import { useEffect } from "react";

export default function useSkillsFloat() {
  useEffect(() => {
    const skillsSection = document.querySelector(".skills");
    const icons = document.querySelectorAll(".skill-card__icon");
    if (!skillsSection || !icons.length) return;

    let targetScrollY = 0, currentScrollY = 0;
    let targetMouseX = 0, currentMouseX = 0;
    let targetMouseY = 0, currentMouseY = 0;
    let targetTiltX = 0, currentTiltX = 0;
    let targetTiltY = 0, currentTiltY = 0;
    let targetLight = 0.5, currentLight = 0.5;

    // Track glint trigger state per icon
    const wasAboveThreshold = new WeakMap();
    const lastGlintTime = new WeakMap();

    const tiltThreshold = 4; // degrees
    const GLINT_COOLDOWN = 1500; // ms between glints per icon

    let holdTimeout, rafId;

    function updateTargetScrollOffset() {
      const rect = skillsSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const distanceFromCenter = sectionCenter - viewportHeight / 2;
      targetScrollY = Math.max(-4, Math.min(4, distanceFromCenter / 50));
    }

    function updateTargetMouseOffset(e) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const distX = e.clientX - vw / 2;
      const distY = e.clientY - vh / 2;

      targetMouseX = Math.max(-3, Math.min(3, distX / 100));
      targetMouseY = Math.max(-3, Math.min(3, distY / 100));

      targetTiltY = Math.max(-6, Math.min(6, distX / 40));
      targetTiltX = Math.max(-6, Math.min(6, -distY / 40));

      const normX = distX / (vw / 2);
      const normY = distY / (vh / 2);
      targetLight = 0.5 + (-normX - normY) * 0.15;
      targetLight = Math.max(0.2, Math.min(0.8, targetLight));
    }

    function animate() {
      const ease = 0.08;
      currentScrollY += (targetScrollY - currentScrollY) * ease;
      currentMouseX += (targetMouseX - currentMouseX) * ease;
      currentMouseY += (targetMouseY - currentMouseY) * ease;
      currentTiltX += (targetTiltX - currentTiltX) * ease;
      currentTiltY += (targetTiltY - currentTiltY) * ease;
      currentLight += (targetLight - currentLight) * ease;

      const combinedY = currentScrollY + currentMouseY;

      skillsSection.style.setProperty("--scroll-offset-x", `${currentMouseX.toFixed(2)}px`);
      skillsSection.style.setProperty("--scroll-offset-y", `${combinedY.toFixed(2)}px`);
      skillsSection.style.setProperty("--tilt-x", `${currentTiltX.toFixed(2)}deg`);
      skillsSection.style.setProperty("--tilt-y", `${currentTiltY.toFixed(2)}deg`);
      skillsSection.style.setProperty("--light-intensity", currentLight.toFixed(2));

      // Glint trigger only on threshold crossing + cooldown
      icons.forEach(icon => {
        const tiltMagnitude = Math.max(Math.abs(currentTiltX), Math.abs(currentTiltY));
        const wasAbove = wasAboveThreshold.get(icon) || false;
        const lastTime = lastGlintTime.get(icon) || 0;
        const now = performance.now();

        if (tiltMagnitude > tiltThreshold && !wasAbove && now - lastTime > GLINT_COOLDOWN) {
          icon.setAttribute("data-glint", "");
          lastGlintTime.set(icon, now);
          setTimeout(() => icon.removeAttribute("data-glint"), 1000); // match animation duration
          wasAboveThreshold.set(icon, true);
        } else if (tiltMagnitude <= tiltThreshold) {
          wasAboveThreshold.set(icon, false);
        }
      });

      rafId = requestAnimationFrame(animate);
    }

    function handleMouseEnter() {
      clearTimeout(holdTimeout);
      skillsSection.setAttribute("data-hold", "");
    }

    function handleMouseLeave() {
      clearTimeout(holdTimeout);
      holdTimeout = setTimeout(() => {
        skillsSection.removeAttribute("data-hold");
      }, 1000);
    }

    icons.forEach(icon => {
      icon.addEventListener("mouseenter", handleMouseEnter);
      icon.addEventListener("mouseleave", handleMouseLeave);
      wasAboveThreshold.set(icon, false);
      lastGlintTime.set(icon, 0);
    });

    window.addEventListener("scroll", updateTargetScrollOffset, { passive: true });
    window.addEventListener("resize", updateTargetScrollOffset);
    window.addEventListener("mousemove", updateTargetMouseOffset, { passive: true });

    updateTargetScrollOffset();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateTargetScrollOffset);
      window.removeEventListener("resize", updateTargetScrollOffset);
      window.removeEventListener("mousemove", updateTargetMouseOffset);
      icons.forEach(icon => {
        icon.removeEventListener("mouseenter", handleMouseEnter);
        icon.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);
}
