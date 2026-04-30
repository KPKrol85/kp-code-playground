document.addEventListener("DOMContentLoaded", () => {
  const config = {
    totalSteps: 7,
    requiredByStep: {
      1: ["hasWebsite", "websiteQuality"], 2: ["businessGoal", "urgency"], 3: ["problems"],
      4: ["copyReady", "assetsReady", "offerReady"], 5: ["features"], 6: ["hostingReady", "decisionReady", "budgetReady"], 7: ["priorityFocus"]
    },
    scores: {
      condition: { websiteQuality:{good:88,average:64,outdated:38,failsGoal:20}, hasWebsite:{online:82,needsChanges:45,none:10}, problemPenalty:6 },
      readiness: { yes:100, partial:60, no:25 }
    },
    paths: {
      cleanup:"Szybki pakiet porządkowy", refresh:"Pełne odświeżenie strony", rebuild:"Nowa strona od podstaw", seo:"SEO i struktura treści", growth:"Rozbudowa pod rozwój"
    }
  };

  const state = { step: 1 };
  const form = document.querySelector("#roadmapForm");
  const steps = [...document.querySelectorAll(".step")];
  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");
  const submitBtn = document.querySelector("#submitBtn");
  const validationMessage = document.querySelector("#validationMessage");
  const resultSection = document.querySelector("#resultSection");
  const stepCounter = document.querySelector("#stepCounter");
  const progressBar = document.querySelector("#progressBar");
  const progressPercent = document.querySelector("#progressPercent");

  const getRadio = (name) => form.querySelector(`input[name="${name}"]:checked`)?.value || "";
  const getChecks = (name) => [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((el) => el.value);

  const collectAnswers = () => ({
    hasWebsite:getRadio("hasWebsite"), websiteQuality:getRadio("websiteQuality"), businessGoal:getRadio("businessGoal"), urgency:getRadio("urgency"),
    problems:getChecks("problems"), copyReady:getRadio("copyReady"), assetsReady:getRadio("assetsReady"), offerReady:getRadio("offerReady"),
    features:getChecks("features"), hostingReady:getRadio("hostingReady"), decisionReady:getRadio("decisionReady"), budgetReady:getRadio("budgetReady"),
    priorityFocus:getRadio("priorityFocus")
  });

  const stepValid = () => {
    const answers = collectAnswers();
    return config.requiredByStep[state.step].every((field) => Array.isArray(answers[field]) ? answers[field].length > 0 : Boolean(answers[field]));
  };

  const renderStep = () => {
    steps.forEach((s, i) => s.classList.toggle("step--active", i === state.step - 1));
    prevBtn.style.display = state.step === 1 ? "none" : "inline-flex";
    nextBtn.style.display = state.step === config.totalSteps ? "none" : "inline-flex";
    submitBtn.style.display = state.step === config.totalSteps ? "inline-flex" : "none";
    nextBtn.disabled = !stepValid();
    submitBtn.disabled = !stepValid();
    const percent = Math.round((state.step / config.totalSteps) * 100);
    stepCounter.textContent = `Krok ${state.step} z ${config.totalSteps}`;
    progressBar.style.width = `${percent}%`;
    progressPercent.textContent = `${percent}%`;
    validationMessage.textContent = "";
  };

  const computeResult = (a) => {
    const condBase = (config.scores.condition.websiteQuality[a.websiteQuality] + config.scores.condition.hasWebsite[a.hasWebsite]) / 2;
    const condition = Math.max(0, Math.min(100, Math.round(condBase - a.problems.length * config.scores.condition.problemPenalty)));
    const readyAvg = [a.copyReady,a.assetsReady,a.offerReady,a.hostingReady,a.decisionReady,a.budgetReady].reduce((sum, v) => sum + config.scores.readiness[v], 0) / 6;
    const readiness = Math.round(readyAvg);
    const highUrgency = a.urgency === "high" || a.urgency === "mediumHigh" || a.problems.includes("noLeads") || a.problems.includes("failsGoal");
    const urgency = highUrgency ? "Wysoki" : readiness > 70 ? "Niski" : "Średni";
    let path = config.paths.cleanup;
    if (a.hasWebsite === "none") path = config.paths.rebuild;
    else if (["growth","cms"].includes(a.priorityFocus) || ["blog","cases","multiLang","cms","analytics"].some((f)=>a.features.includes(f))) path = config.paths.growth;
    else if (a.businessGoal === "seo" || a.problems.includes("noSeo") || a.priorityFocus === "seo") path = config.paths.seo;
    else if (condition < 45 || a.websiteQuality === "outdated" || a.websiteQuality === "failsGoal") path = config.paths.refresh;

    const roadmap = {
      teraz:["Audyt kluczowych podstron i ofert","Poprawa struktury nagłówków i CTA","Usprawnienie szybkości oraz wersji mobilnej"],
      next:["Uporządkowanie treści i sekcji zaufania","Wdrożenie SEO starter + analityki","Rozszerzenie o funkcje niezbędne do pozyskania zapytań"],
      later:["Rozwój treści (blog/case studies)","Automatyzacje i dalsza optymalizacja konwersji","Skalowanie architektury i wersji językowych"]
    };
    const risks = [];
    if (a.copyReady !== "yes") risks.push("Brak gotowych tekstów może opóźnić wdrożenie i rundy poprawek.");
    if (a.decisionReady !== "yes") risks.push("Brak jasnej decyzyjności zwiększa ryzyko chaosu akceptacyjnego.");
    if (a.offerReady === "no") risks.push("Niejasna oferta może obniżyć konwersję nawet po odświeżeniu designu.");
    if (a.problems.includes("noSeo")) risks.push("Brak podstaw SEO ograniczy widoczność organiczną po wdrożeniu.");
    if (a.features.length > 7) risks.push("Zbyt szeroki zakres funkcji na start podniesie koszt i złożoność projektu.");
    const nextActions = [
      "Uporządkuj listę usług i najważniejsze informacje dla klienta.",
      "Przygotuj dostęp do domeny, hostingu i aktualnych kont technicznych.",
      "Zbierz materiały: teksty, zdjęcia, logo, referencje.",
      "Wybierz funkcje obowiązkowe dla pierwszej wersji strony.",
      "Przygotuj krótką notatkę projektową dla wykonawcy."
    ];
    return { condition, readiness, urgency, path, roadmap, risks, nextActions };
  };

  const renderResult = (r) => {
    resultSection.hidden = false;
    resultSection.innerHTML = `<h2>Rekomendacja: ${r.path}</h2>
      <p>To plan orientacyjny oparty na Twoich odpowiedziach. Pomaga ustalić priorytety przed realizacją.</p>
      <div class="result-card-grid">
        <article class="metric"><h3>Stan strony</h3><p><strong>${r.condition}/100</strong></p></article>
        <article class="metric"><h3>Gotowość projektu</h3><p><strong>${r.readiness}/100</strong></p></article>
        <article class="metric"><h3>Priorytet działań</h3><p><strong>${r.urgency}</strong></p></article>
      </div>
      <div class="roadmap-columns">
        <article class="metric"><h3>Teraz</h3><ul class="roadmap-list">${r.roadmap.teraz.map((i)=>`<li>${i}</li>`).join("")}</ul></article>
        <article class="metric"><h3>Następny etap</h3><ul class="roadmap-list">${r.roadmap.next.map((i)=>`<li>${i}</li>`).join("")}</ul></article>
        <article class="metric"><h3>Później</h3><ul class="roadmap-list">${r.roadmap.later.map((i)=>`<li>${i}</li>`).join("")}</ul></article>
      </div>
      <article class="metric"><h3>Ryzyka</h3><ul class="risk-list">${r.risks.map((i)=>`<li>${i}</li>`).join("") || "<li>Brak krytycznych ryzyk na tym etapie.</li>"}</ul></article>
      <article class="metric"><h3>Następne kroki</h3><ul class="next-list">${r.nextActions.map((i)=>`<li>${i}</li>`).join("")}</ul></article>
      <p><small>Uwaga: to narzędzie edukacyjno-planistyczne, nie zastępuje pełnego audytu technicznego.</small></p>
      <div class="result__actions">
        <button class="btn btn--ghost" type="button" id="copyBtn">Kopiuj podsumowanie</button>
        <button class="btn btn--ghost" type="button" id="printBtn">Drukuj / eksportuj PDF</button>
        <button class="btn btn--primary" type="button" id="restartBtn">Zacznij od nowa</button>
        <span id="resultFeedback" aria-live="polite"></span>
      </div>`;

    document.querySelector("#copyBtn").addEventListener("click", async () => {
      const text = `Generator roadmapy ulepszenia strony internetowej\nRekomendacja: ${r.path}\nStan strony: ${r.condition}/100\nGotowość projektu: ${r.readiness}/100\nPriorytet: ${r.urgency}\n\nRoadmapa:\nTERAZ:\n- ${r.roadmap.teraz.join("\n- ")}\nNASTĘPNY ETAP:\n- ${r.roadmap.next.join("\n- ")}\nPÓŹNIEJ:\n- ${r.roadmap.later.join("\n- ")}\n\nRyzyka:\n- ${(r.risks.join("\n- ") || "Brak krytycznych ryzyk") }\n\nNastępne kroki:\n- ${r.nextActions.join("\n- ")}\n\nUwaga: Narzędzie ma charakter edukacyjno-planistyczny.`;
      const feedback = document.querySelector("#resultFeedback");
      try { await navigator.clipboard.writeText(text); feedback.textContent = "Podsumowanie skopiowane."; }
      catch { feedback.textContent = "Nie udało się skopiować. Skopiuj ręcznie z ekranu."; }
    });
    document.querySelector("#printBtn").addEventListener("click", () => window.print());
    document.querySelector("#restartBtn").addEventListener("click", () => {
      form.reset(); state.step = 1; resultSection.hidden = true; resultSection.innerHTML = ""; renderStep(); window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  form.addEventListener("change", renderStep);
  prevBtn.addEventListener("click", () => { if (state.step > 1) state.step--; renderStep(); });
  nextBtn.addEventListener("click", () => {
    if (!stepValid()) { validationMessage.textContent = "Uzupełnij wymagane pola, aby przejść dalej."; return; }
    if (state.step < config.totalSteps) state.step++; renderStep();
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!stepValid()) { validationMessage.textContent = "Uzupełnij wymagane pola przed wygenerowaniem roadmapy."; return; }
    const result = computeResult(collectAnswers());
    renderResult(result);
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  renderStep();
});
