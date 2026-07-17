import { createManualRuleIssueId } from './issueIds.js';
import { normalizeAiPrivacyControls, summarizeAiPrivacyControls } from './aiPrivacyControls.js';

export const AI_EVIDENCE_PACKAGE_VERSION = '1.0.0';

export function buildAiEvidencePackage({ preset, rulePack, severityProfile, categories = [], rules = [], statuses = {}, ruleNotes = {}, score = {}, categoryScores = [], recommendations = [], htmlAnalyzer = {}, cssAnalyzer = {}, privacy } = {}) {
  const privacyConfig = normalizeAiPrivacyControls(privacy);
  const manualFindings = (privacyConfig.includeManualFindings ? rules : [])
    .filter((rule) => ['needs-work', 'pass'].includes(statuses[rule.id]))
    .map((rule) => freezePlain({
      id: createManualRuleIssueId(rule.id),
      ruleId: rule.id,
      status: statuses[rule.id],
      title: clean(rule.title),
      category: clean(rule.category),
      severity: clean(rule.severity),
      reviewerNote: privacyConfig.includeReviewerNotes ? clean(ruleNotes[rule.id] || '') : ''
    }));
  const categoryFacts = categoryScores.map((item) => freezePlain({
    id: `category:${slug(item.categoryName || item.categoryId)}`,
    category: clean(item.categoryName),
    scorePercent: nullableNumber(item.scorePercent),
    totalRules: number(item.totalRules),
    passedRules: number(item.passedRules),
    needsWorkRules: number(item.needsWorkRules),
    notApplicableRules: number(item.notApplicableRules),
    notCheckedRules: number(item.notCheckedRules)
  }));
  const model = {
    version: AI_EVIDENCE_PACKAGE_VERSION,
    score: freezePlain({
      scorePercent: nullableNumber(score.scorePercent),
      earnedPoints: number(score.earnedPoints),
      possiblePoints: number(score.possiblePoints),
      totalRules: number(score.totalRules),
      checkedRules: number(score.checkedRules),
      needsWorkRules: number(score.needsWorkRules),
      notApplicableRules: number(score.notApplicableRules),
      reviewedApplicableRules: number(score.checkedRules),
      applicableRules: Math.max(0, number(score.totalRules) - number(score.notApplicableRules))
    }),
    context: freezePlain({
      selectedPreset: clean(preset?.name || preset?.id || ''),
      selectedRulePack: clean(rulePack?.name || rulePack?.id || ''),
      selectedSeverityProfile: clean(severityProfile?.name || severityProfile?.id || ''),
      categories: categories.map(clean).filter(Boolean)
    }),
    categoryFacts: freezeArray(categoryFacts),
    manualFindings: freezeArray(manualFindings),
    deterministicRecommendations: freezeArray(privacyConfig.includeDeterministicRecommendations ? (recommendations || []).map((item) => freezePlain({ title: clean(item.title), category: clean(item.categoryName), priority: clean(item.priority), description: clean(item.description) })) : []),
    analyzerFindings: freezeArray([
      ...(privacyConfig.includeHtmlAnalyzerFindings ? normalizeAnalyzerFindings(htmlAnalyzer.findings, 'html-analyzer', privacyConfig) : []),
      ...(privacyConfig.includeCssAnalyzerFindings ? normalizeAnalyzerFindings(cssAnalyzer.findings, 'css-analyzer', privacyConfig) : [])
    ]),
    privacyDisclosure: freezePlain(summarizeAiPrivacyControls(privacyConfig))
  };
  const evidenceLookup = new Map();
  [...model.categoryFacts, ...model.manualFindings, ...model.analyzerFindings].forEach((item) => evidenceLookup.set(item.id, item));
  return deepFreeze({ ...model, evidenceIds: freezeArray([...evidenceLookup.keys()].sort()), evidenceLookup });
}

function normalizeAnalyzerFindings(findings = [], fallbackSource, privacyConfig) {
  return (Array.isArray(findings) ? findings : []).filter(Boolean).map((item) => freezePlain({
    id: item.issueId,
    checkId: clean(item.checkId || item.ruleId),
    title: clean(item.title),
    category: clean(item.category),
    severity: clean(item.severity),
    source: clean(item.source || fallbackSource),
    confidence: clean(item.confidence),
    message: clean(item.message),
    evidenceSnippet: privacyConfig.includeAnalyzerEvidenceSnippets ? clean(item.evidence?.snippet || '').slice(0, 280) : '',
    occurrenceCount: number(item.occurrenceCount ?? item.evidence?.occurrenceCount ?? item.affectedElementCount),
    location: clean(item.evidence?.location || (Array.isArray(item.locations) ? item.locations.join('; ') : '')),
    wcag: freezeArray(privacyConfig.includeWcagMappings ? (item.wcag || []).map((entry) => freezePlain({ criterion: clean(entry.criterion), level: clean(entry.level), title: clean(entry.title) })) : [])
  })).filter((item) => item.id && item.id.startsWith(`${fallbackSource}:`));
}

export function createEvidenceFingerprint(evidencePackage) {
  return stableStringify({ version: evidencePackage?.version, ids: evidencePackage?.evidenceIds || [], score: evidencePackage?.score, manual: evidencePackage?.manualFindings, analyzer: evidencePackage?.analyzerFindings, categories: evidencePackage?.categoryFacts, privacy: evidencePackage?.privacyDisclosure });
}

function clean(value) { return typeof value === 'string' ? value.replace(/\u0000/g, '').replace(/\s+/g, ' ').trim().slice(0, 1000) : ''; }
function number(value) { return Number.isFinite(Number(value)) ? Number(value) : 0; }
function nullableNumber(value) { return value === null || value === undefined || value === '' || !Number.isFinite(Number(value)) ? null : Number(value); }
function slug(value) { return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'unknown'; }
function freezePlain(value) { return Object.freeze(value); }
function freezeArray(value) { return Object.freeze(value); }
function deepFreeze(value) { Object.values(value).forEach((v) => { if (v && typeof v === 'object' && !(v instanceof Map) && !Object.isFrozen(v)) deepFreeze(v); }); return Object.freeze(value); }
function stableStringify(value) { if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`; if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`).join(',')}}`; return JSON.stringify(value); }
