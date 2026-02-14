const KEY = 'ambientDevPanel.v1';

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function clearState() {
  localStorage.removeItem(KEY);
}

export function exportState(state) {
  return JSON.stringify(state, null, 2);
}

export function importState(raw) {
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== 'object') throw new Error('Invalid backup payload.');
  return parsed;
}
