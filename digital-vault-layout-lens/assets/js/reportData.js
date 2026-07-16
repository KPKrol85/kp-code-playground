import { createManualRuleIssueId } from './issueIds.js';
import { SCORE_STATUSES, calculateAuditScore, calculateCategoryScores, normalizeScoreStatus } from './scoringEngine.js';
import { generateRecommendations } from './recommendations.js';
import { DEFAULT_REPORT_TEMPLATE_ID, getReportTemplate } from './reportTemplates.js';

export const REPORT_TITLE = 'KP_Code Layout Lens Audit Report';
export const REPORT_METADATA_FIELDS = Object.freeze([
  field('projectName', 'Project name'), field('owner', 'Owner'), field('projectType', 'Project type'), field('targetUrl', 'Target URL'), field('reviewer', 'Reviewer'), field('reviewDate', 'Review date')
]);
const FIELD_BY_ID = new Map(REPORT_METADATA_FIELDS.map((item) => [item.id, item]));
const MAX_METADATA_LENGTH = 240;
function field(id, label) { return Object.freeze({ id, label }); }

export function normalizeReportText(value, maxLength = MAX_METADATA_LENGTH) {
  return String(value || '').replace(/\u0000/g, '').replace(/\r\n?/g, '\n').split('\n').map((line) => line.replace(/[\t ]+/g, ' ').trim()).filter(Boolean).join(' ').trim().slice(0, maxLength);
}

export function normalizeReportMetadata(input = {}) {
  const normalized = {};
  REPORT_METADATA_FIELDS.forEach(({ id }) => {
    const value = normalizeReportText(input?.[id]);
    if (value) normalized[id] = value;
  });
  return normalized;
}

export function getReportMetadataEntries(metadata = {}) {
  return REPORT_METADATA_FIELDS.map((fieldConfig) => ({ ...fieldConfig, value: metadata?.[fieldConfig.id] || '' })).filter((item) => item.value);
}

export function getReportMetadataLabel(id, template) {
  return template?.metadataLabels?.[id] || FIELD_BY_ID.get(id)?.label || id;
}

export function normalizeReportNote(value) {
  return String(value || '')
    .replace(/\u0000/g, '')
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[\t ]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 1000);
}

export function buildExecutiveSummary({ score = {}, categoryScores = [], findings = [], recommendations = [], preset, rulePack, severityProfile } = {}) {
  const reviewedRules = (score.passedRules || 0) + (score.needsWorkRules || 0);
  const applicableRules = Math.max(0, (score.totalRules || 0) - (score.notApplicableRules || 0));
  const completionPercent = applicableRules > 0 ? Math.round((reviewedRules / applicableRules) * 100) : null;
  const reviewedCategories = categoryScores.filter((category) => category.applicableRules > 0 && category.reviewedRules > 0 && category.scorePercent !== null && category.scorePercent !== undefined);
  const byCategoryOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0) || String(a.categoryName).localeCompare(String(b.categoryName));
  const strengths = [...reviewedCategories].sort((a, b) => b.scorePercent - a.scorePercent || byCategoryOrder(a, b)).slice(0, 3).map(categorySummary);
  const priorities = [...reviewedCategories].filter((category) => category.needsWorkRules > 0).sort((a, b) => a.scorePercent - b.scorePercent || b.needsWorkRules - a.needsWorkRules || byCategoryOrder(a, b)).slice(0, 3).map(categorySummary);
  const severityCounts = findings.reduce((counts, finding) => ({ ...counts, [finding.severity]: (counts[finding.severity] || 0) + 1 }), {});
  const sections = [];
  sections.push({ id: 'audit-overview', title: 'Audit overview', items: [`Preset: ${preset?.name || 'Unknown preset'} (${preset?.id || ''})`, `Rule pack: ${rulePack?.name || 'Unknown rule pack'} (${rulePack?.id || ''})`, `Severity profile: ${severityProfile?.name || 'Unknown severity profile'} (${severityProfile?.id || ''})`] });
  if (reviewedRules === 0) {
    sections.push({ id: 'overall-result', title: 'Overall result', items: ['No applicable rules have been reviewed yet. Complete manual Pass or Needs work statuses before using the score as a review signal.'] });
  } else {
    sections.push({ id: 'overall-result', title: 'Overall result', items: [`Weighted score: ${score.scorePercent ?? 'Not enough checked rules'}${score.scorePercent == null ? '' : '%'}.`, `${score.passedRules || 0} passing rules and ${score.needsWorkRules || 0} Needs work findings were recorded in the reviewed scope.`] });
  }
  if (applicableRules > 0) sections.push({ id: 'review-coverage', title: 'Review coverage', items: [`${reviewedRules} of ${applicableRules} applicable rules reviewed${completionPercent === null ? '' : ` (${completionPercent}%)`}.`, `${score.notCheckedRules || 0} applicable rules remain Not checked; ${score.notApplicableRules || 0} rules are marked Not applicable.`] });
  if (strengths.length) sections.push({ id: 'key-strengths', title: 'Key strengths', items: strengths.map((item) => `${item.name}: ${item.scorePercent}% with ${item.reviewedRules} reviewed applicable rules.`) });
  if (priorities.length) sections.push({ id: 'priority-improvement-areas', title: 'Priority improvement areas', items: priorities.map((item) => `${item.name}: ${item.scorePercent}% with ${item.needsWorkRules} Needs work findings.`) });
  else if (reviewedRules > 0) sections.push({ id: 'priority-improvement-areas', title: 'Priority improvement areas', items: ['No manual issues were recorded in the reviewed scope. This does not claim full coverage or launch readiness.'] });
  if (findings.length) sections.push({ id: 'finding-severity-distribution', title: 'Finding severity distribution', items: Object.keys(severityCounts).sort().map((severity) => `${severity}: ${severityCounts[severity]}`) });
  if (recommendations.length) sections.push({ id: 'recommended-next-steps', title: 'Recommended next steps', items: recommendations.slice(0, 3).map((rec) => `${rec.priority} priority: ${rec.title} (${rec.issueId}).`) });
  return { reviewedRules, applicableRules, completionPercent, needsWorkFindings: findings.length, passingRules: score.passedRules || 0, severityCounts, strengths, priorities, sections };
}

function categorySummary(category) { return { id: category.categoryId || category.categoryName, name: category.categoryName, scorePercent: category.scorePercent, reviewedRules: category.reviewedRules, applicableRules: category.applicableRules, needsWorkRules: category.needsWorkRules }; }

export function buildManualAuditReportData({ preset, rulePack, severityProfile, categories = [], rules = [], statuses = {}, ruleNotes = {}, templateId = DEFAULT_REPORT_TEMPLATE_ID, metadata = {} } = {}) {
  const template = getReportTemplate(templateId);
  const activeRules = Array.isArray(rules) ? rules.slice() : [];
  const score = calculateAuditScore(activeRules, statuses, severityProfile);
  const categoryScores = calculateCategoryScores(categories, activeRules, statuses, severityProfile).map((categoryScore, index) => {
    const reviewedRules = categoryScore.passedRules + categoryScore.needsWorkRules;
    const applicableRules = categoryScore.totalRules - categoryScore.notApplicableRules;
    return { ...categoryScore, order: index, reviewedRules, applicableRules };
  });
  const findings = activeRules.filter((rule) => normalizeScoreStatus(statuses?.[rule.id]) === SCORE_STATUSES.NEEDS_WORK).map((rule) => ({ issueId: createManualRuleIssueId(rule.id), ruleId: rule.id, title: rule.title, description: rule.description, categoryName: rule.category, severity: rule.severity, note: normalizeReportNote(ruleNotes?.[rule.id]) }));
  const notes = activeRules.map((rule) => ({ ruleId: rule.id, ruleTitle: rule.title, categoryName: rule.category, note: normalizeReportNote(ruleNotes?.[rule.id]) })).filter((item) => item.note.length > 0);
  const recommendations = generateRecommendations(activeRules, statuses, severityProfile).map((recommendation) => ({ id: recommendation.id, issueId: recommendation.issueId, title: recommendation.title, description: recommendation.description, categoryName: recommendation.categoryName, priority: recommendation.priority }));
  const normalizedMetadata = normalizeReportMetadata(metadata);
  const context = { preset: { id: preset?.id || '', name: preset?.name || 'Unknown preset' }, rulePack: { id: rulePack?.id || '', name: rulePack?.name || 'Unknown rule pack' }, severityProfile: { id: severityProfile?.id || '', name: severityProfile?.name || 'Unknown severity profile' } };
  return { title: REPORT_TITLE, template: { id: template.id, name: template.name, description: template.description, sectionOrder: [...template.sectionOrder], labels: { ...template.labels }, metadataLabels: { ...(template.metadataLabels || {}) } }, metadata: normalizedMetadata, metadataEntries: getReportMetadataEntries(normalizedMetadata), ...context, score, categoryScores, findings, notes, recommendations, executiveSummary: buildExecutiveSummary({ score, categoryScores, findings, recommendations, ...context }) };
}
