import { seedData } from '../data/seed.js';
import { migrateState } from '../domain/migrations.js';
import { validateClient, validateEvent, validateProject, validateUiPreferences } from '../domain/validators.js';
import { storage } from '../utils/storage.js';

const STORAGE_KEY = 'flowdesk_state_v1';

let state = migrateState(storage.get(STORAGE_KEY), seedData);

const listeners = new Set();

const persist = () => storage.set(STORAGE_KEY, state);

const notify = () => {
  listeners.forEach((listener) => listener(state));
};

const commitState = (nextState) => {
  state = migrateState(nextState, seedData);
  persist();
  notify();
};

persist();

const setState = (partial) => commitState({ ...state, ...partial });

const updateCollection = (key, items) => {
  commitState({ ...state, [key]: items });
};

const createId = (prefix) => {
  if (crypto?.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
};

export const store = {
  getState() {
    return state;
  },
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  reset() {
    state = migrateState(seedData, seedData);
    persist();
    notify();
  },
  export() {
    return JSON.stringify(state, null, 2);
  },
  setTheme(theme) {
    const result = validateUiPreferences({ ...state.ui, theme });
    setState({ ui: result.value });
  },
  setReducedMotion(value) {
    const result = validateUiPreferences({ ...state.ui, reducedMotion: value });
    setState({ ui: result.value });
  },
  addClient(payload) {
    const result = validateClient({ ...payload, id: createId('client') });
    if (!result.valid) return null;
    const newClient = result.value;
    updateCollection('clients', [...state.clients, newClient]);
    return newClient;
  },
  updateClient(id, payload) {
    const existingClient = state.clients.find((client) => client.id === id);
    if (!existingClient) return null;
    const result = validateClient({ ...existingClient, ...payload, id });
    if (!result.valid) return null;
    updateCollection(
      'clients',
      state.clients.map((client) => (client.id === id ? result.value : client))
    );
    return result.value;
  },
  deleteClient(id) {
    const removedProjectIds = state.projects.filter((project) => project.clientId === id).map((project) => project.id);
    commitState({
      ...state,
      clients: state.clients.filter((client) => client.id !== id),
      projects: state.projects.filter((project) => project.clientId !== id),
      events: state.events.map((event) => ({
        ...event,
        clientId: event.clientId === id ? '' : event.clientId,
        projectId: removedProjectIds.includes(event.projectId) ? '' : event.projectId
      }))
    });
  },
  addProject(payload) {
    const result = validateProject(
      { ...payload, id: createId('project') },
      {
        clientIds: state.clients.map((client) => client.id)
      }
    );
    if (!result.valid) return null;
    const newProject = result.value;
    updateCollection('projects', [...state.projects, newProject]);
    return newProject;
  },
  updateProject(id, payload) {
    const existingProject = state.projects.find((project) => project.id === id);
    if (!existingProject) return null;
    const result = validateProject(
      { ...existingProject, ...payload, id },
      {
        clientIds: state.clients.map((client) => client.id)
      }
    );
    if (!result.valid) return null;
    updateCollection(
      'projects',
      state.projects.map((project) => (project.id === id ? result.value : project))
    );
    return result.value;
  },
  deleteProject(id) {
    commitState({
      ...state,
      projects: state.projects.filter((project) => project.id !== id),
      events: state.events.map((event) => ({
        ...event,
        projectId: event.projectId === id ? '' : event.projectId
      }))
    });
  },
  addEvent(payload) {
    const result = validateEvent(
      { ...payload, id: createId('event') },
      {
        clientIds: state.clients.map((client) => client.id),
        projectIds: state.projects.map((project) => project.id)
      }
    );
    if (!result.valid) return null;
    const newEvent = result.value;
    updateCollection('events', [...state.events, newEvent]);
    return newEvent;
  },
  deleteEvent(id) {
    updateCollection(
      'events',
      state.events.filter((event) => event.id !== id)
    );
  }
};
