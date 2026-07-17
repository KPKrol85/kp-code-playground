import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildAiEvidencePackage, createEvidenceFingerprint } from '../assets/js/aiEvidenceAdapter.js';
import { buildAiReviewRequest, serializeAiReviewRequest } from '../assets/js/aiReviewRequest.js';
import { validateAiSummaryResponse } from '../assets/js/aiSummaryValidator.js';

const input = () => ({
  preset: { id: 'component', name: 'Component' }, rulePack: { id: 'all', name: 'All rules' }, severityProfile: { id: 'default', name: 'Default' }, categories: ['Accessibility'],
  rules: [{ id: 'alpha-rule', title: 'Alpha', category: 'Accessibility', severity: 'high' }, { id: 'bravo-rule', title: 'Bravo', category: 'Accessibility', severity: 'low' }],
  statuses: { 'alpha-rule': 'needs-work', 'bravo-rule': 'pass' }, ruleNotes: { 'alpha-rule': 'Fix label <script>' },
  score: { scorePercent: 50, earnedPoints: 1, possiblePoints: 2, totalRules: 2, checkedRules: 2, needsWorkRules: 1, notApplicableRules: 0 },
  categoryScores: [{ categoryName: 'Accessibility', scorePercent: 50, totalRules: 2, passedRules: 1, needsWorkRules: 1, notApplicableRules: 0, notCheckedRules: 0 }],
  recommendations: [{ title: 'Improve alpha', categoryName: 'Accessibility', priority: 'high', description: 'Deterministic recommendation' }],
  htmlAnalyzer: { findings: [{ issueId: 'html-analyzer:controls-unlabeled', checkId: 'controls-unlabeled', title: 'Controls without labels', category: 'accessibility', severity: 'high', source: 'html-analyzer', confidence: 'high', message: 'Every form control needs a label.', evidence: { snippet: '<input id="email">', location: 'input#email', occurrenceCount: 1 }, wcag: [{ criterion: '4.1.2', level: 'A', title: 'Name, Role, Value' }] }] },
  cssAnalyzer: { findings: [{ issueId: 'css-analyzer:large-fixed-widths', checkId: 'large-fixed-widths', title: 'Large fixed widths', category: 'Responsive behavior', severity: 'medium', source: 'css-analyzer', confidence: 'medium', message: 'Large width declaration risk.', evidence: { snippet: '.card { width: 900px; }', location: '.card', occurrenceCount: 1 } }] },
  rawHtml: '<main>secret</main>', rawCss: 'body{}', preview: { html: '<iframe>' }, projectMetadata: { name: 'Secret' }, reportMetadata: { targetUrl: 'https://example.com' }, filters: { status: 'all' }
});

test('evidence adapter normalizes manual and analyzer evidence with stable IDs and exclusions', () => {
  const source = input(); const before = JSON.stringify(source); const pkg = buildAiEvidencePackage(source); const text = JSON.stringify(pkg);
  assert.deepEqual(pkg.evidenceIds, ['category:accessibility', 'css-analyzer:large-fixed-widths', 'html-analyzer:controls-unlabeled', 'manual:alpha-rule', 'manual:bravo-rule']);
  assert.equal(pkg.manualFindings[0].id, 'manual:alpha-rule');
  assert.equal(pkg.analyzerFindings[0].id, 'html-analyzer:controls-unlabeled');
  assert.equal(pkg.evidenceLookup.has('manual:alpha-rule'), true);
  assert.equal(Object.isFrozen(pkg), true);
  assert.equal(Object.isFrozen(pkg.manualFindings), true);
  assert.equal(JSON.stringify(source), before);
  for (const forbidden of ['rawHtml', 'rawCss', 'preview', 'projectMetadata', 'reportMetadata', 'targetUrl', 'filters', '<main>secret</main>', 'body{}']) assert.equal(text.includes(forbidden), false, forbidden);
  assert.equal(createEvidenceFingerprint(pkg), createEvidenceFingerprint(buildAiEvidencePackage(input())));
});

test('evidence adapter handles empty manual and analyzer states', () => {
  const pkg = buildAiEvidencePackage();
  assert.deepEqual(pkg.manualFindings, []);
  assert.deepEqual(pkg.analyzerFindings, []);
  assert.deepEqual(pkg.evidenceIds, []);
});

test('request builder contains safety instructions, IDs, timestamps, and normalized evidence only', () => {
  const pkg = buildAiEvidencePackage(input());
  const req = buildAiReviewRequest(pkg, { now: () => new Date('2026-07-17T00:00:00.000Z'), requestId: 'ai-review-test' });
  const text = serializeAiReviewRequest(req);
  assert.equal(req.requestId, 'ai-review-test');
  assert.equal(req.createdAt, '2026-07-17T00:00:00.000Z');
  assert.match(text, /Summarize only the supplied deterministic/);
  assert.match(text, /Do not invent findings/);
  assert.match(text, /do not change scores/);
  for (const forbidden of ['apiKey', 'provider', 'fetch', 'XMLHttpRequest', 'WebSocket', '<main>secret</main>', 'body{}']) assert.equal(text.includes(forbidden), false, forbidden);
});

test('summary validator accepts safe structured response and normalizes text', () => {
  const pkg = buildAiEvidencePackage(input());
  const raw = '{"summary":"  Good\\nsummary  ","strengths":[{"text":" Pass noted ","evidenceIds":["manual:bravo-rule"]}],"priorities":[{"text":"Fix label","evidenceIds":["manual:alpha-rule","html-analyzer:controls-unlabeled"]}],"cautions":[{"text":"AI must be reviewed","evidenceIds":["css-analyzer:large-fixed-widths"]}]}';
  const result = validateAiSummaryResponse(raw, pkg.evidenceLookup);
  assert.equal(result.ok, true);
  assert.equal(result.value.summary, 'Good summary');
  assert.equal(result.value.priorities[0].evidenceIds.length, 2);
});

test('summary validator rejects malformed, unrelated, unknown, empty, duplicate, and excessive responses', () => {
  const lookup = buildAiEvidencePackage(input()).evidenceLookup;
  for (const [raw, match] of [
    ['{', /Malformed/], ['[]', /object/], ['{"summary":"x","foo":[]}', /Unsupported/],
    ['{"summary":"x","strengths":[{"text":"x","evidenceIds":["manual:missing"]}],"priorities":[],"cautions":[]}', /Unknown/],
    ['{"summary":"x","strengths":[{"text":"x","evidenceIds":[]}],"priorities":[],"cautions":[]}', /at least one/],
    ['{"summary":"x","strengths":[{"text":"x","evidenceIds":["manual:alpha-rule","manual:alpha-rule"]}],"priorities":[],"cautions":[]}', /duplicate/],
    [JSON.stringify({ summary: 'x', strengths: Array.from({ length: 9 }, () => ({ text: 'x', evidenceIds: ['manual:alpha-rule'] })), priorities: [], cautions: [] }), /too many/]
  ]) { const result = validateAiSummaryResponse(raw, lookup); assert.equal(result.ok, false); assert.match(result.message, match); }
});

test('AI app state boundaries are session-only and separate from deterministic persistence and reports', () => {
  const app = readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
  const auditStorage = readFileSync(new URL('../assets/js/auditStorage.js', import.meta.url), 'utf8');
  const storageAdapter = readFileSync(new URL('../assets/js/storageAdapter.js', import.meta.url), 'utf8');
  const reportAdapter = readFileSync(new URL('../assets/js/reportAdapter.js', import.meta.url), 'utf8');
  assert.match(app, /markAiWorkflowStale/);
  assert.match(app, /clearAiWorkflow\('Project audit state changed/);
  assert.match(app, /clearAiWorkflow\('Local audit reset/);
  assert.equal(auditStorage.includes('aiReviewState'), false);
  assert.equal(storageAdapter.includes('aiReviewState'), false);
  assert.equal(reportAdapter.includes('aiReviewState'), false);
  assert.equal(app.includes('createAuditStateExport({\n    selectedPresetId'), true);
  assert.equal(app.includes('aiReviewState:') || app.includes('aiSummary:'), false);
});
