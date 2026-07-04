import { migrateState } from '../domain/migrations.js';
import { validateClient, validateEvent, validateProject, validateUiPreferences } from '../domain/validators.js';

export const ACTION_ERRORS = Object.freeze({
  VALIDATION: 'validation_failed',
  NOT_FOUND: 'not_found',
  INVALID_JSON: 'invalid_json'
});

export const actionOk = (data, nextState) => ({
  ok: true,
  data,
  nextState
});

export const actionFail = (error, issues = []) => ({
  ok: false,
  error,
  issues
});

export const getActionFieldError = (result, field) => result?.issues?.find((issue) => issue.field === field)?.message || '';

const collectIds = (items) => items.map((item) => item.id).filter(Boolean);

const requireCreateId = (createId) => {
  if (typeof createId !== 'function') throw new TypeError('createId action dependency is required.');
};

export const createClientAction = (state, payload, { createId } = {}) => {
  requireCreateId(createId);
  const result = validateClient({ ...payload, id: createId('client') });
  if (!result.valid) return actionFail(ACTION_ERRORS.VALIDATION, result.errors);

  const client = result.value;
  return actionOk(client, { ...state, clients: [...state.clients, client] });
};

export const updateClientAction = (state, id, payload) => {
  const existingClient = state.clients.find((client) => client.id === id);
  if (!existingClient) return actionFail(ACTION_ERRORS.NOT_FOUND);

  const result = validateClient({ ...existingClient, ...payload, id });
  if (!result.valid) return actionFail(ACTION_ERRORS.VALIDATION, result.errors);

  return actionOk(result.value, {
    ...state,
    clients: state.clients.map((client) => (client.id === id ? result.value : client))
  });
};

export const deleteClientAction = (state, id) => {
  const existingClient = state.clients.find((client) => client.id === id);
  if (!existingClient) return actionFail(ACTION_ERRORS.NOT_FOUND);

  const removedProjectIds = state.projects.filter((project) => project.clientId === id).map((project) => project.id);

  return actionOk(existingClient, {
    ...state,
    clients: state.clients.filter((client) => client.id !== id),
    projects: state.projects.filter((project) => project.clientId !== id),
    events: state.events.map((event) => ({
      ...event,
      clientId: event.clientId === id ? '' : event.clientId,
      projectId: removedProjectIds.includes(event.projectId) ? '' : event.projectId
    }))
  });
};

export const createProjectAction = (state, payload, { createId } = {}) => {
  requireCreateId(createId);
  const result = validateProject(
    { ...payload, id: createId('project') },
    {
      clientIds: collectIds(state.clients)
    }
  );
  if (!result.valid) return actionFail(ACTION_ERRORS.VALIDATION, result.errors);

  const project = result.value;
  return actionOk(project, { ...state, projects: [...state.projects, project] });
};

export const updateProjectAction = (state, id, payload) => {
  const existingProject = state.projects.find((project) => project.id === id);
  if (!existingProject) return actionFail(ACTION_ERRORS.NOT_FOUND);

  const result = validateProject(
    { ...existingProject, ...payload, id },
    {
      clientIds: collectIds(state.clients)
    }
  );
  if (!result.valid) return actionFail(ACTION_ERRORS.VALIDATION, result.errors);

  return actionOk(result.value, {
    ...state,
    projects: state.projects.map((project) => (project.id === id ? result.value : project))
  });
};

export const deleteProjectAction = (state, id) => {
  const existingProject = state.projects.find((project) => project.id === id);
  if (!existingProject) return actionFail(ACTION_ERRORS.NOT_FOUND);

  return actionOk(existingProject, {
    ...state,
    projects: state.projects.filter((project) => project.id !== id),
    events: state.events.map((event) => ({
      ...event,
      projectId: event.projectId === id ? '' : event.projectId
    }))
  });
};

export const createEventAction = (state, payload, { createId } = {}) => {
  requireCreateId(createId);
  const result = validateEvent(
    { ...payload, id: createId('event') },
    {
      clientIds: collectIds(state.clients),
      projectIds: collectIds(state.projects)
    }
  );
  if (!result.valid) return actionFail(ACTION_ERRORS.VALIDATION, result.errors);

  const event = result.value;
  return actionOk(event, { ...state, events: [...state.events, event] });
};

export const updateEventAction = (state, id, payload) => {
  const existingEvent = state.events.find((event) => event.id === id);
  if (!existingEvent) return actionFail(ACTION_ERRORS.NOT_FOUND);

  const result = validateEvent(
    { ...existingEvent, ...payload, id },
    {
      clientIds: collectIds(state.clients),
      projectIds: collectIds(state.projects)
    }
  );
  if (!result.valid) return actionFail(ACTION_ERRORS.VALIDATION, result.errors);

  return actionOk(result.value, {
    ...state,
    events: state.events.map((event) => (event.id === id ? result.value : event))
  });
};

export const deleteEventAction = (state, id) => {
  const existingEvent = state.events.find((event) => event.id === id);
  if (!existingEvent) return actionFail(ACTION_ERRORS.NOT_FOUND);

  return actionOk(existingEvent, {
    ...state,
    events: state.events.filter((event) => event.id !== id)
  });
};

export const updateUiPreferencesAction = (state, payload) => {
  const result = validateUiPreferences({ ...state.ui, ...payload });
  return actionOk(result.value, { ...state, ui: result.value });
};

export const resetDemoDataAction = (seedState) => {
  const nextState = migrateState(seedState, seedState);
  return actionOk(nextState, nextState);
};

export const restoreStateAction = (rawState, seedState) => {
  const nextState = migrateState(rawState, seedState);
  return actionOk(nextState, nextState);
};

export const restoreStateFromJsonAction = (jsonText, seedState) => {
  try {
    return restoreStateAction(JSON.parse(String(jsonText || '')), seedState);
  } catch {
    return actionFail(ACTION_ERRORS.INVALID_JSON, [{ field: 'json', message: 'Nieprawidłowy plik JSON.' }]);
  }
};

export const exportStateAction = (state) => actionOk(JSON.stringify(state, null, 2), state);
