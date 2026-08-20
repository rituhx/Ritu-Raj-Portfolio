import { graduationPhotos, FEATURED_COUNT } from "../data/graduation.js";

let lightboxIndex = 0;
let lightboxEl = null;
let keyHandler = null;
let lastFocus = null;
let touchStartX = 0;
let touchStartY = 0;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function photoAlt(photo) {
  return photo.title + " — graduation photograph";
}

function cardMarkup(photo, featured) {
  return `
    <button type="button" class="grad-item" data-grad-id="${photo.id}" aria-label="Open ${escapeHtml(photo.title)}">
      <img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photoAlt(photo))}" width="${featured ? 1200 : 720}" height="${featured ? 720 : 480}" loading="lazy">
      <span class="grad-overlay" aria-hidden="true"></span>
      <span class="grad-caption">${escapeHtml(photo.title)}</span>
    </button>`;
}

function ensureLightbox() {
  if (lightboxEl) return lightboxEl;
  lightboxEl = document.createElement("div");
  lightboxEl.className = "grad-lightbox";
  lightboxEl.id = "grad-lightbox";
  lightboxEl.setAttribute("role", "dialog");
  lightboxEl.setAttribute("aria-modal", "true");
  lightboxEl.setAttribute("aria-label", "Graduation gallery");
  lightboxEl.innerHTML = `
    <div class="grad-lightbox-inner">
      <div class="grad-lightbox-stage">
        <button type="button" class="grad-icon-btn grad-lightbox-close" data-grad-close aria-label="Close gallery">✕</button>
        <img id="grad-lightbox-image" alt="">
      </div>
      <div class="grad-lightbox-bar">
        <div>
          <strong id="grad-lightbox-title"></strong>
          <div class="grad-counter" id="grad-lightbox-counter"></div>
        </div>
        <div class="grad-nav">
          <button type="button" class="grad-icon-btn" data-grad-prev aria-label="Previous image">‹</button>
          <button type="button" class="grad-icon-btn" data-grad-next aria-label="Next image">›</button>
        </div>
      </div>
      <div class="grad-thumbs" id="grad-thumbs" role="list" aria-label="All 50 graduation photographs"></div>
    </div>`;
  document.body.appendChild(lightboxEl);

  const thumbs = lightboxEl.querySelector("#grad-thumbs");
  thumbs.innerHTML = graduationPhotos
    .map(
      (photo) => `
      <button type="button" class="grad-thumb" role="listitem" data-grad-thumb="${photo.id}" aria-label="${escapeHtml(photo.title)}">
        <img src="${escapeHtml(photo.image)}" alt="" loading="lazy" width="96" height="72">
      </button>`
    )
    .join("");

  lightboxEl.addEventListener("click", (event) => {
    if (event.target === lightboxEl) closeLightbox();
  });
  lightboxEl.querySelector("[data-grad-close]").addEventListener("click", closeLightbox);
  lightboxEl.querySelector("[data-grad-prev]").addEventListener("click", () => stepLightbox(-1));
  lightboxEl.querySelector("[data-grad-next]").addEventListener("click", () => stepLightbox(1));
  thumbs.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-grad-thumb]");
    if (!btn) return;
    lightboxIndex = indexForId(btn.getAttribute("data-grad-thumb"));
    showLightboxImage();
  });

  const stage = lightboxEl.querySelector(".grad-lightbox-stage");
  stage.addEventListener(
    "touchstart",
    (event) => {
      const t = event.changedTouches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
    },
    { passive: true }
  );
  stage.addEventListener(
    "touchend",
    (event) => {
      const t = event.changedTouches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
      stepLightbox(dx < 0 ? 1 : -1);
    },
    { passive: true }
  );
  return lightboxEl;
}

function showLightboxImage() {
  const photo = graduationPhotos[lightboxIndex];
  if (!photo || !lightboxEl) return;
  const img = lightboxEl.querySelector("#grad-lightbox-image");
  img.src = photo.image;
  img.alt = photoAlt(photo);
  lightboxEl.querySelector("#grad-lightbox-title").textContent = photo.title;
  lightboxEl.querySelector("#grad-lightbox-counter").textContent =
    lightboxIndex + 1 + " / " + graduationPhotos.length;
  lightboxEl.querySelectorAll("[data-grad-thumb]").forEach((btn, i) => {
    btn.classList.toggle("is-active", i === lightboxIndex);
  });
  const active = lightboxEl.querySelector("[data-grad-thumb].is-active");
  if (active) active.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
}

function openLightbox(index) {
  lastFocus = document.activeElement;
  ensureLightbox();
  lightboxIndex = (index + graduationPhotos.length) % graduationPhotos.length;
  showLightboxImage();
  lightboxEl.classList.add("is-open");
  document.body.style.overflow = "hidden";
  lightboxEl.querySelector("[data-grad-close]").focus();
  if (!keyHandler) {
    keyHandler = (event) => {
      if (!lightboxEl.classList.contains("is-open")) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") stepLightbox(-1);
      if (event.key === "ArrowRight") stepLightbox(1);
    };
    document.addEventListener("keydown", keyHandler);
  }
}

function closeLightbox() {
  if (!lightboxEl) return;
  lightboxEl.classList.remove("is-open");
  document.body.style.overflow = "";
  if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
}

function stepLightbox(delta) {
  lightboxIndex = (lightboxIndex + delta + graduationPhotos.length) % graduationPhotos.length;
  showLightboxImage();
}

function indexForId(id) {
  const i = graduationPhotos.findIndex((p) => String(p.id) === String(id));
  return i === -1 ? 0 : i;
}

function initGraduation() {
  const featuredMount = document.getElementById("grad-featured");
  if (featuredMount) {
    featuredMount.innerHTML = graduationPhotos
      .slice(0, FEATURED_COUNT)
      .map((photo, i) => cardMarkup(photo, i === 0))
      .join("");
    featuredMount.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-grad-id]");
      if (!btn) return;
      openLightbox(indexForId(btn.getAttribute("data-grad-id")));
    });
  }

  const openAll = document.getElementById("grad-open-gallery");
  if (openAll) {
    openAll.addEventListener("click", () => openLightbox(0));
  }
}

export { initGraduation };
