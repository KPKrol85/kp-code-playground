export const AUDIT_SCHEMA_ID = 'kp-layout-lens-audit-state';
export const AUDIT_PRODUCT_ID = 'kp-code-digital-vault-layout-lens';
export const AUDIT_SCHEMA_VERSION = 2;
const SUPPORTED_AUDIT_SCHEMA_VERSIONS = Object.freeze([1, AUDIT_SCHEMA_VERSION]);

export function migrateStoredAuditState(storedAuditState, validationOptions, { strict = false, normalizeAuditState } = {}) {
  if (typeof normalizeAuditState !== 'function') throw new Error('Audit migration requires a normalizer.');
  if (!isPlainObject(storedAuditState)) return reject('invalid', 'Import failed because the JSON is not an audit state object.');
  if (strict && !storedAuditState.__importEnvelope && !looksLikeLegacyAuditState(storedAuditState)) return reject('unrelated', 'Import failed because the JSON does not look like a Layout Lens audit export.');
  const schemaVersion = storedAuditState.schemaVersion;
  if (!Number.isInteger(schemaVersion)) return reject('invalid', 'Import failed because the audit schema version is missing or malformed.');
  if (schemaVersion > AUDIT_SCHEMA_VERSION) return reject('future-version', 'Import failed because the audit was created by a newer unsupported schema version.');
  if (!SUPPORTED_AUDIT_SCHEMA_VERSIONS.includes(schemaVersion)) return reject('invalid', 'Import failed because the audit schema version is unsupported.');
  let migrated = cloneAuditCandidate(storedAuditState);
  let migratedLegacy = false;
  for (let version = schemaVersion; version < AUDIT_SCHEMA_VERSION; version += 1) {
    const migration = AUDIT_MIGRATIONS[version];
    if (!migration) return reject('invalid', 'Import failed because the audit schema version cannot be migrated.');
    migrated = migration(migrated);
    migratedLegacy = true;
  }
  const normalized = normalizeAuditState(migrated, validationOptions, { strict });
  if (!normalized.state) return normalized;
  return { ...normalized, status: migratedLegacy ? 'migrated' : 'loaded', schemaVersion: AUDIT_SCHEMA_VERSION };
}

const AUDIT_MIGRATIONS = Object.freeze({
  1: (state) => ({ ...cloneAuditCandidate(state), schemaId: state.schemaId || AUDIT_SCHEMA_ID, schemaVersion: 2, selectedRulePackId: state.selectedRulePackId ?? null, selectedSeverityProfileId: state.selectedSeverityProfileId ?? null })
});

function cloneAuditCandidate(state) {
  return { schemaId: state.schemaId, schemaVersion: state.schemaVersion, ruleSchemaVersion: state.ruleSchemaVersion, __importEnvelope: state.__importEnvelope === true, selectedPresetId: state.selectedPresetId ?? null, selectedRulePackId: state.selectedRulePackId ?? null, selectedSeverityProfileId: state.selectedSeverityProfileId ?? null, ruleStatuses: isPlainObject(state.ruleStatuses) ? { ...state.ruleStatuses } : state.ruleStatuses, ruleNotes: isPlainObject(state.ruleNotes) ? { ...state.ruleNotes } : state.ruleNotes };
}
function reject(status, message) { return { state: null, status, message }; }
function isPlainObject(value) { return Boolean(value) && typeof value === 'object' && !Array.isArray(value); }

function looksLikeLegacyAuditState(value) { return isPlainObject(value) && Number.isInteger(value.schemaVersion) && Number.isInteger(value.ruleSchemaVersion) && isPlainObject(value.ruleStatuses); }
