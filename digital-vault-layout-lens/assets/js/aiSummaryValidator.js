import { AI_REVIEW_ALLOWED_SECTIONS, AI_REVIEW_RESPONSE_SCHEMA_VERSION } from './aiPromptTemplates.js';

const SECTIONS = AI_REVIEW_ALLOWED_SECTIONS;
const MAX_SUMMARY = 1200;
const MAX_TEXT = 700;
const MAX_ITEMS = 8;
const ALLOWED_TOP = new Set(['schemaVersion', 'requestId', 'presetId', 'summary', ...SECTIONS]);
const ALLOWED_CLAIM = new Set(['text', 'evidenceIds', 'confidence']);
const ALLOWED_CONFIDENCE = new Set(['high', 'medium', 'low']);

export function validateAiSummaryResponse(input, evidenceLookup, { requestId = '', presetId = '' } = {}) {
  let parsed;
  try { parsed = JSON.parse(String(input)); } catch { return fail('Malformed JSON. Paste the structured JSON response from the external model.'); }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return fail('Response must be a JSON object.');
  const unknownTop = Object.keys(parsed).filter((key) => !ALLOWED_TOP.has(key));
  if (unknownTop.length) return fail(`Unsupported response field: ${unknownTop[0]}.`);
  if (parsed.schemaVersion !== AI_REVIEW_RESPONSE_SCHEMA_VERSION) return fail('Unsupported AI summary response schema version.');
  if (!requestId || parsed.requestId !== requestId) return fail('AI summary request ID does not match the prepared request.');
  if (!presetId || parsed.presetId !== presetId) return fail('AI summary preset ID does not match the selected prepared preset.');
  const evidenceIds = evidenceLookup instanceof Map ? new Set(evidenceLookup.keys()) : new Set(evidenceLookup || []);
  const summary = normalizeClaim(parsed.summary, 'summary', evidenceIds, MAX_SUMMARY);
  if (!summary.ok) return summary;
  const out = { schemaVersion: parsed.schemaVersion, requestId: parsed.requestId, presetId: parsed.presetId, summary: summary.value };
  for (const section of SECTIONS) {
    if (!Array.isArray(parsed[section])) return fail(`Response must include a ${section} array.`);
    if (parsed[section].length > MAX_ITEMS) return fail(`${section} includes too many items.`);
    const result = [];
    for (const item of parsed[section]) {
      const claim = normalizeClaim(item, `${section} item`, evidenceIds, MAX_TEXT);
      if (!claim.ok) return claim;
      result.push(claim.value);
    }
    out[section] = result;
  }
  return { ok: true, value: Object.freeze(out) };
}

function normalizeClaim(item, label, knownEvidenceIds, maxText) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return fail(`${label} must be a claim object.`);
  const unknown = Object.keys(item).filter((key) => !ALLOWED_CLAIM.has(key));
  if (unknown.length) return fail(`Unsupported ${label} field: ${unknown[0]}.`);
  const text = normalizeText(item.text, maxText);
  if (!text) return fail(`${label} needs non-empty text.`);
  if (!Array.isArray(item.evidenceIds) || !item.evidenceIds.length) return fail(`${label} needs at least one evidence reference.`);
  const refs = item.evidenceIds.map((id) => normalizeText(id, 120));
  if (refs.some((id) => !id)) return fail(`${label} contains an empty evidence reference.`);
  if (new Set(refs).size !== refs.length) return fail(`${label} contains duplicate evidence references.`);
  const unknownRef = refs.find((id) => !knownEvidenceIds.has(id));
  if (unknownRef) return fail(`Unknown evidence reference: ${unknownRef}.`);
  let confidence;
  if (Object.hasOwn(item, 'confidence')) {
    if (typeof item.confidence !== 'string' || !ALLOWED_CONFIDENCE.has(item.confidence)) return fail(`${label} has unsupported AI-reported confidence.`);
    confidence = item.confidence;
  }
  return { ok: true, value: { text, evidenceIds: refs, ...(confidence ? { confidence } : {}) } };
}

function normalizeText(value, max) { return typeof value === 'string' ? value.replace(/\u0000/g, '').replace(/[\t\r\n ]+/g, ' ').trim().slice(0, max) : ''; }
function fail(message) { return { ok: false, message }; }
