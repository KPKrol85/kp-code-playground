const STATUS_SCORES = {
  pass: 1,
  warning: 0.55,
  fail: 0,
  na: null
};

export function createInitialStatuses(rules, presetStatuses = {}) {
  return rules.reduce((statuses, rule) => {
    statuses[rule.id] = presetStatuses[rule.id] || 'warning';
    return statuses;
  }, {});
}

export function calculateAudit(rules, statuses) {
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

    const statusScore = STATUS_SCORES[status];
    if (statusScore !== null) {
      earnedWeight += rule.weight * statusScore;
      applicableWeight += rule.weight;
      category.earnedWeight += rule.weight * statusScore;
      category.applicableWeight += rule.weight;
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
    qualityLabel: getQualityLabel(score),
    totals,
    categoryScores,
    recommendations: getRecommendations(rules, statuses)
  };
}

export function getQualityLabel(score) {
  if (score >= 92) return 'Premium-ready';
  if (score >= 82) return 'Production-ready with minor polish';
  if (score >= 70) return 'Solid';
  if (score >= 50) return 'Improving';
  return 'Needs work';
}

function getRecommendations(rules, statuses) {
  return rules
    .filter((rule) => ['warning', 'fail'].includes(statuses[rule.id]))
    .sort((a, b) => severityRank(b.severity) - severityRank(a.severity) || b.weight - a.weight)
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
