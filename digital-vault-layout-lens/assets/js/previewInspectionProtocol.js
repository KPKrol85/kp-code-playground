import { normalizeOverlayMode } from './overlayConfig.js';

export const PREVIEW_INSPECTION_PROTOCOL = 'kp-layout-lens-preview-inspection';
export const PREVIEW_INSPECTION_VERSION = 1;
export const PARENT_TO_PREVIEW_TYPES = new Set(['set-overlay', 'keyboard-audit', 'clear-audit', 'request-focusables']);
export const PREVIEW_TO_PARENT_TYPES = new Set(['ready', 'overlay-result', 'keyboard-audit-result', 'focusables-result', 'error']);

export function createPreviewCommand(type, payload = {}) {
  return { protocol: PREVIEW_INSPECTION_PROTOCOL, version: PREVIEW_INSPECTION_VERSION, type, payload };
}

export function validatePreviewCommand(message) {
  if (!isPlainObject(message) || message.protocol !== PREVIEW_INSPECTION_PROTOCOL || message.version !== PREVIEW_INSPECTION_VERSION) return { ok: false, reason: 'invalid-envelope' };
  if (!PARENT_TO_PREVIEW_TYPES.has(message.type)) return { ok: false, reason: 'unsupported-type' };
  if (!isPlainObject(message.payload)) return { ok: false, reason: 'invalid-payload' };
  if (message.type === 'set-overlay') return { ok: true, type: message.type, payload: { mode: normalizeOverlayMode(message.payload.mode) } };
  if (message.type === 'keyboard-audit') {
    const action = ['start', 'next', 'previous', 'restart', 'end'].includes(message.payload.action) ? message.payload.action : 'start';
    return { ok: true, type: message.type, payload: { action, index: Number.isInteger(message.payload.index) ? message.payload.index : -1 } };
  }
  return { ok: true, type: message.type, payload: {} };
}

export function validatePreviewResponse(message) {
  if (!isPlainObject(message) || message.protocol !== PREVIEW_INSPECTION_PROTOCOL || message.version !== PREVIEW_INSPECTION_VERSION) return { ok: false, reason: 'invalid-envelope' };
  if (!PREVIEW_TO_PARENT_TYPES.has(message.type)) return { ok: false, reason: 'unsupported-type' };
  if (!isPlainObject(message.payload)) return { ok: false, reason: 'invalid-payload' };
  return { ok: true, type: message.type, payload: message.payload };
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
