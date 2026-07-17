export const DEFAULT_AI_REVIEW_PRESET_ID = 'senior-frontend';

const ALLOWED_PRESET_FIELDS = new Set(['id', 'label', 'description', 'role', 'focusAreas', 'prohibitedClaims', 'outputEmphasis']);

export const aiReviewPresets = Object.freeze([
  preset('senior-frontend', 'Senior frontend reviewer', 'Balanced senior frontend review of implementation quality, maintainability, responsive behavior, accessibility basics, risk, and practical priority.', 'Act as a senior frontend reviewer using only the supplied Layout Lens evidence.', ['implementation quality', 'maintainability', 'responsive behavior', 'accessibility basics', 'frontend risk', 'practical prioritization'], ['Do not claim production readiness.', 'Do not claim source inspection beyond supplied snippets.'], ['prioritize practical fixes', 'separate risks from evidence-backed priorities', 'use concise frontend terminology']),
  preset('accessibility', 'Accessibility reviewer', 'Accessibility-focused review of existing manual findings, analyzer evidence, WCAG mappings, keyboard, semantics, labels, headings, landmarks, and reflow risks.', 'Act as an accessibility reviewer using only supplied WCAG mappings, deterministic accessibility rules, analyzer evidence, and snippets.', ['existing accessibility-related manual findings', 'analyzer evidence', 'existing WCAG mappings', 'keyboard risks', 'semantics', 'labels', 'headings', 'landmarks', 'reflow risks'], ['Do not claim WCAG compliance.', 'Do not claim accessibility certification.', 'Do not claim complete accessibility coverage.', 'Do not claim assistive-technology testing occurred.'], ['call out evidence limits', 'reference WCAG mappings only when supplied', 'avoid conformance language']),
  preset('product-polish', 'Product polish reviewer', 'Product polish review emphasizing visual consistency, content clarity, interaction quality, responsive polish, usability friction, and high-impact refinement.', 'Act as a product polish reviewer using only the supplied Layout Lens evidence.', ['visual consistency', 'content clarity', 'interaction quality', 'responsive polish', 'usability friction', 'high-impact refinement opportunities'], ['Do not infer unavailable brand requirements.', 'Do not claim production readiness.', 'Do not invent user research results.'], ['emphasize high-impact refinements', 'phrase findings as evidence-backed usability observations', 'avoid unsupported brand assumptions']),
  preset('design-system', 'Design-system reviewer', 'Design-system review of consistency, reusable patterns, token opportunities, component behavior, shared UI rules, and maintainability across repeated interfaces.', 'Act as a design-system reviewer using only the supplied Layout Lens evidence.', ['consistency', 'reusable patterns', 'token opportunities', 'component behavior', 'shared UI rules', 'maintainability across repeated interfaces'], ['Do not infer unavailable project architecture.', 'Do not infer component libraries.', 'Do not infer design tokens or brand requirements that are not supplied.'], ['identify pattern and token opportunities only when supported', 'connect repeated-interface concerns to evidence', 'avoid architecture assumptions'])
]);

export function getAiReviewPreset(id = DEFAULT_AI_REVIEW_PRESET_ID) {
  return aiReviewPresets.find((item) => item.id === id) || aiReviewPresets.find((item) => item.id === DEFAULT_AI_REVIEW_PRESET_ID);
}

export function validateAiReviewPresets(presets = aiReviewPresets) {
  const errors = [];
  const ids = new Set();
  if (!Array.isArray(presets)) return { ok: false, errors: ['Preset collection must be an array.'] };
  presets.forEach((item, index) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) { errors.push(`Preset ${index} must be an object.`); return; }
    Object.keys(item).forEach((key) => { if (!ALLOWED_PRESET_FIELDS.has(key)) errors.push(`${item.id || `Preset ${index}`} has unsupported field ${key}.`); });
    if (!text(item.id)) errors.push(`Preset ${index} needs a stable ID.`);
    if (ids.has(item.id)) errors.push(`Duplicate preset ID: ${item.id}.`);
    ids.add(item.id);
    if (!text(item.label)) errors.push(`${item.id || `Preset ${index}`} needs a label.`);
    if (!text(item.description)) errors.push(`${item.id || `Preset ${index}`} needs a description.`);
    if (!text(item.role)) errors.push(`${item.id || `Preset ${index}`} needs a role.`);
    if (!stringList(item.focusAreas)) errors.push(`${item.id || `Preset ${index}`} needs focus areas.`);
    if (!stringList(item.outputEmphasis)) errors.push(`${item.id || `Preset ${index}`} needs output emphasis.`);
    if (!stringList(item.prohibitedClaims) || !item.prohibitedClaims.every((claim) => /^Do not |^Avoid /.test(claim))) errors.push(`${item.id || `Preset ${index}`} has malformed prohibited-claim instructions.`);
  });
  return { ok: errors.length === 0, errors };
}

function preset(id, label, description, role, focusAreas, prohibitedClaims, outputEmphasis) { return Object.freeze({ id, label, description, role, focusAreas: Object.freeze(focusAreas), prohibitedClaims: Object.freeze(prohibitedClaims), outputEmphasis: Object.freeze(outputEmphasis) }); }
function text(value) { return typeof value === 'string' && value.trim().length > 0; }
function stringList(value) { return Array.isArray(value) && value.length > 0 && value.every(text); }
