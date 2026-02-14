const STORAGE_KEY = 'kp.featureFlags.v1';

export function saveFlags(flags) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
}

export function loadFlags() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearFlags() {
  localStorage.removeItem(STORAGE_KEY);
}

export { STORAGE_KEY };
