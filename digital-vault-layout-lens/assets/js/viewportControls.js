export const VIEWPORT_CONFIG = Object.freeze({
  presets: Object.freeze({
    mobile: Object.freeze({ id: 'mobile', label: 'Mobile', width: 390 }),
    tablet: Object.freeze({ id: 'tablet', label: 'Tablet', width: 768 }),
    desktop: Object.freeze({ id: 'desktop', label: 'Desktop', width: 1180 })
  }),
  custom: Object.freeze({ id: 'custom', label: 'Custom', defaultWidth: 1024, min: 320, max: 1600 })
});

export function getViewportPreset(id) {
  return VIEWPORT_CONFIG.presets[id] || VIEWPORT_CONFIG.presets.desktop;
}

export function normalizeCustomViewportWidth(value) {
  const raw = String(value ?? '').trim();
  if (!/^\d+$/.test(raw)) return { ok: false, width: VIEWPORT_CONFIG.custom.defaultWidth, reason: raw ? 'invalid' : 'empty' };
  const numeric = Number(raw);
  if (!Number.isSafeInteger(numeric)) return { ok: false, width: VIEWPORT_CONFIG.custom.max, reason: 'invalid' };
  const width = Math.min(VIEWPORT_CONFIG.custom.max, Math.max(VIEWPORT_CONFIG.custom.min, numeric));
  return { ok: true, width, reason: width === numeric ? 'valid' : numeric < VIEWPORT_CONFIG.custom.min ? 'clamped-min' : 'clamped-max' };
}

export function createInitialViewportState() {
  const preset = VIEWPORT_CONFIG.presets.desktop;
  return { active: preset.id, width: preset.width, customWidth: VIEWPORT_CONFIG.custom.defaultWidth };
}

export function applyPresetViewport(state, presetId) {
  const preset = getViewportPreset(presetId);
  return { ...state, active: preset.id, width: preset.width };
}

export function applyCustomViewport(state, value) {
  const result = normalizeCustomViewportWidth(value);
  if (!result.ok) return { state: { ...state }, result };
  return { state: { ...state, active: VIEWPORT_CONFIG.custom.id, width: result.width, customWidth: result.width }, result };
}
