import { beforeEach, describe, expect, it, vi } from 'vitest';

const STORAGE_KEY = 'flowdesk_state_v1';

const loadStore = async () => {
  vi.resetModules();
  window.localStorage.clear();
  return import('../../js/core/store.js');
};

describe('store', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('starts from seeded demo data', async () => {
    const { store } = await loadStore();
    const state = store.getState();

    expect(state.clients.length).toBeGreaterThan(0);
    expect(state.projects.length).toBeGreaterThan(0);
    expect(state.events.length).toBeGreaterThan(0);
  });

  it('adds a client and persists the updated state', async () => {
    const { store } = await loadStore();

    const client = store.addClient({
      name: 'Test Client',
      email: 'client@example.com',
      phone: '+48 500 100 200',
      status: 'Aktywny',
      notes: 'Created by test'
    });

    expect(client.id).toMatch(/^client-/);
    expect(store.getState().clients).toContainEqual(expect.objectContaining({ name: 'Test Client' }));
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY)).clients).toContainEqual(expect.objectContaining({ name: 'Test Client' }));
  });

  it('updates UI preferences', async () => {
    const { store } = await loadStore();

    store.setTheme('dark');
    store.setReducedMotion(true);

    expect(store.getState().ui).toEqual({ theme: 'dark', reducedMotion: true });
  });

  it('deletes a client and related projects', async () => {
    const { store } = await loadStore();

    store.deleteClient('c1');

    expect(store.getState().clients.some((client) => client.id === 'c1')).toBe(false);
    expect(store.getState().projects.some((project) => project.clientId === 'c1')).toBe(false);
  });
});
