import { getAiReviewPreset } from './aiReviewPresets.js';
import { AI_REVIEW_RESPONSE_SCHEMA_VERSION, buildAiReviewPrompt } from './aiPromptTemplates.js';
import { measureAiRequestPackage } from './aiUsageControls.js';

export { AI_REVIEW_RESPONSE_SCHEMA_VERSION };

export function buildAiReviewRequest(evidencePackage, { presetId = 'senior-frontend', now = () => new Date(), requestId = createRequestId } = {}) {
  const createdAt = now().toISOString();
  const id = typeof requestId === 'function' ? requestId() : requestId;
  const preset = getAiReviewPreset(presetId);
  const prompt = buildAiReviewPrompt({ requestId: id, preset, evidencePackage });
  const request = {
    product: 'KP_Code Layout Lens',
    workflow: 'Manual AI handoff for session-only AI-assisted summary review.',
    requestId: id,
    createdAt,
    presetId: preset.id,
    presetLabel: preset.label,
    evidencePackageVersion: evidencePackage.version,
    privacyDisclosure: evidencePackage.privacyDisclosure,
    evidenceIds: evidencePackage.evidenceIds,
    prompt,
    evidence: evidencePackage,
    requiredResponseFormat: {
      schemaVersion: AI_REVIEW_RESPONSE_SCHEMA_VERSION,
      requestId: id,
      presetId: preset.id,
      summary: { text: 'Concise overall evidence-based review summary.', evidenceIds: ['manual:example-rule'], confidence: 'medium' },
      strengths: [{ text: 'Observed strength.', evidenceIds: ['manual:example-rule'] }],
      priorities: [{ text: 'Priority improvement.', evidenceIds: ['html-analyzer:example-check'] }],
      cautions: [{ text: 'Important limitation or review caution.', evidenceIds: ['css-analyzer:example-check'] }]
    }
  };
  return Object.freeze({ ...request, packageMeasurement: measureAiRequestPackage(request) });
}

export function serializeAiReviewRequest(request) { return JSON.stringify(request, replacer, 2); }
function createRequestId() { return `ai-review-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`; }
function replacer(key, value) { return key === 'packageMeasurement' || value instanceof Map ? undefined : value; }
