const DEFAULT_WARNING_SCORE = 0.55;

const BASE_STATUS_SCORES = {
  pass: 1,
  fail: 0,
  na: null
};

export function createInitialStatuses(rules, presetStatuses = {}) {
  return rules.reduce((statuses, rule) => {
    statuses[rule.id] = presetStatuses[rule.id] || 'warning';
    return statuses;
  }, {});
}

export function calculateAudit(rules, statuses, profile = {}) {
  const statusScores = {
    ...BASE_STATUS_SCORES,
    warning: profile.warningScore ?? DEFAULT_WARNING_SCORE
  };
  const totals = {
    pass: 0,
    warning: 0,
    fail: 0,
    na: 0
  };

  const categoryMap = new Map();
  let earnedWeight = 0;
  let applicableWeight = 0;

  rules.forEach((rule) => {
    const status = statuses[rule.id] || 'warning';
    totals[status] += 1;

    if (!categoryMap.has(rule.category)) {
      categoryMap.set(rule.category, { earnedWeight: 0, applicableWeight: 0, counts: { pass: 0, warning: 0, fail: 0, na: 0 } });
    }

    const category = categoryMap.get(rule.category);
    category.counts[status] += 1;

    const statusScore = statusScores[status] ?? statusScores.warning;
    const adjustedWeight = getProfileWeight(rule, profile);
    if (statusScore !== null) {
      earnedWeight += adjustedWeight * statusScore;
      applicableWeight += adjustedWeight;
      category.earnedWeight += adjustedWeight * statusScore;
      category.applicableWeight += adjustedWeight;
    }
  });

  const score = applicableWeight > 0 ? Math.round((earnedWeight / applicableWeight) * 100) : 0;
  const categoryScores = Array.from(categoryMap.entries()).map(([name, category]) => ({
    name,
    score: category.applicableWeight > 0 ? Math.round((category.earnedWeight / category.applicableWeight) * 100) : 0,
    counts: category.counts
  }));

  return {
    score,
    qualityLabel: getQualityLabel(score, profile),
    totals,
    categoryScores,
    recommendations: getRecommendations(rules, statuses, profile)
  };
}

export function getQualityLabel(score, profile = {}) {
  const thresholds = profile.qualityThresholds || [
    { score: 92, label: 'Premium-ready' },
    { score: 82, label: 'Production-ready with minor polish' },
    { score: 70, label: 'Solid' },
    { score: 50, label: 'Improving' }
  ];

  return thresholds.find((threshold) => score >= threshold.score)?.label || 'Needs work';
}

function getRecommendations(rules, statuses, profile = {}) {
  return rules
    .filter((rule) => ['warning', 'fail'].includes(statuses[rule.id]))
    .sort((a, b) => recommendationRank(b, profile) - recommendationRank(a, profile) || b.weight - a.weight)
    .map((rule) => ({
      id: rule.id,
      category: rule.category,
      severity: rule.severity,
      label: rule.label,
      status: statuses[rule.id],
      recommendation: rule.recommendation,
      futureAutomationHint: rule.futureAutomationHint
    }));
}

function severityRank(severity) {
  return {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1
  }[severity] || 0;
}

function getProfileWeight(rule, profile) {
  return rule.weight * (profile.categoryMultipliers?.[rule.category] || 1);
}

function recommendationRank(rule, profile) {
  const priorityCategories = profile.recommendationCategoryPriority || [];
  const categoryBoost = priorityCategories.includes(rule.category) ? 10 : 0;
  return categoryBoost + severityRank(rule.severity);
}
