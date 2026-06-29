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
const assumptionsEl = document.getElementById('assumptions');
const printButton = document.getElementById('print-summary');

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

function setAmountValidity(isValid, message = '') {
  amountInput.setAttribute('aria-invalid', String(!isValid));
  amountError.textContent = message;
}

function validateAmount(value, { markEmpty = true } = {}) {
  if (amountInput.value.trim() === '') {
    setAmountValidity(!markEmpty, markEmpty ? 'Wprowadź kwotę, aby uruchomić kalkulator.' : '');
    return false;
  }
  if (!Number.isFinite(value) || value <= 0) {
    setAmountValidity(false, 'Kwota musi być dodatnią liczbą.');
    return false;
  }
  if (value > 100000000) {
    setAmountValidity(false, 'Kwota jest zbyt duża dla wiarygodnych szacunków. Użyj mniejszej wartości.');
    return false;
  }
  setAmountValidity(true);
  return true;
}

function setEmptyState() {
  resultsEl.innerHTML = `<div class="empty-state"><strong>Wpisz kwotę i kliknij „Oblicz wyniki”.</strong><span>Zobaczysz kwotę netto, brutto, składki, PIT, koszt pracodawcy i porównanie umów.</span></div>`;
  comparisonBody.innerHTML = '<tr class="comparison-table__empty"><td colspan="5">Wpisz poprawną kwotę, aby zobaczyć porównanie umów i ranking.</td></tr>';
  comparisonContext.textContent = 'Po wpisaniu poprawnej kwoty ranking pokaże najwyższe netto albo najniższe wymagane brutto.';
  warningEl.textContent = TAX_CONFIG.notes.legalDisclaimer;
  printButton.hidden = true;
}

const periodLabel = (period) => (period === 'yearly' ? 'rocznie' : 'miesięcznie');

function renderResultRow(label, value) {
  return `<div class="result-row"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderAssumptions(state = readFormState()) {
  const active = [
    `Wybrany typ: ${contractLabels[state.contractType]}.`,
    `Kierunek: ${state.direction === 'grossToNet' ? 'brutto → netto' : 'netto → brutto'}, okres: ${periodLabel(state.period)}.`,
    state.contractType.startsWith('b2b') ? `B2B: ZUS ${state.options.zusType}, VAT informacyjny (${state.options.vatPayer ? 'zaznaczony' : 'niezaznaczony'}) — bez wpływu na wynik.` : 'Opcje B2B są ukryte i nie wpływają na ten typ umowy.',
    state.contractType === 'mandate' ? 'Umowa zlecenie: dobrowolna składka chorobowa jest w tej wersji wyłączona.' : '',
  ].filter(Boolean);

  assumptionsEl.innerHTML = `
    <div class="assumptions__meta">
      <span><strong>Rok/model:</strong> ${TAX_CONFIG.year}</span>
      <span><strong>Wersja reguł:</strong> ${TAX_CONFIG.modelVersion}</span>
      <span><strong>Ostatni przegląd:</strong> ${TAX_CONFIG.lastReviewed}</span>
    </div>
    <p>${TAX_CONFIG.notes.simplifiedModel}</p>
    <ul>${[...active, ...TAX_CONFIG.assumptions].map((item) => `<li>${item}</li>`).join('')}</ul>
    <p class="assumptions__disclaimer">${TAX_CONFIG.notes.adviceDisclaimer}</p>`;
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
    <p class="result-note">Wartości są zaokrąglone do groszy i przeliczone dla okresu: ${periodLabel(state.period)}.</p>`;
  printButton.hidden = false;
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
    ? `Ranking dla tej samej kwoty brutto, ${periodLabel(state.period)} (najwyższe netto = najwyżej).`
    : `Ranking dla tej samej kwoty netto, ${periodLabel(state.period)} (najniższe brutto = najwyżej).`;
}

function updateConditionalFields(state = readFormState()) {
  const isB2B = state.contractType.startsWith('b2b');
  b2bOptions.hidden = !isB2B;
  b2bOptions.querySelectorAll('input, select').forEach((control) => { control.disabled = !isB2B; });
  commonOptions.querySelector('#ppk').disabled = state.contractType !== 'employment';
  commonOptions.querySelector('#pit2').disabled = state.contractType.startsWith('b2b') || state.contractType === 'mandate' || state.contractType === 'specificWork';
  commonOptions.querySelector('#deductibleCosts').disabled = isB2B;
  customZus.hidden = !isB2B || state.options.zusType !== 'custom';
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
  const state = readFormState();
  updateConditionalFields(state);
  updateWarning(state);

  if (!shouldValidate && amountInput.value.trim() === '') {
    setAmountValidity(true);
    renderAssumptions(state);
    return setEmptyState();
  }
  if (!validateAmount(state.amount, { markEmpty: shouldValidate })) {
    printButton.hidden = true;
    return;
  }

  const monthlyAmount = annualize(state.amount, state.period);
  const result = state.direction === 'grossToNet' ? grossToNet(state.contractType, monthlyAmount, state.options) : netToGross(state.contractType, monthlyAmount, state.options);

  renderResults(result, state);
  renderAssumptions(state);
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
renderAssumptions(readFormState());

form.addEventListener('submit', (event) => {
  event.preventDefault();
  calculateAndRender();
});
form.addEventListener('input', () => calculateAndRender({ shouldValidate: false }));
form.addEventListener('change', () => calculateAndRender({ shouldValidate: false }));
form.addEventListener('reset', () => window.setTimeout(() => { history.replaceState(null, '', window.location.pathname); updateConditionalFields(); setAmountValidity(true); renderAssumptions(readFormState()); setEmptyState(); }, 0));
document.querySelectorAll('[data-amount]').forEach((button) => button.addEventListener('click', () => { amountInput.value = button.dataset.amount; calculateAndRender(); }));
printButton.addEventListener('click', () => window.print());

if (applyStateFromQuery()) calculateAndRender(); else { updateConditionalFields(); setEmptyState(); }
