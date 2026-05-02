const CONFIG = {
  projectType: ["landing page", "business website", "WordPress website", "ecommerce/store", "redesign", "custom web project"],
  websiteStatus: ["ready for launch", "launched", "needs final review", "waiting for client approval"],
  cmsIncluded: ["none", "WordPress", "custom CMS", "other"],
  formsIncluded: ["none", "contact form", "booking form", "newsletter form", "multiple forms"],
  hostingDomain: ["client-owned and configured", "developer-managed setup", "needs transfer", "unclear"],
  analyticsTracking: ["none", "basic analytics", "Google Search Console", "analytics + Search Console", "custom tracking"],
  seoScope: ["none", "basic technical SEO", "metadata + sitemap", "local SEO basics", "extended SEO setup"],
  maintenancePlan: ["no care plan", "basic monthly care", "standard care plan", "premium care plan", "to be discussed"],
  clientTechLevel: ["beginner", "intermediate", "experienced"],
  projectComplexity: ["simple", "standard", "advanced", "premium"],
  assets: ["logo files", "optimized images", "brand colors", "fonts", "copy/content", "documentation files"]
};

const WEIGHTS = {
  websiteStatus: { "ready for launch": 14, launched: 16, "needs final review": 9, "waiting for client approval": 5 },
  hostingDomain: { "client-owned and configured": 14, "developer-managed setup": 11, "needs transfer": 6, unclear: 3 },
  cmsIncluded: { none: 9, WordPress: 8, "custom CMS": 7, other: 7 },
  formsIncluded: { none: 10, "contact form": 9, "booking form": 8, "newsletter form": 9, "multiple forms": 7 },
  analyticsTracking: { none: 5, "basic analytics": 9, "Google Search Console": 8, "analytics + Search Console": 11, "custom tracking": 10 },
  seoScope: { none: 5, "basic technical SEO": 8, "metadata + sitemap": 10, "local SEO basics": 9, "extended SEO setup": 11 },
  maintenancePlan: { "no care plan": 5, "basic monthly care": 9, "standard care plan": 11, "premium care plan": 12, "to be discussed": 6 },
  clientTechLevel: { beginner: 7, intermediate: 10, experienced: 11 },
  projectComplexity: { simple: 11, standard: 10, advanced: 8, premium: 7 }
};

const LABELS = [
  { min: 85, label: "Ready to hand off", note: "Delivery conditions are clear with minimal operational risk." },
  { min: 65, label: "Minor handoff gaps", note: "Most items are covered; close a few gaps before final transfer." },
  { min: 40, label: "Needs handoff cleanup", note: "Important access, training, or scope details need clarification." },
  { min: 0, label: "Not ready for handoff", note: "Handoff carries high risk and should not proceed yet." }
];

const form = document.getElementById("handoff-form");
const output = document.getElementById("handoffOutput");
const scoreEl = document.getElementById("readinessScore");
const labelEl = document.getElementById("readinessLabel");
const explanationEl = document.getElementById("scoreExplanation");
const copyStatus = document.getElementById("copyStatus");

function setupSelect(id, options) {
  const select = document.getElementById(id);
  options.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function setupAssets() {
  const wrapper = document.getElementById("includedAssets");
  CONFIG.assets.forEach((asset) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "assets";
    input.value = asset;
    label.append(input, ` ${asset}`);
    wrapper.appendChild(label);
  });
}

function getState() {
  const state = Object.fromEntries(new FormData(form).entries());
  state.assets = Array.from(form.querySelectorAll('input[name="assets"]:checked')).map((node) => node.value);
  return state;
}

function scoreHandoff(state) {
  const keys = ["websiteStatus", "hostingDomain", "cmsIncluded", "formsIncluded", "analyticsTracking", "seoScope", "maintenancePlan", "clientTechLevel", "projectComplexity"];
  const score = keys.reduce((acc, key) => acc + (WEIGHTS[key][state[key]] || 0), 0);
  return Math.max(0, Math.min(100, score));
}

function buildChecklist(state) {
  const needsTransfer = state.hostingDomain === "needs transfer" || state.hostingDomain === "unclear";
  const isBeginner = state.clientTechLevel === "beginner";
  const hasCms = state.cmsIncluded !== "none";

  return {
    summary: `${state.projectType} handoff for a ${state.projectComplexity} delivery, currently marked as ${state.websiteStatus}.`,
    delivery: [
      `Status confirmed: ${state.websiteStatus}`,
      `Hosting/domain: ${state.hostingDomain}`,
      `CMS: ${state.cmsIncluded}`,
      `Maintenance: ${state.maintenancePlan}`
    ],
    finalChecklist: [
      "Final QA pass completed on responsive layouts and core pages",
      "Backup/export package stored and shared",
      "All agreed revisions included in final scope",
      hasCms ? "CMS login and role permissions reviewed" : "Static site deployment notes shared"
    ],
    access: [
      "Domain registrar ownership documented",
      "Hosting access documented with recovery email",
      "Admin accounts listed with role and owner",
      needsTransfer ? "Transfer timeline and steps included" : "No transfer blockers identified"
    ],
    instructions: [
      isBeginner ? "Provide a simple 10-minute walkthrough video + PDF quickstart" : "Provide concise admin guide with key update flows",
      `Form handling guidance for: ${state.formsIncluded}`,
      `Analytics and reporting explanation for: ${state.analyticsTracking}`,
      `SEO maintenance notes based on: ${state.seoScope}`
    ],
    postLaunch: [
      "Verify SSL, redirects, and DNS propagation",
      "Test all forms and confirmation routing",
      "Run indexability check on critical URLs",
      "Confirm analytics events are receiving traffic"
    ],
    days30: [
      "Week 1: monitor form submissions, uptime, and broken links",
      "Week 2: review top landing pages and adjust CTA messaging",
      "Week 3: tune metadata and headings based on early search behavior",
      "Week 4: present performance summary and next-step roadmap"
    ],
    carePlan: `Recommended note: ${state.maintenancePlan === "no care plan" ? "Offer a lightweight monthly stability plan to reduce client risk." : `Reinforce ${state.maintenancePlan} inclusions and reporting cadence.`}`,
    exclusions: [
      "New feature development outside approved scope",
      "Third-party outages or paid platform billing issues",
      "Emergency support not included unless contracted",
      "Content entry beyond delivered pages unless specified"
    ]
  };
}

function buildEmail(state, scoreLabel) {
  return `Subject: Project Handoff Package – ${state.projectType}\n\nHi Client,\n\nYour ${state.projectType} is now in handoff phase (${state.websiteStatus}).\n\nThis package includes delivery notes, ownership/access details, post-launch checks, and 30-day recommendations.\n\nTechnical profile\n- CMS: ${state.cmsIncluded}\n- Forms: ${state.formsIncluded}\n- Analytics: ${state.analyticsTracking}\n- SEO scope: ${state.seoScope}\n- Hosting/domain status: ${state.hostingDomain}\n\nHandoff readiness: ${scoreLabel}\n\nPlease review the checklist and confirm any outstanding approvals so we can finalize transfer and support boundaries.\n\nBest,\n[Your Name / Studio]\nKP_Code Digital Vault`;}

function render() {
  const state = getState();
  const score = scoreHandoff(state);
  const labelObj = LABELS.find((item) => score >= item.min);
  const pack = buildChecklist(state);
  const emailText = buildEmail(state, labelObj.label);

  scoreEl.textContent = String(score);
  labelEl.textContent = labelObj.label;
  explanationEl.textContent = labelObj.note;

  output.innerHTML = `
    <section><h3>Handoff summary</h3><p>${pack.summary}</p></section>
    <section><h3>Project delivery status</h3><ul>${pack.delivery.map((x) => `<li>${x}</li>`).join("")}</ul></section>
    <section><h3>Final handoff checklist</h3><ul>${pack.finalChecklist.map((x) => `<li>${x}</li>`).join("")}</ul></section>
    <section><h3>Access and ownership checklist</h3><ul>${pack.access.map((x) => `<li>${x}</li>`).join("")}</ul></section>
    <section><h3>Client instruction notes</h3><ul>${pack.instructions.map((x) => `<li>${x}</li>`).join("")}</ul></section>
    <section><h3>Post-launch verification checklist</h3><ul>${pack.postLaunch.map((x) => `<li>${x}</li>`).join("")}</ul></section>
    <section><h3>First 30-day recommendations</h3><ul>${pack.days30.map((x) => `<li>${x}</li>`).join("")}</ul></section>
    <section><h3>Suggested maintenance/care-plan note</h3><p>${pack.carePlan}</p></section>
    <section><h3>Exclusions and boundaries</h3><ul>${pack.exclusions.map((x) => `<li>${x}</li>`).join("")}</ul></section>
    <section><h3>Ready-to-copy project handoff email</h3><pre id="emailText">${emailText}</pre></section>
  `;
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = message;
  } catch {
    copyStatus.textContent = "Copy failed. Please copy manually.";
  }
}

Object.keys(CONFIG).forEach((key) => {
  if (key !== "assets") setupSelect(key, CONFIG[key]);
});
setupAssets();
form.addEventListener("input", render);
form.addEventListener("reset", () => {
  setTimeout(() => {
    copyStatus.textContent = "Form reset to default values.";
    render();
  }, 0);
});

document.getElementById("copyEmailBtn").addEventListener("click", () => {
  const email = document.getElementById("emailText")?.textContent || "";
  copyText(email, "Handoff email copied.");
});

document.getElementById("copyPackBtn").addEventListener("click", () => {
  copyText(output.innerText, "Full handoff pack copied.");
});

render();
