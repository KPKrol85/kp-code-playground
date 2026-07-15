export const OVERLAY_MODE_OFF = 'off';

export const OVERLAY_MODES = Object.freeze([
  { id: OVERLAY_MODE_OFF, label: 'Off', description: 'No visual inspection overlay.' },
  { id: 'spacing', label: 'Spacing', description: 'Show conservative margin and padding markers for meaningful elements.' },
  { id: 'layout-boxes', label: 'Layout boxes', description: 'Highlight semantic containers, flex/grid layouts, positioned elements, and major blocks.' },
  { id: 'headings', label: 'Headings', description: 'Show semantic heading levels in document order.' },
  { id: 'focusable', label: 'Focusable elements', description: 'Show keyboard-focusable elements in sequential tab order.' },
  { id: 'overflow', label: 'Overflow', description: 'Highlight likely viewport overflow and intentional scroll containers.' }
]);

export const OVERLAY_MODE_IDS = Object.freeze(OVERLAY_MODES.map((mode) => mode.id));
const VALID_OVERLAY_MODE_IDS = new Set(OVERLAY_MODE_IDS);

export function normalizeOverlayMode(mode) {
  return VALID_OVERLAY_MODE_IDS.has(mode) ? mode : OVERLAY_MODE_OFF;
}

export function createOverlayState(mode = OVERLAY_MODE_OFF) {
  return { activeMode: normalizeOverlayMode(mode) };
}

export function setOverlayMode(state, mode) {
  return { ...state, activeMode: normalizeOverlayMode(mode) };
}

export function isOverlayActive(state, mode) {
  return normalizeOverlayMode(state?.activeMode) === normalizeOverlayMode(mode);
}
