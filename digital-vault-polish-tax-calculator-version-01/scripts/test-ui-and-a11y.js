import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

async function test(name, callback) {
  try {
    await callback();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    throw error;
  }
}

function attributes(markup) {
  return Object.fromEntries([...markup.matchAll(/([\w-]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g)]
    .slice(1)
    .map(([, key, value = '']) => [key, value.replace(/^['"]|['"]$/g, '')]));
}

function runStaticAccessibilityChecks() {
  const ids = [...html.matchAll(/\bid=("[^"]*"|'[^']*')/g)].map(([, value]) => value.slice(1, -1));
  assert.equal(new Set(ids).size, ids.length, 'IDs must be unique');

  const allAriaReferences = [...html.matchAll(/\baria-(?:describedby|labelledby)=("[^"]*"|'[^']*')/g)]
    .flatMap(([, value]) => value.slice(1, -1).trim().split(/\s+/));
  allAriaReferences.forEach((id) => assert.ok(ids.includes(id), `ARIA reference #${id} must exist`));

  const labelsFor = new Set([...html.matchAll(/<label\b[^>]*\bfor=("[^"]*"|'[^']*')[^>]*>/g)]
    .map(([, value]) => value.slice(1, -1)));
  for (const [, tag, rawAttributes] of html.matchAll(/<(input|select)\b([^>]*)>/g)) {
    const attrs = attributes(rawAttributes);
    if (!attrs.id || attrs.type === 'hidden') continue;
    const isWrappedByLabel = new RegExp(`<label\\b[^>]*>[\\s\\S]*?<${tag}\\b[^>]*\\bid=["']${attrs.id}["']`).test(html);
    assert.ok(labelsFor.has(attrs.id) || isWrappedByLabel || attrs['aria-label'] || attrs['aria-labelledby'], `#${attrs.id} needs an accessible name`);
  }

  assert.match(html, /<p id="amount-error"[^>]*aria-live="polite"/, 'amount error must be a polite live region');
  assert.match(html, /<input id="amount"[^>]*aria-describedby="[^"]*amount-error/, 'amount input must describe its error');
  assert.match(html, /<input id="amount"[^>]*aria-errormessage="amount-error"/, 'amount input must associate its error message');
  ['customSocial', 'customHealth'].forEach((id) => {
    const input = html.match(new RegExp(`<input[^>]*\\bid="${id}"[^>]*>`))?.[0] || '';
    assert.match(input, new RegExp(`aria-describedby="[^"]*${id}-error`), `${id} must describe its error`);
    assert.match(input, new RegExp(`aria-errormessage="${id}-error"`), `${id} must associate its error message`);
    assert.match(html, new RegExp(`<p id="${id}-error"[^>]*aria-live="polite"`), `${id} error must be a polite live region`);
  });
  assert.match(html, /<div id="results"[^>]*aria-live="polite"/, 'results must be a polite live region');
  assert.equal((html.match(/<fieldset\b/g) || []).length, (html.match(/<legend>/g) || []).length, 'each fieldset must have a legend');
  assert.match(html, /<html lang="pl">/, 'document language is required');
  assert.match(html, /<title>[^<]+<\/title>/, 'document title is required');
  assert.match(html, /<main\b/, 'main landmark is required');
  assert.match(html, /<h1\b/, 'one primary heading is required');
  const buttons = [...html.matchAll(/<button\b[^>]*>/g)].map(([button]) => button);
  assert.ok(buttons.every((button) => /\btype="(?:button|submit|reset)"/.test(button)), 'buttons use native keyboard-operable controls');
}

class Element {
  constructor(id, { value = '', checked = false, defaultValue = value, defaultChecked = checked } = {}) {
    this.id = id; this.value = value; this.checked = checked; this.defaultValue = defaultValue; this.defaultChecked = defaultChecked;
    this.hidden = false; this.disabled = false; this.textContent = ''; this.innerHTML = ''; this.dataset = {}; this.attributes = {}; this.listeners = {};
    this.style = {}; this.classList = { add() {}, remove() {}, contains() { return false; }, toggle() {} };
  }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  focus() { document.activeElement = this; }
  addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); }
  emit(type) { for (const listener of this.listeners[type] || []) listener({ preventDefault() {} }); }
}

const elements = Object.fromEntries([
  ['amount', { value: '' }], ['amount-error', {}], ['results', {}], ['comparison-context', {}], ['context-warning', {}], ['b2b-options', {}], ['custom-zus', {}],
  ['contractType', { value: 'employment', defaultValue: 'employment' }], ['under26', {}], ['ppk', {}], ['pit2', { checked: true }], ['deductibleCosts', { value: 'standard', defaultValue: 'standard' }],
  ['vatPayer', { checked: true }], ['zusType', { value: 'full', defaultValue: 'full' }], ['customSocial', { value: '0' }], ['customHealth', { value: '0' }], ['customSocial-error', {}], ['customHealth-error', {}], ['assumptions-panel', {}], ['print-summary', {}],
].map(([id, options]) => [id, new Element(id, options)]));
const direction = { grossToNet: new Element('grossToNet', { checked: true }), netToGross: new Element('netToGross') };
const period = { monthly: new Element('monthly', { checked: true }), yearly: new Element('yearly') };
const form = new Element('calculator-form');
const comparisonBody = new Element('comparison-body');
const commonOptions = new Element('common-options');
commonOptions.querySelector = (selector) => elements[selector.slice(1)];
form.querySelector = (selector) => {
  const match = selector.match(/name="(direction|period)"\]\[value="([^"]+)"/);
  if (!match) return null;
  const group = match[1] === 'direction' ? direction : period;
  const input = group[match[2]];
  if (!input) return null;
  return { set checked(value) { if (value) Object.values(group).forEach((item) => { item.checked = false; }); input.checked = value; } };
};

globalThis.document = {
  documentElement: new Element('root'),
  activeElement: null,
  getElementById(id) { return id === 'calculator-form' ? form : id === 'common-options' ? commonOptions : elements[id]; },
  querySelector(selector) { return selector === '#comparison-table tbody' ? comparisonBody : null; },
  querySelectorAll() { return []; },
};
globalThis.FormData = class { get(name) { const values = name === 'direction' ? direction : name === 'period' ? period : null; return values ? Object.entries(values).find(([, input]) => input.checked)?.[0] : elements[name]?.value; } };
const timers = [];
globalThis.window = {
  location: { search: '', pathname: '/index.html' },
  matchMedia: () => ({ matches: false, addEventListener() {} }), localStorage: { getItem() { return null; }, setItem() {} },
  clearTimeout() {}, setTimeout(callback) { timers.push(callback); return timers.length; }, requestAnimationFrame(callback) { callback(); }, print() {},
};
globalThis.history = { replaceState(_state, _title, url) { window.location.search = url.startsWith('?') ? url : ''; } };

await import('../js/main.js');

function submit() { form.emit('submit'); }
function resetToDefaults() { Object.values(elements).forEach((element) => { element.value = element.defaultValue; element.checked = element.defaultChecked; }); direction.grossToNet.checked = true; direction.netToGross.checked = false; period.monthly.checked = true; period.yearly.checked = false; }

await test('static accessibility and document checks pass', runStaticAccessibilityChecks);
await test('valid gross-to-net submission renders formatted results and updates the URL', () => {
  elements.amount.value = '10000'; submit();
  assert.match(elements.results.innerHTML, /Netto miesięcznie/); assert.match(elements.results.innerHTML, /zł/);
  assert.equal(elements['print-summary'].hidden, false); assert.match(comparisonBody.innerHTML, /<tr/); assert.match(window.location.search, /direction=grossToNet/);
});
await test('empty submission keeps focus at the amount field and clears stale result content', () => {
  elements.amount.value = '10000'; submit();
  assert.match(elements.results.innerHTML, /Netto miesięcznie/); assert.match(comparisonBody.innerHTML, /<tr/);

  elements.amount.value = ''; submit();
  assert.match(elements['amount-error'].textContent, /Wprowadź kwotę/); assert.equal(elements.amount.attributes['aria-invalid'], 'true'); assert.equal(document.activeElement, elements.amount);
  assert.match(elements.results.innerHTML, /Wyniki i ranking są ukryte/); assert.doesNotMatch(comparisonBody.innerHTML, /umowa o pracę/); assert.equal(elements['print-summary'].hidden, true);
});
await test('zero, negative, malformed, and unusually large values show specific field errors without changing the entered value', () => {
  const cases = [
    ['0', /większa od zera/],
    ['-5', /większa od zera/],
    ['nie-liczba', /formacie liczbowym/],
    ['100000001', /zbyt duża/],
  ];

  cases.forEach(([value, message]) => {
    elements.amount.value = value; submit();
    assert.equal(elements.amount.value, value); assert.match(elements['amount-error'].textContent, message); assert.equal(elements.amount.attributes['aria-invalid'], 'true');
    assert.equal(document.activeElement, elements.amount); assert.match(elements.results.innerHTML, /Wyniki i ranking są ukryte/); assert.doesNotMatch(comparisonBody.innerHTML, /umowa o pracę/);
  });
});
await test('a corrected amount clears the error and calculates again after an invalid submission', () => {
  elements.amount.value = '-1'; submit();
  assert.match(elements.results.innerHTML, /Wyniki i ranking są ukryte/);
  elements.amount.value = '10000'; submit();
  assert.equal(elements['amount-error'].textContent, ''); assert.equal(elements.amount.attributes['aria-invalid'], 'false');
  assert.match(elements.results.innerHTML, /Netto miesięcznie/); assert.match(comparisonBody.innerHTML, /umowa o pracę/);
});
await test('gross-to-net and net-to-gross directions update their result description', () => {
  elements.amount.value = '10000'; direction.grossToNet.checked = false; direction.netToGross.checked = true; submit();
  assert.match(elements.results.innerHTML, /netto → brutto/); assert.match(elements['comparison-context'].textContent, /najniższa wymagana/);
  direction.grossToNet.checked = true; direction.netToGross.checked = false; submit(); assert.match(elements.results.innerHTML, /brutto → netto/);
});
await test('custom B2B contributions validate their own fields, retain entered text, and recalculate after correction', () => {
  resetToDefaults(); elements.amount.value = '10000'; elements.contractType.value = 'b2bLinear'; elements.zusType.value = 'custom';
  elements.customSocial.value = ''; elements.customHealth.value = '100'; submit();
  assert.match(elements['customSocial-error'].textContent, /Wprowadź miesięczną/); assert.equal(elements.customSocial.value, ''); assert.equal(elements.customSocial.attributes['aria-invalid'], 'true'); assert.equal(document.activeElement, elements.customSocial);
  assert.match(elements.results.innerHTML, /Wyniki i ranking są ukryte/);

  [['0', '0'], ['123.45', '67,89'], ['999999999999', '1']].forEach(([social, health]) => {
    elements.customSocial.value = social; elements.customHealth.value = health; submit();
    assert.equal(elements['customSocial-error'].textContent, ''); assert.equal(elements['customHealth-error'].textContent, ''); assert.match(elements.results.innerHTML, /B2B podatek liniowy/);
  });
  elements.customSocial.value = '-1'; elements.customHealth.value = 'nie-liczba'; submit();
  assert.match(elements['customSocial-error'].textContent, /nie może być ujemna/); assert.match(elements['customHealth-error'].textContent, /formacie liczbowym/);
  assert.equal(elements.customSocial.value, '-1'); assert.equal(elements.customHealth.value, 'nie-liczba');
  elements.customSocial.value = '123.45'; elements.customHealth.value = '67,89'; submit();
  assert.match(elements.results.innerHTML, /B2B podatek liniowy/); assert.equal(elements.customSocial.attributes['aria-invalid'], 'false');
});
await test('contract switching clears unsupported active options and stale custom errors', () => {
  elements.contractType.value = 'b2bScale'; elements.zusType.value = 'custom'; elements.customSocial.value = '-5'; elements.customHealth.value = '10'; elements.amount.value = '10000'; submit();
  assert.notEqual(elements['customSocial-error'].textContent, '');
  elements.under26.checked = true; elements.ppk.checked = true; elements.pit2.checked = true; elements.deductibleCosts.value = 'fifty'; elements.contractType.value = 'specificWork'; form.emit('change');
  assert.equal(elements.zusType.value, 'full'); assert.equal(elements.vatPayer.checked, false); assert.equal(elements.under26.checked, false); assert.equal(elements.ppk.checked, false); assert.equal(elements.pit2.checked, false); assert.equal(elements.deductibleCosts.value, 'fifty');
  assert.equal(elements['customSocial-error'].textContent, ''); assert.equal(elements['custom-zus'].hidden, true); assert.equal(elements.zusType.disabled, true);
  elements.contractType.value = 'b2bScale'; form.emit('change'); assert.equal(elements.zusType.value, 'full'); assert.equal(elements.deductibleCosts.value, 'standard'); assert.equal(elements.zusType.disabled, false); assert.match(elements.results.innerHTML, /B2B skala podatkowa/);
});
await test('reset clears state, URL, and visible results', () => {
  elements.amount.value = '6000'; submit(); resetToDefaults(); form.emit('reset'); timers.splice(0).forEach((callback) => callback());
  assert.equal(window.location.search, ''); assert.equal(elements['amount-error'].textContent, ''); assert.match(elements.results.innerHTML, /Wpisz kwotę/);
});
await test('supported URL state restores options and calculates a yearly net-to-gross result', async () => {
  window.location.search = '?amount=120000&direction=netToGross&period=yearly&contractType=b2bLinear&under26=1&zusType=custom&customSocial=100&customHealth=200';
  // Re-import with a cache-busting URL so module startup applies the query state.
  await import(`../js/main.js?restore=${Date.now()}`);
  assert.equal(elements.contractType.value, 'b2bLinear'); assert.equal(period.yearly.checked, true); assert.equal(direction.netToGross.checked, true);
  assert.equal(elements.customSocial.value, '100'); assert.match(elements.results.innerHTML, /Netto rocznie/); assert.match(elements['comparison-context'].textContent, /najniższa wymagana/);
});
await test('incompatible URL B2B options are ignored for a non-B2B contract', async () => {
  window.location.search = '?amount=10000&contractType=employment&zusType=custom&customSocial=-5&customHealth=not-a-number';
  await import(`../js/main.js?incompatible=${Date.now()}`);
  assert.equal(elements.contractType.value, 'employment'); assert.equal(elements.zusType.value, 'full'); assert.equal(elements['custom-zus'].hidden, true);
  assert.equal(elements['customSocial-error'].textContent, ''); assert.match(elements.results.innerHTML, /umowa o pracę/);
});
