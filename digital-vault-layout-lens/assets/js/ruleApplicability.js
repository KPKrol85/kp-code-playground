import { auditRules } from './auditRules.js';
import { componentPresets } from './componentPresets.js';
import { ALL_RULES_PACK_ID, rulePacks } from './rulePacks.js';

export function getPresetPatternIds(preset) {
  return Array.isArray(preset?.supportedPatterns) ? preset.supportedPatterns : [];
}

export function isRuleApplicable(rule, context = {}) {
  const applicability = rule?.applicability;
  if (!applicability) return true;

  const presetId = context.presetId || '';
  const rulePackId = context.rulePackId || ALL_RULES_PACK_ID;
  const patternIds = new Set(Array.isArray(context.patternIds) ? context.patternIds : []);

  if (Array.isArray(applicability.presets) && !applicability.presets.includes(presetId)) return false;
  if (Array.isArray(applicability.packs) && !applicability.packs.includes(rulePackId)) return false;
  if (Array.isArray(applicability.patterns) && !applicability.patterns.some((patternId) => patternIds.has(patternId))) return false;

  return true;
}

export function getApplicableRules(rules, context = {}) {
  return rules.filter((rule) => isRuleApplicable(rule, context));
}

export function getAllPatternIds(presets = componentPresets) {
  return [...new Set(presets.flatMap((preset) => getPresetPatternIds(preset)))];
}

export function getRulePackIds(packs = rulePacks, allRulesPackId = ALL_RULES_PACK_ID) {
  return [allRulesPackId, ...packs.map((pack) => pack.id)];
}

export function getDefaultApplicabilityContext({ presetId, rulePackId } = {}) {
  const preset = componentPresets.find((item) => item.id === presetId) || componentPresets[0];
  return {
    presetId: preset?.id,
    rulePackId: rulePackId || ALL_RULES_PACK_ID,
    patternIds: getPresetPatternIds(preset),
    rules: auditRules
  };
}
