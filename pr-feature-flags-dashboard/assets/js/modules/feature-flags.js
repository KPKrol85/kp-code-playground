import { DEFAULT_FLAGS } from './registry.js';
import { clearFlags, loadFlags, saveFlags } from './storage.js';

const listeners = new Set();
let state = { ...DEFAULT_FLAGS };

function sanitizeFlags(candidateFlags = {}) {
  return Object.keys(DEFAULT_FLAGS).reduce((accumulator, flagId) => {
    accumulator[flagId] = Boolean(candidateFlags[flagId]);
    return accumulator;
  }, {});
}

function emitChange(payload) {
  listeners.forEach((listener) => listener(payload));
}

export const FeatureFlags = {
  init() {
    const stored = loadFlags();
    state = stored ? sanitizeFlags(stored) : { ...DEFAULT_FLAGS };
    saveFlags(state);
    emitChange({ type: 'init', state: { ...state } });
    return { ...state };
  },

  get(flag) {
    return Boolean(state[flag]);
  },

  set(flag, value) {
    if (!(flag in DEFAULT_FLAGS)) {
      return;
    }

    state[flag] = Boolean(value);
    saveFlags(state);
    emitChange({ type: 'set', flag, value: state[flag], state: { ...state } });
    return state[flag];
  },

  toggle(flag) {
    return this.set(flag, !this.get(flag));
  },

  reset() {
    state = { ...DEFAULT_FLAGS };
    clearFlags();
    saveFlags(state);
    emitChange({ type: 'reset', state: { ...state } });
    return { ...state };
  },

  onChange(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  all() {
    return { ...state };
  }
};
