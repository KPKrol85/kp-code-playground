(() => {
  const STATUSES = [
    'Niepoproszono',
    'Poproszono',
    'W trakcie',
    'Otrzymano',
    'Wymaga poprawek',
    'Zatwierdzono',
    'Zablokowane'
  ];

  const PRIORITIES = ['Niski', 'Średni', 'Wysoki', 'Krytyczny'];

  const CATEGORIES = [
    'Materiały marki',
    'Treści strony',
    'Dane kontaktowe i firmowe',
    'Social media i marketing',
    'Aspekty prawne i zgodność',
    'Dostępy techniczne',
    'Opcjonalne dodatki projektowe'
  ];

  const STORAGE_KEY = 'dvContentDeliveryTracker.v1';

  const defaultItems = [
    item('Logo files (SVG, PNG, favicon)', 'Materiały marki', 'Wysoki', 'wymagane'),
    item('Brand colors and guidelines', 'Materiały marki', 'Wysoki', 'wymagane'),
    item('Website photos / approved image pack', 'Materiały marki', 'Średni', 'wymagane'),
    item('Page copy (home, services, about, contact)', 'Treści strony', 'Krytyczny', 'wymagane'),
    item('Product / service descriptions', 'Treści strony', 'Wysoki', 'wymagane'),
    item('Testimonials / case studies', 'Treści strony', 'Średni', 'opcjonalne'),
    item('Team information and bios', 'Treści strony', 'Średni', 'opcjonalne'),
    item('Contact details and business hours', 'Dane kontaktowe i firmowe', 'Krytyczny', 'wymagane'),
    item('Pricing information', 'Dane kontaktowe i firmowe', 'Wysoki', 'wymagane'),
    item('Social profile links', 'Social media i marketing', 'Średni', 'opcjonalne'),
    item('Privacy policy', 'Aspekty prawne i zgodność', 'Krytyczny', 'wymagane'),
    item('Terms and conditions', 'Aspekty prawne i zgodność', 'Wysoki', 'wymagane'),
    item('Cookie policy', 'Aspekty prawne i zgodność', 'Wysoki', 'wymagane'),
    item('Hosting access credentials', 'Dostępy techniczne', 'Krytyczny', 'wymagane'),
    item('Domain registrar access', 'Dostępy techniczne', 'Krytyczny', 'wymagane'),
    item('CMS access details', 'Dostępy techniczne', 'Krytyczny', 'wymagane'),
    item('Analytics access (GA4 / GTM)', 'Dostępy techniczne', 'Średni', 'opcjonalne'),
    item('Email / SMTP details', 'Dostępy techniczne', 'Wysoki', 'wymagane'),
    item('Downloadable files (PDFs, lead magnets)', 'Opcjonalne dodatki projektowe', 'Niski', 'opcjonalne'),
    item('Extra notes from client', 'Opcjonalne dodatki projektowe', 'Niski', 'opcjonalne')
  ];

  const els = {
    setupForm: document.getElementById('setup-form'),
    summaryFields: document.querySelectorAll('[data-summary]'),
    categoryFilter: document.getElementById('category-filter'),
    statusFilter: document.getElementById('status-filter'),
    priorityFilter: document.getElementById('priority-filter'),
    searchFilter: document.getElementById('search-filter'),
    resetFiltersBtn: document.getElementById('reset-filters'),
    addItemForm: document.getElementById('add-item-form'),
    addItemFeedback: document.getElementById('add-item-feedback'),
    customCategory: document.getElementById('custom-category'),
    customPriority: document.getElementById('custom-priority'),
    trackerBody: document.getElementById('tracker-body'),
    metrics: document.getElementById('metrics'),
    readiness: document.getElementById('readiness-status'),
    missingSummary: document.getElementById('missing-summary'),
    copyFollowUp: document.getElementById('copy-follow-up'),
    exportChecklist: document.getElementById('export-client-checklist'),
    exportHandoff: document.getElementById('export-handoff'),
    exportFollowUp: document.getElementById('export-follow-up'),
    appFeedback: document.getElementById('app-feedback'),
    resetTracker: document.getElementById('reset-tracker')
  };

  const state = {
    project: {
      clientName: '',
      projectName: '',
      projectType: '',
      deadline: '',
      manager: '',
      notes: ''
    },
    filters: {
      category: 'Wszystkie kategorie',
      status: 'Wszystkie statusy',
      priority: 'Wszystkie priorytety',
      search: ''
    },
    items: defaultItems.map((entry) => ({ ...entry }))
  };

  init();

  function init() {
    if (!els.setupForm || !els.trackerBody) return;

    hydrateFromStorage();
    renderSelectOptions();
    bindEvents();
    renderAll();
  }

  function item(name, category, priority, required) {
    return {
      id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Math.random().toString(16).slice(2, 8)}`,
      name,
      category,
      status: 'Niepoproszono',
      priority,
      required,
      requestedDate: '',
      receivedDate: '',
      owner: '',
      notes: '',
      isCustom: false
    };
  }

  function renderSelectOptions() {
    renderSelect(els.categoryFilter, ['Wszystkie kategorie', ...CATEGORIES]);
    renderSelect(els.statusFilter, ['Wszystkie statusy', ...STATUSES]);
    renderSelect(els.priorityFilter, ['Wszystkie priorytety', ...PRIORITIES]);
    renderSelect(els.customCategory, CATEGORIES);
    renderSelect(els.customPriority, PRIORITIES);

    els.categoryFilter.value = state.filters.category;
    els.statusFilter.value = state.filters.status;
    els.priorityFilter.value = state.filters.priority;
  }

  function renderSelect(select, values) {
    select.innerHTML = values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
  }

  function bindEvents() {
    els.setupForm.addEventListener('input', handleProjectInput);

    [els.categoryFilter, els.statusFilter, els.priorityFilter, els.searchFilter].forEach((control) => {
      control.addEventListener('input', handleFilterChange);
    });

    els.resetFiltersBtn.addEventListener('click', () => {
      state.filters = { category: 'Wszystkie kategorie', status: 'Wszystkie statusy', priority: 'Wszystkie priorytety', search: '' };
      els.searchFilter.value = '';
      renderAll();
      announce('Filtry wyczyszczone. Pokazuję wszystkie elementy trackera.');
    });

    els.addItemForm.addEventListener('submit', handleAddItem);
    els.trackerBody.addEventListener('input', handleRowInput);
    els.trackerBody.addEventListener('click', handleRowActions);
    els.copyFollowUp.addEventListener('click', () => copyText(els.exportFollowUp.value, 'Wiadomość follow-up skopiowana.'));
    document.querySelectorAll('.copy-export').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.dataset.export;
        const field = document.getElementById(id);
        if (!field) return;
        copyText(field.value, 'Szablon skopiowany do schowka.');
      });
    });

    els.resetTracker.addEventListener('click', () => {
      state.items = defaultItems.map((entry) => ({ ...entry }));
      persist();
      renderAll();
      announce('Tracker przywrócono do domyślnej listy startowej.');
    });
  }

  function handleProjectInput() {
    const formData = new FormData(els.setupForm);
    Object.keys(state.project).forEach((key) => {
      state.project[key] = String(formData.get(key) || '').trim();
    });
    persist();
    renderProjectSummary();
    renderExportsAndSummary();
  }

  function handleFilterChange() {
    state.filters = {
      category: els.categoryFilter.value,
      status: els.statusFilter.value,
      priority: els.priorityFilter.value,
      search: els.searchFilter.value.trim().toLowerCase()
    };
    renderTracker();
  }

  function handleAddItem(event) {
    event.preventDefault();
    const formData = new FormData(els.addItemForm);
    const name = String(formData.get('itemName') || '').trim();

    if (!name) {
      els.addItemFeedback.textContent = 'Nazwa elementu jest wymagana.';
      els.addItemFeedback.classList.add('error-text');
      return;
    }

    const newItem = {
      id: `custom-${Date.now()}`,
      name,
      category: String(formData.get('itemCategory')),
      status: 'Niepoproszono',
      priority: String(formData.get('itemPriority')),
      required: String(formData.get('itemRequired')),
      requestedDate: '',
      receivedDate: '',
      owner: String(formData.get('itemOwner') || '').trim(),
      notes: String(formData.get('itemNotes') || '').trim(),
      isCustom: true
    };

    state.items.push(newItem);
    els.addItemForm.reset();
    els.customCategory.value = CATEGORIES[0];
    els.customPriority.value = 'Niski';
    els.addItemFeedback.textContent = `Dodano własny element: ${newItem.name}.`;
    els.addItemFeedback.classList.remove('error-text');
    persist();
    renderAll();
  }

  function handleRowInput(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const row = target.closest('tr[data-id]');
    if (!row) return;

    const entry = state.items.find((itemEntry) => itemEntry.id === row.dataset.id);
    if (!entry) return;

    if (target.matches('[data-field]')) {
      const field = target.dataset.field;
      entry[field] = String(target.value);
      persist();
      renderAll();
    }
  }

  function handleRowActions(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (!target.matches('.remove-custom')) return;
    const row = target.closest('tr[data-id]');
    if (!row) return;

    state.items = state.items.filter((entry) => entry.id !== row.dataset.id);
    persist();
    renderAll();
    announce('Usunięto własny element z trackera.');
  }

  function renderAll() {
    renderProjectSummary();
    renderTracker();
    renderDashboard();
    renderExportsAndSummary();
  }

  function renderProjectSummary() {
    const fallback = {
      clientName: 'Nie ustawiono',
      projectName: 'Nie ustawiono',
      projectType: 'Nie ustawiono',
      deadline: 'Nie ustawiono',
      manager: 'Nie ustawiono',
      notes: '—'
    };

    els.summaryFields.forEach((field) => {
      const key = field.dataset.summary;
      const value = state.project[key];
      field.textContent = value ? value : fallback[key];
    });

    Object.keys(state.project).forEach((key) => {
      const input = els.setupForm.elements.namedItem(key);
      if (input && 'value' in input) input.value = state.project[key];
    });
  }

  function getFilteredItems() {
    return state.items.filter((entry) => {
      const categoryOk = state.filters.category === 'Wszystkie kategorie' || entry.category === state.filters.category;
      const statusOk = state.filters.status === 'Wszystkie statusy' || entry.status === state.filters.status;
      const priorityOk = state.filters.priority === 'Wszystkie priorytety' || entry.priority === state.filters.priority;
      const searchHaystack = `${entry.name} ${entry.notes}`.toLowerCase();
      const searchOk = !state.filters.search || searchHaystack.includes(state.filters.search);
      return categoryOk && statusOk && priorityOk && searchOk;
    });
  }

  function renderTracker() {
    const visible = getFilteredItems();
    if (!visible.length) {
      els.trackerBody.innerHTML = '<tr><td colspan="10">Brak elementów pasujących do wybranych filtrów.</td></tr>';
      return;
    }

    els.trackerBody.innerHTML = visible
      .map((entry) => {
        const removeButton = entry.isCustom
          ? '<button type="button" class="btn subtle remove-custom">Usuń</button>'
          : '<small>Element domyślny</small>';

        return `
          <tr data-id="${escapeHtml(entry.id)}">
            <td><strong>${escapeHtml(entry.name)}</strong></td>
            <td>${escapeHtml(entry.category)}</td>
            <td>${selectHtml('status', STATUSES, entry.status)}</td>
            <td>${selectHtml('priority', PRIORITIES, entry.priority)}</td>
            <td>${selectHtml('required', ['wymagane', 'opcjonalne'], entry.required)}</td>
            <td><input class="inline-field" data-field="requestedDate" type="date" value="${escapeHtml(entry.requestedDate)}" aria-label="Data prośby dla ${escapeHtml(entry.name)}" /></td>
            <td><input class="inline-field" data-field="receivedDate" type="date" value="${escapeHtml(entry.receivedDate)}" aria-label="Data otrzymania dla ${escapeHtml(entry.name)}" /></td>
            <td><input data-field="owner" type="text" value="${escapeHtml(entry.owner)}" maxlength="80" aria-label="Właściciel dla ${escapeHtml(entry.name)}" /></td>
            <td><textarea data-field="notes" rows="2" maxlength="180" aria-label="Notatki dla ${escapeHtml(entry.name)}">${escapeHtml(entry.notes)}</textarea></td>
            <td>${removeButton}</td>
          </tr>
        `;
      })
      .join('');
  }

  function renderDashboard() {
    const totals = calcTotals();
    const readiness = calcReadiness(totals);

    const metrics = [
      ['Liczba elementów', totals.total],
      ['Elementy otrzymane', totals.received],
      ['Elementy zatwierdzone', totals.approved],
      ['Brakujące wymagane', totals.missingRequired],
      ['Elementy zablokowane', totals.blocked],
      ['Postęp', `${totals.completion}%`]
    ];

    els.metrics.innerHTML = metrics
      .map(([label, value]) => `<article class="metric"><p>${label}</p><strong>${value}</strong></article>`)
      .join('');

    els.readiness.textContent = readiness;
    els.readiness.className = readiness.startsWith('Wysokie ryzyko') ? 'warning-text' : '';
  }

  function calcTotals() {
    const total = state.items.length;
    const approved = state.items.filter((entry) => entry.status === 'Zatwierdzono').length;
    const received = state.items.filter((entry) => ['Otrzymano', 'Zatwierdzono'].includes(entry.status)).length;
    const missingRequired = state.items.filter((entry) => entry.required === 'wymagane' && !['Otrzymano', 'Zatwierdzono'].includes(entry.status)).length;
    const blocked = state.items.filter((entry) => entry.status === 'Zablokowane').length;
    const completion = total === 0 ? 0 : Math.round((approved / total) * 100);

    return { total, approved, received, missingRequired, blocked, completion };
  }

  function calcReadiness(totals) {
    const pendingCritical = state.items.some(
      (entry) => entry.priority === 'Krytyczny' && entry.required === 'wymagane' && entry.status !== 'Zatwierdzono'
    );

    if (totals.blocked > 0 && pendingCritical) return 'Wysokie ryzyko: brakuje krytycznych materiałów';
    if (totals.missingRequired > 0 && totals.completion < 55) return 'Oczekiwanie na materiały od klienta';
    if (totals.missingRequired > 0) return 'Niegotowy';
    if (totals.completion >= 85) return 'Gotowy do produkcji';
    if (totals.completion >= 65) return 'Prawie gotowy';
    return 'Niegotowy';
  }

  function renderExportsAndSummary() {
    const missingRequired = state.items.filter(
      (entry) => entry.required === 'wymagane' && !['Otrzymano', 'Zatwierdzono'].includes(entry.status)
    );
    const blocked = state.items.filter((entry) => entry.status === 'Zablokowane');
    const revision = state.items.filter((entry) => entry.status === 'Wymaga poprawek');
    const criticalPending = state.items.filter(
      (entry) => entry.priority === 'Krytyczny' && entry.status !== 'Zatwierdzono'
    );

    els.missingSummary.innerHTML = summarySection([
      ['Brakujące wymagane elementy', missingRequired],
      ['Elementy zablokowane', blocked],
      ['Elementy wymagające poprawek', revision],
      ['Krytyczne elementy bez akceptacji', criticalPending]
    ]);

    els.exportChecklist.value = buildChecklistText();
    els.exportHandoff.value = buildHandoffText();
    els.exportFollowUp.value = buildFollowUpText(missingRequired, blocked, revision, criticalPending);
  }

  function buildChecklistText() {
    const heading = `Checklista prośby do klienta${projectLabel()}`;
    const lines = state.items.map(
      (entry) => `- [ ] ${entry.name} (${entry.category}) · priorytet: ${entry.priority} · ${entry.required}`
    );
    return [heading, '', ...lines].join('\n');
  }

  function buildHandoffText() {
    const totals = calcTotals();
    const lines = [
      `Wewnętrzne podsumowanie przekazania${projectLabel()}`,
      `Odpowiedzialny: ${state.project.manager || 'Nie ustawiono'}`,
      `Termin: ${state.project.deadline || 'Nie ustawiono'}`,
      '',
      `Liczba elementów: ${totals.total}`,
      `Zatwierdzone: ${totals.approved}`,
      `Otrzymane: ${totals.received}`,
      `Brakujące wymagane: ${totals.missingRequired}`,
      `Zablokowane: ${totals.blocked}`,
      '',
      'Otwarte elementy:',
      ...state.items
        .filter((entry) => !['Otrzymano', 'Zatwierdzono'].includes(entry.status))
        .map((entry) => `- ${entry.name} · status: ${entry.status} · priorytet: ${entry.priority} · właściciel: ${entry.owner || 'nieprzypisany'}`)
    ];

    return lines.join('\n');
  }

  function buildFollowUpText(missingRequired, blocked, revision, criticalPending) {
    const client = state.project.clientName || 'Kliencie';
    const projectName = state.project.projectName ? ` dla ${state.project.projectName}` : '';

    const lines = [
      `Cześć ${client},`,
      '',
      `Przesyłam krótkie podsumowanie brakujących materiałów i dostępów${projectName}.`,
      'Żeby utrzymać termin realizacji, potrzebujemy jeszcze elementów poniżej:',
      ''
    ];

    appendGroup(lines, 'Brakujące wymagane elementy', missingRequired);
    appendGroup(lines, 'Elementy zablokowane', blocked);
    appendGroup(lines, 'Wymaga poprawek', revision);
    appendGroup(lines, 'Krytyczne elementy oczekujące na akceptację', criticalPending);

    lines.push(
      '',
      'Uwaga terminowa: postęp projektu i data wdrożenia zależą od dostarczenia lub zatwierdzenia tych materiałów.',
      'Dziękuję za wsparcie i szybką odpowiedź.',
      '',
      'Pozdrawiam,'
    );

    return lines.join('\n');
  }

  function appendGroup(lines, title, entries) {
    if (!entries.length) return;
    lines.push(`${title}:`);
    entries.forEach((entry) => {
      lines.push(`- ${entry.name} (${entry.status}; ${entry.priority})`);
    });
    lines.push('');
  }

  function projectLabel() {
    const client = state.project.clientName;
    const project = state.project.projectName;
    if (!client && !project) return '';
    return ` · ${client || 'Klient'}${project ? ` / ${project}` : ''}`;
  }

  function summarySection(groups) {
    const parts = groups
      .map(([title, entries]) => {
        if (!entries.length) return `<article><h3>${title}</h3><p>Brak na ten moment.</p></article>`;
        const rows = entries.map((entry) => `<li><strong>${escapeHtml(entry.name)}</strong> <span>(${escapeHtml(entry.status)} · ${escapeHtml(entry.priority)})</span></li>`).join('');
        return `<article><h3>${title}</h3><ul>${rows}</ul></article>`;
      })
      .join('');

    return parts;
  }

  function selectHtml(field, options, selected) {
    const rendered = options
      .map((option) => `<option value="${escapeHtml(option)}" ${option === selected ? 'selected' : ''}>${escapeHtml(option)}</option>`)
      .join('');
    return `<select data-field="${field}" aria-label="${field}">${rendered}</select>`;
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ project: state.project, items: state.items }));
    } catch (_error) {
      // localStorage unavailable; app remains fully usable in-memory.
    }
  }

  function hydrateFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.project) state.project = { ...state.project, ...parsed.project };
      if (Array.isArray(parsed?.items) && parsed.items.length) state.items = parsed.items;
    } catch (_error) {
      // ignore invalid storage and continue with defaults.
    }
  }

  async function copyText(text, successMessage) {
    if (!text.trim()) {
      announce('Na razie nie ma czego kopiować.');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      announce(successMessage);
      return;
    } catch (_error) {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', 'true');
      area.style.position = 'absolute';
      area.style.left = '-9999px';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
      announce(`${successMessage} (fallback method)`);
    }
  }

  function announce(message) {
    els.appFeedback.textContent = message;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
})();
