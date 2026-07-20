import { analyzeCssSource } from './cssAnalyzer.js';
import { analyzeHtmlSource } from './htmlAnalyzer.js';

/**
 * Pure, platform-neutral boundary for a future explicit inspection handoff.
 * Collection/redaction belongs outside this module; only an already-sanitized
 * value may cross this boundary.
 */
export const INSPECTION_SNAPSHOT_VERSION = 1;
const MAX_SOURCE_LENGTH = 250000;
const MAX_FACTS = 200;
const SENSITIVE_FIELD = /password|payment|card|form(value|content)?|cookie|token|auth|history|localstorage|sessionstorage|javascript|network|upload|frame|storage/i;
const TOP_LEVEL_FIELDS = new Set(['schemaVersion', 'inspectionId', 'scope', 'html', 'css', 'computedStyleFacts', 'viewport', 'semanticMetadata', 'layoutMetadata', 'collectedAt', 'limitations']);

export function normalizeInspectionSnapshot(input = {}) {
  const errors = [];
  if (!isPlainObject(input)) return { ok: false, errors: ['Inspection snapshot must be a plain object.'] };
  Object.keys(input).forEach((key) => {
    if (!TOP_LEVEL_FIELDS.has(key)) errors.push(`Unsupported inspection field "${key}".`);
    if (SENSITIVE_FIELD.test(key)) errors.push(`Sensitive or unsupported inspection field "${key}" is not permitted.`);
  });
  if (input.schemaVersion !== INSPECTION_SNAPSHOT_VERSION) errors.push(`schemaVersion must be ${INSPECTION_SNAPSHOT_VERSION}.`);
  const inspectionId = text(input.inspectionId, 120);
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(inspectionId)) errors.push('inspectionId must use letters, numbers, and hyphens.');
  const scope = normalizeScope(input.scope, errors);
  const html = source(input.html, 'html', errors, true);
  const css = source(input.css, 'css', errors, false);
  const computedStyleFacts = normalizeFacts(input.computedStyleFacts, 'computedStyleFacts', errors);
  const viewport = normalizeViewport(input.viewport, errors);
  const semanticMetadata = normalizeFacts(input.semanticMetadata, 'semanticMetadata', errors);
  const layoutMetadata = normalizeFacts(input.layoutMetadata, 'layoutMetadata', errors);
  const collectedAt = normalizeTimestamp(input.collectedAt, errors);
  const limitations = normalizeLimitations(input.limitations, errors);
  if (errors.length) return { ok: false, errors };
  return { ok: true, snapshot: deepFreeze({ schemaVersion: INSPECTION_SNAPSHOT_VERSION, inspectionId, scope, html, ...(css ? { css } : {}), ...(computedStyleFacts.length ? { computedStyleFacts } : {}), ...(viewport ? { viewport } : {}), ...(semanticMetadata.length ? { semanticMetadata } : {}), ...(layoutMetadata.length ? { layoutMetadata } : {}), collectedAt, limitations }) };
}

export function createStaticAnalyzerInput(snapshotInput) {
  const normalized = normalizeInspectionSnapshot(snapshotInput);
  if (!normalized.ok) return normalized;
  const { snapshot } = normalized;
  return { ok: true, input: deepFreeze({ html: snapshot.html, css: snapshot.css || '', inspectionId: snapshot.inspectionId }) };
}

/** Run unchanged static analyzers. Browser-derived computed facts intentionally
 * do not enter them; a future dedicated fact-to-finding adapter is required. */
export function analyzeInspectionSnapshot(snapshotInput, { htmlAnalyzer = analyzeHtmlSource, cssAnalyzer = analyzeCssSource, htmlParser } = {}) {
  const adapted = createStaticAnalyzerInput(snapshotInput);
  if (!adapted.ok) return adapted;
  const html = htmlAnalyzer(adapted.input.html, htmlParser ? { parser: htmlParser } : undefined);
  const css = adapted.input.css ? cssAnalyzer(adapted.input.css) : { findings: [], status: 'empty', message: 'CSS input was not supplied for this inspection.' };
  return deepFreeze({ ok: true, inspectionId: adapted.input.inspectionId, html, css });
}

function normalizeScope(value, errors) {
  if (!isPlainObject(value)) { errors.push('scope must be a plain object.'); return {}; }
  const allowed = new Set(['kind', 'label']);
  Object.keys(value).forEach((key) => { if (!allowed.has(key) || SENSITIVE_FIELD.test(key)) errors.push(`Unsupported scope field "${key}".`); });
  const kind = value.kind;
  if (!['page', 'selected-region'].includes(kind)) errors.push('scope.kind must be "page" or "selected-region".');
  const label = text(value.label, 120);
  return { kind, ...(label ? { label } : {}) };
}
function source(value, name, errors, required) {
  if (value == null && !required) return '';
  if (typeof value !== 'string') { errors.push(`${name} must be a sanitized string.`); return ''; }
  if (value.length > MAX_SOURCE_LENGTH) errors.push(`${name} exceeds the inspection source limit.`);
  return value.replace(/\u0000/g, '').trim();
}
function normalizeFacts(value, name, errors) {
  if (value == null) return [];
  if (!Array.isArray(value) || value.length > MAX_FACTS) { errors.push(`${name} must be an array within the supported limit.`); return []; }
  return value.map((item, index) => {
    if (!isPlainObject(item) || Object.keys(item).some((key) => !['name', 'value'].includes(key) || SENSITIVE_FIELD.test(key))) { errors.push(`${name}[${index}] must contain only name and value.`); return {}; }
    const nameValue = text(item.name, 80); const factValue = text(item.value, 240);
    if (SENSITIVE_FIELD.test(nameValue)) errors.push(`${name}[${index}] names a sensitive or unsupported fact.`);
    if (!nameValue || !factValue) errors.push(`${name}[${index}] needs non-empty name and value.`);
    return { name: nameValue, value: factValue };
  });
}
function normalizeViewport(value, errors) {
  if (value == null) return null;
  if (!isPlainObject(value) || Object.keys(value).some((key) => !['width', 'height', 'devicePixelRatio'].includes(key))) { errors.push('viewport contains unsupported fields.'); return null; }
  const viewport = {};
  ['width', 'height', 'devicePixelRatio'].forEach((key) => { if (value[key] != null && (!Number.isFinite(value[key]) || value[key] <= 0)) errors.push(`viewport.${key} must be a positive number.`); else if (value[key] != null) viewport[key] = value[key]; });
  return viewport;
}
function normalizeTimestamp(value, errors) { const timestamp = text(value, 40); if (!timestamp || Number.isNaN(Date.parse(timestamp))) errors.push('collectedAt must be an ISO-compatible timestamp.'); return timestamp; }
function normalizeLimitations(value, errors) { if (!Array.isArray(value) || value.length > 30) { errors.push('limitations must be an array within the supported limit.'); return []; } return value.map((item, index) => { const normalized = text(item, 240); if (!normalized) errors.push(`limitations[${index}] must be non-empty text.`); return normalized; }); }
function text(value, max) { return typeof value === 'string' ? value.replace(/\u0000/g, '').replace(/\s+/g, ' ').trim().slice(0, max) : ''; }
function isPlainObject(value) { return Boolean(value) && typeof value === 'object' && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype; }
function deepFreeze(value) { if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value; Object.freeze(value); Object.values(value).forEach(deepFreeze); return value; }
