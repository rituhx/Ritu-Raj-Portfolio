/* =========================================================
   CINEMATIC HERO MOTION ENGINE (SCROLL + MOUSE PARALLAX)
   - Scroll-driven typography exit & differential portrait motion
   - Multi-layer decoupled stage & mouse parallax
   - Breathing vertical float for portrait stage
   - Continuous 360° rotation decoupled on #portrait-turntable
   - Foreground latest work trigger pill
   - Performance optimized with lerp & visibility observer
========================================================= */

export function initHeroMotion() {
  const heroSection = document.getElementById("home") || document.querySelector(".hero");
  const heroCopy = document.querySelector(".hero-copy");
  const heroStage = document.getElementById("hero-portrait-stage");
  const portraitParallax = document.getElementById("portrait-parallax");
  const turntable = document.getElementById("portrait-turntable");
  const ambientGlow = document.querySelector(".hero-ambient-glow");
  const triggerPill = document.getElementById("hero-latest-work-trigger");

  if (!heroSection || !heroStage) {
    return;
  }

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    if (turntable) turntable.style.animation = "none";
    if (heroCopy) heroCopy.style.transform = "none";
    heroStage.style.transform = "none";
    return;
  }

  const isTouchDevice = "ontouchstart" in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);

  // Scroll state & interpolation
  let targetScrollY = window.scrollY || 0;
  let currentScrollY = targetScrollY;

  const handleScroll = () => {
    targetScrollY = window.scrollY || 0;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Mouse interpolation state
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  if (!isTouchDevice) {
    const handleMouseMove = (e) => {
      const rect = heroSection.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      targetMouseX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width * 0.5)));
      targetMouseY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height * 0.5)));
    };

    const handleMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
  }

  let animationFrameId = null;
  let isHeroVisible = true;
  let startTime = performance.now();

  function animate(timestamp) {
    if (!isHeroVisible) {
      animationFrameId = requestAnimationFrame(animate);
      return;
    }

    const elapsed = (timestamp - startTime) * 0.001;

    // Smooth lerping
    const scrollLerp = 0.12;
    currentScrollY += (targetScrollY - currentScrollY) * scrollLerp;

    const mouseLerp = isTouchDevice ? 0.04 : 0.06;
    currentMouseX += (targetMouseX - currentMouseX) * mouseLerp;
    currentMouseY += (targetMouseY - currentMouseY) * mouseLerp;

    const heroHeight = heroSection.offsetHeight || window.innerHeight;
    const scrollProgress = Math.min(1.2, Math.max(0, currentScrollY / heroHeight));

    // --- 1. SCROLL-DRIVEN HERO COPY MOTION (PHASE 1-3) ---
    if (heroCopy) {
      const copyTransY = currentScrollY * -0.28;
      const copyOpacity = Math.max(0, 1 - (scrollProgress * 1.55));
      const copyScale = Math.max(0.92, 1 - (scrollProgress * 0.08));

      heroCopy.style.transform = `translate3d(0, ${copyTransY.toFixed(2)}px, 0) scale(${copyScale.toFixed(3)})`;
      heroCopy.style.opacity = copyOpacity.toFixed(3);
    }

    // --- 2. SCROLL-DRIVEN PORTRAIT STAGE PARALLAX ---
    const stageScrollY = currentScrollY * -0.12;
    const stageScale = Math.max(0.9, 1 - (scrollProgress * 0.07));
    const stageOpacity = Math.max(0, 1 - (scrollProgress * 1.25));

    heroStage.style.transform = `translate3d(0, ${stageScrollY.toFixed(2)}px, 0) scale(${stageScale.toFixed(3)})`;
    heroStage.style.opacity = stageOpacity.toFixed(3);

    // --- 3. MOUSE PARALLAX & SUBTLE VERTICAL FLOAT (Inside portrait-parallax) ---
    if (portraitParallax) {
      const autoFloatY = Math.sin(elapsed * 0.95) * 8; // gentle 8px breathing float
      const mouseIntensity = isTouchDevice ? 0 : 1;
      const tiltX = -currentMouseY * 4.0 * mouseIntensity;
      const tiltY = currentMouseX * 5.0 * mouseIntensity;
      const transX = currentMouseX * 12 * mouseIntensity;
      const transY = autoFloatY + (currentMouseY * 8 * mouseIntensity);

      portraitParallax.style.transform = `perspective(1100px) translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
    }

    // --- 4. AMBIENT GLOW SHIFT ---
    if (ambientGlow) {
      const glowScrollY = currentScrollY * 0.05;
      ambientGlow.style.transform = `translate(-50%, -50%) translate3d(0, ${glowScrollY.toFixed(2)}px, -30px)`;
    }

    // --- 5. FOREGROUND LATEST WORK PILL ---
    if (triggerPill) {
      const pillTransX = currentMouseX * 15 * (isTouchDevice ? 0 : 1);
      const pillTransY = (Math.sin(elapsed * 0.95) * 4) + (currentMouseY * 10 * (isTouchDevice ? 0 : 1));
      triggerPill.style.transform = `translate3d(${pillTransX.toFixed(2)}px, ${pillTransY.toFixed(2)}px, 45px)`;
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // IntersectionObserver to pause when hero is off-screen
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isHeroVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.02 }
    );
    observer.observe(heroSection);
  }

  animationFrameId = requestAnimationFrame(animate);
}

