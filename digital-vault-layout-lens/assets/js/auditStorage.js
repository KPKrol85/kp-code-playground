export const AUDIT_STORAGE_KEY = 'kp-layout-lens-audit-v1';
export const AUDIT_SCHEMA_VERSION = 1;

export function loadSavedAuditState({ validPresetIds, validRuleIds, validStatuses }) {
  let parsed;

  try {
    const rawState = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!rawState) return { state: null, status: 'empty' };
    parsed = JSON.parse(rawState);
  } catch {
    return { state: null, status: 'invalid' };
  }

  if (!isPlainObject(parsed) || parsed.schemaVersion !== AUDIT_SCHEMA_VERSION) {
    return { state: null, status: 'invalid' };
  }

  const selectedPresetId = validPresetIds.has(parsed.selectedPresetId)
    ? parsed.selectedPresetId
    : null;
  const ruleStatuses = sanitizeRuleStatuses(parsed.ruleStatuses, validRuleIds, validStatuses);

  return {
    state: {
      selectedPresetId,
      ruleStatuses
    },
    status: 'loaded'
  };
}

export function saveAuditState({ selectedPresetId, ruleStatuses }) {
  const state = {
    schemaVersion: AUDIT_SCHEMA_VERSION,
    selectedPresetId,
    ruleStatuses,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function clearSavedAuditState() {
  try {
    localStorage.removeItem(AUDIT_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

function sanitizeRuleStatuses(ruleStatuses, validRuleIds, validStatuses) {
  if (!isPlainObject(ruleStatuses)) return {};

  return Object.fromEntries(
    Object.entries(ruleStatuses).filter(([ruleId, status]) => (
      validRuleIds.has(ruleId) && validStatuses.has(status)
    ))
  );
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
