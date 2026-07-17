export const AUDIT_STORAGE_KEY = 'kp-layout-lens-audit-v1';
import { AUDIT_PRODUCT_ID, AUDIT_SCHEMA_ID, AUDIT_SCHEMA_VERSION, migrateStoredAuditState } from './auditMigrations.js';

export { AUDIT_PRODUCT_ID, AUDIT_SCHEMA_ID, AUDIT_SCHEMA_VERSION };
export const MAX_AUDIT_IMPORT_BYTES = 200000;
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

  return migrateStoredAuditState(parsed, { validPresetIds, validRuleIds, validStatuses, validRulePackIds, validSeverityProfileIds, currentRuleSchemaVersion, compatibleRuleSchemaVersions }, { normalizeAuditState });
}

export function saveAuditState({ selectedPresetId, selectedRulePackId, selectedSeverityProfileId, ruleStatuses, ruleNotes = {}, ruleSchemaVersion }) {
  const state = createManualAuditSnapshot({ selectedPresetId, selectedRulePackId, selectedSeverityProfileId, ruleStatuses, ruleNotes, ruleSchemaVersion });

  try {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function createAuditStateExport({ selectedPresetId, selectedRulePackId, selectedSeverityProfileId, ruleStatuses, ruleNotes = {}, ruleSchemaVersion }) {
  return {
    schema: {
      id: AUDIT_SCHEMA_ID,
      version: AUDIT_SCHEMA_VERSION,
      ruleSchemaVersion
    },
    metadata: {
      productId: AUDIT_PRODUCT_ID,
      exportedAt: new Date().toISOString()
    },
    audit: {
      selectedPresetId,
      selectedRulePackId,
      selectedSeverityProfileId,
      ruleStatuses: sanitizeRuleStatuses(ruleStatuses, new Set(Object.keys(ruleStatuses || {})), new Set(Object.values(ruleStatuses || {}))),
      ruleNotes: sanitizeRuleNotes(ruleNotes, new Set(Object.keys(ruleStatuses || {})))
    }
  };
}

export function stringifyAuditStateExport(state) {
  return `${JSON.stringify(state, null, 2)}\n`;
}

export function parseImportedAuditState(rawJson, validationOptions) {
  if (typeof rawJson !== 'string') return { state: null, status: 'invalid', message: 'Import failed because the file could not be read as text.' };
  if (rawJson.length > MAX_AUDIT_IMPORT_BYTES) return { state: null, status: 'too-large', message: 'Import failed because the JSON file is too large.' };

  let parsed;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { state: null, status: 'invalid-json', message: 'Import failed because the file is not valid JSON.' };
  }

  return migrateStoredAuditState(unwrapImportedAuditState(parsed), validationOptions, { strict: true, normalizeAuditState });
}

export function clearSavedAuditState() {
  try {
    localStorage.removeItem(AUDIT_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function createManualAuditSnapshot({ selectedPresetId, selectedRulePackId, selectedSeverityProfileId, ruleStatuses, ruleNotes = {}, ruleSchemaVersion }) {
  return {
    schemaVersion: AUDIT_SCHEMA_VERSION,
    schemaId: AUDIT_SCHEMA_ID,
    ruleSchemaVersion,
    selectedPresetId,
    selectedRulePackId,
    selectedSeverityProfileId,
    ruleStatuses,
    ruleNotes: sanitizeRuleNotes(ruleNotes, new Set(Object.keys(ruleStatuses || {}))),
    updatedAt: new Date().toISOString()
  };
}

function unwrapImportedAuditState(parsed) {
  if (!isPlainObject(parsed)) return parsed;
  if (isPlainObject(parsed.schema) && isPlainObject(parsed.audit)) {
    return {
      schemaId: parsed.schema.id,
      schemaVersion: parsed.schema.version,
      ruleSchemaVersion: parsed.schema.ruleSchemaVersion,
      __importEnvelope: true,
      ...parsed.audit
    };
  }
  return parsed;
}

export function normalizeAuditState(parsed, { validPresetIds, validRuleIds, validStatuses, validRulePackIds = new Set(), validSeverityProfileIds = new Set(), currentRuleSchemaVersion, compatibleRuleSchemaVersions = [currentRuleSchemaVersion] }, options = {}) {
  const strict = Boolean(options.strict);
  if (!isPlainObject(parsed)) return reject('invalid', 'Import failed because the JSON is not an audit state object.');
  if (strict && !parsed.__importEnvelope && !looksLikeLegacyAuditState(parsed)) return reject('unrelated', 'Import failed because the JSON does not look like a Layout Lens audit export.');
  if (strict && parsed.schemaId && parsed.schemaId !== AUDIT_SCHEMA_ID) return reject('unrelated', 'Import failed because the JSON belongs to a different product or schema.');
  if (!isCompatibleRuleSchemaVersion(parsed.ruleSchemaVersion, currentRuleSchemaVersion, compatibleRuleSchemaVersions)) return reject('schema-mismatch', 'Import failed because the rule schema version is not supported by this app.');

  const selectedPresetId = validateOptionalId(parsed.selectedPresetId, validPresetIds, strict, 'preset');
  if (selectedPresetId.error) return reject('invalid-reference', selectedPresetId.error);
  const selectedRulePackId = validateOptionalId(parsed.selectedRulePackId, validRulePackIds, strict, 'rule pack');
  if (selectedRulePackId.error) return reject('invalid-reference', selectedRulePackId.error);
  const selectedSeverityProfileId = validateOptionalId(parsed.selectedSeverityProfileId, validSeverityProfileIds, strict, 'severity profile');
  if (selectedSeverityProfileId.error) return reject('invalid-reference', selectedSeverityProfileId.error);

  const invalidStatus = getInvalidStatusEntry(parsed.ruleStatuses, validRuleIds, validStatuses);
  if (strict && invalidStatus) return reject('invalid-status', invalidStatus);
  const invalidNote = getInvalidNoteEntry(parsed.ruleNotes, validRuleIds);
  if (strict && invalidNote) return reject('invalid-note', invalidNote);

  return {
    state: {
      selectedPresetId: selectedPresetId.value,
      selectedRulePackId: selectedRulePackId.value,
      selectedSeverityProfileId: selectedSeverityProfileId.value,
      ruleStatuses: sanitizeRuleStatuses(parsed.ruleStatuses, validRuleIds, validStatuses),
      ruleNotes: sanitizeRuleNotes(parsed.ruleNotes, validRuleIds)
    },
    status: 'loaded',
    message: 'Audit JSON imported successfully.'
  };
}

function reject(status, message) { return { state: null, status, message }; }
function looksLikeLegacyAuditState(value) {
  return isPlainObject(value)
    && Number.isInteger(value.schemaVersion)
    && Number.isInteger(value.ruleSchemaVersion)
    && isPlainObject(value.ruleStatuses);
}
function validateOptionalId(value, validIds, strict, label) {
  if (validIds.has(value)) return { value };
  if (value == null || value === '') return { value: null };
  return strict ? { error: `Import failed because it references an unknown ${label}.` } : { value: null };
}
function getInvalidStatusEntry(ruleStatuses, validRuleIds, validStatuses) {
  if (!isPlainObject(ruleStatuses)) return ruleStatuses == null ? '' : 'Import failed because rule statuses must be an object.';
  const invalid = Object.entries(ruleStatuses).find(([ruleId, status]) => !validRuleIds.has(ruleId) || !validStatuses.has(status));
  return invalid ? `Import failed because rule status "${invalid[0]}" is unknown or invalid.` : '';
}
function getInvalidNoteEntry(ruleNotes, validRuleIds) {
  if (ruleNotes == null) return '';
  if (!isPlainObject(ruleNotes)) return 'Import failed because reviewer notes must be an object.';
  const invalid = Object.entries(ruleNotes).find(([ruleId, note]) => !validRuleIds.has(ruleId) || typeof note !== 'string');
  return invalid ? `Import failed because reviewer note "${invalid[0]}" is unknown or invalid.` : '';
}
function isCompatibleRuleSchemaVersion(savedRuleSchemaVersion, currentRuleSchemaVersion, compatibleRuleSchemaVersions) {
  const compatibleVersions = Array.isArray(compatibleRuleSchemaVersions) ? compatibleRuleSchemaVersions : [currentRuleSchemaVersion];
  return Number.isInteger(currentRuleSchemaVersion) && Number.isInteger(savedRuleSchemaVersion) && compatibleVersions.includes(savedRuleSchemaVersion);
}
function sanitizeRuleStatuses(ruleStatuses, validRuleIds, validStatuses) {
  if (!isPlainObject(ruleStatuses)) return {};
  return Object.fromEntries(Object.entries(ruleStatuses).filter(([ruleId, status]) => validRuleIds.has(ruleId) && validStatuses.has(status)));
}
function sanitizeRuleNotes(ruleNotes, validRuleIds) {
  if (!isPlainObject(ruleNotes)) return {};
  return Object.fromEntries(Object.entries(ruleNotes).filter(([ruleId, note]) => validRuleIds.has(ruleId) && typeof note === 'string').map(([ruleId, note]) => [ruleId, normalizeNote(note)]).filter(([, note]) => note.length > 0));
}
function normalizeNote(note) { return note.replace(/\u0000/g, '').slice(0, NOTE_MAX_LENGTH); }
function isPlainObject(value) { return Boolean(value) && typeof value === 'object' && !Array.isArray(value); }
