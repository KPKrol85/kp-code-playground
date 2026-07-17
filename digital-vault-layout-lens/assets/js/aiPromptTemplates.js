export const AI_REVIEW_RESPONSE_SCHEMA_VERSION = 1;
export const AI_REVIEW_ALLOWED_SECTIONS = Object.freeze(['strengths', 'priorities', 'cautions']);

export function buildAiReviewPrompt({ requestId, preset, evidencePackage }) {
  const evidenceJson = JSON.stringify(evidencePackage, replacer, 2);
  return [
    '# Role', preset.role, '',
    '# Review objective',
    'Create a concise AI-assisted review summary for KP_Code Layout Lens. Use the selected review preset to adjust perspective, terminology, prioritization, and emphasis only. Do not change deterministic evidence, scores, severities, confidence values, issue IDs, WCAG mappings, recommendations, or evidence eligibility.', '',
    '# Selected preset',
    `Preset ID: ${preset.id}`, `Preset label: ${preset.label}`, `Description: ${preset.description}`, `Focus areas: ${preset.focusAreas.join('; ')}`, `Requested output emphasis: ${preset.outputEmphasis.join('; ')}`, `Preset prohibited claims: ${preset.prohibitedClaims.join('; ')}`, '',
    '# Allowed evidence',
    'Use only supplied evidence IDs and evidence fields in the evidence package. The full normalized evidence package remains available regardless of preset. State when evidence is insufficient instead of guessing.', '',
    '# Evidence package', evidenceJson, '',
    '# Required response format',
    JSON.stringify({ schemaVersion: AI_REVIEW_RESPONSE_SCHEMA_VERSION, requestId, presetId: preset.id, summary: { text: 'Overall evidence-based summary.', evidenceIds: ['manual:example-rule'], confidence: 'medium' }, strengths: [], priorities: [], cautions: [] }, null, 2), '',
    '# Evidence-reference rules',
    'Every factual claim must be an object with text and evidenceIds, and may include only an optional confidence value of high, medium, or low. Cite one or more known evidence IDs for every claim, including summary, strengths, priorities, cautions, risks, recommendations, observations, and category conclusions. Do not use duplicate evidence IDs inside one claim. Do not cite evidence that is not included in the prepared package.', '',
    '# Prohibited behavior',
    'Avoid unsupported conclusions. Avoid inventing issues. Avoid changing deterministic scores. Avoid treating AI-reported confidence as severity or independent verification. Avoid claiming WCAG compliance. Avoid claiming production readiness. Avoid claiming source inspection beyond supplied snippets. Avoid direct AI/provider/API/upload assumptions.', '',
    '# Review limitations',
    'This is a manual external AI handoff. No browser, assistive-technology, runtime, backend, API, provider, production, or full-source inspection occurred unless explicitly represented in supplied evidence.'
  ].join('\n');
}

function replacer(key, value) { return value instanceof Map ? undefined : value; }
