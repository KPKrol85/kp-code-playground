export const FINDING_SOURCES = Object.freeze({
  manualReview: 'manual-review',
  htmlAnalyzer: 'html-analyzer',
  cssAnalyzer: 'css-analyzer'
});

export const FINDING_SOURCE_LABELS = Object.freeze({
  [FINDING_SOURCES.manualReview]: 'Manual review',
  [FINDING_SOURCES.htmlAnalyzer]: 'Automated HTML check',
  [FINDING_SOURCES.cssAnalyzer]: 'Automated CSS check'
});

export const FINDING_CONFIDENCE = Object.freeze({ high: 'high', medium: 'medium', low: 'low' });
export const FINDING_CONFIDENCE_LABELS = Object.freeze({ high: 'High confidence', medium: 'Medium confidence', low: 'Low confidence' });
export const MAX_EVIDENCE_SNIPPET_LENGTH = 220;
export const MAX_EVIDENCE_LOCATION_LENGTH = 120;
const AUTOMATED_SOURCES = new Set([FINDING_SOURCES.htmlAnalyzer, FINDING_SOURCES.cssAnalyzer]);

export function isAutomatedSource(source) { return AUTOMATED_SOURCES.has(source); }
export function sourceLabel(source) { return FINDING_SOURCE_LABELS[source] || String(source || 'Unknown source'); }
export function confidenceLabel(confidence) { return FINDING_CONFIDENCE_LABELS[confidence] || 'Confidence not set'; }

export function normalizeEvidenceSnippet(value, maxLength = MAX_EVIDENCE_SNIPPET_LENGTH) {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

export function createEvidence({ snippet, location, occurrenceCount } = {}) {
  const evidence = { snippet: normalizeEvidenceSnippet(snippet) };
  if (location != null && String(location).trim()) evidence.location = normalizeEvidenceSnippet(location, MAX_EVIDENCE_LOCATION_LENGTH);
  if (occurrenceCount != null) evidence.occurrenceCount = Math.max(0, Number(occurrenceCount) || 0);
  return evidence;
}

export function validateFindingMetadata(finding, index = 0) {
  const errors = [];
  if (!Object.values(FINDING_SOURCES).includes(finding.source)) errors.push(`Generated finding at index ${index} has unsupported source metadata.`);
  if (finding.confidence != null && !Object.values(FINDING_CONFIDENCE).includes(finding.confidence)) errors.push(`Generated finding at index ${index} has unsupported confidence metadata.`);
  if (isAutomatedSource(finding.source)) {
    if (!Object.values(FINDING_CONFIDENCE).includes(finding.confidence)) errors.push(`Automated finding at index ${index} must include supported confidence metadata.`);
    errors.push(...validateEvidence(finding.evidence, index));
  }
  return errors;
}

export function validateEvidence(evidence, index = 0) {
  const errors = [];
  if (!evidence || typeof evidence !== 'object' || Array.isArray(evidence)) return [`Automated finding at index ${index} must include structured evidence.`];
  if (typeof evidence.snippet !== 'string' || !evidence.snippet.trim()) errors.push(`Automated finding at index ${index} must include a non-empty evidence snippet.`);
  if (typeof evidence.snippet === 'string' && evidence.snippet.length > MAX_EVIDENCE_SNIPPET_LENGTH) errors.push(`Automated finding at index ${index} evidence snippet is too long.`);
  if (evidence.location != null && (typeof evidence.location !== 'string' || !evidence.location.trim() || evidence.location.length > MAX_EVIDENCE_LOCATION_LENGTH)) errors.push(`Automated finding at index ${index} has invalid evidence location.`);
  if (evidence.occurrenceCount != null && (!Number.isInteger(evidence.occurrenceCount) || evidence.occurrenceCount < 0)) errors.push(`Automated finding at index ${index} has invalid evidence occurrence count.`);
  return errors;
}
