const THEME_KEY = "tax-calculator-theme-v1";

function resolveTheme(preference, mediaQuery) {
  if (preference === "system") return mediaQuery.matches ? "dark" : "light";
  return preference === "dark" ? "dark" : "light";
}

function applyTheme(preference, { mediaQuery, themeButtons, persist = true }) {
  const normalized = ["light", "dark", "system"].includes(preference) ? preference : "system";
  const activeTheme = resolveTheme(normalized, mediaQuery);
  document.documentElement.dataset.theme = activeTheme;
  document.documentElement.style.colorScheme = activeTheme;

  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeValue === normalized;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.setAttribute("aria-label", `${button.textContent}: ${isActive ? "wybrany motyw" : "wybierz motyw"}`);
  });

  if (persist) localStorage.setItem(THEME_KEY, normalized);
}

export function initThemeSwitcher({ themeButtons, mediaQuery = window.matchMedia("(prefers-color-scheme: dark)") }) {
  const apply = (preference, persist = true) => applyTheme(preference, { mediaQuery, themeButtons, persist });

  apply(localStorage.getItem(THEME_KEY) || "system", false);

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => apply(button.dataset.themeValue));
  });

  mediaQuery.addEventListener("change", () => {
    if ((localStorage.getItem(THEME_KEY) || "system") === "system") apply("system", false);
  });
}
