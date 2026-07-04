import { describe, expect, it } from 'vitest';
import {
  selectActiveProjects,
  selectDashboardMetrics,
  selectEventsWithRelations,
  selectFilteredClients,
  selectFilteredProjects,
  selectOverdueProjects,
  selectProjectsByClient,
  selectProjectsByStatus,
  selectProjectsWithClients,
  selectWeeklyEvents
} from '../../js/core/selectors.js';
import { migrateState } from '../../js/domain/migrations.js';

const referenceDate = new Date('2026-07-04T12:00:00.000Z');

const state = migrateState(
  {
    clients: [
      { id: 'c1', name: 'Nova Studio', email: 'nova@test.pl', status: 'Aktywny' },
      { id: 'c2', name: 'Aurora Clinic', email: 'aurora@test.pl', status: 'Potencjalny' }
    ],
    projects: [
      { id: 'p1', name: 'Past active', clientId: 'c1', status: 'In progress', priority: 'High', dueDate: '2026-07-03T10:00:00.000Z' },
      { id: 'p2', name: 'Past done', clientId: 'c1', status: 'Done', priority: 'Low', dueDate: '2026-07-02T10:00:00.000Z' },
      { id: 'p3', name: 'Future review', clientId: 'c2', status: 'Review', priority: 'Medium', dueDate: '2026-07-08T10:00:00.000Z' }
    ],
    events: [
      { id: 'e1', title: 'Today call', date: '2026-07-04T10:00:00.000Z', clientId: 'c1', projectId: 'p1' },
      { id: 'e2', title: 'Weekly review', date: '2026-07-10T10:00:00.000Z', clientId: 'c2', projectId: 'p3' },
      { id: 'e3', title: 'Later event', date: '2026-07-12T10:00:00.000Z', clientId: 'c2', projectId: 'p3' }
    ],
    ui: { theme: 'light', reducedMotion: false }
  },
  {}
);

describe('state selectors', () => {
  it('selects active, overdue, and weekly records', () => {
    expect(selectActiveProjects(state).map((project) => project.id)).toEqual(['p1', 'p3']);
    expect(selectOverdueProjects(state, referenceDate).map((project) => project.id)).toEqual(['p1', 'p2']);
    expect(selectWeeklyEvents(state, referenceDate).map((event) => event.id)).toEqual(['e1', 'e2']);
  });

  it('builds dashboard metrics from derived data', () => {
    expect(selectDashboardMetrics(state, referenceDate)).toEqual({
      activeProjectsCount: 2,
      weeklyEventsCount: 2,
      clientsCount: 2,
      overdueProjectsCount: 2
    });
  });

  it('selects projects by client and status', () => {
    const clientProjects = selectProjectsByClient(state, 'c1');

    expect(clientProjects.map((project) => project.id)).toEqual(['p1', 'p2']);
    expect(selectProjectsByStatus(state, 'Done', clientProjects).map((project) => project.id)).toEqual(['p2']);
  });

  it('filters clients and projects for view-level controls', () => {
    expect(selectFilteredClients(state, { term: 'nova' }).map((client) => client.id)).toEqual(['c1']);
    expect(selectFilteredProjects(state, { status: 'Review', priority: 'Medium' }).map((project) => project.id)).toEqual(['p3']);
  });

  it('adds client and project display relations without mutating source data', () => {
    const projects = selectProjectsWithClients(state);
    const events = selectEventsWithRelations(state);

    expect(projects[0].client).toMatchObject({ id: 'c1', name: 'Nova Studio' });
    expect(events[1].client).toMatchObject({ id: 'c2', name: 'Aurora Clinic' });
    expect(events[1].project).toMatchObject({ id: 'p3', name: 'Future review' });
    expect(state.projects[0]).not.toHaveProperty('client');
  });
});
