import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as adapter from '../assets/js/storageAdapter.js';

test('storage adapter exposes focused draft and project persistence operations', () => {
  for (const name of ['loadDraft', 'saveDraft', 'clearDraft', 'listSavedProjects', 'getSavedProject', 'createSavedProject', 'updateSavedProject', 'deleteSavedProject', 'duplicateSavedProject', 'saveSavedProjectAuditVersion']) assert.equal(typeof adapter[name], 'function');
});

test('storage adapter normalizes unavailable IndexedDB errors', async () => {
  const original = globalThis.indexedDB;
  try {
    delete globalThis.indexedDB;
    const result = await adapter.listSavedProjects();
    assert.equal(result.ok, false);
    assert.deepEqual(result.value, []);
    assert.match(result.error, /IndexedDB/);
  } finally {
    if (original) globalThis.indexedDB = original;
  }
});

test('app uses the storage adapter for covered persistence boundaries', () => {
  const app = readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
  assert.equal(app.includes("from './savedProjectsDb.js'"), false);
  for (const lowLevel of ['createProject(', 'listProjects(', 'getProject(', 'updateProject(', 'deleteProject(', 'duplicateProject(', 'saveProjectAuditVersion(', 'loadSavedAuditState(', 'saveAuditState(', 'clearSavedAuditState(']) assert.equal(app.includes(lowLevel), false, lowLevel);
});
