import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getSavedProjectFailureMessage, getSavedProjectSuccessMessage, getSavedProjectsViewState } from '../assets/js/savedProjectUiState.js';

const project = { id: 'p1', name: 'Checkout', updatedAt: '2026-07-17T10:00:00.000Z' };

test('empty project collection produces the empty state', () => {
  const state = getSavedProjectsViewState({ status: 'ready', projects: [] });
  assert.equal(state.kind, 'empty');
  assert.match(state.message, /No saved projects/);
});

test('loading state excludes empty, list, and error output', () => {
  const state = getSavedProjectsViewState({ status: 'loading', projects: [project], error: 'boom' });
  assert.equal(state.kind, 'loading');
  assert.deepEqual(state.projects, []);
  assert.equal(state.retry, false);
});

test('populated projects produce the list state', () => {
  const state = getSavedProjectsViewState({ status: 'ready', projects: [project] });
  assert.equal(state.kind, 'list');
  assert.deepEqual(state.projects, [project]);
});

test('storage failure produces the error state and retry success replaces it', () => {
  const error = getSavedProjectsViewState({ status: 'error', error: 'Saved projects could not be accessed.' });
  assert.equal(error.kind, 'error');
  assert.equal(error.retry, true);
  const recovered = getSavedProjectsViewState({ status: 'ready', projects: [project] });
  assert.equal(recovered.kind, 'list');
  assert.equal(recovered.retry, false);
});

test('successful saved-project operations produce precise success messages', () => {
  assert.equal(getSavedProjectSuccessMessage('create', { name: 'Checkout' }), 'Project created: Checkout.');
  assert.equal(getSavedProjectSuccessMessage('update', { name: 'Checkout' }), 'Project changes saved: Checkout.');
  assert.equal(getSavedProjectSuccessMessage('open', { name: 'Checkout' }), 'Project opened: Checkout.');
  assert.equal(getSavedProjectSuccessMessage('duplicate', { name: 'Checkout — Copy' }), 'Project duplicated: Checkout — Copy.');
  assert.equal(getSavedProjectSuccessMessage('delete', { name: 'Checkout' }), 'Project deleted: Checkout.');
});

test('successful audit-version and improvement-pass operations produce success messages', () => {
  assert.equal(getSavedProjectSuccessMessage('auditVersion', { name: 'Checkout' }), 'Audit version saved for Checkout.');
  assert.equal(getSavedProjectSuccessMessage('restoreVersion', { label: 'Baseline' }), 'Historical version restored: Baseline. Save project changes separately to update the project.');
  assert.equal(getSavedProjectSuccessMessage('improvementPass', { label: 'Baseline' }), 'New improvement pass started from Baseline. Save project changes or save an audit version when ready.');
});

test('failed operations do not produce success feedback', () => {
  assert.notEqual(getSavedProjectFailureMessage('create'), getSavedProjectSuccessMessage('create', { name: 'Checkout' }));
  assert.notEqual(getSavedProjectFailureMessage('delete'), getSavedProjectSuccessMessage('delete', { name: 'Checkout' }));
});

test('deleting the final project returns the UI to the empty state', () => {
  assert.equal(getSavedProjectsViewState({ status: 'ready', projects: [project] }).kind, 'list');
  assert.equal(getSavedProjectsViewState({ status: 'ready', projects: [] }).kind, 'empty');
});

test('valid projects remain usable when one malformed record is encountered', () => {
  const state = getSavedProjectsViewState({ status: 'ready', projects: [project, { id: '', name: '' }] });
  assert.equal(state.kind, 'list');
  assert.deepEqual(state.projects, [project]);
  assert.equal(state.invalidCount, 1);
});

test('no backend or network persistence behavior is introduced', () => {
  const files = ['../assets/js/app.js', '../assets/js/storageAdapter.js', '../assets/js/savedProjectsDb.js', '../assets/js/savedProjectUiState.js'];
  for (const file of files) {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /\bfetch\s*\(|XMLHttpRequest|WebSocket|https?:\/\/|api\.|auth|cloud.?sync/i, file);
  }
});
