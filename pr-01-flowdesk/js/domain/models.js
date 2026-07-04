import { CURRENT_SCHEMA_VERSION, DEFAULT_CLIENT_STATUS, DEFAULT_EVENT_TYPE, DEFAULT_PROJECT_PRIORITY, DEFAULT_PROJECT_STATUS, DEFAULT_UI_THEME } from './constants.js';

/**
 * @typedef {Object} Client
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {'Aktywny'|'Potencjalny'|'Zawieszony'} status
 * @property {string} notes
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {string} clientId
 * @property {'Draft'|'In progress'|'Review'|'Done'} status
 * @property {'Low'|'Medium'|'High'} priority
 * @property {string} dueDate
 * @property {string} notes
 */

/**
 * @typedef {Object} Event
 * @property {string} id
 * @property {string} title
 * @property {string} date
 * @property {string} clientId
 * @property {string} projectId
 * @property {'General'|'Meeting'|'Deadline'} type
 */

/**
 * @typedef {Object} UserSession
 * @property {string} email
 * @property {string} name
 * @property {string} role
 * @property {string} lastLogin
 */

/**
 * @typedef {Object} UiPreferences
 * @property {'light'|'dark'} theme
 * @property {boolean} reducedMotion
 */

export const createClientModel = (overrides = {}) => ({
  id: '',
  name: '',
  email: '',
  phone: '',
  status: DEFAULT_CLIENT_STATUS,
  notes: '',
  ...overrides
});

export const createProjectModel = (overrides = {}) => ({
  id: '',
  name: '',
  clientId: '',
  status: DEFAULT_PROJECT_STATUS,
  priority: DEFAULT_PROJECT_PRIORITY,
  dueDate: '',
  notes: '',
  ...overrides
});

export const createEventModel = (overrides = {}) => ({
  id: '',
  title: '',
  date: '',
  clientId: '',
  projectId: '',
  type: DEFAULT_EVENT_TYPE,
  ...overrides
});

export const createUserSessionModel = (overrides = {}) => ({
  email: '',
  name: 'Alicja Maj',
  role: 'Owner',
  lastLogin: new Date().toISOString(),
  ...overrides
});

export const createUiPreferencesModel = (overrides = {}) => ({
  theme: DEFAULT_UI_THEME,
  reducedMotion: false,
  ...overrides
});

export const createStateModel = (overrides = {}) => ({
  schemaVersion: CURRENT_SCHEMA_VERSION,
  clients: [],
  projects: [],
  events: [],
  ui: createUiPreferencesModel(),
  ...overrides
});
