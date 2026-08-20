import { applyProfile } from "./profile.js";
import { renderProjects } from "./projects.js";
import { renderAbout, renderSkills, renderExperience, renderCertifications } from "./skills.js";
import { initNavigation } from "./navigation.js";
import { initReveal } from "./animations.js";
import { initContact } from "./contact.js";
import { initGraduation } from "./graduation.js";
import { initLifeVideo } from "./life-video.js";

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
  ["slot-footer", "components/footer.html"]
];

async function loadPartials() {
  await Promise.all(
    PARTIALS.map(async ([id, path]) => {
      const host = document.getElementById(id);
      if (!host) return;
      const res = await fetch(path);
      if (!res.ok) throw new Error("Failed to load " + path);
      host.innerHTML = await res.text();
    })
  );
}

function initTheme() {
  const key = "portfolio-theme";
  const btn = document.getElementById("theme-toggle");
  const apply = (theme) => {
    document.documentElement.setAttribute("data-theme", theme === "light" ? "light" : "dark");
    localStorage.setItem(key, theme === "light" ? "light" : "dark");
  };
  apply(localStorage.getItem(key) || "dark");
  if (btn) {
    btn.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      apply(next);
    });
  }
}

async function boot() {
  await loadPartials();
  applyProfile(document);
  renderAbout(document);
  renderExperience(document);
  renderSkills(document);
  renderProjects(document);
  initGraduation();
  initLifeVideo();
  renderCertifications(document);
  initTheme();
  initNavigation();
  initReveal();
  initContact();
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) target.scrollIntoView();
  }
}

boot().catch((err) => {
  console.error(err);
  document.body.innerHTML =
    '<p style="padding:2rem;color:#fff;font-family:sans-serif">This portfolio needs a local web server so components can load. Run <code>python -m http.server 5500</code> in the project folder, then open http://localhost:5500</p>';
});
