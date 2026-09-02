import { initReveal } from "./animations.js";
import { initContact } from "./contact.js";
import { initGraduation } from "./graduation.js";
import { initLifeVideo } from "./life-video.js";
import { initNavigation } from "./navigation.js";
import { initHeroMotion } from "./hero-motion.js";

/* NEW PROJECT FLOATING BUBBLE */
import { initFloatingProject } from "./floating-project.js";

import { applyProfile } from "./profile.js";
import { renderProjects } from "./projects.js";

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

  const btn = document.getElementById("theme-toggle");


  function apply(theme) {

    const selectedTheme =
      theme === "light"
        ? "light"
        : "dark";


    document.documentElement.setAttribute(
      "data-theme",
      selectedTheme
    );


    localStorage.setItem(
      key,
      selectedTheme
    );

  }


  apply(
    localStorage.getItem(key) || "dark"
  );


  if (btn) {

    btn.addEventListener("click", () => {

      const currentTheme =
        document.documentElement.getAttribute(
          "data-theme"
        );


      const nextTheme =
        currentTheme === "light"
          ? "dark"
          : "light";


      apply(nextTheme);

    });

  }

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