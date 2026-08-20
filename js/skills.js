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
   ABOUT SECTION
========================================================= */

function renderAbout(root = document) {

  const aboutCopy =
    root.getElementById("about-copy");

  if (!aboutCopy) return;

  aboutCopy.innerHTML = profile.about
    .map(
      (paragraph) => `<p>${paragraph}</p>`
    )
    .join("");

}


/* =========================================================
   SKILLS SECTION
========================================================= */

function renderSkills(root = document) {

  const skillsGrid =
    root.getElementById("skills-grid");

  if (!skillsGrid) return;

  skillsGrid.innerHTML = skills
    .map((skill) => {

      const items = skill.items
        .map((item) => {

          const skillName =
            typeof item === "string"
              ? item
              : item.name || item.title || "";


          const skillIcon =
            typeof item === "object" && item.icon

              ? `
                <i
                  class="${item.icon}"
                  aria-hidden="true"
                ></i>
              `

              : typeof item === "object" && item.iconText

                ? `
                  <span>
                    ${item.iconText}
                  </span>
                `

                : `
                  <span>
                    ${skillName.charAt(0)}
                  </span>
                `;


          return `
            <div class="skill-icon-item">

              <div class="skill-logo">
                ${skillIcon}
              </div>

              <span class="skill-name">
                ${skillName}
              </span>

            </div>
          `;

        })
        .join("");


      return `
        <article class="card skill-card">

          <h3>
            ${skill.category}
          </h3>

          <div class="skill-icons">
            ${items}
          </div>

        </article>
      `;

    })
    .join("");

}


/* =========================================================
   EXPERIENCE CARD HELPER
========================================================= */

function createExperienceCard(item) {

  const companyName = item.website

    ? `
      <a
        href="${item.website}"
        target="_blank"
        rel="noopener noreferrer"
        class="company-link"
      >
        ${item.company || ""}
      </a>
    `

    : item.company || "";


  const responsibilities =

    Array.isArray(item.responsibilities) &&
    item.responsibilities.length > 0

      ? `
        <ul>
          ${item.responsibilities
            .map(
              (point) => `<li>${point}</li>`
            )
            .join("")}
        </ul>
      `

      : "";


  const technologies =

    Array.isArray(item.technologies) &&
    item.technologies.length > 0

      ? `
        <div class="exp-tech">
          ${item.technologies
            .map(
              (tech) => `<span>${tech}</span>`
            )
            .join("")}
        </div>
      `

      : "";


  return `
    <article class="card exp-card">

      <div class="exp-meta">

        ${
          item.duration
            ? `<span>${item.duration}</span>`
            : ""
        }

        ${
          item.location
            ? `<span>${item.location}</span>`
            : ""
        }

      </div>


      <h3>
        ${companyName}
      </h3>


      ${
        item.role
          ? `<h4>${item.role}</h4>`
          : ""
      }


      ${responsibilities}


      ${technologies}

    </article>
  `;

}


/* =========================================================
   EXPERIENCE SECTION
========================================================= */

function renderExperience(root = document) {

  const rolesBlock =
    root.getElementById("roles-block");

  const experienceList =
    root.getElementById("experience-list");

  const educationList =
    root.getElementById("education-list");

  const independentBlock =
    root.getElementById("independent-block");

  const independentList =
    root.getElementById("independent-list");


  /* ROLES */

  if (

    rolesBlock &&
    experienceList &&
    Array.isArray(roles) &&
    roles.length > 0

  ) {

    rolesBlock.hidden = false;

    experienceList.innerHTML = roles
      .map(
        (item) => createExperienceCard(item)
      )
      .join("");

  }

  else if (rolesBlock) {

    rolesBlock.hidden = true;

  }


  /* EDUCATION */

  if (

    educationList &&
    Array.isArray(education) &&
    education.length > 0

  ) {

    educationList.innerHTML = education
      .map(
        (item) => createExperienceCard(item)
      )
      .join("");

  }


  /* INDEPENDENT WORK */

  if (

    independentBlock &&
    independentList &&
    Array.isArray(independentWork) &&
    independentWork.length > 0

  ) {

    independentBlock.hidden = false;

    independentList.innerHTML = independentWork
      .map(
        (item) => createExperienceCard(item)
      )
      .join("");

  }

  else if (independentBlock) {

    independentBlock.hidden = true;

  }

}


/* =========================================================
   CERTIFICATIONS SECTION
========================================================= */

function renderCertifications(root = document) {

  const graduationCard =
    root.getElementById("graduation-card");

  const certificationsGrid =
    root.getElementById("certs-grid");

  const modal =
    root.getElementById("certificate-modal");

  const modalTitle =
    root.getElementById("certificate-modal-title");

  const modalContent =
    root.getElementById("certificate-modal-content");


  /* =======================================================
     FEATURED GRADUATION CARD
     1 BIG HORIZONTAL CARD
  ======================================================= */

  if (graduationCard && graduation) {

    const degreeImage =
      graduation.url ||
      graduation.image ||
      "";


    graduationCard.innerHTML = `

      <article class="featured-graduation-card">

        <div class="featured-graduation-content">


          <div class="graduation-badge">

            <span class="graduation-badge-icon">
              🎓
            </span>

            <span>
              Graduated · Class of ${graduation.year || "2026"}
            </span>

          </div>


          <h3>
            ${graduation.title || "Bachelor of Technology"}
          </h3>


          <p class="graduation-specialization">
            ${
              graduation.specialization ||
              "Computer Science & Engineering"
            }
          </p>


          <div class="graduation-divider"></div>


          <div class="graduation-details">

            <div class="graduation-detail">

              <span class="graduation-detail-icon">
                ◈
              </span>

              <span>
                ${
                  graduation.institution ||
                  ""
                }
              </span>

            </div>


            <div class="graduation-detail">

              <span class="graduation-detail-icon">
                ⦿
              </span>

              <span>
                ${
                  graduation.location ||
                  ""
                }
              </span>

            </div>

          </div>


          <div class="graduation-actions">


            <div class="graduation-info-chip">

              <span>
                ✓
              </span>

              <span>
                Graduated in ${graduation.year || "2026"}
              </span>

            </div>


            <div class="graduation-info-chip">

              <span>
                ★
              </span>

              <span>
                CGPA: ${graduation.cgpa || ""}
              </span>

            </div>


            ${
              degreeImage

                ? `
                  <button
                    type="button"
                    class="view-degree-btn"
                    data-preview-name="${
                      graduation.title || "Degree Certificate"
                    }"
                    data-preview-image="${degreeImage}"
                  >

                    <span>
                      View Degree
                    </span>

                    <span
                      class="degree-arrow"
                      aria-hidden="true"
                    >
                      ↗
                    </span>

                  </button>
                `

                : ""
            }

          </div>

        </div>


        ${
          graduation.image

            ? `
              <div class="featured-graduation-image">

                <img
                  src="${graduation.image}"
                  alt="${
                    graduation.title ||
                    "Graduation Degree"
                  }"
                >

              </div>
            `

            : ""
        }

      </article>

    `;

  }


  /* =======================================================
     4 NORMAL CERTIFICATES
     2 × 2 GRID
  ======================================================= */

  if (

    certificationsGrid &&
    Array.isArray(certifications) &&
    certifications.length > 0

  ) {

    certificationsGrid.innerHTML = certifications
      .map((certificate) => {

        const certificateImage =
          certificate.url ||
          certificate.image ||
          "";


        return `

          <article class="card certification-card">


            <div class="certification-content">


              <h3>
                ${certificate.name || ""}
              </h3>


              ${
                certificate.issuer

                  ? `
                    <p class="certification-issuer">
                      ${certificate.issuer}
                    </p>
                  `

                  : ""
              }


              ${
                certificate.date

                  ? `
                    <span class="certification-date">
                      ${certificate.date}
                    </span>
                  `

                  : ""
              }


              ${
                certificateImage

                  ? `
                    <button
                      type="button"
                      class="view-certificate-btn"
                      data-preview-name="${
                        certificate.name || "Certificate"
                      }"
                      data-preview-image="${certificateImage}"
                    >

                      <span>
                        View Certificate
                      </span>

                      <span
                        class="certificate-arrow"
                        aria-hidden="true"
                      >
                        →
                      </span>

                    </button>
                  `

                  : ""
              }


            </div>


            ${
              certificate.image

                ? `
                  <div class="certification-image">

                    <img
                      src="${certificate.image}"
                      alt="${
                        certificate.name || "Certificate"
                      }"
                      loading="lazy"
                    >

                  </div>
                `

                : ""
            }


          </article>

        `;

      })
      .join("");

  }


  /* =======================================================
     MODAL SAFETY
  ======================================================= */

  if (

    !modal ||
    !modalContent

  ) {

    return;

  }


  /* =======================================================
     OPEN PREVIEW
  ======================================================= */

  function openPreview(name, image) {

    if (!image) return;


    if (modalTitle) {

      modalTitle.textContent =
        name || "Certificate Preview";

    }


    modalContent.innerHTML = `
      <img
        src="${image}"
        alt="${name || "Certificate"}"
      >
    `;


    modal.classList.add("is-open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style.overflow =
      "hidden";

  }


  /* =======================================================
     CLOSE PREVIEW
  ======================================================= */

  function closePreview() {

    modal.classList.remove("is-open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.style.overflow =
      "";


    setTimeout(() => {

      if (
        !modal.classList.contains("is-open")
      ) {

        modalContent.innerHTML = "";

      }

    }, 250);

  }


  /* =======================================================
     CLICK HANDLER
     DEGREE + ALL CERTIFICATES
  ======================================================= */

  const previewButtons =
    root.querySelectorAll(
      "[data-preview-image]"
    );


  previewButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const name =
          button.dataset.previewName;

        const image =
          button.dataset.previewImage;


        openPreview(
          name,
          image
        );

      }
    );

  });


  /* =======================================================
     CLOSE BUTTON / BACKDROP
  ======================================================= */

  const closeButtons =
    root.querySelectorAll(
      "[data-certificate-close]"
    );


  closeButtons.forEach((button) => {

    button.addEventListener(
      "click",
      closePreview
    );

  });


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (

        event.key === "Escape" &&
        modal.classList.contains("is-open")

      ) {

        closePreview();

      }

    }
  );

}


/* =========================================================
   EXPORT FUNCTIONS
========================================================= */

export {

  renderAbout,

  renderCertifications,

  renderExperience,

  renderSkills
};
