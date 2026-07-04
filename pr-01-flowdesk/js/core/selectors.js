import { isTerminalProjectStatus, normalizeString } from '../domain/validators.js';

const toValidDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const startOfDay = (date) => {
  const nextDate = new Date(date);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
};

const addDays = (date, days) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

export const selectClients = (state) => state.clients;

export const selectProjects = (state) => state.projects;

export const selectEvents = (state) => state.events;

export const selectUiPreferences = (state) => state.ui;

export const selectClientById = (state, id) => state.clients.find((client) => client.id === id) || null;

export const selectProjectById = (state, id) => state.projects.find((project) => project.id === id) || null;

export const selectClientLookup = (state) => new Map(state.clients.map((client) => [client.id, client]));

export const selectProjectLookup = (state) => new Map(state.projects.map((project) => [project.id, project]));

export const selectClientName = (state, id, fallback = 'Bez klienta') => selectClientById(state, id)?.name || fallback;

export const selectProjectName = (state, id, fallback = 'Bez projektu') => selectProjectById(state, id)?.name || fallback;

export const selectActiveProjects = (state) => state.projects.filter((project) => !isTerminalProjectStatus(project.status));

export const selectOverdueProjects = (state, referenceDate = new Date()) => {
  const referenceTime = referenceDate.getTime();
  return state.projects.filter((project) => {
    const dueDate = toValidDate(project.dueDate);
    return dueDate ? dueDate.getTime() < referenceTime : false;
  });
};

export const selectWeeklyEvents = (state, referenceDate = new Date()) => {
  const weekStart = startOfDay(referenceDate).getTime();
  const weekEnd = addDays(startOfDay(referenceDate), 7).getTime();

  return state.events.filter((event) => {
    const eventDate = toValidDate(event.date);
    if (!eventDate) return false;
    const eventTime = eventDate.getTime();
    return eventTime >= weekStart && eventTime < weekEnd;
  });
};

export const selectProjectsByClient = (state, clientId) => state.projects.filter((project) => project.clientId === clientId);

export const selectProjectsByStatus = (state, status, projects = state.projects) => projects.filter((project) => project.status === status);

export const selectDashboardMetrics = (state, referenceDate = new Date()) => ({
  activeProjectsCount: selectActiveProjects(state).length,
  weeklyEventsCount: selectWeeklyEvents(state, referenceDate).length,
  clientsCount: state.clients.length,
  overdueProjectsCount: selectOverdueProjects(state, referenceDate).length
});

export const selectNextActions = (state, limit = 5) => state.projects.slice(0, limit);

export const selectRecentProjects = (state, limit = 4) => state.projects.slice(0, limit);

export const selectFilteredClients = (state, { term = '', sort = 'name' } = {}) => {
  const normalizedTerm = normalizeString(term).toLowerCase();
  const sortedClients = [...state.clients].sort((a, b) => {
    if (sort === 'status') return a.status.localeCompare(b.status);
    return a.name.localeCompare(b.name);
  });

  if (!normalizedTerm) return sortedClients;

  return sortedClients.filter((client) => client.name.toLowerCase().includes(normalizedTerm) || client.email.toLowerCase().includes(normalizedTerm));
};

export const selectFilteredProjects = (state, { status = 'all', priority = 'all' } = {}) =>
  state.projects.filter((project) => {
    const statusMatch = status === 'all' || project.status === status;
    const priorityMatch = priority === 'all' || project.priority === priority;
    return statusMatch && priorityMatch;
  });

export const selectProjectsWithClients = (state, projects = state.projects) => {
  const clients = selectClientLookup(state);
  return projects.map((project) => ({
    ...project,
    client: clients.get(project.clientId) || null
  }));
};

export const selectEventsWithRelations = (state, events = state.events) => {
  const clients = selectClientLookup(state);
  const projects = selectProjectLookup(state);

  return events.map((event) => ({
    ...event,
    client: clients.get(event.clientId) || null,
    project: projects.get(event.projectId) || null
  }));
};
