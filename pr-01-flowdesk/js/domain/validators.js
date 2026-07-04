import {
  CLIENT_STATUSES,
  DEFAULT_CLIENT_STATUS,
  DEFAULT_EVENT_TYPE,
  DEFAULT_PROJECT_PRIORITY,
  DEFAULT_PROJECT_STATUS,
  DEFAULT_UI_THEME,
  EVENT_TYPES,
  PROJECT_PRIORITIES,
  PROJECT_STATUSES,
  PROJECT_TERMINAL_STATUSES,
  UI_THEMES
} from './constants.js';
import { createClientModel, createEventModel, createProjectModel, createUiPreferencesModel, createUserSessionModel } from './models.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isPlainObject = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

export const normalizeString = (value) => {
  if (value === null || value === undefined) return '';
  return String(value).trim();
};

const normalizeBoolean = (value) => value === true;

const normalizeAllowedValue = (value, allowedValues, fallback) => {
  const normalized = normalizeString(value);
  return allowedValues.includes(normalized) ? normalized : fallback;
};

export const isValidDateValue = (value) => {
  const normalized = normalizeString(value);
  if (!normalized) return false;
  return !Number.isNaN(new Date(normalized).getTime());
};

const normalizeDateValue = (value) => {
  const normalized = normalizeString(value);
  return isValidDateValue(normalized) ? normalized : '';
};

const hasInvalidProvidedDate = (rawValue) => {
  const normalized = normalizeString(rawValue);
  return Boolean(normalized) && !isValidDateValue(normalized);
};

const createValidationResult = (value, errors) => ({
  valid: errors.length === 0,
  errors,
  value
});

const hasReference = (id, allowedIds = []) => {
  const normalized = normalizeString(id);
  if (!normalized) return true;
  return allowedIds.length === 0 || allowedIds.includes(normalized);
};

export const getFieldError = (result, field) => result.errors.find((error) => error.field === field)?.message || '';

export const normalizeClient = (input = {}) => {
  const source = isPlainObject(input) ? input : {};

  return createClientModel({
    id: normalizeString(source.id),
    name: normalizeString(source.name),
    email: normalizeString(source.email).toLowerCase(),
    phone: normalizeString(source.phone),
    status: normalizeAllowedValue(source.status, CLIENT_STATUSES, DEFAULT_CLIENT_STATUS),
    notes: normalizeString(source.notes)
  });
};

export const validateClient = (input, { requireId = true } = {}) => {
  const value = normalizeClient(input);
  const errors = [];

  if (requireId && !value.id) errors.push({ field: 'id', message: 'Missing client id.' });
  if (!value.name) errors.push({ field: 'name', message: 'Wymagane pole.' });
  if (!value.email) {
    errors.push({ field: 'email', message: 'Wymagane pole.' });
  } else if (!EMAIL_PATTERN.test(value.email)) {
    errors.push({ field: 'email', message: 'Podaj poprawny adres email.' });
  }

  return createValidationResult(value, errors);
};

export const normalizeProject = (input = {}) => {
  const source = isPlainObject(input) ? input : {};

  return createProjectModel({
    id: normalizeString(source.id),
    name: normalizeString(source.name),
    clientId: normalizeString(source.clientId),
    status: normalizeAllowedValue(source.status, PROJECT_STATUSES, DEFAULT_PROJECT_STATUS),
    priority: normalizeAllowedValue(source.priority, PROJECT_PRIORITIES, DEFAULT_PROJECT_PRIORITY),
    dueDate: normalizeDateValue(source.dueDate),
    notes: normalizeString(source.notes)
  });
};

export const validateProject = (input, { requireId = true, strictDate = true, clientIds = [] } = {}) => {
  const source = isPlainObject(input) ? input : {};
  const value = normalizeProject(source);
  const errors = [];

  if (requireId && !value.id) errors.push({ field: 'id', message: 'Missing project id.' });
  if (!value.name) errors.push({ field: 'name', message: 'Wymagane pole.' });
  if (strictDate && hasInvalidProvidedDate(source.dueDate)) errors.push({ field: 'dueDate', message: 'Nieprawidłowa data.' });
  if (!hasReference(value.clientId, clientIds)) errors.push({ field: 'clientId', message: 'Nieprawidłowy klient.' });

  return createValidationResult(value, errors);
};

export const normalizeEvent = (input = {}) => {
  const source = isPlainObject(input) ? input : {};

  return createEventModel({
    id: normalizeString(source.id),
    title: normalizeString(source.title),
    date: normalizeDateValue(source.date),
    clientId: normalizeString(source.clientId),
    projectId: normalizeString(source.projectId),
    type: normalizeAllowedValue(source.type, EVENT_TYPES, DEFAULT_EVENT_TYPE)
  });
};

export const validateEvent = (input, { requireId = true, requireDate = true, strictDate = true, clientIds = [], projectIds = [] } = {}) => {
  const source = isPlainObject(input) ? input : {};
  const value = normalizeEvent(source);
  const errors = [];

  if (requireId && !value.id) errors.push({ field: 'id', message: 'Missing event id.' });
  if (!value.title) errors.push({ field: 'title', message: 'Wymagane pole.' });
  if (strictDate && hasInvalidProvidedDate(source.date)) {
    errors.push({ field: 'date', message: 'Nieprawidłowa data.' });
  } else if (requireDate && !value.date) {
    errors.push({ field: 'date', message: 'Wymagane pole.' });
  }
  if (!hasReference(value.clientId, clientIds)) errors.push({ field: 'clientId', message: 'Nieprawidłowy klient.' });
  if (!hasReference(value.projectId, projectIds)) errors.push({ field: 'projectId', message: 'Nieprawidłowy projekt.' });

  return createValidationResult(value, errors);
};

export const normalizeUiPreferences = (input = {}) => {
  const source = isPlainObject(input) ? input : {};

  return createUiPreferencesModel({
    theme: normalizeAllowedValue(source.theme, UI_THEMES, DEFAULT_UI_THEME),
    reducedMotion: normalizeBoolean(source.reducedMotion)
  });
};

export const validateUiPreferences = (input) => createValidationResult(normalizeUiPreferences(input), []);

export const normalizeUserSession = (input = {}) => {
  const source = isPlainObject(input) ? input : {};

  return createUserSessionModel({
    email: normalizeString(source.email).toLowerCase(),
    name: normalizeString(source.name) || 'Alicja Maj',
    role: normalizeString(source.role) || 'Owner',
    lastLogin: normalizeDateValue(source.lastLogin) || new Date().toISOString()
  });
};

export const validateUserSession = (input) => {
  const value = normalizeUserSession(input);
  const errors = [];

  if (!value.email || !EMAIL_PATTERN.test(value.email)) errors.push({ field: 'email', message: 'Podaj poprawny adres email.' });

  return createValidationResult(value, errors);
};

export const isTerminalProjectStatus = (status) => PROJECT_TERMINAL_STATUSES.includes(status);
