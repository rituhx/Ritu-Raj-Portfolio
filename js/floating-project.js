export function initFloatingProject() {
  const modal = document.getElementById("project-modal");
  const closeButton = document.getElementById("project-modal-close");
  const backdrop = document.getElementById("project-modal-backdrop");
  const video = document.getElementById("company-project-video");

  if (!modal || !closeButton || !backdrop) {
    console.warn("Floating project modal elements not found.");
    return;
  }

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (video) {
      try {
        video.load();
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log("Autoplay prevented or interrupted:", err);
          });
        }
      } catch (err) {
        console.warn("Could not play demo video:", err);
      }
    }
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (video) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch (error) {
        console.warn("Could not reset video:", error);
      }
    }
  }

  // Bind all triggers
  const triggers = document.querySelectorAll(
    "#floating-project-btn, #hero-latest-work-trigger, [data-photo], [data-open-project-demo]"
  );

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openModal();
    });
  });

  closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    closeModal();
  });

  backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  if (video) {
    video.addEventListener("loadeddata", () => {
      console.log("Project demo video loaded successfully.");
    });
    video.addEventListener("error", () => {
      console.error("Project demo video failed to load:", video.currentSrc);
    });
  }
}