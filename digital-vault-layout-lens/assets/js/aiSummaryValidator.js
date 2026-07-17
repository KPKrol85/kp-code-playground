import { AI_REVIEW_RESPONSE_SCHEMA_VERSION } from './aiReviewRequest.js';

const SECTIONS = ['strengths', 'priorities', 'cautions'];
const MAX_SUMMARY = 1200;
const MAX_TEXT = 700;
const MAX_ITEMS = 8;
const ALLOWED_TOP = new Set(['schemaVersion', 'summary', ...SECTIONS]);
const ALLOWED_CLAIM = new Set(['text', 'evidenceIds']);

export function validateAiSummaryResponse(input, evidenceLookup) {
  let parsed;
  try { parsed = JSON.parse(String(input)); } catch { return fail('Malformed JSON. Paste the structured JSON response from the external model.'); }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return fail('Response must be a JSON object.');
  const unknownTop = Object.keys(parsed).filter((key) => !ALLOWED_TOP.has(key));
  if (unknownTop.length) return fail(`Unsupported response field: ${unknownTop[0]}.`);
  if (parsed.schemaVersion && parsed.schemaVersion !== AI_REVIEW_RESPONSE_SCHEMA_VERSION) return fail('Unsupported AI summary response schema version.');
  const summary = normalizeText(parsed.summary, MAX_SUMMARY);
  if (!summary) return fail('Response must include a non-empty summary.');
  const evidenceIds = evidenceLookup instanceof Map ? new Set(evidenceLookup.keys()) : new Set(evidenceLookup || []);
  const out = { schemaVersion: parsed.schemaVersion || AI_REVIEW_RESPONSE_SCHEMA_VERSION, summary };
  for (const section of SECTIONS) {
    if (!Array.isArray(parsed[section])) return fail(`Response must include a ${section} array.`);
    if (parsed[section].length > MAX_ITEMS) return fail(`${section} includes too many items.`);
    const result = [];
    for (const item of parsed[section]) {
      if (!item || typeof item !== 'object' || Array.isArray(item)) return fail(`${section} items must be objects.`);
      const unknown = Object.keys(item).filter((key) => !ALLOWED_CLAIM.has(key));
      if (unknown.length) return fail(`Unsupported ${section} field: ${unknown[0]}.`);
      const text = normalizeText(item.text, MAX_TEXT);
      if (!text) return fail(`${section} items need text.`);
      if (!Array.isArray(item.evidenceIds) || !item.evidenceIds.length) return fail(`${section} items need at least one evidence reference.`);
      const refs = item.evidenceIds.map((id) => normalizeText(id, 120));
      if (new Set(refs).size !== refs.length) return fail(`${section} item contains duplicate evidence references.`);
      const unknownRef = refs.find((id) => !evidenceIds.has(id));
      if (unknownRef) return fail(`Unknown evidence reference: ${unknownRef}.`);
      result.push({ text, evidenceIds: refs });
    }
    out[section] = result;
  }
  return { ok: true, value: Object.freeze(out) };
}

function normalizeText(value, max) { return typeof value === 'string' ? value.replace(/\u0000/g, '').replace(/[\t\r\n ]+/g, ' ').trim().slice(0, max) : ''; }
function fail(message) { return { ok: false, message }; }
