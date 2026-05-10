const STORAGE_KEY = "kp_dv_client_questionnaire_builder_v1";

const CONFIG = {
  projectTypes: ["Business website","Landing page","E-commerce","Portfolio","Blog / content site","Web app / dashboard","Existing website redesign","Personal brand website","Other"],
  websiteStatus: ["No website yet","Existing website needs redesign","Existing website needs technical rebuild","Existing website needs content refresh","Existing website needs conversion improvement","Not sure"],
  depths: ["Quick","Standard","Deep Discovery"],
  tones: ["Concise","Standard","Client-friendly","Strategic","Detailed"],
  modules: [
    "Business & Goals","Audience & Positioning","Offer / Products / Services","Brand & Visual Direction","Content & Assets",
    "Website Structure","Features & Functionality","SEO / Analytics / Marketing","Technical Access & Constraints","Timeline / Budget / Decision Process"
  ]
};

const MODULE_QUESTIONS = CONFIG.modules.flatMap((m, idx) => {
  const base = [
    ["What is the main goal of this website and why now?","high"],["What action should visitors take first?","high"],["What outcomes define success after launch?","high"],
    ["Who is the primary audience and what do they need?","high"],["What objections should we address for trust?","medium"],["Who are your top competitors and differentiators?","medium"],
    ["Which offers/products matter most commercially?","high"],["Do you need separate detail pages for each offer?","medium"],["What proof assets exist (testimonials/case studies)?","medium"],
    ["Do you already have logo, colors, fonts, or guidelines?","medium"],["Which websites reflect your preferred direction?","medium"],["What brand feeling should the site communicate?","medium"],
    ["Who will provide copy and when will it be final?","high"],["Are photos/videos/graphics ready or needed?","medium"],["Who signs off final content and legal pages?","high"],
    ["Which pages are required at launch?","high"],["Which pages are critical for conversion?","high"],["Any special templates needed (blog, case study, support)?","medium"],
    ["Which features are required (forms, booking, payments)?","high"],["Do you need editable content and multilingual support?","medium"],["What external integrations are mandatory?","medium"],
    ["Do you have target keywords or SEO priorities?","medium"],["Which analytics/tracking tools must be configured?","high"],["Are there ads/campaign tracking requirements?","medium"],
    ["Who owns domain, hosting, and technical access?","high"],["What legacy tools or DNS/email records must be preserved?","high"],["Any platform constraints (WordPress/Shopify/custom)?","medium"],
    ["What is the desired launch date and flexibility?","high"],["Who is final decision maker and stakeholders?","high"],["What budget range and approval process should guide scope?","high"]
  ];
  const triplet = base[idx];
  return [0,1,2].map(i => ({
    id:`m${idx+1}-${i+1}`,
    module:m,
    text:triplet[i][0],
    priority:triplet[i][1],
    depth: i===0 ? "Quick" : i===1 ? "Standard" : "Deep Discovery",
    tags:["core"],
    projectTypes:["all"]
  }));
});

const PROJECT_SPECIFIC = {
  "Landing page": ["What is the campaign goal and primary CTA?","What is the main traffic source?","What conversion target defines success?","Is the single offer clearly defined?","Do you need A/B test-ready variants?"],
  "E-commerce": ["How are product categories structured?","Who owns product descriptions/images?","What payment methods are required?","How should shipping and tax/VAT be handled?","What return/refund/store policies and transactional emails are required?"],
  "Existing website redesign": ["What currently does not work?","What must be preserved?","Which URLs/SEO traffic are critical?","Any redirect or migration requirements?","Do we have analytics history and content migration constraints?"],
  "Web app / dashboard": ["What user roles and permissions are required?","Is login/authentication needed and how?","What core workflows define MVP?","What data types are managed?","Any security/privacy constraints?"],
  "Blog / content site": ["What content categories are required?","How often will publishing happen?","What author/editor workflow is needed?","What article templates are needed?","What SEO/editorial goals should drive structure?"],
  "Portfolio": ["Which projects should be featured first?","What case study structure should each project use?","What visual assets/testimonials are available?","Who is the target client/employer?","How should your professional positioning read?"],
  "Personal brand website": ["How do you want to position your personal brand?","Which services/offers should be highlighted?","What credibility signals should be visible?","Which speaking/media/social links matter most?","Do you want newsletter/audience building features?"],
};

const els = Object.fromEntries(["projectType","websiteStatus","depth","tone","clientName","projectName","industry","businessModel","mainGoal","internalNotes","moduleGrid","output","summaryList","statusLive"].map(id=>[id,document.getElementById(id)]));
const state = { modules: new Set(CONFIG.modules) };

function fillSelect(el, options){ el.innerHTML = options.map(v=>`<option>${v}</option>`).join(""); }
function renderModules(){
  els.moduleGrid.innerHTML = CONFIG.modules.map(m=>`<label class="module-card"><input type="checkbox" data-module="${m}" checked /> <span>${m}</span></label>`).join("");
}
function depthAllowed(qDepth, selected){ return selected==="Deep Discovery" || (selected==="Standard" && qDepth!=="Deep Discovery") || (selected==="Quick" && qDepth==="Quick"); }
function introMessage(d){ return `Hi ${d.clientName || "there"},\n\nBefore preparing the final proposal, I’d like to collect a few details about your goals, content, scope, and technical setup. This helps make the project accurate, organized, and easier to price properly.\n\nPlease answer the questions below as clearly as possible. If something is not clear yet, short notes are enough.`; }
function internalNotes(d){
  const notes=["Confirm final decision maker before production.","Document approved scope before build starts.","Confirm content ownership before final pricing.","Ask for domain, hosting, and analytics access before launch planning."];
  if(d.projectType==="E-commerce") notes.push("Do not price e-commerce without payment, shipping, tax, and policy details.");
  if(d.projectType==="Existing website redesign") notes.push("Protect critical URLs and existing SEO traffic during migration.");
  if(d.depth==="Quick") notes.push("For short timelines, define a minimum launch-ready scope.");
  return notes;
}
function steps(){ return ["Send questionnaire before proposal call.","Review unclear answers during discovery.","Convert answers into a written scope and risks.","Confirm missing content, access, and decision responsibilities."]; }
function currentData(){ return {
  clientName: els.clientName.value.trim(), projectName: els.projectName.value.trim(), projectType: els.projectType.value,
  industry: els.industry.value.trim(), businessModel: els.businessModel.value.trim(), websiteStatus: els.websiteStatus.value,
  mainGoal: els.mainGoal.value.trim(), depth: els.depth.value, tone: els.tone.value, internalNotes: els.internalNotes.value.trim()
};}
function build(){
  const d=currentData();
  const selected=[...state.modules];
  const questions=MODULE_QUESTIONS.filter(q=>selected.includes(q.module)&&depthAllowed(q.depth,d.depth));
  const grouped=Object.groupBy(questions,q=>q.module);
  const spec=PROJECT_SPECIFIC[d.projectType]||[];
  const intro=introMessage(d); const notes=internalNotes(d); const next=steps();
  const date = new Date().toISOString().slice(0,10);
  els.output.innerHTML = `<div class="block"><h3>Client Questionnaire Builder</h3><p><strong>Date:</strong> ${date}<br><strong>Client:</strong> ${d.clientName||"—"}<br><strong>Project:</strong> ${d.projectName||"—"}<br><strong>Type:</strong> ${d.projectType}<br><strong>Industry:</strong> ${d.industry||"—"}<br><strong>Status:</strong> ${d.websiteStatus}<br><strong>Main Goal:</strong> ${d.mainGoal||"—"}</p></div>
  <div class="block"><h3>Client Intro Message</h3><p>${intro.replace(/\n/g,"<br>")}</p></div>
  ${Object.entries(grouped).map(([m,qs])=>`<div class="block"><h3>${m}</h3><ol>${qs.map(q=>`<li>${q.text}</li>`).join("")}</ol></div>`).join("")}
  ${spec.length?`<div class="block"><h3>Project-Type-Specific Questions</h3><ol>${spec.map(q=>`<li>${q}</li>`).join("")}</ol></div>`:""}
  <div class="block"><h3>Internal Freelancer Notes</h3><ul>${notes.map(n=>`<li>${n}</li>`).join("")}</ul>${d.internalNotes?`<p><strong>Your Internal Notes:</strong> ${d.internalNotes}</p>`:""}</div>
  <div class="block"><h3>Recommended Next Steps</h3><ol>${next.map(s=>`<li>${s}</li>`).join("")}</ol></div>`;
  els.summaryList.innerHTML = `<li>Project Type: ${d.projectType}</li><li>Depth: ${d.depth}</li><li>Tone: ${d.tone}</li><li>Modules: ${selected.length}</li><li>Questions: ${questions.length+spec.length}</li><li>Project-specific: ${spec.length}</li><li>Next: ${next[0]}</li>`;
  state.generated = { d, questions, spec, intro, notes, next };
}
function plainText(){
  const g=state.generated; if(!g) return "";
  const by=Object.groupBy(g.questions,q=>q.module);
  let out=`Client Questionnaire Builder\nDate: ${new Date().toISOString().slice(0,10)}\nClient: ${g.d.clientName||"—"}\nProject: ${g.d.projectName||"—"}\nType: ${g.d.projectType}\nIndustry: ${g.d.industry||"—"}\nStatus: ${g.d.websiteStatus}\nMain Goal: ${g.d.mainGoal||"—"}\n\nClient Intro Message\n${g.intro}\n`;
  Object.entries(by).forEach(([m,qs])=>{ out += `\n${m}\n`; qs.forEach((q,i)=> out += `${i+1}. ${q.text}\n`); });
  if(g.spec.length){ out += `\nProject-Type-Specific Questions\n`; g.spec.forEach((q,i)=>out += `${i+1}. ${q}\n`); }
  out += `\nInternal Freelancer Notes\n`; g.notes.forEach((n,i)=>out += `${i+1}. ${n}\n`);
  if(g.d.internalNotes) out += `\nYour Internal Notes\n${g.d.internalNotes}\n`;
  out += `\nRecommended Next Steps\n`; g.next.forEach((s,i)=>out += `${i+1}. ${s}\n`);
  return out;
}
function saveLocal(){ localStorage.setItem(STORAGE_KEY, JSON.stringify({...currentData(), modules:[...state.modules]})); }
function loadLocal(){ try { const raw=localStorage.getItem(STORAGE_KEY); if(!raw) return; const d=JSON.parse(raw); Object.keys(d).forEach(k=>{ if(els[k] && typeof d[k]==='string') els[k].value=d[k]; }); if(d.modules){ state.modules = new Set(d.modules); document.querySelectorAll('[data-module]').forEach(c=>c.checked=state.modules.has(c.dataset.module)); }} catch{} }
async function copy(text,label){ try{ await navigator.clipboard.writeText(text); els.statusLive.textContent=`${label} copied to clipboard.`;}catch{ els.statusLive.textContent=`Could not copy ${label.toLowerCase()}.`; } }

function init(){
  fillSelect(els.projectType, CONFIG.projectTypes); fillSelect(els.websiteStatus, CONFIG.websiteStatus); fillSelect(els.depth, CONFIG.depths); fillSelect(els.tone, CONFIG.tones);
  renderModules(); loadLocal();
  document.body.addEventListener("input", e=>{ if(e.target.matches('[data-module]')){ e.target.checked ? state.modules.add(e.target.dataset.module):state.modules.delete(e.target.dataset.module);} build(); });
  document.getElementById("copyQuestionnaire").onclick=()=>copy(plainText(),"Questionnaire");
  document.getElementById("copyIntro").onclick=()=>copy(state.generated?.intro||"","Intro message");
  document.getElementById("saveLocal").onclick=()=>{ saveLocal(); els.statusLive.textContent="Builder saved locally."; };
  document.getElementById("resetBuilder").onclick=()=>{ if(confirm("Reset builder and clear local data?")){ localStorage.removeItem(STORAGE_KEY); location.reload(); } };
  document.getElementById("printDoc").onclick=()=>window.print();
  build();
}
init();
