export const AI_REVIEW_RESPONSE_SCHEMA_VERSION = '1.0.0';
const SAFETY_INSTRUCTION = 'Summarize only the supplied deterministic Layout Lens evidence. Do not invent findings, do not change scores, do not claim compliance, and do not use outside context.';

export function buildAiReviewRequest(evidencePackage, { now = () => new Date(), requestId = createRequestId } = {}) {
  const createdAt = now().toISOString();
  const id = typeof requestId === 'function' ? requestId() : requestId;
  return {
    product: 'KP_Code Layout Lens',
    workflow: 'Manual AI handoff for session-only AI-assisted summary review.',
    instruction: SAFETY_INSTRUCTION,
    evidencePackageVersion: evidencePackage.version,
    requestId: id,
    createdAt,
    evidence: evidencePackage,
    requiredResponseFormat: {
      schemaVersion: AI_REVIEW_RESPONSE_SCHEMA_VERSION,
      summary: 'Concise overall review summary.',
      strengths: [{ text: 'Observed strength.', evidenceIds: ['manual:example-rule'] }],
      priorities: [{ text: 'Priority improvement.', evidenceIds: ['html-analyzer:example-check'] }],
      cautions: [{ text: 'Important limitation or review caution.', evidenceIds: ['css-analyzer:example-check'] }]
    }
  };
}

export function serializeAiReviewRequest(request) {
  return JSON.stringify(request, replacer, 2);
}

function createRequestId() { return `ai-review-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`; }
function replacer(key, value) { return value instanceof Map ? undefined : value; }
