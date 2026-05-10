const variants = [
  ["Minimal Studio Header", "Lightweight portfolio navigation with clean spacing."],
  ["SaaS Command Header", "Command-oriented SaaS nav with utility-forward spacing."],
  ["Editorial Glass Header", "Magazine-style transparent shell with soft blur."],
  ["Marketplace Navigation Header", "Dense category navigation suitable for commerce."],
  ["Portfolio Split Header", "Expressive split layout for creative studios."],
  ["Agency Dark Header", "Confident dark-mode-first agency top bar."],
  ["Product Launch Header", "Promotion-focused launch header with clear hierarchy."],
  ["Dashboard Utility Header", "Compact utility shell for admin and analytics views."],
  ["Premium Brand Header", "Luxury brand rhythm with generous spacing."],
  ["Compact App Header", "Lean app chrome for productivity products."]
];

const navItems = ["Home", "Services", "Projects", "Resources", "About", "Contact"];
const grid = document.querySelector("#headers-grid");

if (grid) {
  grid.innerHTML = variants.map((variant, i) => {
    const id = String(i + 1).padStart(2, "0");
    const ns = `header-${id}`;
    return `<section class="variant-block ${ns}-shell" aria-labelledby="${ns}-title">
      <div class="variant-block__meta">
        <h2 id="${ns}-title">${i + 1}. ${variant[0]}</h2>
        <p>${variant[1]}</p>
        <p class="variant-block__note">Best for: ${["Brand sites", "SaaS dashboards", "Editorial pages", "Commerce catalogs", "Creative portfolios", "Dark agency pages", "Launch microsites", "Internal tools", "Luxury brands", "Web apps"][i]}.</p>
      </div>
      <header class="${ns}" data-header>
        <a href="#" class="${ns}__brand"><span class="${ns}__logo">KP</span>Code</a>
        <nav class="${ns}__nav" aria-label="Primary">
          <ul class="${ns}__nav-list">${navItems.map(item => `<li><a class="${ns}__nav-link" href="#">${item}</a></li>`).join("")}</ul>
        </nav>
        <div class="${ns}__actions">
          <button class="${ns}__theme-toggle theme-toggle" type="button" aria-label="Switch theme" title="Switch theme"><span aria-hidden="true">◐</span></button>
          <button class="${ns}__menu-button" type="button" aria-expanded="false" aria-controls="${ns}-mobile" aria-label="Open mobile menu" data-menu-button>
            <span class="${ns}__menu-icon" aria-hidden="true"><span></span><span></span><span></span></span>
          </button>
        </div>
        <nav id="${ns}-mobile" class="${ns}__mobile-panel" hidden>
          <ul class="${ns}__mobile-list">${navItems.map(item => `<li><a class="${ns}__mobile-link" href="#">${item}</a></li>`).join("")}</ul>
        </nav>
      </header>
    </section>`;
  }).join("");
}

const headers = [...document.querySelectorAll("[data-header]")];
let activeHeader = null;

function closeHeader(header) {
  if (!header) return;
  const btn = header.querySelector("[data-menu-button]");
  const panel = header.querySelector("[id$='-mobile']");
  if (!btn || !panel) return;
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-label", "Open mobile menu");
  header.classList.remove("is-open");
  panel.hidden = true;
  if (activeHeader === header) activeHeader = null;
}

function openHeader(header) {
  if (activeHeader && activeHeader !== header) closeHeader(activeHeader);
  const btn = header.querySelector("[data-menu-button]");
  const panel = header.querySelector("[id$='-mobile']");
  btn.setAttribute("aria-expanded", "true");
  btn.setAttribute("aria-label", "Close mobile menu");
  header.classList.add("is-open");
  panel.hidden = false;
  activeHeader = header;
}

headers.forEach((header) => {
  const button = header.querySelector("[data-menu-button]");
  const links = header.querySelectorAll("[class$='__mobile-link']");

  button?.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    expanded ? closeHeader(header) : openHeader(header);
  });

  links.forEach((link) => link.addEventListener("click", () => closeHeader(header)));
});

document.addEventListener("click", (event) => {
  if (activeHeader && !activeHeader.contains(event.target)) closeHeader(activeHeader);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && activeHeader) {
    closeHeader(activeHeader);
    activeHeader.querySelector("[data-menu-button]")?.focus();
  }
});

const root = document.documentElement;
const STORAGE_KEY = "kp-code-theme";
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem(STORAGE_KEY);
root.setAttribute("data-theme", savedTheme || (prefersDark ? "dark" : "light"));

function syncThemeControls(theme) {
  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
    btn.dataset.theme = theme;
  });
}

syncThemeControls(root.getAttribute("data-theme"));

document.querySelectorAll(".theme-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
    syncThemeControls(next);
  });
});
