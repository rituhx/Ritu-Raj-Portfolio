import { projects } from "../data/projects.js";

function isPublicUrl(value) {
  if (!value || typeof value !== "string") return false;
  const v = value.trim();
  if (!v || v === "#" || v === "null" || /^unavailable$/i.test(v)) return false;
  return true;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function visualMarkup(project) {
  if (project.image) {
    return `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)} preview" loading="lazy">`;
  }
  const label = escapeHtml(project.title);
  const hint = escapeHtml((project.tech || []).slice(0, 2).join(" · "));
  return `
    <div class="project-visual project-visual--${escapeHtml(project.id)}" aria-hidden="true">
      <span class="project-visual-grid"></span>
      <span class="project-visual-title">${label}</span>
      <span class="project-visual-hint">${hint}</span>
    </div>`;
}

function renderProjects(root) {
  const mount = root.querySelector("#projects-grid");
  if (!mount) return;

  mount.innerHTML = projects
    .map((project) => {
      const github = isPublicUrl(project.github)
        ? `<a class="btn btn-ghost" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>`
        : "";
      const live = isPublicUrl(project.live)
        ? `<a class="btn btn-outline" href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
        : "";
      const links = live || github ? `<div class="project-links">${live}${github}</div>` : "";
      const featured = project.featured
        ? `<div class="project-meta">
            <div><span>Problem</span><p>${escapeHtml(project.problem)}</p></div>
            <div><span>Solution</span><p>${escapeHtml(project.solution)}</p></div>
            <div><span>Technology</span><p>${escapeHtml(project.tech.join(" · "))}</p></div>
          </div>`
        : "";
      return `
        <article class="card project-card${project.featured ? " is-featured" : ""}">
          <div class="project-media">${visualMarkup(project)}</div>
          <div class="project-body">
            <h3>${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(project.description)}</p>
            ${featured}
            <div class="project-tech">${project.tech.map((t) => `<span class="badge">${escapeHtml(t)}</span>`).join("")}</div>
            ${links}
          </div>
        </article>`;
    })
    .join("");
}

export { renderProjects };
