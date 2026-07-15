const ISSUE_ID_PATTERN = /^[a-z][a-z0-9-]*:[a-z0-9][a-z0-9-]*(?::[a-z0-9][a-z0-9-]*)?$/;

/**
 * Stable, human-readable issue id format for generated findings.
 * Manual checklist findings use `manual:<rule-id>` and may append one stable
 * discriminator segment if a future rule legitimately emits multiple findings.
 */
export function createIssueId({ source = 'manual', ruleId, discriminator } = {}) {
  const normalizedSource = normalizeIssueIdPart(source, 'source');
  const normalizedRuleId = normalizeIssueIdPart(ruleId, 'ruleId');
  const normalizedDiscriminator = discriminator == null || discriminator === ''
    ? ''
    : `:${normalizeIssueIdPart(discriminator, 'discriminator')}`;
  const issueId = `${normalizedSource}:${normalizedRuleId}${normalizedDiscriminator}`;

  if (!ISSUE_ID_PATTERN.test(issueId)) {
    throw new Error(`Malformed issueId "${issueId}".`);
  }

  return issueId;
}

export function createManualRuleIssueId(ruleId, discriminator) {
  return createIssueId({ source: 'manual', ruleId, discriminator });
}

export function assertUniqueIssueIds(findings) {
  if (!Array.isArray(findings)) {
    throw new Error('Generated findings must be an array before issue IDs can be validated.');
  }

  const issueIds = new Set();
  findings.forEach((finding, index) => {
    if (!finding || typeof finding !== 'object') {
      throw new Error(`Generated finding at index ${index} must be an object.`);
    }
    if (typeof finding.issueId !== 'string' || !ISSUE_ID_PATTERN.test(finding.issueId)) {
      throw new Error(`Generated finding at index ${index} has a malformed issueId.`);
    }
    if (issueIds.has(finding.issueId)) {
      throw new Error(`Duplicate generated issueId "${finding.issueId}".`);
    }
    issueIds.add(finding.issueId);
  });

  return findings;
}

function normalizeIssueIdPart(value, label) {
  if (typeof value !== 'string') {
    throw new Error(`Issue ID ${label} must be a string.`);
  }

  const normalized = value.trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]*$/.test(normalized)) {
    throw new Error(`Issue ID ${label} "${value}" must contain only lowercase letters, numbers, and hyphens.`);
  }

  return normalized;
}
