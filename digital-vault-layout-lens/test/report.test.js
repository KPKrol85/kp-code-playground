import test from 'node:test';
import assert from 'node:assert/strict';

import { buildManualAuditReportData } from '../assets/js/reportData.js';
import { serializeManualAuditReportMarkdown } from '../assets/js/markdownReport.js';
import { DEFAULT_REPORT_TEMPLATE_ID, REPORT_TEMPLATES, getReportTemplate, validateReportTemplates } from '../assets/js/reportTemplates.js';
import { createAuditStateExport } from '../assets/js/auditStorage.js';
import { runBrowserPrintWorkflow } from '../assets/js/printReport.js';

const requiredIds = ['internal-qa', 'freelancer-client', 'agency-review', 'saas-team', 'design-system-team'];
const rules = [
  { id: 'layout-spacing', category: 'Visual consistency', title: 'Spacing', description: 'Spacing needs review.', severity: 'high' },
  { id: 'responsive-card', category: 'Responsive behavior', title: 'Card', description: 'Card should adapt.', severity: 'medium' },
  { id: 'a11y-label', category: 'Accessibility basics', title: 'Label', description: 'Label is clear.', severity: 'low' }
];
const base = { preset: { id: 'landing', name: 'Landing' }, rulePack: { id: 'all', name: 'All' }, severityProfile: { id: 'base', name: 'Base' }, categories: ['Visual consistency', 'Responsive behavior', 'Accessibility basics'], rules, statuses: { 'layout-spacing': 'needs-work', 'responsive-card': 'pass', 'a11y-label': 'needs-work' }, ruleNotes: { 'layout-spacing': 'Needs tighter rhythm.', 'a11y-label': 'Keep note exactly.' } };
function report(templateId) { return buildManualAuditReportData({ ...base, templateId }); }

function facts(r) { return { score: r.score, findings: r.findings, notes: r.notes, recommendations: r.recommendations, issueIds: r.findings.map((f) => f.issueId) }; }

test('all required report template ids exist and are unique', () => {
  assert.deepEqual(REPORT_TEMPLATES.map((t) => t.id).sort(), requiredIds.sort());
  assert.equal(new Set(REPORT_TEMPLATES.map((t) => t.id)).size, requiredIds.length);
});

test('template configuration validates', () => {
  assert.deepEqual(validateReportTemplates(), []);
});

test('unknown template ids safely fall back to the default template', () => {
  assert.equal(getReportTemplate('missing-template').id, DEFAULT_REPORT_TEMPLATE_ID);
  assert.equal(report('missing-template').template.id, DEFAULT_REPORT_TEMPLATE_ID);
});

test('markdown output is deterministic for the same audit state and template', () => {
  assert.equal(serializeManualAuditReportMarkdown(report('agency-review')), serializeManualAuditReportMarkdown(report('agency-review')));
});

test('switching templates preserves scores, findings, issue IDs, reviewer notes, and recommendations', () => {
  const internal = facts(report('internal-qa'));
  for (const id of requiredIds) assert.deepEqual(facts(report(id)), internal);
});

test('section ordering follows the selected template', () => {
  const r = report('freelancer-client');
  const markdown = serializeManualAuditReportMarkdown(r);
  assert.deepEqual(r.template.sectionOrder, ['summary', 'findings', 'recommendations', 'categories', 'notes']);
  assert.ok(markdown.indexOf('## Quality score') < markdown.indexOf('## Important findings'));
  assert.ok(markdown.indexOf('## Important findings') < markdown.indexOf('## Suggested next actions'));
});

test('markdown includes selected template and changes only presentation labels/order between templates', () => {
  const internal = serializeManualAuditReportMarkdown(report('internal-qa'));
  const client = serializeManualAuditReportMarkdown(report('freelancer-client'));
  assert.match(client, /Report template: Freelancer \/ Client Delivery \(freelancer-client\)/);
  assert.notEqual(client, internal);
  ['manual:layout-spacing', 'manual:a11y-label', 'Needs tighter rhythm.', 'Keep note exactly.', 'Spacing needs review.'].forEach((fact) => {
    assert.ok(internal.includes(fact));
    assert.ok(client.includes(fact));
  });
});

test('report template state remains excluded from audit JSON export/import payload', () => {
  const exported = createAuditStateExport({ selectedPresetId: 'landing', selectedRulePackId: 'all', selectedSeverityProfileId: 'base', ruleStatuses: base.statuses, ruleNotes: base.ruleNotes, ruleSchemaVersion: 1 });
  assert.equal(JSON.stringify(exported).includes('reportTemplate'), false);
  assert.equal(JSON.stringify(exported).includes('internal-qa'), false);
});

test('print workflow renders selected template before printing without mutating audit facts', () => {
  const before = facts(report('saas-team'));
  const events = [];
  const result = runBrowserPrintWorkflow({ render: () => events.push(report('saas-team').template.id), print: () => events.push('print'), requestFrame: (fn) => fn(), onStatus: (m) => events.push(m) });
  assert.equal(result.status, 'requested');
  assert.deepEqual(events.slice(0, 2), ['saas-team', 'print']);
  assert.deepEqual(facts(report('saas-team')), before);
});

test('print workflow handles unavailable and failing print behavior safely', () => {
  const unavailable = [];
  assert.equal(runBrowserPrintWorkflow({ render: () => unavailable.push('rendered'), print: undefined, onStatus: (m) => unavailable.push(m) }).status, 'unavailable');
  assert.match(unavailable.join(' '), /unavailable/);
  const failing = [];
  runBrowserPrintWorkflow({ render: () => failing.push('rendered'), print: () => { throw new Error('blocked'); }, requestFrame: (fn) => fn(), onStatus: (m) => failing.push(m) });
  assert.match(failing.join(' '), /could not be opened/);
});
