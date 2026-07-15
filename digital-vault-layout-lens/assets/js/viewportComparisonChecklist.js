import { VIEWPORT_CONFIG } from './viewportControls.js';

export const COMPARISON_BREAKPOINTS = Object.freeze(['mobile', 'tablet', 'desktop']);
export const MAX_BREAKPOINT_OBSERVATION_LENGTH = 200;

function normalizeObservation(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, MAX_BREAKPOINT_OBSERVATION_LENGTH);
}

export function createInitialComparisonChecklistState() {
  return Object.fromEntries(COMPARISON_BREAKPOINTS.map((id) => [id, { reviewed: false, observation: '' }]));
}

export function getBreakpointLabel(id) {
  const preset = VIEWPORT_CONFIG.presets[id];
  return preset ? `${preset.label} ${preset.width}px` : id;
}

export function setBreakpointReviewed(state, id, reviewed) {
  if (!COMPARISON_BREAKPOINTS.includes(id)) return { ...state };
  return { ...state, [id]: { ...(state[id] || { observation: '' }), reviewed: Boolean(reviewed) } };
}

export function updateBreakpointObservation(state, id, observation) {
  if (!COMPARISON_BREAKPOINTS.includes(id)) return { ...state };
  return { ...state, [id]: { ...(state[id] || { reviewed: false }), observation: normalizeObservation(observation) } };
}

export function resetComparisonChecklist() {
  return createInitialComparisonChecklistState();
}

export function summarizeComparisonChecklist(state) {
  const reviewed = COMPARISON_BREAKPOINTS.filter((id) => state[id]?.reviewed).length;
  return { reviewed, total: COMPARISON_BREAKPOINTS.length, pending: COMPARISON_BREAKPOINTS.length - reviewed };
}
