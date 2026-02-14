import { isValidSchema } from './schema.js';

const defaultState = {
  schemaVersion: 1,
  settings: {
    smartMode: true,
    sortMode: 'frequency-recency',
    maxFrequent: 3,
    pinnedEnabled: true
  },
  items: []
};

export function getDefaultState() {
  return structuredClone(defaultState);
}

export function loadState(storageKey) {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return getDefaultState();
  try {
    const parsed = JSON.parse(raw);
    if (!isValidSchema(parsed)) throw new Error('Invalid schema');
    return parsed;
  } catch (error) {
    console.warn('[SmartMenu] Unable to read saved state, using defaults.', error);
    return getDefaultState();
  }
}

export function saveState(storageKey, state) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

export function mergeItems(existingItems, navItems) {
  const byId = new Map(existingItems.map((item) => [item.id, item]));
  return navItems.map((item) => {
    const persisted = byId.get(item.id);
    return (
      persisted || {
        id: item.id,
        clickCount: 0,
        lastUsedAt: null,
        firstUsedAt: null,
        visitsCount: 0
      }
    );
  });
}
