import { AUDIT_SCHEMA_ID, AUDIT_SCHEMA_VERSION, createManualAuditSnapshot, parseImportedAuditState } from './auditStorage.js';

export const SAVED_PROJECT_SCHEMA_VERSION = 1;
export const MAX_PROJECT_NAME_LENGTH = 80;
export const PROJECT_METADATA_FIELDS = Object.freeze(['owner', 'projectType', 'targetUrl', 'reviewDate']);

export function normalizeProjectName(name) {
  return String(name ?? '').replace(/\s+/g, ' ').trim().slice(0, MAX_PROJECT_NAME_LENGTH);
}

export function createSavedProjectRecord({ id, name, metadata, auditState, now = new Date().toISOString(), uuidFactory = defaultUuid } = {}) {
  const normalizedName = normalizeProjectName(name);
  if (!normalizedName) throw new Error('Project name is required.');
  const projectId = normalizeProjectId(id) || uuidFactory();
  if (!projectId) throw new Error('Project id is required.');
  return {
    id: projectId,
    schemaVersion: SAVED_PROJECT_SCHEMA_VERSION,
    name: normalizedName,
    createdAt: now,
    updatedAt: now,
    metadata: normalizeProjectMetadata(metadata),
    auditState: cloneManualAuditSnapshot(auditState)
  };
}

export function updateSavedProjectRecord(existingRecord, { name, metadata, auditState, now = new Date().toISOString() } = {}) {
  const normalized = validateSavedProjectRecord(existingRecord);
  const normalizedName = name === undefined ? normalized.name : normalizeProjectName(name);
  if (!normalizedName) throw new Error('Project name is required.');
  return {
    ...normalized,
    name: normalizedName,
    updatedAt: now,
    metadata: metadata === undefined ? normalized.metadata : normalizeProjectMetadata(metadata),
    auditState: cloneManualAuditSnapshot(auditState ?? normalized.auditState)
  };
}

export function validateSavedProjectRecord(record) {
  if (!isPlainObject(record)) throw new Error('Saved project record is malformed.');
  if (record.schemaVersion !== SAVED_PROJECT_SCHEMA_VERSION) throw new Error('Saved project record version is unsupported.');
  const name = normalizeProjectName(record.name);
  if (!name) throw new Error('Project name is required.');
  const id = normalizeProjectId(record.id);
  if (!id) throw new Error('Project id is required.');
  if (!isIsoLike(record.createdAt) || !isIsoLike(record.updatedAt)) throw new Error('Saved project timestamps are malformed.');
  return { id, schemaVersion: SAVED_PROJECT_SCHEMA_VERSION, name, createdAt: record.createdAt, updatedAt: record.updatedAt, metadata: normalizeProjectMetadata(record.metadata), auditState: cloneManualAuditSnapshot(record.auditState) };
}

export function sortSavedProjectRecords(records) {
  return [...records].map(validateSavedProjectRecord).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
}

export function createAuditStateForSavedProject({ selectedPresetId, selectedRulePackId, selectedSeverityProfileId, ruleStatuses, ruleNotes = {}, ruleSchemaVersion }) {
  return createManualAuditSnapshot({ selectedPresetId, selectedRulePackId, selectedSeverityProfileId, ruleStatuses, ruleNotes, ruleSchemaVersion });
}

export function normalizeSavedProjectAuditState(auditState, validationOptions) {
  if (!isPlainObject(auditState)) return { state: null, status: 'invalid', message: 'Saved project audit state is malformed.' };
  const result = parseImportedAuditState(JSON.stringify({
    schema: { id: auditState.schemaId || AUDIT_SCHEMA_ID, version: auditState.schemaVersion || AUDIT_SCHEMA_VERSION, ruleSchemaVersion: auditState.ruleSchemaVersion },
    audit: {
      selectedPresetId: auditState.selectedPresetId,
      selectedRulePackId: auditState.selectedRulePackId,
      selectedSeverityProfileId: auditState.selectedSeverityProfileId,
      ruleStatuses: auditState.ruleStatuses,
      ruleNotes: auditState.ruleNotes
    }
  }), validationOptions);
  if (!result.state) return { ...result, message: result.message || 'Saved project audit state is incompatible with this version of Layout Lens.' };
  return result;
}

export function normalizeProjectMetadata(metadata = {}) {
  const input = isPlainObject(metadata) ? metadata : {};
  return {
    owner: normalizeMetadataText(input.owner),
    projectType: normalizeMetadataText(input.projectType),
    targetUrl: normalizeMetadataText(input.targetUrl),
    reviewDate: normalizeReviewDate(input.reviewDate)
  };
}

function normalizeMetadataText(value) {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
}

function normalizeReviewDate(value) {
  const normalized = normalizeMetadataText(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) return '';
  const date = new Date(`${normalized}T00:00:00.000Z`);
  return date.getUTCFullYear() === Number(normalized.slice(0, 4)) && date.getUTCMonth() + 1 === Number(normalized.slice(5, 7)) && date.getUTCDate() === Number(normalized.slice(8, 10)) ? normalized : '';
}

function cloneManualAuditSnapshot(auditState) {
  if (!isPlainObject(auditState)) throw new Error('Saved project audit state is malformed.');
  return {
    schemaId: auditState.schemaId || AUDIT_SCHEMA_ID,
    schemaVersion: auditState.schemaVersion || AUDIT_SCHEMA_VERSION,
    ruleSchemaVersion: auditState.ruleSchemaVersion,
    selectedPresetId: auditState.selectedPresetId ?? null,
    selectedRulePackId: auditState.selectedRulePackId ?? null,
    selectedSeverityProfileId: auditState.selectedSeverityProfileId ?? null,
    ruleStatuses: isPlainObject(auditState.ruleStatuses) ? { ...auditState.ruleStatuses } : {},
    ruleNotes: isPlainObject(auditState.ruleNotes) ? { ...auditState.ruleNotes } : {}
  };
}

function normalizeProjectId(id) { return typeof id === 'string' ? id.trim() : ''; }
function isIsoLike(value) { return typeof value === 'string' && !Number.isNaN(Date.parse(value)); }
function isPlainObject(value) { return Boolean(value) && typeof value === 'object' && !Array.isArray(value); }
function defaultUuid() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `project-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
