import { store } from '../core/store.js';
import { selectDashboardMetrics, selectNextActions, selectRecentProjects } from '../core/selectors.js';
import { emptyState } from '../components/emptyState.js';
import { pageHeader } from '../components/pageHeader.js';
import { formatDate, formatNumber } from '../utils/format.js';
import { escapeHTML } from '../utils/sanitize.js';

export const renderDashboardView = (container) => {
  const state = store.getState();
  const metrics = selectDashboardMetrics(state);
  const nextActions = selectNextActions(state);
  const recentProjects = selectRecentProjects(state);

  container.innerHTML = `
    <main id="main" class="container">
      ${pageHeader({ title: 'Dashboard', description: 'Szybki podgląd kluczowych działań i stanu operacji.' })}

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
                        <strong>${escapeHTML(item.name)}</strong>
                        <div class="input__helper">Termin: ${escapeHTML(formatDate(item.dueDate))}</div>
                      </div>
                      <span class="badge badge--info">${escapeHTML(item.status)}</span>
                    </div>
                  `
                      )
                      .join('')
                  : emptyState({ description: 'Brak zaplanowanych działań.', iconName: 'projects' })
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
                        <strong>${escapeHTML(item.name)}</strong>
                        <div class="input__helper">Priorytet: ${escapeHTML(item.priority)}</div>
                      </div>
                      <span class="badge badge--success">${escapeHTML(item.status)}</span>
                    </div>
                  `
                      )
                      .join('')
                  : emptyState({ description: 'Brak zleceń do wyświetlenia.', iconName: 'projects' })
              }
            </div>
          </section>
        </div>
      </section>
    </main>
  `;
};
