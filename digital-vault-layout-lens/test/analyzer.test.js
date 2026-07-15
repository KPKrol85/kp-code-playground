import test from 'node:test';
import assert from 'node:assert/strict';

import { analyzeHtmlSource } from '../assets/js/htmlAnalyzer.js';
import { validateAnalyzerSourceFile, MAX_ANALYZER_FILE_BYTES } from '../assets/js/localFileInput.js';

test('empty HTML returns an empty-input result without findings', () => {
  const result = analyzeHtmlSource('   ');
  assert.equal(result.status, 'empty');
  assert.deepEqual(result.findings, []);
});

test('DOMParser adapter is required outside browsers for non-empty HTML', () => {
  assert.throws(() => analyzeHtmlSource('<main><h1>Title</h1></main>'), /DOMParser is not available/);
});

test('stable analyzer issue IDs do not depend on finding order when parser supplies findings', () => {
  const parser = { parseFromString: () => fixtureDocument() };
  const first = analyzeHtmlSource('<main></main>', { parser }).findings.map((finding) => finding.issueId).sort();
  const second = analyzeHtmlSource('<main></main>', { parser }).findings.reverse().map((finding) => finding.issueId).sort();
  assert.deepEqual(first, second);
  assert.ok(first.includes('html-analyzer:headings-missing-h1'));
});

test('supported analyzer source files route by extension', () => {
  assert.deepEqual(validateAnalyzerSourceFile({ name: 'component.HTML', size: 10 }).kind, 'html');
  assert.deepEqual(validateAnalyzerSourceFile({ name: 'theme.css', size: 10 }).kind, 'css');
});

test('analyzer source file validation rejects unsafe inputs', () => {
  assert.equal(validateAnalyzerSourceFile({ name: 'notes.txt', size: 10 }).reason, 'unsupported');
  assert.equal(validateAnalyzerSourceFile({ name: 'empty.html', size: 0 }).reason, 'empty');
  assert.equal(validateAnalyzerSourceFile({ name: 'large.css', size: MAX_ANALYZER_FILE_BYTES + 1 }).reason, 'oversized');
});

function fixtureDocument() {
  const h2 = element('h2', {}, 'Subhead');
  const main = element('main');
  const input = element('input', { id: 'email' });
  const button = element('button');
  const link = element('a', { href: '#' });
  const img = element('img', { src: 'logo.svg' });
  const nodes = [h2, main, input, button, link, img];
  return {
    querySelectorAll(selector) {
      if (selector === 'h1,h2,h3,h4,h5,h6') return [h2];
      if (selector === 'main,[role="main"]') return [main];
      if (selector === 'ul a, ol a' || selector.includes('[class*="nav"')) return [];
      if (selector.includes('main,nav')) return [main];
      if (selector === 'label') return [];
      if (selector === 'input,select,textarea') return [input];
      if (selector === 'button,[role="button"]') return [button];
      if (selector === 'a') return [link];
      if (selector === 'img') return [img];
      if (selector.startsWith('label[for=')) return [];
      return nodes.filter((node) => node.tagName.toLowerCase() === selector);
    },
    getElementById() { return null; }
  };
}

function element(tagName, attrs = {}, textContent = '') {
  return {
    tagName: tagName.toUpperCase(),
    textContent,
    parentElement: null,
    hasAttribute(name) { return Object.prototype.hasOwnProperty.call(attrs, name); },
    getAttribute(name) { return attrs[name] ?? null; },
    querySelectorAll() { return []; },
    closest() { return null; }
  };
}

import { analyzeCssSource } from '../assets/js/cssAnalyzer.js';
import { validateWcagMappings } from '../assets/js/wcag.js';
import { validateRuleData, validateWcagField } from '../assets/js/ruleDataValidator.js';

test('empty CSS returns an empty-input result without findings', () => {
  const result = analyzeCssSource('  ');
  assert.equal(result.status, 'empty');
  assert.deepEqual(result.findings, []);
});

test('small valid CSS snippet does not produce responsive warnings', () => {
  assert.equal(analyzeCssSource('.icon{width:24px;height:24px}.card{max-width:60rem}').findings.length, 0);
});

test('CSS repeated literals flag threshold values but not custom properties', () => {
  const repeated = analyzeCssSource('.a{color:#fff;margin:16px}.b{background:#ffffff;padding:16px}.c{border-color:#fff;gap:16px}.d{color:#fff;border-radius:16px}').findings;
  assert.ok(repeated.some((f) => f.checkId === 'repeated-literal-values' && !f.wcag));
  const tokens = analyzeCssSource('.a{color:var(--c)}.b{color:var(--c)}.c{color:var(--c)}.d{color:var(--c)}').findings;
  assert.equal(tokens.length, 0);
});

test('CSS fixed width checks are conservative and responsive overrides reduce risk', () => {
  assert.ok(analyzeCssSource('.panel{width:720px}.modal{min-width:480px}').findings.some((f) => f.checkId === 'large-fixed-widths' && f.wcag?.[0].criterion === '1.4.10'));
  assert.equal(analyzeCssSource('@media (max-width: 40rem){.panel{width:720px}}').findings.some((f) => f.checkId === 'large-fixed-widths'), false);
});

test('CSS responsive pattern checks handle substantial, media, and container styles', () => {
  const substantial = Array.from({ length: 22 }, (_, i) => `.c${i}{width:400px;display:grid}`).join('\n');
  assert.ok(analyzeCssSource(substantial).findings.some((f) => f.checkId === 'missing-responsive-patterns'));
  assert.equal(analyzeCssSource('@media(max-width:40rem){.a{width:100%}} @container card (min-width:30rem){.b{display:grid}}').findings.length, 0);
});

test('CSS overflow risk checks detect unsafe and ignore safe handling', () => {
  const risky = analyzeCssSource('body{overflow-x:hidden}.label{white-space:nowrap}.grid{display:grid;grid-template-columns:360px 360px}.toast{position:fixed;width:420px}').findings.map((f) => f.checkId);
  assert.ok(risky.includes('overflow-x-hidden'));
  assert.ok(risky.includes('nowrap-without-overflow-strategy'));
  assert.ok(risky.includes('rigid-grid-tracks'));
  assert.ok(risky.includes('positioned-fixed-width'));
  assert.equal(analyzeCssSource('.label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}').findings.some((f) => f.checkId === 'nowrap-without-overflow-strategy'), false);
});

test('malformed CSS returns a clear error without throwing', () => {
  const result = analyzeCssSource('.card { width: 400px;');
  assert.equal(result.status, 'error');
  assert.deepEqual(result.findings, []);
});

test('CSS findings and issue IDs are deterministic and unique despite whitespace and comments', () => {
  const a = analyzeCssSource('/*x*/.a{color:#fff}.b{color:#ffffff}.c{color:#fff}.d{color:#fff;width:720px}').findings.map((f) => f.issueId).sort();
  const b = analyzeCssSource('.d { width:720px; color:#fff } .c{ color:#fff }.b{color:#fff}.a{color:#fff}').findings.map((f) => f.issueId).sort();
  assert.deepEqual(a, b);
  assert.equal(new Set(a).size, a.length);
});

test('WCAG metadata validation accepts optional and valid mappings', () => {
  assert.deepEqual(validateWcagMappings(undefined), []);
  assert.deepEqual(validateWcagMappings([{ criterion: '1.4.10', level: 'AA', title: 'Reflow' }]), []);
  assert.equal(validateRuleData().valid, true);
});

test('WCAG metadata validation rejects malformed entries', () => {
  assert.ok(validateWcagMappings([{ criterion: '1.4', level: 'AA', title: 'Reflow' }]).length);
  assert.ok(validateWcagMappings([{ criterion: '1.4.10', level: 'Gold', title: 'Reflow' }]).length);
  assert.ok(validateWcagMappings([{ criterion: '1.4.10', level: 'AA', title: 'Reflow' }, { criterion: '1.4.10', level: 'AA', title: 'Reflow' }]).length);
  const errors = validateWcagField([{ criterion: '1.4.10', level: 'AA', title: '' }]);
  assert.ok(errors.length);
});

test('relevant HTML findings have WCAG mappings', () => {
  const findings = analyzeHtmlSource('<main></main>', { parser: { parseFromString: () => fixtureDocument() } }).findings;
  assert.ok(findings.some((f) => f.checkId === 'images-missing-alt' && f.wcag?.[0].criterion === '1.1.1'));
  assert.ok(findings.some((f) => f.checkId === 'controls-unlabeled' && f.wcag?.some((w) => w.criterion === '3.3.2')));
});

import { assertUniqueIssueIds } from '../assets/js/issueIds.js';
import { calculateAuditScore } from '../assets/js/scoringEngine.js';
import { FINDING_CONFIDENCE, FINDING_SOURCES, MAX_EVIDENCE_SNIPPET_LENGTH, createEvidence } from '../assets/js/findingMetadata.js';

test('every HTML analyzer finding contains source confidence and concise evidence', () => {
  const findings = analyzeHtmlSource('<main></main>', { parser: { parseFromString: () => fixtureDocument() } }).findings;
  assert.ok(findings.length);
  findings.forEach((finding) => {
    assert.equal(finding.source, FINDING_SOURCES.htmlAnalyzer);
    assert.ok(Object.values(FINDING_CONFIDENCE).includes(finding.confidence));
    assert.ok(finding.evidence.snippet.length > 0);
    assert.ok(finding.evidence.snippet.length <= MAX_EVIDENCE_SNIPPET_LENGTH);
  });
  assert.equal(findings.find((f) => f.checkId === 'images-missing-alt').confidence, FINDING_CONFIDENCE.high);
  assert.equal(findings.find((f) => f.checkId === 'links-placeholder-href').evidence.snippet.includes('<a href="#">'), true);
});

test('HTML evidence is deterministic, normalized, counts multiple matches, and does not change issue IDs', () => {
  const many = [element('h1', {}, 'One'), element('h1', {}, 'Two')];
  many.forEach((el) => { el.outerHTML = `<h1> ${el.textContent} </h1>`; });
  const parser = { parseFromString: () => ({ querySelectorAll: (selector) => selector === 'h1,h2,h3,h4,h5,h6' ? many : [], getElementById() { return null; } }) };
  const first = analyzeHtmlSource('<h1>One</h1><h1>Two</h1>', { parser }).findings.find((f) => f.checkId === 'headings-multiple-h1');
  const second = analyzeHtmlSource('<h1> One </h1>\n<h1> Two </h1>', { parser }).findings.find((f) => f.checkId === 'headings-multiple-h1');
  assert.equal(first.evidence.snippet, second.evidence.snippet);
  assert.equal(first.evidence.occurrenceCount, 2);
  assert.equal(first.issueId, second.issueId);
});

test('every CSS analyzer finding contains source confidence and concise plain-text evidence', () => {
  const findings = analyzeCssSource('body{overflow-x:hidden}.label{white-space:nowrap}.grid{display:grid;grid-template-columns:360px 360px}.toast{position:fixed;width:420px}.a{color:#fff}.b{color:#fff}.c{color:#fff}.d{color:#fff}').findings;
  assert.ok(findings.length);
  findings.forEach((finding) => {
    assert.equal(finding.source, FINDING_SOURCES.cssAnalyzer);
    assert.ok(Object.values(FINDING_CONFIDENCE).includes(finding.confidence));
    assert.ok(finding.evidence.snippet.length > 0);
    assert.ok(finding.evidence.snippet.length <= MAX_EVIDENCE_SNIPPET_LENGTH);
    assert.equal(/<script|<style|javascript:/i.test(finding.evidence.snippet), false);
  });
  assert.equal(findings.find((f) => f.checkId === 'large-fixed-widths').confidence, FINDING_CONFIDENCE.medium);
});

test('CSS evidence is deterministic across irrelevant whitespace and comments', () => {
  const a = analyzeCssSource('/* ignored */ .a{color:#fff}.b{color:#fff}.c{color:#fff}.d{color:#fff}').findings.find((f) => f.checkId === 'repeated-literal-values');
  const b = analyzeCssSource('.a { color: #fff } .b{ color:#fff }.c{color:#fff}.d{color:#fff}').findings.find((f) => f.checkId === 'repeated-literal-values');
  assert.equal(a.evidence.snippet, b.evidence.snippet);
  assert.equal(a.evidence.occurrenceCount, 4);
  assert.equal(a.issueId, b.issueId);
});

test('finding metadata validation accepts and rejects controlled source and confidence values', () => {
  assert.doesNotThrow(() => assertUniqueIssueIds([{ issueId: 'manual:alpha-rule', source: FINDING_SOURCES.manualReview }]));
  assert.doesNotThrow(() => assertUniqueIssueIds([{ issueId: 'html-analyzer:alpha-rule', source: FINDING_SOURCES.htmlAnalyzer, confidence: FINDING_CONFIDENCE.high, evidence: createEvidence({ snippet: '<button></button>', occurrenceCount: 1 }) }]));
  assert.throws(() => assertUniqueIssueIds([{ issueId: 'manual:alpha-rule', source: 'manual' }]), /unsupported source/);
  assert.throws(() => assertUniqueIssueIds([{ issueId: 'html-analyzer:alpha-rule', source: FINDING_SOURCES.htmlAnalyzer, confidence: 'certain', evidence: createEvidence({ snippet: 'x' }) }]), /confidence/);
  assert.throws(() => assertUniqueIssueIds([{ issueId: 'html-analyzer:alpha-rule', source: FINDING_SOURCES.htmlAnalyzer, confidence: FINDING_CONFIDENCE.high, evidence: { snippet: '' } }]), /evidence snippet/);
});

test('analyzer findings remain separate from manual scoring and exports', () => {
  const score = calculateAuditScore([{ id: 'alpha-rule', category: 'Layout', title: 'Alpha', description: 'Alpha', severity: 'high' }], { 'alpha-rule': 'pass' });
  analyzeCssSource('.panel{width:720px}');
  assert.equal(score.scorePercent, 100);
});
