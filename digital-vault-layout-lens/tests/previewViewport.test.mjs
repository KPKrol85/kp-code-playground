import test from 'node:test';
import assert from 'node:assert/strict';

import { PREVIEW_CSP, buildPreviewDocument, sanitizePreviewCss, sanitizePreviewHtml } from '../assets/js/previewDocument.js';
import { VIEWPORT_CONFIG, applyCustomViewport, applyPresetViewport, createInitialViewportState, normalizeCustomViewportWidth } from '../assets/js/viewportControls.js';
import { createAuditStateExport } from '../assets/js/auditStorage.js';

test('preview document removes executable and navigation-capable HTML', () => {
  const source = '<base href="https://evil.test/"><meta http-equiv="refresh" content="0;url=https://evil.test"><script>parent.pwned=1</script><button onclick="evil()">Go</button><a href="javascript:alert(1)" target="_top">bad</a><form action="https://evil.test"><input formaction="https://evil.test"></form><object data="x"></object><iframe src="https://evil.test"></iframe>';
  const sanitized = sanitizePreviewHtml(source);
  const doc = buildPreviewDocument({ html: source, css: '' });
  assert.doesNotMatch(sanitized, /<script>parent\.pwned/i);
  assert.match(doc, /kp-layout-lens-preview-inspection/);
  assert.doesNotMatch(sanitized, /onclick/i);
  assert.doesNotMatch(sanitized, /javascript:/i);
  assert.doesNotMatch(sanitized, /<base/i);
  assert.doesNotMatch(sanitized, /http-equiv="refresh"/i);
  assert.doesNotMatch(sanitized, /<object|<iframe/i);
  assert.doesNotMatch(sanitized, /formaction|action=/i);
});

test('preview CSP blocks remote resources and permits only inline styles, trusted inline inspection script, and local images', () => {
  assert.match(PREVIEW_CSP, /default-src 'none'/);
  assert.match(PREVIEW_CSP, /style-src 'unsafe-inline'/);
  assert.match(PREVIEW_CSP, /img-src data: blob:/);
  assert.match(PREVIEW_CSP, /script-src 'unsafe-inline'/);
  assert.match(PREVIEW_CSP, /connect-src 'none'/);
  assert.match(PREVIEW_CSP, /frame-src 'none'/);
  assert.match(buildPreviewDocument(), /Content-Security-Policy/);
});

test('remote CSS imports and URL references are neutralized', () => {
  const css = sanitizePreviewCss('@import url("https://fonts.example/css"); .x{background:url(https://evil.test/a.png); mask:url(/local.svg)} .ok{background:url(data:image/png;base64,abc)}');
  assert.doesNotMatch(css, /@import url/i);
  assert.doesNotMatch(css, /https:\/\//i);
  assert.match(css, /about:blank#blocked/);
  assert.match(css, /data:image\/png/);
});

test('preview document generation is deterministic and handles empty or malformed snippets', () => {
  assert.equal(buildPreviewDocument({ html: '<div><p>Test', css: '.x{color:red}' }), buildPreviewDocument({ html: '<div><p>Test', css: '.x{color:red}' }));
  assert.match(buildPreviewDocument(), /Preview is empty/);
  assert.doesNotThrow(() => sanitizePreviewHtml('<div><span></div><script>bad()'));
});

test('configured viewport presets resolve to expected widths', () => {
  assert.equal(VIEWPORT_CONFIG.presets.mobile.width, 390);
  assert.equal(VIEWPORT_CONFIG.presets.tablet.width, 768);
  assert.equal(VIEWPORT_CONFIG.presets.desktop.width, 1180);
  assert.equal(applyPresetViewport(createInitialViewportState(), 'mobile').width, 390);
});

test('custom viewport widths are safely normalized', () => {
  assert.deepEqual(normalizeCustomViewportWidth('1024'), { ok: true, width: 1024, reason: 'valid' });
  assert.deepEqual(normalizeCustomViewportWidth('100'), { ok: true, width: 320, reason: 'clamped-min' });
  assert.deepEqual(normalizeCustomViewportWidth('9999'), { ok: true, width: 1600, reason: 'clamped-max' });
  assert.equal(normalizeCustomViewportWidth('12.5').ok, false);
  assert.equal(normalizeCustomViewportWidth('').reason, 'empty');
  assert.equal(normalizeCustomViewportWidth('-1').ok, false);
  assert.equal(normalizeCustomViewportWidth('abc').ok, false);
});

test('custom viewport state does not modify analyzer input or audit export state', () => {
  const analyzer = { html: '<main></main>', css: 'main{display:grid}' };
  const audit = createAuditStateExport({ selectedPresetId: 'landing-page', selectedRulePackId: 'all-rules', selectedSeverityProfileId: 'baseline', ruleSchemaVersion: 2, ruleStatuses: { x: 'pass' }, ruleNotes: {} });
  const { state } = applyCustomViewport(createInitialViewportState(), '1200');
  assert.equal(state.active, 'custom');
  assert.deepEqual(analyzer, { html: '<main></main>', css: 'main{display:grid}' });
  assert.equal(JSON.stringify(audit).includes('viewport'), false);
});
