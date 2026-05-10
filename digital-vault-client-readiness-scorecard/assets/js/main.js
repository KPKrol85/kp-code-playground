(() => {
  const STORAGE_KEY = "kp_dv_client_readiness_scorecard_v1";
  const MAX_SCORE = 80;
  const SCALE_TEXT = ["Not ready", "Partially ready", "Ready"];

  const categories = [
    ["Business Clarity", ["Website goal is clearly defined", "Main offer is defined", "Target audience is specific", "Primary user action is clear", "Unique selling points are documented"]],
    ["Content Readiness", ["Core page copy is available", "Service/product descriptions are ready", "Company/contact information is finalized", "Legal content requirements are understood", "Content approval owner is defined"]],
    ["Brand & Visual Assets", ["Usable logo files are available", "Brand colors/fonts or visual direction exists", "Photos/graphics are provided", "Reference websites are shared", "Desired brand style is clearly described"]],
    ["Technical Access", ["Domain access is available", "Hosting access is available", "Business email access is available", "Analytics/Search Console/Tag Manager access is available if applicable", "Technical owner and responsibilities are clear"]],
    ["Decision-Making", ["Final decision maker is confirmed", "Stakeholder count is controlled", "Feedback is consolidated", "Approval stages are defined", "Decision makers are available for responses"]],
    ["Budget & Scope Fit", ["Budget is realistic for requested outcome", "Project scope is understood", "Extra features and cost impact are understood", "Payment terms are accepted", "MVP vs full-system expectations are aligned"]],
    ["Timeline Readiness", ["Deadline is realistic", "Required materials will be ready before start", "Dependencies across content, feedback, and delivery are understood", "Known blockers are identified", "Timeline includes revision buffer"]],
    ["Communication Quality", ["Client gives clear answers", "Client respects communication channels", "Client can explain expectations", "Client is open to expert recommendations", "Client understands their project role"]]
  ];

  const recommendationsMap = {
    "Content Readiness": "Collect page copy, service descriptions, legal content, and contact information before scheduling development.",
    "Technical Access": "Request domain, hosting, email, analytics, and existing website access before migration or deployment planning.",
    "Budget & Scope Fit": "Clarify scope boundaries and create a written feature list before presenting the final estimate.",
    "Decision-Making": "Confirm the final decision maker, feedback process, and approval stages before starting production work.",
    "Timeline Readiness": "Adjust the timeline and add a realistic buffer for content delivery, feedback, revisions, and deployment.",
    "Business Clarity": "Run a short discovery session to lock in the website goal, audience, value proposition, and conversion objective.",
    "Brand & Visual Assets": "Collect logo files, visual references, and clear style direction to prevent design misalignment during production.",
    "Communication Quality": "Set communication rules, response windows, and ownership expectations in writing before kickoff."
  };

  const els = {
    categories: document.getElementById("scorecard-categories"), scoreTotal: document.getElementById("scoreTotal"),
    scorePercent: document.getElementById("scorePercent"), status: document.getElementById("readinessStatus"),
    statusMessage: document.getElementById("statusMessage"), progressBar: document.getElementById("progressBar"),
    strongest: document.getElementById("strongestCategories"), weakest: document.getElementById("weakestCategories"),
    quickRecs: document.getElementById("quickRecommendations"), report: document.getElementById("reportOutput"),
    announcer: document.getElementById("liveAnnouncer"), form: document.getElementById("project-info-form"),
    copyBtn: document.getElementById("copyReportBtn"), printBtn: document.getElementById("printReportBtn"),
    saveBtn: document.getElementById("saveLocalBtn"), resetBtn: document.getElementById("resetBtn")
  };

  const getStatus = (pct) => pct <= 39 ? ["High Risk Client", "This client is not ready to start. Clarify scope, collect materials, and resolve major blockers before committing to delivery."]
    : pct <= 69 ? ["Needs Preparation", "The project can move forward only after key preparation tasks are completed."]
    : pct <= 84 ? ["Almost Ready", "The client is mostly ready, but a few risks should be resolved before production work begins."]
    : ["Ready to Start", "The client is ready to start. Scope, materials, decisions, and communication are in a healthy state."];

  function renderCategories() {
    els.categories.innerHTML = "";
    categories.forEach(([name, questions], catIndex) => {
      const card = document.createElement("fieldset");
      card.className = "category";
      card.innerHTML = `<legend><strong>${name}</strong></legend>`;
      questions.forEach((q, qIndex) => {
        const idBase = `cat-${catIndex}-q-${qIndex}`;
        const wrapper = document.createElement("div");
        wrapper.className = "question";
        wrapper.innerHTML = `<p>${q}</p><div class="score-options">${[0,1,2].map(val => `<label><input type="radio" name="${idBase}" value="${val}"> ${val} - ${SCALE_TEXT[val]}</label>`).join("")}</div>`;
        card.appendChild(wrapper);
      });
      els.categories.appendChild(card);
    });
  }

  function getAnswers() {
    const answers = {};
    categories.forEach(([, questions], c) => {
      questions.forEach((_, q) => {
        const picked = document.querySelector(`input[name="cat-${c}-q-${q}"]:checked`);
        answers[`cat-${c}-q-${q}`] = picked ? Number(picked.value) : 0;
      });
    });
    return answers;
  }

  function getProjectInfo() {
    const fd = new FormData(els.form);
    return Object.fromEntries(fd.entries());
  }

  function calculateState() {
    const answers = getAnswers();
    const byCategory = categories.map(([name, questions], c) => {
      const score = questions.reduce((sum, _, q) => sum + (answers[`cat-${c}-q-${q}`] || 0), 0);
      return { name, score, max: questions.length * 2, pct: Math.round((score / (questions.length * 2)) * 100) };
    });
    const total = byCategory.reduce((s, c) => s + c.score, 0);
    const pct = Math.round((total / MAX_SCORE) * 100);
    return { byCategory, total, pct, info: getProjectInfo() };
  }

  function asList(container, items, formatter) {
    container.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = formatter(item);
      container.appendChild(li);
    });
  }

  function generateRecommendations(byCategory) {
    const sorted = [...byCategory].sort((a, b) => a.pct - b.pct);
    const weak = sorted.filter((c) => c.pct < 70);
    const pool = (weak.length ? weak : sorted.slice(0, 3)).map((c) => recommendationsMap[c.name]).filter(Boolean);
    return Array.from(new Set(pool)).slice(0, Math.max(3, Math.min(5, pool.length || 3)));
  }

  function generateReport(state) {
    const [status, message] = getStatus(state.pct);
    const date = new Date().toLocaleDateString();
    const recs = generateRecommendations(state.byCategory);
    const risks = state.byCategory.filter((c) => c.pct < 50).map((c) => `${c.name} (${c.score}/${c.max})`);
    const info = state.info;
    return [
      "Client Readiness Scorecard",
      `Assessment date: ${date}`,
      `Client name: ${info.clientName || "Not provided"}`,
      `Project name: ${info.projectName || "Not provided"}`,
      `Website type: ${info.websiteType || "Not provided"}`,
      `Planned start date: ${info.plannedStartDate || "Not provided"}`,
      `Estimated budget: ${info.estimatedBudget || "Not provided"}`,
      `Decision maker: ${info.decisionMaker || "Not provided"}`,
      "",
      `Final score: ${state.total}/${MAX_SCORE} (${state.pct}%)`,
      `Readiness status: ${status}`,
      `${message}`,
      "",
      "Category scores:",
      ...state.byCategory.map((c) => `- ${c.name}: ${c.score}/${c.max} (${c.pct}%)`),
      "",
      "Main risks:",
      ...(risks.length ? risks.map((r) => `- ${r}`) : ["- No severe risk categories detected."]),
      "",
      "Recommended next steps:",
      ...recs.map((r) => `- ${r}`),
      "",
      `Freelancer notes: ${info.freelancerNotes || "No notes provided."}`
    ].join("\n");
  }

  function updateUI() {
    const state = calculateState();
    const [status, message] = getStatus(state.pct);
    els.scoreTotal.textContent = `${state.total} / ${MAX_SCORE}`;
    els.scorePercent.textContent = `${state.pct}%`;
    els.status.textContent = status;
    els.statusMessage.textContent = message;
    els.progressBar.style.width = `${state.pct}%`;

    const sorted = [...state.byCategory].sort((a, b) => b.pct - a.pct);
    asList(els.strongest, sorted.slice(0, 3), (c) => `${c.name} (${c.pct}%)`);
    asList(els.weakest, [...sorted].reverse().slice(0, 3), (c) => `${c.name} (${c.pct}%)`);
    asList(els.quickRecs, generateRecommendations(state.byCategory).slice(0, 3), (r) => r);

    const report = generateReport(state);
    els.report.textContent = report;
    els.announcer.textContent = `Score updated: ${state.pct}% - ${status}`;
  }

  function saveLocal() {
    const payload = { info: getProjectInfo(), answers: getAnswers() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  function loadLocal() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (data.info) {
        Object.entries(data.info).forEach(([k, v]) => {
          const field = document.getElementById(k);
          if (field) field.value = v;
        });
      }
      if (data.answers) {
        Object.entries(data.answers).forEach(([name, val]) => {
          const input = document.querySelector(`input[name="${name}"][value="${val}"]`);
          if (input) input.checked = true;
        });
      }
    } catch (_e) {}
  }

  function resetAll() {
    if (!window.confirm("Reset the full assessment and clear saved local data?")) return;
    els.form.reset();
    document.querySelectorAll('input[type="radio"]').forEach((el) => { el.checked = false; });
    localStorage.removeItem(STORAGE_KEY);
    updateUI();
  }

  function bindEvents() {
    document.getElementById("app").addEventListener("change", updateUI);
    document.getElementById("app").addEventListener("input", updateUI);
    els.saveBtn.addEventListener("click", () => { saveLocal(); updateUI(); });
    els.copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(els.report.textContent || "");
        els.announcer.textContent = "Report copied to clipboard.";
      } catch (_e) {
        els.announcer.textContent = "Clipboard copy failed. Select and copy report manually.";
      }
    });
    els.printBtn.addEventListener("click", () => window.print());
    els.resetBtn.addEventListener("click", resetAll);
  }

  renderCategories();
  loadLocal();
  bindEvents();
  updateUI();
})();
