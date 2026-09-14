/* =========================================================
   HERO MOTION CONTROLLER
   - Profile image is completely static per requirements
   - Zero floating, rotation, sliding, fading, scaling, parallax, or animation
   - Excluded completely from scroll reveals
========================================================= */

export function initHeroMotion() {
  const heroStage = document.getElementById("hero-portrait-stage");
  const portraitCard = document.getElementById("portrait-card");
  const heroVisual = document.getElementById("hero-visual");
  const heroImage = document.getElementById("floating-project-btn");
  const portraitImg = document.querySelector(".portrait-img, [data-photo]");
  const portraitVisual = document.getElementById("portrait-visual");

  const staticEls = [heroStage, portraitCard, heroVisual, heroImage, portraitImg, portraitVisual];

  staticEls.forEach((el) => {
    if (!el) return;
    el.style.opacity = "1";
    el.style.transform = "none";
    el.style.animation = "none";
    el.style.transition = "none";
    el.classList.remove("reveal", "is-revealed");
  });
}
