import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildAiEvidencePackage, createEvidenceFingerprint } from '../assets/js/aiEvidenceAdapter.js';
import { buildAiReviewRequest, serializeAiReviewRequest } from '../assets/js/aiReviewRequest.js';
import { validateAiSummaryResponse } from '../assets/js/aiSummaryValidator.js';
import { DEFAULT_AI_REVIEW_PRESET_ID, aiReviewPresets, getAiReviewPreset, validateAiReviewPresets } from '../assets/js/aiReviewPresets.js';
import { buildAiReviewPrompt } from '../assets/js/aiPromptTemplates.js';

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

const response = (presetId = DEFAULT_AI_REVIEW_PRESET_ID, requestId = 'ai-review-test') => JSON.stringify({ schemaVersion: 1, requestId, presetId, summary: { text: 'Good summary', evidenceIds: ['manual:alpha-rule'] }, strengths: [{ text: 'Pass noted', evidenceIds: ['manual:bravo-rule'] }], priorities: [{ text: 'Fix label', evidenceIds: ['manual:alpha-rule', 'html-analyzer:controls-unlabeled'] }], cautions: [{ text: 'AI must be reviewed', evidenceIds: ['css-analyzer:large-fixed-widths'] }] });

test('presets provide four stable valid options and deterministic default without modifying evidence', () => {
  const before = JSON.stringify(input()); const pkg = buildAiEvidencePackage(input());
  assert.deepEqual(aiReviewPresets.map((p) => p.id), ['senior-frontend', 'accessibility', 'product-polish', 'design-system']);
  assert.equal(new Set(aiReviewPresets.map((p) => p.id)).size, 4);
  assert.equal(DEFAULT_AI_REVIEW_PRESET_ID, 'senior-frontend');
  assert.equal(getAiReviewPreset().id, 'senior-frontend');
  assert.equal(validateAiReviewPresets().ok, true);
  assert.equal(validateAiReviewPresets([{ id: 'x', label: '', description: 'd', role: 'r', focusAreas: [], prohibitedClaims: ['maybe'], outputEmphasis: ['e'], extra: true }]).ok, false);
  aiReviewPresets.forEach((preset) => buildAiReviewRequest(pkg, { presetId: preset.id, now: () => new Date('2026-07-17T00:00:00.000Z'), requestId: 'fixed' }));
  assert.equal(JSON.stringify(input()), before);
  assert.equal(createEvidenceFingerprint(pkg), createEvidenceFingerprint(buildAiEvidencePackage(input())));
});

test('evidence adapter normalizes manual and analyzer evidence with stable IDs and exclusions', () => {
  const source = input(); const before = JSON.stringify(source); const pkg = buildAiEvidencePackage(source); const text = JSON.stringify(pkg);
  assert.deepEqual(pkg.evidenceIds, ['category:accessibility', 'css-analyzer:large-fixed-widths', 'html-analyzer:controls-unlabeled', 'manual:alpha-rule', 'manual:bravo-rule']);
  assert.equal(pkg.evidenceLookup.has('manual:alpha-rule'), true);
  assert.equal(Object.isFrozen(pkg), true);
  assert.equal(JSON.stringify(source), before);
  for (const forbidden of ['rawHtml', 'rawCss', 'preview', 'projectMetadata', 'reportMetadata', 'targetUrl', 'filters', '<main>secret</main>', 'body{}']) assert.equal(text.includes(forbidden), false, forbidden);
});

test('prompt templates fill controlled preset fields and require cited evidence claims deterministically', () => {
  const pkg = buildAiEvidencePackage(input());
  const preset = getAiReviewPreset('accessibility');
  const prompt = buildAiReviewPrompt({ requestId: 'fixed', preset, evidencePackage: pkg });
  assert.match(prompt, /# Role/); assert.match(prompt, /Preset ID: accessibility/); assert.match(prompt, /Every factual claim/); assert.match(prompt, /evidenceIds/);
  for (const required of ['Use only supplied evidence', 'full normalized evidence package remains available', 'Avoid inventing issues', 'Avoid changing deterministic scores', 'Avoid treating confidence as severity', 'Avoid claiming WCAG compliance', 'Avoid claiming production readiness', 'Avoid claiming source inspection beyond supplied snippets', 'State when evidence is insufficient']) assert.match(prompt, new RegExp(required, 'i'));
  for (const id of pkg.evidenceIds) assert.match(prompt, new RegExp(id));
  for (const forbidden of ['rawHtml', 'rawCss', 'projectMetadata', '<main>secret</main>', 'body{}']) assert.equal(prompt.includes(forbidden), false, forbidden);
  assert.equal(prompt, buildAiReviewPrompt({ requestId: 'fixed', preset, evidencePackage: pkg }));
});

test('request builder contains preset binding, safety instructions, IDs, timestamps, and normalized evidence only', () => {
  const pkg = buildAiEvidencePackage(input());
  const req = buildAiReviewRequest(pkg, { presetId: 'design-system', now: () => new Date('2026-07-17T00:00:00.000Z'), requestId: 'ai-review-test' });
  const text = serializeAiReviewRequest(req);
  assert.equal(req.requestId, 'ai-review-test'); assert.equal(req.presetId, 'design-system'); assert.equal(req.createdAt, '2026-07-17T00:00:00.000Z');
  assert.match(text, /Every factual claim/); assert.match(text, /Do not change deterministic evidence/); assert.match(text, /Do not cite evidence that is not included/);
  for (const forbidden of ['apiKey', 'provider SDK', 'fetch', 'XMLHttpRequest', 'WebSocket', '<main>secret</main>', 'body{}']) assert.equal(text.includes(forbidden), false, forbidden);
});

test('summary validator accepts valid response for each preset and normalizes without mutation', () => {
  const pkg = buildAiEvidencePackage(input());
  for (const preset of aiReviewPresets) {
    const raw = response(preset.id); const before = `${raw}`;
    const result = validateAiSummaryResponse(raw, pkg.evidenceLookup, { requestId: 'ai-review-test', presetId: preset.id });
    assert.equal(result.ok, true); assert.equal(result.value.summary.text, 'Good summary'); assert.equal(result.value.presetId, preset.id); assert.equal(raw, before);
  }
});

test('summary validator rejects missing evidence, mismatches, unsupported schema/sections, and excessive content', () => {
  const lookup = buildAiEvidencePackage(input()).evidenceLookup;
  for (const [raw, match] of [
    ['{', /Malformed/], ['[]', /object/], [JSON.stringify({ schemaVersion: 1, requestId: 'ai-review-test', presetId: 'senior-frontend', summary: { text: 'x', evidenceIds: ['manual:alpha-rule'] }, strengths: [], priorities: [], cautions: [], risks: [] }), /Unsupported/],
    [JSON.stringify({ schemaVersion: 2, requestId: 'ai-review-test', presetId: 'senior-frontend', summary: { text: 'x', evidenceIds: ['manual:alpha-rule'] }, strengths: [], priorities: [], cautions: [] }), /schema/],
    [JSON.stringify({ schemaVersion: 1, requestId: 'old', presetId: 'senior-frontend', summary: { text: 'x', evidenceIds: ['manual:alpha-rule'] }, strengths: [], priorities: [], cautions: [] }), /request ID/],
    [JSON.stringify({ schemaVersion: 1, requestId: 'ai-review-test', presetId: 'accessibility', summary: { text: 'x', evidenceIds: ['manual:alpha-rule'] }, strengths: [], priorities: [], cautions: [] }), /preset ID/],
    [JSON.stringify({ schemaVersion: 1, requestId: 'ai-review-test', presetId: 'senior-frontend', summary: { text: 'x', evidenceIds: [] }, strengths: [], priorities: [], cautions: [] }), /at least one/],
    [JSON.stringify({ schemaVersion: 1, requestId: 'ai-review-test', presetId: 'senior-frontend', summary: { text: 'x', evidenceIds: ['manual:alpha-rule'] }, strengths: [{ text: 'x', evidenceIds: [] }], priorities: [], cautions: [] }), /at least one/],
    [JSON.stringify({ schemaVersion: 1, requestId: 'ai-review-test', presetId: 'senior-frontend', summary: { text: 'x', evidenceIds: ['manual:missing'] }, strengths: [], priorities: [], cautions: [] }), /Unknown/],
    [JSON.stringify({ schemaVersion: 1, requestId: 'ai-review-test', presetId: 'senior-frontend', summary: { text: 'x', evidenceIds: ['manual:alpha-rule', 'manual:alpha-rule'] }, strengths: [], priorities: [], cautions: [] }), /duplicate/],
    [JSON.stringify({ schemaVersion: 1, requestId: 'ai-review-test', presetId: 'senior-frontend', summary: { text: '', evidenceIds: ['manual:alpha-rule'] }, strengths: [], priorities: [], cautions: [] }), /non-empty/],
    [JSON.stringify({ schemaVersion: 1, requestId: 'ai-review-test', presetId: 'senior-frontend', summary: { text: 'x', evidenceIds: ['manual:alpha-rule'] }, strengths: Array.from({ length: 9 }, () => ({ text: 'x', evidenceIds: ['manual:alpha-rule'] })), priorities: [], cautions: [] }), /too many/]
  ]) { const result = validateAiSummaryResponse(raw, lookup, { requestId: 'ai-review-test', presetId: 'senior-frontend' }); assert.equal(result.ok, false); assert.match(result.message, match); }
});

test('AI app state behavior remains session-only and separate from scoring, findings, storage, audit JSON, and reports', () => {
  const app = readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
  const auditStorage = readFileSync(new URL('../assets/js/auditStorage.js', import.meta.url), 'utf8');
  const storageAdapter = readFileSync(new URL('../assets/js/storageAdapter.js', import.meta.url), 'utf8');
  const reportAdapter = readFileSync(new URL('../assets/js/reportAdapter.js', import.meta.url), 'utf8');
  assert.match(app, /let selectedAiReviewPresetId = DEFAULT_AI_REVIEW_PRESET_ID/);
  assert.match(app, /handleAiPresetChange/); assert.match(app, /selectedAiReviewPresetId === aiReviewState\.presetId/);
  assert.match(app, /requestId: request\.requestId/); assert.match(app, /presetId: request\.presetId/);
  assert.match(app, /validateAiSummaryResponse\([^\n]+requestId: aiReviewState\.requestId, presetId: aiReviewState\.presetId/);
  assert.match(app, /clearAiWorkflow\('Project audit state changed/); assert.match(app, /clearAiWorkflow\('Local audit reset/);
  for (const source of [auditStorage, storageAdapter, reportAdapter]) { assert.equal(source.includes('aiReviewState'), false); assert.equal(source.includes('selectedAiReviewPresetId'), false); }
  assert.equal(app.includes('aiReviewState:') || app.includes('aiSummary:'), false);
});
