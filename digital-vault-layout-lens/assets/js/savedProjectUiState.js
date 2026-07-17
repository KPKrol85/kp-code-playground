export const SAVED_PROJECT_OPERATIONS = Object.freeze({
  create: 'Project created: {name}.',
  update: 'Project changes saved: {name}.',
  open: 'Project opened: {name}.',
  duplicate: 'Project duplicated: {name}.',
  delete: 'Project deleted: {name}.',
  deleteActive: 'Opened project deleted: {name}. Current audit remains in the workspace; save as a new project to keep changes.',
  auditVersion: 'Audit version saved for {name}.',
  restoreVersion: 'Historical version restored: {label}. Save project changes separately to update the project.',
  improvementPass: 'New improvement pass started from {label}. Save project changes or save an audit version when ready.'
});

export const SAVED_PROJECT_FAILURES = Object.freeze({
  create: 'Project could not be created. Current audit and local draft were not deleted.',
  update: 'Project changes could not be saved. Current audit and project association were not reset.',
  open: 'Saved project could not be opened. Current audit was not changed.',
  duplicate: 'Project could not be duplicated. Original project and current audit were not changed.',
  delete: 'Project could not be deleted. It remains saved.',
  auditVersion: 'Audit version could not be saved. Current audit remains unchanged.',
  restoreVersion: 'Historical version could not be restored. Current audit was not changed.',
  improvementPass: 'New improvement pass could not be started. Current audit was not changed.'
});

export function getSavedProjectsViewState({ status = 'ready', projects = [], error = '', invalidCount = 0 } = {}) {
  if (status === 'loading') return { kind: 'loading', projects: [], message: 'Loading saved projects from this browser…', invalidCount: 0, retry: false };
  if (status === 'error') return { kind: 'error', projects: [], message: error || 'Saved projects could not be accessed. The current audit and local draft remain available.', invalidCount: 0, retry: true };
  const validProjects = Array.isArray(projects) ? projects.filter(isRenderableProject) : [];
  const malformedCount = invalidCount + (Array.isArray(projects) ? projects.length - validProjects.length : 0);
  if (!validProjects.length) return { kind: 'empty', projects: [], message: 'No saved projects have been created yet.', invalidCount: malformedCount, retry: false };
  return { kind: 'list', projects: validProjects, message: `${validProjects.length} saved project${validProjects.length === 1 ? '' : 's'} available.`, invalidCount: malformedCount, retry: false };
}

export function getSavedProjectSuccessMessage(operation, details = {}) {
  const template = SAVED_PROJECT_OPERATIONS[operation];
  return template ? interpolate(template, details) : '';
}

export function getSavedProjectFailureMessage(operation) {
  return SAVED_PROJECT_FAILURES[operation] || 'Saved-project operation failed. Current audit was not changed.';
}

function interpolate(template, details) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(details[key] || 'Untitled project'));
}

function isRenderableProject(project) {
  return Boolean(project && typeof project.id === 'string' && project.id && typeof project.name === 'string' && project.name && typeof project.updatedAt === 'string');
}
