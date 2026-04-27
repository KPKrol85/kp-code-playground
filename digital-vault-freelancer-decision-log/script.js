const STORAGE_KEY = 'kp_digital_vault_decision_log_v1';

const CATEGORIES = [
  'Layout / struktura strony',
  'UI / interakcje',
  'Technologia',
  'CSS / architektura',
  'JavaScript',
  'SEO',
  'Dostępność',
  'Wydajność',
  'Treść / copywriting',
  'Zakres projektu',
  'Wdrożenie',
  'Utrzymanie',
  'Decyzja klienta'
];

const STAGES = ['Strategia', 'Projektowanie', 'Development', 'Testy', 'Wdrożenie', 'Utrzymanie', 'Po wdrożeniu'];
const STATUSES = ['Szkic', 'Do omówienia', 'Zatwierdzona', 'Wdrożona', 'Do przeglądu', 'Zmieniona', 'Odrzucona'];
const IMPACT_AREAS = ['UX', 'SEO', 'Dostępność', 'Wydajność', 'Utrzymanie', 'Zakres', 'Koszt / czas', 'Wdrożenie'];

const defaultDecisions = [
  {
    id: 'd1', title: 'Wybór statycznej architektury HTML/CSS/JS', category: 'Technologia', stage: 'Strategia', date: '2026-03-12',
    status: 'Zatwierdzona', owner: 'Lead Developer', approvedBy: 'Klient + Tech Lead',
    summary: 'Projekt realizujemy bez ciężkiego frameworka, aby skrócić czas wdrożenia i uprościć utrzymanie.',
    reasoning: 'Zakres funkcjonalny nie wymaga SPA, a zespół potrzebuje szybkiego i stabilnego startu.',
    alternatives: 'Rozważano Next.js oraz WordPress z builderem.',
    tradeOffs: 'Mniej gotowych komponentów i automatyzacji, ale prostszy kod i mniejszy koszt utrzymania.',
    riskAddressed: 'Ryzyko przekroczenia budżetu i opóźnień na starcie projektu.',
    impact: 'Szybsza realizacja MVP i łatwiejszy onboarding kolejnych wykonawców.',
    reviewDate: '2026-06-15', tags: ['architektura', 'mvp', 'utrzymanie'], impactAreas: ['UX', 'Wydajność', 'Koszt / czas'],
    important: true, clientFacing: true, caseStudy: true, custom: false
  },
  {
    id: 'd2', title: 'Mobile-first w całym CSS', category: 'CSS / architektura', stage: 'Projektowanie', date: '2026-03-15',
    status: 'Wdrożona', owner: 'Frontend Developer', approvedBy: 'Projektant UX',
    summary: 'Layout i komponenty są projektowane od najmniejszych ekranów.',
    reasoning: 'Większość ruchu klienta pochodzi z urządzeń mobilnych.',
    alternatives: 'Desktop-first z późniejszym dopasowaniem.',
    tradeOffs: 'Większa dyscyplina w planowaniu komponentów, ale lepsza jakość na mobile.',
    riskAddressed: 'Ryzyko słabej konwersji na telefonach.',
    impact: 'Lepsza użyteczność i stabilniejsza baza CSS.', reviewDate: '', tags: ['mobile-first', 'css'], impactAreas: ['UX', 'Wydajność'],
    important: true, clientFacing: false, caseStudy: true, custom: false
  },
  {
    id: 'd3', title: 'Podział sekcji usług na krótkie bloki z CTA', category: 'Layout / struktura strony', stage: 'Projektowanie', date: '2026-03-21',
    status: 'Zatwierdzona', owner: 'UX Designer', approvedBy: 'Klient',
    summary: 'Sekcja usług została podzielona na moduły, aby poprawić skanowanie treści.',
    reasoning: 'Długi blok tekstu utrudniał szybkie zrozumienie oferty.',
    alternatives: 'Jedna długa sekcja opisowa bez podziału.',
    tradeOffs: 'Więcej elementów do utrzymania, ale wyraźnie lepsza czytelność.',
    riskAddressed: 'Ryzyko porzucenia strony przez użytkownika na etapie zapoznania.',
    impact: 'Lepsza orientacja użytkownika i czytelniejsza oferta.', reviewDate: '', tags: ['layout', 'konwersja'], impactAreas: ['UX', 'Zakres'],
    important: false, clientFacing: true, caseStudy: true, custom: false
  },
  {
    id: 'd4', title: 'Prosty formularz kontaktowy bez zbędnych pól', category: 'UI / interakcje', stage: 'Development', date: '2026-03-26',
    status: 'Wdrożona', owner: 'Frontend Developer', approvedBy: 'Klient',
    summary: 'Formularz ograniczony do kluczowych danych: imię, email, wiadomość.',
    reasoning: 'Mniej pól zwiększa szansę wysłania formularza.',
    alternatives: 'Rozbudowany formularz z prekwalifikacją leadów.',
    tradeOffs: 'Mniej danych na starcie rozmowy, ale wyższa konwersja.',
    riskAddressed: 'Ryzyko niskiej liczby zapytań.',
    impact: 'Szybszy kontakt użytkownika z firmą.', reviewDate: '2026-07-01', tags: ['formularz', 'lead'], impactAreas: ['UX', 'Koszt / czas'],
    important: true, clientFacing: true, caseStudy: false, custom: false
  },
  {
    id: 'd5', title: 'Podstawowa warstwa SEO i metadata na każdej podstronie', category: 'SEO', stage: 'Development', date: '2026-03-29',
    status: 'Wdrożona', owner: 'SEO Specialist', approvedBy: 'Project Manager',
    summary: 'Każda strona otrzymuje dedykowany title, description i nagłówki H1-H2.',
    reasoning: 'To minimalny standard dla indeksacji i jakości ruchu organicznego.',
    alternatives: 'Dodanie SEO dopiero po wdrożeniu.',
    tradeOffs: 'Więcej pracy redakcyjnej na etapie developmentu, ale lepszy start SEO.',
    riskAddressed: 'Ryzyko słabej widoczności po publikacji strony.',
    impact: 'Lepsza gotowość strony do działań contentowych i marketingowych.', reviewDate: '2026-08-10', tags: ['seo', 'metadata'], impactAreas: ['SEO', 'Zakres'],
    important: true, clientFacing: true, caseStudy: true, custom: false
  },
  {
    id: 'd6', title: 'Ograniczenie animacji i efektów wizualnych', category: 'Wydajność', stage: 'Testy', date: '2026-04-03',
    status: 'Do omówienia', owner: 'Frontend Developer', approvedBy: 'Do decyzji klienta',
    summary: 'Animacje będą stosowane oszczędnie, głównie przy elementach kluczowych.',
    reasoning: 'Wyniki wydajności spadały na słabszych urządzeniach.',
    alternatives: 'Szerokie użycie animacji i przejść na każdej sekcji.',
    tradeOffs: 'Mniej efektowny wygląd, ale stabilniejsza wydajność i czytelność.',
    riskAddressed: 'Ryzyko spadku Core Web Vitals i frustracji użytkowników.',
    impact: 'Wyższa stabilność działania strony.', reviewDate: '2026-05-20', tags: ['performance', 'cwv'], impactAreas: ['Wydajność', 'UX'],
    important: true, clientFacing: true, caseStudy: false, custom: false
  },
  {
    id: 'd7', title: 'Widoczne stany focus i kontrast dla dostępności', category: 'Dostępność', stage: 'Development', date: '2026-04-07',
    status: 'Wdrożona', owner: 'Frontend Developer', approvedBy: 'QA',
    summary: 'Dodano czytelne focus ring oraz weryfikację kontrastu kluczowych elementów.',
    reasoning: 'Nawigacja klawiaturą musi działać poprawnie i przewidywalnie.',
    alternatives: 'Domyślne style przeglądarki bez kontroli wizualnej.',
    tradeOffs: 'Mniej minimalistyczny wygląd komponentów, ale lepsza dostępność.',
    riskAddressed: 'Ryzyko wykluczenia części użytkowników i problemów zgodności.',
    impact: 'Lepsze doświadczenie dla użytkowników klawiatury i czytników.', reviewDate: '', tags: ['a11y', 'focus'], impactAreas: ['Dostępność', 'UX'],
    important: true, clientFacing: false, caseStudy: true, custom: false
  },
  {
    id: 'd8', title: 'Rozdzielenie zakresu bazowego i dodatków po wdrożeniu', category: 'Zakres projektu', stage: 'Strategia', date: '2026-03-18',
    status: 'Zatwierdzona', owner: 'Project Manager', approvedBy: 'Klient',
    summary: 'Faza 1 obejmuje tylko funkcje krytyczne, dodatki przechodzą do roadmapy.',
    reasoning: 'Projekt miał napięty termin i ograniczony budżet.',
    alternatives: 'Realizacja pełnego zakresu jednocześnie.',
    tradeOffs: 'Mniej funkcji na starcie, ale kontrola ryzyka i kosztu.',
    riskAddressed: 'Ryzyko scope creep i opóźnień.',
    impact: 'Przewidywalny harmonogram i jasna komunikacja zakresu.', reviewDate: '2026-06-01', tags: ['scope', 'roadmap'], impactAreas: ['Zakres', 'Koszt / czas'],
    important: true, clientFacing: true, caseStudy: true, custom: false
  },
  {
    id: 'd9', title: 'Przygotowanie treści pod przyszłe case study', category: 'Treść / copywriting', stage: 'Po wdrożeniu', date: '2026-04-10',
    status: 'Szkic', owner: 'Content Strategist', approvedBy: '',
    summary: 'W trakcie projektu zbieramy decyzje i wyniki, które później trafią do portfolio.',
    reasoning: 'Dane zbierane na bieżąco są bardziej wiarygodne niż rekonstrukcja po czasie.',
    alternatives: 'Opis case study dopiero po zakończeniu projektu.',
    tradeOffs: 'Więcej dokumentacji w trakcie prac, ale lepsza jakość materiału.',
    riskAddressed: 'Ryzyko utraty ważnego kontekstu decyzji.',
    impact: 'Mocniejszy materiał sprzedażowy i edukacyjny.', reviewDate: '', tags: ['case-study', 'portfolio'], impactAreas: ['UX', 'Zakres'],
    important: false, clientFacing: false, caseStudy: true, custom: false
  },
  {
    id: 'd10', title: 'Proste wdrożenie statyczne bez kont użytkownika', category: 'Wdrożenie', stage: 'Wdrożenie', date: '2026-04-14',
    status: 'Zatwierdzona', owner: 'DevOps', approvedBy: 'Klient + PM',
    summary: 'Publikacja przez prosty pipeline bez logowania użytkowników i zaplecza danych.',
    reasoning: 'Zakres biznesowy nie wymaga panelu klienta na etapie pierwszego release.',
    alternatives: 'Wdrożenie z auth i panelem kont od razu.',
    tradeOffs: 'Mniej funkcji personalizacji, ale szybszy i tańszy start.',
    riskAddressed: 'Ryzyko przeciążenia projektu na etapie uruchomienia.',
    impact: 'Stabilny start i mniejszy koszt utrzymania infrastruktury.', reviewDate: '2026-09-01', tags: ['deployment', 'mvp'], impactAreas: ['Wdrożenie', 'Koszt / czas', 'Utrzymanie'],
    important: true, clientFacing: true, caseStudy: false, custom: false
  }
];

const decisionTemplates = [
  { title: 'Mobile-first layout', category: 'CSS / architektura', reasoning: 'Najpierw projektujemy dla małych ekranów, bo to główny kanał ruchu.', alternatives: 'Desktop-first z dopasowaniem w końcówce.', tradeOffs: 'Więcej planowania komponentów, ale mniej poprawek responsywnych.', impact: 'Lepsza użyteczność i stabilny CSS.', impactAreas: ['UX', 'Wydajność'] },
  { title: 'Statyczny stack HTML/CSS/JS', category: 'Technologia', reasoning: 'Zakres nie wymaga ciężkiego frameworka ani złożonego stanu.', alternatives: 'Framework SPA.', tradeOffs: 'Mniej automatyzacji, ale prostsze utrzymanie i szybszy start.', impact: 'Niższy koszt wdrożenia.', impactAreas: ['Koszt / czas', 'Utrzymanie'] },
  { title: 'Struktura SEO z planem nagłówków', category: 'SEO', reasoning: 'Jasna hierarchia H1-H2-H3 i metadata poprawiają indeksację.', alternatives: 'SEO dopiero po wdrożeniu.', tradeOffs: 'Więcej pracy redakcyjnej teraz, mniej poprawek później.', impact: 'Lepsza widoczność organiczna.', impactAreas: ['SEO'] },
  { title: 'Widoczne focus states', category: 'Dostępność', reasoning: 'Użytkownicy klawiatury muszą widzieć, gdzie jest fokus.', alternatives: 'Brak dedykowanego stylowania focus.', tradeOffs: 'Mocniejsze elementy wizualne, ale lepsza dostępność.', impact: 'Wzrost jakości a11y.', impactAreas: ['Dostępność', 'UX'] },
  { title: 'Optymalizacja wydajności zasobów', category: 'Wydajność', reasoning: 'Ograniczenie ciężkich skryptów i mediów poprawia czas ładowania.', alternatives: 'Pełny zestaw efektów i bibliotek.', tradeOffs: 'Mniej efektów wizualnych, lepsze CWV.', impact: 'Stabilne działanie na słabszych urządzeniach.', impactAreas: ['Wydajność', 'UX'] },
  { title: 'Limit zakresu w fazie 1', category: 'Zakres projektu', reasoning: 'Rozdzielenie must-have i nice-to-have pozwala dowieźć termin.', alternatives: 'Wdrożenie pełnego zakresu naraz.', tradeOffs: 'Mniej funkcji na start, ale mniejsze ryzyko opóźnień.', impact: 'Lepsza kontrola harmonogramu i kosztu.', impactAreas: ['Zakres', 'Koszt / czas'] },
  { title: 'Zależność od dostarczenia treści przez klienta', category: 'Decyzja klienta', reasoning: 'Harmonogram zależy od terminowego przekazania materiałów przez klienta.', alternatives: 'Pisanie treści przez zespół wykonawczy.', tradeOffs: 'Ryzyko opóźnień po stronie klienta, ale spójny głos marki.', impact: 'Krytyczny wpływ na plan publikacji.', impactAreas: ['Zakres', 'Koszt / czas'] },
  { title: 'Proste wdrożenie bez kont użytkownika', category: 'Wdrożenie', reasoning: 'Pierwszy release ma potwierdzić wartość biznesową bez rozbudowy backendu.', alternatives: 'Od razu pełny system kont.', tradeOffs: 'Mniejsza personalizacja, ale szybszy i tańszy start.', impact: 'Bezpieczniejszy rollout i prostsze utrzymanie.', impactAreas: ['Wdrożenie', 'Utrzymanie'] }
];

const state = {
  project: { clientName: '', projectName: '', projectType: 'Strona firmowa', projectStage: 'Strategia', projectOwner: '', startDate: '', projectNote: '' },
  decisions: structuredClone(defaultDecisions),
  filters: { category: 'Wszystkie', stage: 'Wszystkie', status: 'Wszystkie', important: false, clientFacing: false, caseStudy: false, search: '' },
  editingId: null
};

const el = {};

document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  hydrateFromStorage();
  populateSelects();
  bindEvents();
  renderAll();
});

function cacheElements() {
  [
    'project-form', 'projectSummaryText', 'filterCategory', 'filterStage', 'filterStatus', 'filterImportant', 'filterClientFacing',
    'filterCaseStudy', 'filterSearch', 'resetFiltersBtn', 'resetDecisionsBtn', 'decisionCountInfo', 'qualityCards', 'qualityStatus', 'impactMatrix',
    'decisionForm', 'decisionId', 'decisionTitle', 'decisionCategory', 'decisionStage', 'decisionStatus', 'decisionOwner', 'decisionApprovedBy',
    'decisionSummary', 'decisionReasoning', 'decisionAlternatives', 'decisionTradeOffs', 'decisionRiskAddressed', 'decisionImpact', 'decisionTags',
    'decisionReviewDate', 'decisionImpactAreas', 'decisionImportant', 'decisionClientFacing', 'decisionCaseStudy', 'clearFormBtn', 'formFeedback',
    'decisionList', 'templateList', 'internalSummary', 'clientSummary', 'caseStudySummary', 'handoffSummary', 'copyStatus',
    'copyInternalBtn', 'copyClientBtn', 'copyCaseStudyBtn', 'copyHandoffBtn'
  ].forEach((id) => { el[toCamel(id)] = document.getElementById(id); });
}

function toCamel(value) {
  return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function populateSelects() {
  fillSelect(el.filterCategory, ['Wszystkie', ...CATEGORIES]);
  fillSelect(el.filterStage, ['Wszystkie', ...STAGES]);
  fillSelect(el.filterStatus, ['Wszystkie', ...STATUSES]);
  fillSelect(el.decisionCategory, CATEGORIES);
  fillSelect(el.decisionStage, STAGES);
  fillSelect(el.decisionStatus, STATUSES);
  fillSelect(el.decisionImpactAreas, IMPACT_AREAS);

  el.filterCategory.value = state.filters.category;
  el.filterStage.value = state.filters.stage;
  el.filterStatus.value = state.filters.status;
}

function fillSelect(select, options) {
  select.innerHTML = options.map((item) => `<option value="${item}">${item}</option>`).join('');
}

function bindEvents() {
  el.projectForm.addEventListener('input', onProjectInput);
  el.projectForm.addEventListener('change', onProjectInput);

  el.filterCategory.addEventListener('change', onFilterChange);
  el.filterStage.addEventListener('change', onFilterChange);
  el.filterStatus.addEventListener('change', onFilterChange);
  el.filterImportant.addEventListener('change', onFilterChange);
  el.filterClientFacing.addEventListener('change', onFilterChange);
  el.filterCaseStudy.addEventListener('change', onFilterChange);
  el.filterSearch.addEventListener('input', onFilterChange);

  el.resetFiltersBtn.addEventListener('click', resetFilters);
  el.resetDecisionsBtn.addEventListener('click', resetDecisionsToDefault);

  el.decisionForm.addEventListener('submit', onDecisionSubmit);
  el.clearFormBtn.addEventListener('click', clearDecisionForm);

  el.decisionList.addEventListener('click', onDecisionListClick);
  el.templateList.addEventListener('click', onTemplateInsert);

  el.copyInternalBtn.addEventListener('click', () => copyFromTextarea(el.internalSummary, 'Skopiowano podsumowanie wewnętrzne.'));
  el.copyClientBtn.addEventListener('click', () => copyFromTextarea(el.clientSummary, 'Skopiowano podsumowanie dla klienta.'));
  el.copyCaseStudyBtn.addEventListener('click', () => copyFromTextarea(el.caseStudySummary, 'Skopiowano notatki do case study.'));
  el.copyHandoffBtn.addEventListener('click', () => copyFromTextarea(el.handoffSummary, 'Skopiowano notatkę techniczną.'));
}

function onProjectInput() {
  const formData = new FormData(el.projectForm);
  state.project = Object.fromEntries(formData.entries());
  persistState();
  renderProjectSummary();
  renderOutputs();
}

function onFilterChange() {
  state.filters = {
    category: el.filterCategory.value,
    stage: el.filterStage.value,
    status: el.filterStatus.value,
    important: el.filterImportant.checked,
    clientFacing: el.filterClientFacing.checked,
    caseStudy: el.filterCaseStudy.checked,
    search: el.filterSearch.value.trim().toLowerCase()
  };
  renderDecisions();
}

function resetFilters() {
  state.filters = { category: 'Wszystkie', stage: 'Wszystkie', status: 'Wszystkie', important: false, clientFacing: false, caseStudy: false, search: '' };
  el.filterCategory.value = state.filters.category;
  el.filterStage.value = state.filters.stage;
  el.filterStatus.value = state.filters.status;
  el.filterImportant.checked = false;
  el.filterClientFacing.checked = false;
  el.filterCaseStudy.checked = false;
  el.filterSearch.value = '';
  renderDecisions();
}

function resetDecisionsToDefault() {
  state.decisions = structuredClone(defaultDecisions);
  state.editingId = null;
  clearDecisionForm();
  persistState();
  renderAll();
  el.formFeedback.textContent = 'Przywrócono domyślne decyzje projektowe.';
}

function onDecisionSubmit(event) {
  event.preventDefault();
  const title = el.decisionTitle.value.trim();
  if (!title) {
    el.formFeedback.textContent = 'Tytuł decyzji jest wymagany.';
    el.decisionTitle.focus();
    return;
  }

  const selectedImpactAreas = [...el.decisionImpactAreas.selectedOptions].map((option) => option.value);
  const record = {
    id: state.editingId || `c-${Date.now()}`,
    title,
    category: el.decisionCategory.value,
    stage: el.decisionStage.value,
    date: state.editingId ? getDecisionById(state.editingId).date : todayISO(),
    status: el.decisionStatus.value,
    owner: el.decisionOwner.value.trim(),
    approvedBy: el.decisionApprovedBy.value.trim(),
    summary: el.decisionSummary.value.trim(),
    reasoning: el.decisionReasoning.value.trim(),
    alternatives: el.decisionAlternatives.value.trim(),
    tradeOffs: el.decisionTradeOffs.value.trim(),
    riskAddressed: el.decisionRiskAddressed.value.trim(),
    impact: el.decisionImpact.value.trim(),
    reviewDate: el.decisionReviewDate.value,
    tags: splitTags(el.decisionTags.value),
    impactAreas: selectedImpactAreas.length ? selectedImpactAreas : ['UX'],
    important: el.decisionImportant.checked,
    clientFacing: el.decisionClientFacing.checked,
    caseStudy: el.decisionCaseStudy.checked,
    custom: true
  };

  if (state.editingId) {
    state.decisions = state.decisions.map((item) => (item.id === state.editingId ? record : item));
    el.formFeedback.textContent = 'Zapisano zmiany decyzji.';
  } else {
    state.decisions.unshift(record);
    el.formFeedback.textContent = 'Dodano nową decyzję.';
  }

  state.editingId = null;
  clearDecisionForm(true);
  persistState();
  renderAll();
}

function splitTags(raw) {
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function clearDecisionForm(keepFeedback = false) {
  el.decisionForm.reset();
  el.decisionId.value = '';
  state.editingId = null;
  [...el.decisionImpactAreas.options].forEach((option) => { option.selected = false; });
  if (!keepFeedback) {
    el.formFeedback.textContent = '';
  }
}

function onDecisionListClick(event) {
  const actionBtn = event.target.closest('button[data-action]');
  if (!actionBtn) return;

  const id = actionBtn.dataset.id;
  const action = actionBtn.dataset.action;
  const decision = getDecisionById(id);
  if (!decision) return;

  if (action === 'edit') {
    loadDecisionIntoForm(decision);
  }

  if (action === 'duplicate') {
    const copy = { ...decision, id: `c-${Date.now()}`, date: todayISO(), title: `${decision.title} (kopia)`, custom: true };
    state.decisions.unshift(copy);
    persistState();
    renderAll();
  }

  if (action === 'delete') {
    if (!decision.custom) {
      el.formFeedback.textContent = 'Domyślnych decyzji nie usuwamy. Możesz je edytować lub zduplikować.';
      return;
    }
    state.decisions = state.decisions.filter((item) => item.id !== id);
    persistState();
    renderAll();
  }

  if (action === 'toggle-important') {
    decision.important = !decision.important;
    persistState();
    renderAll();
  }

  if (action === 'toggle-client') {
    decision.clientFacing = !decision.clientFacing;
    persistState();
    renderAll();
  }

  if (action === 'toggle-case') {
    decision.caseStudy = !decision.caseStudy;
    persistState();
    renderAll();
  }
}

function loadDecisionIntoForm(decision) {
  state.editingId = decision.id;
  el.decisionTitle.value = decision.title;
  el.decisionCategory.value = decision.category;
  el.decisionStage.value = decision.stage;
  el.decisionStatus.value = decision.status;
  el.decisionOwner.value = decision.owner;
  el.decisionApprovedBy.value = decision.approvedBy;
  el.decisionSummary.value = decision.summary;
  el.decisionReasoning.value = decision.reasoning;
  el.decisionAlternatives.value = decision.alternatives;
  el.decisionTradeOffs.value = decision.tradeOffs;
  el.decisionRiskAddressed.value = decision.riskAddressed;
  el.decisionImpact.value = decision.impact;
  el.decisionTags.value = decision.tags.join(', ');
  el.decisionReviewDate.value = decision.reviewDate || '';
  el.decisionImportant.checked = decision.important;
  el.decisionClientFacing.checked = decision.clientFacing;
  el.decisionCaseStudy.checked = decision.caseStudy;

  [...el.decisionImpactAreas.options].forEach((option) => {
    option.selected = decision.impactAreas.includes(option.value);
  });

  el.formFeedback.textContent = `Edytujesz: ${decision.title}`;
  el.decisionTitle.focus();
}

function getDecisionById(id) {
  return state.decisions.find((item) => item.id === id);
}

function onTemplateInsert(event) {
  const button = event.target.closest('button[data-template-index]');
  if (!button) return;
  const template = decisionTemplates[Number(button.dataset.templateIndex)];
  if (!template) return;

  const newDecision = {
    id: `c-${Date.now()}`,
    title: template.title,
    category: template.category,
    stage: state.project.projectStage || 'Strategia',
    date: todayISO(),
    status: 'Szkic',
    owner: state.project.projectOwner || 'Freelancer / studio',
    approvedBy: '',
    summary: template.reasoning,
    reasoning: template.reasoning,
    alternatives: template.alternatives,
    tradeOffs: template.tradeOffs,
    riskAddressed: '',
    impact: template.impact,
    reviewDate: '',
    tags: ['szablon', ...template.title.toLowerCase().split(' ').slice(0, 2)],
    impactAreas: template.impactAreas,
    important: false,
    clientFacing: false,
    caseStudy: false,
    custom: true
  };

  state.decisions.unshift(newDecision);
  persistState();
  renderAll();
  el.formFeedback.textContent = `Dodano decyzję z szablonu: ${template.title}.`;
}

function getFilteredDecisions() {
  return state.decisions
    .filter((decision) => {
      const matchCategory = state.filters.category === 'Wszystkie' || decision.category === state.filters.category;
      const matchStage = state.filters.stage === 'Wszystkie' || decision.stage === state.filters.stage;
      const matchStatus = state.filters.status === 'Wszystkie' || decision.status === state.filters.status;
      const matchImportant = !state.filters.important || decision.important;
      const matchClient = !state.filters.clientFacing || decision.clientFacing;
      const matchCaseStudy = !state.filters.caseStudy || decision.caseStudy;
      const blob = `${decision.title} ${decision.reasoning} ${decision.impact} ${decision.tags.join(' ')}`.toLowerCase();
      const matchSearch = !state.filters.search || blob.includes(state.filters.search);
      return matchCategory && matchStage && matchStatus && matchImportant && matchClient && matchCaseStudy && matchSearch;
    })
    .sort((a, b) => {
      if (a.important !== b.important) return a.important ? -1 : 1;
      return new Date(b.date) - new Date(a.date);
    });
}

function renderAll() {
  renderProjectSummary();
  renderDecisions();
  renderQuality();
  renderImpactMatrix();
  renderOutputs();
  renderTemplates();
}

function renderProjectSummary() {
  const p = state.project;
  const chunks = [
    p.clientName ? `Klient: ${p.clientName}` : 'Klient: nie podano',
    p.projectName ? `Projekt: ${p.projectName}` : 'Projekt: nie podano',
    `Typ: ${p.projectType || 'nie podano'}`,
    `Etap: ${p.projectStage || 'nie podano'}`,
    p.projectOwner ? `Odpowiedzialny/a: ${p.projectOwner}` : 'Odpowiedzialny/a: nie podano',
    p.startDate ? `Start: ${formatDate(p.startDate)}` : 'Start: nie podano'
  ];
  if (p.projectNote) chunks.push(`Notatka: ${p.projectNote}`);
  el.projectSummaryText.textContent = chunks.join(' • ');
}

function renderDecisions() {
  const decisions = getFilteredDecisions();
  el.decisionCountInfo.textContent = `Widoczne decyzje: ${decisions.length} z ${state.decisions.length}.`;

  if (!decisions.length) {
    el.decisionList.innerHTML = '<p class="helper-text">Brak decyzji spełniających filtry.</p>';
    return;
  }

  el.decisionList.innerHTML = decisions.map((d) => {
    const flags = [
      d.important ? '<span class="flag">Ważna</span>' : '',
      d.clientFacing ? '<span class="flag">Dla klienta</span>' : '',
      d.caseStudy ? '<span class="flag">Case study</span>' : ''
    ].join('');

    return `
      <article class="decision-card">
        <div class="decision-head">
          <h3>${escapeHtml(d.title)}</h3>
          <p class="meta-line">${escapeHtml(d.status)} • ${escapeHtml(d.category)} • ${formatDate(d.date)}</p>
        </div>
        <p class="meta-line">Etap: ${escapeHtml(d.stage)} • Właściciel: ${escapeHtml(d.owner || 'nie wskazano')} • Zatwierdził(a): ${escapeHtml(d.approvedBy || 'brak')}</p>
        <p class="flag-line">${flags || '<span class="flag">Brak flag</span>'}</p>
        <p class="content-line"><strong>Opis:</strong> ${escapeHtml(d.summary || 'Brak opisu.')}</p>
        <p class="content-line"><strong>Uzasadnienie:</strong> ${escapeHtml(d.reasoning || 'Brak uzasadnienia.')}</p>
        <p class="content-line"><strong>Alternatywy:</strong> ${escapeHtml(d.alternatives || 'Brak alternatyw.')}</p>
        <p class="content-line"><strong>Kompromisy:</strong> ${escapeHtml(d.tradeOffs || 'Brak opisu kompromisów.')}</p>
        <p class="content-line"><strong>Ryzyko:</strong> ${escapeHtml(d.riskAddressed || 'Brak opisu ryzyka.')}</p>
        <p class="content-line"><strong>Wpływ:</strong> ${escapeHtml(d.impact || 'Brak opisu wpływu.')}</p>
        <p class="meta-line">Tagi: ${escapeHtml(d.tags.join(', ') || 'brak')} • Przegląd: ${d.reviewDate ? formatDate(d.reviewDate) : 'nie ustawiono'}</p>
        <p class="meta-line">Obszary wpływu: ${escapeHtml(d.impactAreas.join(', '))}</p>
        <div class="card-actions">
          <button type="button" class="button button-small" data-action="edit" data-id="${d.id}">Edytuj</button>
          <button type="button" class="button button-small button-ghost" data-action="duplicate" data-id="${d.id}">Duplikuj</button>
          <button type="button" class="button button-small button-ghost" data-action="toggle-important" data-id="${d.id}">${d.important ? 'Odznacz ważną' : 'Oznacz jako ważną'}</button>
          <button type="button" class="button button-small button-ghost" data-action="toggle-client" data-id="${d.id}">${d.clientFacing ? 'Ukryj z widoku klienta' : 'Oznacz dla klienta'}</button>
          <button type="button" class="button button-small button-ghost" data-action="toggle-case" data-id="${d.id}">${d.caseStudy ? 'Usuń z case study' : 'Oznacz do case study'}</button>
          <button type="button" class="button button-small button-danger" data-action="delete" data-id="${d.id}">Usuń</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderQuality() {
  const decisions = state.decisions;
  const total = decisions.length;
  const approved = decisions.filter((d) => ['Zatwierdzona', 'Wdrożona'].includes(d.status)).length;
  const important = decisions.filter((d) => d.important).length;
  const clientFacing = decisions.filter((d) => d.clientFacing).length;
  const caseStudy = decisions.filter((d) => d.caseStudy).length;
  const missingReasoning = decisions.filter((d) => !d.reasoning).length;
  const missingAlternatives = decisions.filter((d) => !d.alternatives).length;
  const missingTradeOffs = decisions.filter((d) => !d.tradeOffs).length;
  const needsReview = decisions.filter((d) => d.status === 'Do przeglądu' || (d.reviewDate && new Date(d.reviewDate) <= new Date())).length;

  const completenessPoints = decisions.reduce((score, d) => {
    let local = 0;
    if (d.reasoning) local += 1;
    if (d.alternatives) local += 1;
    if (d.tradeOffs) local += 1;
    if (d.impact) local += 1;
    if (d.approvedBy || ['Zatwierdzona', 'Wdrożona'].includes(d.status)) local += 1;
    if (!d.reviewDate || d.reviewDate) local += 1;
    if (d.tags.length) local += 1;
    return score + local;
  }, 0);

  const maxPoints = Math.max(total * 7, 1);
  const completeness = Math.round((completenessPoints / maxPoints) * 100);

  const metrics = [
    ['Wszystkie decyzje', total],
    ['Zatwierdzone / wdrożone', approved],
    ['Ważne', important],
    ['Dla klienta', clientFacing],
    ['Gotowe do case study', caseStudy],
    ['Bez uzasadnienia', missingReasoning],
    ['Bez alternatyw', missingAlternatives],
    ['Bez kompromisów', missingTradeOffs],
    ['Do przeglądu', needsReview],
    ['Kompletność', `${completeness}%`]
  ];

  el.qualityCards.innerHTML = metrics
    .map(([label, value]) => `<article class="metric"><strong>${value}</strong><span>${label}</span></article>`)
    .join('');

  el.qualityStatus.textContent = `Status gotowości: ${qualityLabel(completeness)}.`;
}

function qualityLabel(completeness) {
  if (completeness < 35) return 'Luźne notatki';
  if (completeness < 55) return 'Wymaga dopracowania';
  if (completeness < 72) return 'Dobra dokumentacja projektu';
  if (completeness < 86) return 'Gotowe do case study';
  return 'Gotowe do audytu / przekazania';
}

function renderImpactMatrix() {
  const counts = Object.fromEntries(IMPACT_AREAS.map((area) => [area, 0]));
  state.decisions.forEach((decision) => {
    decision.impactAreas.forEach((area) => {
      if (counts[area] !== undefined) counts[area] += 1;
    });
  });

  el.impactMatrix.innerHTML = IMPACT_AREAS.map((area) => `
    <article class="impact-item" role="listitem" aria-label="${area}: ${counts[area]} decyzji">
      <h3>${area}</h3>
      <p>Liczba decyzji: <strong>${counts[area]}</strong></p>
    </article>
  `).join('');
}

function renderTemplates() {
  el.templateList.innerHTML = decisionTemplates.map((t, index) => `
    <article class="template-card">
      <h3>${escapeHtml(t.title)}</h3>
      <p><strong>Kategoria:</strong> ${escapeHtml(t.category)}</p>
      <p><strong>Uzasadnienie:</strong> ${escapeHtml(t.reasoning)}</p>
      <p><strong>Alternatywy:</strong> ${escapeHtml(t.alternatives)}</p>
      <p><strong>Kompromisy:</strong> ${escapeHtml(t.tradeOffs)}</p>
      <p><strong>Wpływ:</strong> ${escapeHtml(t.impact)}</p>
      <button type="button" class="button button-small" data-template-index="${index}">Wstaw szablon</button>
    </article>
  `).join('');
}

function renderOutputs() {
  const projectName = state.project.projectName || 'projekt';
  const clientName = state.project.clientName || 'klient';

  const top = state.decisions.slice(0, 6);
  const clientEntries = state.decisions.filter((d) => d.clientFacing).slice(0, 6);
  const caseEntries = state.decisions.filter((d) => d.caseStudy).slice(0, 6);
  const maintenanceEntries = state.decisions.filter((d) => d.important || d.status === 'Wdrożona').slice(0, 6);

  el.internalSummary.value = `Poniżej znajduje się krótkie podsumowanie najważniejszych decyzji projektowych dla ${projectName}.\n\n${top.map((d, i) => `${i + 1}. ${d.title} — ${d.reasoning || 'Brak uzasadnienia.'} Najważniejszy kompromis polegał na: ${d.tradeOffs || 'brak danych'}.`).join('\n')}`;

  el.clientSummary.value = `Podsumowanie decyzji projektowych dla klienta: ${clientName}.\n\n${clientEntries.length ? clientEntries.map((d, i) => `${i + 1}. ${d.title}. Ta decyzja została podjęta, ponieważ ${lowerFirst(d.reasoning || 'była potrzebna dla stabilnej realizacji projektu')}. Z perspektywy klienta oznacza to: ${lowerFirst(d.impact || 'bardziej przewidywalną realizację')}.`).join('\n') : 'Brak decyzji oznaczonych jako widoczne dla klienta.'}`;

  el.caseStudySummary.value = `Notatki do case study dla projektu ${projectName}.\n\n${caseEntries.length ? caseEntries.map((d, i) => `${i + 1}. ${d.title}. Rozważane były również inne rozwiązania, ale ${lowerFirst(d.alternatives || 'ostatecznie wybrano najbardziej adekwatną opcję')}. Wartość biznesowa: ${lowerFirst(d.impact || 'lepsza jakość realizacji')}.`).join('\n') : 'Brak decyzji oznaczonych jako przydatne do case study.'}`;

  el.handoffSummary.value = `Notatka techniczna do przekazania i utrzymania projektu ${projectName}.\n\n${maintenanceEntries.length ? maintenanceEntries.map((d, i) => `${i + 1}. ${d.title}. Status: ${d.status}. Z perspektywy dalszego utrzymania warto pamiętać, że ${lowerFirst(d.tradeOffs || d.impact || 'decyzja wymaga monitorowania po wdrożeniu')}. Przegląd: ${d.reviewDate ? formatDate(d.reviewDate) : 'nie ustawiono'}.`).join('\n') : 'Brak kluczowych decyzji do przekazania.'}`;
}

function lowerFirst(text) {
  if (!text) return '';
  return text.charAt(0).toLowerCase() + text.slice(1);
}

async function copyFromTextarea(textarea, successMessage) {
  const value = textarea.value;
  if (!value.trim()) {
    el.copyStatus.textContent = 'Brak treści do skopiowania.';
    return;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
    } else {
      fallbackCopy(value);
    }
    el.copyStatus.textContent = successMessage;
  } catch {
    try {
      fallbackCopy(value);
      el.copyStatus.textContent = successMessage;
    } catch {
      el.copyStatus.textContent = 'Nie udało się skopiować treści.';
    }
  }
}

function fallbackCopy(text) {
  const helper = document.createElement('textarea');
  helper.value = text;
  helper.setAttribute('readonly', '');
  helper.style.position = 'absolute';
  helper.style.left = '-9999px';
  document.body.appendChild(helper);
  helper.select();
  document.execCommand('copy');
  document.body.removeChild(helper);
}

function hydrateFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed.project) state.project = parsed.project;
    if (Array.isArray(parsed.decisions) && parsed.decisions.length) state.decisions = parsed.decisions;
  } catch {
    // brak odczytu ze storage nie blokuje działania narzędzia
  }

  setProjectForm(state.project);
}

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ project: state.project, decisions: state.decisions }));
  } catch {
    // działanie bez localStorage
  }
}

function setProjectForm(project) {
  Object.entries(project).forEach(([key, value]) => {
    const control = document.getElementById(key);
    if (control) control.value = value;
  });
}

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('pl-PL', { dateStyle: 'medium' }).format(date);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
