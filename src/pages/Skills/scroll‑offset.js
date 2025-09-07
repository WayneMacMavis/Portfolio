// scroll-offset.js
export default function initScrollOffset() {
  const skillsSection = document.querySelector(".skills");
  if (!skillsSection) return;

  let lastScrollY = window.scrollY;
  let active = false;
  let currentOffset = 0;
  let targetOffset = 0;
  let velocity = 0;
  let rafId;
  let paused = false;
  let resumeTimeout;

  // Physics params (matching Framer Motion feel)
  const stiffness = 0.12; // spring strength
  const damping = 0.8;    // friction
  const restThreshold = 0.01;

  const update = () => {
    if (!paused) {
      const displacement = targetOffset - currentOffset;
      const acceleration = displacement * stiffness;
      velocity += acceleration;
      velocity *= damping;
      currentOffset += velocity;

      if (Math.abs(displacement) < restThreshold && Math.abs(velocity) < restThreshold) {
        currentOffset = targetOffset;
        velocity = 0;
      }

      skillsSection.style.setProperty("--scroll-offset", `${currentOffset.toFixed(2)}px`);
    }
    rafId = requestAnimationFrame(update);
  };

  const onScroll = () => {
    if (!active || paused) return;

    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    targetOffset = Math.max(Math.min(delta, 4), -4);
    lastScrollY = currentScrollY;

    clearTimeout(onScroll.timeout);
    onScroll.timeout = setTimeout(() => {
      targetOffset = 0;
    }, 150);
  };

  // Pause drift on hover
  skillsSection.addEventListener("mouseenter", () => {
    paused = true;
    clearTimeout(resumeTimeout);
    skillsSection.removeAttribute("data-hold"); // ensure clean state
  });

  // Resume drift after a micro‑delay when hover ends
  skillsSection.addEventListener("mouseleave", () => {
    clearTimeout(resumeTimeout);

    // Add hold attribute to freeze CSS float
    skillsSection.setAttribute("data-hold", "");

    resumeTimeout = setTimeout(() => {
      paused = false;
      skillsSection.removeAttribute("data-hold");
    }, 120); // 120ms "breath" before resuming
  });

  // Observe when section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        active = entry.isIntersecting;
        if (!active) {
          targetOffset = 0;
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(skillsSection);

  rafId = requestAnimationFrame(update);
  window.addEventListener("scroll", onScroll);

  // Cleanup
  return () => {
    window.removeEventListener("scroll", onScroll);
    observer.disconnect();
    cancelAnimationFrame(rafId);
    clearTimeout(resumeTimeout);
    skillsSection.removeEventListener("mouseenter", () => {});
    skillsSection.removeEventListener("mouseleave", () => {});
  };
}
