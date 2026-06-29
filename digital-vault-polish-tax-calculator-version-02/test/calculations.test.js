import test from "node:test";
import assert from "node:assert/strict";

import {
  byPeriod,
  calculateEmployerCost,
  generateComparison,
  grossToNet,
  netToGross,
} from "../js/calculations.js";

const DEFAULT_OPTIONS = {
  pit2: true,
  under26: false,
  deductibleCosts: "standard",
  ppk: false,
  zusType: "full",
};

const REPRESENTATIVE_MONTHLY_AMOUNT = 10_000;

const assertFinitePositive = (value, label) => {
  assert.equal(Number.isFinite(value), true, `${label} should be finite`);
  assert.ok(value > 0, `${label} should be positive`);
};

const assertApproxEqual = (actual, expected, tolerance = 0.01, label = "value") => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: expected ${actual} to be within ${tolerance} of ${expected}`,
  );
};

const assertHasMoneyFields = (result) => {
  for (const field of ["gross", "net", "pit", "health", "taxAdvance"]) {
    assert.equal(field in result, true, `result should include ${field}`);
    assert.equal(Number.isFinite(result[field]), true, `${field} should be finite`);
  }
};

const grossToNetCases = [
  ["employment / umowa o pracę", "employment", { net: 7446.91, pit: 405.48, health: 776.61 }],
  ["mandate / umowa zlecenie", "mandate", { net: 7624.006, pit: 228.384, health: 776.61 }],
  ["specific work / umowa o dzieło", "specificWork", { net: 9640, pit: 360, health: 0 }],
  ["B2B scale", "b2bScale", { net: 7524, pit: 408, health: 468 }],
  ["B2B linear", "b2bLinear", { net: 6549.2, pit: 1596, health: 254.8 }],
  ["B2B lump sum", "b2bLumpSum", { net: 6732, pit: 1200, health: 468 }],
];

for (const [name, contractType, expected] of grossToNetCases) {
  test(`grossToNet calculates ${name} estimate for representative monthly amount`, () => {
    const result = grossToNet(REPRESENTATIVE_MONTHLY_AMOUNT, contractType, DEFAULT_OPTIONS);

    assertHasMoneyFields(result);
    assert.equal(result.gross, REPRESENTATIVE_MONTHLY_AMOUNT);
    assertApproxEqual(result.net, expected.net, 0.001, `${contractType} net`);
    assertApproxEqual(result.pit, expected.pit, 0.001, `${contractType} pit`);
    assertApproxEqual(result.health, expected.health, 0.001, `${contractType} health`);
  });
}

test("netToGross returns gross amount that approximates target employment net", () => {
  const targetNet = 7000;
  const gross = netToGross(targetNet, "employment", DEFAULT_OPTIONS);
  const recalculated = grossToNet(gross, "employment", DEFAULT_OPTIONS);

  assertFinitePositive(gross, "calculated gross");
  assertApproxEqual(recalculated.net, targetNet, 1, "round-trip net");
});

test("employment calculation includes employer cost above gross amount", () => {
  const employerCost = calculateEmployerCost(REPRESENTATIVE_MONTHLY_AMOUNT);

  assertFinitePositive(employerCost, "employer cost");
  assert.ok(employerCost > REPRESENTATIVE_MONTHLY_AMOUNT, "employer cost should be greater than gross");
});

test("yearly values are monthly values multiplied by 12 where applicable", () => {
  const shaped = byPeriod(grossToNet(REPRESENTATIVE_MONTHLY_AMOUNT, "employment", DEFAULT_OPTIONS), "monthly");

  for (const [field, monthlyValue] of Object.entries(shaped.monthly)) {
    assertApproxEqual(shaped.yearly[field], monthlyValue * 12, 0.01, `${field} yearly value`);
  }
});

test("generateComparison returns all supported contract types", () => {
  const comparison = generateComparison(REPRESENTATIVE_MONTHLY_AMOUNT, "grossToNet", DEFAULT_OPTIONS);
  const contractTypes = comparison.map((result) => result.contractType);

  assert.deepEqual(contractTypes, [
    "employment",
    "mandate",
    "specificWork",
    "b2bScale",
    "b2bLinear",
    "b2bLumpSum",
  ]);
  for (const result of comparison) {
    assertFinitePositive(result.gross, `${result.contractType} gross`);
    assertFinitePositive(result.net, `${result.contractType} net`);
    assert.equal(Number.isFinite(result.burden), true, `${result.contractType} burden should be finite`);
  }
});

test("zero amount smoke test returns finite non-negative calculation fields", () => {
  const result = grossToNet(0, "employment", DEFAULT_OPTIONS);

  for (const [field, value] of Object.entries(result)) {
    assert.equal(Number.isFinite(value), true, `${field} should be finite`);
    assert.ok(value >= 0, `${field} should be non-negative`);
  }
});

test("under-26 option increases employment net by removing PIT in current model", () => {
  const standard = grossToNet(REPRESENTATIVE_MONTHLY_AMOUNT, "employment", DEFAULT_OPTIONS);
  const under26 = grossToNet(REPRESENTATIVE_MONTHLY_AMOUNT, "employment", { ...DEFAULT_OPTIONS, under26: true });

  assert.equal(under26.pit, 0);
  assert.ok(under26.net > standard.net);
});

test("PIT-2 option reduces employment PIT and increases net in current model", () => {
  const withPit2 = grossToNet(REPRESENTATIVE_MONTHLY_AMOUNT, "employment", { ...DEFAULT_OPTIONS, pit2: true });
  const withoutPit2 = grossToNet(REPRESENTATIVE_MONTHLY_AMOUNT, "employment", { ...DEFAULT_OPTIONS, pit2: false });

  assert.ok(withPit2.pit < withoutPit2.pit);
  assert.ok(withPit2.net > withoutPit2.net);
  assertApproxEqual(withPit2.net - withoutPit2.net, 300, 0.01, "PIT-2 net effect");
});

test("PPK option reduces employment net in current model", () => {
  const withoutPpk = grossToNet(REPRESENTATIVE_MONTHLY_AMOUNT, "employment", { ...DEFAULT_OPTIONS, ppk: false });
  const withPpk = grossToNet(REPRESENTATIVE_MONTHLY_AMOUNT, "employment", { ...DEFAULT_OPTIONS, ppk: true });

  assert.ok(withPpk.net < withoutPpk.net);
  assertApproxEqual(withoutPpk.net - withPpk.net, 200, 0.01, "PPK net effect");
});

test("50% KUP for specific work changes net in current model", () => {
  const standardKup = grossToNet(REPRESENTATIVE_MONTHLY_AMOUNT, "specificWork", {
    ...DEFAULT_OPTIONS,
    deductibleCosts: "standard",
  });
  const fiftyPercentKup = grossToNet(REPRESENTATIVE_MONTHLY_AMOUNT, "specificWork", {
    ...DEFAULT_OPTIONS,
    deductibleCosts: "fiftyPercent",
  });

  assert.ok(fiftyPercentKup.net >= standardKup.net);
  assertApproxEqual(fiftyPercentKup.net, 10000, 0.01, "specific work 50% KUP net");
});

test("custom B2B ZUS values are used by current B2B linear model", () => {
  const result = grossToNet(REPRESENTATIVE_MONTHLY_AMOUNT, "b2bLinear", {
    ...DEFAULT_OPTIONS,
    zusType: "custom",
    customSocial: 1000,
    customHealth: 500,
  });

  assertApproxEqual(result.health, 500, 0.01, "custom health contribution");
  assertApproxEqual(result.pit, 1710, 0.01, "custom B2B linear PIT");
  assertApproxEqual(result.net, 6790, 0.01, "custom B2B linear net");
});
