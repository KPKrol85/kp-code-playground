import { assertUniqueIssueIds, createIssueId } from './issueIds.js';
import { WCAG, cloneWcag } from './wcag.js';
import { FINDING_CONFIDENCE, FINDING_SOURCES, createEvidence, normalizeEvidenceSnippet } from './findingMetadata.js';

export const CSS_ANALYZER_SOURCE = FINDING_SOURCES.cssAnalyzer;
export const CSS_ANALYZER_THRESHOLDS = Object.freeze({ repeatedLiteralMinimum: 4, largeWidthPx: 360, largeMinWidthPx: 320, substantialDeclarationCount: 20, fixedWidthCountWithoutResponsive: 3, rigidGridTrackPx: 280 });
const LOW_SIGNAL = new Set(['0', '0px', 'none', 'auto', 'inherit', 'initial', 'unset', 'transparent', '100%', 'normal', 'currentcolor']);
const RESPONSIVE_RE = /@(media|container|supports)\b|\b(min|max|clamp|calc)\s*\(|\b(flex|fr|vw|svw|dvw|lvw|%)\b/i;

export function analyzeCssSource(css) {
  const source = typeof css === 'string' ? css : '';
  if (!source.trim()) return { findings: [], status: 'empty', message: 'CSS input is empty. Paste or load styles before running checks.' };
  const parsed = parseCssDeclarations(source);
  if (parsed.malformed) return { findings: [], status: 'error', message: 'CSS syntax appears incomplete, so static CSS checks were not run. Check for unclosed blocks or comments.' };
  const findings = [
    ...checkRepeatedLiterals(parsed),
    ...checkFixedWidths(parsed),
    ...checkMissingResponsivePatterns(parsed),
    ...checkOverflowRisks(parsed)
  ];
  return { findings: assertUniqueIssueIds(findings), status: 'analyzed', message: `CSS analysis complete with ${findings.length} findings.` };
}

export function parseCssDeclarations(css) {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, ' ');
  const malformed = /\/\*/.test(withoutComments) || braceBalance(withoutComments) !== 0;
  const blocks = [];
  const re = /([^{}@][^{}]*)\{([^{}]*)\}/g;
  let match;
  while ((match = re.exec(withoutComments))) {
    const selector = match[1].trim().replace(/\s+/g, ' ');
    const body = match[2];
    if (!selector || selector.includes('{')) continue;
    const declarations = body.split(';').map((part) => part.trim()).filter(Boolean).map((part) => {
      const idx = part.indexOf(':');
      if (idx < 1) return null;
      const property = part.slice(0, idx).trim().toLowerCase();
      const value = part.slice(idx + 1).trim().replace(/\s*!important$/i, '').replace(/\s+/g, ' ');
      if (!property || property.startsWith('--') || !value) return null;
      return { selector, property, value, snippet: declarationSnippet(selector, property, value), normalizedValue: normalizeValue(value), inResponsive: isResponsiveContext(withoutComments, match.index) || RESPONSIVE_RE.test(value) };
    }).filter(Boolean);
    if (declarations.length) blocks.push({ selector, declarations });
  }
  return { blocks, declarations: blocks.flatMap((block) => block.declarations), hasResponsiveRule: /@(media|container)\b/i.test(withoutComments), malformed };
}

function checkRepeatedLiterals(parsed) {
  const useful = parsed.declarations.filter((d) => isTokenCandidate(d));
  const groups = new Map();
  useful.forEach((d) => {
    const key = d.normalizedValue;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(d);
  });
  return [...groups.entries()].filter(([, items]) => items.length >= CSS_ANALYZER_THRESHOLDS.repeatedLiteralMinimum).map(([value, items]) => finding('repeated-literal-values', 'Repeated literal CSS value', 'Visual consistency', 'low', `The literal value "${value}" appears ${items.length} times across CSS declarations. This may be a design-token opportunity, not an automatic error.`, { repeatedValue: value, occurrenceCount: items.length, properties: stableUnique(items.map((i) => i.property)), examples: items.slice(0, 2) }));
}

function checkFixedWidths(parsed) {
  const risky = parsed.declarations.filter((d) => ['width', 'min-width'].includes(d.property) && !d.inResponsive).map((d) => ({ ...d, px: pxValue(d.value) })).filter((d) => d.px >= (d.property === 'width' ? CSS_ANALYZER_THRESHOLDS.largeWidthPx : CSS_ANALYZER_THRESHOLDS.largeMinWidthPx));
  if (!risky.length) return [];
  return [finding('large-fixed-widths', 'Large fixed width declarations', 'Responsive behavior', 'medium', `${risky.length} large width or min-width declaration(s) may need responsive constraints. This is a static reflow risk, not a confirmed WCAG failure.`, { occurrenceCount: risky.length, properties: stableUnique(risky.map((d) => d.property)), maxPixels: Math.max(...risky.map((d) => d.px)), examples: risky.slice(0, 2) }, [WCAG.reflow])];
}

function checkMissingResponsivePatterns(parsed) {
  const largeFixed = parsed.declarations.filter((d) => ['width', 'min-width'].includes(d.property) && pxValue(d.value) >= CSS_ANALYZER_THRESHOLDS.largeMinWidthPx);
  const layoutDecls = parsed.declarations.filter((d) => ['display', 'grid-template-columns', 'width', 'min-width', 'position'].includes(d.property));
  if (!parsed.hasResponsiveRule && parsed.declarations.length >= CSS_ANALYZER_THRESHOLDS.substantialDeclarationCount && (largeFixed.length >= CSS_ANALYZER_THRESHOLDS.fixedWidthCountWithoutResponsive || layoutDecls.length >= 6)) {
    return [finding('missing-responsive-patterns', 'Substantial CSS without responsive rules', 'Responsive behavior', 'low', 'This substantial stylesheet has desktop-constrained layout signals but no @media or @container rules. Treat this as a responsive-review prompt, not proof of failure.', { declarationCount: parsed.declarations.length, occurrenceCount: largeFixed.length, examples: largeFixed.slice(0, 2) })];
  }
  return [];
}

function checkOverflowRisks(parsed) {
  const risks = [];
  const overflowHidden = parsed.declarations.filter((d) => d.property === 'overflow-x' && /hidden/i.test(d.value));
  const nowrap = parsed.declarations.filter((d) => d.property === 'white-space' && /nowrap/i.test(d.value));
  const rigidGrid = parsed.declarations.filter((d) => d.property === 'grid-template-columns' && rigidGridRisk(d.value));
  const absFixed = parsed.blocks.filter((b) => b.declarations.some((d) => d.property === 'position' && /^(fixed|absolute)$/i.test(d.value)) && b.declarations.some((d) => ['width', 'min-width'].includes(d.property) && pxValue(d.value) >= CSS_ANALYZER_THRESHOLDS.largeMinWidthPx));
  if (overflowHidden.length) risks.push(finding('overflow-x-hidden', 'Horizontal overflow hidden', 'Responsive behavior', 'medium', 'overflow-x: hidden can mask content that does not reflow. Verify narrow viewports manually; this static check is a potential WCAG reflow risk only.', { occurrenceCount: overflowHidden.length, examples: overflowHidden.slice(0, 2) }, [WCAG.reflow]));
  if (nowrap.length && !parsed.declarations.some((d) => d.property.startsWith('text-overflow') || d.property === 'overflow-wrap')) risks.push(finding('nowrap-without-overflow-strategy', 'Nowrap text without overflow strategy', 'Responsive behavior', 'medium', 'white-space: nowrap appears without an obvious text-overflow or wrapping fallback, which can create horizontal overflow for text.', { occurrenceCount: nowrap.length, examples: nowrap.slice(0, 2) }, [WCAG.reflow]));
  if (rigidGrid.length) risks.push(finding('rigid-grid-tracks', 'Rigid wide grid tracks', 'Responsive behavior', 'medium', 'Grid columns use wide rigid pixel tracks that may exceed narrow viewports unless adapted elsewhere.', { occurrenceCount: rigidGrid.length, examples: rigidGrid.slice(0, 2) }, [WCAG.reflow]));
  if (absFixed.length) risks.push(finding('positioned-fixed-width', 'Positioned element with large fixed width', 'Responsive behavior', 'medium', 'Fixed or absolute positioned elements with large fixed widths can escape narrow layouts.', { occurrenceCount: absFixed.length, examples: absFixed.flatMap((b) => b.declarations.filter((d) => ['position', 'width', 'min-width'].includes(d.property))).slice(0, 3) }, [WCAG.reflow]));
  return risks;
}

function finding(checkId, title, category, severity, message, metadata = {}, wcag) { return { issueId: createIssueId({ source: CSS_ANALYZER_SOURCE, ruleId: checkId, discriminator: stableDiscriminator(metadata) }), ruleId: checkId, checkId, title, category, severity, message, source: CSS_ANALYZER_SOURCE, confidence: confidenceForCssCheck(checkId), evidence: evidenceForCssCheck(checkId, metadata), findingType: 'static-css', occurrenceCount: metadata.occurrenceCount || 0, metadata, ...(wcag ? { wcag: cloneWcag(wcag) } : {}) }; }
function stableDiscriminator(metadata) { return metadata.repeatedValue ? metadata.repeatedValue.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 32) || 'value' : undefined; }
function normalizeValue(v) { return v.trim().toLowerCase().replace(/#([0-9a-f])([0-9a-f])([0-9a-f])\b/gi, '#$1$1$2$2$3$3').replace(/\b0(px|rem|em|%)\b/g, '0').replace(/\s*,\s*/g, ', '); }
function isTokenCandidate(d) { const v = d.normalizedValue; if (LOW_SIGNAL.has(v) || /var\s*\(/i.test(v) || RESPONSIVE_RE.test(v)) return false; return /color|background|border|shadow|radius|gap|padding|margin|font-size|width|height/.test(d.property) && (/#|rgb\(|hsl\(|\b\d*\.?\d+(px|rem|em)\b|shadow/i.test(v)); }
function pxValue(v) { const m = String(v).match(/^(-?\d*\.?\d+)px$/i); return m ? Number(m[1]) : 0; }
function rigidGridRisk(v) { const values = [...String(v).matchAll(/(\d*\.?\d+)px/g)].map((m) => Number(m[1])); return values.length >= 2 && values.reduce((a,b)=>a+b,0) >= CSS_ANALYZER_THRESHOLDS.rigidGridTrackPx * 2 && !/minmax|min\(|clamp|fr/i.test(v); }
function stableUnique(values) { return [...new Set(values)].sort(); }
function braceBalance(text) { let n = 0; for (const ch of text) { if (ch === '{') n++; if (ch === '}') n--; if (n < 0) return -1; } return n; }
function isResponsiveContext(css, index) { const before = css.slice(0, index); const lastAt = Math.max(before.lastIndexOf('@media'), before.lastIndexOf('@container')); const lastClose = before.lastIndexOf('}'); return lastAt > lastClose; }

function declarationSnippet(selector, property, value) { return normalizeEvidenceSnippet(`${selector} { ${property}: ${value}; }`); }
function evidenceForCssCheck(checkId, metadata = {}) {
  const examples = Array.isArray(metadata.examples) ? metadata.examples : [];
  const exampleText = examples.map((d) => d.snippet || declarationSnippet(d.selector, d.property, d.value)).filter(Boolean).join(' ');
  const summary = checkId === 'repeated-literal-values' ? `Repeated value ${metadata.repeatedValue} in ${metadata.occurrenceCount} declarations (${(metadata.properties || []).join(', ')}).` : checkId === 'missing-responsive-patterns' ? `${metadata.declarationCount} declarations; ${metadata.occurrenceCount} large fixed width/min-width declarations; no @media or @container rules.` : exampleText;
  return createEvidence({ snippet: summary || `${checkId} static CSS evidence.`, location: examples[0]?.selector || 'stylesheet summary', occurrenceCount: metadata.occurrenceCount || 0 });
}
function confidenceForCssCheck(checkId) { return checkId === 'missing-responsive-patterns' ? FINDING_CONFIDENCE.low : FINDING_CONFIDENCE.medium; }
