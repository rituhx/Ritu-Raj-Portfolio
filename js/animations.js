/* =========================================================
   ANIMATIONS & FAST SCROLL-SLIDE CONTROLLER
   - High-performance, GPU-friendly scroll slides
   - STRICT RULE: NO FADE (opacity: 1 always)
   - Pure transform: translateY(28px) -> translateY(0)
   - Dynamic will-change lifecycle cleanup (zero GPU memory leak)
   - Reduced stagger (40–50ms max, capped at 120ms)
   - Small rootMargin: "0px 0px -5% 0px"
   - Bulletproof fallback & fast scroll watchdog (zero stuck state)
   - STRICT RULE: Profile photo & portrait containers completely static
========================================================= */

function initTypewriter() {
  // Minimal placeholder
}

function initBackgroundSystem() {
  // Disabled per requirements
}

function initReveal() {
  // Check user preference for reduced motion
  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    // If reduced motion or no IntersectionObserver, leave all elements in normal flow
    return;
  }

  // Approved targets per specification
  const targetSelectors = [
    ".section-header",
    ".section-kicker",
    ".section-title",
    ".section-lead",
    ".about-philosophy-card",
    ".about-sfe-card",
    ".about-hero-grid > *",
    ".about-pillars-row > *",
    ".capability-strip",
    ".capabilities-strip",
    ".project-card",
    ".skill-category-card",
    ".timeline-entry",
    ".featured-graduation-card",
    ".certification-card",
    ".grad-item",
    ".grad-actions",
    ".video-card",
    ".contact-grid > *"
  ];

  const rawNodes = document.querySelectorAll(targetSelectors.join(", "));

  // STRICT RULE: Strictly filter out any node that is or is inside the profile photo / portrait container
  const validNodes = Array.from(rawNodes).filter((n) => {
    if (!n) return false;
    if (
      n.matches(
        ".hero, .hero-container, .hero-visual, #hero-visual, #portrait-card, .portrait-card, .portrait-visual-frame, .portrait-img, [data-photo]"
      )
    ) {
      return false;
    }
    if (
      n.closest(
        ".hero-visual, #hero-visual, #portrait-card, .portrait-card, .portrait-visual-frame, [data-photo]"
      )
    ) {
      return false;
    }
    return true;
  });

  const vh = window.innerHeight;
  const toAnimate = [];

  // Filter out elements already visible above the fold on initial load
  // Above-the-fold content renders immediately without any animation or translate delay!
  validNodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    if (rect.top < vh * 0.92 && rect.bottom > 0) {
      // Already in viewport: remain in natural resting position
      node.classList.add("is-settled");
      return;
    }
    toAnimate.push(node);
  });

  if (toAnimate.length === 0) return;

  // Mark elements for slide reveal
  toAnimate.forEach((node) => {
    node.classList.add("reveal");
  });

  let staggerCounter = 0;
  let lastFrameTime = 0;

  function revealElement(target, isInstant = false) {
    if (target.classList.contains("is-settled")) return;

    if (isInstant) {
      target.classList.add("is-revealed", "is-settled");
      target.style.willChange = "auto";
      target.style.transitionDelay = "";
      target.style.transform = "none";
      target.style.transition = "none";
      return;
    }

    const now = performance.now();
    if (now - lastFrameTime > 150) {
      staggerCounter = 0;
    }
    lastFrameTime = now;

    const delay = Math.min(staggerCounter * 45, 120);
    staggerCounter++;

    target.style.willChange = "transform";
    if (delay > 0) {
      target.style.transitionDelay = `${delay}ms`;
    }

    target.classList.add("is-revealed");

    const cleanup = () => {
      target.removeEventListener("transitionend", cleanup);
      target.classList.add("is-settled");
      target.style.willChange = "auto";
      target.style.transitionDelay = "";
      target.style.transform = "none";
      target.style.transition = "none";
    };

    target.addEventListener("transitionend", cleanup, { once: true });
    setTimeout(cleanup, 550 + delay);
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        if (target.classList.contains("is-settled")) {
          io.unobserve(target);
          return;
        }

        // If currently entering viewport
        if (entry.isIntersecting) {
          io.unobserve(target);
          revealElement(target, false);
        } else if (entry.boundingClientRect.top < window.innerHeight) {
          // Already passed above the viewport on fast scroll: settle instantly!
          io.unobserve(target);
          revealElement(target, true);
        }
      });
    },
    {
      rootMargin: "0px 0px -5% 0px",
      threshold: 0.05
    }
  );

  toAnimate.forEach((node) => io.observe(node));

  // Fast scroll & jump-to-section rAF watchdog
  let ticking = false;
  const onScrollSweep = () => {
    const currentH = window.innerHeight;
    toAnimate.forEach((node) => {
      if (!node.classList.contains("is-settled")) {
        const r = node.getBoundingClientRect();
        if (r.top < currentH) {
          io.unobserve(node);
          if (r.bottom < 0) {
            revealElement(node, true);
          } else {
            revealElement(node, false);
          }
        }
      }
    });
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScrollSweep();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  // Master safety timeout: after 2.5 seconds, all elements are guaranteed 100% settled
  setTimeout(() => {
    toAnimate.forEach((node) => {
      if (!node.classList.contains("is-settled")) {
        revealElement(node, true);
        io.unobserve(node);
      }
    });
  }, 2500);
}

export { initTypewriter, initReveal, initBackgroundSystem };
