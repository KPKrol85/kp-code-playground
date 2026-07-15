import test from 'node:test';
import assert from 'node:assert/strict';

import { createInitialAnnotationState, createPreviewAnnotation, deletePreviewAnnotation, updatePreviewAnnotation } from '../assets/js/previewAnnotations.js';
import { createAuditStateExport } from '../assets/js/auditStorage.js';
import { createInitialComparisonChecklistState, resetComparisonChecklist, setBreakpointReviewed, summarizeComparisonChecklist, updateBreakpointObservation } from '../assets/js/viewportComparisonChecklist.js';

test('preview annotations create stable IDs with viewport, overlay, and focused target metadata', () => {
  let state = createInitialAnnotationState();
  const first = createPreviewAnnotation(state, { note: '  Hero overflows\n at focus target ', viewportWidth: 390, overlayMode: 'overflow', focusedElement: { type: 'a', name: 'Buy now', details: 'href: /buy', position: '1 of 2' }, createdAt: 'fixed' });
  state = first.state;
  const second = createPreviewAnnotation(state, { note: 'Spacing evidence', viewportWidth: 768, overlayMode: 'spacing' });
  assert.equal(first.annotation.id, 'preview-annotation-1');
  assert.equal(second.annotation.id, 'preview-annotation-2');
  assert.equal(first.annotation.note, 'Hero overflows at focus target');
  assert.equal(first.annotation.viewportWidth, 390);
  assert.equal(first.annotation.overlayMode, 'overflow');
  assert.equal(first.annotation.focusedElement.name, 'Buy now');
});

test('preview annotations normalize malformed input and support edit/delete', () => {
  let state = createInitialAnnotationState();
  const empty = createPreviewAnnotation(state, { note: '   ', viewportWidth: 'bad' });
  assert.equal(empty.annotation, null);
  let result = createPreviewAnnotation(state, { note: '<b>Plain text only</b>', viewportWidth: 'wide', overlayMode: null });
  state = result.state;
  assert.equal(result.annotation.viewportWidth, 0);
  assert.equal(result.annotation.note, '<b>Plain text only</b>');
  result = updatePreviewAnnotation(state, 'preview-annotation-1', { note: ' Updated note ' });
  state = result.state;
  assert.equal(result.annotation.note, 'Updated note');
  const deleted = deletePreviewAnnotation(state, 'preview-annotation-1');
  assert.equal(deleted.deleted, true);
  assert.equal(deleted.state.items.length, 0);
});

test('comparison checklist tracks reviewed status, observations, and reset behavior', () => {
  let state = createInitialComparisonChecklistState();
  assert.deepEqual(summarizeComparisonChecklist(state), { reviewed: 0, total: 3, pending: 3 });
  state = setBreakpointReviewed(state, 'mobile', true);
  state = updateBreakpointObservation(state, 'mobile', '  Header wraps after manual screenshot. ');
  assert.equal(state.mobile.reviewed, true);
  assert.equal(state.mobile.observation, 'Header wraps after manual screenshot.');
  assert.deepEqual(summarizeComparisonChecklist(state), { reviewed: 1, total: 3, pending: 2 });
  assert.deepEqual(resetComparisonChecklist(), createInitialComparisonChecklistState());
});

test('annotations and comparison checklist remain separate from audit export scoring/analyzer state', () => {
  const annotation = createPreviewAnnotation(createInitialAnnotationState(), { note: 'Preview only', viewportWidth: 1180, overlayMode: 'headings' }).state;
  const comparison = setBreakpointReviewed(createInitialComparisonChecklistState(), 'desktop', true);
  const audit = createAuditStateExport({ selectedPresetId: 'landing-page', selectedRulePackId: 'all-rules', selectedSeverityProfileId: 'baseline', ruleSchemaVersion: 2, ruleStatuses: { layout: 'pass' }, ruleNotes: {} });
  const serialized = JSON.stringify(audit);
  assert.equal(annotation.items.length, 1);
  assert.equal(comparison.desktop.reviewed, true);
  assert.equal(serialized.includes('annotation'), false);
  assert.equal(serialized.includes('comparison'), false);
  assert.equal(serialized.includes('analyzer'), false);
});
