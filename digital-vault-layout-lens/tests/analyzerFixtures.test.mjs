import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { analyzeHtmlSource } from '../assets/js/htmlAnalyzer.js';
import { analyzeCssSource } from '../assets/js/cssAnalyzer.js';
import { assertUniqueIssueIds, createIssueId } from '../assets/js/issueIds.js';
import { validateWcagMappings } from '../assets/js/wcag.js';
import { FINDING_CONFIDENCE, FINDING_SOURCES, isAutomatedSource } from '../assets/js/findingMetadata.js';
import { createAuditStateExport, stringifyAuditStateExport } from '../assets/js/auditStorage.js';
import { calculateAuditScore } from '../assets/js/scoringEngine.js';

const root = new URL('.', import.meta.url).pathname;
const fixture = (kind, name) => readFileSync(join(root, 'fixtures', kind, name), 'utf8');
const htmlParser = { parseFromString: (source) => parseTestHtml(source) };
const ids = (findings) => findings.map((f) => f.checkId).sort();
const issueIds = (findings) => findings.map((f) => f.issueId).sort();

const htmlFixtures = [
  {
    name: 'valid semantic document produces no obvious false positives',
    file: 'semantic-valid.html',
    expectedCount: 0,
    mustNotInclude: ['headings-missing-h1', 'landmarks-missing-main', 'controls-unlabeled', 'buttons-empty-name', 'links-empty-name', 'images-missing-alt']
  },
  {
    name: 'empty HTML remains a safe empty result',
    source: '   ',
    status: 'empty',
    expectedCount: 0,
    mustInclude: []
  },
  {
    name: 'problematic HTML isolates deterministic accessibility checks',
    file: 'problematic.html',
    expectedCount: 15,
    mustInclude: ['headings-multiple-h1', 'headings-empty', 'landmarks-multiple-main', 'landmarks-unnamed-navigation', 'landmarks-unnamed-region', 'labels-empty', 'labels-invalid-for', 'controls-unlabeled', 'buttons-empty-name', 'links-empty-name', 'links-missing-href', 'links-placeholder-href', 'images-missing-alt', 'images-suspicious-empty-alt', 'images-invalid-src'],
    mustNotInclude: ['headings-missing-h1', 'landmarks-missing-main', 'landmarks-missing-navigation']
  },
  {
    name: 'navigation-like links without main are reported without crashing',
    file: 'no-main-navlike.html',
    mustInclude: ['landmarks-missing-main', 'landmarks-missing-navigation'],
    mustNotInclude: ['headings-missing-h1']
  },
  {
    name: 'all supported valid labelling patterns avoid control findings',
    file: 'labels-valid.html',
    expectedCount: 0,
    mustNotInclude: ['controls-unlabeled', 'labels-invalid-for', 'labels-empty']
  },
  {
    name: 'malformed HTML can be recovered by parser adapter safely',
    file: 'malformed.html',
    mustInclude: ['headings-skipped-level'],
    mustNotInclude: ['controls-unlabeled', 'buttons-empty-name']
  }
];

for (const scenario of htmlFixtures) {
  test(`HTML fixture: ${scenario.name}`, () => {
    const source = scenario.source ?? fixture('html', scenario.file);
    const result = analyzeHtmlSource(source, { parser: htmlParser });
    assert.equal(result.status, scenario.status ?? 'analyzed');
    assert.equal(result.findings.length, scenario.expectedCount ?? result.findings.length);
    assertIncludes(ids(result.findings), scenario.mustInclude ?? []);
    assertExcludes(ids(result.findings), scenario.mustNotInclude ?? []);
    assertFindingContracts(result.findings, FINDING_SOURCES.htmlAnalyzer);
  });
}

test('HTML fixture findings are deterministic across equivalent input whitespace and comments', () => {
  const base = fixture('html', 'problematic.html');
  const withNoise = `<!-- ignored -->\n${base.replaceAll('><', '>\n  <')}`;
  assert.deepEqual(issueIds(analyzeHtmlSource(base, { parser: htmlParser }).findings), issueIds(analyzeHtmlSource(withNoise, { parser: htmlParser }).findings));
});

test('HTML fixture issue IDs do not depend on display wording or evidence text', () => {
  const finding = analyzeHtmlSource(fixture('html', 'problematic.html'), { parser: htmlParser }).findings.find((f) => f.checkId === 'buttons-empty-name');
  assert.equal(finding.issueId, createIssueId({ source: FINDING_SOURCES.htmlAnalyzer, ruleId: finding.checkId }));
});

test('real DOMParser HTML fixture path is exercised when the runtime provides DOMParser', { skip: typeof DOMParser === 'undefined' ? 'DOMParser is unavailable in this Node runtime and npm registry access blocked lightweight DOM dependency installation.' : false }, () => {
  const result = analyzeHtmlSource(fixture('html', 'semantic-valid.html'));
  assert.equal(result.status, 'analyzed');
  assert.deepEqual(result.findings, []);
});

const cssFixtures = [
  { name: 'small valid CSS has no responsive warnings', file: 'valid-small.css', expectedCount: 0, mustNotInclude: ['large-fixed-widths', 'missing-responsive-patterns'] },
  { name: 'repeated literals above threshold are reported', file: 'repeated-literals.css', mustInclude: ['repeated-literal-values'], repeatedOccurrences: [4, 4] },
  { name: 'repeated values below threshold are ignored', file: 'repeated-below-threshold.css', expectedCount: 0, mustNotInclude: ['repeated-literal-values'] },
  { name: 'custom properties and var token usage are ignored as literals', file: 'tokens.css', expectedCount: 0, mustNotInclude: ['repeated-literal-values'] },
  { name: 'fixed widths and overflow risks are reported', file: 'responsive-risks.css', mustInclude: ['large-fixed-widths', 'overflow-x-hidden', 'nowrap-without-overflow-strategy', 'rigid-grid-tracks', 'positioned-fixed-width'] },
  { name: 'small dimensions, safe overflow, media, and container rules avoid findings', file: 'safe-responsive.css', expectedCount: 0, mustNotInclude: ['large-fixed-widths', 'overflow-x-hidden', 'nowrap-without-overflow-strategy', 'missing-responsive-patterns'] },
  { name: 'substantial stylesheet without responsive patterns is reported', file: 'substantial-no-responsive.css', mustInclude: ['large-fixed-widths', 'missing-responsive-patterns'] },
  { name: 'malformed CSS returns safe error status', file: 'malformed.css', status: 'error', expectedCount: 0 }
];

for (const scenario of cssFixtures) {
  test(`CSS fixture: ${scenario.name}`, () => {
    const result = analyzeCssSource(fixture('css', scenario.file));
    assert.equal(result.status, scenario.status ?? 'analyzed');
    assert.equal(result.findings.length, scenario.expectedCount ?? result.findings.length);
    assertIncludes(ids(result.findings), scenario.mustInclude ?? []);
    assertExcludes(ids(result.findings), scenario.mustNotInclude ?? []);
    assertFindingContracts(result.findings, FINDING_SOURCES.cssAnalyzer);
    if (scenario.repeatedOccurrences) {
      assert.deepEqual(result.findings.filter((f) => f.checkId === 'repeated-literal-values').map((f) => f.evidence.occurrenceCount).sort((a, b) => a - b), scenario.repeatedOccurrences);
    }
  });
}

test('CSS fixture findings are deterministic across comments, whitespace, and rule order', () => {
  const compact = '.a{color:#fff}.b{color:#ffffff}.c{color:#fff}.d{color:#fff;width:720px}';
  const noisy = '/* ignored */ .d { width: 720px; color: #fff }\n.c { color:#fff } .b{color:#fff}.a{color:#fff}';
  assert.deepEqual(issueIds(analyzeCssSource(compact).findings), issueIds(analyzeCssSource(noisy).findings));
});

test('automated fixture findings stay separate from manual scoring and audit exports', () => {
  const score = calculateAuditScore([{ id: 'manual-rule', category: 'Layout', title: 'Manual', description: 'Manual', severity: 'high' }], { 'manual-rule': 'pass' });
  analyzeHtmlSource(fixture('html', 'problematic.html'), { parser: htmlParser });
  analyzeCssSource(fixture('css', 'responsive-risks.css'));
  const exported = stringifyAuditStateExport(createAuditStateExport({ selectedPresetId: 'dashboard', selectedRulePackId: 'all-rules', selectedSeverityProfileId: 'baseline', ruleStatuses: { 'manual-rule': 'pass' }, ruleSchemaVersion: 2 }));
  assert.equal(score.scorePercent, 100);
  assert.equal(exported.includes('html-analyzer'), false);
  assert.equal(exported.includes('css-analyzer'), false);
});

function assertFindingContracts(findings, source) {
  assertUniqueIssueIds(findings);
  assert.equal(new Set(findings.map((f) => f.issueId)).size, findings.length);
  findings.forEach((finding) => {
    assert.equal(finding.source, source);
    assert.equal(isAutomatedSource(finding.source), true);
    assert.ok(Object.values(FINDING_CONFIDENCE).includes(finding.confidence));
    assert.ok(['high', 'medium', 'low'].includes(finding.severity));
    assert.equal(finding.issueId.includes(finding.checkId), true);
    assert.ok(finding.evidence?.snippet?.trim());
    assert.equal(Number.isInteger(finding.evidence.occurrenceCount), true);
    assert.deepEqual(validateWcagMappings(finding.wcag), []);
    if (finding.checkId === 'repeated-literal-values' || finding.checkId === 'missing-responsive-patterns') assert.equal(finding.wcag, undefined);
  });
}
function assertIncludes(actual, expected) { expected.forEach((id) => assert.ok(actual.includes(id), `Expected ${id} in ${actual.join(', ')}`)); }
function assertExcludes(actual, forbidden) { forbidden.forEach((id) => assert.equal(actual.includes(id), false, `Did not expect ${id}`)); }

class Node {
  constructor(tagName, attrs = {}, parentElement = null) { this.tagName = tagName.toUpperCase(); this.attrs = attrs; this.parentElement = parentElement; this.children = []; this.textContent = ''; }
  hasAttribute(name) { return Object.hasOwn(this.attrs, name); }
  getAttribute(name) { return this.attrs[name] ?? null; }
  querySelectorAll(selector) { return queryAll(this, selector); }
  closest(selector) { for (let n = this.parentElement; n; n = n.parentElement) if (matchesAny(n, selector)) return n; return null; }
  get outerHTML() { const attrs = Object.entries(this.attrs).map(([k, v]) => v === '' ? k : `${k}="${v}"`).join(' '); return `<${this.tagName.toLowerCase()}${attrs ? ` ${attrs}` : ''}>${this.textContent}</${this.tagName.toLowerCase()}>`; }
}
function parseTestHtml(html) {
  const rootNode = new Node('document'); const stack = [rootNode]; const byId = new Map();
  const tokens = String(html).replace(/<!--([\s\S]*?)-->/g, '').match(/<[^>]+>|[^<]+/g) || [];
  for (const token of tokens) {
    if (!token.startsWith('<')) { stack.at(-1).textContent += token; continue; }
    if (/^<\//.test(token)) { if (stack.length > 1) stack.pop(); continue; }
    if (/^<!/.test(token)) continue;
    const [, tagRaw = '', attrRaw = ''] = token.match(/^<\s*([\w-]+)([^>]*)>/) || [];
    if (!tagRaw) continue;
    const node = new Node(tagRaw, attrs(attrRaw), stack.at(-1));
    stack.at(-1).children.push(node); if (node.attrs.id) byId.set(node.attrs.id, node);
    if (!/\/$/.test(attrRaw) && !['input', 'img', 'br', 'hr', 'meta', 'link'].includes(tagRaw.toLowerCase())) stack.push(node);
  }
  propagateText(rootNode);
  return { querySelectorAll: (selector) => queryAll(rootNode, selector), getElementById: (id) => byId.get(id) ?? null };
}
function attrs(raw) { const out = {}; for (const m of raw.matchAll(/([:\w-]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>/]+)))?/g)) out[m[1]] = m[3] ?? m[4] ?? m[5] ?? ''; return out; }
function propagateText(node) { for (const child of node.children) { propagateText(child); node.textContent += child.textContent; } }
function descendants(node) { return node.children.flatMap((c) => [c, ...descendants(c)]); }
function queryAll(rootNode, selector) { return [...new Set(selector.split(',').flatMap((part) => queryPart(rootNode, part.trim())))]; }
function queryPart(rootNode, selector) { if (selector.includes(' ')) { const [ancestor, desc] = selector.split(/\s+/, 2); return descendants(rootNode).filter((n) => matches(n, desc) && ancestors(n).some((a) => matches(a, ancestor))); } return descendants(rootNode).filter((n) => matches(n, selector)); }
function matchesAny(node, selector) { return selector.split(',').some((s) => matches(node, s.trim())); }
function matches(node, selector) {
  const attrMatch = selector.match(/^(?:(\w+))?\[([^=~*\]]+)([*]?=)?"?([^"\] ]*)"?\s*(i)?\]$/); if (attrMatch) { const [, tag, name, op, value, ci] = attrMatch; if (tag && node.tagName.toLowerCase() !== tag) return false; const actual = node.getAttribute(name); if (actual == null) return false; if (!op) return true; return op === '*=' ? String(actual).toLowerCase().includes(value.toLowerCase()) : (ci ? String(actual).toLowerCase() === value.toLowerCase() : String(actual) === value); }
  return node.tagName.toLowerCase() === selector.toLowerCase();
}
function ancestors(node) { const out = []; for (let n = node.parentElement; n; n = n.parentElement) out.push(n); return out; }
