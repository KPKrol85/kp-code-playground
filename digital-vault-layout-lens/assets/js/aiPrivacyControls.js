export const AI_PRIVACY_EXCLUDED_CATEGORIES = Object.freeze([
  'raw HTML/CSS source', 'uploaded source files', 'preview iframe content', 'scripts or executable code', 'project metadata', 'report metadata', 'target URLs', 'generated reports', 'saved-project history', 'storage internals', 'browser/device information', 'authentication or account data'
]);

export const AI_PRIVACY_DEFAULTS = Object.freeze({
  includeManualFindings: true,
  includeReviewerNotes: false,
  includeHtmlAnalyzerFindings: true,
  includeCssAnalyzerFindings: true,
  includeAnalyzerEvidenceSnippets: false,
  includeWcagMappings: true,
  includeDeterministicRecommendations: true,
  includeProjectMetadata: false,
  includeReportMetadata: false,
  includeTargetUrls: false,
  includeRawSourceCode: false
});

const SUPPORTED = new Set([
  'includeManualFindings', 'includeReviewerNotes', 'includeHtmlAnalyzerFindings', 'includeCssAnalyzerFindings',
  'includeAnalyzerEvidenceSnippets', 'includeWcagMappings', 'includeDeterministicRecommendations'
]);
const HARD_FALSE = ['includeProjectMetadata', 'includeReportMetadata', 'includeTargetUrls', 'includeRawSourceCode'];

export function normalizeAiPrivacyControls(input = {}) {
  const source = input && typeof input === 'object' ? input : {};
  const normalized = {};
  for (const key of SUPPORTED) normalized[key] = typeof source[key] === 'boolean' ? source[key] : AI_PRIVACY_DEFAULTS[key];
  for (const key of HARD_FALSE) normalized[key] = false;
  return Object.freeze(normalized);
}

export function summarizeAiPrivacyControls(privacy) {
  const cfg = normalizeAiPrivacyControls(privacy);
  const included = [];
  const excluded = [...AI_PRIVACY_EXCLUDED_CATEGORIES];
  if (cfg.includeManualFindings) included.push('manual audit findings'); else excluded.push('manual audit findings');
  if (cfg.includeReviewerNotes) included.push('manual reviewer notes'); else excluded.push('manual reviewer notes');
  if (cfg.includeHtmlAnalyzerFindings) included.push('HTML analyzer findings'); else excluded.push('HTML analyzer findings');
  if (cfg.includeCssAnalyzerFindings) included.push('CSS analyzer findings'); else excluded.push('CSS analyzer findings');
  if (cfg.includeAnalyzerEvidenceSnippets) included.push('capped analyzer evidence snippets'); else excluded.push('analyzer evidence snippets');
  if (cfg.includeWcagMappings) included.push('existing WCAG mappings'); else excluded.push('WCAG mappings');
  if (cfg.includeDeterministicRecommendations) included.push('deterministic recommendations'); else excluded.push('deterministic recommendations');
  return Object.freeze({ included: Object.freeze(included), excluded: Object.freeze([...new Set(excluded)]), sensitiveExcluded: AI_PRIVACY_EXCLUDED_CATEGORIES });
}
