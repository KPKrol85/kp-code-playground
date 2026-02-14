import { DEFAULTS } from '../data/defaults.js';
import { loadState, saveState } from './storage.js';

const clone = (v) => structuredClone(v);

function merge(base, incoming) {
  if (!incoming || typeof incoming !== 'object') return clone(base);
  const out = clone(base);
  for (const key of Object.keys(out)) {
    if (incoming[key] && typeof incoming[key] === 'object' && !Array.isArray(incoming[key])) {
      out[key] = merge(out[key], incoming[key]);
    } else if (incoming[key] !== undefined) {
      out[key] = incoming[key];
    }
  }
  return out;
}

let state = merge(DEFAULTS, loadState());
const listeners = new Set();

export function getState() {
  return state;
}

export function setState(updater) {
  const next = typeof updater === 'function' ? updater(clone(state)) : updater;
  state = merge(DEFAULTS, next);
  saveState(state);
  listeners.forEach((listener) => listener(state));
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function resetState(newState = DEFAULTS) {
  state = merge(DEFAULTS, newState);
  saveState(state);
  listeners.forEach((listener) => listener(state));
}
