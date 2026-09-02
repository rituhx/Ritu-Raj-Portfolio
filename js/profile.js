import { profile } from "../data/profile.js";

function applyProfile(root = document) {
  root.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.getAttribute("data-field");
    if (profile[key]) {
      el.textContent = profile[key];
    }
  });

  root.querySelectorAll("[data-github]").forEach((el) => {
    el.href = profile.github;
  });

  root.querySelectorAll("[data-linkedin]").forEach((el) => {
    el.href = profile.linkedin;
  });

  root.querySelectorAll("[data-instagram]").forEach((el) => {
    el.href = profile.instagram;
  });

  root.querySelectorAll("[data-email]").forEach((el) => {
    el.href = "mailto:" + profile.email;
  });

  root.querySelectorAll("[data-phone]").forEach((el) => {
    el.href = profile.phoneHref;
  });

  root.querySelectorAll("[data-resume]").forEach((el) => {
    el.href = profile.resume;
    el.setAttribute("download", profile.resumeDownload);
  });

  /* Profile Photo with automatic fallback (Front & Back Faces) */
  root.querySelectorAll("[data-photo], [data-photo-back]").forEach((img) => {
    img.src = profile.photo;
    img.alt = "Portrait of " + profile.name;

    img.addEventListener("error", () => {
      if (img.src.indexOf(profile.photoFallback) === -1) {
        img.src = profile.photoFallback;
      }
    });
  });

  /* Contact form endpoint */
  const form = root.querySelector("#contact-form");
  if (form && profile.formEndpoint) {
    form.action = profile.formEndpoint;
  }
}

export { applyProfile, profile };

