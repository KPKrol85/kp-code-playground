import { generateComparison, grossToNet, netToGross, calculateEmployerCost, byPeriod } from "./calculations.js";
import { formatCurrency, parseAmount, round2 } from "./utils.js";
import { OPTION_APPLICABILITY, TAX_CONFIG } from "./tax-config.js";
import { contractNames, deductibleCostLabels, directionLabels, periodLabels, quickScenarios, resultLabels, zusTypeLabels } from "./ui-config.js";
import { findHistoryEntry, renderHistory, writeHistoryEntry } from "./history.js";
import { initThemeSwitcher } from "./theme.js";

const form = document.getElementById("calculator-form");
const amountInput = document.getElementById("amount");
const resultsGrid = document.getElementById("results-grid");
const comparisonBody = document.querySelector("#comparison-table tbody");
const validationMessage = document.getElementById("validation-message");
const warningEl = document.getElementById("result-warning");
const calculationSummary = document.getElementById("calculation-summary");
const printSummaryButton = document.getElementById("print-summary");
const copySummaryButton = document.getElementById("copy-summary");
const summaryActionStatus = document.getElementById("summary-action-status");
const comparisonRankingNote = document.getElementById("comparison-ranking-note");
const contractTypeSelect = document.getElementById("contractType");
const zusType = document.getElementById("zusType");
const customZus = document.getElementById("custom-zus");
const customZusInputs = Array.from(customZus.querySelectorAll("input"));
const historyEl = document.getElementById("calculation-history");
const scenarioSelect = document.getElementById("quick-scenario");
const assumptionsMeta = document.getElementById("assumptions-meta");
const assumptionsList = document.getElementById("assumptions-list");
const limitationsList = document.getElementById("limitations-list");
const assumptionsDisclaimer = document.getElementById("assumptions-disclaimer");
const b2bAssumptionsSummary = document.getElementById("b2b-assumptions-summary");
const b2bAssumptionsList = document.getElementById("b2b-assumptions-list");
const b2bSelectedNote = document.getElementById("b2b-selected-note");
const comparisonAssumptions = document.getElementById("comparison-assumptions");
const applicabilityGroups = Array.from(document.querySelectorAll("[data-option-key]"));
const deductibleCostsSelect = document.getElementById("deductibleCosts");

let lastCalculation = null;

const themeButtons = Array.from(document.querySelectorAll(".theme-switcher__btn"));

const optionControls = {
  under26: document.getElementById("under26"),
  ppk: document.getElementById("ppk"),
  pit2: document.getElementById("pit2"),
  vatPayer: document.getElementById("vatPayer"),
  deductibleCosts: deductibleCostsSelect,
  zusType,
};

const helperIds = {
  under26: "under26-applicability",
  ppk: "ppk-applicability",
  pit2: "pit2-applicability",
  vatPayer: "vat-applicability",
  deductibleCosts: "deductible-costs-applicability",
  zusType: "zus-help",
};

function setSummaryActionsEnabled(isEnabled, message = "") {
  [printSummaryButton, copySummaryButton].forEach((button) => {
    if (button) button.disabled = !isEnabled;
  });
  if (summaryActionStatus) {
    summaryActionStatus.textContent = message || (isEnabled
      ? "Podsumowanie można wydrukować lub skopiować jako tekst."
      : "Drukowanie i kopiowanie będą dostępne po poprawnym obliczeniu.");
  }
}

function getMetadataLines() {
  const metadata = TAX_CONFIG.metadata || {};
  return [
    `Rok zasad podatkowych: ${metadata.taxYear || "nie podano"}`,
    `Nazwa modelu: ${metadata.modelName || "nie podano"}`,
    `Ostatni przegląd: ${metadata.lastReviewed || "nie podano"}`,
    `Status weryfikacji: ${metadata.verificationStatus || "nie podano"}`,
  ];
}

function getResultValue(key, values) {
  if (key === "socialContributions") return ["pension", "disability", "sickness"].reduce((sum, itemKey) => sum + (values[itemKey] || 0), 0);
  if (key === "totalDeductions") return Math.max(0, (values.gross || 0) - (values.net || 0));
  return values[key] || 0;
}

function formatResultLine(key, monthly, yearly) {
  const monthlyRaw = getResultValue(key, monthly);
  const yearlyRaw = getResultValue(key, yearly);
  const monthlyValue = key === "effectiveBurden" ? `${round2(monthlyRaw)}%` : formatCurrency(monthlyRaw);
  const yearlyText = key === "effectiveBurden" ? `${round2(yearlyRaw)}%` : formatCurrency(yearlyRaw);
  return `- ${resultLabels[key] || key}: ${monthlyValue} miesięcznie / ${yearlyText} rocznie`;
}

function buildPlainTextSummary(calculation) {
  if (!calculation) return "";
  const { amount, direction, period, contractType, options, periodResult, comparisonItems } = calculation;
  const metadata = TAX_CONFIG.metadata || {};
  const activeAssumptions = getActiveAssumptions(contractType, options);
  const monthly = periodResult.monthly;
  const yearly = periodResult.yearly;
  const comparisonLines = comparisonItems.map((item) => {
    const marker = item.contractType === contractType ? " (wybrana)" : "";
    return `- ${contractNames[item.contractType]}${marker}: brutto/przychód ${formatCurrency(item.gross)}, netto ${formatCurrency(item.net)}, obciążenie ${round2(item.burden)}%`;
  });

  return [
    "Kalkulator podatkowy PL — podsumowanie kalkulacji",
    "",
    "Metadane modelu:",
    ...getMetadataLines().map((line) => `- ${line}`),
    "",
    "Wybrane dane wejściowe:",
    `- Kwota wejściowa: ${formatCurrency(amount)}`,
    `- Kierunek: ${directionLabels[direction]}`,
    `- Okres: ${periodLabels[period]}`,
    `- Wybrana forma: ${contractNames[contractType]}`,
    `- Opcje/założenia aktywne: ${activeAssumptions.join("; ")}`,
    "",
    "Wyniki:",
    ...getResultRows(monthly).map(([key]) => formatResultLine(key, monthly, yearly)),
    "",
    "Porównanie typów umów:",
    ...comparisonLines,
    "",
    "Założenia i ograniczenia:",
    ...(metadata.assumptions || []).map((item) => `- ${item}`),
    ...(metadata.limitations || []).map((item) => `- ${item}`),
    "",
    "Disclaimer:",
    metadata.disclaimer || TAX_CONFIG.notes.disclaimer,
    metadata.sourceStatus || "",
    "Wartości są przybliżone i nie stanowią porady podatkowej, prawnej, księgowej ani finansowej.",
  ].filter((line) => line !== "").join("\n");
}

async function copySummary() {
  if (!lastCalculation) {
    setSummaryActionsEnabled(false);
    return;
  }
  const summary = buildPlainTextSummary(lastCalculation);
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(summary);
    setSummaryActionsEnabled(true, "Skopiowano tekstowe podsumowanie kalkulacji.");
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = summary;
    textarea.setAttribute("readonly", "");
    textarea.className = "visually-hidden";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    setSummaryActionsEnabled(true, copied
      ? "Skopiowano tekstowe podsumowanie kalkulacji."
      : "Nie udało się skopiować automatycznie. Zaznacz wyniki i skopiuj ręcznie.");
  }
}

function getApplicability(contractType) {
  return OPTION_APPLICABILITY[contractType] || OPTION_APPLICABILITY.employment;
}

function isB2B(contractType) {
  return contractType.startsWith("b2b");
}

function setGroupInactive(optionKey, isInactive) {
  applicabilityGroups
    .filter((group) => group.dataset.optionKey === optionKey)
    .forEach((group) => {
      group.classList.toggle("form__option--inactive", isInactive);
      group.setAttribute("data-applicability-inactive", String(isInactive));
    });
}

function setHelperText(optionKey, text) {
  const helper = document.getElementById(helperIds[optionKey]);
  if (helper) helper.textContent = text || "";
}

function syncDeductibleCostOptions(rule) {
  if (!deductibleCostsSelect || !rule) return;
  const allowedValues = rule.allowedValues || Array.from(deductibleCostsSelect.options).map((option) => option.value);
  Array.from(deductibleCostsSelect.options).forEach((option) => {
    option.disabled = !allowedValues.includes(option.value);
  });
  if (!allowedValues.includes(deductibleCostsSelect.value)) {
    deductibleCostsSelect.value = rule.fallbackValue || allowedValues[0] || "standard";
  }
}

function updateOptionApplicability() {
  const contractType = contractTypeSelect.value;
  const rules = getApplicability(contractType);

  Object.entries(optionControls).forEach(([optionKey, control]) => {
    const rule = rules[optionKey];
    if (!control || !rule) return;
    const inactive = ["notApplicable", "ignored"].includes(rule.status);
    control.disabled = inactive;
    if (inactive && control.type === "checkbox") control.checked = false;
    setGroupInactive(optionKey, inactive);
    setHelperText(optionKey, rule.note);
  });

  syncDeductibleCostOptions(rules.deductibleCosts);

  if (!isB2B(contractType)) {
    zusType.value = "full";
  }

  const customZusActive = isB2B(contractType) && zusType.value === "custom";
  setCustomZusState(customZusActive);
  setGroupInactive("customZus", !customZusActive);

  if (b2bSelectedNote) {
    b2bSelectedNote.hidden = !isB2B(contractType);
    b2bSelectedNote.textContent = isB2B(contractType) ? TAX_CONFIG.b2b.modelAssumptions.selectedContractNote : "";
  }
}

function getActiveAssumptions(contractType, options) {
  const assumptions = [];
  assumptions.push(options.pit2 ? "PIT-2: tak" : "PIT-2: nie");
  assumptions.push(options.ppk ? "PPK: tak" : "PPK: nie");
  assumptions.push(options.under26 ? "ulga dla młodych: tak" : "ulga dla młodych: nie");
  if (options.deductibleCosts) assumptions.push(deductibleCostLabels[options.deductibleCosts] || `KUP: ${options.deductibleCosts}`);
  if (isB2B(contractType)) {
    assumptions.push(`ZUS B2B: ${zusTypeLabels[options.zusType] || options.zusType}`);
    assumptions.push(options.vatPayer ? "VAT: informacyjnie tak" : "VAT: informacyjnie nie");
    if (options.zusType === "custom") assumptions.push(`własny ZUS: społ. ${formatCurrency(options.customSocial)}, zdr. ${formatCurrency(options.customHealth)}`);
  }
  return assumptions;
}

function renderCalculationSummary({ amount, direction, period, contractType, options }) {
  if (!calculationSummary) return;
  const assumptions = getActiveAssumptions(contractType, options);
  calculationSummary.hidden = false;
  calculationSummary.innerHTML = `
    <h3>Podsumowanie kalkulacji</h3>
    <dl class="calculation-summary__grid">
      <div><dt>Kwota wejściowa</dt><dd>${formatCurrency(amount)}</dd></div>
      <div><dt>Kierunek</dt><dd>${directionLabels[direction]}</dd></div>
      <div><dt>Okres</dt><dd>${periodLabels[period]}</dd></div>
      <div><dt>Wybrana forma</dt><dd>${contractNames[contractType]}</dd></div>
    </dl>
    <p><strong>Aktywne założenia:</strong> ${assumptions.join(" · ")}</p>
  `;
}

function renderEmptyStates(message = "Wpisz kwotę, aby zobaczyć szacunkowe wyniki.") {
  lastCalculation = null;
  setSummaryActionsEnabled(false);
  if (calculationSummary) {
    calculationSummary.hidden = true;
    calculationSummary.innerHTML = "";
  }
  resultsGrid.innerHTML = `<div class="empty-state">${message}</div>`;
  comparisonBody.innerHTML = `<tr><td colspan="4" class="empty-state empty-state--table">Porównanie pojawi się po poprawnym wyliczeniu.</td></tr>`;
  if (comparisonRankingNote) comparisonRankingNote.textContent = "Porównanie pojawi się po poprawnym wyliczeniu.";
}

function updateComparisonRankingNote(direction) {
  if (!comparisonRankingNote) return;
  comparisonRankingNote.textContent = direction === "grossToNet"
    ? "W trybie brutto → netto wyżej oceniana jest forma z wyższym szacunkowym wynikiem netto."
    : "W trybie netto → brutto wyżej oceniana jest forma z niższą wymaganą kwotą brutto/przychodu.";
}

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
  if (b2bAssumptionsSummary) b2bAssumptionsSummary.textContent = TAX_CONFIG.b2b.modelAssumptions.summary;
  renderList(b2bAssumptionsList, TAX_CONFIG.b2b.modelAssumptions.items || []);
  if (comparisonAssumptions) {
    comparisonAssumptions.textContent = `Porównanie używa tej samej kwoty i kierunku obliczeń dla wszystkich typów umów. Nie każda opcja formularza dotyczy każdego modelu; opcje nieaktywne są pomijane zgodnie z uproszczonym modelem. ${TAX_CONFIG.b2b.modelAssumptions.comparisonNote} Wyniki są szacunkowe i wymagają indywidualnej weryfikacji.`;
  }
  if (assumptionsDisclaimer) {
    assumptionsDisclaimer.textContent = `Wynik orientacyjny: ${metadata.disclaimer} ${metadata.sourceStatus}`;
  }
}

function getResultRows(monthly) {
  const socialContributions = ["pension", "disability", "sickness"].reduce((sum, key) => sum + (monthly[key] || 0), 0);
  const totalDeductions = Math.max(0, (monthly.gross || 0) - (monthly.net || 0));
  const rows = [
    ["net", monthly.net],
    ["gross", monthly.gross],
  ];
  if (monthly.employerCost) rows.push(["employerCost", monthly.employerCost]);
  rows.push(
    ["pit", monthly.pit ?? monthly.taxAdvance ?? 0],
    ["socialContributions", socialContributions],
    ["health", monthly.health || 0]
  );
  if (monthly.ppk) rows.push(["ppk", monthly.ppk]);
  rows.push(["totalDeductions", totalDeductions], ["effectiveBurden", monthly.effectiveBurden || 0]);
  return rows;
}

function renderResults(resultByPeriod) {
  const monthly = resultByPeriod.monthly;
  const yearly = resultByPeriod.yearly;
  resultsGrid.innerHTML = getResultRows(monthly)
    .map(([key, val]) => {
      const yearlyValue = key === "socialContributions"
        ? ["pension", "disability", "sickness"].reduce((sum, itemKey) => sum + (yearly[itemKey] || 0), 0)
        : key === "totalDeductions"
          ? Math.max(0, (yearly.gross || 0) - (yearly.net || 0))
          : yearly[key] || 0;
      return `<article class="result-card result-card--${key}"><p class="result-card__label">${resultLabels[key] || key}</p><p class="result-card__value">${key === "effectiveBurden" ? `${round2(val)}%` : formatCurrency(val)}</p><p class="result-card__label">Rocznie: ${key === "effectiveBurden" ? `${round2(yearlyValue)}%` : formatCurrency(yearlyValue)}</p></article>`;
    })
    .join("");
}

function renderComparison(items, activeContractType) {
  comparisonBody.innerHTML = items
    .map((item) => {
      const isActive = item.contractType === activeContractType;
      return `<tr class="${isActive ? "comparison-table__row--active" : ""}" ${isActive ? 'aria-current="true"' : ""}><th scope="row">${contractNames[item.contractType]} ${isActive ? '<span class="comparison-table__badge">wybrana</span>' : ""}</th><td>${formatCurrency(item.gross)}</td><td>${formatCurrency(item.net)}</td><td>${round2(item.burden)}%</td></tr>`;
    })
    .join("");
}

function setCustomZusState(isActive) {
  customZus.classList.toggle("form__group--hidden", !isActive);
  customZus.hidden = !isActive;
  customZus.setAttribute("aria-hidden", String(!isActive));
  customZusInputs.forEach((input) => {
    input.disabled = !isActive;
  });
}

function updateWarnings(contractType, options) {
  const warnings = [];
  if (contractType.startsWith("b2b")) warnings.push(TAX_CONFIG.b2b.modelAssumptions.selectedContractNote);
  if (options.under26) warnings.push("Ulga dla osób poniżej 26 lat działa do rocznego limitu przychodu i zależy od rodzaju umowy.");
  warningEl.textContent = `${warnings.join(" ")} ${TAX_CONFIG.notes.disclaimer}`.trim();
}

function setFormFromScenario(name) {
  const data = quickScenarios[name];
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
  updateOptionApplicability();
}

function calculateAndRender() {
  const fd = new FormData(form);
  const amount = parseAmount(fd.get("amount"));
  const direction = fd.get("direction");
  const period = fd.get("period");
  const contractType = fd.get("contractType");
  const options = collectOptions();

  validationMessage.textContent = "";
  amountInput.removeAttribute("aria-invalid");
  if (!Number.isFinite(amount) || amount <= 0) {
    renderEmptyStates(amountInput.value ? "Podaj kwotę większą od zera." : "Wpisz kwotę, aby zobaczyć szacunkowe wyniki.");
    validationMessage.textContent = amountInput.value ? "Podaj kwotę większą od zera." : "";
    if (amountInput.value) amountInput.setAttribute("aria-invalid", "true");
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

  renderCalculationSummary({ amount, direction, period, contractType, options });
  renderResults(periodResult);
  const comparisonItems = generateComparison(monthlyInput, direction, options);
  renderComparison(comparisonItems, contractType);
  updateComparisonRankingNote(direction);
  updateWarnings(contractType, options);
  lastCalculation = { periodResult, contractType, amount, base, direction, period, options, comparisonItems };
  setSummaryActionsEnabled(true);
  return lastCalculation;
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
  renderHistory(historyEl, { contractNames, formatCurrency });
});

form.addEventListener("change", (event) => {
  if (["contractType", "zusType"].includes(event.target.id)) updateOptionApplicability();
});

scenarioSelect.addEventListener("change", (event) => {
  setFormFromScenario(event.target.value);
});

historyEl.addEventListener("click", (event) => {
  const btn = event.target.closest(".history-btn");
  if (!btn) return;
  const selected = findHistoryEntry(btn.dataset.id);
  if (!selected) return;
  form.elements.namedItem("amount").value = selected.inputAmount;
  form.elements.namedItem("contractType").value = selected.contractType;
  updateOptionApplicability();
  calculateAndRender();
});

if (printSummaryButton) {
  printSummaryButton.addEventListener("click", () => {
    if (!lastCalculation) {
      setSummaryActionsEnabled(false);
      return;
    }
    window.print();
  });
}

if (copySummaryButton) {
  copySummaryButton.addEventListener("click", copySummary);
}

initThemeSwitcher({ themeButtons });
updateOptionApplicability();
renderAssumptionsPanel();
renderHistory(historyEl, { contractNames, formatCurrency });
renderEmptyStates();
