import { grossToNet, netToGross, generateComparison } from '../js/calculations.js';
import { annualize, monthlyToPeriod } from '../js/utils.js';

/*
 * Current-behavior characterization tests. They freeze the deterministic
 * implementation as it exists today; they are not tax-reference cases and do
 * not certify formulas, constants, rounding, or Polish-law compliance.
 * Expected values may intentionally change after official-rule verification.
 * Future substantive-accuracy tests must use reliable documented sources or
 * specialist-reviewed reference cases and remain distinct from this suite.
 */

const baseOptions = {
  under26: false,
  ppk: false,
  pit2: true,
  deductibleCosts: 'standard',
  vatPayer: true,
  zusType: 'full',
  customSocial: 0,
  customHealth: 0,
};

const contractTypes = ['employment', 'mandate', 'specificWork', 'b2bScale', 'b2bLinear', 'b2bLumpSum'];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function equal(actual, expected, message) {
  assert(actual === expected, `${message}: expected ${expected}, got ${actual}`);
}

function approx(actual, expected, tolerance, message) {
  assert(Math.abs(actual - expected) <= tolerance, `${message}: expected ${expected} ± ${tolerance}, got ${actual}`);
}

function moneyFields(result) {
  return [result.gross, result.net, result.pit, result.health, result.ppk, result.socialTotal, result.totalDeductions,
    result.social.pension, result.social.disability, result.social.sickness, result.employerCost].filter((value) => value !== null);
}

function testCurrentBehaviorGrossToNetSnapshots() {
  const expectedNet = { employment: 7146.91, mandate: 7250.46, specificWork: 9040, b2bScale: 6677.86, b2bLinear: 6106.78, b2bLumpSum: 6250.31 };
  const expectedPit = { employment: 705.48, mandate: 824.88, specificWork: 960, b2bScale: 668.79, b2bLinear: 1533.92, b2bLumpSum: 1200 };

  for (const contractType of contractTypes) {
    const result = grossToNet(contractType, 10000, baseOptions);
    equal(result.gross, 10000, `${contractType} current behavior preserves gross`);
    equal(result.net, expectedNet[contractType], `${contractType} current behavior net snapshot`);
    equal(result.pit, expectedPit[contractType], `${contractType} current behavior PIT snapshot`);
  }
}

function testCurrentBehaviorReverseSearchConvergesForEveryPath() {
  for (const contractType of contractTypes) {
    const result = netToGross(contractType, 7000, baseOptions);
    approx(result.net, 7000, 0.01, `${contractType} current behavior reverse search`);
    assert(Number.isFinite(result.gross) && result.gross >= 0, `${contractType} reverse search returns finite gross`);
  }
}

function testCurrentBehaviorEmploymentOptions() {
  const youth = grossToNet('employment', 10000, { ...baseOptions, under26: true });
  equal(youth.net, 7852.39, 'employment under-26 net snapshot');
  equal(youth.pit, 0, 'employment under-26 PIT snapshot');

  const ppkAndCosts = grossToNet('employment', 10000, {
    ...baseOptions, ppk: true, pit2: false, deductibleCosts: 'elevated',
  });
  equal(ppkAndCosts.net, 6652.91, 'employment PPK, PIT-2, and elevated KUP net snapshot');
  equal(ppkAndCosts.ppk, 200, 'employment PPK snapshot');
  equal(ppkAndCosts.pit, 999.48, 'employment PIT-2 and elevated KUP PIT snapshot');
  equal(ppkAndCosts.employerCost, 12198, 'employment PPK employer-cost snapshot');
}

function testCurrentBehaviorMandateAndSpecificWorkOptions() {
  const mandate = grossToNet('mandate', 10000, { ...baseOptions, deductibleCosts: 'fifty', sickness: true });
  equal(mandate.net, 7416.91, 'mandate 50% KUP and sickness net snapshot');
  equal(mandate.social.sickness, 245, 'mandate sickness snapshot');
  equal(grossToNet('mandate', 10000, { ...baseOptions, under26: true }).pit, 0, 'mandate under-26 PIT snapshot');

  const specificWork = grossToNet('specificWork', 10000, { ...baseOptions, deductibleCosts: 'fifty' });
  equal(specificWork.net, 9400, 'specific-work 50% KUP net snapshot');
  equal(specificWork.pit, 600, 'specific-work 50% KUP PIT snapshot');
  const withReliefs = grossToNet('specificWork', 10000, { ...baseOptions, deductibleCosts: 'fifty', under26: true, pit2: true });
  equal(withReliefs.net, specificWork.net, 'specific-work current behavior ignores relief flags');
}

function testCurrentBehaviorB2BZusVariantsAndCustomContributions() {
  const expected = {
    b2bScale: { preferential: 7839.62, starter: 8200, custom: 8312.46 },
    b2bLinear: { preferential: 7262.85, starter: 7610, custom: 7321.11 },
    b2bLumpSum: { preferential: 7720.89, starter: 8177.07, custom: 7997.65 },
  };
  for (const contractType of Object.keys(expected)) {
    for (const zusType of ['preferential', 'starter']) {
      equal(grossToNet(contractType, 10000, { ...baseOptions, zusType }).net, expected[contractType][zusType], `${contractType} ${zusType} ZUS net snapshot`);
    }
    const custom = grossToNet(contractType, 10000, { ...baseOptions, zusType: 'custom', customSocial: 123.45, customHealth: 678.9 });
    equal(custom.net, expected[contractType].custom, `${contractType} custom ZUS net snapshot`);
    equal(custom.social.pension, 123.45, `${contractType} custom social contribution snapshot`);
    equal(custom.health, 678.9, `${contractType} custom health contribution snapshot`);
  }
}

function testCurrentBehaviorAnnualModeTransformsMonthlyEngineValues() {
  const monthlyInput = annualize(120000, 'yearly');
  equal(monthlyInput, 10000, 'annual input is divided into monthly engine input');
  const monthlyResult = grossToNet('employment', monthlyInput, baseOptions);
  equal(monthlyToPeriod(monthlyResult.net, 'yearly'), 85762.92, 'annual output is monthly output multiplied by twelve');
  equal(monthlyToPeriod(monthlyResult.net, 'monthly'), monthlyResult.net, 'monthly output remains unchanged');
}

function testCurrentBehaviorInvalidLargeAndFiniteResults() {
  for (const contractType of contractTypes) {
    for (const value of [0, -100, 'not-a-number']) {
      const result = grossToNet(contractType, value, baseOptions);
      equal(result.gross, 0, `${contractType} clamps ${String(value)} gross input`);
      for (const field of moneyFields(result)) assert(Number.isFinite(field), `${contractType} ${String(value)} has finite monetary fields`);
    }
    const large = grossToNet(contractType, 1000000000, baseOptions);
    for (const field of moneyFields(large)) assert(Number.isFinite(field), `${contractType} unusually large input has finite monetary fields`);
  }
}

function testCurrentBehaviorIsDeterministicAndRoundedToCents() {
  for (const contractType of contractTypes) {
    const first = grossToNet(contractType, 12345.678, baseOptions);
    const second = grossToNet(contractType, 12345.678, baseOptions);
    equal(JSON.stringify(first), JSON.stringify(second), `${contractType} repeated calculation is deterministic`);
    for (const field of moneyFields(first)) equal(field, Math.round(field * 100) / 100, `${contractType} displayed monetary field is rounded to cents`);
  }
}

function testCurrentBehaviorComparisonIncludesAllPathsInBothDirections() {
  for (const direction of ['grossToNet', 'netToGross']) {
    const comparison = generateComparison(direction === 'grossToNet' ? 10000 : 7000, baseOptions, direction);
    equal(comparison.length, contractTypes.length, `${direction} comparison count`);
    equal(comparison.map((result) => result.label).length, new Set(comparison.map((result) => result.label)).size, `${direction} comparison labels remain distinct`);
  }
}

const tests = [
  testCurrentBehaviorGrossToNetSnapshots,
  testCurrentBehaviorReverseSearchConvergesForEveryPath,
  testCurrentBehaviorEmploymentOptions,
  testCurrentBehaviorMandateAndSpecificWorkOptions,
  testCurrentBehaviorB2BZusVariantsAndCustomContributions,
  testCurrentBehaviorAnnualModeTransformsMonthlyEngineValues,
  testCurrentBehaviorInvalidLargeAndFiniteResults,
  testCurrentBehaviorIsDeterministicAndRoundedToCents,
  testCurrentBehaviorComparisonIncludesAllPathsInBothDirections,
];

for (const test of tests) {
  test();
  console.log(`✓ ${test.name}`);
}

console.log(`All ${tests.length} current-behavior characterization tests passed.`);
