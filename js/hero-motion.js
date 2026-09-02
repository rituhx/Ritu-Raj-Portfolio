/* =========================================================
   CINEMATIC 3D HERO PORTRAIT MOTION ENGINE
   - Oscillating 3D rotation on Y & X axes
   - Subtle vertical floating & breathing scale
   - Smooth mouse-follow parallax with inertia (LERP)
   - Multi-layer depth parallax (Portrait, HUD rings, Glow, Pill)
   - Dynamic lighting & directional shadow modulation
   - Reduced motion & mobile touch optimizations
   - Auto-pauses offscreen via IntersectionObserver
========================================================= */

export function initHeroMotion() {
  const heroSection = document.getElementById("home") || document.querySelector(".hero");
  const heroFrame = document.querySelector(".hero-frame");
  const outerRing = document.querySelector(".hero-hud-ring.ring-outer");
  const innerRing = document.querySelector(".hero-hud-ring.ring-inner");
  const ambientGlow = document.querySelector(".hero-ambient-glow");
  const triggerPill = document.getElementById("hero-latest-work-trigger");
  const particles = document.querySelectorAll(".hero-particle");

  if (!heroSection || !heroFrame) {
    return;
  }

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    heroFrame.style.transform = "none";
    return;
  }

  // Check touch / mobile capability
  const isTouchDevice = "ontouchstart" in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);

  // Mouse interpolation state
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;
  let isHoveringPortrait = false;

  // Track cursor relative to hero center
  if (!isTouchDevice) {
    const handleMouseMove = (e) => {
      const rect = heroSection.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates: -1 to +1
      targetMouseX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width * 0.5)));
      targetMouseY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height * 0.5)));
    };

    const handleMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    heroFrame.addEventListener("mouseenter", () => {
      isHoveringPortrait = true;
    });

    heroFrame.addEventListener("mouseleave", () => {
      isHoveringPortrait = false;
    });
  }

  // Animation loop variables
  let animationFrameId = null;
  let isHeroVisible = true;
  let startTime = performance.now();

  function animate(timestamp) {
    if (!isHeroVisible) {
      animationFrameId = requestAnimationFrame(animate);
      return;
    }

    const elapsed = (timestamp - startTime) * 0.001; // elapsed seconds

    // Smooth cursor interpolation (linear interpolation with inertia)
    const lerpFactor = isTouchDevice ? 0.05 : 0.065;
    currentMouseX += (targetMouseX - currentMouseX) * lerpFactor;
    currentMouseY += (targetMouseY - currentMouseY) * lerpFactor;

    // --- 1. CONTINUOUS 3D OSCILLATING ROTATION & FLOATING ---
    // Smooth harmonic cycle (~7.8s full rotation oscillation)
    const timeScale = 0.8;
    const autoRotY = Math.sin(elapsed * timeScale) * 4.6; // Oscillation on Y axis: -4.6deg to +4.6deg
    const autoRotX = Math.cos(elapsed * timeScale * 0.75) * 2.4; // Subtle X-axis tilt: -2.4deg to +2.4deg
    const autoRotZ = Math.sin(elapsed * timeScale * 0.5) * 0.5; // Tiny natural roll
    const autoFloatY = Math.sin(elapsed * timeScale * 1.1) * 11; // Vertical floating: -11px to +11px
    const autoScale = 1.0 + Math.sin(elapsed * timeScale * 0.85) * 0.012; // Gentle breathing

    // --- 2. INTERACTIVE MOUSE RESPONSE ---
    const mouseIntensity = isTouchDevice ? 0 : 1;
    const mouseRotY = currentMouseX * 7.5 * mouseIntensity; // Subtle Y tilt from cursor
    const mouseRotX = -currentMouseY * 5.0 * mouseIntensity; // Subtle X tilt from cursor
    const mouseTransX = currentMouseX * 16 * mouseIntensity;
    const mouseTransY = currentMouseY * 12 * mouseIntensity;

    // --- 3. FINAL COMPOSITE TRANSFORMS ---
    const totalRotY = autoRotY + mouseRotY;
    const totalRotX = autoRotX + mouseRotX;
    const totalRotZ = autoRotZ;
    const totalTransX = mouseTransX;
    const totalTransY = autoFloatY + mouseTransY;
    const hoverScaleBonus = isHoveringPortrait ? 1.03 : 1.0;
    const finalScale = autoScale * hoverScaleBonus;

    // Apply primary 3D transform to actual portrait frame
    heroFrame.style.transform = "perspective(1200px) translate3d(" + totalTransX.toFixed(2) + "px, " + totalTransY.toFixed(2) + "px, 15px) rotateX(" + totalRotX.toFixed(2) + "deg) rotateY(" + totalRotY.toFixed(2) + "deg) rotateZ(" + totalRotZ.toFixed(2) + "deg) scale(" + finalScale.toFixed(4) + ")";

    // Dynamic directional drop-shadow that moves realistically with the 3D rotation
    const shadowOffsetX = (totalRotY * 1.6).toFixed(1);
    const shadowOffsetY = (22 + totalRotX * 1.1).toFixed(1);
    const shadowBlur = (38 + Math.abs(autoFloatY) * 0.7).toFixed(1);
    const rimGlowSpread = isHoveringPortrait ? "36px" : (25 + Math.abs(totalRotY) * 1.2).toFixed(1) + "px";
    const rimGlowAlpha = isHoveringPortrait ? 0.45 : (0.2 + Math.abs(totalRotY) * 0.015).toFixed(2);

    heroFrame.style.filter = "drop-shadow(" + shadowOffsetX + "px " + shadowOffsetY + "px " + shadowBlur + "px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 " + rimGlowSpread + " rgba(56, 189, 248, " + rimGlowAlpha + "))";

    // --- 4. MULTI-LAYER DEPTH PARALLAX ON SUPPORTING ELEMENTS ---
    // Outer HUD ring (depth: -25px)
    if (outerRing) {
      const ringX = mouseTransX * 0.35;
      const ringY = mouseTransY * 0.35;
      outerRing.style.transform = "translate(-50%, -50%) translate3d(" + ringX.toFixed(2) + "px, " + ringY.toFixed(2) + "px, -25px)";
    }

    // Inner HUD ring (depth: -12px)
    if (innerRing) {
      const ringX = mouseTransX * 0.55;
      const ringY = mouseTransY * 0.55;
      innerRing.style.transform = "translate(-50%, -50%) translate3d(" + ringX.toFixed(2) + "px, " + ringY.toFixed(2) + "px, -12px)";
    }

    // Ambient volumetric glow (depth: -45px)
    if (ambientGlow) {
      const glowX = mouseTransX * 0.2;
      const glowY = mouseTransY * 0.2;
      ambientGlow.style.transform = "translate(-50%, -50%) translate3d(" + glowX.toFixed(2) + "px, " + glowY.toFixed(2) + "px, -45px)";
    }

    // Floating Latest Work trigger pill (depth: +35px in front of portrait)
    if (triggerPill) {
      const pillX = mouseTransX * 1.2;
      const pillY = (autoFloatY * 0.6) + (mouseTransY * 1.2);
      triggerPill.style.transform = "translate3d(" + pillX.toFixed(2) + "px, " + pillY.toFixed(2) + "px, 35px)";
    }

    // Floating particles (differential depth)
    particles.forEach((particle, index) => {
      const factor = 0.4 + (index * 0.3);
      const px = mouseTransX * factor;
      const py = (Math.sin(elapsed * (0.8 + index * 0.2)) * 8) + (mouseTransY * factor);
      particle.style.transform = "translate3d(" + px.toFixed(2) + "px, " + py.toFixed(2) + "px, " + (index * 10) + "px)";
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  // IntersectionObserver to pause when hero is off-screen for performance
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isHeroVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(heroSection);
  }

  // Start the 3D motion engine loop
  animationFrameId = requestAnimationFrame(animate);
}
