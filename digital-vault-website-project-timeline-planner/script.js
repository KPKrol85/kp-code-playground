(() => {
  const config = {
    projectTypes: {
      landing: { days: 16, label: "Simple landing page" },
      business: { days: 24, label: "Business website" },
      extended: { days: 34, label: "Extended business website" },
      redesign: { days: 30, label: "Redesign" },
      cms: { days: 38, label: "Website with CMS" },
      custom: { days: 45, label: "Custom project" }
    },
    pace: { standard: 0, calm: 5, express: -4 },
    content: { ready: 0, partial: 4, missing: 9 },
    revisions: { "1": 0, "2": 3, "3": 6 },
    clientSpeed: { fast: -1, standard: 2, slow: 7 }
  };

  const stageBlueprint = [
    ["Discovery / brief", "Shared", "Brief potwierdzony", "Cele i ograniczenia"],
    ["Scope confirmation", "Shared", "Zakres zamknięty", "Priorytety i out-of-scope"],
    ["Content and assets", "Client", "Materiały kompletne", "Treści, grafiki, brand"],
    ["Structure / sitemap", "Freelancer", "Struktura zaakceptowana", "Mapa i nawigacja"],
    ["UX / layout planning", "Freelancer", "Układ zaakceptowany", "Wireframe / layout"],
    ["Visual direction / design", "Freelancer", "Design approved", "Kierunek wizualny"],
    ["Development", "Freelancer", "Build gotowy do review", "Implementacja"],
    ["Client review", "Client", "Feedback kompletny", "Komentarze klienta"],
    ["Revisions", "Freelancer", "Rewizje zamknięte", "Uzgodnione poprawki"],
    ["Testing and QA", "Freelancer", "QA pass", "Testy funkcjonalne"],
    ["Launch preparation", "Shared", "Launch approved", "Dostępy i checklista"],
    ["Publication / launch", "Freelancer", "Strona online", "Publikacja"],
    ["Handoff", "Shared", "Handoff completed", "Przekazanie projektu"],
    ["Post-launch review", "Shared", "Review 7/14/30", "Monitoring i podsumowanie"]
  ];

  const form = document.getElementById("timeline-form");
  const resetButton = document.getElementById("reset-planner");
  const message = document.getElementById("planner-message");
  const output = document.getElementById("planner-output");

  function formatDate(date) {
    return new Intl.DateTimeFormat("pl-PL", { year: "numeric", month: "long", day: "numeric" }).format(date);
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function calculateRisk(totalDays, selections) {
    let points = 1;
    if (selections.content === "missing") points += 2;
    if (selections.clientSpeed === "slow") points += 2;
    if (selections.revisions === "3") points += 1;
    if (selections.pace === "express") points += 2;
    if (totalDays > 42) points += 1;

    if (points <= 2) {
      return ["Niskie", "Plan jest stabilny przy obecnych założeniach i rytmie decyzji.", "Utrzymaj cotygodniowy status i pilnuj gate’ów."];
    }
    if (points <= 5) {
      return ["Średnie", "Projekt wymaga uważnego prowadzenia terminów treści i akceptacji.", "Zablokuj daty feedbacku i podziel projekt na krótkie checkpointy."];
    }
    return ["Wysokie", "Istnieje duża szansa przesunięcia terminu bez korekty procesu lub zakresu.", "Ustal plan naprawczy: priorytety MVP, nowe deadline’y i zasady zmian."];
  }

  function buildStageDurations(totalDays) {
    const weights = [6, 5, 10, 5, 7, 10, 18, 8, 9, 7, 4, 2, 4, 5];
    const sum = weights.reduce((a, b) => a + b, 0);
    const scaled = weights.map((w) => Math.max(1, Math.round((w / sum) * totalDays)));
    const diff = totalDays - scaled.reduce((a, b) => a + b, 0);
    if (diff !== 0) scaled[6] += diff;
    return scaled;
  }

  function renderTimeline(startDate, durations) {
    const tbody = document.querySelector("#dynamic-timeline-table tbody");
    tbody.innerHTML = "";
    let cursor = new Date(startDate);

    stageBlueprint.forEach((stage, index) => {
      const [name, owner, gate, notes] = stage;
      const start = new Date(cursor);
      const end = addDays(start, durations[index] - 1);
      cursor = addDays(end, 1);

      const row = document.createElement("tr");
      row.innerHTML = `<td>${name}</td><td>${formatDate(start)}</td><td>${formatDate(end)}</td><td>${owner}</td><td>${gate}</td><td>${notes}</td>`;
      tbody.appendChild(row);
    });

    return addDays(cursor, -1);
  }

  function resetOutput() {
    output.hidden = true;
    message.textContent = "Wprowadź parametry i kliknij „Oblicz harmonogram”.";
    document.querySelector("#dynamic-timeline-table tbody").innerHTML = "";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const startValue = document.getElementById("project-start").value;
    if (!startValue) {
      message.textContent = "Wybierz datę startu projektu, aby obliczyć harmonogram.";
      output.hidden = true;
      return;
    }

    const startDate = new Date(startValue);
    if (Number.isNaN(startDate.getTime())) {
      message.textContent = "Nie udało się odczytać daty startu. Wybierz poprawną datę.";
      output.hidden = true;
      return;
    }

    const selections = {
      projectType: document.getElementById("project-type").value,
      pace: document.getElementById("project-pace").value,
      content: document.getElementById("content-readiness").value,
      revisions: document.getElementById("revision-rounds").value,
      clientSpeed: document.getElementById("client-speed").value
    };

    const base = config.projectTypes[selections.projectType].days;
    const totalDays = Math.max(10, base + config.pace[selections.pace] + config.content[selections.content] + config.revisions[selections.revisions] + config.clientSpeed[selections.clientSpeed]);
    const durations = buildStageDurations(totalDays);
    const endDate = renderTimeline(startDate, durations);
    const [riskLevel, riskExplanation, nextAction] = calculateRisk(totalDays, selections);

    document.getElementById("total-duration").textContent = `${totalDays} dni`;
    document.getElementById("end-date").textContent = formatDate(endDate);
    document.getElementById("risk-level").textContent = riskLevel;
    document.getElementById("risk-explanation").textContent = riskExplanation;
    document.getElementById("next-action").textContent = nextAction;

    message.textContent = "Harmonogram został wygenerowany. Sprawdź etapy i ryzyko przed potwierdzeniem klientowi.";
    output.hidden = false;
  });

  resetButton.addEventListener("click", () => {
    form.reset();
    resetOutput();
  });

  resetOutput();
})();
