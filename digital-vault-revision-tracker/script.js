(() => {
  const form = document.getElementById('revision-form');
  const tableBody = document.getElementById('revision-table-body');
  const feedback = document.getElementById('form-feedback');

  const summary = {
    total: document.getElementById('total-requests'),
    inScope: document.getElementById('in-scope-count'),
    outScope: document.getElementById('out-scope-count'),
    clarification: document.getElementById('clarification-count'),
    urgent: document.getElementById('urgent-count'),
    costTotal: document.getElementById('additional-cost-total')
  };

  if (!form || !tableBody) {
    return;
  }

  const entries = [];

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);

  const sanitizeText = (value) => value.trim();

  const resetEmptyState = () => {
    if (entries.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-state">No revision requests added yet.</td>
        </tr>
      `;
    }
  };

  const updateSummary = () => {
    const totals = entries.reduce(
      (acc, entry) => {
        acc.total += 1;
        if (entry.inScope === 'yes') acc.inScope += 1;
        if (entry.inScope === 'no') acc.outScope += 1;
        if (entry.inScope === 'needs clarification') acc.clarification += 1;
        if (entry.priority === 'urgent') acc.urgent += 1;
        acc.costTotal += entry.additionalCost;
        return acc;
      },
      {
        total: 0,
        inScope: 0,
        outScope: 0,
        clarification: 0,
        urgent: 0,
        costTotal: 0
      }
    );

    summary.total.textContent = String(totals.total);
    summary.inScope.textContent = String(totals.inScope);
    summary.outScope.textContent = String(totals.outScope);
    summary.clarification.textContent = String(totals.clarification);
    summary.urgent.textContent = String(totals.urgent);
    summary.costTotal.textContent = formatCurrency(totals.costTotal);
  };

  const renderTable = () => {
    tableBody.innerHTML = '';

    entries.forEach((entry, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.request}</td>
        <td>${entry.date}</td>
        <td>${entry.status}</td>
        <td>${entry.inScope}</td>
        <td>${entry.priority}</td>
        <td>${entry.response || '—'}</td>
        <td>${formatCurrency(entry.additionalCost)}</td>
        <td><button type="button" class="remove-btn" data-index="${index}" aria-label="Remove revision ${index + 1}">Remove</button></td>
      `;

      tableBody.appendChild(row);
    });

    resetEmptyState();
    updateSummary();
  };

  const parseAndValidate = (formData) => {
    const request = sanitizeText(formData.get('request') || '');
    const date = sanitizeText(formData.get('date') || '');
    const status = sanitizeText(formData.get('status') || '');
    const inScope = sanitizeText(formData.get('inScope') || '');
    const priority = sanitizeText(formData.get('priority') || '');
    const response = sanitizeText(formData.get('response') || '');
    const additionalCostRaw = sanitizeText(formData.get('additionalCost') || '0');
    const additionalCost = Number.parseFloat(additionalCostRaw);

    if (!request || !date || !status || !inScope || !priority) {
      return { error: 'Please complete all required fields.' };
    }

    if (Number.isNaN(additionalCost) || additionalCost < 0) {
      return { error: 'Additional cost must be a non-negative number.' };
    }

    return {
      data: {
        request,
        date,
        status,
        inScope,
        priority,
        response,
        additionalCost
      }
    };
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    feedback.textContent = '';

    const formData = new FormData(form);
    const { data, error } = parseAndValidate(formData);

    if (error) {
      feedback.textContent = error;
      return;
    }

    entries.push(data);
    renderTable();
    form.reset();
    document.getElementById('status').value = 'new';
    document.getElementById('in-scope').value = 'yes';
    document.getElementById('priority').value = 'low';
    document.getElementById('additional-cost').value = '0';
    feedback.textContent = 'Revision request added.';
  });

  form.addEventListener('reset', () => {
    feedback.textContent = '';
    window.setTimeout(() => {
      document.getElementById('status').value = 'new';
      document.getElementById('in-scope').value = 'yes';
      document.getElementById('priority').value = 'low';
      document.getElementById('additional-cost').value = '0';
    }, 0);
  });

  tableBody.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches('.remove-btn')) {
      const { index } = target.dataset;
      const indexNumber = Number(index);
      if (!Number.isInteger(indexNumber)) return;
      entries.splice(indexNumber, 1);
      renderTable();
    }
  });

  updateSummary();
})();
