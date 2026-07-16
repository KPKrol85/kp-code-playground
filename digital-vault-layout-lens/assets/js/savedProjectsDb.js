import { createSavedProjectRecord, sortSavedProjectRecords, updateSavedProjectRecord, validateSavedProjectRecord } from './savedProjectModel.js';

export const SAVED_PROJECT_DB_NAME = 'kp-layout-lens-projects';
export const SAVED_PROJECT_DB_VERSION = 1;
export const SAVED_PROJECT_STORE_NAME = 'audit-projects';

export function isIndexedDbAvailable() { return typeof indexedDB !== 'undefined'; }

export async function createProject({ name, auditState }) {
  const db = await openSavedProjectsDb();
  const record = createSavedProjectRecord({ name, auditState });
  await putRecord(db, record, 'readwrite');
  return validateSavedProjectRecord(record);
}

export async function updateProject(id, { name, auditState }) {
  const db = await openSavedProjectsDb();
  const existing = await getRecord(db, id);
  if (!existing) throw new Error('Saved project was not found.');
  const next = updateSavedProjectRecord(existing, { name, auditState });
  await putRecord(db, next, 'readwrite');
  return validateSavedProjectRecord(next);
}

export async function getProject(id) {
  const db = await openSavedProjectsDb();
  const record = await getRecord(db, id);
  return record ? validateSavedProjectRecord(record) : null;
}

export async function listProjects() {
  const db = await openSavedProjectsDb();
  const records = await getAllRecords(db);
  return sortSavedProjectRecords(records);
}

export async function deleteProject(id) {
  const db = await openSavedProjectsDb();
  await deleteRecord(db, id);
  return true;
}

function openSavedProjectsDb() {
  if (!isIndexedDbAvailable()) return Promise.reject(new Error('IndexedDB is unavailable.'));
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(SAVED_PROJECT_DB_NAME, SAVED_PROJECT_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.objectStoreNames.contains(SAVED_PROJECT_STORE_NAME) ? request.transaction.objectStore(SAVED_PROJECT_STORE_NAME) : db.createObjectStore(SAVED_PROJECT_STORE_NAME, { keyPath: 'id' });
      if (!store.indexNames.contains('updatedAt')) store.createIndex('updatedAt', 'updatedAt');
      if (!store.indexNames.contains('name')) store.createIndex('name', 'name');
    };
    request.onerror = () => reject(request.error || new Error('Could not open saved projects database.'));
    request.onblocked = () => reject(new Error('Saved projects database is blocked by another tab.'));
    request.onsuccess = () => resolve(request.result);
  });
}

function withStore(db, mode, callback) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SAVED_PROJECT_STORE_NAME, mode);
    const store = tx.objectStore(SAVED_PROJECT_STORE_NAME);
    let request;
    tx.oncomplete = () => resolve(request?.result);
    tx.onerror = () => reject(tx.error || new Error('Saved project transaction failed.'));
    tx.onabort = () => reject(tx.error || new Error('Saved project transaction aborted.'));
    request = callback(store);
    request.onerror = () => reject(request.error || new Error('Saved project request failed.'));
  });
}
function putRecord(db, record, mode) { return withStore(db, mode, (store) => store.put(validateSavedProjectRecord(record))); }
function getRecord(db, id) { return withStore(db, 'readonly', (store) => store.get(id)); }
function getAllRecords(db) { return withStore(db, 'readonly', (store) => store.getAll()); }
function deleteRecord(db, id) { return withStore(db, 'readwrite', (store) => store.delete(id)); }
