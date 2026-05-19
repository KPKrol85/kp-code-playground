import { TAX_CONFIG } from './tax-config.js';
import { clampPositive, round2 } from './utils.js';

function calculateProgressiveTax(annualBase) {
  const cfg = TAX_CONFIG.thresholds;
  const taxable = Math.max(0, annualBase - cfg.annualTaxFreeAmount);
  if (taxable <= cfg.firstBracketLimit) return taxable * cfg.firstBracketRate;
  const first = cfg.firstBracketLimit * cfg.firstBracketRate;
  const second = (taxable - cfg.firstBracketLimit) * cfg.secondBracketRate;
  return first + second;
}

export function calculateEmployerCost(gross, opts = {}) {
  const r = TAX_CONFIG.employerRates;
  const base = clampPositive(gross);
  const sumRates = r.pension + r.disability + r.accident + r.laborFund + r.fgsp + (opts.ppk ? r.ppk : 0);
  return round2(base * (1 + sumRates));
}

export function calculateEmploymentContract(gross, options = {}) {
  const g = clampPositive(gross);
  const s = TAX_CONFIG.socialRates;
  const social = { pension: g * s.pension, disability: g * s.disability, sickness: g * s.sickness };
  const socialTotal = social.pension + social.disability + social.sickness;
  const health = (g - socialTotal) * TAX_CONFIG.healthRates.employee;
  const costs = options.deductibleCosts === 'elevated' ? TAX_CONFIG.deductibleCosts.elevated : TAX_CONFIG.deductibleCosts.standard;
  const annualTaxBase = Math.max(0, (g - socialTotal - costs) * 12);
  let pitAnnual = options.under26 ? 0 : calculateProgressiveTax(annualTaxBase);
  if (options.pit2) pitAnnual = Math.max(0, pitAnnual - TAX_CONFIG.pit2MonthlyRelief * 12);
  const pit = pitAnnual / 12;
  const ppk = options.ppk ? g * TAX_CONFIG.ppk.employeeRate : 0;
  const net = g - socialTotal - health - pit - ppk;
  return summarize('umowa o pracę', g, net, pit, social, health, pit, calculateEmployerCost(g, options));
}

export function calculateMandateContract(gross, options = {}) {
  const s = TAX_CONFIG.socialRates;
  const g = clampPositive(gross);
  const social = { pension: g * s.pension, disability: g * s.disability, sickness: options.sickness ? g * s.sickness : 0 };
  const socialTotal = social.pension + social.disability + social.sickness;
  const health = (g - socialTotal) * TAX_CONFIG.healthRates.employee;
  const costRate = options.deductibleCosts === 'fifty' ? TAX_CONFIG.deductibleCosts.fiftyPercentRate : 0.2;
  const taxBase = Math.max(0, g - socialTotal - (g * costRate));
  const pit = options.under26 ? 0 : taxBase * TAX_CONFIG.thresholds.firstBracketRate;
  const net = g - socialTotal - health - pit;
  return summarize('umowa zlecenie', g, net, pit, social, health, pit, null);
}

export function calculateSpecificWorkContract(gross, options = {}) {
  const g = clampPositive(gross);
  const costRate = options.deductibleCosts === 'fifty' ? TAX_CONFIG.deductibleCosts.fiftyPercentRate : 0.2;
  const taxBase = g - (g * costRate);
  const pit = options.under26 ? 0 : taxBase * TAX_CONFIG.thresholds.firstBracketRate;
  const net = g - pit;
  return summarize('umowa o dzieło', g, net, pit, { pension: 0, disability: 0, sickness: 0 }, 0, pit, null);
}

function getB2BZus(options) {
  if (options.zusType === 'custom') return { social: clampPositive(options.customSocial), healthBase: clampPositive(options.customHealth) };
  return TAX_CONFIG.b2bZus[options.zusType] || TAX_CONFIG.b2bZus.full;
}

export function calculateB2BScale(gross, options = {}) {
  const g = clampPositive(gross);
  const zus = getB2BZus(options);
  const health = zus.healthBase * TAX_CONFIG.healthRates.b2bScale;
  const annualTax = calculateProgressiveTax((g - zus.social) * 12);
  const pit = annualTax / 12;
  const net = g - zus.social - health - pit;
  return summarize('B2B skala podatkowa', g, net, pit, { pension: zus.social, disability: 0, sickness: 0 }, health, pit, null);
}

export function calculateB2BLinear(gross, options = {}) {
  const g = clampPositive(gross);
  const zus = getB2BZus(options);
  const taxBase = Math.max(0, g - zus.social);
  const pit = taxBase * TAX_CONFIG.thresholds.linearRate;
  const health = taxBase * TAX_CONFIG.healthRates.b2bLinear;
  const net = g - zus.social - health - pit;
  return summarize('B2B podatek liniowy', g, net, pit, { pension: zus.social, disability: 0, sickness: 0 }, health, pit, null);
}

export function calculateB2BLumpSum(gross, options = {}) {
  const g = clampPositive(gross);
  const zus = getB2BZus(options);
  const rate = TAX_CONFIG.b2bLumpSumRates.it;
  const pit = g * rate;
  const health = zus.healthBase * TAX_CONFIG.healthRates.b2bLumpSum;
  const net = g - zus.social - health - pit;
  return summarize('B2B ryczałt', g, net, pit, { pension: zus.social, disability: 0, sickness: 0 }, health, pit, null);
}

function summarize(label, gross, net, pit, social, health, advanceTax, employerCost) {
  return {
    label,
    gross: round2(gross),
    net: round2(net),
    pit: round2(pit),
    social: { pension: round2(social.pension), disability: round2(social.disability), sickness: round2(social.sickness) },
    health: round2(health),
    advanceTax: round2(advanceTax),
    employerCost: employerCost ? round2(employerCost) : null,
  };
}

export function grossToNet(contractType, amount, options) {
  const map = { employment: calculateEmploymentContract, mandate: calculateMandateContract, specificWork: calculateSpecificWorkContract, b2bScale: calculateB2BScale, b2bLinear: calculateB2BLinear, b2bLumpSum: calculateB2BLumpSum };
  return map[contractType](amount, options);
}

export function netToGross(contractType, targetNet, options = {}) {
  let low = 0;
  let high = targetNet * 3 + 1000;
  const maxIter = 60;
  const precision = 0.01;
  let best = high;
  for (let i = 0; i < maxIter; i += 1) {
    const mid = (low + high) / 2;
    const result = grossToNet(contractType, mid, options);
    const diff = result.net - targetNet;
    best = mid;
    if (Math.abs(diff) <= precision) break;
    if (diff > 0) high = mid; else low = mid;
  }
  return grossToNet(contractType, best, options);
}

export function generateComparison(amount, options = {}) {
  return ['employment', 'mandate', 'specificWork', 'b2bScale', 'b2bLinear', 'b2bLumpSum'].map((type) => grossToNet(type, amount, options));
}
