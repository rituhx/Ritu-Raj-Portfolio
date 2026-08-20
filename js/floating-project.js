export function initFloatingProject() {

  const floatingButton =
    document.getElementById(
      "floating-project-btn"
    );


  const modal =
    document.getElementById(
      "project-modal"
    );


  const closeButton =
    document.getElementById(
      "project-modal-close"
    );


  const backdrop =
    document.getElementById(
      "project-modal-backdrop"
    );


  const video =
    document.getElementById(
      "company-project-video"
    );


  /* =====================================================
     REQUIRED ELEMENT CHECK
  ====================================================== */

  if (
    !floatingButton ||
    !modal ||
    !closeButton ||
    !backdrop
  ) {

    console.error(
      "Floating project component elements not found."
    );

    return;

  }


  /* =====================================================
     OPEN MODAL
  ====================================================== */

  function openModal() {

    modal.classList.add(
      "is-open"
    );


    modal.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style.overflow =
      "hidden";


    if (video) {

      /*
       * Reload the source when the modal opens.
       * This helps ensure the newly added project-demo.mp4
       * is loaded.
       */

      video.load();

    }

  }


  /* =====================================================
     CLOSE MODAL
  ====================================================== */

  function closeModal() {

    modal.classList.remove(
      "is-open"
    );


    modal.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.style.overflow =
      "";


    if (video) {

      video.pause();


      try {

        video.currentTime =
          0;

      } catch (error) {

        console.warn(
          "Could not reset video:",
          error
        );

      }

    }

  }


  /* =====================================================
     OPEN BUTTON
  ====================================================== */

  floatingButton.addEventListener(
    "click",
    openModal
  );


  /* =====================================================
     CLOSE BUTTON
  ====================================================== */

  closeButton.addEventListener(
    "click",
    closeModal
  );


  /* =====================================================
     BACKDROP CLICK
  ====================================================== */

  backdrop.addEventListener(
    "click",
    closeModal
  );


  /* =====================================================
     ESCAPE KEY
  ====================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        modal.classList.contains(
          "is-open"
        )
      ) {

        closeModal();

      }

    }
  );


  /* =====================================================
     VIDEO SUCCESS
  ====================================================== */

  if (video) {

    video.addEventListener(
      "loadeddata",
      () => {

        console.log(
          "Project demo video loaded successfully."
        );

      }
    );


    /* ===================================================
       VIDEO ERROR
    ==================================================== */

    video.addEventListener(
      "error",
      () => {

        console.error(
          "Project demo video failed to load."
        );


        console.error(
          "Video source:",
          video.currentSrc
        );

      }
    );

  }

}