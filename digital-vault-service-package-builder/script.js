const STORAGE_KEY = 'kp_digital_vault_service_package_builder_v1';

const DEFAULT_SETUP = {
  offerName: 'Pakiety strony firmowej 2026',
  serviceType: 'Strona firmowa',
  clientType: 'Mała firma usługowa / lokalny biznes',
  currency: 'PLN',
  offerGoal: 'Uruchomienie nowoczesnej strony wspierającej sprzedaż i wiarygodność marki',
  preparedBy: 'Twoje Studio Web',
  setupNote: 'Zakres został podzielony na 3 poziomy, aby ułatwić wybór tempa i skali wdrożenia.'
};

const DEFAULT_PACKAGES = [
  {
    id: crypto.randomUUID(),
    tier: 'Basic',
    name: 'Basic Start',
    shortDescription: 'Dla prostych stron i firm, które potrzebują szybkiej obecności online.',
    targetClient: 'Mała firma, która potrzebuje prostej strony wizytówkowej.',
    price: 3500,
    deliveryTime: '7–10 dni roboczych',
    scope: 'Projekt i wdrożenie prostej strony do 4 sekcji z formularzem kontaktowym.',
    included: ['Projekt strony głównej', 'Responsywne wdrożenie', 'Podstawowy formularz kontaktowy'],
    excluded: ['Zaawansowane integracje', 'Rozbudowany blog', 'Strategia SEO rozszerzona'],
    clientResponsibilities: 'Dostarczenie logo, treści, zdjęć i akceptacji etapów w ciągu 48h.',
    revisions: '1 runda poprawek',
    supportPeriod: '7 dni wsparcia po publikacji',
    addOns: ['Dodatkowa podstrona', 'Przygotowanie tekstów'],
    nextStep: 'Krótki call (20 min) i potwierdzenie zakresu.',
    status: 'Do przeglądu',
    isRecommended: false
  },
  {
    id: crypto.randomUUID(),
    tier: 'Standard',
    name: 'Standard Growth',
    shortDescription: 'Najbardziej zbalansowany pakiet dla typowej strony firmowej.',
    targetClient: 'Firma usługowa, która chce czytelnej struktury i dobrego startu SEO.',
    price: 6200,
    deliveryTime: '12–16 dni roboczych',
    scope: 'Projekt i wdrożenie strony do 7 sekcji wraz z dopracowaniem UX i SEO starter.',
    included: ['Architektura treści', 'Responsywne wdrożenie', 'SEO starter (meta, nagłówki, struktura)', 'Konfiguracja analityki'],
    excluded: ['Zaawansowany sklep', 'Dedykowane integracje API'],
    clientResponsibilities: 'Terminowe akceptacje, materiały brandingowe i komplet treści.',
    revisions: '2 rundy poprawek',
    supportPeriod: '14 dni wsparcia po publikacji',
    addOns: ['Integracja z newsletterem', 'Podstawowy audyt SEO'],
    nextStep: 'Warsztat zakresu i harmonogram wdrożenia.',
    status: 'Gotowy do oferty',
    isRecommended: true
  },
  {
    id: crypto.randomUUID(),
    tier: 'Premium',
    name: 'Premium Authority',
    shortDescription: 'Dla marek, które chcą mocniejszej obecności i większego dopracowania.',
    targetClient: 'Firma rozwijająca sprzedaż i potrzebująca rozbudowanej strony premium.',
    price: 9800,
    deliveryTime: '18–25 dni roboczych',
    scope: 'Rozszerzony proces od strategii do wdrożenia strony z naciskiem na konwersję.',
    included: ['Warsztat strategiczny', 'Rozbudowany projekt UI', 'Wdrożenie do 10 sekcji', 'Priorytetowe wsparcie startowe'],
    excluded: ['Stała opieka miesięczna', 'Produkcja video'],
    clientResponsibilities: 'Udział decyzyjny po stronie klienta i szybkie dostarczanie feedbacku.',
    revisions: '3 rundy poprawek',
    supportPeriod: '30 dni wsparcia po publikacji',
    addOns: ['Dodatkowa runda poprawek', 'Podstawowe szkolenie z obsługi'],
    nextStep: 'Spotkanie kickoff + plan produkcji treści.',
    status: 'Szkic',
    isRecommended: false
  }
];

const DEFAULT_ADDONS = [
  { id: crypto.randomUUID(), name: 'Dodatkowa podstrona', price: 450, description: 'Projekt i wdrożenie jednej dodatkowej podstrony.' },
  { id: crypto.randomUUID(), name: 'Dodatkowa runda poprawek', price: 350, description: 'Jedna dodatkowa runda poprawek po wykorzystaniu limitu.' },
  { id: crypto.randomUUID(), name: 'Konfiguracja Google Analytics / Search Console', price: 300, description: 'Podstawowa konfiguracja i weryfikacja narzędzi.' },
  { id: crypto.randomUUID(), name: 'Podstawowy audyt SEO', price: 600, description: 'Przegląd kluczowych elementów on-site z rekomendacjami.' },
  { id: crypto.randomUUID(), name: 'Formularz kontaktowy', price: 250, description: 'Rozszerzony formularz wraz z konfiguracją wysyłki.' },
  { id: crypto.randomUUID(), name: 'Integracja z newsletterem', price: 400, description: 'Podłączenie formularza do wybranego narzędzia mailingowego.' },
  { id: crypto.randomUUID(), name: 'Dodatkowa sekcja landing page', price: 500, description: 'Projekt i wdrożenie dodatkowej sekcji konwersyjnej.' },
  { id: crypto.randomUUID(), name: 'Przygotowanie tekstów', price: 900, description: 'Edycja i przygotowanie treści pod stronę firmową.' },
  { id: crypto.randomUUID(), name: 'Optymalizacja obrazów', price: 300, description: 'Kompresja i przygotowanie grafik do publikacji.' },
  { id: crypto.randomUUID(), name: 'Podstawowe szkolenie z obsługi', price: 450, description: 'Krótki instruktaż + notatka dla zespołu klienta.' }
];

let state = loadState();

const el = {
  setupForm: document.querySelector('#offer-setup-form'),
  offerSummaryList: document.querySelector('#offer-summary-list'),
  packagesContainer: document.querySelector('#packages-container'),
  recommendedInfo: document.querySelector('#recommended-info'),
  addonsTableBody: document.querySelector('#addons-table-body'),
  comparisonView: document.querySelector('#comparison-view'),
  qualityChecklist: document.querySelector('#quality-checklist'),
  checklistProgress: document.querySelector('#checklist-progress'),
  readinessPercent: document.querySelector('#readiness-percent'),
  readinessStatus: document.querySelector('#readiness-status'),
  offerOutput: document.querySelector('#offer-output'),
  comparisonOutput: document.querySelector('#comparison-output'),
  scopeOutput: document.querySelector('#scope-output'),
  internalOutput: document.querySelector('#internal-output'),
  copyFeedback: document.querySelector('#copy-feedback'),
  setupFeedback: document.querySelector('#setup-feedback'),
  addonFeedback: document.querySelector('#addon-feedback')
};

const setupFields = ['offerName', 'serviceType', 'clientType', 'currency', 'offerGoal', 'preparedBy', 'setupNote'];

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState();
    const parsed = JSON.parse(stored);
    if (!parsed?.setup || !Array.isArray(parsed?.packages) || !Array.isArray(parsed?.addons)) return defaultState();
    return parsed;
  } catch {
    return defaultState();
  }
}

function defaultState() {
  return {
    setup: structuredClone(DEFAULT_SETUP),
    packages: structuredClone(DEFAULT_PACKAGES),
    addons: structuredClone(DEFAULT_ADDONS)
  };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // aplikacja działa poprawnie bez zapisu
  }
}

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatPrice(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return '—';
  return new Intl.NumberFormat('pl-PL').format(num);
}

function resetAll() {
  state = defaultState();
  renderAll();
  el.setupFeedback.textContent = 'Przywrócono domyślne ustawienia generatora.';
}

function renderSetupForm() {
  setupFields.forEach((key) => {
    if (el.setupForm.elements[key]) el.setupForm.elements[key].value = state.setup[key] ?? '';
  });

  const summaryMap = [
    ['Nazwa oferty', state.setup.offerName],
    ['Typ usługi', state.setup.serviceType],
    ['Typ klienta', state.setup.clientType],
    ['Waluta', state.setup.currency],
    ['Cel oferty', state.setup.offerGoal],
    ['Przygotował(a)', state.setup.preparedBy],
    ['Notatka', state.setup.setupNote]
  ];

  el.offerSummaryList.innerHTML = summaryMap
    .map(([label, value]) => `<dt>${label}</dt><dd>${escapeHtml(value?.trim() || '—')}</dd>`)
    .join('');
}

function packageField(name, label, value, type = 'text') {
  if (type === 'textarea') {
    return `<label class="field"><span>${label}</span><textarea name="${name}" rows="2">${escapeHtml(value || '')}</textarea></label>`;
  }
  if (type === 'number') {
    return `<label class="field"><span>${label}</span><input name="${name}" type="number" min="0" step="50" value="${Number(value) || 0}" /></label>`;
  }
  if (type === 'select-status') {
    const statuses = ['Szkic', 'Do przeglądu', 'Gotowy do oferty', 'Wymaga doprecyzowania'];
    return `<label class="field"><span>${label}</span><select name="${name}">${statuses
      .map((status) => `<option ${status === value ? 'selected' : ''}>${status}</option>`)
      .join('')}</select></label>`;
  }
  return `<label class="field"><span>${label}</span><input name="${name}" type="text" value="${escapeHtml(value || '')}" /></label>`;
}

function renderTags(items, kind, packageId) {
  if (!items.length) return '<p class="inline-status">Brak pozycji.</p>';
  return `<div class="tag-list">${items
    .map(
      (item, index) =>
        `<span class="tag-item">${escapeHtml(item)} <button type="button" aria-label="Usuń pozycję" data-action="remove-list-item" data-kind="${kind}" data-index="${index}" data-package-id="${packageId}">×</button></span>`
    )
    .join('')}</div>`;
}

function renderPackages() {
  el.packagesContainer.innerHTML = state.packages
    .map((pkg) => {
      const recommendedText = pkg.isRecommended ? 'Rekomendowany' : 'Nie-rekomendowany';
      return `
      <article class="package-card ${pkg.isRecommended ? 'recommended' : ''}" data-package-id="${pkg.id}">
        <div class="package-top">
          <span class="package-badge">${pkg.tier} · ${recommendedText}</span>
          <div class="package-actions">
            <button class="btn btn-secondary" type="button" data-action="toggle-recommended" data-package-id="${pkg.id}">Poleć</button>
            <button class="btn btn-secondary" type="button" data-action="duplicate-package" data-package-id="${pkg.id}">Duplikuj</button>
            <button class="btn btn-secondary" type="button" data-action="reset-package" data-package-id="${pkg.id}">Reset</button>
          </div>
        </div>
        <div class="form-grid">
          ${packageField('name', 'Nazwa pakietu', pkg.name)}
          ${packageField('status', 'Status pakietu', pkg.status, 'select-status')}
          ${packageField('targetClient', 'Dla kogo', pkg.targetClient)}
          ${packageField('price', 'Cena', pkg.price, 'number')}
          ${packageField('deliveryTime', 'Czas realizacji', pkg.deliveryTime)}
          ${packageField('revisions', 'Liczba rund poprawek', pkg.revisions)}
          ${packageField('supportPeriod', 'Okres wsparcia po realizacji', pkg.supportPeriod)}
          <div class="field field--full">${packageField('shortDescription', 'Krótki opis', pkg.shortDescription, 'textarea')}</div>
          <div class="field field--full">${packageField('scope', 'Zakres prac', pkg.scope, 'textarea')}</div>
          <div class="field field--full">${packageField('clientResponsibilities', 'Obowiązki klienta', pkg.clientResponsibilities, 'textarea')}</div>
          <div class="field field--full">${packageField('nextStep', 'Rekomendowany następny krok', pkg.nextStep, 'textarea')}</div>
        </div>

        <fieldset class="fieldset-group">
          <legend>Co zawiera</legend>
          ${renderTags(pkg.included, 'included', pkg.id)}
          <div class="add-inline">
            <input type="text" data-input-kind="included" data-package-id="${pkg.id}" placeholder="Dodaj element zawarty" />
            <button class="btn btn-secondary" type="button" data-action="add-list-item" data-kind="included" data-package-id="${pkg.id}">Dodaj</button>
          </div>
        </fieldset>

        <fieldset class="fieldset-group">
          <legend>Czego nie zawiera</legend>
          ${renderTags(pkg.excluded, 'excluded', pkg.id)}
          <div class="add-inline">
            <input type="text" data-input-kind="excluded" data-package-id="${pkg.id}" placeholder="Dodaj wykluczenie" />
            <button class="btn btn-secondary" type="button" data-action="add-list-item" data-kind="excluded" data-package-id="${pkg.id}">Dodaj</button>
          </div>
        </fieldset>

        <fieldset class="fieldset-group">
          <legend>Opcjonalne add-ons dla pakietu</legend>
          ${renderTags(pkg.addOns, 'addOns', pkg.id)}
          <div class="add-inline">
            <input type="text" data-input-kind="addOns" data-package-id="${pkg.id}" placeholder="Dodaj add-on" />
            <button class="btn btn-secondary" type="button" data-action="add-list-item" data-kind="addOns" data-package-id="${pkg.id}">Dodaj</button>
          </div>
        </fieldset>
      </article>`;
    })
    .join('');

  const recommended = state.packages.find((pkg) => pkg.isRecommended);
  el.recommendedInfo.textContent = `Pakiet rekomendowany: ${recommended ? recommended.name : 'brak'}`;
}

function renderAddons() {
  el.addonsTableBody.innerHTML = state.addons
    .map(
      (addon) => `<tr>
      <td data-label="Dodatek"><input data-addon-id="${addon.id}" data-addon-field="name" value="${escapeHtml(addon.name)}" /></td>
      <td data-label="Cena"><input data-addon-id="${addon.id}" data-addon-field="price" type="number" min="0" step="50" value="${Number(addon.price) || 0}" /></td>
      <td data-label="Opis"><input data-addon-id="${addon.id}" data-addon-field="description" value="${escapeHtml(addon.description)}" /></td>
      <td data-label="Akcja"><button class="btn btn-secondary" type="button" data-action="remove-addon" data-addon-id="${addon.id}">Usuń</button></td>
    </tr>`
    )
    .join('');
}

function renderComparison() {
  el.comparisonView.innerHTML = state.packages
    .map((pkg) => {
      const includedShort = pkg.included.slice(0, 3).join(', ') || '—';
      const excludedShort = pkg.excluded.slice(0, 2).join(', ') || '—';
      return `<article class="comparison-card">
        <h3>${escapeHtml(pkg.name)}</h3>
        <p><strong>Cena:</strong> ${formatPrice(pkg.price)} ${state.setup.currency}</p>
        <ul>
          <li><strong>Dla kogo:</strong> ${escapeHtml(pkg.targetClient || '—')}</li>
          <li><strong>Czas:</strong> ${escapeHtml(pkg.deliveryTime || '—')}</li>
          <li><strong>Poprawki:</strong> ${escapeHtml(pkg.revisions || '—')}</li>
          <li><strong>Wsparcie:</strong> ${escapeHtml(pkg.supportPeriod || '—')}</li>
          <li><strong>Najważniejsze w pakiecie:</strong> ${escapeHtml(includedShort)}</li>
          <li><strong>Wykluczenia:</strong> ${escapeHtml(excludedShort)}</li>
        </ul>
        <span class="recommended-line">${pkg.isRecommended ? '✓ Pakiet rekomendowany' : '• Pakiet alternatywny'}</span>
      </article>`;
    })
    .join('');
}

function evaluateChecklist() {
  const recommendedCount = state.packages.filter((pkg) => pkg.isRecommended).length;
  const checks = [
    { label: 'Każdy pakiet ma określony typ klienta', pass: state.packages.every((pkg) => pkg.targetClient.trim()) },
    { label: 'Każdy pakiet ma cenę', pass: state.packages.every((pkg) => Number(pkg.price) > 0) },
    { label: 'Każdy pakiet ma czas realizacji', pass: state.packages.every((pkg) => pkg.deliveryTime.trim()) },
    { label: 'Każdy pakiet definiuje „co zawiera”', pass: state.packages.every((pkg) => pkg.included.length > 0) },
    { label: 'Każdy pakiet definiuje „czego nie zawiera”', pass: state.packages.every((pkg) => pkg.excluded.length > 0) },
    { label: 'Każdy pakiet ma limit poprawek', pass: state.packages.every((pkg) => pkg.revisions.trim()) },
    { label: 'Dokładnie jeden pakiet jest rekomendowany', pass: recommendedCount === 1 },
    { label: 'Oferta ma wybrany typ usługi', pass: Boolean(state.setup.serviceType.trim()) },
    { label: 'Obowiązki klienta są opisane', pass: state.packages.every((pkg) => pkg.clientResponsibilities.trim()) },
    { label: 'Dodatki są oddzielone od zakresu bazowego', pass: state.packages.every((pkg) => pkg.addOns.length > 0) && state.addons.length > 0 }
  ];

  const passed = checks.filter((item) => item.pass).length;
  const percent = Math.round((passed / checks.length) * 100);

  el.qualityChecklist.innerHTML = checks
    .map((item) => `<li><span class="${item.pass ? 'ok' : 'warn'}" aria-hidden="true">${item.pass ? '✔' : '⚠'}</span><span>${item.label}</span></li>`)
    .join('');

  el.checklistProgress.textContent = `${passed} / ${checks.length}`;
  el.readinessPercent.textContent = `${percent}%`;

  let status = 'Szkic roboczy';
  if (percent >= 95) status = 'Gotowe do wysłania klientowi';
  else if (percent >= 75) status = 'Prawie gotowe';
  else if (percent >= 45) status = 'Wymaga doprecyzowania';

  el.readinessStatus.textContent = status;

  return { percent, status, passed, total: checks.length };
}

function buildOutputs(readiness) {
  const recommended = state.packages.find((pkg) => pkg.isRecommended);

  const intro = `Cześć,\n\nPoniżej przesyłam uporządkowaną propozycję pakietów dla: ${state.setup.offerName || 'Twojej usługi'}.`;
  const header = `Typ usługi: ${state.setup.serviceType || '—'}\nCel oferty: ${state.setup.offerGoal || '—'}\nTyp klienta: ${state.setup.clientType || '—'}`;
  const packageOverview = state.packages
    .map(
      (pkg) =>
        `- ${pkg.name} (${formatPrice(pkg.price)} ${state.setup.currency}, ${pkg.deliveryTime})\n  Dla kogo: ${pkg.targetClient || '—'}\n  Zakres: ${pkg.scope || '—'}\n  Status: ${pkg.status}`
    )
    .join('\n');

  const recommendedLine = `Pakiet rekomendowany w tym przypadku to: ${recommended ? `${recommended.name} — ${recommended.shortDescription}` : 'nie wskazano jeszcze pakietu rekomendowanego.'}`;
  const nextStep = `Rekomendowany kolejny krok: ${recommended?.nextStep || 'krótki call doprecyzowujący oczekiwania i harmonogram.'}`;

  el.offerOutput.value = `${intro}\n\n${header}\n\nPakiety:\n${packageOverview}\n\n${recommendedLine}\n${nextStep}\n\nZakres każdego pakietu został opisany tak, aby łatwiej było porównać opcje.\nPozdrawiam,\n${state.setup.preparedBy || 'Zespół realizacyjny'}`;

  el.comparisonOutput.value = state.packages
    .map(
      (pkg) =>
        `${pkg.tier.toUpperCase()} | ${pkg.name}\nCena: ${formatPrice(pkg.price)} ${state.setup.currency}\nDla kogo: ${pkg.targetClient || '—'}\nCzas realizacji: ${pkg.deliveryTime || '—'}\nPoprawki: ${pkg.revisions || '—'}\nWsparcie: ${pkg.supportPeriod || '—'}\nCo zawiera: ${pkg.included.join(', ') || '—'}\nCzego nie zawiera: ${pkg.excluded.join(', ') || '—'}\n${pkg.isRecommended ? 'REKOMENDOWANY' : 'Alternatywa'}\n`
    )
    .join('\n');

  el.scopeOutput.value = `Zakres bazowy każdego pakietu obejmuje tylko elementy wskazane w sekcji „Co zawiera”.\nPozycje opisane jako „Czego nie zawiera” nie są częścią wyceny podstawowej.\nPrace wykraczające poza opisany zakres możemy potraktować jako dodatki (add-ons) lub osobną wycenę.\nDzięki temu oferta pozostaje czytelna, a decyzje budżetowe są transparentne.`;

  const weakPackages = state.packages.filter((pkg) => !pkg.targetClient.trim() || !pkg.deliveryTime.trim() || !pkg.excluded.length).map((pkg) => pkg.name);
  el.internalOutput.value = `Notatka wewnętrzna — przegląd oferty\nGotowość: ${readiness.status} (${readiness.percent}%, ${readiness.passed}/${readiness.total})\nTyp usługi: ${state.setup.serviceType || 'brak'}\nPakiet rekomendowany: ${recommended?.name || 'brak'}\nPakiety wymagające dopracowania: ${weakPackages.length ? weakPackages.join(', ') : 'brak'}\nUwaga: przed wysyłką sprawdź spójność wykluczeń, limity poprawek i listę dodatków.`;
}

function renderAll() {
  renderSetupForm();
  renderPackages();
  renderAddons();
  renderComparison();
  const readiness = evaluateChecklist();
  buildOutputs(readiness);
  saveState();
}

function duplicatePackage(packageId) {
  const source = state.packages.find((pkg) => pkg.id === packageId);
  if (!source) return;
  const clone = structuredClone(source);
  clone.id = crypto.randomUUID();
  clone.tier = `${source.tier}+`;
  clone.name = `${source.name} (kopia)`;
  clone.isRecommended = false;
  state.packages.push(clone);
}

function resetPackage(packageId) {
  const idx = state.packages.findIndex((pkg) => pkg.id === packageId);
  if (idx === -1) return;
  const currentTier = state.packages[idx].tier;
  const fallback = DEFAULT_PACKAGES.find((pkg) => pkg.tier === currentTier.replace('+', ''));
  if (fallback) {
    state.packages[idx] = { ...structuredClone(fallback), id: packageId, tier: currentTier, isRecommended: false };
  }
}

function setRecommended(packageId) {
  state.packages.forEach((pkg) => {
    pkg.isRecommended = pkg.id === packageId;
  });
}

function withPackage(packageId, handler) {
  const pkg = state.packages.find((item) => item.id === packageId);
  if (!pkg) return;
  handler(pkg);
}

function handleSetupEvents() {
  el.setupForm.addEventListener('input', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) return;
    if (!setupFields.includes(target.name)) return;
    state.setup[target.name] = target.value;
    renderAll();
  });

  document.querySelector('#reset-all').addEventListener('click', resetAll);
}

function handlePackageEvents() {
  el.packagesContainer.addEventListener('input', (event) => {
    const target = event.target;
    const card = target.closest('[data-package-id]');
    if (!card || !(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) return;

    const packageId = card.dataset.packageId;
    withPackage(packageId, (pkg) => {
      const key = target.name;
      if (!key) return;
      pkg[key] = key === 'price' ? Number(target.value) || 0 : target.value;
      if (key === 'name' && !pkg.name.trim()) {
        pkg.name = `${pkg.tier} Pakiet`;
      }
    });
    renderAll();
  });

  el.packagesContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    const action = target.dataset.action;
    const packageId = target.dataset.packageId;

    if (action === 'toggle-recommended' && packageId) {
      setRecommended(packageId);
    }

    if (action === 'duplicate-package' && packageId) {
      duplicatePackage(packageId);
    }

    if (action === 'reset-package' && packageId) {
      resetPackage(packageId);
    }

    if (action === 'add-list-item' && packageId) {
      const kind = target.dataset.kind;
      const input = el.packagesContainer.querySelector(`input[data-input-kind="${kind}"][data-package-id="${packageId}"]`);
      if (!input || !kind) return;
      const value = input.value.trim();
      if (!value) return;
      withPackage(packageId, (pkg) => {
        pkg[kind].push(value);
      });
      input.value = '';
    }

    if (action === 'remove-list-item' && packageId) {
      const kind = target.dataset.kind;
      const index = Number(target.dataset.index);
      if (!kind || Number.isNaN(index)) return;
      withPackage(packageId, (pkg) => {
        pkg[kind].splice(index, 1);
      });
    }

    renderAll();
  });
}

function handleAddonsEvents() {
  document.querySelector('#add-addon').addEventListener('click', () => {
    const name = document.querySelector('#addonName').value.trim();
    const price = Number(document.querySelector('#addonPrice').value);
    const description = document.querySelector('#addonDescription').value.trim();

    if (!name) {
      el.addonFeedback.textContent = 'Nazwa dodatku nie może być pusta.';
      return;
    }

    state.addons.push({ id: crypto.randomUUID(), name, price: Number.isFinite(price) ? price : 0, description });

    document.querySelector('#addonName').value = '';
    document.querySelector('#addonPrice').value = '';
    document.querySelector('#addonDescription').value = '';
    el.addonFeedback.textContent = 'Dodatek został dodany.';
    renderAll();
  });

  el.addonsTableBody.addEventListener('input', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    const addonId = target.dataset.addonId;
    const field = target.dataset.addonField;
    const addon = state.addons.find((item) => item.id === addonId);
    if (!addon) return;

    addon[field] = field === 'price' ? Number(target.value) || 0 : target.value;
    if (field === 'name' && !addon.name.trim()) addon.name = 'Nowy dodatek';
    renderAll();
  });

  el.addonsTableBody.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    if (target.dataset.action !== 'remove-addon') return;
    const addonId = target.dataset.addonId;
    state.addons = state.addons.filter((item) => item.id !== addonId);
    renderAll();
  });
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const fallback = document.createElement('textarea');
  fallback.value = text;
  fallback.style.position = 'fixed';
  fallback.style.opacity = '0';
  document.body.append(fallback);
  fallback.focus();
  fallback.select();
  const copied = document.execCommand('copy');
  fallback.remove();
  return copied;
}

function handleCopyEvents() {
  document.querySelector('#outputs-title').closest('.panel').addEventListener('click', async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    const fieldId = target.dataset.copyTarget;
    if (!fieldId) return;
    const source = document.getElementById(fieldId);
    if (!(source instanceof HTMLTextAreaElement)) return;

    try {
      await copyText(source.value);
      el.copyFeedback.textContent = 'Treść skopiowana do schowka.';
    } catch {
      el.copyFeedback.textContent = 'Nie udało się skopiować automatycznie. Zaznacz tekst i skopiuj ręcznie.';
    }
  });
}

handleSetupEvents();
handlePackageEvents();
handleAddonsEvents();
handleCopyEvents();
renderAll();
