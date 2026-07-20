import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeInspectionSnapshot, createStaticAnalyzerInput, normalizeInspectionSnapshot } from '../assets/js/inspectionSnapshot.js';
import { adaptManualAuditReport } from '../assets/js/reportAdapter.js';

const parser = { parseFromString: () => ({ querySelectorAll: () => [], getElementById: () => null }) };
const snapshot = () => ({ schemaVersion: 1, inspectionId: 'inspection-001', scope: { kind: 'selected-region', label: 'Header' }, html: '<main><h1>Title</h1></main>', css: '.card { width: 720px; }', computedStyleFacts: [{ name: 'display', value: 'grid' }], viewport: { width: 1280, height: 800, devicePixelRatio: 1 }, semanticMetadata: [{ name: 'landmarks', value: 'main' }], layoutMetadata: [{ name: 'overflowX', value: 'visible' }], collectedAt: '2026-07-20T12:00:00.000Z', limitations: ['Cross-origin frames excluded.'] });

test('inspection snapshot normalization is deterministic, immutable, and preserves static analyzer inputs', () => {
  const input = snapshot(); const before = structuredClone(input);
  const first = normalizeInspectionSnapshot(input); const second = normalizeInspectionSnapshot(snapshot());
  assert.equal(first.ok, true); assert.deepEqual(first.snapshot, second.snapshot); assert.deepEqual(input, before); assert.equal(Object.isFrozen(first.snapshot), true);
  const adapted = createStaticAnalyzerInput(input);
  assert.deepEqual(adapted.input, { inspectionId: 'inspection-001', html: input.html, css: input.css });
});

test('inspection snapshot rejects sensitive and unsupported collection fields', () => {
  for (const patch of [{ cookies: 'no' }, { localStorage: {} }, { scope: { kind: 'page', selector: '#private' } }, { computedStyleFacts: [{ name: 'password', value: 'secret' }] }]) {
    const result = normalizeInspectionSnapshot({ ...snapshot(), ...patch });
    assert.equal(result.ok, false);
  }
});

test('unchanged analyzers preserve stable source IDs and evidence while manual reports remain manual-only', () => {
  const result = analyzeInspectionSnapshot(snapshot(), { htmlParser: parser });
  assert.equal(result.ok, true); assert.equal(result.css.findings[0].issueId, 'css-analyzer:large-fixed-widths');
  assert.equal(result.css.findings[0].source, 'css-analyzer'); assert.ok(result.css.findings[0].evidence.snippet);
  const report = adaptManualAuditReport({ rules: [{ id: 'manual-rule', category: 'Layout', title: 'Manual', description: 'Manual', severity: 'high' }], statuses: { 'manual-rule': 'needs-work' } });
  assert.deepEqual(report.findings.map((finding) => finding.issueId), ['manual:manual-rule']);
  assert.equal(JSON.stringify(report).includes('css-analyzer'), false);
});
