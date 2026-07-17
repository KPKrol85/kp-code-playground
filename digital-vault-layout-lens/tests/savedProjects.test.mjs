import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { auditRules, RULE_SCHEMA_VERSION } from '../assets/js/auditRules.js';
import { ALL_RULES_PACK_ID } from '../assets/js/rulePacks.js';
import { DEFAULT_SEVERITY_PROFILE_ID, resolveSeverityProfile } from '../assets/js/severityProfiles.js';
import { calculateAuditScore } from '../assets/js/scoringEngine.js';
import { generateRecommendations } from '../assets/js/recommendations.js';
import { addAuditVersionToProject, createAuditStateForSavedProject, createAuditVersionRecord, createSavedProjectRecord, duplicateSavedProjectRecord, MAX_PROJECT_NAME_LENGTH, normalizeProjectMetadata, normalizeProjectName, normalizeSavedProjectAuditState, restoreAuditVersion, SAVED_PROJECT_SCHEMA_VERSION, sortSavedProjectRecords, startNewImprovementPass, updateSavedProjectRecord, validateSavedProjectRecord } from '../assets/js/savedProjectModel.js';
import { SAVED_PROJECT_DB_NAME, SAVED_PROJECT_DB_VERSION, SAVED_PROJECT_STORE_NAME } from '../assets/js/savedProjectsDb.js';

const validOptions = {
  validPresetIds: new Set(['landing-page']),
  validRuleIds: new Set(auditRules.map((rule) => rule.id)),
  validStatuses: new Set(['not-checked', 'pass', 'needs-work', 'not-applicable']),
  validRulePackIds: new Set([ALL_RULES_PACK_ID]),
  validSeverityProfileIds: new Set([DEFAULT_SEVERITY_PROFILE_ID]),
  currentRuleSchemaVersion: RULE_SCHEMA_VERSION,
  compatibleRuleSchemaVersions: [RULE_SCHEMA_VERSION]
};
const firstRule = auditRules[0].id;
const secondRule = auditRules[1].id;
const auditState = createAuditStateForSavedProject({
  selectedPresetId: 'landing-page',
  selectedRulePackId: ALL_RULES_PACK_ID,
  selectedSeverityProfileId: DEFAULT_SEVERITY_PROFILE_ID,
  ruleSchemaVersion: RULE_SCHEMA_VERSION,
  ruleStatuses: { [firstRule]: 'pass', [secondRule]: 'needs-work' },
  ruleNotes: { [secondRule]: 'Needs clearer affordance.' }
});

test('saved project record creation normalizes model fields without mutating audit state', () => {
  const source = structuredClone(auditState);
  const record = createSavedProjectRecord({ id: 'stable-id', name: '  Checkout   audit  ', auditState: source, now: '2026-07-16T10:00:00.000Z' });
  assert.equal(record.id, 'stable-id');
  assert.equal(record.schemaVersion, SAVED_PROJECT_SCHEMA_VERSION);
  assert.equal(record.name, 'Checkout audit');
  assert.equal(record.createdAt, '2026-07-16T10:00:00.000Z');
  assert.equal(record.updatedAt, record.createdAt);
  assert.deepEqual(record.metadata, { owner: '', projectType: '', targetUrl: '', reviewDate: '' });
  assert.deepEqual(source, auditState);
  source.ruleStatuses[firstRule] = 'not-checked';
  assert.equal(record.auditState.ruleStatuses[firstRule], 'pass');
});


test('project metadata normalizes strings, malformed input, and review dates', () => {
  assert.deepEqual(normalizeProjectMetadata({ owner: '  KP   Code ', projectType: ' Web app ', targetUrl: ' https://example.test/a?b=1 ', reviewDate: '2026-07-16' }), { owner: 'KP Code', projectType: 'Web app', targetUrl: 'https://example.test/a?b=1', reviewDate: '2026-07-16' });
  assert.deepEqual(normalizeProjectMetadata({ owner: 7, projectType: null, targetUrl: { href: 'x' }, reviewDate: '2026-02-30' }), { owner: '', projectType: '', targetUrl: '', reviewDate: '' });
  assert.equal(normalizeProjectMetadata({ reviewDate: '07/16/2026' }).reviewDate, '');
  assert.equal(normalizeProjectMetadata(null).reviewDate, '');
});

test('saved project creation, update, opening, and legacy records normalize metadata while preset stays canonical in audit state', () => {
  const created = createSavedProjectRecord({ id: 'with-metadata', name: 'Metadata', metadata: { owner: ' Ada ', projectType: ' SaaS ', targetUrl: 'example.test', reviewDate: '2026-07-16', selectedPresetId: 'duplicate' }, auditState });
  assert.deepEqual(created.metadata, { owner: 'Ada', projectType: 'SaaS', targetUrl: 'example.test', reviewDate: '2026-07-16' });
  assert.equal(created.auditState.selectedPresetId, 'landing-page');
  assert.equal(Object.hasOwn(created.metadata, 'selectedPresetId'), false);

  const updated = updateSavedProjectRecord(created, { metadata: { owner: ' Grace ', reviewDate: 'bad' }, auditState: { ...auditState, selectedPresetId: 'landing-page' }, now: '2026-07-16T12:00:00.000Z' });
  assert.deepEqual(updated.metadata, { owner: 'Grace', projectType: '', targetUrl: '', reviewDate: '' });
  assert.equal(updated.auditState.selectedPresetId, 'landing-page');

  const legacy = validateSavedProjectRecord({ ...created, metadata: undefined });
  assert.deepEqual(legacy.metadata, { owner: '', projectType: '', targetUrl: '', reviewDate: '' });
  assert.equal(normalizeSavedProjectAuditState(legacy.auditState, validOptions).status, 'loaded');
});

test('saved project names are required and capped', () => {
  assert.equal(normalizeProjectName('  A   B  '), 'A B');
  assert.equal(normalizeProjectName('x'.repeat(MAX_PROJECT_NAME_LENGTH + 5)).length, MAX_PROJECT_NAME_LENGTH);
  assert.throws(() => createSavedProjectRecord({ name: '   ', auditState }), /required/);
});

test('update keeps createdAt stable and advances updatedAt only in returned record', () => {
  const record = createSavedProjectRecord({ id: 'stable-id', name: 'Original', auditState, now: '2026-07-16T10:00:00.000Z' });
  const updated = updateSavedProjectRecord(record, { auditState: { ...auditState, ruleNotes: {} }, now: '2026-07-16T11:00:00.000Z' });
  assert.equal(updated.createdAt, record.createdAt);
  assert.equal(updated.updatedAt, '2026-07-16T11:00:00.000Z');
  assert.equal(record.updatedAt, '2026-07-16T10:00:00.000Z');
});

test('stored audit state includes only manual audit contract data', () => {
  const noisy = { ...auditState, metadata: { owner: 'not audit state' }, analyzerInput: '<button>x</button>', analyzerFindings: [{ id: 'html' }], preview: { annotations: [] }, reportMetadata: { projectName: 'x' }, reportTemplateId: 'client', filters: { status: 'pass' }, score: { scorePercent: 100 }, recommendations: [{ id: 'fake' }] };
  const record = createSavedProjectRecord({ name: 'Boundary', auditState: noisy });
  assert.equal(record.auditState.selectedPresetId, 'landing-page');
  assert.equal(record.auditState.selectedRulePackId, ALL_RULES_PACK_ID);
  assert.equal(record.auditState.selectedSeverityProfileId, DEFAULT_SEVERITY_PROFILE_ID);
  assert.equal(record.auditState.ruleStatuses[firstRule], 'pass');
  assert.equal(record.auditState.ruleNotes[secondRule], 'Needs clearer affordance.');
  assert.equal(record.auditState.ruleSchemaVersion, RULE_SCHEMA_VERSION);
  for (const excluded of ['metadata', 'analyzerInput', 'analyzerFindings', 'preview', 'reportMetadata', 'reportTemplateId', 'filters', 'score', 'recommendations']) assert.equal(Object.hasOwn(record.auditState, excluded), false);
});

test('records sort deterministically by updatedAt, name, then id', () => {
  const records = [
    createSavedProjectRecord({ id: 'b', name: 'Beta', auditState, now: '2026-07-16T10:00:00.000Z' }),
    createSavedProjectRecord({ id: 'a', name: 'Alpha', auditState, now: '2026-07-16T10:00:00.000Z' }),
    createSavedProjectRecord({ id: 'c', name: 'Current', auditState, now: '2026-07-16T12:00:00.000Z' })
  ];
  assert.deepEqual(sortSavedProjectRecords(records).map((record) => record.id), ['c', 'a', 'b']);
});

test('restore accepts valid projects and rejects malformed, future, and incompatible records without mutating current state', () => {
  const current = { selectedPresetId: 'landing-page', ruleStatuses: { [firstRule]: 'not-checked' } };
  const restored = normalizeSavedProjectAuditState(auditState, validOptions);
  assert.equal(restored.status, 'loaded');
  assert.equal(restored.state.ruleStatuses[firstRule], 'pass');
  assert.deepEqual(current, { selectedPresetId: 'landing-page', ruleStatuses: { [firstRule]: 'not-checked' } });
  assert.throws(() => validateSavedProjectRecord({ ...createSavedProjectRecord({ name: 'Bad', auditState }), schemaVersion: 99 }), /unsupported/);
  assert.equal(normalizeSavedProjectAuditState(null, validOptions).status, 'invalid');
  assert.equal(normalizeSavedProjectAuditState({ ...auditState, ruleSchemaVersion: 999 }, validOptions).status, 'schema-mismatch');
});

test('restored state feeds deterministic scoring and recommendations', () => {
  const restored = normalizeSavedProjectAuditState(auditState, validOptions).state;
  const profile = resolveSeverityProfile(restored.selectedSeverityProfileId);
  const score = calculateAuditScore(auditRules, { ...Object.fromEntries(auditRules.map((rule) => [rule.id, 'not-checked'])), ...restored.ruleStatuses }, profile);
  const recommendations = generateRecommendations(auditRules, restored.ruleStatuses, profile);
  assert.equal(score.passedRules, 1);
  const metadataScore = calculateAuditScore(auditRules, restored.ruleStatuses, profile);
  assert.deepEqual(calculateAuditScore(auditRules, restored.ruleStatuses, profile), metadataScore);
  assert.equal(score.needsWorkRules, 1);
  assert.ok(recommendations.length >= 1);
});



test('audit versions are deterministic, unique, immutable, newest first, and preserve manual-only boundaries', () => {
  const first = createAuditVersionRecord({ id: 'v1', label: '  Baseline   pass  ', auditState: { ...auditState, analyzerFindings: ['no'] }, reviewDate: '2026-07-16', now: '2026-07-16T10:00:00.000Z' });
  const second = createAuditVersionRecord({ id: 'v2', label: '', auditState, now: '2026-07-16T11:00:00.000Z' });
  assert.equal(first.label, 'Baseline pass');
  assert.equal(second.label, 'Audit pass 1');
  assert.notEqual(first.id, second.id);
  assert.equal(first.reviewDate, '2026-07-16');
  assert.equal(Object.hasOwn(first.auditState, 'analyzerFindings'), false);
  const project = addAuditVersionToProject(createSavedProjectRecord({ id: 'p1', name: 'History', auditState }), { label: 'Later', now: '2026-07-16T12:00:00.000Z' });
  assert.equal(project.auditVersions.length, 1);
  assert.equal(project.auditVersions[0].label, 'Later');
  assert.throws(() => { project.auditVersions[0].auditState.ruleStatuses[firstRule] = 'needs-work'; }, TypeError);
});

test('restoring a version deep-copies without mutating stored snapshot', () => {
  const version = createAuditVersionRecord({ id: 'v-restore', label: 'Restore me', auditState });
  const restored = restoreAuditVersion(version);
  restored.ruleStatuses[firstRule] = 'needs-work';
  restored.ruleNotes[secondRule] = 'Changed after restore';
  assert.equal(version.auditState.ruleStatuses[firstRule], 'pass');
  assert.equal(version.auditState.ruleNotes[secondRule], 'Needs clearer affordance.');
});

test('legacy project records without history open safely with an empty version list', () => {
  const legacy = validateSavedProjectRecord({ ...createSavedProjectRecord({ id: 'legacy', name: 'Legacy', auditState }), auditVersions: undefined });
  assert.deepEqual(legacy.auditVersions, []);
  assert.equal(normalizeSavedProjectAuditState(legacy.auditState, validOptions).status, 'loaded');
});

test('starting a new improvement pass deep-copies selected audit state and creates a fresh version shell', () => {
  let count = 0;
  const pass = startNewImprovementPass(auditState, { uuidFactory: () => `pass-${++count}`, now: '2026-07-17T09:00:00.000Z', reviewDate: '2026-07-17' });
  assert.equal(pass.version.id, 'pass-1');
  assert.equal(pass.version.createdAt, '2026-07-17T09:00:00.000Z');
  pass.auditState.ruleStatuses[firstRule] = 'needs-work';
  assert.equal(auditState.ruleStatuses[firstRule], 'pass');
  assert.equal(pass.version.auditState.ruleStatuses[firstRule], 'pass');
});

test('duplicate project replaces id and timestamps, copies metadata/current audit, clears history, and does not share nested references', () => {
  const original = addAuditVersionToProject(createSavedProjectRecord({ id: 'original', name: 'Original', metadata: { owner: 'Ada', projectType: 'App', targetUrl: 'https://example.test', reviewDate: '2026-07-16' }, auditState, now: '2026-07-16T10:00:00.000Z' }), { label: 'Baseline', now: '2026-07-16T11:00:00.000Z' });
  const duplicate = duplicateSavedProjectRecord(original, { id: 'copy', now: '2026-07-17T12:00:00.000Z' });
  assert.equal(duplicate.id, 'copy');
  assert.equal(duplicate.name, 'Original — Copy');
  assert.equal(duplicate.createdAt, '2026-07-17T12:00:00.000Z');
  assert.equal(duplicate.updatedAt, '2026-07-17T12:00:00.000Z');
  assert.deepEqual(duplicate.metadata, original.metadata);
  assert.deepEqual(duplicate.auditState, original.auditState);
  assert.deepEqual(duplicate.auditVersions, []);
  duplicate.auditState.ruleStatuses[firstRule] = 'not-checked';
  duplicate.metadata.owner = 'Grace';
  assert.equal(original.auditState.ruleStatuses[firstRule], 'pass');
  assert.equal(original.metadata.owner, 'Ada');
  assert.equal(original.id, 'original');
  assert.equal(original.auditVersions.length, 1);
});

test('IndexedDB constants and source boundaries stay focused', () => {
  assert.equal(SAVED_PROJECT_DB_NAME, 'kp-layout-lens-projects');
  assert.equal(SAVED_PROJECT_DB_VERSION, 1);
  assert.equal(SAVED_PROJECT_STORE_NAME, 'audit-projects');
  const idbModule = readFileSync(new URL('../assets/js/savedProjectsDb.js', import.meta.url), 'utf8');
  const app = readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
  for (const file of ['reportData.js', 'reportAdapter.js', 'markdownReport.js', 'reportRenderer.js', 'scoringEngine.js', 'recommendations.js']) {
    const source = readFileSync(new URL(`../assets/js/${file}`, import.meta.url), 'utf8');
    assert.equal(source.includes('savedProjectsDb'), false, `${file} must not import IndexedDB persistence`);
  }
  assert.equal(idbModule.includes('document.'), false);
  assert.equal(idbModule.includes('querySelector'), false);
  assert.equal((app.match(/indexedDB/g) || []).length, 0);
});
