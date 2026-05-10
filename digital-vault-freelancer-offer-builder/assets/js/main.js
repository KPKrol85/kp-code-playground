const STORAGE_KEY = "kpcode_digital_vault_freelancer_offer_builder_v1";

const projectTypes = ["Business website", "Landing page", "E-commerce", "Portfolio", "Blog / content site", "Web app / dashboard", "Existing website redesign", "Maintenance / aftercare", "Custom digital product", "Other"];
const packages = [
  { id: "starter", name: "Starter", description: "A focused package for small launches, validation pages, and simple online presence.", useCases: ["landing page", "one-page website", "simple business presence", "small portfolio", "campaign validation page"] },
  { id: "business", name: "Business", description: "A professional package for businesses that need a clear, trustworthy, and conversion-focused website.", useCases: ["business website", "service website", "small company website", "standard multi-page site", "local service website"] },
  { id: "premium", name: "Premium", description: "A refined package for brands that need stronger presentation, better UX, and a more polished digital presence.", useCases: ["premium brand website", "advanced business website", "portfolio with case studies", "stronger visual direction", "SEO/analytics-focused website"] },
  { id: "custom", name: "Custom", description: "A custom package for projects with advanced functionality, integrations, or non-standard delivery requirements.", useCases: ["e-commerce", "web app/dashboard", "CMS integration", "calculators", "booking systems", "advanced integrations", "custom workflows"] }
];

const offerSections = [
  { id:"strategy", title:"Strategy & Planning", options:[ ["discovery call",1],["project brief review",1],["sitemap planning",2],["content structure planning",2],["competitor/reference review",2],["technical scope definition",3] ] },
  { id:"design", title:"Design / UI", options:[["visual direction",2],["homepage layout",2],["subpage layout",2],["responsive design",2],["UI components",2],["visual polish",2],["dark mode",3],["design refinement",2]] },
  { id:"development", title:"Development", options:[["semantic HTML implementation",1],["CSS architecture",2],["Vanilla JS interactions",2],["responsive implementation",2],["reusable components",2],["performance-friendly code",2],["static site setup",1],["form integration",2]] },
  { id:"seo", title:"SEO / Performance", options:[["page titles",1],["meta descriptions",1],["Open Graph / social sharing meta",1],["sitemap",1],["robots.txt",1],["image optimization",2],["basic schema markup",2],["performance pass",3],["accessibility baseline",3]] },
  { id:"deployment", title:"Deployment", options:[["Netlify deployment",2],["domain connection",3],["SSL setup",2],["form handling",2],["redirects",2],["analytics setup",2],["launch checklist",1]] },
  { id:"handoff", title:"Handoff", options:[["delivery summary",1],["source files",1],["client instructions",1],["maintenance notes",2],["post-launch support",2],["recorded walkthrough optional",2]] }
].map(s=>({...s, options:s.options.map(([label,weight])=>({id:slug(label),label,weight}))}));

const addonDefs = [
["extra page",2,"content"],["service detail page",2,"content"],["blog setup",2,"content"],["case study template",2,"content"],["copywriting support",2,"content"],["SEO copywriting",3,"SEO"],["logo cleanup",2,"design"],["brand direction mini-kit",3,"design"],["custom animation",3,"custom"],["pricing calculator",5,"development"],["booking integration",3,"integration"],["newsletter integration",3,"integration"],["multilingual version",5,"integration"],["CMS integration",5,"integration"],["WordPress setup",5,"integration"],["e-commerce module",5,"development"],["maintenance plan",3,"maintenance"],["monthly updates",3,"maintenance"],["analytics review",2,"SEO"],["speed optimization pass",3,"SEO"]
].map(([label,weight,tag])=>({id:slug(label),label,weight,tag}));

const milestones = ["Discovery & planning","Content and assets collection","Structure / sitemap","Design direction","Development","Review and revisions","Pre-launch QA","Launch","Post-launch support"];
const terms = ["deposit required","milestone payments","final payment before launch","additional work billed separately","content must be provided before development","feedback rounds are limited","client responsible for legal content","third-party costs not included","hosting/domain costs not included","offer valid until selected date"];
const responsibilities = ["provide website copy","provide images, logo, and brand assets","provide feedback within agreed timeframe","provide domain/hosting access","approve milestones","provide legal/privacy/cookie content","confirm final decision maker","provide product/service information","provide testimonials or case studies if needed","pay invoices according to agreed terms"];
const exclusions = ["copywriting unless selected","legal writing","paid stock photos","hosting/domain fees","advanced SEO campaign","paid ads setup","complex CMS unless selected","custom backend","e-commerce unless selected","ongoing maintenance unless selected","unlimited revisions","third-party subscription costs"];
const tones = ["Concise","Professional","Premium","Friendly","Technical"];

const durationOptions = ["1–2 weeks","2–4 weeks","4–6 weeks","6–8 weeks","Custom / to be confirmed"];
const revisionOptions = ["1 round","2 rounds","3 rounds","custom / to be confirmed"];
const state = { packageId:"", selected:{deliverables:new Set(),addons:new Set(),milestones:new Set(),terms:new Set(),responsibilities:new Set(),exclusions:new Set()}, tone:"Professional" };

const $=(s)=>document.querySelector(s);
const $$=(s)=>[...document.querySelectorAll(s)];
const slug=(v)=>v.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

function init(){
  fillSelect("#projectType", ["", ...projectTypes]);
  fillSelect("#duration", ["", ...durationOptions]);
  fillSelect("#revisions", ["", ...revisionOptions]);
  renderPackages(); renderDeliverables(); renderAddons();
  renderCheckGrid("#milestonesRoot", milestones, "milestones");
  renderCheckGrid("#termsRoot", terms, "terms");
  renderCheckGrid("#responsibilitiesRoot", responsibilities, "responsibilities");
  renderCheckGrid("#exclusionsRoot", exclusions, "exclusions");
  renderTones(); bindEvents(); loadState(); updateAll();
}
function fillSelect(sel, options){ const el=$(sel); el.innerHTML=options.map(o=>`<option value="${o}">${o||"Select..."}</option>`).join("");}
function renderPackages(){
  $("#packageCards").innerHTML=packages.map(p=>`<button type="button" class="package-card" data-package="${p.id}" role="radio" aria-checked="false"><h3>${p.name}</h3><p>${p.description}</p><p><strong>Typical use:</strong> ${p.useCases.join(", ")}</p></button>`).join("");
}
function renderDeliverables(){
  const root=$("#deliverablesRoot");
  root.innerHTML=offerSections.map(s=>`<fieldset><legend>${s.title}</legend><div class="option-grid">${s.options.map(o=>check(o.id,o.label,"deliverables",`w${o.weight}`)).join("")}</div></fieldset>`).join("");
}
function renderAddons(){ $("#addonsRoot").innerHTML=addonDefs.map(a=>check(a.id,`${a.label} <span class='tag'>${a.tag}</span>`,'addons',`w${a.weight}`)).join(""); }
function renderCheckGrid(sel,list,key){$(sel).innerHTML=list.map(item=>check(slug(item),item,key)).join("");}
function renderTones(){ $("#toneRoot").innerHTML=tones.map(t=>`<label><input type="radio" name="tone" value="${t}" ${t===state.tone?"checked":""}> ${t}</label>`).join(""); }
function check(id,label,key,meta=""){ return `<label class="check-item ${meta}"><input type="checkbox" data-key="${key}" value="${id}"> <span>${label}</span></label>`; }
function bindEvents(){
  $("#offerForm").addEventListener("input", onInput);
  $("#packageCards").addEventListener("click",e=>{const b=e.target.closest("[data-package]"); if(!b) return; state.packageId=b.dataset.package; updateAll();});
  $("#copyOfferBtn").addEventListener("click",()=>copyText($("#offerOutput").textContent,"Offer copied."));
  $("#copyEmailBtn").addEventListener("click",()=>copyText($("#emailOutput").textContent,"Email intro copied."));
  $("#printBtn").addEventListener("click",()=>window.print());
  $("#saveBtn").addEventListener("click",()=>{saveState(); announce("Builder progress saved locally.");});
  $("#resetBtn").addEventListener("click",()=>{ if(confirm("Reset the builder and clear saved data?")){ localStorage.removeItem(STORAGE_KEY); location.reload(); }});
}
function onInput(e){
  if(e.target.matches("input[type='checkbox']")){ const k=e.target.dataset.key; e.target.checked?state.selected[k].add(e.target.value):state.selected[k].delete(e.target.value); }
  if(e.target.name==="tone") state.tone=e.target.value;
  updateAll();
}
function calculateComplexity(){
  let score=0; const all=[...offerSections.flatMap(s=>s.options),...addonDefs];
  [...state.selected.deliverables,...state.selected.addons].forEach(id=>{ const item=all.find(x=>x.id===id); score += item?.weight||1; });
  score += state.selected.milestones.size;
  score += [...state.selected.terms].filter(t=>["deposit-required","milestone-payments","final-payment-before-launch"].includes(t)).length;
  if(score<=20) return {level:"Simple Offer",message:"A focused offer suitable for a small project, landing page, simple website, or limited-scope launch.",score};
  if(score<=45) return {level:"Standard Offer",message:"A balanced offer suitable for a professional business website with core pages, standard deliverables, and clear delivery assumptions.",score};
  if(score<=75) return {level:"Advanced Offer",message:"A larger offer with stronger design, technical, SEO, integration, or delivery requirements.",score};
  return {level:"Custom / High-Complexity Offer",message:"This offer includes advanced or non-standard requirements and should be handled as a custom project with carefully documented scope.",score};
}
function getRiskNotes(){
  const notes=[]; const addonsCount=state.selected.addons.size;
  const highImpact=["cms-integration","wordpress-setup","e-commerce-module","pricing-calculator","multilingual-version"].some(id=>state.selected.addons.has(id));
  if(addonsCount>=6||highImpact) notes.push("Scope risk: This offer includes multiple optional or advanced items. Consider splitting the project into phases.");
  if((state.selected.deliverables.size>=12||state.selected.addons.has("extra-page"))&&!state.selected.addons.has("copywriting-support")) notes.push("Content risk: Content responsibility should be confirmed before delivery dates are promised.");
  const technicalFlags=["domain-connection","form-handling","redirects"].some(id=>state.selected.deliverables.has(id))||["cms-integration","wordpress-setup","e-commerce-module","booking-integration","newsletter-integration"].some(id=>state.selected.addons.has(id));
  if(technicalFlags) notes.push("Technical risk: Technical access and third-party platform responsibilities should be confirmed before launch planning.");
  if($("#revisions").value==="Custom / to be confirmed"||!state.selected.terms.has("feedback-rounds-are-limited")) notes.push("Revision risk: Define revision rounds clearly to avoid unlimited feedback cycles.");
  if(!state.selected.terms.has("deposit-required")) notes.push("Payment risk: Consider requiring a deposit before production work begins.");
  if(["form-integration"].some(id=>state.selected.deliverables.has(id))||["newsletter-integration","e-commerce-module"].some(id=>state.selected.addons.has(id))||!state.selected.terms.has("client-responsible-for-legal-content")) notes.push("Legal/content ownership risk: Legal, privacy, cookie, and policy content should be provided or reviewed by the client.");
  if(!state.selected.addons.has("maintenance-plan")&&technicalFlags) notes.push("Maintenance risk: Consider adding a maintenance or post-launch support option for ongoing updates and technical stability.");
  return notes;
}
function buildNextSteps(){
  const steps=["Confirm the selected package.","Approve the project scope.","Send required content and assets."];
  if([...state.selected.deliverables].some(id=>["domain-connection","netlify-deployment"].includes(id))||state.selected.addons.has("cms-integration")) steps.push("Provide domain, hosting, or platform access.");
  if($("#duration").value||$("[name='launchWindow']").value) steps.push("Confirm timeline and launch window.");
  if(state.selected.terms.has("deposit-required")) steps.push("Pay the deposit before production begins.");
  steps.push("Schedule the kickoff call.");
  steps.push("Sign the agreement before development starts.");
  if(state.selected.addons.size>=5) steps.push("Move optional add-ons to phase two if needed.");
  steps.push("Confirm who approves feedback and milestones.");
  return [...new Set(steps)].slice(0,8);
}
function toneLine(map){ return map[state.tone]||map.Professional; }
function generateOffer(){
  const d=formData(); const c=calculateComplexity(); const risks=getRiskNotes(); const steps=buildNextSteps();
  const packageObj=packages.find(p=>p.id===state.packageId);
  const list=(ids,pool)=>ids.size?[...ids].map(id=>pool.find(x=>x.id===id)?.label||id):["To be confirmed"];
  const deliverables=list(state.selected.deliverables,offerSections.flatMap(s=>s.options));
  const addons=list(state.selected.addons,addonDefs);
  const text = `FREELANCER OFFER\n\nPrepared for: ${d.clientName||"Client"}\nProject: ${d.projectName||"Project to be confirmed"}\nPrepared by: ${d.preparedBy||"Freelancer / Studio"}\nDate: ${new Date().toISOString().slice(0,10)}\nValid until: ${d.validUntil||"To be confirmed"}\n\n1. Offer Summary\n${toneLine({Concise:"A focused offer aligned with the selected project goals.",Professional:"This offer outlines a clear scope, delivery approach, and collaboration terms for the selected project.",Premium:"This offer is designed to deliver a polished, high-trust digital presence with clear delivery standards.",Friendly:"I prepared this offer to keep scope, process, and expectations clear so we can move forward smoothly.",Technical:"This offer defines scope, deliverables, dependencies, and delivery assumptions for controlled execution."})}\n\n2. Recommended Package\n${packageObj?`${packageObj.name}: ${packageObj.description}`:"Package to be confirmed"}\n\n3. Project Scope\nProject type: ${d.projectType||"To be confirmed"}\nIndustry: ${d.industry||"To be confirmed"}\nComplexity: ${c.level} (${c.score} points)\n${c.message}\n\n4. Core Deliverables\n- ${deliverables.join("\n- ")}\n\n5. Optional Add-ons\n- ${addons.join("\n- ")}\n\n6. Timeline & Milestones\nEstimated duration: ${d.duration||"To be confirmed"}\nRevision rounds: ${d.revisions||"To be confirmed"}\nLaunch window: ${d.launchWindow||"To be confirmed"}\nMilestones:\n- ${list(state.selected.milestones,milestones.map(m=>({id:slug(m),label:m}))).join("\n- ")}\n\n7. Client Responsibilities\n- ${list(state.selected.responsibilities,responsibilities.map(m=>({id:slug(m),label:m}))).join("\n- ")}\n\n8. Payment & Collaboration Terms\nGeneral practical terms only; not legal advice.\n- ${list(state.selected.terms,terms.map(m=>({id:slug(m),label:m}))).join("\n- ")}\n\n9. What Is Not Included\n- ${list(state.selected.exclusions,exclusions.map(m=>({id:slug(m),label:m}))).join("\n- ")}\n\n10. Investment Note\n${d.investmentNote||"Custom estimate after discovery."}\n\n11. Recommended Next Steps\n- ${steps.join("\n- ")}\n\nAttention Notes\n- ${risks.length?risks.join("\n- "):"No major attention notes detected based on current selection."}`;
  const email = `Hi ${d.clientName||"there"},\n\n${toneLine({Concise:`Thanks for sharing details for ${d.projectName||"your project"}.`,Professional:`Thank you for sharing the project details for ${d.projectName||"your project"}.`,Premium:`Thank you for sharing your vision for ${d.projectName||"the project"}.`,Friendly:`Thanks for the project brief for ${d.projectName||"your project"}—great direction so far.`,Technical:`Thank you for the scope input for ${d.projectName||"the project"}.`})}\n\nBased on the current scope, I prepared the offer below. It includes the recommended package, core deliverables, optional add-ons, timeline assumptions, and next steps.\n\nPlease review and let me know if anything should be clarified before we move forward.\n\nBest,\n${d.preparedBy||""}`;
  const internal = `INTERNAL FREELANCER NOTES (NOT CLIENT-FACING)\n\nOffer title: ${d.offerTitle||"N/A"}\nContact: ${d.contactEmail||"N/A"}\nPackage: ${packageObj?.name||"N/A"}\nComplexity: ${c.level} (${c.score})\nTop risks:\n- ${risks.length?risks.join("\n- "):"None currently flagged."}\n\nInternal notes input:\n${d.internalNotes||"No internal notes provided."}`;
  return {text,email,internal,complexity:c,risks,steps};
}
function formData(){const fd=new FormData($("#offerForm")); return Object.fromEntries(fd.entries());}
function updateAll(){
  $$(".package-card").forEach(el=>{ const active=el.dataset.package===state.packageId; el.classList.toggle("active",active); el.setAttribute("aria-checked",active); });
  const {text,email,internal,complexity,risks,steps}=generateOffer();
  $("#offerOutput").textContent=text; $("#emailOutput").textContent=email; $("#internalOutput").textContent=internal;
  $("#summaryList").innerHTML=`<li><strong>Package:</strong> ${packages.find(p=>p.id===state.packageId)?.name||"Not selected"}</li><li><strong>Complexity:</strong> ${complexity.level}</li><li><strong>Score:</strong> ${complexity.score}</li><li><strong>Deliverables:</strong> ${state.selected.deliverables.size}</li><li><strong>Add-ons:</strong> ${state.selected.addons.size}</li><li><strong>Milestones:</strong> ${state.selected.milestones.size}</li><li><strong>Attention notes:</strong> ${risks.length}</li>`;
  $("#riskPreview").innerHTML=risks.length?risks.map(r=>`<li>${r}</li>`).join(""):"<li>No immediate risks flagged.</li>";
  $("#stepsPreview").innerHTML=steps.slice(0,4).map(s=>`<li>${s}</li>`).join("");
}
function saveState(){const data={state,fields:formData()}; localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}
function loadState(){
  try{const raw=localStorage.getItem(STORAGE_KEY); if(!raw) return; const data=JSON.parse(raw);
    if(data.fields){ Object.entries(data.fields).forEach(([k,v])=>{const el=$(`[name='${k}']`); if(el) el.value=v;}); }
    if(data.state){ state.packageId=data.state.packageId||""; state.tone=data.state.tone||"Professional";
      Object.keys(state.selected).forEach(k=>state.selected[k]=new Set(data.state.selected?.[k]||[]));
      $$("input[type='checkbox']").forEach(i=>i.checked=state.selected[i.dataset.key]?.has(i.value));
      const tone=$(`input[name='tone'][value='${state.tone}']`); if(tone) tone.checked=true;
    }
  }catch(e){console.warn("Load failed",e);}
}
async function copyText(text,msg){ try{await navigator.clipboard.writeText(text); announce(msg);}catch{announce("Copy failed. Please copy manually.");}}
function announce(message){$("#statusLive").textContent=message;}

document.addEventListener("DOMContentLoaded", init);
