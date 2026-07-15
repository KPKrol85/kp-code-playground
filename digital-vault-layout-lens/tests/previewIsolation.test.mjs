import test from 'node:test';
import assert from 'node:assert/strict';

import { auditRules } from '../assets/js/auditRules.js';
import { createAuditStateExport, parseImportedAuditState } from '../assets/js/auditStorage.js';
import { calculateAuditScore, calculateCategoryScores, SCORE_STATUSES } from '../assets/js/scoringEngine.js';
import { createPreviewAnnotation, createInitialAnnotationState } from '../assets/js/previewAnnotations.js';
import { createInitialComparisonChecklistState, setBreakpointReviewed, updateBreakpointObservation } from '../assets/js/viewportComparisonChecklist.js';
import { createOverlayState, setOverlayMode } from '../assets/js/overlayConfig.js';
import { applyPresetViewport, createInitialViewportState } from '../assets/js/viewportControls.js';

const ruleIds = new Set(auditRules.map((rule) => rule.id));
const statuses = Object.fromEntries(auditRules.map((rule, index) => [rule.id, index === 0 ? SCORE_STATUSES.PASS : SCORE_STATUSES.NOT_CHECKED]));
const validOptions = {
  validPresetIds: new Set(['landing-page']),
  validRuleIds: ruleIds,
  validStatuses: new Set(Object.values(SCORE_STATUSES)),
  validRulePackIds: new Set(['all-rules']),
  validSeverityProfileIds: new Set(['baseline']),
  currentRuleSchemaVersion: 1,
  compatibleRuleSchemaVersions: [1]
};

test('preview viewport, overlay, annotations, and breakpoint state do not affect manual scoring', () => {
  const before = calculateAuditScore(auditRules, statuses);
  const categoryBefore = calculateCategoryScores(['Layout structure', 'Accessibility basics'], auditRules, statuses);
  const viewport = applyPresetViewport(createInitialViewportState(), 'mobile');
  const overlay = setOverlayMode(createOverlayState(), 'overflow');
  const annotations = createPreviewAnnotation(createInitialAnnotationState(), { note: 'Visual note only', viewportWidth: viewport.width, overlayMode: overlay.activeMode }).state;
  let checklist = createInitialComparisonChecklistState();
  checklist = setBreakpointReviewed(checklist, 'mobile', true);
  checklist = updateBreakpointObservation(checklist, 'mobile', 'Looks acceptable at mobile width.');

  assert.equal(annotations.items.length, 1);
  assert.equal(checklist.mobile.reviewed, true);
  assert.deepEqual(calculateAuditScore(auditRules, statuses), before);
  assert.deepEqual(calculateCategoryScores(['Layout structure', 'Accessibility basics'], auditRules, statuses), categoryBefore);
});

test('preview state helpers do not mutate rule definitions or create findings', () => {
  const firstRuleBefore = structuredClone(auditRules[0]);
  const result = createPreviewAnnotation(createInitialAnnotationState(), { note: 'Do not convert to finding', viewportWidth: 390, overlayMode: 'focusable', focusedElement: { type: 'button', name: 'Save' } });
  assert.deepEqual(auditRules[0], firstRuleBefore);
  assert.equal(result.annotation.id.startsWith('manual:'), false);
  assert.equal(Object.hasOwn(result.annotation, 'issueId'), false);
  assert.equal(Object.hasOwn(result.annotation, 'severity'), false);
  assert.equal(Object.hasOwn(result.annotation, 'wcag'), false);
});

test('audit export/import excludes unsupported preview fields safely', () => {
  const exported = createAuditStateExport({ selectedPresetId: 'landing-page', selectedRulePackId: 'all-rules', selectedSeverityProfileId: 'baseline', ruleStatuses: statuses, ruleNotes: {}, ruleSchemaVersion: 1 });
  assert.equal(Object.hasOwn(exported.audit, 'preview'), false);
  exported.audit.preview = { annotations: [{ issueId: 'manual:fake', ruleStatuses: { [auditRules[0].id]: 'needs-work' } }], overlayMode: 'spacing' };
  exported.audit.ruleStatuses[auditRules[0].id] = SCORE_STATUSES.PASS;
  const imported = parseImportedAuditState(JSON.stringify(exported), validOptions);
  assert.equal(imported.status, 'loaded');
  assert.equal(imported.state.ruleStatuses[auditRules[0].id], SCORE_STATUSES.PASS);
  assert.equal(Object.hasOwn(imported.state, 'preview'), false);
});

test('preview reset and manual reset boundaries remain separate pure states', () => {
  const manualStatuses = { ...statuses };
  const notes = { [auditRules[0].id]: 'Manual reviewer note' };
  const previewReset = createInitialComparisonChecklistState();
  assert.deepEqual(manualStatuses, statuses);
  assert.deepEqual(notes, { [auditRules[0].id]: 'Manual reviewer note' });

  const manualResetStatuses = Object.fromEntries(auditRules.map((rule) => [rule.id, SCORE_STATUSES.NOT_CHECKED]));
  const previewAnnotation = createPreviewAnnotation(createInitialAnnotationState(), { note: 'Session-only preview evidence', viewportWidth: 1180, overlayMode: 'headings' }).state;
  assert.equal(previewAnnotation.items.length, 1);
  assert.equal(previewReset.mobile.reviewed, false);
  assert.equal(manualResetStatuses[auditRules[0].id], SCORE_STATUSES.NOT_CHECKED);
});
