import { qs } from '../core/dom.js';
import { getActionFieldError } from '../core/actions.js';
import { selectClients, selectFilteredProjects, selectProjectById, selectProjectsByStatus, selectProjectsWithClients } from '../core/selectors.js';
import { store } from '../core/store.js';
import { PROJECT_PRIORITIES, PROJECT_STATUSES } from '../domain/constants.js';
import { openModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { formatDate } from '../utils/format.js';

const statusColumns = PROJECT_STATUSES;
const priorityOptions = PROJECT_PRIORITIES;

const projectModalContent = (project = {}, clients = []) => `
  <form id="projectForm" class="form-grid">
    <div class="input">
      <label class="input__label" for="name">Nazwa</label>
      <input class="input__field" id="name" name="name" value="${project.name || ''}" required />
      <span class="input__error" id="nameError"></span>
    </div>
    <div class="form-grid form-grid--two">
      <div class="input">
        <label class="input__label" for="client">Klient</label>
        <select class="input__select" id="client" name="client" required>
          ${clients.map((client) => `<option value="${client.id}" ${project.clientId === client.id ? 'selected' : ''}>${client.name}</option>`).join('')}
        </select>
      </div>
      <div class="input">
        <label class="input__label" for="status">Status</label>
        <select class="input__select" id="status" name="status">
          ${statusColumns.map((status) => `<option value="${status}" ${project.status === status ? 'selected' : ''}>${status}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-grid form-grid--two">
      <div class="input">
        <label class="input__label" for="priority">Priorytet</label>
        <select class="input__select" id="priority" name="priority">
          ${priorityOptions.map((priority) => `<option value="${priority}" ${project.priority === priority ? 'selected' : ''}>${priority}</option>`).join('')}
        </select>
      </div>
      <div class="input">
        <label class="input__label" for="dueDate">Termin</label>
        <input class="input__field" id="dueDate" name="dueDate" type="date" value="${project.dueDate ? project.dueDate.split('T')[0] : ''}" />
        <span class="input__error" id="dueDateError"></span>
      </div>
    </div>
    <div class="input">
      <label class="input__label" for="notes">Notatki</label>
      <textarea class="input__textarea" id="notes" name="notes" rows="3">${project.notes || ''}</textarea>
    </div>
  </form>
`;

const badgeClass = (value) => {
  if (value === 'High' || value === 'Review') return 'badge--warning';
  if (value === 'Done') return 'badge--success';
  return 'badge--info';
};

const showProjectErrors = (result) => {
  qs('#nameError', document).textContent = getActionFieldError(result, 'name');
  qs('#dueDateError', document).textContent = getActionFieldError(result, 'dueDate');
};

export const renderProjectsView = (container) => {
  let filterState = { status: 'all', priority: 'all' };

  const render = () => {
    const state = store.getState();
    const filtered = selectProjectsWithClients(state, selectFilteredProjects(state, filterState));

    container.innerHTML = `
      <main id="main" class="container">
        <header class="view-header">
          <h1 class="view-header__title">Zlecenia</h1>
          <p class="view-header__desc">Śledź statusy zleceń i priorytety bez przeciążenia narzędziem.</p>
        </header>
        <section class="card">
          <div class="form-grid form-grid--two">
            <div class="input">
              <label class="input__label" for="statusFilter">Status</label>
              <select class="input__select" id="statusFilter">
                <option value="all">Wszystkie</option>
                ${statusColumns.map((status) => `<option value="${status}" ${filterState.status === status ? 'selected' : ''}>${status}</option>`).join('')}
              </select>
            </div>
            <div class="input">
              <label class="input__label" for="priorityFilter">Priorytet</label>
              <select class="input__select" id="priorityFilter">
                <option value="all">Wszystkie</option>
                ${priorityOptions.map((priority) => `<option value="${priority}" ${filterState.priority === priority ? 'selected' : ''}>${priority}</option>`).join('')}
              </select>
            </div>
          </div>
          <button class="btn btn--primary" id="addProject">Dodaj zlecenie</button>
        </section>

        <section class="kanban">
          ${statusColumns
            .map((status) => {
              const columnItems = selectProjectsByStatus(state, status, filtered);
              return `
                <div class="kanban__column">
                  <div class="kanban__title">${status} (${columnItems.length})</div>
                  <div class="list">
                    ${
                      columnItems.length
                        ? columnItems
                            .map((project) => {
                              return `
                              <article class="kanban__card">
                                <strong>${project.name}</strong>
                                <span class="input__helper">${project.client?.name || 'Bez klienta'}</span>
                                <div>
                                  <span class="badge ${badgeClass(project.priority)}">${project.priority}</span>
                                  <span class="badge ${badgeClass(project.status)}">${project.status}</span>
                                </div>
                                <span class="input__helper">Termin: ${formatDate(project.dueDate)}</span>
                                <div class="table__actions">
                                  <button class="btn btn--ghost" data-action="edit" data-id="${project.id}">Edytuj</button>
                                  <button class="btn btn--ghost" data-action="delete" data-id="${project.id}">Usuń</button>
                                </div>
                              </article>
                            `;
                            })
                            .join('')
                        : '<p class="input__helper">Brak elementów.</p>'
                    }
                  </div>
                </div>
              `;
            })
            .join('')}
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
    const statusFilter = qs('#statusFilter', container);
    const priorityFilter = qs('#priorityFilter', container);

    statusFilter?.addEventListener('change', () => {
      filterState.status = statusFilter.value;
      refresh();
    });
    priorityFilter?.addEventListener('change', () => {
      filterState.priority = priorityFilter.value;
      refresh();
    });

    qs('#addProject', container)?.addEventListener('click', () => {
      const close = openModal({
        title: 'Nowe zlecenie',
        content: projectModalContent({}, selectClients(store.getState())),
        footer: '<button class="btn btn--secondary" data-modal-close>Anuluj</button><button class="btn btn--primary" id="saveProject">Zapisz</button>'
      });
      qs('#saveProject', document)?.addEventListener('click', () => {
        const form = qs('#projectForm', document);
        const data = new FormData(form);
        const result = store.actions.createProject({
          name: data.get('name'),
          clientId: data.get('client'),
          status: data.get('status'),
          priority: data.get('priority'),
          dueDate: data.get('dueDate'),
          notes: data.get('notes')
        });
        if (!result.ok) {
          showProjectErrors(result);
          return;
        }
        showToast('Dodano zlecenie.');
        close();
        refresh();
      });
    });

    container.querySelectorAll('[data-action="edit"]').forEach((button) => {
      button.addEventListener('click', () => {
        const project = selectProjectById(store.getState(), button.dataset.id);
        if (!project) {
          showToast('Nie znaleziono zlecenia.');
          return;
        }
        const close = openModal({
          title: 'Edytuj zlecenie',
          content: projectModalContent(project, selectClients(store.getState())),
          footer: '<button class="btn btn--secondary" data-modal-close>Anuluj</button><button class="btn btn--primary" id="updateProject">Zapisz</button>'
        });
        qs('#updateProject', document)?.addEventListener('click', () => {
          const form = qs('#projectForm', document);
          const data = new FormData(form);
          const result = store.actions.updateProject(project.id, {
            name: data.get('name'),
            clientId: data.get('client'),
            status: data.get('status'),
            priority: data.get('priority'),
            dueDate: data.get('dueDate'),
            notes: data.get('notes')
          });
          if (!result.ok) {
            showProjectErrors(result);
            return;
          }
          showToast('Zaktualizowano zlecenie.');
          close();
          refresh();
        });
      });
    });

    container.querySelectorAll('[data-action="delete"]').forEach((button) => {
      button.addEventListener('click', () => {
        const project = selectProjectById(store.getState(), button.dataset.id);
        if (!project) {
          showToast('Nie znaleziono zlecenia.');
          return;
        }
        const close = openModal({
          title: 'Usuń zlecenie',
          content: `<p>Czy na pewno usunąć <strong>${project.name}</strong>?</p>`,
          footer: '<button class="btn btn--secondary" data-modal-close>Anuluj</button><button class="btn btn--primary" id="confirmProjectDelete">Usuń</button>'
        });
        qs('#confirmProjectDelete', document)?.addEventListener('click', () => {
          const result = store.actions.deleteProject(project.id);
          if (!result.ok) {
            showToast('Nie udało się usunąć zlecenia.');
            close();
            return;
          }
          showToast('Usunięto zlecenie.');
          close();
          refresh();
        });
      });
    });
  };

  bindEvents();
};
