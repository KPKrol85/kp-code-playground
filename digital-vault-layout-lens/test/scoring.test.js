import test from 'node:test';
import assert from 'node:assert/strict';

import { calculateAuditScore, calculateCategoryScores, SCORE_STATUSES } from '../assets/js/scoringEngine.js';
import { getApplicableRules } from '../assets/js/ruleApplicability.js';
import { generateRecommendations } from '../assets/js/recommendations.js';
import { assertUniqueIssueIds, createManualRuleIssueId } from '../assets/js/issueIds.js';
import { FINDING_SOURCES } from '../assets/js/findingMetadata.js';

const rules = [
  { id: 'alpha-rule', category: 'Layout structure', title: 'Alpha', description: 'Alpha text', severity: 'low' },
  { id: 'bravo-rule', category: 'Layout structure', title: 'Bravo', description: 'Bravo text', severity: 'high' },
  { id: 'charlie-rule', category: 'Accessibility basics', title: 'Charlie', description: 'Charlie text', severity: 'medium', applicability: { patterns: ['forms'] } },
  { id: 'delta-rule', category: 'Accessibility basics', title: 'Delta', description: 'Delta text', severity: 'medium', weight: 4 }
];
const profile = { severityMultipliers: { low: 1, medium: 1.5, high: 2 }, categoryMultipliers: { 'Accessibility basics': 2 } };

test('no reviewed applicable rules produces no score without invalid numbers', () => {
  const score = calculateAuditScore(rules, {});
  assert.equal(score.scorePercent, null);
  assert.equal(score.possiblePoints, 0);
  assert.equal(Number.isFinite(score.earnedPoints), true);
});

test('all applicable rules passing earns all possible points', () => {
  const score = calculateAuditScore(rules.slice(0, 2), { 'alpha-rule': 'pass', 'bravo-rule': 'pass' });
  assert.equal(score.scorePercent, 100);
  assert.equal(score.earnedPoints, 4);
  assert.equal(score.possiblePoints, 4);
});

test('needs-work rules count as possible but not earned points', () => {
  const score = calculateAuditScore(rules.slice(0, 2), { 'alpha-rule': 'pass', 'bravo-rule': 'needs-work' });
  assert.equal(score.scorePercent, 25);
  assert.equal(score.needsWorkRules, 1);
  assert.equal(score.earnedPoints, 1);
  assert.equal(score.possiblePoints, 4);
});

test('not-checked is excluded from earned points and possible points while remaining in progress totals', () => {
  const score = calculateAuditScore(rules.slice(0, 2), { 'alpha-rule': 'pass', 'bravo-rule': 'not-checked' });
  assert.equal(score.totalRules, 2);
  assert.equal(score.checkedRules, 1);
  assert.equal(score.notCheckedRules, 1);
  assert.equal(score.possiblePoints, 1);
});

test('not-applicable is checked but excluded from possible points', () => {
  const score = calculateAuditScore(rules.slice(0, 2), { 'alpha-rule': 'pass', 'bravo-rule': 'not-applicable' });
  assert.equal(score.checkedRules, 2);
  assert.equal(score.notApplicableRules, 1);
  assert.equal(score.possiblePoints, 1);
  assert.equal(score.scorePercent, 100);
});

test('mixed severity and profile weights affect score deterministically', () => {
  const score = calculateAuditScore(rules, { 'alpha-rule': 'pass', 'bravo-rule': 'needs-work', 'charlie-rule': 'pass', 'delta-rule': 'needs-work' }, profile);
  assert.equal(score.earnedPoints, 7);
  assert.equal(score.possiblePoints, 25);
  assert.equal(score.scorePercent, 28);
});

test('zero possible points avoids NaN, Infinity, and runtime errors', () => {
  const score = calculateAuditScore(rules.slice(0, 1), { 'alpha-rule': 'not-applicable' });
  assert.equal(score.scorePercent, null);
  assert.equal(Number.isNaN(score.scorePercent), false);
  assert.equal(score.possiblePoints, 0);
});

test('category scoring handles mixed statuses', () => {
  const scores = calculateCategoryScores(['Layout structure', 'Accessibility basics'], rules, { 'alpha-rule': 'pass', 'bravo-rule': 'needs-work', 'charlie-rule': 'not-applicable', 'delta-rule': 'not-checked' });
  assert.deepEqual(scores.map((score) => [score.categoryName, score.scorePercent, score.notApplicableRules, score.notCheckedRules]), [
    ['Layout structure', 25, 0, 0],
    ['Accessibility basics', null, 1, 1]
  ]);
});

test('conditional applicability excludes inactive rules', () => {
  const active = getApplicableRules(rules, { patternIds: [], presetId: 'landing-page' });
  assert.equal(active.some((rule) => rule.id === 'charlie-rule'), false);
});

test('score totals are deterministic regardless of rule input order', () => {
  const statuses = { 'alpha-rule': 'pass', 'bravo-rule': 'needs-work', 'charlie-rule': 'pass', 'delta-rule': 'not-applicable' };
  assert.deepEqual(calculateAuditScore(rules, statuses, profile), calculateAuditScore([...rules].reverse(), statuses, profile));
});

test('unknown statuses normalize to not-checked', () => {
  const score = calculateAuditScore(rules.slice(0, 1), { 'alpha-rule': 'unknown-status' });
  assert.equal(score.checkedRules, 0);
  assert.equal(score.notCheckedRules, 1);
  assert.equal(score.possiblePoints, 0);
});

test('manual issue IDs are stable and independent of order or display text', () => {
  assert.equal(createManualRuleIssueId('alpha-rule'), 'manual:alpha-rule');
  const first = generateRecommendations([rules[0]], { 'alpha-rule': 'needs-work' })[0].issueId;
  const renamed = { ...rules[0], title: 'Different title', description: 'Different text' };
  const second = generateRecommendations([rules[1], renamed], { 'alpha-rule': 'needs-work', 'bravo-rule': 'pass' }).find((item) => item.sourceRuleId === 'alpha-rule').issueId;
  assert.equal(first, second);
});

test('distinct findings cannot silently share an issue ID', () => {
  assert.throws(() => assertUniqueIssueIds([{ issueId: 'manual:alpha-rule', source: FINDING_SOURCES.manualReview }, { issueId: 'manual:alpha-rule', source: FINDING_SOURCES.manualReview }]), /Duplicate generated issueId/);
});
