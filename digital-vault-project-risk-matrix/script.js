(() => {
  const STORAGE_KEY = "kp_digital_vault_project_risk_matrix_v1";

  const CATEGORIES = [
    "Treści i materiały",
    "Decyzje klienta",
    "Zakres projektu",
    "Dostępy techniczne",
    "Integracje",
    "Deadline",
    "SEO i zgodność",
    "Migracja / wdrożenie",
    "Zależności zewnętrzne"
  ];

  const STATUSES = [
    "Otwarte",
    "Monitorowane",
    "W trakcie ograniczania",
    "Ograniczone",
    "Zaakceptowane ryzyko",
    "Zamknięte"
  ];

  const LEVELS = ["Niskie", "Średnie", "Wysokie", "Krytyczne"];

  const DEFAULT_RISKS = [
    { riskName: "Brak treści od klienta", category: "Treści i materiały", probability: 4, impact: 4, owner: "Klient + PM", mitigation: "Ustalony harmonogram dostarczania treści i checklista sekcji.", status: "Otwarte", isCustom: false },
    { riskName: "Brak decyzji klienta", category: "Decyzje klienta", probability: 4, impact: 3, owner: "PM", mitigation: "Terminy decyzyjne i akceptacja po każdej iteracji.", status: "Monitorowane", isCustom: false },
    { riskName: "Niekontrolowany zakres", category: "Zakres projektu", probability: 3, impact: 5, owner: "PM + Sprzedaż", mitigation: "Formalny change request dla zmian poza zakresem.", status: "W trakcie ograniczania", isCustom: false },
    { riskName: "Brak dostępu do hostingu", category: "Dostępy techniczne", probability: 3, impact: 5, owner: "DevOps", mitigation: "Weryfikacja dostępów w kick-off i backupowe konto techniczne.", status: "Otwarte", isCustom: false },
    { riskName: "Brak dostępu do domeny", category: "Dostępy techniczne", probability: 2, impact: 4, owner: "Klient", mitigation: "Potwierdzenie właściciela domeny i danych rejestratora przed wdrożeniem.", status: "Monitorowane", isCustom: false },
    { riskName: "Brak materiałów graficznych", category: "Treści i materiały", probability: 3, impact: 3, owner: "Klient + Design", mitigation: "Brief assetów i data graniczna dostarczenia grafik.", status: "Otwarte", isCustom: false },
    { riskName: "Niejasne wymagania", category: "Zakres projektu", probability: 4, impact: 4, owner: "PM", mitigation: "Warsztat doprecyzowujący i podpisany zakres MVP.", status: "W trakcie ograniczania", isCustom: false },
    { riskName: "Ryzyka techniczne przy migracji", category: "Migracja / wdrożenie", probability: 3, impact: 5, owner: "Tech Lead", mitigation: "Próbna migracja i plan rollback.", status: "Otwarte", isCustom: false },
    { riskName: "Brak danych do SEO", category: "SEO i zgodność", probability: 3, impact: 3, owner: "SEO Specialist", mitigation: "Checklista meta danych i arkusz słów kluczowych.", status: "Monitorowane", isCustom: false },
    { riskName: "Zależność od zewnętrznego dostawcy integracji", category: "Zależności zewnętrzne", probability: 3, impact: 4, owner: "PM + Integrator", mitigation: "Plan alternatywny API i bufor czasowy na testy.", status: "Otwarte", isCustom: false }
  ];

  const els = {
    projectForm: document.getElementById("project-form"),
    projectSummaryText: document.getElementById("projectSummaryText"),
    riskTableBody: document.getElementById("riskTableBody"),
    tableCountInfo: document.getElementById("tableCountInfo"),
    filterCategory: document.getElementById("filterCategory"),
    filterLevel: document.getElementById("filterLevel"),
    filterStatus: document.getElementById("filterStatus"),
    filterSearch: document.getElementById("filterSearch"),
    resetFiltersBtn: document.getElementById("resetFiltersBtn"),
    resetMatrixBtn: document.getElementById("resetMatrixBtn"),
    customRiskForm: document.getElementById("customRiskForm"),
    customRiskName: document.getElementById("customRiskName"),
    customRiskCategory: document.getElementById("customRiskCategory"),
    customRiskProbability: document.getElementById("customRiskProbability"),
    customRiskImpact: document.getElementById("customRiskImpact"),
    customRiskOwner: document.getElementById("customRiskOwner"),
    customRiskMitigation: document.getElementById("customRiskMitigation"),
    customRiskFeedback: document.getElementById("customRiskFeedback"),
    dashboardCards: document.getElementById("dashboardCards"),
    riskMatrixGrid: document.getElementById("riskMatrixGrid"),
    matrixLegend: document.getElementById("matrixLegend"),
    topRisksList: document.getElementById("topRisksList"),
    criticalRisksList: document.getElementById("criticalRisksList"),
    highNoMitigationList: document.getElementById("highNoMitigationList"),
    deadlineRelevantList: document.getElementById("deadlineRelevantList"),
    internalSummary: document.getElementById("internalSummary"),
    clientMessage: document.getElementById("clientMessage"),
    deadlineNote: document.getElementById("deadlineNote"),
    copyInternalBtn: document.getElementById("copyInternalBtn"),
    copyClientBtn: document.getElementById("copyClientBtn"),
    copyDeadlineBtn: document.getElementById("copyDeadlineBtn"),
    copyStatus: document.getElementById("copyStatus")
  };

  const state = {
    risks: [],
    filters: {
      category: "Wszystkie",
      level: "Wszystkie",
      status: "Wszystkie",
      search: ""
    },
    project: {
      clientName: "",
      projectName: "",
      projectType: "Strona wizytówkowa",
      deadline: "",
      projectOwner: "",
      projectNote: ""
    }
  };

  const levelForScore = (score) => {
    if (score >= 16) return "Krytyczne";
    if (score >= 10) return "Wysokie";
    if (score >= 5) return "Średnie";
    return "Niskie";
  };

  const statusClass = (label) => label.toLowerCase().replace(/\s+/g, "-");

  const computeRisk = (risk) => {
    const score = Number(risk.probability) * Number(risk.impact);
    return { ...risk, score, level: levelForScore(score) };
  };

  const cloneDefaults = () => DEFAULT_RISKS.map((risk, index) => ({
    id: `risk-${index + 1}`,
    ...computeRisk(risk)
  }));

  const saveState = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // Aplikacja działa także bez localStorage.
    }
  };

  const loadState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.risks)) return false;
      state.risks = parsed.risks.map(computeRisk);
      state.filters = { ...state.filters, ...(parsed.filters || {}) };
      state.project = { ...state.project, ...(parsed.project || {}) };
      return true;
    } catch (error) {
      return false;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(`${dateStr}T00:00:00`);
    return new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(date);
  };

  const getDaysUntilDeadline = () => {
    if (!state.project.deadline) return null;
    const today = new Date();
    const deadline = new Date(`${state.project.deadline}T00:00:00`);
    const diffMs = deadline - new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  };

  const getFilteredRisks = () => {
    const search = state.filters.search.trim().toLowerCase();
    return state.risks
      .filter((risk) => state.filters.category === "Wszystkie" || risk.category === state.filters.category)
      .filter((risk) => state.filters.level === "Wszystkie" || risk.level === state.filters.level)
      .filter((risk) => state.filters.status === "Wszystkie" || risk.status === state.filters.status)
      .filter((risk) => {
        if (!search) return true;
        return `${risk.riskName} ${risk.mitigation}`.toLowerCase().includes(search);
      })
      .sort((a, b) => b.score - a.score || a.riskName.localeCompare(b.riskName, "pl"));
  };

  const renderSelectOptions = (selectEl, options, includeAll = false) => {
    const allOption = includeAll ? ['<option value="Wszystkie">Wszystkie</option>'] : [];
    selectEl.innerHTML = [...allOption, ...options.map((item) => `<option value="${item}">${item}</option>`)].join("");
  };

  const renderProjectSummary = () => {
    const { clientName, projectName, projectType, deadline, projectOwner, projectNote } = state.project;
    const summary = [
      `Klient: ${clientName || "nie podano"}`,
      `Projekt: ${projectName || "nie podano"}`,
      `Typ: ${projectType || "nie podano"}`,
      `Deadline: ${formatDate(deadline)}`,
      `Odpowiedzialny: ${projectOwner || "nie przypisano"}`,
      `Notatka: ${projectNote || "brak dodatkowych uwag"}`
    ];
    els.projectSummaryText.textContent = summary.join(" • ");
  };

  const riskRowTemplate = (risk) => {
    const removable = risk.isCustom ? `<button type="button" class="button button-danger" data-action="remove-risk" data-id="${risk.id}">Usuń</button>` : "—";
    return `
      <tr>
        <td><strong>${risk.riskName}</strong></td>
        <td>${risk.category}</td>
        <td>
          <label class="visually-hidden" for="prob-${risk.id}">Prawdopodobieństwo dla ${risk.riskName}</label>
          <select id="prob-${risk.id}" data-action="update-probability" data-id="${risk.id}">
            ${[1, 2, 3, 4, 5].map((value) => `<option value="${value}" ${value === risk.probability ? "selected" : ""}>${value}</option>`).join("")}
          </select>
        </td>
        <td>
          <label class="visually-hidden" for="impact-${risk.id}">Wpływ dla ${risk.riskName}</label>
          <select id="impact-${risk.id}" data-action="update-impact" data-id="${risk.id}">
            ${[1, 2, 3, 4, 5].map((value) => `<option value="${value}" ${value === risk.impact ? "selected" : ""}>${value}</option>`).join("")}
          </select>
        </td>
        <td class="risk-score">${risk.score}</td>
        <td><span class="level-pill level-${statusClass(risk.level)}">${risk.level}</span></td>
        <td>
          <label class="visually-hidden" for="owner-${risk.id}">Właściciel ryzyka ${risk.riskName}</label>
          <input id="owner-${risk.id}" data-action="update-owner" data-id="${risk.id}" value="${risk.owner || ""}" />
        </td>
        <td>
          <label class="visually-hidden" for="mitigation-${risk.id}">Plan ograniczania ${risk.riskName}</label>
          <textarea id="mitigation-${risk.id}" data-action="update-mitigation" data-id="${risk.id}" rows="2">${risk.mitigation || ""}</textarea>
        </td>
        <td>
          <label class="visually-hidden" for="status-${risk.id}">Status ryzyka ${risk.riskName}</label>
          <select id="status-${risk.id}" data-action="update-status" data-id="${risk.id}">
            ${STATUSES.map((status) => `<option value="${status}" ${status === risk.status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
        </td>
        <td>${removable}</td>
      </tr>
    `;
  };

  const renderRiskTable = () => {
    const filtered = getFilteredRisks();
    els.riskTableBody.innerHTML = filtered.length
      ? filtered.map(riskRowTemplate).join("")
      : `<tr><td colspan="10">Brak ryzyk spełniających kryteria filtrowania.</td></tr>`;
    els.tableCountInfo.textContent = `Widok: ${filtered.length} / ${state.risks.length} ryzyk.`;
  };

  const computeDashboard = () => {
    const total = state.risks.length;
    const byLevel = {
      Niskie: 0,
      Średnie: 0,
      Wysokie: 0,
      Krytyczne: 0
    };

    let sum = 0;
    let highest = 0;
    state.risks.forEach((risk) => {
      byLevel[risk.level] += 1;
      sum += risk.score;
      highest = Math.max(highest, risk.score);
    });

    const openHighCritical = state.risks.filter((risk) =>
      ["Wysokie", "Krytyczne"].includes(risk.level) &&
      !["Ograniczone", "Zamknięte"].includes(risk.status)
    ).length;

    const openCritical = state.risks.filter((risk) => risk.level === "Krytyczne" && !["Ograniczone", "Zamknięte"].includes(risk.status));
    const criticalNoMitigation = openCritical.filter((risk) => !risk.mitigation.trim());

    let overall = "Stabilny";
    if (openCritical.length >= 2 || criticalNoMitigation.length > 0) {
      overall = "Zablokowany / krytyczny";
    } else if (openCritical.length >= 1) {
      overall = "Wysokie ryzyko projektu";
    } else if (state.risks.some((risk) => risk.level === "Wysokie" && !["Ograniczone", "Zamknięte"].includes(risk.status))) {
      overall = "Wymaga uwagi";
    }

    return {
      total,
      byLevel,
      avg: total ? (sum / total).toFixed(1) : "0.0",
      highest,
      openHighCritical,
      overall
    };
  };

  const renderDashboard = () => {
    const dashboard = computeDashboard();
    const items = [
      ["Łącznie ryzyk", dashboard.total],
      ["Niskie", dashboard.byLevel.Niskie],
      ["Średnie", dashboard.byLevel.Średnie],
      ["Wysokie", dashboard.byLevel.Wysokie],
      ["Krytyczne", dashboard.byLevel.Krytyczne],
      ["Średni wynik", dashboard.avg],
      ["Najwyższy wynik", dashboard.highest],
      ["Otwarte high/critical", dashboard.openHighCritical],
      ["Status projektu", dashboard.overall]
    ];

    els.dashboardCards.innerHTML = items
      .map(([label, value]) => `<div class="dashboard-item"><span>${label}</span><strong>${value}</strong></div>`)
      .join("");
  };

  const renderMatrix = () => {
    const cells = Array.from({ length: 25 }, (_, idx) => ({ idx, markers: [] }));
    const filtered = getFilteredRisks();

    filtered.forEach((risk, index) => {
      const row = 5 - risk.probability;
      const col = risk.impact - 1;
      const cellIndex = row * 5 + col;
      cells[cellIndex].markers.push({
        short: `R${index + 1}:${risk.score}`,
        full: `${risk.riskName} (P:${risk.probability}, W:${risk.impact}, wynik:${risk.score})`
      });
    });

    els.riskMatrixGrid.innerHTML = cells.map((cell) => {
      const markers = cell.markers.map((marker) => `<span class="matrix-marker" title="${marker.full}">${marker.short}</span>`).join("");
      return `<div class="matrix-cell">${markers}</div>`;
    }).join("");

    els.matrixLegend.innerHTML = filtered
      .slice(0, 15)
      .map((risk, index) => `<li><strong>R${index + 1}</strong> — ${risk.riskName} (wynik ${risk.score}, ${risk.level})</li>`)
      .join("") || "<li>Brak ryzyk do pokazania w aktualnym widoku.</li>";
  };

  const getActionSuggestion = (risk) => {
    if (risk.category === "Dostępy techniczne") return "Potwierdź dostępy i właścicieli kont jeszcze dziś.";
    if (risk.category === "Treści i materiały") return "Ustal deadline materiałów i osobę akceptującą treści.";
    if (risk.category === "Zakres projektu") return "Zablokuj zmiany poza zakresem bez change requestu.";
    if (risk.category === "Deadline") return "Dolicz bufor i przeplanuj kolejność zadań krytycznych.";
    return "Przypisz właściciela i ustaw najbliższy termin działania ograniczającego.";
  };

  const renderPrioritySection = () => {
    const sorted = [...state.risks].sort((a, b) => b.score - a.score);
    const critical = sorted.filter((risk) => risk.level === "Krytyczne");
    const highNoMitigation = sorted.filter((risk) => risk.level === "Wysokie" && !risk.mitigation.trim());
    const daysToDeadline = getDaysUntilDeadline();
    const deadlineRelevant = sorted.filter((risk) =>
      ["Deadline", "Decyzje klienta", "Treści i materiały", "Dostępy techniczne"].includes(risk.category) &&
      (daysToDeadline === null || daysToDeadline <= 21)
    );

    const listMarkup = (arr, emptyText) => arr.length
      ? arr.map((risk) => `<li><strong>${risk.riskName}</strong> — wynik ${risk.score} (${risk.level}). Działanie: ${getActionSuggestion(risk)}</li>`).join("")
      : `<li>${emptyText}</li>`;

    els.topRisksList.innerHTML = listMarkup(sorted.slice(0, 5), "Brak ryzyk.");
    els.criticalRisksList.innerHTML = listMarkup(critical, "Brak ryzyk krytycznych.");
    els.highNoMitigationList.innerHTML = listMarkup(highNoMitigation, "Brak wysokich ryzyk bez planu.");
    els.deadlineRelevantList.innerHTML = listMarkup(deadlineRelevant.slice(0, 5), "Brak ryzyk istotnych dla terminu.");
  };

  const renderTemplates = () => {
    const dashboard = computeDashboard();
    const top = [...state.risks].sort((a, b) => b.score - a.score).slice(0, 3);
    const projectName = state.project.projectName || "projekt";
    const clientName = state.project.clientName || "Klient";
    const deadlineText = formatDate(state.project.deadline);

    const topLine = top.length
      ? top.map((risk) => `${risk.riskName} (${risk.score}, ${risk.level.toLowerCase()})`).join(", ")
      : "brak ryzyk wymagających eskalacji";

    els.internalSummary.value = [
      `Podsumowanie wewnętrzne — ${projectName}`,
      `Status ogólny: ${dashboard.overall}.`,
      `Łącznie ryzyk: ${dashboard.total}, w tym krytyczne: ${dashboard.byLevel.Krytyczne}, wysokie: ${dashboard.byLevel.Wysokie}.`,
      `Najwyższe ryzyka: ${topLine}.`,
      `Otwarte ryzyka wysokie/krytyczne: ${dashboard.openHighCritical}.`,
      `Rekomendacja: aktualizujemy statusy na daily/weekly i domykamy działania ograniczające przed kolejnym etapem.`
    ].join("\n");

    els.clientMessage.value = [
      "Cześć,",
      "",
      `poniżej przesyłam krótkie podsumowanie najważniejszych ryzyk w projekcie „${projectName}”.`,
      `Na ten moment największy wpływ na termin mogą mieć: ${topLine}.`,
      "Żeby ograniczyć ryzyko opóźnienia, potrzebujemy domknięcia wskazanych decyzji, dostępów i materiałów zgodnie z ustalonym harmonogramem.",
      `Aktualny planowany termin projektu to: ${deadlineText}.`,
      "Po domknięciu tych elementów projekt będzie bezpieczniejszy do dalszej realizacji.",
      "",
      "Dziękuję i pozostaję do dyspozycji."
    ].join("\n");

    els.deadlineNote.value = [
      "Notatka o wpływie na termin",
      `Projekt: ${projectName}`,
      `Klient: ${clientName}`,
      `Planowany deadline: ${deadlineText}`,
      "",
      "Brak decyzji, materiałów lub dostępów technicznych może bezpośrednio przesunąć harmonogram.",
      "Jeśli wskazane elementy nie zostaną domknięte na czas, konieczna będzie aktualizacja terminu i kolejności wdrożeń.",
      "Rekomendacja: potwierdzić właścicieli zadań i daty dostarczenia krytycznych inputów jeszcze w tym tygodniu."
    ].join("\n");
  };

  const renderAll = () => {
    renderProjectSummary();
    renderRiskTable();
    renderDashboard();
    renderMatrix();
    renderPrioritySection();
    renderTemplates();
    saveState();
  };

  const updateRisk = (id, patch) => {
    state.risks = state.risks.map((risk) => (risk.id === id ? computeRisk({ ...risk, ...patch }) : risk));
    renderAll();
  };

  const handleTableChange = (event) => {
    const action = event.target.dataset.action;
    const id = event.target.dataset.id;
    if (!action || !id) return;

    if (action === "update-probability") {
      updateRisk(id, { probability: Number(event.target.value) });
    } else if (action === "update-impact") {
      updateRisk(id, { impact: Number(event.target.value) });
    } else if (action === "update-status") {
      updateRisk(id, { status: event.target.value });
    } else if (action === "update-owner") {
      updateRisk(id, { owner: event.target.value });
    } else if (action === "update-mitigation") {
      updateRisk(id, { mitigation: event.target.value });
    }
  };

  const handleTableClick = (event) => {
    const button = event.target.closest("button[data-action='remove-risk']");
    if (!button) return;
    const { id } = button.dataset;
    state.risks = state.risks.filter((risk) => risk.id !== id);
    renderAll();
  };

  const handleFilterChange = () => {
    state.filters.category = els.filterCategory.value;
    state.filters.level = els.filterLevel.value;
    state.filters.status = els.filterStatus.value;
    state.filters.search = els.filterSearch.value;
    renderAll();
  };

  const clearFilters = () => {
    state.filters = { category: "Wszystkie", level: "Wszystkie", status: "Wszystkie", search: "" };
    els.filterCategory.value = state.filters.category;
    els.filterLevel.value = state.filters.level;
    els.filterStatus.value = state.filters.status;
    els.filterSearch.value = "";
    renderAll();
  };

  const resetMatrix = () => {
    state.risks = cloneDefaults();
    clearFilters();
    renderAll();
  };

  const buildCustomRisk = () => {
    const riskName = els.customRiskName.value.trim();
    if (!riskName) {
      els.customRiskFeedback.textContent = "Podaj nazwę ryzyka, aby je dodać.";
      return null;
    }

    return computeRisk({
      id: `risk-custom-${Date.now()}`,
      riskName,
      category: els.customRiskCategory.value,
      probability: Number(els.customRiskProbability.value),
      impact: Number(els.customRiskImpact.value),
      owner: els.customRiskOwner.value.trim(),
      mitigation: els.customRiskMitigation.value.trim(),
      status: "Otwarte",
      isCustom: true
    });
  };

  const addCustomRisk = (event) => {
    event.preventDefault();
    const risk = buildCustomRisk();
    if (!risk) return;

    state.risks.push(risk);
    els.customRiskForm.reset();
    els.customRiskCategory.value = CATEGORIES[0];
    els.customRiskProbability.value = "3";
    els.customRiskImpact.value = "3";
    els.customRiskFeedback.textContent = `Dodano ryzyko: ${risk.riskName}.`;
    renderAll();
  };

  const updateProject = () => {
    const data = new FormData(els.projectForm);
    state.project = {
      clientName: String(data.get("clientName") || "").trim(),
      projectName: String(data.get("projectName") || "").trim(),
      projectType: String(data.get("projectType") || "").trim(),
      deadline: String(data.get("deadline") || "").trim(),
      projectOwner: String(data.get("projectOwner") || "").trim(),
      projectNote: String(data.get("projectNote") || "").trim()
    };
    renderAll();
  };

  const fallbackCopy = (text) => {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  };

  const copyText = async (text, label) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
      els.copyStatus.textContent = `Skopiowano: ${label}.`;
    } catch (error) {
      els.copyStatus.textContent = `Nie udało się skopiować: ${label}. Skopiuj ręcznie.`;
    }
  };

  const init = () => {
    renderSelectOptions(els.filterCategory, CATEGORIES, true);
    renderSelectOptions(els.filterLevel, LEVELS, true);
    renderSelectOptions(els.filterStatus, STATUSES, true);
    renderSelectOptions(els.customRiskCategory, CATEGORIES);
    renderSelectOptions(els.customRiskProbability, [1, 2, 3, 4, 5]);
    renderSelectOptions(els.customRiskImpact, [1, 2, 3, 4, 5]);

    if (!loadState()) {
      state.risks = cloneDefaults();
    }

    els.filterCategory.value = state.filters.category;
    els.filterLevel.value = state.filters.level;
    els.filterStatus.value = state.filters.status;
    els.filterSearch.value = state.filters.search;

    Object.entries(state.project).forEach(([key, value]) => {
      const input = els.projectForm.elements.namedItem(key);
      if (input) input.value = value;
    });

    els.riskTableBody.addEventListener("change", handleTableChange);
    els.riskTableBody.addEventListener("input", handleTableChange);
    els.riskTableBody.addEventListener("click", handleTableClick);

    [els.filterCategory, els.filterLevel, els.filterStatus, els.filterSearch].forEach((el) => {
      el.addEventListener("input", handleFilterChange);
      el.addEventListener("change", handleFilterChange);
    });

    els.resetFiltersBtn.addEventListener("click", clearFilters);
    els.resetMatrixBtn.addEventListener("click", resetMatrix);
    els.customRiskForm.addEventListener("submit", addCustomRisk);
    els.projectForm.addEventListener("input", updateProject);
    els.projectForm.addEventListener("change", updateProject);

    els.copyInternalBtn.addEventListener("click", () => copyText(els.internalSummary.value, "podsumowanie wewnętrzne"));
    els.copyClientBtn.addEventListener("click", () => copyText(els.clientMessage.value, "wiadomość do klienta"));
    els.copyDeadlineBtn.addEventListener("click", () => copyText(els.deadlineNote.value, "notatkę o terminie"));

    renderAll();
  };

  init();
})();
