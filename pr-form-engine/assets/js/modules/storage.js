const KEY = 'pr-form-engine:last-state';

export function saveLastState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...state, savedAt: Date.now() }));
  } catch {
    // no-op for restricted environments
  }
}

export function readLastState() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
