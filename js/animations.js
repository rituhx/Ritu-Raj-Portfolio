import { profile } from "../data/profile.js";

function initTypewriter() {
  const el = document.getElementById("typewriter-text");
  const lines = profile.typewriter || [];
  if (!el || !lines.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = lines[0];
    return;
  }

  let line = 0;
  let i = 0;
  let deleting = false;

  const tick = () => {
    const text = lines[line];
    el.textContent = text.slice(0, i);
    if (!deleting && i < text.length) {
      i += 1;
      setTimeout(tick, 70);
    } else if (!deleting && i === text.length) {
      deleting = true;
      setTimeout(tick, 1400);
    } else if (deleting && i > 0) {
      i -= 1;
      setTimeout(tick, 36);
    } else {
      deleting = false;
      line = (line + 1) % lines.length;
      setTimeout(tick, 280);
    }
  };
  tick();
}

function initReveal() {
  const nodes = document.querySelectorAll(".section, .hero-grid, .reveal, .card");
  
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((n) => {
      n.classList.add("reveal", "is-revealed");
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  nodes.forEach((n) => {
    n.classList.add("reveal");
    io.observe(n);
  });
}

export { initTypewriter, initReveal };

