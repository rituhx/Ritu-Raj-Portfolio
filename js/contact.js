import { profile } from "../data/profile.js";

function initContact() {
  const next = document.getElementById("formsubmit-next");

  if (next) {
    const base = window.location.origin + window.location.pathname;
    next.value = base + "#contact?sent=1";
  }

  const params = new URLSearchParams(window.location.search);
  const hash = window.location.hash;

  if (
    (hash.includes("contact") && hash.includes("sent=1")) ||
    params.get("sent") === "1"
  ) {
    const banner = document.getElementById("contact-sent");

    if (banner) {
      banner.style.display = "block";

      setTimeout(() => {
        banner.style.display = "none";
      }, 5000);
    }
  }

  const form = document.getElementById("contact-form");

  if (form && profile.formEndpoint) {
    form.action = profile.formEndpoint;
  }

  /* Social links */
  const instagram = document.querySelector("[data-instagram]");

  if (instagram) {
    instagram.href = "https://www.instagram.com/riturz_/";
  }

  initMap();
}


/* =========================================
   LOCATION MAP
========================================= */

async function initMap() {
  const smallMap = document.getElementById("contact-map");
  const modal = document.getElementById("map-modal");
  const largeMap = document.getElementById("map-large");

  if (!smallMap) return;

  try {
    const response = await fetch("assets/images/world.svg");

    if (!response.ok) {
      throw new Error("Unable to load world.svg");
    }

    let svgText = await response.text();

    /*
     * Make sure the SVG has a viewBox.
     */
    if (!svgText.includes("viewBox")) {
      svgText = svgText.replace(
        "<svg",
        '<svg viewBox="0 0 1008 660"'
      );
    }


    /* =====================================
       SMALL MAP PREVIEW
    ===================================== */

    smallMap.innerHTML = svgText;

    const previewSvg = smallMap.querySelector("svg");

    if (previewSvg) {
      prepareSvg(previewSvg);

      /*
       * Add Buxar marker to small preview.
       */
      addBuxarMarker(previewSvg);
    }


    /* =====================================
       OPEN LARGE MAP
    ===================================== */

    if (modal && largeMap) {

      smallMap.addEventListener("click", () => {

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        /*
         * Load fresh SVG into modal.
         */
        largeMap.innerHTML = svgText;

        const svg = largeMap.querySelector("svg");

        if (!svg) return;

        prepareSvg(svg);

        startLocationJourney(svg);
      });


      /* =================================
         CLOSE BUTTON + BACKDROP
      ================================= */

      const closeButtons =
        modal.querySelectorAll("[data-map-close]");

      closeButtons.forEach((button) => {
        button.addEventListener("click", closeMap);
      });


      /* =================================
         ESC KEY
      ================================= */

      document.addEventListener("keydown", (event) => {

        if (
          event.key === "Escape" &&
          modal.classList.contains("is-open")
        ) {
          closeMap();
        }

      });


      /* =================================
         PREVENT MODAL CARD FROM CLOSING
      ================================= */

      const modalCard =
        modal.querySelector(".map-modal-card");

      if (modalCard) {
        modalCard.addEventListener("click", (event) => {
          event.stopPropagation();
        });
      }

    }

  } catch (error) {

    console.error(
      "Map initialization error:",
      error
    );

    smallMap.innerHTML = `
      <div
        style="
          display:grid;
          place-items:center;
          width:100%;
          height:100%;
          color:var(--muted);
          font-size:.8rem;
        "
      >
        Map unavailable
      </div>
    `;
  }
}


/* =========================================
   PREPARE SVG
========================================= */

function prepareSvg(svg) {

  svg.querySelectorAll("path").forEach((path) => {
    path.classList.add("land");
  });

}


/* =========================================
   LOCATION JOURNEY
========================================= */

function startLocationJourney(svg) {

  /*
   * Your existing Buxar coordinates.
   */
  const BUXAR_X = 712.5;
  const BUXAR_Y = 391.5;


  /*
   * WORLD
   *
   * Complete world map.
   */
  const WORLD_VIEW =
    "0 0 1008 660";


  /*
   * INDIA
   *
   * Wider India region.
   */
  const INDIA_VIEW =
    "590 240 290 300";


  /*
   * BIHAR / BUXAR
   *
   * Tight region around Buxar.
   */
  const BIHAR_VIEW =
    "670 345 100 95";


  /*
   * Reset to world first.
   */
  svg.setAttribute(
    "viewBox",
    WORLD_VIEW
  );


  const title =
    document.getElementById(
      "map-location-title"
    );

  const subtitle =
    document.getElementById(
      "map-location-subtitle"
    );

  const locationText =
    document.getElementById(
      "map-location-text"
    );


  if (title) {
    title.textContent =
      "Buxar, Bihar, India";
  }

  if (subtitle) {
    subtitle.textContent =
      "World";
  }


  if (locationText) {
    locationText.textContent =
      "Exploring location...";
  }


  /*
   * STEP 1
   *
   * World → India
   */
  setTimeout(() => {

    svg.setAttribute(
      "viewBox",
      INDIA_VIEW
    );

    if (subtitle) {
      subtitle.textContent =
        "India";
    }

  }, 700);


  /*
   * STEP 2
   *
   * India → Bihar
   */
  setTimeout(() => {

    svg.setAttribute(
      "viewBox",
      BIHAR_VIEW
    );

    if (subtitle) {
      subtitle.textContent =
        "Bihar";
    }

    /*
     * Add the Buxar pin
     * only after zooming.
     */
    addBuxarMarker(
      svg,
      BUXAR_X,
      BUXAR_Y
    );

  }, 1700);


  /*
   * STEP 3
   *
   * Final Buxar state.
   */
  setTimeout(() => {

    if (subtitle) {
      subtitle.textContent =
        "Buxar, Bihar";
    }

    if (locationText) {
      locationText.textContent =
        "Buxar, Bihar, India";
    }

  }, 2300);

}


/* =========================================
   BUXAR MARKER
========================================= */

function addBuxarMarker(
  svg,
  x = 712.5,
  y = 391.5
) {

  /*
   * Remove old marker.
   */
  const oldMarker =
    svg.querySelector(
      ".map-marker-group"
    );

  if (oldMarker) {
    oldMarker.remove();
  }


  const namespace =
    "http://www.w3.org/2000/svg";


  const group =
    document.createElementNS(
      namespace,
      "g"
    );

  group.setAttribute(
    "class",
    "map-marker-group"
  );


  /*
   * Pulse ring.
   */
  const pulse =
    document.createElementNS(
      namespace,
      "circle"
    );

  pulse.setAttribute(
    "cx",
    String(x)
  );

  pulse.setAttribute(
    "cy",
    String(y)
  );

  pulse.setAttribute(
    "r",
    "8"
  );

  pulse.setAttribute(
    "class",
    "map-marker-pulse"
  );


  /*
   * Center dot.
   */
  const dot =
    document.createElementNS(
      namespace,
      "circle"
    );

  dot.setAttribute(
    "cx",
    String(x)
  );

  dot.setAttribute(
    "cy",
    String(y)
  );

  dot.setAttribute(
    "r",
    "4"
  );

  dot.setAttribute(
    "class",
    "map-marker-dot"
  );


  group.appendChild(pulse);
  group.appendChild(dot);

  svg.appendChild(group);

}


/* =========================================
   CLOSE MAP
========================================= */

function closeMap() {

  const modal =
    document.getElementById(
      "map-modal"
    );

  if (!modal) return;

  modal.classList.remove(
    "is-open"
  );

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


/* =========================================
   EXPORT
========================================= */

export {
  initContact
};
