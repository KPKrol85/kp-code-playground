import { createManualRuleIssueId } from './issueIds.js';
import { SCORE_STATUSES, calculateAuditScore, calculateCategoryScores, normalizeScoreStatus } from './scoringEngine.js';
import { generateRecommendations } from './recommendations.js';
import { DEFAULT_REPORT_TEMPLATE_ID, getReportTemplate } from './reportTemplates.js';

export const REPORT_TITLE = 'KP_Code Layout Lens Audit Report';

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

export function buildManualAuditReportData({ preset, rulePack, severityProfile, categories = [], rules = [], statuses = {}, ruleNotes = {}, templateId = DEFAULT_REPORT_TEMPLATE_ID } = {}) {
  const template = getReportTemplate(templateId);
  const activeRules = Array.isArray(rules) ? rules.slice() : [];
  const score = calculateAuditScore(activeRules, statuses, severityProfile);
  const categoryScores = calculateCategoryScores(categories, activeRules, statuses, severityProfile).map((categoryScore) => {
    const reviewedRules = categoryScore.passedRules + categoryScore.needsWorkRules;
    const applicableRules = categoryScore.totalRules - categoryScore.notApplicableRules;
    return { ...categoryScore, reviewedRules, applicableRules };
  });
  const findings = activeRules
    .filter((rule) => normalizeScoreStatus(statuses?.[rule.id]) === SCORE_STATUSES.NEEDS_WORK)
    .map((rule) => ({
      issueId: createManualRuleIssueId(rule.id),
      ruleId: rule.id,
      title: rule.title,
      description: rule.description,
      categoryName: rule.category,
      severity: rule.severity,
      note: normalizeReportNote(ruleNotes?.[rule.id])
    }));
  const notes = activeRules
    .map((rule) => ({ ruleId: rule.id, ruleTitle: rule.title, categoryName: rule.category, note: normalizeReportNote(ruleNotes?.[rule.id]) }))
    .filter((item) => item.note.length > 0);
  const recommendations = generateRecommendations(activeRules, statuses, severityProfile).map((recommendation) => ({
    id: recommendation.id,
    issueId: recommendation.issueId,
    title: recommendation.title,
    description: recommendation.description,
    categoryName: recommendation.categoryName,
    priority: recommendation.priority
  }));

  return {
    title: REPORT_TITLE,
    template: { id: template.id, name: template.name, description: template.description, sectionOrder: [...template.sectionOrder], labels: { ...template.labels } },
    preset: { id: preset?.id || '', name: preset?.name || 'Unknown preset' },
    rulePack: { id: rulePack?.id || '', name: rulePack?.name || 'Unknown rule pack' },
    severityProfile: { id: severityProfile?.id || '', name: severityProfile?.name || 'Unknown severity profile' },
    score,
    categoryScores,
    findings,
    notes,
    recommendations
  };
}
