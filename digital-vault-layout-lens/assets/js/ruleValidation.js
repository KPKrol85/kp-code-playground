export const VALID_SEVERITIES = ['critical', 'high', 'medium', 'low'];
export const VALID_STATUSES = ['pass', 'warning', 'fail', 'na'];

const REQUIRED_FIELDS = ['id', 'category', 'label', 'description', 'severity', 'weight', 'recommendation', 'futureAutomationHint'];

export function validateRules(rules, categories, statusMap = {}) {
  const issues = [];
  const seenIds = new Set();
  const duplicateIds = new Set();
  const validCategories = new Set(categories);

  if (!Array.isArray(rules) || rules.length === 0) {
    return { valid: false, issues: ['Rule data must be a non-empty array.'] };
  }

  rules.forEach((rule, index) => {
    const ruleLabel = rule?.id || `rule at index ${index}`;

    REQUIRED_FIELDS.forEach((field) => {
      if (!hasRequiredValue(rule, field)) issues.push(`${ruleLabel}: missing required field "${field}".`);
    });

    if (rule?.id) {
      if (seenIds.has(rule.id)) duplicateIds.add(rule.id);
      seenIds.add(rule.id);
    }

    if (rule?.category && !validCategories.has(rule.category)) issues.push(`${ruleLabel}: unknown category "${rule.category}".`);
    if (rule?.severity && !VALID_SEVERITIES.includes(rule.severity)) issues.push(`${ruleLabel}: invalid severity "${rule.severity}".`);
    if (typeof rule?.weight !== 'number' || !Number.isFinite(rule.weight) || rule.weight <= 0) issues.push(`${ruleLabel}: weight must be a positive finite number.`);
  });

  duplicateIds.forEach((id) => issues.push(`Duplicate rule id "${id}".`));

  Object.entries(statusMap || {}).forEach(([ruleId, status]) => {
    if (!seenIds.has(ruleId)) issues.push(`Saved status references unknown rule id "${ruleId}".`);
    if (!VALID_STATUSES.includes(status)) issues.push(`${ruleId}: saved status "${status}" is not valid.`);
  });

  return { valid: issues.length === 0, issues };
}

function hasRequiredValue(rule, field) {
  const value = rule?.[field];
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== undefined && value !== null;
}
