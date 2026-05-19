import { TAX_CONFIG } from './tax-config.js';
import { grossToNet, netToGross, generateComparison } from './calculations.js';
import { annualize, formatMoney, monthlyToPeriod } from './utils.js';

const form = document.getElementById('calculator-form');
const amountInput = document.getElementById('amount');
const resultsEl = document.getElementById('results');
const comparisonBody = document.querySelector('#comparison-table tbody');
const warningEl = document.getElementById('context-warning');
const b2bOptions = document.getElementById('b2b-options');
const customZus = document.getElementById('custom-zus');

function readOptions() {
  return {
    under26: document.getElementById('under26').checked,
    ppk: document.getElementById('ppk').checked,
    pit2: document.getElementById('pit2').checked,
    deductibleCosts: document.getElementById('deductibleCosts').value,
    vatPayer: document.getElementById('vatPayer').checked,
    zusType: document.getElementById('zusType').value,
    customSocial: Number(document.getElementById('customSocial').value),
    customHealth: Number(document.getElementById('customHealth').value),
  };
}

function renderResults(data, period) {
  const gross = monthlyToPeriod(data.gross, period);
  const net = monthlyToPeriod(data.net, period);
  const pit = monthlyToPeriod(data.pit, period);
  const health = monthlyToPeriod(data.health, period);
  const pension = monthlyToPeriod(data.social.pension, period);
  const disability = monthlyToPeriod(data.social.disability, period);
  const sickness = monthlyToPeriod(data.social.sickness, period);
  const employerCost = data.employerCost ? monthlyToPeriod(data.employerCost, period) : null;

  resultsEl.innerHTML = `
    <div class="result-row result-row--highlight"><span>Kwota brutto</span><strong>${formatMoney(gross)}</strong></div>
    <div class="result-row result-row--highlight"><span>Kwota netto</span><strong>${formatMoney(net)}</strong></div>
    <div class="result-row"><span>Podatek PIT</span><span>${formatMoney(pit)}</span></div>
    <div class="result-row"><span>Składka emerytalna</span><span>${formatMoney(pension)}</span></div>
    <div class="result-row"><span>Składka rentowa</span><span>${formatMoney(disability)}</span></div>
    <div class="result-row"><span>Składka chorobowa</span><span>${formatMoney(sickness)}</span></div>
    <div class="result-row"><span>Składka zdrowotna</span><span>${formatMoney(health)}</span></div>
    <div class="result-row"><span>Zaliczka podatkowa</span><span>${formatMoney(pit)}</span></div>
    <div class="result-row"><span>Koszt pracodawcy</span><span>${employerCost ? formatMoney(employerCost) : 'nie dotyczy'}</span></div>
    <div class="result-row"><span>Suma roczna netto</span><span>${formatMoney(monthlyToPeriod(data.net, 'yearly'))}</span></div>
  `;
}

function renderComparison(items, period) {
  comparisonBody.innerHTML = items.map((item) => {
    const gross = monthlyToPeriod(item.gross, period);
    const net = monthlyToPeriod(item.net, period);
    const burden = gross > 0 ? (1 - (net / gross)) * 100 : 0;
    return `<tr><td>${item.label}</td><td>${formatMoney(gross)}</td><td>${formatMoney(net)}</td><td>${burden.toFixed(2)}%</td></tr>`;
  }).join('');
}

function validateAmount(value) {
  const errorEl = document.getElementById('amount-error');
  if (!value && value !== 0) { errorEl.textContent = 'Wprowadź kwotę.'; return false; }
  if (Number.isNaN(value) || value < 0) { errorEl.textContent = 'Kwota musi być liczbą nieujemną.'; return false; }
  errorEl.textContent = '';
  return true;
}

function updateUI() {
  const amount = Number(amountInput.value);
  if (!validateAmount(amount)) {
    resultsEl.innerHTML = '<p>Uzupełnij poprawnie formularz, aby zobaczyć wyniki.</p>';
    comparisonBody.innerHTML = '';
    return;
  }

  const formData = new FormData(form);
  const direction = formData.get('direction');
  const period = formData.get('period');
  const contractType = formData.get('contractType');
  const options = readOptions();
  const monthlyAmount = annualize(amount, period);

  b2bOptions.hidden = !contractType.startsWith('b2b');
  customZus.hidden = options.zusType !== 'custom';

  warningEl.textContent = contractType.startsWith('b2b') || options.under26 || options.deductibleCosts === 'fifty'
    ? TAX_CONFIG.notes.accountingCheck
    : TAX_CONFIG.notes.legalDisclaimer;

  const result = direction === 'grossToNet'
    ? grossToNet(contractType, monthlyAmount, options)
    : netToGross(contractType, monthlyAmount, options);

  renderResults(result, period);
  renderComparison(generateComparison(monthlyAmount, options), period);
}

form.addEventListener('input', updateUI);
form.addEventListener('change', updateUI);
updateUI();
