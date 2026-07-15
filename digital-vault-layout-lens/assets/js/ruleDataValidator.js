import { RULE_SCHEMA_VERSION, auditCategories, auditRuleSchemaMetadata, auditRules } from './auditRules.js';
import { componentPresets } from './componentPresets.js';
import { ALL_RULES_PACK_ID, rulePacks } from './rulePacks.js';
import { DEFAULT_SEVERITY_PROFILE_ID, severityProfiles } from './severityProfiles.js';
import { SCORE_STATUSES, calculateEffectiveRuleWeight, severityWeights } from './scoringEngine.js';
import { getAllPatternIds, getRulePackIds } from './ruleApplicability.js';
import { generateRecommendations } from './recommendations.js';

export class RuleDataValidationError extends Error {
  constructor(result) {
    super(formatRuleDataValidationMessage(result));
    this.name = 'RuleDataValidationError';
    this.result = result;
  }
}

export function validateRuleData(data = {}) {
  const dataset = {
    ruleSchemaVersion: RULE_SCHEMA_VERSION,
    auditCategories,
    auditRuleSchemaMetadata,
    auditRules,
    componentPresets,
    allRulesPackId: ALL_RULES_PACK_ID,
    rulePacks,
    defaultSeverityProfileId: DEFAULT_SEVERITY_PROFILE_ID,
    severityProfiles,
    severityWeights,
    ...data
  };
  const errors = [];
  validateRuleSchemaMetadata(dataset.auditRuleSchemaMetadata, dataset.ruleSchemaVersion, errors);
  const categorySet = validateCategories(dataset.auditCategories, errors);
  const severitySet = validateSeverityWeights(dataset.severityWeights, errors);
  const safePresets = Array.isArray(dataset.componentPresets) ? dataset.componentPresets.filter(isPlainObject) : [];
  const safePacks = Array.isArray(dataset.rulePacks) ? dataset.rulePacks.filter(isPlainObject) : [];
  const patternSet = new Set(getAllPatternIds(safePresets));
  const packIdSet = new Set(getRulePackIds(safePacks, dataset.allRulesPackId));
  const ruleIdSet = validateRules(dataset.auditRules, categorySet, severitySet, errors, { presetIds: new Set(safePresets.map((preset) => preset.id).filter(isNonEmptyString)), packIds: packIdSet, patternIds: patternSet, presets: safePresets });
  validateSeverityProfiles(dataset.severityProfiles, dataset.defaultSeverityProfileId, categorySet, severitySet, errors);
  validateComponentPresets(dataset.componentPresets, categorySet, errors);
  validateRulePacks(dataset.rulePacks, dataset.allRulesPackId, ruleIdSet, errors);
  validateGeneratedRecommendations(dataset.auditRules, dataset.severityProfiles, ruleIdSet, categorySet, severitySet, errors);

  return {
    valid: errors.length === 0,
    errors
  };
}

export function assertValidRuleData(data) {
  const result = validateRuleData(data);
  if (!result.valid) {
    throw new RuleDataValidationError(result);
  }
  return result;
}

export function formatRuleDataValidationMessage(result) {
  const issueLines = result.errors.map((error) => `- ${error.source}${error.entity ? ` ${error.entity}` : ''}${error.field ? `.${error.field}` : ''}: ${error.reason}`);
  return ['Rule data validation failed:', ...issueLines].join('\n');
}


function validateRuleSchemaMetadata(metadata, ruleSchemaVersion, errors) {
  if (!Number.isInteger(ruleSchemaVersion) || ruleSchemaVersion < 1) {
    addError(errors, 'auditRules.js', 'RULE_SCHEMA_VERSION', 'value', 'Rule schema version must be a positive integer.');
  }

  if (!isPlainObject(metadata)) {
    addError(errors, 'auditRules.js', 'auditRuleSchemaMetadata', 'root', 'Expected rule schema metadata to be a plain object.');
    return;
  }

  validateRequiredText(metadata.schemaName, 'auditRules.js', 'auditRuleSchemaMetadata', 'schemaName', errors);
  if (!Number.isInteger(metadata.schemaVersion) || metadata.schemaVersion < 1) {
    addError(errors, 'auditRules.js', 'auditRuleSchemaMetadata', 'schemaVersion', 'Schema metadata version must be a positive integer.');
  } else if (metadata.schemaVersion !== ruleSchemaVersion) {
    addError(errors, 'auditRules.js', 'auditRuleSchemaMetadata', 'schemaVersion', 'Schema metadata version must match RULE_SCHEMA_VERSION.');
  }

  if (!Array.isArray(metadata.compatibleAuditStateVersions) || metadata.compatibleAuditStateVersions.length === 0) {
    addError(errors, 'auditRules.js', 'auditRuleSchemaMetadata', 'compatibleAuditStateVersions', 'Compatible audit state versions must be a non-empty array.');
  } else {
    metadata.compatibleAuditStateVersions.forEach((version, index) => {
      if (!Number.isInteger(version) || version < 1) {
        addError(errors, 'auditRules.js', 'auditRuleSchemaMetadata', `compatibleAuditStateVersions[${index}]`, 'Compatible audit state version must be a positive integer.');
      }
    });
  }

  validateRequiredText(metadata.ruleIdStrategy, 'auditRules.js', 'auditRuleSchemaMetadata', 'ruleIdStrategy', errors);
  if ('compatibleRuleSchemaVersions' in metadata) validatePositiveIntegerList(metadata.compatibleRuleSchemaVersions, 'auditRules.js', 'auditRuleSchemaMetadata', 'compatibleRuleSchemaVersions', errors);
  validateRequiredText(metadata.migrationNote, 'auditRules.js', 'auditRuleSchemaMetadata', 'migrationNote', errors);
}

function validateCategories(categories, errors) {
  const categorySet = new Set();
  if (!Array.isArray(categories)) {
    addError(errors, 'auditRules.js', 'auditCategories', 'root', 'Expected auditCategories to be an array.');
    return categorySet;
  }

  categories.forEach((category, index) => {
    if (!isNonEmptyString(category)) {
      addError(errors, 'auditRules.js', `auditCategories[${index}]`, 'value', 'Category must be a non-empty string.');
      return;
    }
    if (categorySet.has(category)) {
      addError(errors, 'auditRules.js', `auditCategories[${index}]`, 'value', `Duplicate category "${category}".`);
      return;
    }
    categorySet.add(category);
  });
  return categorySet;
}

function validateSeverityWeights(weights, errors) {
  const severitySet = new Set();
  if (!isPlainObject(weights)) {
    addError(errors, 'scoringEngine.js', 'severityWeights', 'root', 'Expected severityWeights to be a plain object.');
    return severitySet;
  }

  Object.entries(weights).forEach(([severity, weight]) => {
    if (!isNonEmptyString(severity)) {
      addError(errors, 'scoringEngine.js', 'severityWeights', String(severity), 'Severity key must be a non-empty string.');
      return;
    }
    if (!isPositiveFiniteNumber(weight)) {
      addError(errors, 'scoringEngine.js', 'severityWeights', severity, 'Weight must be a positive finite number because scoring treats non-positive weights as unusable.');
      return;
    }
    severitySet.add(severity);
  });
  return severitySet;
}

function validateRules(rules, categorySet, severitySet, errors, applicabilityReferences = {}) {
  const ruleIdSet = new Set();
  if (!Array.isArray(rules)) {
    addError(errors, 'auditRules.js', 'auditRules', 'root', 'Expected auditRules to be an array.');
    return ruleIdSet;
  }

  rules.forEach((rule, index) => {
    const entity = getEntityLabel('auditRules', rule, index);
    if (!isPlainObject(rule)) {
      addError(errors, 'auditRules.js', entity, 'root', 'Rule must be a plain object.');
      return;
    }

    if (!isNonEmptyString(rule.id)) {
      addError(errors, 'auditRules.js', entity, 'id', 'Rule id must be a non-empty string.');
    } else if (ruleIdSet.has(rule.id)) {
      addError(errors, 'auditRules.js', entity, 'id', `Duplicate rule id "${rule.id}".`);
    } else {
      ruleIdSet.add(rule.id);
    }

    validateRequiredText(rule.category, 'auditRules.js', entity, 'category', errors);
    if (isNonEmptyString(rule.category) && !categorySet.has(rule.category)) {
      addError(errors, 'auditRules.js', entity, 'category', `Unknown category "${rule.category}".`);
    }
    validateRequiredText(rule.title, 'auditRules.js', entity, 'title', errors);
    validateRequiredText(rule.description, 'auditRules.js', entity, 'description', errors);
    validateRequiredText(rule.severity, 'auditRules.js', entity, 'severity', errors);
    if (isNonEmptyString(rule.severity) && !severitySet.has(rule.severity)) {
      addError(errors, 'auditRules.js', entity, 'severity', `Unsupported severity "${rule.severity}".`);
    }
    if ('weight' in rule && !isPositiveFiniteNumber(rule.weight)) {
      addError(errors, 'auditRules.js', entity, 'weight', 'Optional rule weight must be a positive finite number.');
    }
    validateApplicability(rule.applicability, applicabilityReferences, 'auditRules.js', entity, errors);
  });
  return ruleIdSet;
}

function validateSeverityProfiles(profiles, defaultProfileId, categorySet, severitySet, errors) {
  const profileIdSet = new Set();
  if (!Array.isArray(profiles)) {
    addError(errors, 'severityProfiles.js', 'severityProfiles', 'root', 'Expected severityProfiles to be an array.');
    return profileIdSet;
  }

  profiles.forEach((profile, index) => {
    const entity = getEntityLabel('severityProfiles', profile, index);
    if (!isPlainObject(profile)) {
      addError(errors, 'severityProfiles.js', entity, 'root', 'Severity profile must be a plain object.');
      return;
    }
    validateUniqueId(profile.id, profileIdSet, 'severityProfiles.js', entity, errors);
    validateRequiredText(profile.name, 'severityProfiles.js', entity, 'name', errors);
    validateRequiredText(profile.description, 'severityProfiles.js', entity, 'description', errors);
    if ('summary' in profile) validateRequiredText(profile.summary, 'severityProfiles.js', entity, 'summary', errors);
    validateMultiplierMap(profile.severityMultipliers, severitySet, 'severityProfiles.js', entity, 'severityMultipliers', true, errors);
    validateMultiplierMap(profile.categoryMultipliers || {}, categorySet, 'severityProfiles.js', entity, 'categoryMultipliers', false, errors);
  });

  if (!isNonEmptyString(defaultProfileId) || !profileIdSet.has(defaultProfileId)) {
    addError(errors, 'severityProfiles.js', 'DEFAULT_SEVERITY_PROFILE_ID', 'value', 'Default severity profile id must reference an existing profile.');
  }
  return profileIdSet;
}

function validateComponentPresets(presets, categorySet, errors) {
  const presetIdSet = new Set();
  if (!Array.isArray(presets)) {
    addError(errors, 'componentPresets.js', 'componentPresets', 'root', 'Expected componentPresets to be an array.');
    return;
  }
  presets.forEach((preset, index) => {
    const entity = getEntityLabel('componentPresets', preset, index);
    if (!isPlainObject(preset)) {
      addError(errors, 'componentPresets.js', entity, 'root', 'Preset must be a plain object.');
      return;
    }
    validateUniqueId(preset.id, presetIdSet, 'componentPresets.js', entity, errors);
    ['name', 'description', 'bestUse'].forEach((field) => validateRequiredText(preset[field], 'componentPresets.js', entity, field, errors));
    validateReferenceList(preset.relatedCategories, categorySet, 'componentPresets.js', entity, 'relatedCategories', 'category', errors);
    if ('supportedPatterns' in preset) validatePatternDefinitionList(preset.supportedPatterns, 'componentPresets.js', entity, 'supportedPatterns', errors);
  });
}

function validateRulePacks(packs, allRulesPackId, ruleIdSet, errors) {
  const packIdSet = new Set();
  if (isNonEmptyString(allRulesPackId)) packIdSet.add(allRulesPackId);
  if (!Array.isArray(packs)) {
    addError(errors, 'rulePacks.js', 'rulePacks', 'root', 'Expected rulePacks to be an array.');
    return;
  }
  packs.forEach((pack, index) => {
    const entity = getEntityLabel('rulePacks', pack, index);
    if (!isPlainObject(pack)) {
      addError(errors, 'rulePacks.js', entity, 'root', 'Rule pack must be a plain object.');
      return;
    }
    validateUniqueId(pack.id, packIdSet, 'rulePacks.js', entity, errors);
    ['name', 'description'].forEach((field) => validateRequiredText(pack[field], 'rulePacks.js', entity, field, errors));
    validateReferenceList(pack.ruleIds, ruleIdSet, 'rulePacks.js', entity, 'ruleIds', 'rule', errors);
  });
}

function validateGeneratedRecommendations(rules, profiles, ruleIdSet, categorySet, severitySet, errors) {
  const profile = Array.isArray(profiles) ? profiles[0] : undefined;
  const statuses = Object.fromEntries((Array.isArray(rules) ? rules : [])
    .filter((rule) => isPlainObject(rule) && isNonEmptyString(rule.id))
    .map((rule) => [rule.id, SCORE_STATUSES.NEEDS_WORK]));
  let recommendations = [];
  try {
    recommendations = generateRecommendations(Array.isArray(rules) ? rules : [], statuses, profile);
  } catch (error) {
    addError(errors, 'recommendations.js', 'generateRecommendations', 'root', `Recommendation generation threw: ${error.message}`);
    return;
  }
  const recommendationIdSet = new Set();
  const recommendationIssueIdSet = new Set();
  recommendations.forEach((recommendation, index) => {
    const entity = getEntityLabel('recommendations', recommendation, index);
    validateUniqueId(recommendation.id, recommendationIdSet, 'recommendations.js', entity, errors);
    validateUniqueId(recommendation.issueId, recommendationIssueIdSet, 'recommendations.js', entity, errors);
    validateRequiredText(recommendation.issueId, 'recommendations.js', entity, 'issueId', errors);
    if (isNonEmptyString(recommendation.issueId) && !/^manual:[a-z0-9][a-z0-9-]*$/.test(recommendation.issueId)) addError(errors, 'recommendations.js', entity, 'issueId', `Malformed issueId "${recommendation.issueId}".`);
    validateRequiredText(recommendation.categoryName, 'recommendations.js', entity, 'categoryName', errors);
    if (isNonEmptyString(recommendation.categoryName) && !categorySet.has(recommendation.categoryName)) addError(errors, 'recommendations.js', entity, 'categoryName', `Unknown category "${recommendation.categoryName}".`);
    validateRequiredText(recommendation.title, 'recommendations.js', entity, 'title', errors);
    validateRequiredText(recommendation.description, 'recommendations.js', entity, 'description', errors);
    validateRequiredText(recommendation.priority, 'recommendations.js', entity, 'priority', errors);
    if (isNonEmptyString(recommendation.priority) && !severitySet.has(recommendation.priority)) addError(errors, 'recommendations.js', entity, 'priority', `Unsupported priority "${recommendation.priority}".`);
    validateRequiredText(recommendation.sourceRuleId, 'recommendations.js', entity, 'sourceRuleId', errors);
    if (isNonEmptyString(recommendation.sourceRuleId) && !ruleIdSet.has(recommendation.sourceRuleId)) addError(errors, 'recommendations.js', entity, 'sourceRuleId', `Unknown source rule "${recommendation.sourceRuleId}".`);
    if (!isPositiveFiniteNumber(recommendation.effectiveWeight)) addError(errors, 'recommendations.js', entity, 'effectiveWeight', 'Recommendation effective weight must be a positive finite number.');
    if (!Number.isInteger(recommendation.originalIndex) || recommendation.originalIndex < 0) addError(errors, 'recommendations.js', entity, 'originalIndex', 'Recommendation originalIndex must be a non-negative integer.');
  });
}


function validateApplicability(applicability, references, source, entity, errors) {
  if (applicability === undefined) return;
  if (!isPlainObject(applicability)) {
    addError(errors, source, entity, 'applicability', 'Applicability metadata must be a plain object when present.');
    return;
  }

  const allowedFields = new Set(['presets', 'packs', 'patterns']);
  Object.keys(applicability).forEach((field) => {
    if (!allowedFields.has(field)) addError(errors, source, entity, `applicability.${field}`, `Unknown applicability field "${field}".`);
  });

  const fields = ['presets', 'packs', 'patterns'].filter((field) => field in applicability);
  if (fields.length === 0) {
    addError(errors, source, entity, 'applicability', 'Applicability metadata must contain at least one of presets, packs, or patterns.');
    return;
  }

  const referenceMap = {
    presets: ['preset', references.presetIds || new Set()],
    packs: ['pack', references.packIds || new Set()],
    patterns: ['pattern', references.patternIds || new Set()]
  };

  fields.forEach((field) => {
    const [label, allowedValues] = referenceMap[field];
    validateReferenceList(applicability[field], allowedValues, source, entity, `applicability.${field}`, label, errors);
    if (Array.isArray(applicability[field]) && applicability[field].length === 0) {
      addError(errors, source, entity, `applicability.${field}`, 'Applicability reference list must not be empty.');
    }
  });

  validateApplicabilityHasPossibleContext(applicability, references, source, entity, errors);
}

function validateApplicabilityHasPossibleContext(applicability, references, source, entity, errors) {
  if (!Array.isArray(applicability.presets) || !Array.isArray(applicability.patterns)) return;

  const matchingPreset = (references.presets || []).some((preset) => (
    applicability.presets.includes(preset.id)
      && Array.isArray(preset.supportedPatterns)
      && preset.supportedPatterns.some((pattern) => applicability.patterns.includes(pattern))
  ));

  if (!matchingPreset) {
    addError(errors, source, entity, 'applicability', 'Applicability presets and patterns have no possible matching preset context.');
  }
}

function validateMultiplierMap(map, allowedKeys, source, entity, field, requireAll, errors) {
  if (!isPlainObject(map)) {
    addError(errors, source, entity, field, 'Expected multiplier map to be a plain object.');
    return;
  }
  allowedKeys.forEach((key) => {
    if (requireAll && !(key in map)) addError(errors, source, entity, `${field}.${key}`, 'Missing required multiplier.');
  });
  Object.entries(map).forEach(([key, value]) => {
    if (!allowedKeys.has(key)) addError(errors, source, entity, `${field}.${key}`, `Unexpected multiplier key "${key}".`);
    if (!isPositiveFiniteNumber(value)) addError(errors, source, entity, `${field}.${key}`, 'Multiplier must be a positive finite number; scoring falls back for invalid multipliers.');
  });
}



function validatePatternDefinitionList(values, source, entity, field, errors) {
  if (!Array.isArray(values)) {
    addError(errors, source, entity, field, `Expected ${field} to be an array.`);
    return;
  }
  const seen = new Set();
  values.forEach((value, index) => {
    if (!isNonEmptyString(value)) {
      addError(errors, source, entity, `${field}[${index}]`, 'pattern reference must be a non-empty string.');
      return;
    }
    if (seen.has(value)) addError(errors, source, entity, `${field}[${index}]`, `Duplicate pattern reference "${value}" in this collection.`);
    seen.add(value);
  });
}

function validatePositiveIntegerList(values, source, entity, field, errors) {
  if (!Array.isArray(values) || values.length === 0) {
    addError(errors, source, entity, field, 'Expected a non-empty array of positive integers.');
    return;
  }
  const seen = new Set();
  values.forEach((value, index) => {
    if (!Number.isInteger(value) || value < 1) {
      addError(errors, source, entity, `${field}[${index}]`, 'Version reference must be a positive integer.');
      return;
    }
    if (seen.has(value)) addError(errors, source, entity, `${field}[${index}]`, `Duplicate version reference "${value}" in this collection.`);
    seen.add(value);
  });
}

function validateReferenceList(values, allowedValues, source, entity, field, label, errors) {
  if (!Array.isArray(values)) {
    addError(errors, source, entity, field, `Expected ${field} to be an array.`);
    return;
  }
  const seen = new Set();
  values.forEach((value, index) => {
    if (!isNonEmptyString(value)) {
      addError(errors, source, entity, `${field}[${index}]`, `${label} reference must be a non-empty string.`);
      return;
    }
    if (seen.has(value)) addError(errors, source, entity, `${field}[${index}]`, `Duplicate ${label} reference "${value}" in this collection.`);
    seen.add(value);
    if (!allowedValues.has(value)) addError(errors, source, entity, `${field}[${index}]`, `Unknown ${label} reference "${value}".`);
  });
}

function validateUniqueId(id, idSet, source, entity, errors) {
  if (!isNonEmptyString(id)) {
    addError(errors, source, entity, 'id', 'ID must be a non-empty string.');
    return;
  }
  if (idSet.has(id)) {
    addError(errors, source, entity, 'id', `Duplicate id "${id}".`);
    return;
  }
  idSet.add(id);
}

function validateRequiredText(value, source, entity, field, errors) {
  if (!isNonEmptyString(value)) addError(errors, source, entity, field, `${field} must be a non-empty string.`);
}

function addError(errors, source, entity, field, reason) {
  errors.push({ source, entity, field, reason });
}

function getEntityLabel(collection, entity, index) {
  return isPlainObject(entity) && isNonEmptyString(entity.id) ? `${collection}[${entity.id}]` : `${collection}[${index}]`;
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPositiveFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
