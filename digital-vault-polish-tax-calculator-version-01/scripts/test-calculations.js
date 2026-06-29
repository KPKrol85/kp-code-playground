import assert from 'node:assert/strict';
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

function approx(actual, expected, tolerance = 1) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected} by more than ${tolerance}`);
}

for (const contractType of contractTypes) {
  const result = grossToNet(contractType, 10000, baseOptions);
  assert.equal(typeof result.label, 'string');
  assert.ok(result.gross === 10000, `${contractType} keeps gross amount`);
  assert.ok(result.net > 0 && result.net <= 10000, `${contractType} returns plausible net`);
  assert.ok(result.totalDeductions >= 0, `${contractType} returns deductions`);
}

approx(grossToNet('employment', 10000, baseOptions).net, 7146.91, 0.05);
approx(grossToNet('b2bLinear', 10000, baseOptions).net, 6106.78, 0.05);

for (const contractType of contractTypes) {
  const targetNet = 7000;
  const reverse = netToGross(contractType, targetNet, baseOptions);
  approx(reverse.net, targetNet, 0.05);
  assert.ok(reverse.gross >= targetNet, `${contractType} reverse gross should cover target net`);
}

const grossComparison = generateComparison(10000, baseOptions, 'grossToNet');
assert.equal(grossComparison.length, contractTypes.length);
assert.ok(grossComparison.every((item) => item.net > 0));

const netComparison = generateComparison(7000, baseOptions, 'netToGross');
assert.equal(netComparison.length, contractTypes.length);
assert.ok(netComparison.every((item) => Math.abs(item.net - 7000) <= 0.05));

console.log('Calculation smoke tests passed.');
