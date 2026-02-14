import { getThemePreference, setThemePreference } from "./storage.js";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

export function initializeTheme() {
  const stored = getThemePreference();
  const resolvedTheme = stored || getSystemTheme();
  applyTheme(resolvedTheme);
  return resolvedTheme;
}

export function toggleTheme() {
  const current = document.documentElement.dataset.theme || "dark";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  setThemePreference(next);
  return next;
}
