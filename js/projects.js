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

function getProjectGraphic(project) {
  if (project.image) {
    return `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)} preview" loading="lazy">`;
  }

  const id = project.id;

  if (id === "sign-language") {
    return `
      <div class="project-art-canvas project-art--vision" aria-hidden="true">
        <div class="art-hud-header">
          <span class="art-tag">CV // GESTURE PIPELINE</span>
          <span class="art-status">98.4% CONFIDENCE</span>
        </div>
        <svg class="art-svg-graphic" viewBox="0 0 400 240" fill="none">
          <!-- Neural Hand Skeleton & Bounding Box -->
          <rect x="90" y="30" width="220" height="180" rx="8" stroke="rgba(56,189,248,0.4)" stroke-dasharray="4 4" stroke-width="1.5"/>
          <path d="M200 180 L200 130 L160 90 L140 100 M200 130 L180 70 L175 45 M200 130 L200 60 L200 40 M200 130 L220 70 L225 48 M200 130 L240 95 L250 110" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Landmark nodes -->
          <circle cx="200" cy="180" r="4" fill="#3b82f6"/>
          <circle cx="200" cy="130" r="4" fill="#60a5fa"/>
          <circle cx="160" cy="90" r="3.5" fill="#38bdf8"/>
          <circle cx="140" cy="100" r="3.5" fill="#38bdf8"/>
          <circle cx="180" cy="70" r="3.5" fill="#38bdf8"/>
          <circle cx="175" cy="45" r="4" fill="#67e8f9"/>
          <circle cx="200" cy="60" r="3.5" fill="#38bdf8"/>
          <circle cx="200" cy="40" r="4" fill="#67e8f9"/>
          <circle cx="220" cy="70" r="3.5" fill="#38bdf8"/>
          <circle cx="225" cy="48" r="4" fill="#67e8f9"/>
          <circle cx="240" cy="95" r="3.5" fill="#38bdf8"/>
          <circle cx="250" cy="110" r="4" fill="#67e8f9"/>
          <!-- Translated Output Pill -->
          <rect x="130" y="165" width="140" height="32" rx="16" fill="rgba(16,21,32,0.9)" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="200" y="186" fill="#f8fafc" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" text-anchor="middle">GESTURE: "WELCOME"</text>
        </svg>
      </div>
    `;
  }

  if (id === "face-attendance") {
    return `
      <div class="project-art-canvas project-art--biometric" aria-hidden="true">
        <div class="art-hud-header">
          <span class="art-tag">BIOMETRIC // ATTENDANCE SCAN</span>
          <span class="art-status">DATABASE SYNCED</span>
        </div>
        <svg class="art-svg-graphic" viewBox="0 0 400 240" fill="none">
          <!-- Face Recognition Grid & Reticle -->
          <circle cx="200" cy="115" r="65" stroke="rgba(99,102,241,0.35)" stroke-width="1.5"/>
          <circle cx="200" cy="115" r="50" stroke="rgba(56,189,248,0.5)" stroke-width="1.5" stroke-dasharray="6 3"/>
          <path d="M150 75 L140 75 L140 85 M250 75 L260 75 L260 85 M150 155 L140 155 L140 145 M250 155 L260 155 L260 145" stroke="#38bdf8" stroke-width="2.5"/>
          <!-- Feature Points -->
          <circle cx="180" cy="100" r="3" fill="#60a5fa"/>
          <circle cx="220" cy="100" r="3" fill="#60a5fa"/>
          <circle cx="200" cy="115" r="2.5" fill="#38bdf8"/>
          <path d="M185 135 Q200 145 215 135" stroke="#38bdf8" stroke-width="2" fill="none"/>
          <!-- DB Log output badge -->
          <rect x="110" y="180" width="180" height="28" rx="6" fill="rgba(15,23,42,0.85)" stroke="rgba(99,102,241,0.4)" stroke-width="1"/>
          <text x="200" y="198" fill="#a5b4fc" font-family="'JetBrains Mono', monospace" font-size="11" text-anchor="middle">LOGGED -> MySQL [ID: #8677]</text>
        </svg>
      </div>
    `;
  }

  if (id === "sos-gps-tracker") {
    return `
      <div class="project-art-canvas project-art--telemetry" aria-hidden="true">
        <div class="art-hud-header">
          <span class="art-tag">ESP32 + A9G // TELEMETRY</span>
          <span class="art-status">MQTT ACTIVE</span>
        </div>
        <svg class="art-svg-graphic" viewBox="0 0 400 240" fill="none">
          <!-- Telemetry Satellite Radar Map -->
          <circle cx="200" cy="120" r="80" stroke="rgba(20,184,166,0.2)" stroke-width="1"/>
          <circle cx="200" cy="120" r="50" stroke="rgba(20,184,166,0.3)" stroke-width="1"/>
          <circle cx="200" cy="120" r="20" stroke="rgba(20,184,166,0.4)" stroke-width="1"/>
          <line x1="120" y1="120" x2="280" y2="120" stroke="rgba(20,184,166,0.25)" stroke-dasharray="3 3"/>
          <line x1="200" y1="40" x2="200" y2="200" stroke="rgba(20,184,166,0.25)" stroke-dasharray="3 3"/>
          <!-- Ping Beacon -->
          <circle cx="225" cy="95" r="6" fill="#14b8a6"/>
          <circle cx="225" cy="95" r="14" stroke="#14b8a6" stroke-width="1.5" opacity="0.6"/>
          <!-- Emergency Alert Box -->
          <rect x="100" y="175" width="200" height="30" rx="8" fill="rgba(15,23,42,0.9)" stroke="#14b8a6" stroke-width="1.2"/>
          <text x="200" y="195" fill="#5eead4" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" text-anchor="middle">SOS ALERT // GPS: 25.56°N</text>
        </svg>
      </div>
    `;
  }

  if (id === "emotion-detection") {
    return `
      <div class="project-art-canvas project-art--emotion" aria-hidden="true">
        <div class="art-hud-header">
          <span class="art-tag">DEEPFACE // REAL-TIME EMOTION</span>
          <span class="art-status">HAAR CASCADE</span>
        </div>
        <svg class="art-svg-graphic" viewBox="0 0 400 240" fill="none">
          <!-- Neural Face Mask -->
          <path d="M160 80 Q200 65 240 80 Q255 120 240 160 Q200 180 160 160 Q145 120 160 80 Z" stroke="rgba(192,132,252,0.4)" stroke-width="1.5" stroke-dasharray="4 2"/>
          <!-- Emotion Bars -->
          <rect x="80" y="80" width="60" height="8" rx="4" fill="rgba(255,255,255,0.1)"/>
          <rect x="80" y="80" width="52" height="8" rx="4" fill="#c084fc"/>
          <text x="75" y="87" fill="#e9d5ff" font-family="'JetBrains Mono', monospace" font-size="9" text-anchor="end">HAPPY</text>

          <rect x="80" y="105" width="60" height="8" rx="4" fill="rgba(255,255,255,0.1)"/>
          <rect x="80" y="105" width="18" height="8" rx="4" fill="#818cf8"/>
          <text x="75" y="112" fill="#c7d2fe" font-family="'JetBrains Mono', monospace" font-size="9" text-anchor="end">NEUTRAL</text>

          <rect x="260" y="80" width="60" height="8" rx="4" fill="rgba(255,255,255,0.1)"/>
          <rect x="260" y="80" width="10" height="8" rx="4" fill="#38bdf8"/>
          <text x="325" y="87" fill="#bae6fd" font-family="'JetBrains Mono', monospace" font-size="9">SURPRISE</text>

          <rect x="120" y="185" width="160" height="28" rx="14" fill="rgba(15,23,42,0.9)" stroke="#c084fc" stroke-width="1.2"/>
          <text x="200" y="203" fill="#f3e8ff" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" text-anchor="middle">PRIMARY: HAPPY (87%)</text>
        </svg>
      </div>
    `;
  }

  // Motion classification fallback
  return `
    <div class="project-art-canvas project-art--motion" aria-hidden="true">
      <div class="art-hud-header">
        <span class="art-tag">EDGE IMPULSE // IMU SENSORS</span>
        <span class="art-status">ON-DEVICE ML</span>
      </div>
      <svg class="art-svg-graphic" viewBox="0 0 400 240" fill="none">
        <!-- Multi-Axis Waveform -->
        <path d="M50 120 Q80 60 110 120 T170 120 T230 120 T290 120 T350 120" stroke="#38bdf8" stroke-width="2" fill="none"/>
        <path d="M50 125 Q90 160 130 125 T210 125 T290 125 T350 125" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="4 2" fill="none" opacity="0.8"/>
        <path d="M50 115 Q70 140 100 115 T180 115 T260 115 T350 115" stroke="#34d399" stroke-width="1.5" stroke-dasharray="3 3" fill="none" opacity="0.8"/>
        <!-- Classification output pill -->
        <rect x="110" y="175" width="180" height="30" rx="15" fill="rgba(15,23,42,0.9)" stroke="#38bdf8" stroke-width="1.2"/>
        <text x="200" y="195" fill="#f8fafc" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" text-anchor="middle">ACTIVITY: RUNNING [94%]</text>
      </svg>
    </div>
  `;
}

function renderProjects(root = document) {
  const mount = root.querySelector("#projects-grid");
  if (!mount) return;

  mount.innerHTML = projects
    .map((project, index) => {
      const isFeatured = Boolean(project.featured);
      const projectNumber = String(index + 1).padStart(2, "0");

      const github = isPublicUrl(project.github)
        ? `<a class="btn btn-ghost btn-sm" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
            <span>GitHub</span>
          </a>`
        : "";

      const live = isPublicUrl(project.live)
        ? `<a class="btn btn-primary btn-sm" href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer">
            <span>Live Demo</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>`
        : "";

      const links = live || github ? `<div class="project-links">${live}${github}</div>` : "";

      const featuredCaseStudy = isFeatured && project.problem
        ? `
          <div class="project-case-study">
            <div class="case-study-item">
              <span class="case-study-label">CHALLENGE</span>
              <p>${escapeHtml(project.problem)}</p>
            </div>
            <div class="case-study-item">
              <span class="case-study-label">ARCHITECTURE</span>
              <p>${escapeHtml(project.solution)}</p>
            </div>
          </div>
        `
        : "";

      return `
        <article class="card project-card ${isFeatured ? "is-featured-project" : "is-standard-project"} project-index-${index % 2}">
          <div class="project-media-col">
            ${getProjectGraphic(project)}
          </div>
          
          <div class="project-content-col">
            <div class="project-header">
              <span class="project-number-badge">${projectNumber} // CASE STUDY</span>
              ${isFeatured ? '<span class="project-featured-badge">FEATURED</span>' : ''}
            </div>

            <h3 class="project-heading">${escapeHtml(project.title)}</h3>
            
            <p class="project-description">${escapeHtml(project.description)}</p>

            ${featuredCaseStudy}

            <div class="project-tech-stack">
              ${project.tech.map((t) => `<span class="badge">${escapeHtml(t)}</span>`).join("")}
            </div>

            ${links}
          </div>
        </article>
      `;
    })
    .join("");
}

export { renderProjects };

