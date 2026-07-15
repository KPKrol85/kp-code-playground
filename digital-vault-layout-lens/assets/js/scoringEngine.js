export const severityWeights = {
  low: 1,
  medium: 2,
  high: 3
};

export const SCORE_STATUSES = {
  NOT_CHECKED: 'not-checked',
  PASS: 'pass',
  NEEDS_WORK: 'needs-work',
  NOT_APPLICABLE: 'not-applicable'
};

export function getRuleWeight(rule) {
  if (Number.isFinite(rule.weight) && rule.weight > 0) {
    return rule.weight;
  }

  return severityWeights[String(rule.severity).toLowerCase()] || severityWeights.medium;
}

export function calculateEffectiveRuleWeight(rule, profile) {
  const baseWeight = getRuleWeight(rule);
  const severity = String(rule.severity).toLowerCase();
  const severityMultiplier = getPositiveMultiplier(profile?.severityMultipliers?.[severity]);
  const categoryMultiplier = getPositiveMultiplier(profile?.categoryMultipliers?.[rule.category]);

  return roundWeight(baseWeight * severityMultiplier * categoryMultiplier);
}

export function calculateAuditScore(rules, statuses = {}, profile) {
  const safeRules = Array.isArray(rules) ? rules : [];
  return finalizeScore(safeRules.reduce(addRuleToScore(statuses, profile), createEmptyScore()));
}

export function calculateCategoryScores(categories, rules, statuses, profile) {
  return categories.map((categoryName) => {
    const categoryRules = rules.filter((rule) => rule.category === categoryName);
    const score = calculateAuditScore(categoryRules, statuses, profile);

    return {
      categoryId: slugify(categoryName),
      categoryName,
      ...score
    };
  });
}

function addRuleToScore(statuses, profile) {
  return (score, rule) => {
    const status = normalizeScoreStatus(statuses?.[rule.id]);
    const weight = calculateEffectiveRuleWeight(rule, profile);

    score.totalRules += 1;

    if (status === SCORE_STATUSES.NOT_CHECKED) {
      score.notCheckedRules += 1;
      return score;
    }

    score.checkedRules += 1;

    if (status === SCORE_STATUSES.NOT_APPLICABLE) {
      score.notApplicableRules += 1;
      return score;
    }

    score.possiblePoints += weight;

    if (status === SCORE_STATUSES.PASS) {
      score.passedRules += 1;
      score.earnedPoints += weight;
      return score;
    }

    if (status === SCORE_STATUSES.NEEDS_WORK) {
      score.needsWorkRules += 1;
    }

    return score;
  };
}

export function normalizeScoreStatus(status) {
  return Object.values(SCORE_STATUSES).includes(status) ? status : SCORE_STATUSES.NOT_CHECKED;
}

function createEmptyScore() {
  return {
    earnedPoints: 0,
    possiblePoints: 0,
    scorePercent: null,
    totalRules: 0,
    checkedRules: 0,
    passedRules: 0,
    needsWorkRules: 0,
    notApplicableRules: 0,
    notCheckedRules: 0
  };
}

function finalizeScore(score) {
  return {
    ...score,
    earnedPoints: roundWeight(score.earnedPoints),
    possiblePoints: roundWeight(score.possiblePoints),
    scorePercent: calculatePercent(score.earnedPoints, score.possiblePoints)
  };
}

function getPositiveMultiplier(value) {
  return Number.isFinite(value) && value > 0 ? value : 1;
}

function roundWeight(value) {
  return Math.round(value * 100) / 100;
}

function calculatePercent(earnedPoints, possiblePoints) {
  if (possiblePoints <= 0) return null;
  return Math.round((earnedPoints / possiblePoints) * 100);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
