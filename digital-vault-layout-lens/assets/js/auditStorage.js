export const AUDIT_STORAGE_KEY = 'kp-layout-lens-audit-v1';
export const AUDIT_SCHEMA_VERSION = 2;
const NOTE_MAX_LENGTH = 1000;

export function loadSavedAuditState({ validPresetIds, validRuleIds, validStatuses, validRulePackIds = new Set(), validSeverityProfileIds = new Set(), currentRuleSchemaVersion, compatibleRuleSchemaVersions = [currentRuleSchemaVersion] }) {
  let parsed;

  try {
    const rawState = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!rawState) return { state: null, status: 'empty' };
    parsed = JSON.parse(rawState);
  } catch {
    return { state: null, status: 'invalid' };
  }

  if (!isPlainObject(parsed) || ![1, AUDIT_SCHEMA_VERSION].includes(parsed.schemaVersion)) {
    return { state: null, status: 'invalid' };
  }

  if (!isCompatibleRuleSchemaVersion(parsed.ruleSchemaVersion, currentRuleSchemaVersion, compatibleRuleSchemaVersions)) {
    return { state: null, status: 'schema-mismatch' };
  }

  const selectedPresetId = validPresetIds.has(parsed.selectedPresetId)
    ? parsed.selectedPresetId
    : null;
  const selectedRulePackId = validRulePackIds.has(parsed.selectedRulePackId)
    ? parsed.selectedRulePackId
    : null;
  const selectedSeverityProfileId = validSeverityProfileIds.has(parsed.selectedSeverityProfileId)
    ? parsed.selectedSeverityProfileId
    : null;
  const ruleStatuses = sanitizeRuleStatuses(parsed.ruleStatuses, validRuleIds, validStatuses);
  const ruleNotes = sanitizeRuleNotes(parsed.ruleNotes, validRuleIds);

  return {
    state: {
      selectedPresetId,
      selectedRulePackId,
      selectedSeverityProfileId,
      ruleStatuses,
      ruleNotes
    },
    status: 'loaded'
  };
}

export function saveAuditState({ selectedPresetId, selectedRulePackId, selectedSeverityProfileId, ruleStatuses, ruleNotes = {}, ruleSchemaVersion }) {
  const state = {
    schemaVersion: AUDIT_SCHEMA_VERSION,
    ruleSchemaVersion,
    selectedPresetId,
    selectedRulePackId,
    selectedSeverityProfileId,
    ruleStatuses,
    ruleNotes: sanitizeRuleNotes(ruleNotes, new Set(Object.keys(ruleStatuses || {}))),
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

function isCompatibleRuleSchemaVersion(savedRuleSchemaVersion, currentRuleSchemaVersion, compatibleRuleSchemaVersions) {
  const compatibleVersions = Array.isArray(compatibleRuleSchemaVersions)
    ? compatibleRuleSchemaVersions
    : [currentRuleSchemaVersion];

  return Number.isInteger(currentRuleSchemaVersion)
    && Number.isInteger(savedRuleSchemaVersion)
    && compatibleVersions.includes(savedRuleSchemaVersion);
}

function sanitizeRuleStatuses(ruleStatuses, validRuleIds, validStatuses) {
  if (!isPlainObject(ruleStatuses)) return {};

  return Object.fromEntries(
    Object.entries(ruleStatuses).filter(([ruleId, status]) => (
      validRuleIds.has(ruleId) && validStatuses.has(status)
    ))
  );
}

function sanitizeRuleNotes(ruleNotes, validRuleIds) {
  if (!isPlainObject(ruleNotes)) return {};

  return Object.fromEntries(
    Object.entries(ruleNotes)
      .filter(([ruleId, note]) => validRuleIds.has(ruleId) && typeof note === 'string')
      .map(([ruleId, note]) => [ruleId, normalizeNote(note)])
      .filter(([, note]) => note.length > 0)
  );
}

function normalizeNote(note) {
  return note.replace(/\u0000/g, '').slice(0, NOTE_MAX_LENGTH);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
