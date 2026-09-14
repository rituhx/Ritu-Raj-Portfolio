import { initReveal, initBackgroundSystem } from "./animations.js?v=4";
import { initContact } from "./contact.js";
import { initGraduation } from "./graduation.js?v=3";
import { initLifeVideo } from "./life-video.js";
import { initNavigation } from "./navigation.js";
import { initHeroMotion } from "./hero-motion.js?v=4";

/* NEW PROJECT FLOATING BUBBLE */
import { initFloatingProject } from "./floating-project.js";

import { applyProfile } from "./profile.js";
import { renderProjects } from "./projects.js?v=3";

import {
  renderAbout,
  renderCertifications,
  renderExperience,
  renderSkills
} from "./skills.js";


/* =========================================================
   COMPONENTS / PARTIALS
========================================================= */

const PARTIALS = [
  ["slot-navbar", "components/navbar.html"],
  ["slot-hero", "components/hero.html"],
  ["slot-about", "components/about.html"],
  ["slot-what-i-build", "components/what-i-build.html"],
  ["slot-experience", "components/experience.html"],
  ["slot-skills", "components/skills.html"],
  ["slot-projects", "components/projects.html"],
  ["slot-graduation", "components/graduation.html"],
  ["slot-life-video", "components/life-video.html"],
  ["slot-certifications", "components/certifications.html"],
  ["slot-contact", "components/contact.html"],
  ["slot-footer", "components/footer.html"],
  ["slot-floating-project", "components/floating-project.html"]
];


/* =========================================================
   LOAD HTML PARTIALS
========================================================= */

async function loadPartials() {

  await Promise.all(
    PARTIALS.map(async ([id, path]) => {

      const host = document.getElementById(id);

      if (!host) {
        console.warn(`Slot not found: ${id}`);
        return;
      }

      // Fast render optimization: if already pre-rendered in HTML, skip network fetch!
      if (host.children.length > 0) {
        return;
      }

      try {

        const res = await fetch(path);

        if (!res.ok) {
          console.error(
            `Failed to load ${path}. Status: ${res.status}`
          );
          return;
        }

        host.innerHTML = await res.text();

      } catch (error) {

        console.error(
          `Error loading component ${path}:`,
          error
        );

      }

    })
  );

}


/* =========================================================
   THEME
========================================================= */

function initTheme() {
  const key = "portfolio-theme";
  const btns = document.querySelectorAll(".theme-toggle");

  function apply(theme) {
    const selectedTheme = theme === "dark" ? "dark" : "yellow";
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem(key, selectedTheme);
    btns.forEach((btn) => {
      const isDark = selectedTheme === "dark";
      btn.setAttribute("aria-label", isDark ? "Switch to Day Mode" : "Switch to Night Mode");
      btn.setAttribute("title", isDark ? "Switch to Day Mode" : "Switch to Night Mode");
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const themeFromUrl = urlParams.get("theme");
  if (themeFromUrl === "dark" || themeFromUrl === "yellow" || themeFromUrl === "light") {
    apply(themeFromUrl === "dark" ? "dark" : "yellow");
  } else {
    apply(localStorage.getItem(key) || "yellow");
  }

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "yellow" : "dark";
      apply(nextTheme);
    });
  });
}


/* =========================================================
   SAFE FUNCTION RUNNER
========================================================= */

function runSafely(name, callback) {

  try {

    callback();

  } catch (error) {

    console.error(
      `Error in ${name}:`,
      error
    );

  }

}


/* =========================================================
   APPLICATION BOOT
========================================================= */

async function boot() {

  /* =====================================================
     LOAD ALL HTML COMPONENTS FIRST
  ===================================================== */

  await loadPartials();

  const urlParams = new URLSearchParams(window.location.search);
  const scrollParam = urlParams.get("scroll");
  if (scrollParam !== null) {
    const s = parseFloat(scrollParam) || 0;
    window.scrollTo(0, s);
  }


  /* =====================================================
     PROFILE
  ===================================================== */

  runSafely(
    "applyProfile",
    () => applyProfile(document)
  );


  /* =====================================================
     PAGE CONTENT
  ===================================================== */

  runSafely(
    "renderAbout",
    () => renderAbout(document)
  );


  runSafely(
    "renderExperience",
    () => renderExperience(document)
  );


  runSafely(
    "renderSkills",
    () => renderSkills(document)
  );


  runSafely(
    "renderProjects",
    () => renderProjects(document)
  );


  /* =====================================================
     INTERACTIVE SECTIONS
  ===================================================== */

  runSafely(
    "initGraduation",
    () => initGraduation()
  );


  runSafely(
    "initLifeVideo",
    () => initLifeVideo()
  );


  /* =====================================================
     NEW FLOATING PROJECT BUBBLE
  ===================================================== */

  runSafely(
    "initFloatingProject",
    () => initFloatingProject()
  );


  /* =====================================================
     CERTIFICATIONS
  ===================================================== */

  runSafely(
    "renderCertifications",
    () => renderCertifications(document)
  );


  /* =====================================================
     SITE FEATURES
  ===================================================== */

  runSafely(
    "initTheme",
    () => initTheme()
  );


  runSafely(
    "initNavigation",
    () => initNavigation()
  );


  runSafely(
    "initReveal",
    () => initReveal()
  );


  runSafely(
    "initContact",
    () => initContact()
  );


  runSafely(
    "initHeroMotion",
    () => initHeroMotion()
  );

  runSafely(
    "initBackgroundSystem",
    () => initBackgroundSystem()
  );


  /* =====================================================
     FOOTER YEAR
  ===================================================== */

  const year =
    document.getElementById("year");


  if (year) {

    year.textContent =
      String(
        new Date().getFullYear()
      );

  }


  /* =====================================================
     OPEN SECTION FROM URL HASH
  ===================================================== */

  if (window.location.hash) {

    try {

      const target =
        document.querySelector(
          window.location.hash
        );


      if (target) {

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    } catch (error) {

      console.error(
        "Error opening URL hash:",
        error
      );

    }

  }


  console.log(
    "Portfolio loaded successfully."
  );

}


/* =========================================================
   START APPLICATION
========================================================= */

boot().catch((error) => {

  console.error(
    "Portfolio startup error:",
    error
  );

});