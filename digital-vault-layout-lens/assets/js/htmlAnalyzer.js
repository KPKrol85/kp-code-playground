import { assertUniqueIssueIds, createIssueId } from './issueIds.js';

export const HTML_ANALYZER_SOURCE = 'html-analyzer';
const SEVERITY = { error: 'high', warning: 'medium', notice: 'low' };
const IGNORED_INPUT_TYPES = new Set(['hidden', 'submit', 'reset', 'button', 'image']);
const LANDMARK_SELECTORS = ['main', 'nav', 'header', 'footer', 'aside', 'section[aria-label]', 'section[aria-labelledby]', '[role="main"]', '[role="navigation"]', '[role="banner"]', '[role="contentinfo"]', '[role="complementary"]', '[role="region"]'];

export function analyzeHtmlSource(html, { parser } = {}) {
  const source = typeof html === 'string' ? html : '';
  if (!source.trim()) return { findings: [], status: 'empty', message: 'HTML input is empty. Paste or load markup before running checks.' };
  const document = parseHtmlToDetachedDocument(source, parser);
  const findings = [
    ...checkHeadings(document),
    ...checkLandmarks(document),
    ...checkFormLabels(document),
    ...checkButtons(document),
    ...checkLinks(document),
    ...checkImages(document)
  ];
  return { findings: assertUniqueIssueIds(findings), status: 'analyzed', message: `HTML analysis complete with ${findings.length} findings.` };
}

export function parseHtmlToDetachedDocument(html, parser) {
  const activeParser = parser || (typeof DOMParser !== 'undefined' ? new DOMParser() : null);
  if (!activeParser?.parseFromString) throw new Error('DOMParser is not available in this environment.');
  return activeParser.parseFromString(html, 'text/html');
}

function finding(ruleId, title, category, severity, message, elements = []) {
  return { issueId: createIssueId({ source: HTML_ANALYZER_SOURCE, ruleId }), ruleId, checkId: ruleId, title, category, severity, message, source: HTML_ANALYZER_SOURCE, affectedElementCount: elements.length, locations: elements.map(describeElement).filter(Boolean) };
}

function checkHeadings(doc) {
  const headings = all(doc, 'h1,h2,h3,h4,h5,h6');
  const out = [];
  if (!headings.length) out.push(finding('headings-missing', 'No headings found', 'accessibility', SEVERITY.warning, 'Add a meaningful heading structure so users can understand and navigate the page.'));
  const h1s = headings.filter((h) => h.tagName?.toLowerCase() === 'h1');
  if (!h1s.length) out.push(finding('headings-missing-h1', 'Missing h1', 'accessibility', SEVERITY.warning, 'Add one primary h1 that describes the page.', headings.slice(0, 1)));
  if (h1s.length > 1) out.push(finding('headings-multiple-h1', 'Multiple h1 elements', 'accessibility', SEVERITY.warning, 'Use one primary h1 for the page when possible.', h1s));
  const empty = headings.filter((h) => !text(h));
  if (empty.length) out.push(finding('headings-empty', 'Empty heading elements', 'accessibility', SEVERITY.error, 'Headings need meaningful text or an accessible name.', empty));
  const skipped = [];
  let previous = 0;
  headings.forEach((h) => { const level = Number(h.tagName.slice(1)); if (previous && level > previous + 1) skipped.push(h); previous = level; });
  if (skipped.length) out.push(finding('headings-skipped-level', 'Skipped heading levels', 'accessibility', SEVERITY.notice, 'Heading levels should not jump over intermediate levels.', skipped));
  return out;
}

function checkLandmarks(doc) {
  const out = [];
  const mains = all(doc, 'main,[role="main"]');
  if (!mains.length) out.push(finding('landmarks-missing-main', 'Missing main landmark', 'accessibility', SEVERITY.warning, 'Add a main element or role="main" around the primary page content.'));
  if (mains.length > 1) out.push(finding('landmarks-multiple-main', 'Multiple main landmarks', 'accessibility', SEVERITY.error, 'Use only one main landmark for the primary page content.', mains));
  const navLike = all(doc, 'ul a, ol a').length >= 3 || all(doc, '[class*="nav" i] a, [id*="nav" i] a, [class*="menu" i] a, [id*="menu" i] a').length >= 2;
  if (navLike && !all(doc, 'nav,[role="navigation"]').length) out.push(finding('landmarks-missing-navigation', 'Navigation-like links without nav landmark', 'accessibility', SEVERITY.notice, 'Wrap navigation-like groups of links in nav or role="navigation".'));
  const landmarks = all(doc, LANDMARK_SELECTORS.join(','));
  ['navigation', 'complementary', 'region'].forEach((type) => {
    const group = landmarks.filter((el) => landmarkType(el) === type);
    const unnamed = group.length > 1 ? group.filter((el) => !accessibleName(el, doc)) : [];
    if (unnamed.length) out.push(finding(`landmarks-unnamed-${type}`, 'Repeated landmarks need names', 'accessibility', SEVERITY.notice, `Multiple ${type} landmarks should have useful accessible names.`, unnamed));
  });
  return out;
}

function checkFormLabels(doc) {
  const out = [];
  const labels = all(doc, 'label');
  const emptyLabels = labels.filter((label) => !text(label) && !accessibleName(label, doc));
  const invalidFor = labels.filter((label) => label.hasAttribute('for') && !doc.getElementById(label.getAttribute('for')));
  const missingFor = labels.filter((label) => !label.hasAttribute('for') && !all(label, 'input,select,textarea').length);
  if (emptyLabels.length) out.push(finding('labels-empty', 'Empty labels', 'accessibility', SEVERITY.error, 'Labels need meaningful text.', emptyLabels));
  if (invalidFor.length || missingFor.length) out.push(finding('labels-invalid-for', 'Labels with missing or invalid associations', 'accessibility', SEVERITY.error, 'Use a valid for/id pair or wrap the control in the label.', [...invalidFor, ...missingFor]));
  const controls = all(doc, 'input,select,textarea').filter((el) => !(el.tagName.toLowerCase() === 'input' && IGNORED_INPUT_TYPES.has((el.getAttribute('type') || 'text').toLowerCase())));
  const unlabeled = controls.filter((control) => !accessibleName(control, doc) && !associatedLabels(control, doc).some((label) => text(label) || accessibleName(label, doc)));
  if (unlabeled.length) out.push(finding('controls-unlabeled', 'Form controls without labels', 'accessibility', SEVERITY.error, 'Every form control needs an associated label or valid accessible name.', unlabeled));
  return out;
}

function checkButtons(doc) {
  const buttons = all(doc, 'button,[role="button"]');
  const empty = buttons.filter((button) => !text(button) && !accessibleName(button, doc));
  const nested = buttons.filter((button) => all(button, 'a,button,input,select,textarea').length);
  return [...(empty.length ? [finding('buttons-empty-name', 'Buttons without accessible names', 'accessibility', SEVERITY.error, 'Buttons need visible text or a valid aria-label/aria-labelledby name.', empty)] : []), ...(nested.length ? [finding('buttons-nested-interactive', 'Buttons contain nested interactive controls', 'accessibility', SEVERITY.error, 'Do not nest links, controls, or buttons inside buttons.', nested)] : [])];
}

function checkLinks(doc) {
  const links = all(doc, 'a');
  const unnamed = links.filter((link) => !text(link) && !accessibleName(link, doc));
  const missingHref = links.filter((link) => !link.hasAttribute('href') || !link.getAttribute('href')?.trim());
  const placeholders = links.filter((link) => ['#', 'javascript:void(0)', 'javascript:;'].includes((link.getAttribute('href') || '').trim().toLowerCase()));
  return [...(unnamed.length ? [finding('links-empty-name', 'Links without accessible names', 'accessibility', SEVERITY.error, 'Links need descriptive text or a valid accessible name.', unnamed)] : []), ...(missingHref.length ? [finding('links-missing-href', 'Links with missing or empty href', 'accessibility', SEVERITY.warning, 'Links need a real destination or should be buttons when they trigger actions.', missingHref)] : []), ...(placeholders.length ? [finding('links-placeholder-href', 'Placeholder links', 'accessibility', SEVERITY.notice, 'Avoid placeholder href values such as # for real links.', placeholders)] : [])];
}

function checkImages(doc) {
  const images = all(doc, 'img');
  const missingAlt = images.filter((img) => !img.hasAttribute('alt'));
  const badSrc = images.filter((img) => !img.hasAttribute('src') || !img.getAttribute('src')?.trim() || img.getAttribute('src')?.trim() === '#');
  const suspiciousEmptyAlt = images.filter((img) => img.hasAttribute('alt') && img.getAttribute('alt') === '' && (img.closest('a,button') || /logo|avatar|photo|icon|chart|graph/i.test(`${img.getAttribute('src') || ''} ${img.getAttribute('class') || ''} ${img.getAttribute('id') || ''}`)) && img.getAttribute('role') !== 'presentation');
  return [...(missingAlt.length ? [finding('images-missing-alt', 'Images missing alt attributes', 'accessibility', SEVERITY.error, 'Images need alt text or alt="" when decorative.', missingAlt)] : []), ...(suspiciousEmptyAlt.length ? [finding('images-suspicious-empty-alt', 'Possibly informative images with empty alt text', 'accessibility', SEVERITY.notice, 'Only decorative images should use empty alt text.', suspiciousEmptyAlt)] : []), ...(badSrc.length ? [finding('images-invalid-src', 'Images with empty or invalid src', 'accessibility', SEVERITY.warning, 'Images should reference a valid source when included in markup.', badSrc)] : [])];
}

function all(root, selector) { return Array.from(root?.querySelectorAll?.(selector) || []); }
function text(el) { return (el?.textContent || '').replace(/\s+/g, ' ').trim(); }
function accessibleName(el, doc) {
  const aria = el.getAttribute?.('aria-label')?.trim();
  if (aria) return aria;
  const labelledby = el.getAttribute?.('aria-labelledby')?.trim();
  if (labelledby) return labelledby.split(/\s+/).map((id) => text(doc.getElementById(id))).join(' ').trim();
  const title = el.getAttribute?.('title')?.trim();
  return title || '';
}
function associatedLabels(control, doc) {
  const id = control.getAttribute('id');
  return [...(id ? all(doc, `label[for="${cssEscape(id)}"]`) : []), ...ancestors(control).filter((el) => el.tagName?.toLowerCase() === 'label')];
}
function ancestors(el) { const out = []; for (let node = el.parentElement; node; node = node.parentElement) out.push(node); return out; }
function cssEscape(value) { return String(value).replace(/["\\]/g, '\\$&'); }
function landmarkType(el) { const role = el.getAttribute('role'); if (role) return role; const tag = el.tagName.toLowerCase(); return tag === 'nav' ? 'navigation' : tag === 'aside' ? 'complementary' : tag === 'section' ? 'region' : tag; }
function describeElement(el) { const tag = el.tagName?.toLowerCase(); if (!tag) return ''; const id = el.getAttribute('id'); return id ? `${tag}#${id}` : tag; }
