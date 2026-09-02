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

function initBackgroundSystem() {
  const canvas = document.getElementById("bg-particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  const PARTICLE_COUNT = 36;
  const CONNECTION_DIST = 85;

  const DARK_COLORS = [
    "rgba(56, 189, 248, ", // cyan
    "rgba(59, 130, 246, ", // blue
    "rgba(6, 182, 212, ",  // teal
    "rgba(99, 102, 241, "  // indigo
  ];

  const LIGHT_COLORS = [
    "rgba(2, 132, 199, ",  // sky blue
    "rgba(37, 99, 235, ",  // royal blue
    "rgba(8, 145, 178, ",  // ocean
    "rgba(99, 102, 241, "  // indigo
  ];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.5 + 1.0,
        baseAlpha: Math.random() * 0.35 + 0.15,
        alphaPhase: Math.random() * Math.PI * 2,
        alphaSpeed: Math.random() * 0.015 + 0.008,
        colorIndex: Math.floor(Math.random() * 4)
      });
    }
  }

  resize();
  createParticles();

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  }, { passive: true });

  let animId = null;
  let isTabVisible = true;

  document.addEventListener("visibilitychange", () => {
    isTabVisible = !document.hidden;
    if (isTabVisible && !animId) {
      animId = requestAnimationFrame(render);
    }
  });

  function render() {
    if (!isTabVisible) {
      animId = null;
      return;
    }

    const isLightMode = document.documentElement.getAttribute("data-theme") === "light";
    const colors = isLightMode ? LIGHT_COLORS : DARK_COLORS;

    ctx.clearRect(0, 0, width, height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.alphaPhase += p.alphaSpeed;

      // Wrap edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      const currentAlpha = p.baseAlpha + Math.sin(p.alphaPhase) * 0.12;
      const alphaClamped = isLightMode
        ? Math.max(0.04, Math.min(0.28, currentAlpha * 0.6))
        : Math.max(0.05, Math.min(0.6, currentAlpha));

      const prefix = colors[p.colorIndex % colors.length];

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = prefix + alphaClamped + ")";
      if (!isLightMode) {
        ctx.shadowColor = prefix + "0.6)";
        ctx.shadowBlur = 6;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fill();

      // Connector lines between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          const lineAlpha = (1 - dist / CONNECTION_DIST) * (isLightMode ? 0.04 : 0.08);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = isLightMode
            ? "rgba(37, 99, 235, " + lineAlpha + ")"
            : "rgba(56, 189, 248, " + lineAlpha + ")";
          ctx.lineWidth = 0.75;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(render);
  }

  animId = requestAnimationFrame(render);
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

export { initTypewriter, initReveal, initBackgroundSystem };


