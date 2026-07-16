import assert from 'node:assert/strict';
import test from 'node:test';
import { buildManualAuditReportData } from '../assets/js/reportData.js';
import { serializeManualAuditReportMarkdown } from '../assets/js/markdownReport.js';

const preset = { id: 'landing-page', name: 'Landing page' };
const rulePack = { id: 'all-rules', name: 'All rules' };
const severityProfile = { id: 'baseline', name: 'Baseline', severityMultipliers: { low: 1, medium: 1, high: 1 } };
const rules = [
  { id: 'layout-alpha', title: 'Alpha layout', description: 'Alpha description.', category: 'Layout structure', severity: 'high' },
  { id: 'layout-beta', title: 'Beta layout', description: 'Beta description.', category: 'Layout structure', severity: 'medium' },
  { id: 'content-gamma', title: 'Gamma content', description: 'Gamma description.', category: 'Content clarity', severity: 'low' },
  { id: 'content-delta', title: 'Delta content', description: 'Delta description.', category: 'Content clarity', severity: 'medium' }
];

function build(overrides = {}) {
  return buildManualAuditReportData({ preset, rulePack, severityProfile, categories: ['Layout structure', 'Content clarity'], rules, ...overrides });
}

test('serializes deterministic markdown for identical audit state with score and progress', () => {
  const state = { 'layout-alpha': 'pass', 'layout-beta': 'needs-work', 'content-gamma': 'not-checked', 'content-delta': 'not-applicable' };
  const report = build({ statuses: state });
  const first = serializeManualAuditReportMarkdown(report);
  const second = serializeManualAuditReportMarkdown(build({ statuses: { ...state } }));
  assert.equal(first, second);
  assert.match(first, /Weighted score: 60%/);
  assert.match(first, /Reviewed\/applicable rules: 2 \/ 3/);
  assert.match(first, /Layout structure: 60%; 2 \/ 2 reviewed/);
  assert.match(first, /Content clarity: Not enough checked rules; 0 \/ 1 reviewed/);
});

test('includes needs-work findings with stable IDs, notes, and recommendations only', () => {
  const report = build({
    statuses: { 'layout-alpha': 'needs-work', 'layout-beta': 'pass', 'content-gamma': 'not-checked', 'content-delta': 'not-applicable' },
    ruleNotes: { 'layout-alpha': 'Line one\n## fake heading\n- fake list', 'content-gamma': 'Not part of findings but in notes.' }
  });
  assert.deepEqual(report.findings.map((finding) => finding.issueId), ['manual:layout-alpha']);
  assert.equal(report.findings[0].note, 'Line one\n## fake heading\n- fake list');
  assert.equal(report.notes.length, 2);
  assert.equal(report.recommendations.length, 1);
  const markdown = serializeManualAuditReportMarkdown(report);
  assert.match(markdown, /manual:layout-alpha/);
  assert.match(markdown, /Recommendation:/);
  assert.doesNotMatch(markdown, /manual:content-gamma/);
  assert.doesNotMatch(markdown, /manual:content-delta/);
  assert.match(markdown, /  ## fake heading/);
});

test('emits clear empty states for findings, notes, and recommendations', () => {
  const markdown = serializeManualAuditReportMarkdown(build({ statuses: { 'layout-alpha': 'pass' }, ruleNotes: {} }));
  assert.match(markdown, /No manual findings/);
  assert.match(markdown, /No reviewer notes have been added/);
  assert.match(markdown, /No recommendations/);
});

test('does not mutate supplied audit state and excludes analyzer or preview data', () => {
  const input = {
    statuses: { 'layout-alpha': 'needs-work', 'layout-beta': 'pass', analyzer: 'needs-work' },
    ruleNotes: { 'layout-alpha': 'Useful note', preview: 'Preview note' },
    analyzerFindings: [{ issueId: 'html-analyzer:test' }],
    previewState: { annotations: ['preview'] }
  };
  const before = structuredClone(input);
  const report = build(input);
  const markdown = serializeManualAuditReportMarkdown(report);
  assert.deepEqual(input, before);
  assert.doesNotMatch(markdown, /html-analyzer/);
  assert.doesNotMatch(markdown, /Preview note/);
  assert.doesNotMatch(markdown, /preview/);
});
