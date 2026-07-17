import { AUDIT_SCHEMA_VERSION } from './auditMigrations.js';
import { normalizeAuditState } from './auditStorage.js';

export const SAVED_PROJECT_SCHEMA_VERSION = 4;
const FIRST_VERSION = 0;

export function migrateSavedProjectRecord(record, validationOptions) {
  if (!isPlainObject(record)) throw new Error('Saved project record is malformed.');
  const originalVersion = Number.isInteger(record.schemaVersion) ? record.schemaVersion : FIRST_VERSION;
  if (originalVersion > SAVED_PROJECT_SCHEMA_VERSION) throw new Error('Saved project record version is unsupported.');
  if (originalVersion < FIRST_VERSION) throw new Error('Saved project record version is unsupported.');
  let migrated = cloneProjectCandidate(record);
  for (let version = originalVersion; version < SAVED_PROJECT_SCHEMA_VERSION; version += 1) {
    const migration = PROJECT_MIGRATIONS[version];
    if (!migration) throw new Error('Saved project record version is unsupported.');
    migrated = migration(migrated);
  }
  return migrated;
}

export function migrateProjectAuditSnapshot(auditState, validationOptions) {
  if (!isPlainObject(auditState)) throw new Error('Saved project audit state is malformed.');
  const normalized = normalizeAuditState({ ...auditState, schemaVersion: auditState.schemaVersion || AUDIT_SCHEMA_VERSION }, validationOptions || permissiveAuditOptions(auditState));
  if (!normalized.state) throw new Error(normalized.message || 'Saved project audit state is incompatible.');
  return { schemaId: auditState.schemaId, schemaVersion: AUDIT_SCHEMA_VERSION, ruleSchemaVersion: auditState.ruleSchemaVersion, ...normalized.state };
}

const PROJECT_MIGRATIONS = Object.freeze({
  0: (record) => ({ ...record, schemaVersion: 1, metadata: {} }),
  1: (record) => ({ ...record, schemaVersion: 2, auditVersions: Array.isArray(record.auditVersions) ? record.auditVersions : [] }),
  2: (record) => ({ ...record, schemaVersion: 3, improvementPass: isPlainObject(record.improvementPass) ? { ...record.improvementPass } : null }),
  3: (record) => ({ ...record, schemaVersion: 4, duplicatedFromProjectId: typeof record.duplicatedFromProjectId === 'string' ? record.duplicatedFromProjectId : '' })
});

function permissiveAuditOptions(auditState) {
  const ids = new Set(Object.keys(isPlainObject(auditState.ruleStatuses) ? auditState.ruleStatuses : {}));
  return { validPresetIds: new Set([auditState.selectedPresetId].filter(Boolean)), validRuleIds: ids, validStatuses: new Set(Object.values(isPlainObject(auditState.ruleStatuses) ? auditState.ruleStatuses : {})), validRulePackIds: new Set([auditState.selectedRulePackId].filter(Boolean)), validSeverityProfileIds: new Set([auditState.selectedSeverityProfileId].filter(Boolean)), currentRuleSchemaVersion: auditState.ruleSchemaVersion, compatibleRuleSchemaVersions: [auditState.ruleSchemaVersion] };
}
function cloneProjectCandidate(record) {
  return { ...record, metadata: isPlainObject(record.metadata) ? { ...record.metadata } : record.metadata, auditState: isPlainObject(record.auditState) ? { ...record.auditState, ruleStatuses: isPlainObject(record.auditState.ruleStatuses) ? { ...record.auditState.ruleStatuses } : record.auditState.ruleStatuses, ruleNotes: isPlainObject(record.auditState.ruleNotes) ? { ...record.auditState.ruleNotes } : record.auditState.ruleNotes } : record.auditState, auditVersions: Array.isArray(record.auditVersions) ? record.auditVersions.map((version) => ({ ...version, auditState: isPlainObject(version.auditState) ? { ...version.auditState, ruleStatuses: isPlainObject(version.auditState.ruleStatuses) ? { ...version.auditState.ruleStatuses } : version.auditState.ruleStatuses, ruleNotes: isPlainObject(version.auditState.ruleNotes) ? { ...version.auditState.ruleNotes } : version.auditState.ruleNotes } : version.auditState })) : record.auditVersions };
}
function isPlainObject(value) { return Boolean(value) && typeof value === 'object' && !Array.isArray(value); }
