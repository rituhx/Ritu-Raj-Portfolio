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

/* =========================================================
   CLEAN ENGINEERING ARCHITECTURAL SCHEMATICS
   Genuine pipeline architectures, relational schemas, and DSP diagrams
========================================================= */

function getProjectGraphic(project) {
  if (project.image) {
    return `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)} preview" loading="lazy" decoding="async">`;
  }

  const id = project.id;

  if (id === "sign-language") {
    return `
      <div class="project-art-canvas project-art--vision" aria-hidden="true">
        <div class="art-schematic-header">
          <span class="schematic-label">VISION PIPELINE</span>
          <span class="schematic-tech">OPENCV + NUMPY</span>
        </div>
        <svg class="art-svg-graphic" viewBox="0 0 400 200" fill="none">
          <!-- Frame Boundary -->
          <rect x="45" y="15" width="310" height="170" rx="8" stroke="rgba(180,83,9,0.3)" stroke-dasharray="4 4" stroke-width="1.2"/>
          
          <!-- Hand Skeleton Landmark Vectors -->
          <path d="M200 155 L200 110 L165 75 L145 85 M200 110 L180 55 L175 30 M200 110 L200 45 L200 25 M200 110 L220 55 L225 32 M200 110 L235 80 L245 95" stroke="#D97706" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
          
          <!-- Landmark Coordinate Nodes -->
          <circle cx="200" cy="155" r="4.5" fill="#B45309"/>
          <circle cx="200" cy="110" r="4" fill="#F59E0B"/>
          <circle cx="165" cy="75" r="3.5" fill="#D97706"/>
          <circle cx="145" cy="85" r="3" fill="#F59E0B"/>
          <circle cx="180" cy="55" r="3.5" fill="#D97706"/>
          <circle cx="175" cy="30" r="3" fill="#F59E0B"/>
          <circle cx="200" cy="45" r="3.5" fill="#D97706"/>
          <circle cx="200" cy="25" r="3" fill="#F59E0B"/>
          <circle cx="220" cy="55" r="3.5" fill="#D97706"/>
          <circle cx="225" cy="32" r="3" fill="#F59E0B"/>
          <circle cx="235" cy="80" r="3.5" fill="#D97706"/>
          <circle cx="245" cy="95" r="3" fill="#F59E0B"/>

          <!-- Pipeline Processing Stage Vector -->
          <line x1="260" y1="95" x2="310" y2="95" stroke="#64748B" stroke-width="1.5" stroke-dasharray="3 3"/>
          <polygon points="310,91 318,95 310,99" fill="#64748B"/>
          
          <!-- Translated Text Token Buffer -->
          <rect x="125" y="142" width="150" height="28" rx="6" fill="#1E293B" stroke="#D97706" stroke-width="1.2"/>
          <text x="200" y="160" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" text-anchor="middle">GESTURE ➔ TEXT</text>
        </svg>
      </div>
    `;
  }

  if (id === "face-attendance") {
    return `
      <div class="project-art-canvas project-art--biometric" aria-hidden="true">
        <div class="art-schematic-header">
          <span class="schematic-label">BIOMETRIC PIPELINE</span>
          <span class="schematic-tech">OPENCV + MYSQL</span>
        </div>
        <svg class="art-svg-graphic" viewBox="0 0 400 200" fill="none">
          <!-- Face Landmark Mesh -->
          <circle cx="145" cy="100" r="50" stroke="#D97706" stroke-width="1.4" opacity="0.8"/>
          <circle cx="145" cy="100" r="36" stroke="#1E293B" stroke-dasharray="4 2" stroke-width="1" opacity="0.5"/>
          <path d="M110 70 L100 70 L100 80 M180 70 L190 70 L190 80 M110 130 L100 130 L100 120 M180 130 L190 130 L190 120" stroke="#B45309" stroke-width="2.2"/>
          
          <!-- Key Facial Feature Points -->
          <circle cx="130" cy="90" r="3" fill="#D97706"/>
          <circle cx="160" cy="90" r="3" fill="#D97706"/>
          <circle cx="145" cy="102" r="2.5" fill="#F59E0B"/>
          <path d="M133 118 Q145 125 157 118" stroke="#D97706" stroke-width="2" fill="none"/>

          <!-- Sync Arrow to Database Schema -->
          <line x1="210" y1="100" x2="250" y2="100" stroke="#64748B" stroke-width="1.5" stroke-dasharray="3 3"/>
          <polygon points="250,96 258,100 250,104" fill="#64748B"/>

          <!-- Relational Database Schema Node -->
          <rect x="258" y="58" width="115" height="84" rx="6" fill="#1E293B" stroke="#334155" stroke-width="1.2"/>
          <rect x="258" y="58" width="115" height="22" rx="6" fill="#D97706"/>
          <text x="315" y="73" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="800" text-anchor="middle">MySQL ATTENDANCE</text>
          <text x="268" y="96" fill="#CBD5E1" font-family="'JetBrains Mono', monospace" font-size="8">• user_id: INT</text>
          <text x="268" y="110" fill="#CBD5E1" font-family="'JetBrains Mono', monospace" font-size="8">• timestamp: TIME</text>
          <text x="268" y="124" fill="#34D399" font-family="'JetBrains Mono', monospace" font-size="8">• status: VERIFIED</text>
        </svg>
      </div>
    `;
  }

  if (id === "sos-gps-tracker") {
    return `
      <div class="project-art-canvas project-art--telemetry" aria-hidden="true">
        <div class="art-schematic-header">
          <span class="schematic-label">IOT TELEMETRY</span>
          <span class="schematic-tech">ESP32 + MQTT</span>
        </div>
        <svg class="art-svg-graphic" viewBox="0 0 400 200" fill="none">
          <!-- Architecture Node 1: Sensor & MCU -->
          <rect x="30" y="72" width="85" height="56" rx="6" fill="#1E293B" stroke="#D97706" stroke-width="1.5"/>
          <text x="72" y="96" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="800" text-anchor="middle">ESP32</text>
          <text x="72" y="112" fill="#FDE68A" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">FreeRTOS</text>

          <!-- Bus Connector -->
          <line x1="115" y1="100" x2="155" y2="100" stroke="#D97706" stroke-width="2"/>

          <!-- Architecture Node 2: Cellular / GPS -->
          <rect x="155" y="72" width="85" height="56" rx="6" fill="#1E293B" stroke="#475569" stroke-width="1.2"/>
          <text x="197" y="96" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="800" text-anchor="middle">A9G GSM</text>
          <text x="197" y="112" fill="#38BDF8" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">GPS Fix</text>

          <!-- Wireless Transmission -->
          <line x1="240" y1="100" x2="280" y2="100" stroke="#059669" stroke-width="1.8" stroke-dasharray="3 3"/>
          <polygon points="280,96 288,100 280,104" fill="#059669"/>

          <!-- Architecture Node 3: Cloud Broker / SMS -->
          <rect x="288" y="72" width="85" height="56" rx="6" fill="#064E3B" stroke="#10B981" stroke-width="1.2"/>
          <text x="330" y="96" fill="#A7F3D0" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="800" text-anchor="middle">MQTT</text>
          <text x="330" y="112" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">SMS Alert</text>
        </svg>
      </div>
    `;
  }

  if (id === "emotion-detection") {
    return `
      <div class="project-art-canvas project-art--emotion" aria-hidden="true">
        <div class="art-schematic-header">
          <span class="schematic-label">CLASSIFICATION PIPELINE</span>
          <span class="schematic-tech">DEEPFACE + OPENCV</span>
        </div>
        <svg class="art-svg-graphic" viewBox="0 0 400 200" fill="none">
          <!-- Face Bounding Box -->
          <rect x="55" y="45" width="110" height="110" rx="8" stroke="#D97706" stroke-dasharray="5 3" stroke-width="1.5"/>
          <circle cx="110" cy="100" r="36" stroke="#1E293B" stroke-width="1.2" opacity="0.6"/>
          <path d="M95 88 Q110 80 125 88 M90 95 L100 95 M120 95 L130 95 M97 118 Q110 128 123 118" stroke="#B45309" stroke-width="2" fill="none"/>

          <!-- Processing Arrow -->
          <line x1="172" y1="100" x2="220" y2="100" stroke="#64748B" stroke-width="1.8" stroke-dasharray="3 3"/>
          <polygon points="220,96 228,100 220,104" fill="#64748B"/>

          <!-- Emotion Probability Distribution Vector -->
          <rect x="230" y="50" width="140" height="100" rx="6" fill="#1E293B" stroke="#334155" stroke-width="1.2"/>
          <text x="242" y="72" fill="#F8FAFC" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700">Expression Vector</text>

          <text x="242" y="90" fill="#94A3B8" font-family="'JetBrains Mono', monospace" font-size="7.5">Neutral</text>
          <rect x="290" y="83" width="70" height="6" rx="3" fill="#334155"/>
          <rect x="290" y="83" width="60" height="6" rx="3" fill="#D97706"/>

          <text x="242" y="105" fill="#94A3B8" font-family="'JetBrains Mono', monospace" font-size="7.5">Happy</text>
          <rect x="290" y="98" width="70" height="6" rx="3" fill="#334155"/>
          <rect x="290" y="98" width="30" height="6" rx="3" fill="#64748B"/>

          <text x="242" y="120" fill="#94A3B8" font-family="'JetBrains Mono', monospace" font-size="7.5">Surprise</text>
          <rect x="290" y="113" width="70" height="6" rx="3" fill="#334155"/>
          <rect x="290" y="113" width="16" height="6" rx="3" fill="#64748B"/>

          <text x="300" y="139" fill="#FDE68A" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" text-anchor="middle">DeepFace Classified</text>
        </svg>
      </div>
    `;
  }

  // Motion classification
  return `
    <div class="project-art-canvas project-art--motion" aria-hidden="true">
      <div class="art-schematic-header">
        <span class="schematic-label">SIGNAL CLASSIFIER</span>
        <span class="schematic-tech">EDGE IMPULSE + IMU</span>
      </div>
      <svg class="art-svg-graphic" viewBox="0 0 400 200" fill="none">
        <!-- 3-Axis IMU Waveform Streams -->
        <path d="M35 82 Q65 42 95 82 T155 82 T215 82" stroke="#D97706" stroke-width="2.2" fill="none"/>
        <path d="M35 96 Q75 128 115 96 T195 96 T235 96" stroke="#0284C7" stroke-width="1.6" stroke-dasharray="4 2" fill="none"/>
        <path d="M35 110 Q55 125 85 110 T145 110 T205 110" stroke="#059669" stroke-width="1.6" stroke-dasharray="3 2" fill="none"/>

        <!-- Stream Axis Legend -->
        <rect x="35" y="128" width="45" height="18" rx="3" fill="#1E293B"/>
        <text x="57" y="140" fill="#FDE68A" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" text-anchor="middle">AccX</text>

        <rect x="85" y="128" width="45" height="18" rx="3" fill="#1E293B"/>
        <text x="107" y="140" fill="#38BDF8" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" text-anchor="middle">AccY</text>

        <rect x="135" y="128" width="45" height="18" rx="3" fill="#1E293B"/>
        <text x="157" y="140" fill="#34D399" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" text-anchor="middle">AccZ</text>

        <!-- Feature DSP Extraction & Model Block -->
        <line x1="225" y1="96" x2="260" y2="96" stroke="#64748B" stroke-width="1.8" stroke-dasharray="3 3"/>
        <polygon points="260,92 268,96 260,100" fill="#64748B"/>

        <rect x="270" y="60" width="110" height="74" rx="6" fill="#1E293B" stroke="#334155" stroke-width="1.2"/>
        <text x="325" y="84" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="800" text-anchor="middle">EDGE IMPULSE</text>
        <text x="325" y="100" fill="#FDE68A" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" text-anchor="middle">On-Device DSP</text>
        <text x="325" y="116" fill="#34D399" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" text-anchor="middle">TinyML Inference</text>
      </svg>
    </div>
  `;
}

function renderProjects(root = document) {
  const mount = root.querySelector("#projects-grid");
  if (!mount) return;

  const featured = projects.find((p) => p.featured) || projects[0];
  const regular = projects.filter((p) => p !== featured);

  function renderActionIcons(project) {
    const githubLink = isPublicUrl(project.github)
      ? `<a class="project-action-icon" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(project.title)} source code on GitHub" title="GitHub">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
        </a>`
      : "";

    const liveLink = isPublicUrl(project.live)
      ? `<a class="project-action-icon" href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(project.title)} live demo" title="Live Demo">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>`
      : "";

    return (liveLink || githubLink)
      ? `<div class="project-action-icons">${liveLink}${githubLink}</div>`
      : "";
  }

  // Render Featured Card
  const featuredHtml = `
    <article class="card project-card project-card--featured" data-project-id="${escapeHtml(featured.id)}">
      <div class="project-media-wrapper">
        ${getProjectGraphic(featured)}
      </div>

      <div class="project-card-body">
        <div class="project-card-meta-line">
          <span class="featured-project-badge">FEATURED ARCHITECTURE</span>
          ${renderActionIcons(featured)}
        </div>

        <h3 class="project-card-title">${escapeHtml(featured.title)}</h3>
        <p class="project-card-desc">${escapeHtml(featured.description)}</p>

        ${
          featured.problem || featured.solution
            ? `
              <div class="project-problem-solution">
                ${featured.problem ? `<div class="ps-item"><strong class="ps-label">PROBLEM:</strong> <span>${escapeHtml(featured.problem)}</span></div>` : ""}
                ${featured.solution ? `<div class="ps-item"><strong class="ps-label">SOLUTION:</strong> <span>${escapeHtml(featured.solution)}</span></div>` : ""}
              </div>`
            : ""
        }

        <div class="project-card-footer">
          <div class="project-tech-badges">
            ${(featured.tech || featured.tags || []).map((t) => `<span class="badge">${escapeHtml(t)}</span>`).join("")}
          </div>
        </div>
      </div>
    </article>
  `;

  // Render 4 Supporting Cards in 2x2 grid
  const regularHtml = `
    <div class="projects-subgrid">
      ${regular
        .map(
          (p) => `
        <article class="card project-card" data-project-id="${escapeHtml(p.id)}">
          <div class="project-media-wrapper">
            ${getProjectGraphic(p)}
          </div>

          <div class="project-card-body">
            <div class="project-card-header">
              <h3 class="project-card-title">${escapeHtml(p.title)}</h3>
              ${renderActionIcons(p)}
            </div>

            <p class="project-card-desc">${escapeHtml(p.description)}</p>

            <div class="project-card-footer">
              <div class="project-tech-badges">
                ${(p.tech || p.tags || []).map((t) => `<span class="badge">${escapeHtml(t)}</span>`).join("")}
              </div>
            </div>
          </div>
        </article>
      `
        )
        .join("")}
    </div>
  `;

  mount.innerHTML = featuredHtml + regularHtml;
}

export { renderProjects };
