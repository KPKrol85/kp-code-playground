import { APP_SCHEMA_VERSION } from "./schema.js";

const STORAGE_KEYS = {
  theme: "kp.palette.theme",
  compactMode: "kp.palette.compact",
};

function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable; ignore gracefully.
  }
}

export function getThemePreference() {
  return safeGet(STORAGE_KEYS.theme);
}

export function setThemePreference(theme) {
  if (!theme) {
    try {
      localStorage.removeItem(STORAGE_KEYS.theme);
    } catch {
      // ignore
    }
    return;
  }
  safeSet(STORAGE_KEYS.theme, theme);
}

export function getCompactMode() {
  return safeGet(STORAGE_KEYS.compactMode) === "true";
}

export function setCompactMode(value) {
  safeSet(STORAGE_KEYS.compactMode, String(Boolean(value)));
}

export function resetStoredState() {
  try {
    localStorage.removeItem(STORAGE_KEYS.theme);
    localStorage.removeItem(STORAGE_KEYS.compactMode);
  } catch {
    // ignore
  }
}

export function exportState() {
  return {
    schemaVersion: APP_SCHEMA_VERSION,
    theme: getThemePreference() || null,
    compactMode: getCompactMode(),
  };
}

export function importState(data) {
  setThemePreference(data.theme || null);
  setCompactMode(Boolean(data.compactMode));
}
