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

export function calculateAuditScore(rules, statuses) {
  return rules.reduce((score, rule) => {
    const status = statuses[rule.id] || SCORE_STATUSES.NOT_CHECKED;
    const weight = getRuleWeight(rule);

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
      score.scorePercent = calculatePercent(score.earnedPoints, score.possiblePoints);
      return score;
    }

    if (status === SCORE_STATUSES.NEEDS_WORK) {
      score.needsWorkRules += 1;
      score.scorePercent = calculatePercent(score.earnedPoints, score.possiblePoints);
    }

    return score;
  }, createEmptyScore());
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

function calculatePercent(earnedPoints, possiblePoints) {
  if (possiblePoints <= 0) return null;
  return Math.round((earnedPoints / possiblePoints) * 100);
}
