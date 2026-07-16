import assert from 'node:assert/strict';
import { AUDIT_PRODUCT_ID, AUDIT_SCHEMA_ID, AUDIT_SCHEMA_VERSION, createAuditStateExport, parseImportedAuditState, stringifyAuditStateExport } from '../assets/js/auditStorage.js';

const options = {
  validPresetIds: new Set(['landing-page', 'dashboard']),
  validRuleIds: new Set(['layout-landmarks', 'content-actions']),
  validStatuses: new Set(['not-checked', 'pass', 'needs-work', 'not-applicable']),
  validRulePackIds: new Set(['all-rules', 'marketing-pages']),
  validSeverityProfileIds: new Set(['baseline', 'premium']),
  currentRuleSchemaVersion: 2,
  compatibleRuleSchemaVersions: [1, 2]
};

const exported = createAuditStateExport({
  selectedPresetId: 'dashboard',
  selectedRulePackId: 'marketing-pages',
  selectedSeverityProfileId: 'premium',
  ruleSchemaVersion: 2,
  ruleStatuses: { 'layout-landmarks': 'pass', 'content-actions': 'needs-work' },
  ruleNotes: { 'content-actions': 'Keep labels direct. <b>plain text</b>' }
});

assert.equal(exported.schema.id, AUDIT_SCHEMA_ID);
assert.equal(exported.schema.version, AUDIT_SCHEMA_VERSION);
assert.equal(exported.metadata.productId, AUDIT_PRODUCT_ID);
assert.match(stringifyAuditStateExport(exported), /\n  "audit": \{/);

const roundTrip = parseImportedAuditState(stringifyAuditStateExport(exported), options);
assert.equal(roundTrip.status, 'loaded');
assert.deepEqual(roundTrip.state.ruleStatuses, { 'layout-landmarks': 'pass', 'content-actions': 'needs-work' });
assert.deepEqual(roundTrip.state.ruleNotes, { 'content-actions': 'Keep labels direct. <b>plain text</b>' });
assert.equal(roundTrip.state.selectedPresetId, 'dashboard');
assert.equal(roundTrip.state.selectedRulePackId, 'marketing-pages');
assert.equal(roundTrip.state.selectedSeverityProfileId, 'premium');

assert.equal(parseImportedAuditState('{bad json', options).status, 'invalid-json');
assert.equal(parseImportedAuditState(JSON.stringify({ schema: { id: AUDIT_SCHEMA_ID, version: 99, ruleSchemaVersion: 2 }, audit: { ruleStatuses: {} } }), options).status, 'future-version');
assert.equal(parseImportedAuditState(JSON.stringify({ hello: 'world' }), options).status, 'unrelated');
assert.equal(parseImportedAuditState(JSON.stringify({ schema: { id: AUDIT_SCHEMA_ID, version: 2, ruleSchemaVersion: 2 }, audit: { selectedPresetId: 'missing', ruleStatuses: {} } }), options).status, 'invalid-reference');
assert.equal(parseImportedAuditState(JSON.stringify({ schema: { id: AUDIT_SCHEMA_ID, version: 2, ruleSchemaVersion: 2 }, audit: { ruleStatuses: { 'layout-landmarks': 'bad' } } }), options).status, 'invalid-status');
assert.equal(parseImportedAuditState(JSON.stringify({ schemaVersion: 1, ruleSchemaVersion: 1, selectedPresetId: 'landing-page', ruleStatuses: { 'layout-landmarks': 'pass' } }), options).status, 'loaded');

assert.equal(Object.hasOwn(exported.metadata, 'owner'), false);
assert.equal(Object.hasOwn(exported.metadata, 'projectType'), false);
assert.equal(Object.hasOwn(exported.metadata, 'targetUrl'), false);
assert.equal(Object.hasOwn(exported.metadata, 'reviewDate'), false);
