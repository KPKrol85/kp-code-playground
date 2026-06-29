import { TAX_CONFIG } from './tax-config.js';
import { grossToNet, netToGross, generateComparison } from './calculations.js';
import { annualize, formatMoney, monthlyToPeriod, parseAmount } from './utils.js';

const THEME_STORAGE_KEY = 'digital-vault-theme';
const THEME_OPTIONS = new Set(['light', 'dark', 'system']);
const root = document.documentElement;
const systemThemeQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
let activeThemePreference = 'system';
let themeTransitionTimer = 0;

const form = document.getElementById('calculator-form');
const amountInput = document.getElementById('amount');
const resultsEl = document.getElementById('results');
const comparisonBody = document.querySelector('#comparison-table tbody');
const comparisonContext = document.getElementById('comparison-context');
const warningEl = document.getElementById('context-warning');
const b2bOptions = document.getElementById('b2b-options');
const customZus = document.getElementById('custom-zus');
const amountError = document.getElementById('amount-error');
const contractTypeSelect = document.getElementById('contractType');
const commonOptions = document.getElementById('common-options');
const assumptionsPanel = document.getElementById('assumptions-panel');
const printSummaryButton = document.getElementById('print-summary');

const contractLabels = {
  employment: 'umowa o pracę',
  mandate: 'umowa zlecenie',
  specificWork: 'umowa o dzieło',
  b2bScale: 'B2B skala podatkowa',
  b2bLinear: 'B2B podatek liniowy',
  b2bLumpSum: 'B2B ryczałt',
};

function normalizeThemePreference(value) {
  return THEME_OPTIONS.has(value) ? value : 'system';
}

function readStoredThemePreference() {
  try {
    return normalizeThemePreference(window.localStorage.getItem(THEME_STORAGE_KEY));
  } catch (error) {
    return 'system';
  }
}

function persistThemePreference(preference) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch (error) {}
}

function getSystemTheme() {
  return systemThemeQuery && systemThemeQuery.matches ? 'dark' : 'light';
}

function resolveTheme(preference) {
  return preference === 'system' ? getSystemTheme() : preference;
}

function updateThemeControls(preference, resolvedTheme) {
  document.querySelectorAll('[data-theme-option]').forEach((button) => {
    const isActive = button.dataset.themeOption === preference;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  const themeControl = document.querySelector('[data-theme-control]');
  if (themeControl) {
    themeControl.dataset.themePreference = preference;
    themeControl.dataset.resolvedTheme = resolvedTheme;
  }
}

function applyThemePreference(preference, { persist = false, animate = false } = {}) {
  const normalizedPreference = normalizeThemePreference(preference);
  const resolvedTheme = resolveTheme(normalizedPreference);
  const shouldAnimate = animate && root.classList.contains('theme-ready');

  window.clearTimeout(themeTransitionTimer);
  if (shouldAnimate) root.classList.add('theme-changing');

  activeThemePreference = normalizedPreference;
  root.dataset.theme = resolvedTheme;
  root.dataset.themePreference = normalizedPreference;
  root.style.colorScheme = resolvedTheme;

  if (persist) persistThemePreference(normalizedPreference);
  updateThemeControls(normalizedPreference, resolvedTheme);

  if (shouldAnimate) {
    themeTransitionTimer = window.setTimeout(() => root.classList.remove('theme-changing'), 260);
  } else {
    root.classList.remove('theme-changing');
  }
}

function initThemeControls() {
  const initialPreference = normalizeThemePreference(root.dataset.themePreference || readStoredThemePreference());
  applyThemePreference(initialPreference, { animate: false });

  document.querySelectorAll('[data-theme-option]').forEach((button) => {
    button.addEventListener('click', () => {
      applyThemePreference(button.dataset.themeOption, { persist: true, animate: true });
    });
  });

  if (systemThemeQuery) {
    const syncSystemTheme = () => {
      if (activeThemePreference === 'system') {
        applyThemePreference('system', { animate: true });
      }
    };

    if (typeof systemThemeQuery.addEventListener === 'function') {
      systemThemeQuery.addEventListener('change', syncSystemTheme);
    } else if (typeof systemThemeQuery.addListener === 'function') {
      systemThemeQuery.addListener(syncSystemTheme);
    }
  }

  window.requestAnimationFrame(() => root.classList.add('theme-ready'));
}

function readOptions() {
  return {
    under26: document.getElementById('under26').checked,
    ppk: document.getElementById('ppk').checked,
    pit2: document.getElementById('pit2').checked,
    deductibleCosts: document.getElementById('deductibleCosts').value,
    vatPayer: document.getElementById('vatPayer').checked,
    zusType: document.getElementById('zusType').value,
    customSocial: parseAmount(document.getElementById('customSocial').value),
    customHealth: parseAmount(document.getElementById('customHealth').value),
  };
}

function readFormState() {
  const formData = new FormData(form);
  return {
    amount: parseAmount(amountInput.value),
    direction: formData.get('direction'),
    period: formData.get('period'),
    contractType: formData.get('contractType'),
    options: readOptions(),
  };
}

function setAmountValidity(isInvalid) {
  amountInput.setAttribute('aria-invalid', String(isInvalid));
}

function validateAmount(value) {
  if (amountInput.value.trim() === '') {
    amountError.textContent = 'Wprowadź kwotę, aby uruchomić kalkulator.';
    setAmountValidity(true);
    return false;
  }
  if (!Number.isFinite(value) || value <= 0) {
    amountError.textContent = 'Kwota musi być dodatnią liczbą.';
    setAmountValidity(true);
    return false;
  }
  if (value > 100000000) {
    amountError.textContent = 'Kwota jest zbyt duża dla wiarygodnych szacunków. Użyj mniejszej wartości.';
    setAmountValidity(true);
    return false;
  }
  amountError.textContent = '';
  setAmountValidity(false);
  return true;
}

function renderAssumptionsPanel(state = readFormState()) {
  const isB2B = state.contractType.startsWith('b2b');
  const active = [
    `Wybrany typ: ${contractLabels[state.contractType]}.`,
    `PIT-2: ${state.options.pit2 && state.contractType === 'employment' ? 'uwzględniony dla UoP' : 'nie wpływa na wybrany typ w tym modelu'}.`,
    `PPK: ${state.options.ppk && state.contractType === 'employment' ? '2% po stronie pracownika dla UoP' : 'nieaktywne lub nie dotyczy wybranego typu'}.`,
    `KUP: ${isB2B ? 'nie stosujemy kosztów działalności B2B' : state.options.deductibleCosts}.`,
  ];
  if (isB2B) active.push(`ZUS B2B: ${state.options.zusType}; VAT: informacyjnie, bez wpływu na wynik.`);

  assumptionsPanel.innerHTML = `
    <h3 id="assumptions-title">Założenia kalkulacji</h3>
    <dl class="assumptions-panel__meta">
      <div><dt>Wersja reguł</dt><dd>${TAX_CONFIG.rulesVersion || `PL-${TAX_CONFIG.year}`}</dd></div>
      <div><dt>Rok modelu</dt><dd>${TAX_CONFIG.year}</dd></div>
      <div><dt>Ostatni przegląd</dt><dd>${TAX_CONFIG.lastReviewed || 'do uzupełnienia'}</dd></div>
    </dl>
    <ul>${[...active, ...TAX_CONFIG.assumptions].map((item) => `<li>${item}</li>`).join('')}</ul>
    <p>${TAX_CONFIG.notes.legalDisclaimer}</p>`;
}

function renderInactiveState({ invalid = false } = {}) {
  const title = invalid ? 'Popraw kwotę, aby odświeżyć wyniki.' : 'Wpisz kwotę i kliknij „Oblicz wyniki”.';
  const description = invalid
    ? 'Wyniki i ranking są ukryte, żeby nie sugerować aktualności poprzedniej kalkulacji.'
    : 'Zobaczysz kwotę netto, brutto, składki, PIT, koszt pracodawcy i porównanie umów.';
  const comparisonMessage = invalid
    ? 'Popraw kwotę wejściową, aby zobaczyć aktualny ranking form współpracy.'
    : 'Wpisz poprawną kwotę, aby zobaczyć ranking form współpracy.';

  resultsEl.innerHTML = `<div class="empty-state"><strong>${title}</strong><span>${description}</span></div>`;
  comparisonBody.innerHTML = `<tr><td colspan="5" class="comparison-empty">${comparisonMessage}</td></tr>`;
  comparisonContext.textContent = invalid
    ? 'Ranking zostanie przeliczony po podaniu poprawnej kwoty.'
    : 'Po wpisaniu poprawnej kwoty zobaczysz ranking: najwyższe netto albo najniższe wymagane brutto.';
  warningEl.textContent = TAX_CONFIG.notes.legalDisclaimer;
  printSummaryButton.hidden = true;
  if (!invalid) setAmountValidity(false);
  renderAssumptionsPanel(readFormState());
}

function setEmptyState() {
  renderInactiveState();
}

function setInvalidState() {
  renderInactiveState({ invalid: true });
}

const periodLabel = (period) => (period === 'yearly' ? 'rocznie' : 'miesięcznie');

function renderResultRow(label, value) {
  return `<div class="result-row"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderResults(data, state) {
  const gross = monthlyToPeriod(data.gross, state.period);
  const net = monthlyToPeriod(data.net, state.period);
  const pit = monthlyToPeriod(data.pit, state.period);
  const health = monthlyToPeriod(data.health, state.period);
  const socialTotal = monthlyToPeriod(data.socialTotal, state.period);
  const pension = monthlyToPeriod(data.social.pension, state.period);
  const disability = monthlyToPeriod(data.social.disability, state.period);
  const sickness = monthlyToPeriod(data.social.sickness, state.period);
  const ppk = monthlyToPeriod(data.ppk, state.period);
  const deductions = monthlyToPeriod(data.totalDeductions, state.period);
  const employerCost = data.employerCost ? monthlyToPeriod(data.employerCost, state.period) : null;

  resultsEl.innerHTML = `
    <div class="results-summary">
      <div class="metric metric--primary"><span>Netto ${periodLabel(state.period)}</span><strong>${formatMoney(net)}</strong></div>
      <div class="metric"><span>Brutto ${periodLabel(state.period)}</span><strong>${formatMoney(gross)}</strong></div>
      <div class="metric metric--accent"><span>Obciążenie</span><strong>${data.effectiveBurden.toFixed(2)}%</strong></div>
      <div class="metric"><span>Koszt pracodawcy</span><strong>${employerCost ? formatMoney(employerCost) : 'nie dotyczy'}</strong></div>
    </div>
    <div class="result-list" aria-label="Szczegóły kalkulacji">
      ${renderResultRow('Typ kalkulacji', `${contractLabels[state.contractType]} • ${state.direction === 'grossToNet' ? 'brutto → netto' : 'netto → brutto'}`)}
      ${renderResultRow('Suma składek społecznych', formatMoney(socialTotal))}
      ${renderResultRow('Składka emerytalna', formatMoney(pension))}
      ${renderResultRow('Składka rentowa', formatMoney(disability))}
      ${renderResultRow('Składka chorobowa', formatMoney(sickness))}
      ${renderResultRow('Składka zdrowotna', formatMoney(health))}
      ${renderResultRow('PIT / zaliczka podatkowa', formatMoney(pit))}
      ${renderResultRow('PPK pracownika', formatMoney(ppk))}
      ${renderResultRow('Łączne potrącenia', formatMoney(deductions))}
    </div>
    <p class="result-note">Wartości są zaokrąglone do groszy i przeliczone dla okresu: ${periodLabel(state.period)}. Model ma charakter orientacyjny.</p>`;
  printSummaryButton.hidden = false;
  renderAssumptionsPanel(state);
}

function renderComparison(items, state) {
  const sortedItems = [...items].sort((a, b) => (state.direction === 'netToGross' ? a.gross - b.gross : b.net - a.net));
  const maxNet = Math.max(...sortedItems.map((item) => item.net), 1);
  const minGross = Math.max(Math.min(...sortedItems.map((item) => item.gross)), 1);

  comparisonBody.innerHTML = sortedItems.map((item) => {
    const gross = monthlyToPeriod(item.gross, state.period);
    const net = monthlyToPeriod(item.net, state.period);
    const ratio = state.direction === 'netToGross' ? (minGross / Math.max(item.gross, 1)) * 100 : (item.net / maxNet) * 100;
    const bounded = Math.max(0, Math.min(100, ratio));
    return `<tr${item.label === contractLabels[state.contractType] ? ' class="is-active"' : ''}>
      <td data-label="Typ umowy"><strong>${item.label}</strong></td>
      <td data-label="Brutto">${formatMoney(gross)}</td>
      <td data-label="Netto">${formatMoney(net)}</td>
      <td data-label="Obciążenie">${item.effectiveBurden.toFixed(2)}%</td>
      <td data-label="Relacja"><div class="bar"><span class="bar__track"><span class="bar__fill" style="width:${bounded.toFixed(2)}%"></span></span><strong>${bounded.toFixed(0)}%</strong></div></td>
    </tr>`;
  }).join('');

  comparisonContext.textContent = state.direction === 'grossToNet'
    ? `Ranking dla tej samej kwoty brutto, ${periodLabel(state.period)} — najwyższy szacunkowy wynik netto jest najwyżej.`
    : `Ranking dla tej samej kwoty netto, ${periodLabel(state.period)} — najniższa wymagana kwota brutto/przychodu jest najwyżej.`;
}

function updateConditionalFields(state = readFormState()) {
  const isB2B = state.contractType.startsWith('b2b');
  const isSpecificWork = state.contractType === 'specificWork';
  const isEmployment = state.contractType === 'employment';

  b2bOptions.hidden = !isB2B;

  const under26Input = commonOptions.querySelector('#under26');
  const ppkInput = commonOptions.querySelector('#ppk');
  const pit2Input = commonOptions.querySelector('#pit2');
  const deductibleCostsSelect = commonOptions.querySelector('#deductibleCosts');

  under26Input.disabled = isB2B || isSpecificWork;
  ppkInput.disabled = !isEmployment;
  pit2Input.disabled = !isEmployment;
  deductibleCostsSelect.disabled = isB2B;

  if (under26Input.disabled) under26Input.checked = false;
  if (ppkInput.disabled) ppkInput.checked = false;

  customZus.hidden = state.options.zusType !== 'custom';
}

function updateWarning(state) {
  const requiresAccountingCheck = state.contractType.startsWith('b2b') || state.options.under26 || state.options.deductibleCosts === 'fifty' || state.options.zusType === 'custom';
  warningEl.textContent = requiresAccountingCheck ? TAX_CONFIG.notes.accountingCheck : TAX_CONFIG.notes.legalDisclaimer;
}

function syncQuery(state) {
  const params = new URLSearchParams();
  params.set('amount', amountInput.value);
  params.set('direction', state.direction);
  params.set('period', state.period);
  params.set('contractType', state.contractType);
  params.set('under26', state.options.under26 ? '1' : '0');
  params.set('ppk', state.options.ppk ? '1' : '0');
  params.set('pit2', state.options.pit2 ? '1' : '0');
  params.set('deductibleCosts', state.options.deductibleCosts);
  params.set('zusType', state.options.zusType);
  if (state.options.zusType === 'custom') {
    params.set('customSocial', String(state.options.customSocial || 0));
    params.set('customHealth', String(state.options.customHealth || 0));
  }
  history.replaceState(null, '', `?${params.toString()}`);
}

function calculateAndRender({ shouldValidate = true } = {}) {
  let state = readFormState();
  updateConditionalFields(state);
  state = readFormState();
  updateWarning(state);

  if (!shouldValidate && amountInput.value.trim() === '') return setEmptyState();
  if (!validateAmount(state.amount)) { setInvalidState(); return; }

  const monthlyAmount = annualize(state.amount, state.period);
  const result = state.direction === 'grossToNet' ? grossToNet(state.contractType, monthlyAmount, state.options) : netToGross(state.contractType, monthlyAmount, state.options);

  renderResults(result, state);
  renderComparison(generateComparison(monthlyAmount, state.options, state.direction), state);
  syncQuery(state);
}

function applyStateFromQuery() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('amount')) return false;
  amountInput.value = params.get('amount') || '';
  for (const radio of ['direction', 'period']) {
    const value = params.get(radio);
    const input = form.querySelector(`input[name="${radio}"][value="${value}"]`);
    if (input) input.checked = true;
  }
  const contractType = params.get('contractType');
  if (contractType && contractLabels[contractType]) contractTypeSelect.value = contractType;
  const ids = ['under26', 'ppk', 'pit2', 'vatPayer'];
  ids.forEach((id) => {
    const input = document.getElementById(id);
    const value = params.get(id);
    if (input && value !== null) input.checked = value === '1' || value === 'true';
  });
  ['deductibleCosts', 'zusType', 'customSocial', 'customHealth'].forEach((id) => {
    const el = document.getElementById(id);
    const value = params.get(id);
    if (el && value !== null) el.value = value;
  });
  return true;
}

initThemeControls();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  calculateAndRender();
});
form.addEventListener('input', () => calculateAndRender({ shouldValidate: false }));
form.addEventListener('change', () => calculateAndRender({ shouldValidate: false }));
form.addEventListener('reset', () => window.setTimeout(() => { history.replaceState(null, '', window.location.pathname); amountError.textContent = ''; updateConditionalFields(); setEmptyState(); }, 0));
printSummaryButton.addEventListener('click', () => window.print());
document.querySelectorAll('[data-amount]').forEach((button) => button.addEventListener('click', () => { amountInput.value = button.dataset.amount; calculateAndRender(); }));

if (applyStateFromQuery()) calculateAndRender(); else { updateConditionalFields(); setEmptyState(); }
