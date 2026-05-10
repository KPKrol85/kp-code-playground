const STORAGE_KEY = "kpcode_project_health_monitor_v1";

const healthCategories = [
  ["communication", "Communication Health", ["Is the client responding within the agreed timeframe?", "Are client answers clear enough to proceed?", "Are agreed communication channels being used consistently?", "Is feedback consolidated instead of fragmented?", "Is communication ownership clear on both sides?"]],
  ["content", "Content & Asset Delivery", ["Has core website copy been delivered?", "Have required images, graphics, logos, and brand assets been delivered?", "Are provided materials complete and usable?", "Is legal content ready (if applicable)?", "Are missing materials not blocking the next stage?"]],
  ["scope", "Scope Control", ["Is current work aligned with the agreed scope?", "Are new requests documented?", "Are out-of-scope items clearly understood?", "Are changes approved before implementation?", "Is scope creep under control?"]],
  ["timeline", "Timeline & Milestones", ["Is the current phase on schedule?", "Is the next milestone realistic?", "Are delays documented and acknowledged?", "Is the launch deadline still realistic?", "Is there enough revision buffer?"]],
  ["feedback", "Feedback Quality", ["Is feedback specific and actionable?", "Is stakeholder feedback consolidated?", "Does feedback align with project goals?", "Are contradictory decisions avoided?", "Are direction changes controlled?"]],
  ["payment", "Payment & Agreement Health", ["Has the deposit been paid?", "Are milestone payments up to date?", "Is additional work billing being handled properly?", "Are collaboration terms clear and respected?", "Are overdue payments not blocking work?"]],
  ["technical", "Technical Delivery Health", ["Is the technical environment ready?", "Are required access credentials available (domain/hosting/CMS/repo/forms)?", "Are integration requirements clear?", "Are technical blockers documented and tracked?", "Is deployment risk under control?"]],
  ["decision", "Client Decision Health", ["Is the decision maker available when needed?", "Are decisions made in a timely manner?", "Are changes formally approved?", "Are stakeholder conflicts minimal?", "Can stages be closed without repeated rework?"]],
  ["launch", "Launch Readiness", ["Is core content accepted?", "Is QA planning ready?", "Are forms and tracking checks prepared?", "Are legal/privacy/cookie requirements ready?", "Does the client understand post-launch responsibilities?"]]
].map(([id, title, questions]) => ({ id, title, questions }));

const riskMap = {
  communication: "Communication delay risk detected. Confirm response expectations, decision ownership, and the main communication channel.",
  content: "Content blocker detected. Request missing copy, images, legal content, or assets before the next milestone.",
  scope: "Scope creep risk detected. Document new requests and confirm whether they are included, deferred, or billed separately.",
  timeline: "Timeline risk detected. Update the schedule based on current delays and add a realistic buffer for revisions.",
  feedback: "Feedback chaos risk detected. Ask the client to consolidate feedback into one clear approval message.",
  payment: "Payment risk detected. Confirm outstanding payments before continuing non-critical production work.",
  technical: "Technical access risk detected. Confirm domain, hosting, CMS, repository, form, or deployment access before launch planning.",
  decision: "Decision bottleneck detected. Confirm the final decision maker and approval process before closing the next stage.",
  launch: "Launch readiness risk detected. Complete QA, content approval, legal checks, forms, tracking, and handoff planning before launch."
};

const actionLibrary = {
  communication: "Send a short project status update to the client.", content: "Request all missing content in one structured checklist.",
  scope: "Freeze the current scope before continuing production work.", timeline: "Update the timeline based on client-side delays.",
  feedback: "Ask the client to consolidate feedback in one message.", payment: "Pause non-critical work until payment is resolved.", technical: "Confirm launch responsibilities and technical access.", decision: "Confirm the final decision maker.", launch: "Prepare a pre-launch QA checklist."
};
const statusBands = [
  { max: 39, label: "Critical", message: "The project requires immediate attention. Major blockers, scope issues, payment problems, or decision risks should be resolved before continuing normal production work." },
  { max: 64, label: "At Risk", message: "The project has serious risks. Clarify blockers, responsibilities, priorities, and next steps before moving further." },
  { max: 84, label: "Watch", message: "The project is mostly under control, but several areas need attention before the next milestone or launch." },
  { max: 100, label: "Healthy", message: "The project is stable. Communication, scope, timeline, decisions, and delivery are in a healthy state." }
];

const el = (id) => document.getElementById(id);
const assessment = el("assessment-categories");
const summary = el("live-summary");
const reportOut = el("health-report");
const clientOut = el("client-update");
const statusOut = el("action-status");

function renderCategories() {
  assessment.innerHTML = healthCategories.map((cat) => `
    <fieldset class="category" data-cat="${cat.id}">
      <legend><strong>${cat.title}</strong> <span class="small">(0 problem • 1 attention • 2 healthy)</span></legend>
      ${cat.questions.map((q, i) => `
      <div class="question">
        <p>${i + 1}. ${q}</p>
        <label><input type="radio" name="${cat.id}-${i}" value="0" checked> 0</label>
        <label><input type="radio" name="${cat.id}-${i}" value="1"> 1</label>
        <label><input type="radio" name="${cat.id}-${i}" value="2"> 2</label>
      </div>`).join("")}
    </fieldset>`).join("");
}

function snapshotData() { return Object.fromEntries(new FormData(el("snapshot-form")).entries()); }
function val(name){ const checked = document.querySelector(`input[name="${name}"]:checked`); return checked ? Number(checked.value) : 0; }

function computeState() {
  const snapshot = snapshotData();
  const categoryScores = healthCategories.map((cat) => {
    const score = cat.questions.reduce((t, _, i) => t + val(`${cat.id}-${i}`), 0);
    return { id: cat.id, title: cat.title, score, max: cat.questions.length * 2, pct: Math.round((score / (cat.questions.length * 2)) * 100) };
  });
  const totalScore = categoryScores.reduce((t, c) => t + c.score, 0);
  const maxScore = 90;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const status = statusBands.find((s) => percentage <= s.max);
  const weakest = [...categoryScores].sort((a,b)=>a.pct-b.pct).slice(0,3);
  const risks = categoryScores.filter(c=>c.pct<60).map(c=>riskMap[c.id]);
  const actions = [...new Set(weakest.map(w=>actionLibrary[w.id]).concat(["Schedule a milestone review call.","Document all approved changes before implementation.","Move extra requests to a phase two list."]))].slice(0,6);
  return { snapshot, categoryScores, totalScore, percentage, status, weakest, risks, actions };
}

function generateInternalReport(state){
  const s = state.snapshot; const safe=(v,f="Not specified")=>v?.trim()?v:f;
  return `Project Health Monitor\nAssessment Date: ${new Date().toLocaleDateString()}\n\nClient: ${safe(s.clientName)}\nProject: ${safe(s.projectName)}\nProject Type: ${safe(s.projectType)}\nCurrent Phase: ${safe(s.projectPhase)}\nPlanned Launch Date: ${safe(s.launchDate)}\nLast Client Response Date: ${safe(s.lastResponseDate)}\nNext Milestone: ${safe(s.nextMilestone)}\nProject Owner: ${safe(s.projectOwner)}\n\nFinal Health Score: ${state.totalScore}/90\nFinal Health Percentage: ${state.percentage}%\nHealth Status: ${state.status.label}\nStatus Message: ${state.status.message}\n\nCategory Score Summary:\n${state.categoryScores.map(c=>`- ${c.title}: ${c.score}/${c.max} (${c.pct}%)`).join("\n")}\n\nWeakest Categories:\n${state.weakest.map(w=>`- ${w.title} (${w.pct}%)`).join("\n")}\n\nDetected Risks:\n${state.risks.length?state.risks.map(r=>`- ${r}`).join("\n"):"- No major risks detected."}\n\nRecommended Actions:\n${state.actions.slice(0,Math.max(3,state.actions.length)).map(a=>`- ${a}`).join("\n")}\n\nInternal Notes:\n${safe(s.internalNotes,"No notes added.")}\n\nShort Internal Status Summary:\nProject is currently ${state.status.label} at ${state.percentage}%. Priority focus areas: ${state.weakest.map(w=>w.title).join(", ")}.`;}

function generateClientUpdate(state){
  const s = state.snapshot; const client=s.clientName?.trim()||"Client"; const proj=s.projectName?.trim()||"the project"; const phase=s.projectPhase||"Current phase under review";
  return `Hi ${client},\n\nHere is a short project status update for ${proj}.\n\nCurrent phase: ${phase}\nOverall status: ${state.status.label}\n\n${state.status.label==="Healthy"?"The project is moving in a stable direction and remains aligned with current goals.":"Before moving to the next milestone, we should align on a few key items to keep delivery smooth and predictable."}\n\nRecommended next steps:\n1. ${state.actions[0] || "Confirm the next milestone deliverables."}\n2. ${state.actions[1] || "Review pending feedback and approvals."}\n3. ${state.actions[2] || "Confirm timeline and responsibilities for the next phase."}\n\nBest,`;
}

function updateUI(){
  const state=computeState();
  const report=generateInternalReport(state), client=generateClientUpdate(state);
  reportOut.textContent=report; clientOut.textContent=client;
  summary.innerHTML=`<h2>Live Health Summary</h2><p class="kpi">${state.totalScore}/90 • ${state.percentage}%</p><p><strong>Status:</strong> <span class="status ${state.status.label.toLowerCase().replace(" ","-")}">${state.status.label}</span></p><p>${state.status.message}</p><div class="progress"><span style="width:${state.percentage}%"></span></div><p><strong>Weakest categories</strong></p><ul>${state.weakest.map(w=>`<li>${w.title} (${w.pct}%)</li>`).join("")}</ul><p><strong>Detected risks:</strong> ${state.risks.length}</p><p><strong>Action preview:</strong> ${state.actions[0]||"No action needed"}</p>`;
}

function saveState(){
  const state=computeState();
  const responses={};
  healthCategories.forEach(c=>c.questions.forEach((_,i)=>responses[`${c.id}-${i}`]=val(`${c.id}-${i}`)));
  localStorage.setItem(STORAGE_KEY, JSON.stringify({snapshot: state.snapshot, responses}));
  statusOut.textContent="Saved locally.";
}
function loadState(){
  const raw=localStorage.getItem(STORAGE_KEY); if(!raw) return;
  try { const data=JSON.parse(raw); Object.entries(data.snapshot||{}).forEach(([k,v])=>{ const field=el("snapshot-form")[k]; if(field) field.value=v; }); Object.entries(data.responses||{}).forEach(([k,v])=>{ const input=document.querySelector(`input[name="${k}"][value="${v}"]`); if(input) input.checked=true;}); } catch(_){}
}
async function copyText(txt){ try{ await navigator.clipboard.writeText(txt); statusOut.textContent="Copied to clipboard.";} catch{ statusOut.textContent="Clipboard unavailable in this browser context."; } }

renderCategories();
loadState();
updateUI();
document.addEventListener("input", updateUI);
el("copy-report").addEventListener("click", ()=>copyText(reportOut.textContent));
el("copy-client").addEventListener("click", ()=>copyText(clientOut.textContent));
el("print-report").addEventListener("click", ()=>window.print());
el("save-local").addEventListener("click", saveState);
el("reset-monitor").addEventListener("click", ()=>{ if(confirm("Reset this health monitor? This will clear saved local data and all current answers.")){ localStorage.removeItem(STORAGE_KEY); location.reload(); }});
