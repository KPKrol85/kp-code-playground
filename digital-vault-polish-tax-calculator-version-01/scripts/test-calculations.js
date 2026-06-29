import { grossToNet, netToGross, generateComparison } from '../js/calculations.js';

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

function approx(actual, expected, tolerance, message) {
  const delta = Math.abs(actual - expected);
  assert(delta <= tolerance, `${message}: expected ${expected} ± ${tolerance}, got ${actual}`);
}

function testGrossToNetSmoke() {
  for (const contractType of contractTypes) {
    const result = grossToNet(contractType, 10000, baseOptions);
    assert(result.gross === 10000, `${contractType}: gross should be preserved`);
    assert(result.net > 0 && result.net <= result.gross, `${contractType}: net should be positive and not exceed gross`);
    assert(result.totalDeductions >= 0, `${contractType}: deductions should not be negative`);
  }
}

function testRepresentativeRegressionValues() {
  approx(grossToNet('employment', 10000, baseOptions).net, 7146.91, 0.05, 'employment 10000 gross net');
  approx(grossToNet('mandate', 10000, baseOptions).net, 7250.46, 0.05, 'mandate 10000 gross net');
  approx(grossToNet('specificWork', 10000, baseOptions).net, 9040, 0.05, 'specific work 10000 gross net');
  approx(grossToNet('b2bLinear', 10000, baseOptions).net, 6106.78, 0.05, 'B2B linear 10000 revenue net');
}

function testNetToGrossSmoke() {
  for (const contractType of contractTypes) {
    const result = netToGross(contractType, 7000, baseOptions);
    approx(result.net, 7000, 0.05, `${contractType}: reverse net target`);
    assert(result.gross >= result.net, `${contractType}: required gross/revenue should be at least target net`);
  }
}

function testComparisonShape() {
  const grossComparison = generateComparison(10000, baseOptions, 'grossToNet');
  const netComparison = generateComparison(7000, baseOptions, 'netToGross');
  assert(grossComparison.length === contractTypes.length, 'gross comparison should include all contract types');
  assert(netComparison.length === contractTypes.length, 'net comparison should include all contract types');
}

const tests = [
  testGrossToNetSmoke,
  testRepresentativeRegressionValues,
  testNetToGrossSmoke,
  testComparisonShape,
];

for (const test of tests) {
  test();
  console.log(`✓ ${test.name}`);
}

console.log(`All ${tests.length} calculation tests passed.`);
