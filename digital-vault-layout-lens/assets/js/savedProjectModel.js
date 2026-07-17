import { AUDIT_SCHEMA_ID, AUDIT_SCHEMA_VERSION, createManualAuditSnapshot, parseImportedAuditState } from './auditStorage.js';

export const SAVED_PROJECT_SCHEMA_VERSION = 1;
export const MAX_PROJECT_NAME_LENGTH = 80;
export const PROJECT_METADATA_FIELDS = Object.freeze(['owner', 'projectType', 'targetUrl', 'reviewDate']);
export const MAX_VERSION_LABEL_LENGTH = 48;

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
    auditState: cloneManualAuditSnapshot(auditState),
    auditVersions: []
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
    auditState: cloneManualAuditSnapshot(auditState ?? normalized.auditState),
    auditVersions: normalized.auditVersions
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
  return { id, schemaVersion: SAVED_PROJECT_SCHEMA_VERSION, name, createdAt: record.createdAt, updatedAt: record.updatedAt, metadata: normalizeProjectMetadata(record.metadata), auditState: cloneManualAuditSnapshot(record.auditState), auditVersions: normalizeAuditVersions(record.auditVersions) };
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


export function normalizeVersionLabel(label, fallback = 'Audit pass') {
  const normalized = String(label ?? '').replace(/\s+/g, ' ').trim().slice(0, MAX_VERSION_LABEL_LENGTH);
  return normalized || fallback;
}

export function createAuditVersionRecord({ id, label, auditState, reviewDate = '', now = new Date().toISOString(), uuidFactory = defaultUuid, passNumber } = {}) {
  const versionId = normalizeProjectId(id) || uuidFactory();
  if (!versionId) throw new Error('Audit version id is required.');
  if (!isPlainObject(auditState)) throw new Error('Audit version audit state is malformed.');
  return Object.freeze({
    id: versionId,
    label: normalizeVersionLabel(label, `Audit pass ${passNumber || 1}`),
    createdAt: now,
    reviewDate: normalizeReviewDate(reviewDate),
    auditState: deepFreeze(cloneManualAuditSnapshot(auditState))
  });
}

export function addAuditVersionToProject(existingRecord, { label, auditState, reviewDate, now = new Date().toISOString(), uuidFactory = defaultUuid } = {}) {
  const normalized = validateSavedProjectRecord(existingRecord);
  const version = createAuditVersionRecord({ label, auditState: auditState ?? normalized.auditState, reviewDate: reviewDate ?? normalized.metadata.reviewDate, now, uuidFactory, passNumber: normalized.auditVersions.length + 1 });
  return { ...normalized, updatedAt: now, auditVersions: sortAuditVersions([version, ...normalized.auditVersions]) };
}

export function restoreAuditVersion(version) {
  const normalized = normalizeAuditVersion(version);
  return cloneManualAuditSnapshot(normalized.auditState);
}

export function startNewImprovementPass(sourceAuditState, { id, label, reviewDate = '', now = new Date().toISOString(), uuidFactory = defaultUuid } = {}) {
  const auditState = cloneManualAuditSnapshot(sourceAuditState);
  return { auditState, version: createAuditVersionRecord({ id, label, auditState, reviewDate, now, uuidFactory }) };
}

export function duplicateSavedProjectRecord(existingRecord, { id, name, now = new Date().toISOString(), uuidFactory = defaultUuid } = {}) {
  const normalized = validateSavedProjectRecord(existingRecord);
  return createSavedProjectRecord({
    id: normalizeProjectId(id) || uuidFactory(),
    name: name ?? `${normalized.name} — Copy`,
    metadata: normalized.metadata,
    auditState: normalized.auditState,
    now,
    uuidFactory
  });
}

function normalizeAuditVersions(versions) {
  return sortAuditVersions(Array.isArray(versions) ? versions.map(normalizeAuditVersion).filter(Boolean) : []);
}

function normalizeAuditVersion(version) {
  if (!isPlainObject(version)) return null;
  const id = normalizeProjectId(version.id);
  if (!id || !isIsoLike(version.createdAt)) return null;
  return Object.freeze({ id, label: normalizeVersionLabel(version.label, 'Audit pass'), createdAt: version.createdAt, reviewDate: normalizeReviewDate(version.reviewDate), auditState: deepFreeze(cloneManualAuditSnapshot(version.auditState)) });
}

function sortAuditVersions(versions) {
  return [...versions].sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id.localeCompare(a.id));
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

function deepFreeze(value) { if (!isPlainObject(value)) return value; Object.freeze(value); Object.values(value).forEach((child) => { if (isPlainObject(child)) deepFreeze(child); }); return value; }
