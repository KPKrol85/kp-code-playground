import { generateComparison, grossToNet, netToGross, calculateEmployerCost, byPeriod } from "./calculations.js";
import { formatCurrency, parseAmount, round2 } from "./utils.js";
import { TAX_CONFIG } from "./tax-config.js";

const form = document.getElementById("calculator-form");
const resultsGrid = document.getElementById("results-grid");
const comparisonBody = document.querySelector("#comparison-table tbody");
const validationMessage = document.getElementById("validation-message");
const warningEl = document.getElementById("result-warning");
const zusType = document.getElementById("zusType");
const customZus = document.getElementById("custom-zus");
const historyEl = document.getElementById("calculation-history");
const scenarioSelect = document.getElementById("quick-scenario");
const assumptionsMeta = document.getElementById("assumptions-meta");
const assumptionsList = document.getElementById("assumptions-list");
const limitationsList = document.getElementById("limitations-list");
const assumptionsDisclaimer = document.getElementById("assumptions-disclaimer");

const HISTORY_KEY = "tax-calculator-history-v2";
const MAX_HISTORY = 8;

const THEME_KEY = "tax-calculator-theme-v1";
const themeButtons = Array.from(document.querySelectorAll(".theme-switcher__btn"));
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function resolveTheme(preference) {
  if (preference === "system") return mediaQuery.matches ? "dark" : "light";
  return preference === "dark" ? "dark" : "light";
}

function applyTheme(preference, persist = true) {
  const normalized = ["light", "dark", "system"].includes(preference) ? preference : "system";
  const activeTheme = resolveTheme(normalized);
  document.documentElement.dataset.theme = activeTheme;
  document.documentElement.style.colorScheme = activeTheme;

  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeValue === normalized;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (persist) localStorage.setItem(THEME_KEY, normalized);
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "system";
  applyTheme(savedTheme, false);
}


const labels = {
  gross: "kwota brutto",
  net: "kwota netto",
  effectiveBurden: "efektywne obciążenie",
  pit: "podatek PIT",
  pension: "składka emerytalna",
  disability: "składka rentowa",
  sickness: "składka chorobowa",
  health: "składka zdrowotna",
  taxAdvance: "zaliczka podatkowa",
  employerCost: "koszt pracodawcy",
};

const contractNames = {
  employment: "umowa o pracę",
  mandate: "umowa zlecenie",
  specificWork: "umowa o dzieło",
  b2bScale: "B2B skala",
  b2bLinear: "B2B liniowy",
  b2bLumpSum: "B2B ryczałt",
};

const scenarios = {
  juniorEmployment: { amount: 6800, direction: "grossToNet", period: "monthly", contractType: "employment", under26: true, pit2: true, ppk: false, deductibleCosts: "standard", zusType: "full" },
  seniorB2BLinear: { amount: 22000, direction: "grossToNet", period: "monthly", contractType: "b2bLinear", under26: false, pit2: false, ppk: false, deductibleCosts: "standard", zusType: "full" },
  creatorSpecificWork: { amount: 12000, direction: "grossToNet", period: "monthly", contractType: "specificWork", under26: false, pit2: true, ppk: false, deductibleCosts: "fiftyPercent", zusType: "full" },
};

function collectOptions() {
  const fd = new FormData(form);
  return {
    under26: fd.get("under26") === "on",
    ppk: fd.get("ppk") === "on",
    pit2: fd.get("pit2") === "on",
    vatPayer: fd.get("vatPayer") === "on",
    deductibleCosts: fd.get("deductibleCosts"),
    zusType: fd.get("zusType"),
    customSocial: parseAmount(fd.get("customSocial")),
    customHealth: parseAmount(fd.get("customHealth")),
  };
}

function renderList(target, items) {
  if (!target) return;
  target.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderAssumptionsPanel() {
  const metadata = TAX_CONFIG.metadata;
  if (!metadata || !assumptionsMeta) return;

  assumptionsMeta.innerHTML = `
    <div><dt>Rok zasad podatkowych</dt><dd>${metadata.taxYear}</dd></div>
    <div><dt>Nazwa modelu</dt><dd>${metadata.modelName}</dd></div>
    <div><dt>Ostatni przegląd</dt><dd>${metadata.lastReviewed}</dd></div>
    <div><dt>Status weryfikacji</dt><dd>${metadata.verificationStatus}</dd></div>
  `;
  renderList(assumptionsList, metadata.assumptions || []);
  renderList(limitationsList, metadata.limitations || []);
  if (assumptionsDisclaimer) {
    assumptionsDisclaimer.textContent = `Wynik orientacyjny: ${metadata.disclaimer} ${metadata.sourceStatus}`;
  }
}

function renderResults(resultByPeriod) {
  const monthly = resultByPeriod.monthly;
  const yearly = resultByPeriod.yearly;
  const rows = { ...monthly, employerCost: monthly.employerCost || 0 };
  resultsGrid.innerHTML = Object.entries(rows)
    .map(([key, val]) => `<article class="result-card"><p class="result-card__label">${labels[key] || key}</p><p class="result-card__value">${key === "effectiveBurden" ? `${round2(val)}%` : formatCurrency(val)}</p><p class="result-card__label">Rocznie: ${key === "effectiveBurden" ? `${round2(yearly[key] || 0)}%` : formatCurrency(yearly[key] || 0)}</p></article>`)
    .join("");
}

function renderComparison(items) {
  comparisonBody.innerHTML = items
    .map((item) => `<tr><td>${contractNames[item.contractType]}</td><td>${formatCurrency(item.gross)}</td><td>${formatCurrency(item.net)}</td><td>${round2(item.burden)}%</td></tr>`)
    .join("");
}

function updateWarnings(contractType, options) {
  const warnings = [];
  if (contractType.startsWith("b2b")) warnings.push("Dla B2B składka zdrowotna, koszty oraz podatek zależą od szczegółów działalności i PKD.");
  if (options.under26) warnings.push("Ulga dla osób poniżej 26 lat działa do rocznego limitu przychodu i zależy od rodzaju umowy.");
  warningEl.textContent = `${warnings.join(" ")} ${TAX_CONFIG.notes.disclaimer}`.trim();
}

function writeHistoryEntry(payload) {
  const current = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  const next = [payload, ...current].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  renderHistory();
}

function renderHistory() {
  const items = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  historyEl.innerHTML = items.length
    ? items.map((item) => `<li><button type="button" class="history-btn" data-id="${item.id}">${item.timestamp} • ${contractNames[item.contractType]} • ${formatCurrency(item.inputAmount)} → ${formatCurrency(item.net)}</button></li>`).join("")
    : '<li class="history-empty">Brak zapisanych kalkulacji.</li>';
}

function setFormFromScenario(name) {
  const data = scenarios[name];
  if (!data) return;
  Object.entries(data).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (!field) return;
    if (field instanceof RadioNodeList) {
      Array.from(field).forEach((el) => {
        el.checked = el.value === value;
      });
      return;
    }
    if (field.type === "checkbox") {
      field.checked = Boolean(value);
      return;
    }
    field.value = value;
  });
  customZus.classList.toggle("form__group--hidden", zusType.value !== "custom");
}

function calculateAndRender() {
  const fd = new FormData(form);
  const amount = parseAmount(fd.get("amount"));
  const direction = fd.get("direction");
  const period = fd.get("period");
  const contractType = fd.get("contractType");
  const options = collectOptions();

  validationMessage.textContent = "";
  if (!Number.isFinite(amount) || amount <= 0) {
    resultsGrid.innerHTML = "";
    comparisonBody.innerHTML = "";
    validationMessage.textContent = "Podaj poprawną dodatnią kwotę, aby zobaczyć wyniki.";
    warningEl.textContent = "";
    return null;
  }

  const monthlyInput = period === "yearly" ? amount / 12 : amount;
  const grossMonthly = direction === "grossToNet" ? monthlyInput : netToGross(monthlyInput, contractType, options);
  const base = grossToNet(grossMonthly, contractType, options);
  const effectiveBurden = base.gross > 0 ? round2((1 - base.net / base.gross) * 100) : 0;
  base.effectiveBurden = effectiveBurden;
  if (contractType === "employment") base.employerCost = calculateEmployerCost(grossMonthly);
  const periodResult = byPeriod(base, "monthly");

  renderResults(periodResult);
  renderComparison(generateComparison(monthlyInput, direction, options));
  updateWarnings(contractType, options);
  return { periodResult, contractType, amount, base };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = calculateAndRender();
  if (!result) return;

  writeHistoryEntry({
    id: crypto.randomUUID(),
    timestamp: new Date().toLocaleString("pl-PL"),
    contractType: result.contractType,
    inputAmount: result.amount,
    net: result.base.net,
  });
});

form.addEventListener("change", (event) => {
  if (event.target.id === "zusType") customZus.classList.toggle("form__group--hidden", zusType.value !== "custom");
});

scenarioSelect.addEventListener("change", (event) => {
  setFormFromScenario(event.target.value);
});

historyEl.addEventListener("click", (event) => {
  const btn = event.target.closest(".history-btn");
  if (!btn) return;
  const items = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  const selected = items.find((item) => item.id === btn.dataset.id);
  if (!selected) return;
  form.elements.namedItem("amount").value = selected.inputAmount;
  form.elements.namedItem("contractType").value = selected.contractType;
  calculateAndRender();
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => applyTheme(button.dataset.themeValue));
});

mediaQuery.addEventListener("change", () => {
  if ((localStorage.getItem(THEME_KEY) || "system") === "system") applyTheme("system", false);
});

initTheme();
renderAssumptionsPanel();
renderHistory();
calculateAndRender();
