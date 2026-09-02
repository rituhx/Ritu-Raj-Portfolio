function initNavigation() {
  const header = document.getElementById("site-header");
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const links = document.querySelectorAll('.nav-links a, a[href^="#"]');

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("open") && !nav.contains(e.target)) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href") || "";
      if (!href.startsWith("#") || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (nav) nav.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  });

  const navLinks = document.querySelectorAll(".nav-links a");

  const onScroll = () => {
    const y = window.scrollY;

    if (header) {
      header.classList.toggle("is-scrolled", y > 30);
    }

    const sections = document.querySelectorAll("section[id]");
    let current = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // Section is active if its top is near top of viewport or taking up upper middle screen
      if (rect.top <= 200 && rect.bottom >= 150) {
        current = section.id;
      }
    });

    if (current) {
      navLinks.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current);
      });
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

export { initNavigation };

