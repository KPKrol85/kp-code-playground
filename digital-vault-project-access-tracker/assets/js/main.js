document.addEventListener('DOMContentLoaded', function () {
  const STORAGE = {
    statuses: 'kp_vault_access_statuses_v1',
    checkLaunch: 'kp_vault_check_launch_v1',
    checkHandoff: 'kp_vault_check_handoff_v1'
  };

  const categories = [
    'Domain provider', 'Hosting provider', 'DNS management', 'CMS / admin panel', 'Email hosting', 'FTP / SFTP',
    'Database panel', 'Git repository', 'Deployment platform', 'Analytics', 'Google Search Console',
    'Google Business Profile', 'Cookie consent tool', 'Newsletter / CRM', 'Payment provider',
    'CDN / security service', 'Design files', 'Stock assets / licenses', 'Social media accounts', 'Maintenance tools'
  ];

  const statusOptions = ['not needed', 'pending', 'received', 'verified', 'transferred', 'client-owned', 'needs review'];
  const body = document.getElementById('access-table-body');
  if (!body) return;

  const savedStatuses = safeRead(STORAGE.statuses, {});

  categories.forEach(function (category, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${category}</td>
      <td><span class="cell-placeholder">[Provider / narzędzie]</span></td>
      <td><span class="cell-placeholder">[Właściciel biznesowy]</span></td>
      <td>${buildSelect(index, 'access', savedStatuses, statusOptions)}</td>
      <td>${buildSelect(index, 'transfer', savedStatuses, statusOptions)}</td>
      <td>${buildSelect(index, 'twofa', savedStatuses, statusOptions)}</td>
      <td><span class="cell-placeholder">[E-mail odzyskiwania / procedura]</span></td>
      <td><span class="cell-placeholder">[Uwagi operacyjne i kolejne kroki]</span></td>`;
    body.appendChild(tr);
  });

  function buildSelect(index, type, store, options) {
    const key = `${index}_${type}`;
    const val = store[key] || 'pending';
    const opts = options.map((opt) => `<option value="${opt}" ${opt === val ? 'selected' : ''}>${opt}</option>`).join('');
    return `<label class="visually-hidden" for="${key}">Status ${type}</label><select id="${key}" class="status-select" data-key="${key}">${opts}</select>`;
  }

  function safeRead(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_e) { return fallback; }
  }

  function safeWrite(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function updateSummary() {
    const selects = Array.from(document.querySelectorAll('.status-select'));
    const values = selects.map((s) => s.value);
    setText('sum-total', categories.length);
    setText('sum-verified', values.filter((v) => v === 'verified').length);
    setText('sum-pending', values.filter((v) => v === 'pending').length);
    setText('sum-transferred', values.filter((v) => v === 'transferred' || v === 'client-owned').length);
    setText('sum-review', values.filter((v) => v === 'needs review').length);
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value);
  }

  document.addEventListener('change', function (event) {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement) || !target.classList.contains('status-select')) return;
    const current = safeRead(STORAGE.statuses, {});
    current[target.dataset.key] = target.value;
    safeWrite(STORAGE.statuses, current);
    updateSummary();
  });

  const launchItems = [
    'Własność domeny potwierdzona','Dostęp do hostingu potwierdzony','Ustawienia DNS udokumentowane','Dostęp CMS/admin zweryfikowany','Dostęp do analityki zweryfikowany','Search Console zweryfikowany','Dostęp do backupu zweryfikowany','Własność po stronie klienta potwierdzona','Nieaktualne konta usunięte','Zakres utrzymania potwierdzony'
  ];
  const handoffItems = [
    'Wszystkie wymagane punkty dostępu przejrzane','Klient otrzymał informacje o własności','Bezpieczny transfer danych wykonany poza dokumentem','Opcje 2FA/odzyskiwania przejrzane','Kontakt wsparcia potwierdzony','Plan utrzymania omówiony','Finalny przegląd dostępów zakończony'
  ];

  renderChecklist('launch-checklist', launchItems, STORAGE.checkLaunch);
  renderChecklist('handoff-checklist', handoffItems, STORAGE.checkHandoff);

  function renderChecklist(containerId, items, storageKey) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const saved = safeRead(storageKey, {});
    items.forEach((item, idx) => {
      const id = `${containerId}_${idx}`;
      const li = document.createElement('li');
      li.innerHTML = `<label><input type="checkbox" data-list="${storageKey}" data-id="${id}" ${saved[id] ? 'checked' : ''}/> <span>${item}</span></label>`;
      container.appendChild(li);
    });
  }

  document.addEventListener('change', function (event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox' || !target.dataset.list) return;
    const data = safeRead(target.dataset.list, {});
    data[target.dataset.id] = target.checked;
    safeWrite(target.dataset.list, data);
  });

  const printBtn = document.getElementById('print-document');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  const resetChecksBtn = document.getElementById('reset-checklists');
  if (resetChecksBtn) resetChecksBtn.addEventListener('click', function () {
    localStorage.removeItem(STORAGE.checkLaunch);
    localStorage.removeItem(STORAGE.checkHandoff);
    document.querySelectorAll('#launch-checklist input, #handoff-checklist input').forEach((cb) => { cb.checked = false; });
  });

  const resetStatusesBtn = document.getElementById('reset-statuses');
  if (resetStatusesBtn) resetStatusesBtn.addEventListener('click', function () {
    localStorage.removeItem(STORAGE.statuses);
    document.querySelectorAll('.status-select').forEach((s) => { s.value = 'pending'; });
    updateSummary();
  });

  updateSummary();
});
