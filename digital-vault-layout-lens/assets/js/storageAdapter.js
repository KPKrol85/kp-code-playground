import { clearSavedAuditState, loadSavedAuditState, saveAuditState } from './auditStorage.js';
import { createProject, deleteProject, duplicateProject, getProject, isIndexedDbAvailable, listProjects, saveProjectAuditVersion, updateProject } from './savedProjectsDb.js';

export function loadDraft(options) { return loadSavedAuditState(options); }
export function saveDraft(snapshot) { return saveAuditState(snapshot) ? { ok: true } : { ok: false, error: 'Could not save the local audit draft.' }; }
export function clearDraft() { return clearSavedAuditState() ? { ok: true } : { ok: false, error: 'Could not clear the local audit draft.' }; }
export function canUseSavedProjects() { return isIndexedDbAvailable(); }

export async function listSavedProjects() { return withProjectResult(() => listProjects(), []); }
export async function getSavedProject(id) { return withProjectResult(() => getProject(id), null); }
export async function createSavedProject(input) { return withProjectResult(() => createProject(input)); }
export async function updateSavedProject(id, input) { return withProjectResult(() => updateProject(id, input)); }
export async function deleteSavedProject(id) { return withProjectResult(() => deleteProject(id)); }
export async function duplicateSavedProject(id, input) { return withProjectResult(() => duplicateProject(id, input)); }
export async function saveSavedProjectAuditVersion(id, input) { return withProjectResult(() => saveProjectAuditVersion(id, input)); }

async function withProjectResult(operation, fallback) {
  try { return { ok: true, value: await operation(), error: '' }; }
  catch (error) { return { ok: false, value: fallback, error: normalizeStorageError(error) }; }
}
function normalizeStorageError(error) {
  const message = error instanceof Error ? error.message : String(error || 'Storage operation failed.');
  if (/IndexedDB is unavailable/i.test(message)) return 'Saved projects are unavailable because IndexedDB is not available in this browser.';
  if (/blocked by another tab/i.test(message)) return 'Saved projects are blocked by another open tab. Close other Layout Lens tabs and try again.';
  if (/version is unsupported|future/i.test(message)) return 'This saved project was created by a newer unsupported version of Layout Lens.';
  if (/malformed|invalid|incompatible/i.test(message)) return 'Stored project data is malformed and could not be opened safely.';
  return message || 'Storage operation failed.';
}
