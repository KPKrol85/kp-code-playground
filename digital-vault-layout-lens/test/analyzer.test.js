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
