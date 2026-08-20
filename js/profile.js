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


  /* =====================================================
     PROFILE PHOTO
  ====================================================== */

  root.querySelectorAll("[data-photo]").forEach((img) => {

    img.src = profile.photo;

    img.alt = "Portrait of " + profile.name;


    img.addEventListener("error", () => {

      if (img.src.indexOf(profile.photoFallback) === -1) {
        img.src = profile.photoFallback;
      }

    });


    /* ===============================================
       OPEN LATEST WORK VIDEO ON PHOTO CLICK
    ================================================ */

    img.addEventListener("click", (event) => {

      event.preventDefault();

      event.stopPropagation();


      const projectModal =
        document.getElementById("project-modal");


      const projectVideo =
        document.getElementById("company-project-video");


      if (!projectModal) {

        console.error(
          "Project modal not found."
        );

        return;

      }


      projectModal.classList.add("is-open");


      projectModal.setAttribute(
        "aria-hidden",
        "false"
      );


      document.body.style.overflow =
        "hidden";


      if (projectVideo) {

        projectVideo.load();

      }

    });

  });


  /* =====================================================
     CLOSE LATEST WORK VIDEO MODAL
  ====================================================== */

  const projectModal =
    document.getElementById("project-modal");


  const projectModalClose =
    document.getElementById("project-modal-close");


  const projectModalBackdrop =
    document.getElementById("project-modal-backdrop");


  const projectVideo =
    document.getElementById("company-project-video");


  function closeProjectModal() {

    if (!projectModal) {
      return;
    }


    projectModal.classList.remove("is-open");


    projectModal.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.style.overflow =
      "";


    if (projectVideo) {

      projectVideo.pause();


      try {

        projectVideo.currentTime =
          0;

      } catch (error) {

        console.warn(
          "Could not reset video:",
          error
        );

      }

    }

  }


  if (projectModalClose) {

    projectModalClose.addEventListener(
      "click",
      closeProjectModal
    );

  }


  if (projectModalBackdrop) {

    projectModalBackdrop.addEventListener(
      "click",
      closeProjectModal
    );

  }


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        projectModal &&
        projectModal.classList.contains("is-open")
      ) {

        closeProjectModal();

      }

    }
  );


  /* =====================================================
     CONTACT FORM
  ====================================================== */

  const form =
    root.querySelector("#contact-form");


  if (form) {

    form.action =
      profile.formEndpoint;

  }

}


export {
  applyProfile,
  profile
};
