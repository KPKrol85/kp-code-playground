(() => {
  const STATUSES = [
    'Not requested',
    'Requested',
    'In progress',
    'Received',
    'Needs revision',
    'Approved',
    'Blocked'
  ];

  const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

  const CATEGORIES = [
    'Brand assets',
    'Website content',
    'Contact and business data',
    'Social media and marketing',
    'Legal and compliance',
    'Technical access',
    'Optional project extras'
  ];

  const STORAGE_KEY = 'dvContentDeliveryTracker.v1';

  const defaultItems = [
    item('Logo files (SVG, PNG, favicon)', 'Brand assets', 'High', 'required'),
    item('Brand colors and guidelines', 'Brand assets', 'High', 'required'),
    item('Website photos / approved image pack', 'Brand assets', 'Medium', 'required'),
    item('Page copy (home, services, about, contact)', 'Website content', 'Critical', 'required'),
    item('Product / service descriptions', 'Website content', 'High', 'required'),
    item('Testimonials / case studies', 'Website content', 'Medium', 'optional'),
    item('Team information and bios', 'Website content', 'Medium', 'optional'),
    item('Contact details and business hours', 'Contact and business data', 'Critical', 'required'),
    item('Pricing information', 'Contact and business data', 'High', 'required'),
    item('Social profile links', 'Social media and marketing', 'Medium', 'optional'),
    item('Privacy policy', 'Legal and compliance', 'Critical', 'required'),
    item('Terms and conditions', 'Legal and compliance', 'High', 'required'),
    item('Cookie policy', 'Legal and compliance', 'High', 'required'),
    item('Hosting access credentials', 'Technical access', 'Critical', 'required'),
    item('Domain registrar access', 'Technical access', 'Critical', 'required'),
    item('CMS access details', 'Technical access', 'Critical', 'required'),
    item('Analytics access (GA4 / GTM)', 'Technical access', 'Medium', 'optional'),
    item('Email / SMTP details', 'Technical access', 'High', 'required'),
    item('Downloadable files (PDFs, lead magnets)', 'Optional project extras', 'Low', 'optional'),
    item('Extra notes from client', 'Optional project extras', 'Low', 'optional')
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
      category: 'All categories',
      status: 'All statuses',
      priority: 'All priorities',
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
      status: 'Not requested',
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
    renderSelect(els.categoryFilter, ['All categories', ...CATEGORIES]);
    renderSelect(els.statusFilter, ['All statuses', ...STATUSES]);
    renderSelect(els.priorityFilter, ['All priorities', ...PRIORITIES]);
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
      state.filters = { category: 'All categories', status: 'All statuses', priority: 'All priorities', search: '' };
      els.searchFilter.value = '';
      renderAll();
      announce('Filters reset. Showing all tracker items.');
    });

    els.addItemForm.addEventListener('submit', handleAddItem);
    els.trackerBody.addEventListener('input', handleRowInput);
    els.trackerBody.addEventListener('click', handleRowActions);
    els.copyFollowUp.addEventListener('click', () => copyText(els.exportFollowUp.value, 'Follow-up message copied.'));
    document.querySelectorAll('.copy-export').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.dataset.export;
        const field = document.getElementById(id);
        if (!field) return;
        copyText(field.value, 'Template copied to clipboard.');
      });
    });

    els.resetTracker.addEventListener('click', () => {
      state.items = defaultItems.map((entry) => ({ ...entry }));
      persist();
      renderAll();
      announce('Tracker reset to default starter list.');
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
      els.addItemFeedback.textContent = 'Item name is required.';
      els.addItemFeedback.classList.add('error-text');
      return;
    }

    const newItem = {
      id: `custom-${Date.now()}`,
      name,
      category: String(formData.get('itemCategory')),
      status: 'Not requested',
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
    els.customPriority.value = 'Low';
    els.addItemFeedback.textContent = `Custom item added: ${newItem.name}.`;
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
    announce('Custom item removed from tracker.');
  }

  function renderAll() {
    renderProjectSummary();
    renderTracker();
    renderDashboard();
    renderExportsAndSummary();
  }

  function renderProjectSummary() {
    const fallback = {
      clientName: 'Not set',
      projectName: 'Not set',
      projectType: 'Not set',
      deadline: 'Not set',
      manager: 'Not set',
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
      const categoryOk = state.filters.category === 'All categories' || entry.category === state.filters.category;
      const statusOk = state.filters.status === 'All statuses' || entry.status === state.filters.status;
      const priorityOk = state.filters.priority === 'All priorities' || entry.priority === state.filters.priority;
      const searchHaystack = `${entry.name} ${entry.notes}`.toLowerCase();
      const searchOk = !state.filters.search || searchHaystack.includes(state.filters.search);
      return categoryOk && statusOk && priorityOk && searchOk;
    });
  }

  function renderTracker() {
    const visible = getFilteredItems();
    if (!visible.length) {
      els.trackerBody.innerHTML = '<tr><td colspan="10">No tracker items match the selected filters.</td></tr>';
      return;
    }

    els.trackerBody.innerHTML = visible
      .map((entry) => {
        const removeButton = entry.isCustom
          ? '<button type="button" class="btn subtle remove-custom">Remove</button>'
          : '<small>Default item</small>';

        return `
          <tr data-id="${escapeHtml(entry.id)}">
            <td><strong>${escapeHtml(entry.name)}</strong></td>
            <td>${escapeHtml(entry.category)}</td>
            <td>${selectHtml('status', STATUSES, entry.status)}</td>
            <td>${selectHtml('priority', PRIORITIES, entry.priority)}</td>
            <td>${selectHtml('required', ['required', 'optional'], entry.required)}</td>
            <td><input class="inline-field" data-field="requestedDate" type="date" value="${escapeHtml(entry.requestedDate)}" aria-label="Requested date for ${escapeHtml(entry.name)}" /></td>
            <td><input class="inline-field" data-field="receivedDate" type="date" value="${escapeHtml(entry.receivedDate)}" aria-label="Received date for ${escapeHtml(entry.name)}" /></td>
            <td><input data-field="owner" type="text" value="${escapeHtml(entry.owner)}" maxlength="80" aria-label="Owner for ${escapeHtml(entry.name)}" /></td>
            <td><textarea data-field="notes" rows="2" maxlength="180" aria-label="Notes for ${escapeHtml(entry.name)}">${escapeHtml(entry.notes)}</textarea></td>
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
      ['Total items', totals.total],
      ['Received items', totals.received],
      ['Approved items', totals.approved],
      ['Missing required', totals.missingRequired],
      ['Blocked items', totals.blocked],
      ['Completion', `${totals.completion}%`]
    ];

    els.metrics.innerHTML = metrics
      .map(([label, value]) => `<article class="metric"><p>${label}</p><strong>${value}</strong></article>`)
      .join('');

    els.readiness.textContent = readiness;
    els.readiness.className = readiness.startsWith('High risk') ? 'warning-text' : '';
  }

  function calcTotals() {
    const total = state.items.length;
    const approved = state.items.filter((entry) => entry.status === 'Approved').length;
    const received = state.items.filter((entry) => ['Received', 'Approved'].includes(entry.status)).length;
    const missingRequired = state.items.filter((entry) => entry.required === 'required' && !['Received', 'Approved'].includes(entry.status)).length;
    const blocked = state.items.filter((entry) => entry.status === 'Blocked').length;
    const completion = total === 0 ? 0 : Math.round((approved / total) * 100);

    return { total, approved, received, missingRequired, blocked, completion };
  }

  function calcReadiness(totals) {
    const pendingCritical = state.items.some(
      (entry) => entry.priority === 'Critical' && entry.required === 'required' && entry.status !== 'Approved'
    );

    if (totals.blocked > 0 && pendingCritical) return 'High risk: missing critical materials';
    if (totals.missingRequired > 0 && totals.completion < 55) return 'Waiting for client materials';
    if (totals.missingRequired > 0) return 'Not ready';
    if (totals.completion >= 85) return 'Ready for production';
    if (totals.completion >= 65) return 'Almost ready';
    return 'Not ready';
  }

  function renderExportsAndSummary() {
    const missingRequired = state.items.filter(
      (entry) => entry.required === 'required' && !['Received', 'Approved'].includes(entry.status)
    );
    const blocked = state.items.filter((entry) => entry.status === 'Blocked');
    const revision = state.items.filter((entry) => entry.status === 'Needs revision');
    const criticalPending = state.items.filter(
      (entry) => entry.priority === 'Critical' && entry.status !== 'Approved'
    );

    els.missingSummary.innerHTML = summarySection([
      ['Missing required items', missingRequired],
      ['Blocked items', blocked],
      ['Items needing revision', revision],
      ['Critical items not approved', criticalPending]
    ]);

    els.exportChecklist.value = buildChecklistText();
    els.exportHandoff.value = buildHandoffText();
    els.exportFollowUp.value = buildFollowUpText(missingRequired, blocked, revision, criticalPending);
  }

  function buildChecklistText() {
    const heading = `Client request checklist${projectLabel()}`;
    const lines = state.items.map(
      (entry) => `- [ ] ${entry.name} (${entry.category}) · priority: ${entry.priority} · ${entry.required}`
    );
    return [heading, '', ...lines].join('\n');
  }

  function buildHandoffText() {
    const totals = calcTotals();
    const lines = [
      `Internal handoff summary${projectLabel()}`,
      `Owner: ${state.project.manager || 'Not set'}`,
      `Deadline: ${state.project.deadline || 'Not set'}`,
      '',
      `Total items: ${totals.total}`,
      `Approved: ${totals.approved}`,
      `Received: ${totals.received}`,
      `Missing required: ${totals.missingRequired}`,
      `Blocked: ${totals.blocked}`,
      '',
      'Open items:',
      ...state.items
        .filter((entry) => !['Received', 'Approved'].includes(entry.status))
        .map((entry) => `- ${entry.name} · status: ${entry.status} · priority: ${entry.priority} · owner: ${entry.owner || 'unassigned'}`)
    ];

    return lines.join('\n');
  }

  function buildFollowUpText(missingRequired, blocked, revision, criticalPending) {
    const client = state.project.clientName || 'there';
    const projectName = state.project.projectName ? ` for ${state.project.projectName}` : '';

    const lines = [
      `Hello ${client},`,
      '',
      `Quick follow-up regarding the content and access materials${projectName}.`,
      'To keep delivery on schedule, we still need the items below:',
      ''
    ];

    appendGroup(lines, 'Missing required items', missingRequired);
    appendGroup(lines, 'Blocked items', blocked);
    appendGroup(lines, 'Needs revision', revision);
    appendGroup(lines, 'Critical items pending approval', criticalPending);

    lines.push(
      '',
      'Timeline note: project progress and launch timing may depend on receiving or approving these materials.',
      'Thank you for your support and quick response.',
      '',
      'Best regards,'
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
    return ` · ${client || 'Client'}${project ? ` / ${project}` : ''}`;
  }

  function summarySection(groups) {
    const parts = groups
      .map(([title, entries]) => {
        if (!entries.length) return `<article><h3>${title}</h3><p>None currently.</p></article>`;
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
      announce('Nothing to copy yet.');
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
