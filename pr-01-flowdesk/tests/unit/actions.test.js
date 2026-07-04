import { describe, expect, it } from 'vitest';
import { seedData } from '../../js/data/seed.js';
import { migrateState } from '../../js/domain/migrations.js';
import {
  ACTION_ERRORS,
  createClientAction,
  createProjectAction,
  deleteClientAction,
  resetDemoDataAction,
  restoreStateAction,
  restoreStateFromJsonAction,
  updateProjectAction,
  updateUiPreferencesAction
} from '../../js/core/actions.js';

const createState = () => migrateState(seedData, seedData);

const createId = (prefix) => `${prefix}-test`;

describe('domain actions', () => {
  it('creates a client with a predictable success result', () => {
    const state = createState();

    const result = createClientAction(
      state,
      {
        name: 'Acme Service',
        email: 'Ops@Acme.test',
        phone: '+48 500 100 200',
        status: 'Aktywny',
        notes: 'Created from action test'
      },
      { createId }
    );

    expect(result.ok).toBe(true);
    expect(result.data).toMatchObject({ id: 'client-test', name: 'Acme Service', email: 'ops@acme.test' });
    expect(result.nextState.clients).toContainEqual(result.data);
    expect(state.clients).not.toContainEqual(result.data);
  });

  it('returns validation issues instead of throwing for invalid client data', () => {
    const result = createClientAction(createState(), { name: '', email: 'broken' }, { createId });

    expect(result).toMatchObject({
      ok: false,
      error: ACTION_ERRORS.VALIDATION
    });
    expect(result.issues).toEqual(expect.arrayContaining([expect.objectContaining({ field: 'name' }), expect.objectContaining({ field: 'email' })]));
  });

  it('rejects project writes with invalid client references', () => {
    const result = createProjectAction(
      createState(),
      {
        name: 'Broken project',
        clientId: 'missing-client',
        status: 'Draft',
        priority: 'High',
        dueDate: '2026-08-10'
      },
      { createId }
    );

    expect(result.ok).toBe(false);
    expect(result.error).toBe(ACTION_ERRORS.VALIDATION);
    expect(result.issues).toContainEqual(expect.objectContaining({ field: 'clientId' }));
  });

  it('returns not_found for missing updates', () => {
    const result = updateProjectAction(createState(), 'missing-project', { name: 'No-op' });

    expect(result.ok).toBe(false);
    expect(result.error).toBe(ACTION_ERRORS.NOT_FOUND);
  });

  it('deletes a client and clears dependent project and event references', () => {
    const result = deleteClientAction(createState(), 'c1');

    expect(result.ok).toBe(true);
    expect(result.nextState.clients.some((client) => client.id === 'c1')).toBe(false);
    expect(result.nextState.projects.some((project) => project.clientId === 'c1')).toBe(false);
    expect(result.nextState.events.some((event) => event.clientId === 'c1')).toBe(false);
    expect(result.nextState.events.some((event) => event.projectId === 'p1')).toBe(false);
  });

  it('updates UI preferences through a normalized result', () => {
    const result = updateUiPreferencesAction(createState(), { theme: 'dark', reducedMotion: true });

    expect(result.ok).toBe(true);
    expect(result.data).toEqual({ theme: 'dark', reducedMotion: true });
    expect(result.nextState.ui).toEqual(result.data);
  });

  it('restores corrupted imported state through schema migration', () => {
    const result = restoreStateAction(
      {
        clients: [{ id: 'c-import', name: 'Imported', email: 'imported@test.pl' }],
        projects: [{ id: 'p-import', name: 'Imported job', clientId: 'missing-client', dueDate: 'bad-date' }],
        events: [{ id: 'e-import', title: 'Imported event', clientId: 'c-import', projectId: 'missing-project' }],
        ui: { theme: 'unknown', reducedMotion: true }
      },
      seedData
    );

    expect(result.ok).toBe(true);
    expect(result.data.schemaVersion).toBe(2);
    expect(result.data.projects[0]).toMatchObject({ clientId: '', dueDate: '' });
    expect(result.data.events[0]).toMatchObject({ clientId: 'c-import', projectId: '' });
    expect(result.data.ui).toEqual({ theme: 'light', reducedMotion: true });
  });

  it('returns a predictable error for malformed restored JSON', () => {
    const result = restoreStateFromJsonAction('{broken json', seedData);

    expect(result.ok).toBe(false);
    expect(result.error).toBe(ACTION_ERRORS.INVALID_JSON);
    expect(result.issues).toContainEqual(expect.objectContaining({ field: 'json' }));
  });

  it('resets demo data through the migrated seed state', () => {
    const result = resetDemoDataAction(seedData);

    expect(result.ok).toBe(true);
    expect(result.data.schemaVersion).toBe(2);
    expect(result.data.clients.length).toBe(seedData.clients.length);
  });
});
