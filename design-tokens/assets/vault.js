(() => {
  const systems = Array.isArray(window.VAULT_SYSTEMS) ? window.VAULT_SYSTEMS : [];
  const tokenCssById = window.VAULT_TOKEN_CSS && typeof window.VAULT_TOKEN_CSS === "object" ? window.VAULT_TOKEN_CSS : {};
  const grid = document.querySelector("#tokenGrid");
  const searchInput = document.querySelector("#tokenSearch");
  const categoryFilter = document.querySelector("#categoryFilter");
  const sortFilter = document.querySelector("#sortFilter");
  const emptyState = document.querySelector("#emptyState");
  const themeButtons = Array.from(document.querySelectorAll("[data-theme-option]"));
  const topbar = document.querySelector(".vault-topbar");

  function initScrollHeader() {
    if (!topbar) {
      return;
    }

    let ticking = false;
    let isScrolled = false;

    function updateHeaderState() {
      const nextIsScrolled = window.scrollY > 12;
      if (nextIsScrolled !== isScrolled) {
        isScrolled = nextIsScrolled;
        document.body.classList.toggle("is-scrolled", isScrolled);
      }
      ticking = false;
    }

    function requestHeaderUpdate() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateHeaderState);
      }
    }

    updateHeaderState();
    window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
  }

  if (!grid || !searchInput || !categoryFilter || !sortFilter || !emptyState) {
    return;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function tokenCss(system) {
    return tokenCssById[system.id] || "";
  }

  function previewSource(system) {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="tokens/${system.file}" />
  </head>
  <body>
    <main class="dt-preview">
      <span class="dt-preview__eyebrow">Kategoria: ${escapeHtml(system.category)}</span>
      <h1 class="dt-preview__title">${escapeHtml(system.name)}</h1>
      <p class="dt-preview__copy">${escapeHtml(system.description)}</p>
      <div class="dt-preview__actions">
        <button class="dt-button dt-button--primary">${escapeHtml(system.primaryAction)}</button>
        <button class="dt-button dt-button--secondary">${escapeHtml(system.secondaryAction)}</button>
      </div>
      <section class="dt-card" aria-label="Przykład komponentu">
        <div class="dt-card__body">
          <h2 class="dt-card__title">Podgląd komponentu</h2>
          <p class="dt-card__text">${escapeHtml(system.useCase)}</p>
          <div class="dt-metrics" aria-label="Przykładowe metryki">
            <div class="dt-metric"><span class="dt-metric__value">24</span><span class="dt-metric__label">Komponenty</span></div>
            <div class="dt-metric"><span class="dt-metric__value">8</span><span class="dt-metric__label">Kroki odstępów</span></div>
            <div class="dt-metric"><span class="dt-metric__value">4</span><span class="dt-metric__label">Poziomy cienia</span></div>
          </div>
        </div>
      </section>
      <div class="dt-scale" aria-label="Skala kolorów">
        <span class="dt-scale__item"><span class="dt-scale__swatch"></span><span class="dt-scale__label">Główny</span></span>
        <span class="dt-scale__item"><span class="dt-scale__swatch dt-scale__swatch--secondary"></span><span class="dt-scale__label">Drugi</span></span>
        <span class="dt-scale__item"><span class="dt-scale__swatch dt-scale__swatch--accent"></span><span class="dt-scale__label">Akcent</span></span>
        <span class="dt-scale__item"><span class="dt-scale__swatch dt-scale__swatch--surface"></span><span class="dt-scale__label">Powierzchnia</span></span>
      </div>
    </main>
  </body>
</html>`;
  }

  function setTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    themeButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.themeOption === nextTheme));
    });
    try {
      localStorage.setItem("vault-theme", nextTheme);
    } catch (error) {
      // localStorage can be unavailable in some embedded previews.
    }
  }

  function matchesFilters(system) {
    const query = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const searchable = [system.name, system.category, system.useCase, system.description, ...system.tags].join(" ").toLowerCase();
    const categoryMatches = selectedCategory === "Wszystkie" || system.category === selectedCategory;
    return categoryMatches && (!query || searchable.includes(query));
  }

  function sortedSystems(items) {
    return [...items].sort((a, b) => {
      const key = sortFilter.value;
      return a[key].localeCompare(b[key], "pl", { numeric: true });
    });
  }

  async function copyCss(system, button) {
    const css = tokenCss(system);
    try {
      if (!css) {
        throw new Error(`Missing CSS for token system ${system.id}`);
      }

      let copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(css);
          copied = true;
        } catch (error) {
          copied = false;
        }
      }

      if (!copied) {
        const textarea = document.createElement("textarea");
        textarea.value = css;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.inset = "0 auto auto 0";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        copied = document.execCommand("copy");
        textarea.remove();
      }

      if (!copied) {
        throw new Error("Clipboard write failed");
      }

      button.dataset.state = "copied";
      button.textContent = "Skopiowano";
      window.setTimeout(() => {
        button.dataset.state = "";
        button.textContent = "Kopiuj CSS";
      }, 1800);
    } catch (error) {
      button.textContent = "Błąd kopiowania";
      window.setTimeout(() => {
        button.textContent = "Kopiuj CSS";
      }, 1800);
    }
  }

  function createCard(system) {
    const article = document.createElement("article");
    const tags = system.tags.map((tag) => `<span class="token-card__tag">${escapeHtml(tag)}</span>`).join("");
    const swatches = ["background", "surfaceRaised", "primary", "secondary", "accent", "text"]
      .map((key) => `<span class="token-card__swatch" style="background: ${system.colors[key]}"></span>`)
      .join("");

    article.className = "token-card";
    article.innerHTML = `
      <header class="token-card__header">
        <div>
          <p class="token-card__kicker">${escapeHtml(system.category)}</p>
          <h2 class="token-card__title">${escapeHtml(system.name)}</h2>
          <p class="token-card__text">${escapeHtml(system.description)}</p>
          <div class="token-card__tags">${tags}</div>
        </div>
        <button class="vault-copy" type="button" aria-label="Kopiuj CSS: zestaw ${escapeHtml(system.id)}, ${escapeHtml(system.name)}, ${escapeHtml(system.category)}">Kopiuj CSS</button>
      </header>
      <div class="token-card__palette" aria-label="Podgląd palety">${swatches}</div>
      <iframe class="token-card__preview" title="Podgląd ${escapeHtml(system.name)}"></iframe>
    `;
    article.querySelector(".vault-copy").addEventListener("click", (event) => copyCss(system, event.currentTarget));
    article.querySelector("iframe").srcdoc = previewSource(system);
    return article;
  }

  function render() {
    const visibleSystems = sortedSystems(systems.filter(matchesFilters));
    grid.replaceChildren(...visibleSystems.map(createCard));
    emptyState.classList.toggle("is-visible", visibleSystems.length === 0);
  }

  function initFilters() {
    const categories = ["Wszystkie", ...Array.from(new Set(systems.map((system) => system.category))).sort()];
    categoryFilter.innerHTML = categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
  }

  initScrollHeader();
  setTheme(document.documentElement.dataset.theme);
  initFilters();

  searchInput.addEventListener("input", render);
  categoryFilter.addEventListener("change", render);
  sortFilter.addEventListener("change", render);
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => setTheme(button.dataset.themeOption));
  });

  render();
})();
