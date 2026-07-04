import { qs } from '../core/dom.js';
import { getActionFieldError } from '../core/actions.js';
import { selectClientById, selectFilteredClients } from '../core/selectors.js';
import { store } from '../core/store.js';
import { CLIENT_STATUSES } from '../domain/constants.js';
import { openModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { escapeAttribute, escapeHTML } from '../utils/sanitize.js';

const renderDetails = (client) => {
  if (!client) {
    return `
      <div class="side-panel">
        <h2>Podgląd klienta</h2>
        <p class="input__helper">Wybierz klienta z listy, aby zobaczyć szczegóły.</p>
      </div>
    `;
  }

  return `
    <div class="side-panel">
      <h2>${escapeHTML(client.name)}</h2>
      <p class="input__helper">${escapeHTML(client.status)}</p>
      <div class="list">
        <div><strong>Email:</strong> ${escapeHTML(client.email)}</div>
        <div><strong>Telefon:</strong> ${escapeHTML(client.phone)}</div>
        <div><strong>Notatki:</strong> ${escapeHTML(client.notes)}</div>
      </div>
    </div>
  `;
};

const clientModalContent = (client = {}) => `
  <form id="clientForm" class="form-grid">
    <div class="form-grid form-grid--two">
      <div class="input">
        <label class="input__label" for="name">Nazwa</label>
        <input class="input__field" id="name" name="name" value="${escapeAttribute(client.name || '')}" required />
        <span class="input__error" id="nameError"></span>
      </div>
      <div class="input">
        <label class="input__label" for="status">Status</label>
        <select class="input__select" id="status" name="status">
          ${CLIENT_STATUSES.map((status) => `<option value="${escapeAttribute(status)}" ${client.status === status ? 'selected' : ''}>${escapeHTML(status)}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-grid form-grid--two">
      <div class="input">
        <label class="input__label" for="email">Email</label>
        <input class="input__field" id="email" name="email" type="email" value="${escapeAttribute(client.email || '')}" required />
        <span class="input__error" id="emailError"></span>
      </div>
      <div class="input">
        <label class="input__label" for="phone">Telefon</label>
        <input class="input__field" id="phone" name="phone" value="${escapeAttribute(client.phone || '')}" required />
      </div>
    </div>
    <div class="input">
      <label class="input__label" for="notes">Notatki</label>
      <textarea class="input__textarea" id="notes" name="notes" rows="3">${escapeHTML(client.notes || '')}</textarea>
      <span class="input__helper">Krótki kontekst dla zespołu.</span>
    </div>
  </form>
`;

const showClientErrors = (result) => {
  qs('#nameError', document).textContent = getActionFieldError(result, 'name');
  qs('#emailError', document).textContent = getActionFieldError(result, 'email');
};

export const renderClientsView = (container) => {
  const state = store.getState();
  let selectedId = state.clients[0]?.id || null;
  let filterState = { term: '', sort: 'name' };

  const render = () => {
    const currentState = store.getState();
    const filtered = selectFilteredClients(currentState, filterState);
    const rows = filtered
      .map(
        (client) => `
        <tr data-id="${escapeAttribute(client.id)}">
          <td>${escapeHTML(client.name)}</td>
          <td>${escapeHTML(client.email)}</td>
          <td>${escapeHTML(client.status)}</td>
          <td>
            <div class="table__actions">
              <button class="btn btn--ghost" data-action="edit" data-id="${escapeAttribute(client.id)}">Edytuj</button>
              <button class="btn btn--ghost" data-action="delete" data-id="${escapeAttribute(client.id)}">Usuń</button>
            </div>
          </td>
        </tr>
      `
      )
      .join('');

    container.innerHTML = `
      <main id="main" class="container">
        <header class="view-header">
          <h1 class="view-header__title">Klienci</h1>
          <p class="view-header__desc">Baza klientów, statusy współpracy i szybkie akcje.</p>
        </header>
        <section class="clients-layout">
          <div class="card">
            <div class="list">
              <div class="form-grid form-grid--two">
                <div class="input">
                  <label class="input__label" for="filterInput">Filtruj</label>
                  <input class="input__field" id="filterInput" placeholder="Wpisz nazwę lub email" value="${escapeAttribute(filterState.term)}" />
                </div>
                <div class="input">
                  <label class="input__label" for="sortSelect">Sortuj</label>
                  <select class="input__select" id="sortSelect">
                    <option value="name" ${filterState.sort === 'name' ? 'selected' : ''}>Nazwa</option>
                    <option value="status" ${filterState.sort === 'status' ? 'selected' : ''}>Status</option>
                  </select>
                </div>
              </div>
              <button class="btn btn--primary" id="addClient">Dodaj klienta</button>
            </div>
            <div class="table-wrapper">
              ${
                rows.length
                  ? `
                <table class="table">
                  <thead>
                    <tr>
                      <th>Klient</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rows}
                  </tbody>
                </table>
              `
                  : '<p class="empty-state">Brak klientów. Dodaj pierwszy rekord.</p>'
              }
            </div>
          </div>
          ${renderDetails(selectClientById(currentState, selectedId))}
        </section>
      </main>
    `;
  };

  render();

  function refresh() {
    render();
    updateHandlers();
  }

  const updateHandlers = () => {
    const filterInput = qs('#filterInput', container);
    const sortSelect = qs('#sortSelect', container);

    const filterAndRender = () => {
      filterState = { term: filterInput.value, sort: sortSelect.value };
      refresh();
    };

    filterInput?.addEventListener('input', filterAndRender);
    sortSelect?.addEventListener('change', filterAndRender);

    qs('#addClient', container)?.addEventListener('click', () => {
      const close = openModal({
        title: 'Nowy klient',
        content: clientModalContent(),
        footer: '<button class="btn btn--secondary" data-modal-close>Anuluj</button><button class="btn btn--primary" id="saveClient">Zapisz</button>'
      });

      const saveBtn = qs('#saveClient', document);
      saveBtn?.addEventListener('click', () => {
        const form = qs('#clientForm', document);
        const data = new FormData(form);
        const result = store.actions.createClient({
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          status: data.get('status'),
          notes: data.get('notes')
        });
        if (!result.ok) {
          showClientErrors(result);
          return;
        }
        showToast('Dodano klienta.');
        close();
        refresh();
      });
    });

    container.querySelectorAll('[data-action="edit"]').forEach((button) => {
      button.addEventListener('click', () => {
        const client = store.getState().clients.find((item) => item.id === button.dataset.id);
        const close = openModal({
          title: 'Edytuj klienta',
          content: clientModalContent(client),
          footer: '<button class="btn btn--secondary" data-modal-close>Anuluj</button><button class="btn btn--primary" id="updateClient">Zapisz</button>'
        });
        qs('#updateClient', document)?.addEventListener('click', () => {
          const form = qs('#clientForm', document);
          const data = new FormData(form);
          const result = store.actions.updateClient(client.id, {
            name: data.get('name'),
            email: data.get('email'),
            phone: data.get('phone'),
            status: data.get('status'),
            notes: data.get('notes')
          });
          if (!result.ok) {
            showClientErrors(result);
            return;
          }
          showToast('Zaktualizowano klienta.');
          close();
          refresh();
        });
      });
    });

    container.querySelectorAll('[data-action="delete"]').forEach((button) => {
      button.addEventListener('click', () => {
        const client = store.getState().clients.find((item) => item.id === button.dataset.id);
        const close = openModal({
          title: 'Usuń klienta',
          content: `<p>Czy na pewno usunąć <strong>${escapeHTML(client.name)}</strong>? Znikną też powiązane zlecenia.</p>`,
          footer: '<button class="btn btn--secondary" data-modal-close>Anuluj</button><button class="btn btn--primary" id="confirmDelete">Usuń</button>'
        });
        qs('#confirmDelete', document)?.addEventListener('click', () => {
          const result = store.actions.deleteClient(client.id);
          if (!result.ok) {
            showToast('Nie udało się usunąć klienta.');
            close();
            return;
          }
          showToast('Usunięto klienta.');
          close();
          refresh();
        });
      });
    });

    container.querySelectorAll('tbody tr').forEach((row) => {
      row.addEventListener('click', () => {
        selectedId = row.dataset.id || null;
        refresh();
      });
    });
  };

  updateHandlers();
};
