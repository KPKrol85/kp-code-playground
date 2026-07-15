import test from 'node:test';
import assert from 'node:assert/strict';
import { OVERLAY_MODE_IDS, OVERLAY_MODES, createOverlayState, normalizeOverlayMode, setOverlayMode } from '../assets/js/overlayConfig.js';
import { endKeyboardAudit, nextKeyboardAuditTarget, previousKeyboardAuditTarget, resetKeyboardAuditForPreviewRefresh, restartKeyboardAudit, startKeyboardAudit } from '../assets/js/keyboardAuditState.js';
import { createPreviewCommand, validatePreviewCommand, validatePreviewResponse } from '../assets/js/previewInspectionProtocol.js';
import { classifyOverflow, orderFocusableDescriptors, overlayRemovalSummary } from '../assets/js/previewInspectionHelpers.js';
import { getPreviewScrollBehavior, getPreviewViewportMotionState, isReducedMotionRequested } from '../assets/js/previewMotion.js';

test('overlay configuration contains required single active modes and normalizes invalid values', () => {
  assert.deepEqual(OVERLAY_MODE_IDS, ['off', 'spacing', 'layout-boxes', 'headings', 'focusable', 'overflow']);
  assert.equal(new Set(OVERLAY_MODES.map((mode) => mode.id)).size, OVERLAY_MODES.length);
  assert.equal(normalizeOverlayMode('bad'), 'off');
  assert.deepEqual(createOverlayState('spacing'), { activeMode: 'spacing' });
  assert.deepEqual(setOverlayMode(createOverlayState('spacing'), 'headings'), { activeMode: 'headings' });
  assert.deepEqual(overlayRemovalSummary(2, 4), { markersRemoved: 2, classesRemoved: 4, activeMode: 'off' });
});

test('focusable descriptors follow browser-like positive tabindex then document order', () => {
  const ordered = orderFocusableDescriptors([
    { id: 'link', native: true },
    { id: 'disabled-button', native: true, disabled: true },
    { id: 'hidden-input', native: true, visible: false },
    { id: 'minus-one', native: true, tabindex: -1 },
    { id: 'tab-three', native: false, tabindex: 3 },
    { id: 'button', native: true },
    { id: 'tab-one', native: false, tabindex: 1 },
    { id: 'select', native: true },
    { id: 'textarea', native: true },
    { id: 'inert-link', native: true, inert: true },
    { id: 'tab-one' }
  ]);
  assert.deepEqual(ordered.map((item) => item.id), ['tab-one', 'tab-three', 'link', 'button', 'select', 'textarea']);
  assert.deepEqual(ordered.map((item) => item.position), [1, 2, 3, 4, 5, 6]);
});

test('overflow helper distinguishes fitting, viewport escape, horizontal overflow, and scroll containers', () => {
  assert.deepEqual(classifyOverflow({ scrollWidth: 100, clientWidth: 100, rect: { left: 0, right: 100 }, viewportWidth: 320 }), { overflow: false, kind: 'fits', direction: 'none' });
  assert.equal(classifyOverflow({ scrollWidth: 600, clientWidth: 300, rect: { left: 0, right: 300 }, viewportWidth: 320 }).kind, 'uncertain-overflow');
  assert.equal(classifyOverflow({ scrollWidth: 600, clientWidth: 300, rect: { left: 0, right: 300 }, viewportWidth: 320, overflowX: 'auto' }).kind, 'intentional-scroll');
  assert.equal(classifyOverflow({ scrollWidth: 300, clientWidth: 300, rect: { left: 0, right: 500 }, viewportWidth: 320 }).kind, 'viewport-overflow');
});

test('keyboard audit state supports start, next, previous, restart, end, empty, and preview reset', () => {
  const targets = [{ id: 'a' }, { id: 'b' }];
  let state = startKeyboardAudit(targets, 'start-button');
  assert.equal(state.active, true);
  assert.equal(state.current.id, 'a');
  state = nextKeyboardAuditTarget(state, targets);
  assert.equal(state.current.id, 'b');
  assert.equal(nextKeyboardAuditTarget(state, targets).current.id, 'b');
  state = previousKeyboardAuditTarget(state, targets);
  assert.equal(state.current.id, 'a');
  state = restartKeyboardAudit(state, targets);
  assert.equal(state.index, 0);
  assert.equal(endKeyboardAudit(state).active, false);
  assert.equal(startKeyboardAudit([]).active, false);
  assert.match(resetKeyboardAuditForPreviewRefresh(state).message, /reset safely/);
});

test('preview inspection message protocol rejects malformed or arbitrary commands', () => {
  assert.equal(validatePreviewCommand(createPreviewCommand('set-overlay', { mode: 'spacing' })).payload.mode, 'spacing');
  assert.equal(validatePreviewCommand(createPreviewCommand('set-overlay', { mode: '<script>' })).payload.mode, 'off');
  assert.equal(validatePreviewCommand({ protocol: 'x', version: 1, type: 'set-overlay', payload: {} }).ok, false);
  assert.equal(validatePreviewCommand(createPreviewCommand('execute', { html: '<img>' })).ok, false);
  assert.equal(validatePreviewCommand({ ...createPreviewCommand('set-overlay'), payload: '<html>' }).ok, false);
  assert.equal(validatePreviewResponse({ protocol: 'kp-layout-lens-preview-inspection', version: 1, type: 'overlay-result', payload: { count: 1 } }).ok, true);
  assert.equal(validatePreviewResponse({ protocol: 'kp-layout-lens-preview-inspection', version: 1, type: 'run-code', payload: {} }).ok, false);
});


test('reduced-motion preference selects immediate preview behavior without hiding state', () => {
  assert.equal(isReducedMotionRequested({ matches: true }), true);
  assert.equal(isReducedMotionRequested({ matches: false }), false);
  assert.equal(getPreviewScrollBehavior(true), 'auto');
  assert.equal(getPreviewScrollBehavior(false), 'smooth');
  assert.deepEqual(getPreviewViewportMotionState(true), {
    reducedMotion: true,
    animatedViewportResize: false,
    overlayTransitions: false,
    focusHighlightPulse: false,
    scrollBehavior: 'auto'
  });
  assert.equal(getPreviewViewportMotionState(false).scrollBehavior, 'smooth');
});
