import assert from 'node:assert/strict';
import test from 'node:test';
import { buildManualAuditReportData } from '../assets/js/reportData.js';
import { MACHINE_READABLE_REPORT_SCHEMA_VERSION, createMachineReadableReport, downloadMachineReadableReport, getMachineReadableStablePayload, normalizeMachineReadableFilename, stringifyMachineReadableReport, validateMachineReadableReport } from '../assets/js/machineReadableReport.js';

const input = {
  preset: { id: 'landing', name: ' Landing\npage ' }, rulePack: { id: 'all', name: 'All' }, severityProfile: { id: 'baseline', name: 'Baseline', severityMultipliers: { low: 1, medium: 1, high: 1 } },
  categories: ['Beta', 'Alpha'], rules: [
    { id: 'b', title: 'Beta', description: 'Beta desc', category: 'Beta', severity: 'high' },
    { id: 'a', title: 'Alpha', description: 'Alpha desc', category: 'Alpha', severity: 'low' }
  ], statuses: { b: 'needs-work', a: 'pass', analyzer: 'needs-work' }, ruleNotes: { b: ' note\r\n next ', preview: 'ignore' }, metadata: { projectName: ' Project\nName ', unknown: 'ignore' },
  analyzerFindings: [{ issueId: 'html:x' }], previewState: { html: '<main>secret</main>' }, storage: { indexedDB: true }, aiSummary: { summary: 'AI secret' }, rawHtml: '<input>', rawCss: 'body {}'
};
function report() { return buildManualAuditReportData(input); }

test('creates a valid, deterministic, manual-only machine-readable report', () => {
  const before = structuredClone(input);
  const first = createMachineReadableReport(report(), { generatedAt: '2026-01-01T00:00:00.000Z' });
  const second = createMachineReadableReport(buildManualAuditReportData(structuredClone(input)), { generatedAt: '2027-02-02T00:00:00.000Z' });
  assert.equal(first.metadata.schemaVersion, MACHINE_READABLE_REPORT_SCHEMA_VERSION);
  assert.deepEqual(getMachineReadableStablePayload(first), getMachineReadableStablePayload(second));
  assert.deepEqual(first.categories.map((item) => item.categoryId), ['alpha', 'beta']);
  assert.deepEqual(first.findings.map((item) => item.issueId), ['manual:b']);
  assert.equal(first.findings[0].reviewerNote, 'note\nnext');
  assert.equal(first.scores.needsWorkRules, 1);
  assert.equal(first.recommendations[0].issueId, 'manual:b');
  assert.deepEqual(input, before);
  const serialized = stringifyMachineReadableReport(first);
  assert.doesNotMatch(serialized, /html:x|AI secret|<main>|rawHtml|rawCss|indexedDB|preview|analyzer/i);
});

test('validates schema shape and rejects unsupported versions or unknown fields', () => {
  const value = createMachineReadableReport(report(), { generatedAt: '2026-01-01T00:00:00.000Z' });
  assert.equal(validateMachineReadableReport(value), true);
  assert.throws(() => validateMachineReadableReport({ ...value, unknown: true }));
  assert.throws(() => validateMachineReadableReport({ ...value, metadata: { ...value.metadata, schemaVersion: 99 } }));
  assert.throws(() => validateMachineReadableReport({ ...value, findings: [...value.findings, value.findings[0]] }));
});

test('normalizes safe local filenames and handles unavailable or failed download APIs', () => {
  assert.equal(normalizeMachineReadableFilename(' My / audit <> '), 'my-audit.json');
  const value = createMachineReadableReport(report(), { generatedAt: '2026-01-01T00:00:00.000Z' });
  assert.deepEqual(downloadMachineReadableReport(value, { documentRef: null }), { ok: false, reason: 'unavailable' });
  assert.deepEqual(downloadMachineReadableReport(value, { documentRef: { createElement() {}, body: { append() {} } }, URLRef: { createObjectURL() { throw new Error('no'); }, revokeObjectURL() {} }, BlobRef: Blob }), { ok: false, reason: 'failed' });
});
