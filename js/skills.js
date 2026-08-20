import {
  certifications,
  graduation
} from "../data/certifications.js";

import {
  education,
  independentWork,
  roles
} from "../data/experience.js";

import { profile } from "../data/profile.js";

import { skills } from "../data/skills.js";


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


/* =========================================================
   ABOUT
========================================================= */

function renderAbout(root) {
  const mount = root.querySelector("#about-copy");

  if (!mount) return;

  mount.innerHTML = profile.about
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");
}


/* =========================================================
   SKILLS
========================================================= */

function renderSkills(root) {
  const mount = root.querySelector("#skills-grid");

  if (!mount) return;

  mount.innerHTML = skills
    .map(
      (group) => `
        <article class="card skill-card">

          <h3>
            ${escapeHtml(group.category)}
          </h3>

          <ul>
            ${group.items
              .map(
                (item) =>
                  `<li>${escapeHtml(item)}</li>`
              )
              .join("")}
          </ul>

        </article>
      `
    )
    .join("");
}


/* =========================================================
   EXPERIENCE CARD
========================================================= */

function cardMarkup(item) {
  return `
    <article class="card exp-card">

      <div class="exp-meta">
        <span>
          ${escapeHtml(item.duration)}
        </span>

        <span>
          ${escapeHtml(item.location)}
        </span>
      </div>

      <h3>
        ${escapeHtml(item.role)}
      </h3>

      <h4>
        ${escapeHtml(item.company)}
      </h4>

      <ul>
        ${item.responsibilities
          .map(
            (r) =>
              `<li>${escapeHtml(r)}</li>`
          )
          .join("")}
      </ul>

      <div class="exp-tech">
        ${item.technologies
          .map(
            (t) =>
              `<span>${escapeHtml(t)}</span>`
          )
          .join("")}
      </div>

    </article>
  `;
}


/* =========================================================
   EXPERIENCE LIST
========================================================= */

function fillList(
  root,
  selector,
  items,
  blockId
) {
  const mount =
    root.querySelector(selector);

  if (!mount) return;

  const block = blockId
    ? root.querySelector(blockId)
    : null;


  if (!items.length) {

    if (block) {
      block.hidden = true;
    }

    mount.innerHTML = "";

    return;
  }


  if (block) {
    block.hidden = false;
  }


  mount.innerHTML =
    items.map(cardMarkup).join("");
}


/* =========================================================
   EXPERIENCE
========================================================= */

function renderExperience(root) {

  fillList(
    root,
    "#experience-list",
    roles,
    "#roles-block"
  );

  fillList(
    root,
    "#education-list",
    education
  );

  fillList(
    root,
    "#independent-list",
    independentWork,
    "#independent-block"
  );
}


/* =========================================================
   CREATE CERTIFICATE MODAL
========================================================= */

function createCertificateModal() {

  /*
   * Prevent duplicate modal.
   */

  if (
    document.getElementById(
      "certificate-modal"
    )
  ) {
    return;
  }


  const modal =
    document.createElement("div");


  modal.id =
    "certificate-modal";


  modal.className =
    "certificate-modal";


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  modal.innerHTML = `

    <div
      class="certificate-modal-backdrop"
      data-certificate-close
    ></div>


    <div
      class="certificate-modal-box"
      role="dialog"
      aria-modal="true"
      aria-label="Certificate preview"
    >

      <div class="certificate-modal-header">

        <div>

          <span>
            Certificate
          </span>

          <h3
            id="certificate-modal-title"
          >
            Certificate Preview
          </h3>

        </div>


        <button
          type="button"
          class="certificate-close"
          data-certificate-close
          aria-label="Close certificate"
        >
          ×
        </button>

      </div>


      <div
        class="certificate-modal-content"
        id="certificate-modal-content"
      ></div>

    </div>
  `;


  document.body.appendChild(modal);
}


/* =========================================================
   OPEN CERTIFICATE
========================================================= */

function openCertificate(cert) {

  const modal =
    document.getElementById(
      "certificate-modal"
    );

  const title =
    document.getElementById(
      "certificate-modal-title"
    );

  const content =
    document.getElementById(
      "certificate-modal-content"
    );


  if (
    !modal ||
    !title ||
    !content ||
    !cert.url
  ) {
    return;
  }


  title.textContent =
    cert.name;


  /*
   * Clear previous certificate.
   */

  content.innerHTML = "";


  /*
   * PDF certificate
   */

  if (
    cert.url
      .toLowerCase()
      .includes(".pdf")
  ) {

    const iframe =
      document.createElement("iframe");

    iframe.src =
      cert.url;

    iframe.title =
      cert.name;

    iframe.loading =
      "lazy";

    content.appendChild(
      iframe
    );

  }


  /*
   * Image certificate
   */

  else {

    const image =
      document.createElement("img");

    image.src =
      cert.url;

    image.alt =
      `${cert.name} certificate`;

    image.loading =
      "eager";

    content.appendChild(
      image
    );
  }


  /*
   * Open modal
   */

  modal.classList.add(
    "is-open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  /*
   * Prevent page scrolling
   */

  document.body.style.overflow =
    "hidden";
}


/* =========================================================
   CLOSE CERTIFICATE
========================================================= */

function closeCertificate() {

  const modal =
    document.getElementById(
      "certificate-modal"
    );


  const content =
    document.getElementById(
      "certificate-modal-content"
    );


  if (!modal) return;


  modal.classList.remove(
    "is-open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  /*
   * Remove certificate from DOM
   */

  if (content) {
    content.innerHTML = "";
  }


  /*
   * Restore page scrolling
   */

  document.body.style.overflow =
    "";
}


/* =========================================================
   CERTIFICATIONS
========================================================= */

function renderCertifications(root) {

  const mount =
    root.querySelector(
      "#certs-grid"
    );


  const section =
    root.querySelector(
      "#certifications"
    );


  const graduationMount =
    root.querySelector(
      "#graduation-card"
    );


  if (!mount) return;


  /*
   * Hide section if there are
   * no certifications or graduation data.
   */

  if (
    !certifications.length &&
    !graduation &&
    section
  ) {

    section.hidden = true;

    return;
  }


  /*
   * Make modal.
   */

  createCertificateModal();


  /* =====================================================
     FEATURED GRADUATION CARD
  ===================================================== */

  if (
    graduation &&
    graduationMount
  ) {

    graduationMount.innerHTML = `

      <article class="graduation-featured-card">

        <div class="graduation-content">


          <div class="graduation-badge">

            <span
              class="graduation-icon"
              aria-hidden="true"
            >
              🎓
            </span>

            <span>
              GRADUATED · CLASS OF ${escapeHtml(
                graduation.year
              )}
            </span>

          </div>


          <h3>
            ${escapeHtml(
              graduation.title
            )}
          </h3>


          <p class="graduation-specialization">

            ${escapeHtml(
              graduation.specialization
            )}

          </p>


          <div class="graduation-divider"></div>


          <div class="graduation-info">


            <div class="graduation-info-item">

              <span
                class="graduation-info-icon"
                aria-hidden="true"
              >
                ◈
              </span>

              <div>

                <strong>

                  ${escapeHtml(
                    graduation.institution
                  )}

                </strong>

              </div>

            </div>


            <div class="graduation-info-item">

              <span
                class="graduation-info-icon"
                aria-hidden="true"
              >
                ◉
              </span>

              <div>

                ${escapeHtml(
                  graduation.location
                )}

              </div>

            </div>


          </div>


          <div class="graduation-bottom">


            <div class="graduation-stats">


              <div class="graduation-stat">

                <span
                  class="stat-icon"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <span>

                  Graduated in
                  ${escapeHtml(
                    graduation.year
                  )}

                </span>

              </div>


              <div class="graduation-stat">

                <span
                  class="stat-icon"
                  aria-hidden="true"
                >
                  ☆
                </span>

                <span>

                  CGPA:
                  ${escapeHtml(
                    graduation.cgpa
                  )}

                </span>

              </div>


            </div>


            <button
              type="button"
              class="graduation-button"
              data-graduation-id="${escapeHtml(
                graduation.id
              )}"
            >

              <span>
                View Degree
              </span>

              <span
                aria-hidden="true"
              >
                ↗
              </span>

            </button>


          </div>


        </div>


        <div class="graduation-image-wrap">

          <img
            src="${escapeHtml(
              graduation.image
            )}"
            alt="${escapeHtml(
              graduation.title
            )} degree certificate"
            class="graduation-image"
            loading="lazy"
          >

        </div>


      </article>

    `;
  }


  /*
   * Render normal certificate cards.
   */

  mount.innerHTML =
    certifications
      .map((cert) => {

        const preview =
          cert.image
            ? `
              <div class="cert-preview">

                <img
                  src="${escapeHtml(cert.image)}"
                  alt="${escapeHtml(
                    cert.name
                  )} certificate"
                  loading="lazy"
                >

              </div>
            `
            : "";


        const button =
          cert.url
            ? `
              <button
                type="button"
                class="cert-view-btn"
                data-cert-id="${escapeHtml(
                  cert.id
                )}"
              >

                <span>
                  View Certificate
                </span>

                <span
                  aria-hidden="true"
                >
                  →
                </span>

              </button>
            `
            : "";


        const date =
          cert.date
            ? `
              <p>
                ${escapeHtml(
                  cert.date
                )}
              </p>
            `
            : "";


        return `

          <article class="card cert-card">

            ${preview}

            <div>

              <h3>
                ${escapeHtml(
                  cert.name
                )}
              </h3>

              <p>
                ${escapeHtml(
                  cert.issuer
                )}
              </p>

              ${date}

              ${button}

            </div>

          </article>

        `;

      })
      .join("");


  /* =====================================================
     CERTIFICATE CARD CLICK
  ===================================================== */

  mount.addEventListener(
    "click",
    (event) => {

      const button =
        event.target.closest(
          "[data-cert-id]"
        );


      if (!button) {
        return;
      }


      const cert =
        certifications.find(
          (item) =>
            item.id ===
            button.dataset.certId
        );


      if (!cert) {
        return;
      }


      event.preventDefault();


      openCertificate(cert);
    }
  );


  /* =====================================================
     GRADUATION DEGREE CLICK
  ===================================================== */

  if (graduationMount) {

    graduationMount.addEventListener(
      "click",
      (event) => {

        const button =
          event.target.closest(
            "[data-graduation-id]"
          );


        if (!button) {
          return;
        }


        event.preventDefault();


        openCertificate({
          id: graduation.id,

          name:
            `${graduation.title} — ${graduation.specialization}`,

          url:
            graduation.url
        });

      }
    );

  }


  /* =====================================================
     CLOSE BUTTON / BACKDROP
  ===================================================== */

  const modal =
    document.getElementById(
      "certificate-modal"
    );


  if (modal) {

    modal.addEventListener(
      "click",
      (event) => {

        if (
          event.target.closest(
            "[data-certificate-close]"
          )
        ) {

          closeCertificate();

        }

      }
    );

  }


  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {

        const modal =
          document.getElementById(
            "certificate-modal"
          );


        if (
          modal &&
          modal.classList.contains(
            "is-open"
          )
        ) {

          closeCertificate();

        }

      }

    }
  );
}


/* =========================================================
   EXPORT
========================================================= */

export {
  renderAbout,
  renderCertifications,
  renderExperience,
  renderSkills
};
