import { TAX_CONFIG } from "./tax-config.js";
import { round2, safeMax } from "./utils.js";

const annualize = (amount, period) => (period === "yearly" ? amount : amount * TAX_CONFIG.constants.annualizationFactor);
const monthlyize = (amount, period) => (period === "yearly" ? amount / TAX_CONFIG.constants.annualizationFactor : amount);

function calculateScaleTax(taxBaseAnnual, pit2 = true, under26 = false) {
  if (under26) return 0;
  const cfg = TAX_CONFIG.constants;
  const taxable = safeMax(taxBaseAnnual - cfg.annualTaxFreeAmount);
  const firstBand = Math.min(taxable, cfg.firstThreshold - cfg.annualTaxFreeAmount);
  const secondBand = safeMax(taxable - firstBand);
  const grossTax = firstBand * cfg.scaleRate1 + secondBand * cfg.scaleRate2;
  const reduction = pit2 ? cfg.taxReductionMonthly * 12 : 0;
  return safeMax(grossTax - reduction);
}

export function calculateEmploymentContract(grossMonthly, options = {}) {
  const rates = TAX_CONFIG.employment.employeeContributions;
  const pension = grossMonthly * rates.pension;
  const disability = grossMonthly * rates.disability;
  const sickness = grossMonthly * rates.sickness;
  const socialTotal = pension + disability + sickness;
  const health = (grossMonthly - socialTotal) * rates.health;
  const kup = TAX_CONFIG.employment.deductibleCosts[options.deductibleCosts] ?? TAX_CONFIG.employment.deductibleCosts.standard;
  const taxBaseMonthly = safeMax(grossMonthly - socialTotal - kup);
  const taxAnnual = calculateScaleTax(taxBaseMonthly * 12, options.pit2, options.under26);
  const pit = taxAnnual / 12;
  const ppk = options.ppk ? grossMonthly * TAX_CONFIG.employment.ppkEmployeeRate : 0;
  const net = grossMonthly - socialTotal - health - pit - ppk;
  return { gross: grossMonthly, net, pit, pension, disability, sickness, health, taxAdvance: pit };
}

export function calculateMandateContract(grossMonthly, options = {}) {
  const rates = TAX_CONFIG.mandate.socialRates;
  const pension = grossMonthly * rates.pension;
  const disability = grossMonthly * rates.disability;
  const sickness = grossMonthly * rates.sickness;
  const social = pension + disability + sickness;
  const health = (grossMonthly - social) * rates.health;
  const kup = (grossMonthly - social) * TAX_CONFIG.mandate.deductibleCostsRate;
  const base = safeMax(grossMonthly - social - kup);
  const pit = calculateScaleTax(base * 12, options.pit2, options.under26) / 12;
  const net = grossMonthly - social - health - pit;
  return { gross: grossMonthly, net, pit, pension, disability, sickness, health, taxAdvance: pit };
}

export function calculateSpecificWorkContract(grossMonthly, options = {}) {
  const rate = options.deductibleCosts === "fiftyPercent" ? TAX_CONFIG.specificWork.deductibleCostsRate.fiftyPercent : TAX_CONFIG.specificWork.deductibleCostsRate.standard;
  const kup = grossMonthly * rate;
  const base = safeMax(grossMonthly - kup);
  const pit = calculateScaleTax(base * 12, options.pit2, options.under26) / 12;
  const net = grossMonthly - pit;
  return { gross: grossMonthly, net, pit, pension: 0, disability: 0, sickness: 0, health: 0, taxAdvance: pit };
}

function resolveZus(options) {
  if (options.zusType === "custom") return { social: options.customSocial || 0, healthBase: 0, customHealth: options.customHealth || 0 };
  return TAX_CONFIG.b2b.zus[options.zusType] ?? TAX_CONFIG.b2b.zus.full;
}

export function calculateB2BScale(grossMonthly, options = {}) {
  const zus = resolveZus(options);
  const social = zus.social;
  const health = options.zusType === "custom" ? zus.customHealth : zus.healthBase * TAX_CONFIG.b2b.healthRates.scale;
  const baseAnnual = safeMax((grossMonthly - social) * 12);
  const pit = calculateScaleTax(baseAnnual, options.pit2, false) / 12;
  const net = grossMonthly - social - health - pit;
  return { gross: grossMonthly, net, pit, pension: 0, disability: 0, sickness: 0, health, taxAdvance: pit };
}

export function calculateB2BLinear(grossMonthly, options = {}) {
  const zus = resolveZus(options);
  const social = zus.social;
  const health = options.zusType === "custom" ? zus.customHealth : zus.healthBase * TAX_CONFIG.b2b.healthRates.linear;
  const base = safeMax(grossMonthly - social);
  const pit = base * TAX_CONFIG.constants.linearRate;
  const net = grossMonthly - social - health - pit;
  return { gross: grossMonthly, net, pit, pension: 0, disability: 0, sickness: 0, health, taxAdvance: pit };
}

export function calculateB2BLumpSum(grossMonthly, options = {}) {
  const zus = resolveZus(options);
  const social = zus.social;
  const health = options.zusType === "custom" ? zus.customHealth : zus.healthBase * TAX_CONFIG.b2b.healthRates.lumpSum;
  const rate = TAX_CONFIG.b2b.lumpSumRates.default;
  const pit = grossMonthly * rate;
  const net = grossMonthly - social - health - pit;
  return { gross: grossMonthly, net, pit, pension: 0, disability: 0, sickness: 0, health, taxAdvance: pit };
}

export function calculateEmployerCost(grossMonthly) {
  const rates = TAX_CONFIG.employment.employerContributions;
  const extra = grossMonthly * (rates.pension + rates.disability + rates.accident + rates.laborFund + rates.fgsp);
  return grossMonthly + extra;
}

export function grossToNet(gross, contractType, options) {
  const map = { employment: calculateEmploymentContract, mandate: calculateMandateContract, specificWork: calculateSpecificWorkContract, b2bScale: calculateB2BScale, b2bLinear: calculateB2BLinear, b2bLumpSum: calculateB2BLumpSum };
  return map[contractType](gross, options);
}

export function netToGross(targetNet, contractType, options, maxIterations = 80, precision = 0.05) {
  let low = 0;
  let high = targetNet * 2.5 + 1000;
  let best = high;
  for (let i = 0; i < maxIterations; i += 1) {
    const mid = (low + high) / 2;
    const simulated = grossToNet(mid, contractType, options).net;
    if (Math.abs(simulated - targetNet) <= precision) {
      best = mid;
      break;
    }
    if (simulated < targetNet) low = mid;
    else high = mid;
    best = mid;
  }
  return round2(best);
}

export function generateComparison(amount, direction, options) {
  const contracts = ["employment", "mandate", "specificWork", "b2bScale", "b2bLinear", "b2bLumpSum"];
  return contracts.map((type) => {
    const gross = direction === "grossToNet" ? amount : netToGross(amount, type, options);
    const result = grossToNet(gross, type, options);
    return { contractType: type, gross: result.gross, net: result.net, burden: safeMax((1 - result.net / result.gross) * 100) };
  });
}

export const byPeriod = (result, period) => {
  const factor = period === "yearly" ? 1 / 12 : 1;
  const m = {};
  Object.entries(result).forEach(([k, v]) => {
    const isRate = k.toLowerCase().includes("burden") || k.toLowerCase().includes("rate");
    m[k] = isRate ? round2(v) : round2(v * factor);
  });
  const yearly = {};
  Object.entries(m).forEach(([k, v]) => {
    const isRate = k.toLowerCase().includes("burden") || k.toLowerCase().includes("rate");
    yearly[k] = isRate ? round2(v) : round2(v * 12);
  });
  return { monthly: m, yearly };
};
