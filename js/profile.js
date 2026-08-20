import { profile } from "../data/profile.js";

function applyProfile(root = document) {
  root.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.getAttribute("data-field");
    if (profile[key]) el.textContent = profile[key];
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
  root.querySelectorAll("[data-photo]").forEach((img) => {
    img.src = profile.photo;
    img.alt = "Portrait of " + profile.name;
    img.addEventListener("error", () => {
      if (img.src.indexOf(profile.photoFallback) === -1) {
        img.src = profile.photoFallback;
      }
    });
  });

  const profileLightbox = root.getElementById("profile-lightbox");
  const profileLightboxImg = root.getElementById("profile-lightbox-image");
  const profileLightboxClose = root.getElementById("profile-lightbox-close");

  if (profileLightbox && profileLightboxImg) {
    root.querySelectorAll("[data-photo]").forEach((img) => {
      img.addEventListener("click", () => {
        profileLightboxImg.src = img.src;
        profileLightboxImg.alt = img.alt;
        profileLightbox.classList.add("is-open");
        document.body.style.overflow = "hidden";
        if (profileLightboxClose) profileLightboxClose.focus();
      });
    });

    const closeProfileLightbox = () => {
      profileLightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    if (profileLightboxClose) {
      profileLightboxClose.addEventListener("click", closeProfileLightbox);
    }

    profileLightbox.addEventListener("click", (e) => {
      if (e.target === profileLightbox) {
        closeProfileLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && profileLightbox.classList.contains("is-open")) {
        closeProfileLightbox();
      }
    });
  }

  const form = root.querySelector("#contact-form");
  if (form) form.action = profile.formEndpoint;
}

export { applyProfile, profile };
