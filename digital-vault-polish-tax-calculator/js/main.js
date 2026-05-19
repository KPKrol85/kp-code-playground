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

const labels = {
  gross: "kwota brutto",
  net: "kwota netto",
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

function renderResults(resultByPeriod) {
  const monthly = resultByPeriod.monthly;
  const yearly = resultByPeriod.yearly;
  const rows = { ...monthly, employerCost: monthly.employerCost || 0 };
  resultsGrid.innerHTML = Object.entries(rows)
    .map(([key, val]) => `<article class="result-card"><p class="result-card__label">${labels[key] || key}</p><p class="result-card__value">${formatCurrency(val)}</p><p class="result-card__label">Rocznie: ${formatCurrency(yearly[key] || 0)}</p></article>`)
    .join("");
}

function renderComparison(items) {
  comparisonBody.innerHTML = items
    .map((item) => `<tr><td>${contractNames[item.contractType]}</td><td>${formatCurrency(item.gross)}</td><td>${formatCurrency(item.net)}</td><td>${round2(item.burden)}%</td></tr>`)
    .join("");
}

function updateWarnings(contractType, options) {
  const warnings = [];
  if (contractType.startsWith("b2b")) warnings.push("Dla B2B sposób naliczania składki zdrowotnej i kosztów zależy od szczegółów działalności.");
  if (options.under26) warnings.push("Ulga dla osób poniżej 26 lat zależy od limitów i rodzaju umowy.");
  warningEl.textContent = `${warnings.join(" ")} ${TAX_CONFIG.notes.disclaimer}`.trim();
}

function update() {
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
    return;
  }

  const monthlyInput = period === "yearly" ? amount / 12 : amount;
  const grossMonthly = direction === "grossToNet" ? monthlyInput : netToGross(monthlyInput, contractType, options);
  const base = grossToNet(grossMonthly, contractType, options);
  if (contractType === "employment") base.employerCost = calculateEmployerCost(grossMonthly);
  const periodResult = byPeriod(base, "monthly");

  renderResults(periodResult);
  renderComparison(generateComparison(monthlyInput, direction, options));
  updateWarnings(contractType, options);
}

form.addEventListener("input", update);
form.addEventListener("change", (event) => {
  if (event.target.id === "zusType") customZus.classList.toggle("form__group--hidden", zusType.value !== "custom");
  update();
});

update();
