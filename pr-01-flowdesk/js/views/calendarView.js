import { qs } from '../core/dom.js';
import { getActionFieldError } from '../core/actions.js';
import { selectClients, selectEventsWithRelations, selectProjects } from '../core/selectors.js';
import { store } from '../core/store.js';
import { openModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { formatDate } from '../utils/format.js';
import { escapeAttribute, escapeHTML } from '../utils/sanitize.js';

const eventModalContent = (event = {}, clients = [], projects = []) => `
  <form id="eventForm" class="form-grid">
    <div class="input">
      <label class="input__label" for="title">Tytuł</label>
      <input class="input__field" id="title" name="title" value="${escapeAttribute(event.title || '')}" required />
      <span class="input__error" id="titleError"></span>
    </div>
    <div class="form-grid form-grid--two">
      <div class="input">
        <label class="input__label" for="date">Data</label>
        <input class="input__field" id="date" name="date" type="date" value="${escapeAttribute(event.date ? event.date.split('T')[0] : '')}" required />
        <span class="input__error" id="dateError"></span>
      </div>
      <div class="input">
        <label class="input__label" for="client">Klient</label>
        <select class="input__select" id="client" name="client">
          ${clients.map((client) => `<option value="${escapeAttribute(client.id)}">${escapeHTML(client.name)}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="input">
      <label class="input__label" for="project">Powiązany projekt</label>
      <select class="input__select" id="project" name="project">
        ${projects.map((project) => `<option value="${escapeAttribute(project.id)}">${escapeHTML(project.name)}</option>`).join('')}
      </select>
    </div>
  </form>
`;

const showEventErrors = (result) => {
  qs('#titleError', document).textContent = getActionFieldError(result, 'title');
  qs('#dateError', document).textContent = getActionFieldError(result, 'date');
};

export const renderCalendarView = (container) => {
  const render = () => {
    const state = store.getState();
    const events = selectEventsWithRelations(state);

    container.innerHTML = `
      <main id="main" class="container">
        <header class="view-header">
          <h1 class="view-header__title">Kalendarz</h1>
          <p class="view-header__desc">Prosty widok nadchodzących wydarzeń powiązanych ze zleceniami.</p>
        </header>

        <section class="card">
          <button class="btn btn--primary" id="addEvent">Dodaj wydarzenie</button>
        </section>

        <section class="card">
          <h2 class="card__title">Nadchodzące wydarzenia</h2>
          <div class="calendar-list">
            ${
              events.length
                ? events
                    .map((event) => {
                      return `
                      <div class="list__item">
                        <div>
                          <strong>${escapeHTML(event.title)}</strong>
                          <div class="input__helper">${escapeHTML(formatDate(event.date))} · ${escapeHTML(event.client?.name || 'Brak klienta')}</div>
                        </div>
                        <div>
                          <span class="badge badge--info">${escapeHTML(event.project?.name || 'Bez projektu')}</span>
                          <button class="btn btn--ghost" data-action="delete" data-id="${escapeAttribute(event.id)}">Usuń</button>
                        </div>
                      </div>
                    `;
                    })
                    .join('')
                : '<p class="empty-state">Brak wydarzeń. Dodaj nowe spotkanie.</p>'
            }
          </div>
        </section>
      </main>
    `;
  };

  render();

  const refresh = () => {
    render();
    bindEvents();
  };

  const bindEvents = () => {
    qs('#addEvent', container)?.addEventListener('click', () => {
      const state = store.getState();
      const close = openModal({
        title: 'Nowe wydarzenie',
        content: eventModalContent({}, selectClients(state), selectProjects(state)),
        footer: '<button class="btn btn--secondary" data-modal-close>Anuluj</button><button class="btn btn--primary" id="saveEvent">Zapisz</button>'
      });

      qs('#saveEvent', document)?.addEventListener('click', () => {
        const form = qs('#eventForm', document);
        const data = new FormData(form);
        const result = store.actions.createEvent({
          title: data.get('title'),
          date: data.get('date'),
          clientId: data.get('client'),
          projectId: data.get('project')
        });
        if (!result.ok) {
          showEventErrors(result);
          return;
        }
        showToast('Dodano wydarzenie.');
        close();
        refresh();
      });
    });

    container.querySelectorAll('[data-action="delete"]').forEach((button) => {
      button.addEventListener('click', () => {
        const result = store.actions.deleteEvent(button.dataset.id);
        if (!result.ok) {
          showToast('Nie udało się usunąć wydarzenia.');
          return;
        }
        showToast('Usunięto wydarzenie.');
        refresh();
      });
    });
  };

  bindEvents();
};
