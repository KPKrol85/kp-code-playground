import { TAX_CONFIG } from './tax-config.js';
import { clampPositive, round2 } from './utils.js';

function calculateProgressiveTax(annualBase) {
  const cfg = TAX_CONFIG.thresholds;
  const taxable = Math.max(0, annualBase);
  if (taxable <= cfg.firstBracketLimit) {
    return taxable * cfg.firstBracketRate;
  }
  const firstBracketTax = cfg.firstBracketLimit * cfg.firstBracketRate;
  return firstBracketTax + (taxable - cfg.firstBracketLimit) * cfg.secondBracketRate;
}

function calculateAnnualScaleTax(annualBase) {
  const relief = TAX_CONFIG.thresholds.annualTaxFreeAmount * TAX_CONFIG.thresholds.firstBracketRate;
  return Math.max(0, calculateProgressiveTax(annualBase) - relief);
}

function applyYouthRelief(annualTaxBase, annualRevenue, options = {}) {
  if (!options.under26) return annualTaxBase;
  const exemptRevenue = Math.min(Math.max(0, annualRevenue), TAX_CONFIG.under26AnnualExemption);
  return Math.max(0, annualTaxBase - exemptRevenue);
}

function calculateMonthlyPit(annualTaxBase, options = {}) {
  const monthly = calculateProgressiveTax(annualTaxBase) / 12;
  return options.pit2 ? Math.max(0, monthly - TAX_CONFIG.pit2MonthlyRelief) : monthly;
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
  const annualTaxBase = applyYouthRelief(Math.max(0, (g - socialTotal - costs) * 12), g * 12, options);
  const pit = calculateMonthlyPit(annualTaxBase, options);
  const ppk = options.ppk ? g * TAX_CONFIG.ppk.employeeRate : 0;
  const net = g - socialTotal - health - pit - ppk;
  return summarize('umowa o pracę', g, net, pit, social, health, ppk, calculateEmployerCost(g, options));
}

export function calculateMandateContract(gross, options = {}) {
  const s = TAX_CONFIG.socialRates;
  const g = clampPositive(gross);
  const social = { pension: g * s.pension, disability: g * s.disability, sickness: options.sickness ? g * s.sickness : 0 };
  const socialTotal = social.pension + social.disability + social.sickness;
  const health = (g - socialTotal) * TAX_CONFIG.healthRates.employee;
  const costRate = options.deductibleCosts === 'fifty' ? TAX_CONFIG.deductibleCosts.fiftyPercentRate : 0.2;
  const annualTaxBase = applyYouthRelief(Math.max(0, g - socialTotal - (g * costRate)) * 12, g * 12, options);
  const pit = calculateMonthlyPit(annualTaxBase, { ...options, pit2: false });
  const net = g - socialTotal - health - pit;
  return summarize('umowa zlecenie', g, net, pit, social, health, 0, null);
}

export function calculateSpecificWorkContract(gross, options = {}) {
  const g = clampPositive(gross);
  const costRate = options.deductibleCosts === 'fifty' ? TAX_CONFIG.deductibleCosts.fiftyPercentRate : 0.2;
  const annualTaxBase = Math.max(0, g - (g * costRate)) * 12;
  const pit = calculateMonthlyPit(annualTaxBase, { ...options, under26: false, pit2: false });
  const net = g - pit;
  return summarize('umowa o dzieło', g, net, pit, { pension: 0, disability: 0, sickness: 0 }, 0, 0, null);
}

function getB2BZus(options) {
  if (options.zusType === 'custom') {
    return {
      social: clampPositive(options.customSocial),
      customHealth: clampPositive(options.customHealth),
    };
  }
  return TAX_CONFIG.b2bZus[options.zusType] || TAX_CONFIG.b2bZus.full;
}

function resolveB2BHealth(zus, calculatedHealth) {
  if (Number.isFinite(zus.customHealth) && zus.customHealth > 0) {
    return zus.customHealth;
  }
  return calculatedHealth;
}

export function calculateB2BScale(gross, options = {}) {
  const g = clampPositive(gross);
  const zus = getB2BZus(options);
  const taxBase = Math.max(0, g - zus.social);
  const healthCalculated = Math.max(TAX_CONFIG.healthMinimums.b2bScale, taxBase * TAX_CONFIG.healthRates.b2bScale);
  const health = resolveB2BHealth(zus, healthCalculated);
  const annualTax = calculateAnnualScaleTax((g - zus.social) * 12);
  const pit = annualTax / 12;
  const net = g - zus.social - health - pit;
  return summarize('B2B skala podatkowa', g, net, pit, { pension: zus.social, disability: 0, sickness: 0 }, health, 0, null);
}

export function calculateB2BLinear(gross, options = {}) {
  const g = clampPositive(gross);
  const zus = getB2BZus(options);
  const taxBase = Math.max(0, g - zus.social);
  const pit = taxBase * TAX_CONFIG.thresholds.linearRate;
  const healthCalculated = Math.max(TAX_CONFIG.healthMinimums.b2bLinear, taxBase * TAX_CONFIG.healthRates.b2bLinear);
  const health = resolveB2BHealth(zus, healthCalculated);
  const net = g - zus.social - health - pit;
  return summarize('B2B podatek liniowy', g, net, pit, { pension: zus.social, disability: 0, sickness: 0 }, health, 0, null);
}

export function calculateB2BLumpSum(gross, options = {}) {
  const g = clampPositive(gross);
  const zus = getB2BZus(options);
  const rate = TAX_CONFIG.b2bLumpSumRates.it;
  const pit = g * rate;
  const annualRevenue = g * 12;
  let healthCalculated = TAX_CONFIG.healthMinimums.b2bLumpSumMid;
    if (annualRevenue > 300000) healthCalculated = TAX_CONFIG.healthMinimums.b2bLumpSumHigh;
  if (annualRevenue <= 60000) healthCalculated = TAX_CONFIG.healthMinimums.b2bLumpSumLow;
  const health = resolveB2BHealth(zus, healthCalculated);
  const net = g - zus.social - health - pit;
  return summarize('B2B ryczałt', g, net, pit, { pension: zus.social, disability: 0, sickness: 0 }, health, 0, null);
}

function summarize(label, gross, net, pit, social, health, ppk, employerCost) {
  const socialRounded = {
    pension: round2(social.pension),
    disability: round2(social.disability),
    sickness: round2(social.sickness),
  };
  const socialTotal = socialRounded.pension + socialRounded.disability + socialRounded.sickness;
  return {
    label,
    gross: round2(gross),
    net: round2(Math.max(0, net)),
    pit: round2(pit),
    social: socialRounded,
    socialTotal: round2(socialTotal),
    health: round2(health),
    ppk: round2(ppk),
    totalDeductions: round2(socialTotal + health + pit + ppk),
    effectiveBurden: gross > 0 ? round2((1 - (Math.max(0, net) / gross)) * 100) : 0,
    employerCost: employerCost ? round2(employerCost) : null,
  };
}

export function grossToNet(contractType, amount, options) {
  const map = { employment: calculateEmploymentContract, mandate: calculateMandateContract, specificWork: calculateSpecificWorkContract, b2bScale: calculateB2BScale, b2bLinear: calculateB2BLinear, b2bLumpSum: calculateB2BLumpSum };
  const calculate = map[contractType] || map.employment;
  return calculate(amount, options);
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

export function generateComparison(amount, options = {}, direction = 'grossToNet') {
  return ['employment', 'mandate', 'specificWork', 'b2bScale', 'b2bLinear', 'b2bLumpSum']
    .map((type) => (direction === 'netToGross' ? netToGross(type, amount, options) : grossToNet(type, amount, options)));
}
