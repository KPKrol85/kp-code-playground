const form = document.getElementById("onboarding-form");
const outputs = {
  readiness: document.getElementById("readiness-score"),
  summary: document.getElementById("summary-output"),
  firstStep: document.getElementById("first-step-output"),
  weekPlan: document.getElementById("week-plan-output"),
  missingAssets: document.getElementById("missing-assets-output"),
  questions: document.getElementById("questions-output"),
  risks: document.getElementById("risk-output"),
  preparation: document.getElementById("preparation-output"),
  communication: document.getElementById("communication-output"),
  email: document.getElementById("email-output"),
  copyStatus: document.getElementById("copy-status")
};

const config = {
  projectTypes: {
    businessWebsite: "business website",
    landingPage: "landing page",
    wordpress: "WordPress website",
    seoStarter: "SEO starter package",
    redesign: "website redesign",
    customProject: "custom web project"
  },
  scores: {
    contentStatus: { ready: 18, partial: 10, missing: 2 },
    brandingStatus: { ready: 15, partial: 8, missing: 2 },
    domainStatus: { ready: 14, needsSetup: 7, unknown: 2 },
    budgetClarity: { clear: 16, rough: 9, unclear: 2 },
    decisionSpeed: { fast: 14, normal: 9, slow: 2 },
    complexity: { simple: 13, standard: 9, premium: 4 },
    urgency: { relaxed: 10, standard: 7, urgent: 1 }
  },
  labels: [
    { min: 80, label: "Ready to start" },
    { min: 55, label: "Needs clarification" },
    { min: 30, label: "High-risk onboarding" },
    { min: 0, label: "Not ready yet" }
  ],
  riskMessages: {
    missing: "Core assets are missing and will likely stall execution unless delivery dates are locked.",
    unknownDomain: "Domain and hosting ownership are unclear; access delays can block launch timelines.",
    unclearBudget: "Budget is unclear, which increases revision cycles and scope disputes.",
    slowDecision: "Client decision speed is slow/unclear and may create bottlenecks in approvals.",
    urgent: "Urgent timeline requires tighter sign-off windows and daily checkpoint discipline.",
    premium: "Premium complexity needs stricter architecture approvals and milestone-based scope control."
  },
  communication: {
    email: "Use weekly summary emails with clear action owners and deadlines.",
    call: "Run a kickoff + twice-weekly call cadence with documented decisions after each call.",
    asyncDocs: "Centralize requirements in async docs with due dates and comment-based approvals.",
    mixed: "Use mixed comms: kickoff call, then async docs + email summaries for execution clarity."
  }
};

const listFrom = (items) => items.map((item) => `<li>${item}</li>`).join("");
const scoreLabel = (score) => config.labels.find((entry) => score >= entry.min).label;

function getState() {
  return Object.fromEntries(new FormData(form).entries());
}

function calculateScore(state) {
  return Math.max(0, Math.min(100,
    config.scores.contentStatus[state.contentStatus]
    + config.scores.brandingStatus[state.brandingStatus]
    + config.scores.domainStatus[state.domainStatus]
    + config.scores.budgetClarity[state.budgetClarity]
    + config.scores.decisionSpeed[state.decisionSpeed]
    + config.scores.complexity[state.complexity]
    + config.scores.urgency[state.urgency]
  ));
}

function generatePlan(state) {
  const projectName = config.projectTypes[state.projectType];
  const score = calculateScore(state);
  const label = scoreLabel(score);
  const missingAssets = [];
  const risks = [];

  if (state.contentStatus !== "ready") missingAssets.push("Final page content (headlines, copy, CTAs, legal text)");
  if (state.brandingStatus !== "ready") missingAssets.push("Brand kit (logo files, typography, color palette, voice guidelines)");
  if (state.domainStatus !== "ready") missingAssets.push("Domain + hosting access credentials and account ownership details");
  if (state.integrationNeeds !== "none") missingAssets.push(`Integration inputs for ${state.integrationNeeds} (platform access, fields, destinations)`);

  if (state.contentStatus === "missing" || state.brandingStatus === "missing") risks.push(config.riskMessages.missing);
  if (state.domainStatus === "unknown") risks.push(config.riskMessages.unknownDomain);
  if (state.budgetClarity === "unclear") risks.push(config.riskMessages.unclearBudget);
  if (state.decisionSpeed === "slow") risks.push(config.riskMessages.slowDecision);
  if (state.urgency === "urgent") risks.push(config.riskMessages.urgent);
  if (state.complexity === "premium") risks.push(config.riskMessages.premium);
  if (!risks.length) risks.push("No critical risks detected. Maintain milestone confirmations to keep scope stable.");

  const questions = [
    "What business outcome should this project improve in the first 60 days after launch?",
    "Who is the final approver for scope, design decisions, and timeline sign-off?",
    "What existing assets or systems must be reused, migrated, or retired?",
    `What is the acceptable go-live date given the ${state.urgency} urgency level?`
  ];

  const weekPlan = [
    "Day 1: Confirm project scope, success metrics, and decision hierarchy in writing.",
    "Day 2: Collect missing assets and access credentials; validate ownership.",
    "Day 3: Build implementation brief with sitemap/feature priorities and dependencies.",
    "Day 4: Approve timeline, communication cadence, and review windows.",
    "Day 5: Lock milestone one deliverables and acceptance criteria.",
    "Day 6: Validate integration/data constraints and fallback plans.",
    "Day 7: Send kickoff summary with confirmed next actions and deadlines."
  ];

  const preparation = score >= 80
    ? "Execution-ready. Minimal blockers; proceed directly to milestone planning."
    : score >= 55
      ? "Mostly ready, but clarify ownership, asset gaps, and scope assumptions before build starts."
      : score >= 30
        ? "High setup risk. Pause production tasks until baseline assets and approval flow are secured."
        : "Not ready for delivery. Establish business goals, budget, and operating constraints first.";

  const firstStep = missingAssets.length
    ? "Launch an asset-and-access sprint before any production work begins."
    : "Run a kickoff alignment session and immediately lock milestone one.";

  const email = `Subject: Kickoff plan for your ${projectName}\n\nHi there,\n\nGreat to get started on your ${projectName}. Based on our onboarding intake, I've mapped a focused first-week setup plan so we can move fast without avoidable blockers.\n\nWhat we'll do first:\n- ${firstStep}\n- Confirm decision owners, deadlines, and communication rhythm\n- Finalize priorities for week one outcomes\n\nCurrent preparation level: ${label} (${score}/100).\n\nPlease reply with any missing assets/access details and I'll send the finalized kickoff schedule immediately.\n\nBest,\nYour KP_Code Digital Vault partner`;

  return {
    score,
    label,
    summary: `This ${projectName} onboarding is currently rated ${label.toLowerCase()} with a readiness score of ${score}/100. The setup suggests ${state.complexity} complexity and ${state.urgency} urgency, so timeline control and decision clarity should be prioritized from day one.`,
    firstStep,
    weekPlan,
    missingAssets: missingAssets.length ? missingAssets : ["No critical missing assets identified from current inputs."],
    questions,
    risks,
    preparation,
    communication: config.communication[state.communicationPref],
    email
  };
}

function render() {
  const plan = generatePlan(getState());
  outputs.readiness.textContent = `Readiness score: ${plan.score}/100 — ${plan.label}`;
  outputs.summary.textContent = plan.summary;
  outputs.firstStep.textContent = plan.firstStep;
  outputs.weekPlan.innerHTML = listFrom(plan.weekPlan);
  outputs.missingAssets.innerHTML = listFrom(plan.missingAssets);
  outputs.questions.innerHTML = listFrom(plan.questions);
  outputs.risks.innerHTML = plan.risks.map((item) => `<li class="risk-item">${item}</li>`).join("");
  outputs.preparation.textContent = plan.preparation;
  outputs.communication.textContent = plan.communication;
  outputs.email.textContent = plan.email;
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    outputs.copyStatus.textContent = successMessage;
  } catch {
    outputs.copyStatus.textContent = "Copy failed. Please copy manually from the panel.";
  }
}

document.getElementById("copy-email-btn").addEventListener("click", () => {
  copyText(outputs.email.textContent, "Welcome email copied to clipboard.");
});

document.getElementById("copy-plan-btn").addEventListener("click", () => {
  const fullPlan = [
    outputs.readiness.textContent,
    `Summary: ${outputs.summary.textContent}`,
    `First step: ${outputs.firstStep.textContent}`,
    `Week plan:\n${[...outputs.weekPlan.children].map((li, i) => `${i + 1}. ${li.textContent}`).join("\n")}`,
    `Missing assets:\n${[...outputs.missingAssets.children].map((li) => `- ${li.textContent}`).join("\n")}`,
    `Questions:\n${[...outputs.questions.children].map((li) => `- ${li.textContent}`).join("\n")}`,
    `Risk warnings:\n${[...outputs.risks.children].map((li) => `- ${li.textContent}`).join("\n")}`,
    `Preparation level: ${outputs.preparation.textContent}`,
    `Communication approach: ${outputs.communication.textContent}`
  ].join("\n\n");

  copyText(fullPlan, "Full onboarding plan copied to clipboard.");
});

form.addEventListener("input", render);
form.addEventListener("reset", () => {
  setTimeout(() => {
    outputs.copyStatus.textContent = "Inputs reset to default values.";
    render();
  }, 0);
});

render();
