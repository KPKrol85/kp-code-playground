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

import { REPORT_METADATA_FIELDS, buildExecutiveSummary, normalizeReportMetadata } from '../assets/js/reportData.js';
import { createAuditStateExport, parseImportedAuditState } from '../assets/js/auditStorage.js';

test('normalizes optional report cover metadata without mutating input', () => {
  const input = { projectName: '  Vault  Lens  ', owner: '\nKP Code\n', projectType: ' Static UI ', targetUrl: ' https://example.test/a?x=[y] ', reviewer: ' Ada ', reviewDate: '2026-07-16', extra: 'ignored' };
  const before = structuredClone(input);
  const metadata = normalizeReportMetadata(input);
  assert.deepEqual(input, before);
  assert.deepEqual(Object.keys(metadata), REPORT_METADATA_FIELDS.map((field) => field.id));
  assert.equal(metadata.projectName, 'Vault Lens');
  assert.equal(metadata.owner, 'KP Code');
  assert.equal(metadata.targetUrl, 'https://example.test/a?x=[y]');
});

test('omits empty metadata and escapes markdown special characters and multiline values', () => {
  const report = build({ metadata: { projectName: ' **Name**\n# heading ', owner: '   ', targetUrl: 'javascript:alert(1)' } });
  assert.deepEqual(report.metadataEntries.map((entry) => entry.id), ['projectName', 'targetUrl']);
  const markdown = serializeManualAuditReportMarkdown(report);
  assert.match(markdown, /Project name: \\\*\\\*Name\\\*\\\* \\# heading/);
  assert.match(markdown, /Target URL: javascript:alert\(1\)/);
  assert.doesNotMatch(markdown, /Owner:/);
});

test('metadata is in normalized report data but excluded from audit export and import persistence', () => {
  const report = build({ metadata: { projectName: 'Session-only project' } });
  assert.equal(report.metadata.projectName, 'Session-only project');
  const exported = createAuditStateExport({ selectedPresetId: 'landing-page', selectedRulePackId: 'all-rules', selectedSeverityProfileId: 'baseline', ruleStatuses: {}, ruleNotes: {}, ruleSchemaVersion: 2 });
  assert.equal(Object.hasOwn(exported.audit, 'metadata'), false);
  exported.audit.metadata = { projectName: 'Should not import' };
  const imported = parseImportedAuditState(JSON.stringify(exported), { validPresetIds: new Set(['landing-page']), validRulePackIds: new Set(['all-rules']), validSeverityProfileIds: new Set(['baseline']), validRuleIds: new Set(rules.map((rule) => rule.id)), validStatuses: new Set(['not-checked', 'pass', 'needs-work', 'not-applicable']), currentRuleSchemaVersion: 2, compatibleRuleSchemaVersions: [2] });
  assert.equal(Object.hasOwn(imported.state, 'metadata'), false);
});

test('executive summary handles no reviewed rules without quality claims', () => {
  const report = build({ statuses: { 'layout-alpha': 'not-checked', 'layout-beta': 'not-applicable' } });
  const text = JSON.stringify(report.executiveSummary);
  assert.equal(report.executiveSummary.reviewedRules, 0);
  assert.match(text, /No applicable rules have been reviewed yet/);
  assert.doesNotMatch(text, /\bWCAG\b|compliance|production readiness|\bAI\b|passed an audit/i);
});

test('executive summary uses reviewed deterministic facts, categories, severities, and recommendations', () => {
  const statuses = { 'layout-alpha': 'pass', 'layout-beta': 'needs-work', 'content-gamma': 'pass', 'content-delta': 'not-checked' };
  const report = build({ statuses });
  assert.equal(report.executiveSummary.completionPercent, 75);
  assert.equal(report.executiveSummary.needsWorkFindings, 1);
  assert.deepEqual(report.executiveSummary.severityCounts, { medium: 1 });
  assert.deepEqual(report.executiveSummary.strengths.map((item) => item.name), ['Content clarity', 'Layout structure']);
  assert.deepEqual(report.executiveSummary.priorities.map((item) => item.name), ['Layout structure']);
  assert.match(JSON.stringify(report.executiveSummary), /Recommended next steps/);
});

test('executive summary tie-breaking is stable and excludes unreviewed categories from strengths and priorities', () => {
  const localRules = [
    { id: 'a', title: 'A', description: 'A', category: 'Alpha', severity: 'low' },
    { id: 'b', title: 'B', description: 'B', category: 'Beta', severity: 'low' },
    { id: 'c', title: 'C', description: 'C', category: 'Gamma', severity: 'low' }
  ];
  const report = buildManualAuditReportData({ preset, rulePack, severityProfile, categories: ['Beta', 'Alpha', 'Gamma'], rules: localRules, statuses: { a: 'pass', b: 'pass', c: 'not-checked' } });
  assert.deepEqual(report.executiveSummary.strengths.map((item) => item.name), ['Beta', 'Alpha']);
  assert.deepEqual(report.executiveSummary.priorities, []);
  assert.doesNotMatch(JSON.stringify(report.executiveSummary), /Gamma/);
});

test('summary facts are stable across templates and summary generation does not mutate input', () => {
  const input = { statuses: { 'layout-alpha': 'needs-work', 'layout-beta': 'pass' } };
  const before = structuredClone(input);
  const a = build({ ...input, templateId: 'internal-qa' }).executiveSummary;
  const b = build({ ...input, templateId: 'saas-team' }).executiveSummary;
  assert.deepEqual(a, b);
  assert.deepEqual(input, before);
  assert.deepEqual(a, build({ ...input, templateId: 'internal-qa' }).executiveSummary);
});

import { adaptManualAuditReport } from '../assets/js/reportAdapter.js';
import { readFileSync } from 'node:fs';

test('report adapter is DOM-free, deterministic, immutable, and contains normalized report sections', () => {
  const previousDocument = globalThis.document;
  const previousWindow = globalThis.window;
  try {
    delete globalThis.document;
    delete globalThis.window;
    const input = { preset, rulePack, severityProfile, categories: ['Content clarity', 'Layout structure'], rules: [...rules].reverse(), statuses: { 'layout-alpha': 'needs-work', 'layout-beta': 'pass', 'content-gamma': 'pass', 'content-delta': 'not-applicable' }, ruleNotes: { 'layout-alpha': 'Finding note', 'content-gamma': 'Passing note' }, metadata: { projectName: '  Adapter project  ', owner: '\u0000' }, analyzerFindings: [{ issueId: 'html-analyzer:ignored' }], previewState: { note: 'Preview note' }, templateId: 'missing-template' };
    const before = structuredClone(input);
    const first = adaptManualAuditReport(input);
    const second = adaptManualAuditReport(structuredClone(input));
    assert.deepEqual(input, before);
    assert.deepEqual(first, second);
    assert.equal(Object.isFrozen(first), true);
    assert.equal(first.template.id, 'internal-qa');
    ['title', 'template', 'metadata', 'metadataEntries', 'preset', 'rulePack', 'severityProfile', 'score', 'categoryScores', 'findings', 'notes', 'recommendations', 'executiveSummary', 'screenReaderSummary'].forEach((key) => assert.ok(Object.hasOwn(first, key), key));
    assert.equal(first.metadata.projectName, 'Adapter project');
    assert.deepEqual(first.findings.map((finding) => finding.issueId), ['manual:layout-alpha']);
    assert.equal(first.findings[0].note, 'Finding note');
    assert.deepEqual(first.notes.map((note) => note.ruleId), ['content-gamma', 'layout-alpha']);
    assert.equal(JSON.stringify(first).includes('html-analyzer'), false);
    assert.equal(JSON.stringify(first).includes('Preview note'), false);
  } finally {
    if (previousDocument !== undefined) globalThis.document = previousDocument;
    if (previousWindow !== undefined) globalThis.window = previousWindow;
  }
});

test('adapter handles empty, no finding, no note, no recommendation, and zero possible score states', () => {
  const empty = adaptManualAuditReport({ preset, rulePack, severityProfile, categories: [], rules: [], statuses: {}, ruleNotes: {} });
  assert.equal(empty.score.possiblePoints, 0);
  assert.equal(empty.screenReaderSummary.reviewedRules, 0);
  assert.match(empty.screenReaderSummary.items.join(' '), /not enough reviewed audit data/);
  const clean = adaptManualAuditReport({ preset, rulePack, severityProfile, categories: ['Layout structure'], rules: [rules[0]], statuses: { 'layout-alpha': 'pass' }, ruleNotes: {} });
  assert.equal(clean.findings.length, 0);
  assert.equal(clean.notes.length, 0);
  assert.equal(clean.recommendations.length, 0);
  assert.match(clean.screenReaderSummary.items.join(' '), /No manual issues were recorded within the reviewed scope/);
});

test('screen-reader summary covers required deterministic facts and safe language', () => {
  const report = adaptManualAuditReport({ preset, rulePack, severityProfile, categories: ['Layout structure', 'Content clarity'], rules, statuses: { 'layout-alpha': 'pass', 'layout-beta': 'needs-work', 'content-gamma': 'pass', 'content-delta': 'not-applicable' }, ruleNotes: { 'layout-beta': 'Needs adjustment.' }, metadata: { projectName: 'Lens Project' }, templateId: 'saas-team' });
  const text = report.screenReaderSummary.items.join(' ');
  assert.match(text, /KP_Code Layout Lens Audit Report/);
  assert.match(text, /Selected report template: SaaS Team/);
  assert.match(text, /Project name: Lens Project/);
  assert.match(text, /Overall weighted score: 67%/);
  assert.match(text, /Reviewed rules: 3 of 3 applicable rules/);
  assert.match(text, /Audit completion: 100%/);
  assert.match(text, /Passing rules: 2/);
  assert.match(text, /Needs work findings: 1/);
  assert.match(text, /Not applicable.*1/);
  assert.match(text, /Strongest reviewed categories: Content clarity/);
  assert.match(text, /Priority reviewed categories: Layout structure/);
  assert.match(text, /Severity distribution.*medium: 1/);
  assert.match(text, /Recommendations: 1/);
  assert.match(text, /Reviewer notes: present/);
  assert.doesNotMatch(text, /WCAG|certification|compliance|production-readiness|production readiness|AI|launch readiness/i);
});

test('screen-reader summary excludes not checked and not applicable rules from findings and unreviewed category rankings', () => {
  const localRules = [
    { id: 'a', title: 'A', description: 'A', category: 'Beta', severity: 'low' },
    { id: 'b', title: 'B', description: 'B', category: 'Alpha', severity: 'low' },
    { id: 'c', title: 'C', description: 'C', category: 'Gamma', severity: 'high' },
    { id: 'd', title: 'D', description: 'D', category: 'Delta', severity: 'high' }
  ];
  const report = adaptManualAuditReport({ preset, rulePack, severityProfile, categories: ['Beta', 'Alpha', 'Gamma', 'Delta'], rules: localRules, statuses: { a: 'pass', b: 'pass', c: 'not-checked', d: 'not-applicable' } });
  assert.deepEqual(report.screenReaderSummary.strengths.map((item) => item.name), ['Beta', 'Alpha']);
  assert.deepEqual(report.screenReaderSummary.priorities, []);
  assert.equal(report.screenReaderSummary.needsWorkFindings, 0);
  assert.doesNotMatch(report.screenReaderSummary.items.join(' '), /Gamma|Delta|high: 1/);
});

test('screen-reader summary facts are identical across templates except template identity text', () => {
  const input = { preset, rulePack, severityProfile, categories: ['Layout structure', 'Content clarity'], rules, statuses: { 'layout-alpha': 'needs-work', 'layout-beta': 'pass' } };
  const stripTemplateItem = (summary) => ({ ...summary, items: summary.items.filter((item) => !item.startsWith('Selected report template:')) });
  assert.deepEqual(stripTemplateItem(adaptManualAuditReport({ ...input, templateId: 'internal-qa' }).screenReaderSummary), stripTemplateItem(adaptManualAuditReport({ ...input, templateId: 'design-system-team' }).screenReaderSummary));
  assert.deepEqual(adaptManualAuditReport(input).screenReaderSummary, adaptManualAuditReport(input).screenReaderSummary);
});

test('report outputs consume adapter-shaped normalized report models', () => {
  const appSource = readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
  const markdownSource = readFileSync(new URL('../assets/js/markdownReport.js', import.meta.url), 'utf8');
  const rendererSource = readFileSync(new URL('../assets/js/reportRenderer.js', import.meta.url), 'utf8');
  assert.match(appSource, /adaptManualAuditReport/);
  assert.doesNotMatch(appSource, /buildManualAuditReportData/);
  assert.match(markdownSource, /screenReaderSummary/);
  assert.match(rendererSource, /screenReaderSummary/);
});
