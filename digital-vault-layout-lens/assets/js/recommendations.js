import { SCORE_STATUSES } from './scoringEngine.js';

const recommendationDescriptions = {
  high: 'Prioritize this manual checklist issue before release because it can block usability, accessibility, or task completion.',
  medium: 'Review this manual checklist issue and adjust the UI so the related pattern is clearer and more consistent.',
  low: 'Tidy this manual checklist issue when refining the interface so the experience feels more polished.'
};

export function generateRecommendations(rules, statuses) {
  return rules
    .filter((rule) => statuses[rule.id] === SCORE_STATUSES.NEEDS_WORK)
    .map((rule) => {
      const priority = normalizePriority(rule.severity);

      return {
        id: `rec-${rule.id}`,
        categoryName: rule.category,
        title: `Improve ${rule.title.toLowerCase()}`,
        description: `${recommendationDescriptions[priority]} Revisit: ${rule.description}`,
        priority,
        sourceRuleId: rule.id
      };
    });
}

function normalizePriority(severity) {
  const value = String(severity).toLowerCase();
  return ['low', 'medium', 'high'].includes(value) ? value : 'medium';
}
