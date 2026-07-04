import { store } from '../core/store.js';
import { selectDashboardMetrics, selectNextActions, selectRecentProjects } from '../core/selectors.js';
import { formatDate, formatNumber } from '../utils/format.js';

export const renderDashboardView = (container) => {
  const state = store.getState();
  const metrics = selectDashboardMetrics(state);
  const nextActions = selectNextActions(state);
  const recentProjects = selectRecentProjects(state);

  container.innerHTML = `
    <main id="main" class="container">
      <header class="view-header">
        <h1 class="view-header__title">Dashboard</h1>
        <p class="view-header__desc">Szybki podgląd kluczowych działań i stanu operacji.</p>
      </header>

      <section class="dashboard-grid">
        <div class="dashboard-kpi">
          <div class="card kpi">
            <span class="kpi__value">${formatNumber(metrics.activeProjectsCount)}</span>
            <span class="kpi__label">Aktywne zlecenia</span>
          </div>
          <div class="card kpi">
            <span class="kpi__value">${formatNumber(metrics.weeklyEventsCount)}</span>
            <span class="kpi__label">Wydarzenia w tym tygodniu</span>
          </div>
          <div class="card kpi">
            <span class="kpi__value">${formatNumber(metrics.clientsCount)}</span>
            <span class="kpi__label">Klienci w bazie</span>
          </div>
          <div class="card kpi">
            <span class="kpi__value">${formatNumber(metrics.overdueProjectsCount)}</span>
            <span class="kpi__label">Zaległe zadania</span>
          </div>
        </div>

        <div class="dashboard-columns">
          <section class="card">
            <h2 class="card__title">Najbliższe działania</h2>
            <div class="list">
              ${
                nextActions.length
                  ? nextActions
                      .map(
                        (item) => `
                    <div class="list__item">
                      <div>
                        <strong>${item.name}</strong>
                        <div class="input__helper">Termin: ${formatDate(item.dueDate)}</div>
                      </div>
                      <span class="badge badge--info">${item.status}</span>
                    </div>
                  `
                      )
                      .join('')
                  : '<p class="empty-state">Brak zaplanowanych działań.</p>'
              }
            </div>
          </section>

          <section class="card">
            <h2 class="card__title">Ostatnie zlecenia</h2>
            <div class="list">
              ${
                recentProjects.length
                  ? recentProjects
                      .map(
                        (item) => `
                    <div class="list__item">
                      <div>
                        <strong>${item.name}</strong>
                        <div class="input__helper">Priorytet: ${item.priority}</div>
                      </div>
                      <span class="badge badge--success">${item.status}</span>
                    </div>
                  `
                      )
                      .join('')
                  : '<p class="empty-state">Brak zleceń do wyświetlenia.</p>'
              }
            </div>
          </section>
        </div>
      </section>
    </main>
  `;
};
