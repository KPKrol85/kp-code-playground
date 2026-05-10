const STORAGE_KEY = "kp_digital_vault_scope_builder_v1";

const scopeSections = [
  { id: "pages", title: "Page Structure", description: "Pages and templates in scope.", customPageInput: true, options: [
    ["home","Home",1],["about","About",1],["servicesOverview","Services overview",1],["serviceDetail","Service detail pages",2],
    ["portfolio","Projects / portfolio",2],["caseStudy","Case study pages",2],["pricing","Pricing",1],["faq","FAQ",1],
    ["blogListing","Blog listing",2],["blogArticle","Blog article template",2],["contact","Contact",1],["legalPages","Legal pages",1],
    ["thankYou","Thank you page",1],["404","404 page",1],["offline","Offline page",1],["customPages","Custom pages",2]
  ].map(([id,label,weight])=>({id,label,weight,tags:["page"]})) },
  { id:"content", title:"Content Scope", description:"Who owns content and writing.", options:[
    ["clientCopy","Client provides all copy",1],["editCopy","Freelancer edits existing copy",2],["basicCopy","Freelancer writes basic copy",3],
    ["proCopy","Professional copywriting required",5],["seoCopy","SEO copywriting required",5],["legalProvided","Legal content provided by client",1],["localization","Translation/localization needed",3]
  ].map(x=>({id:x[0],label:x[1],weight:x[2]}))},
  { id:"design", title:"Design Scope", description:"Visual direction and UI depth.", options:["useBrand:1","lightDirection:2","customUI:3","homepageOnly:1","fullDesignSystem:5","componentLibrary:5","responsiveAll:2","darkMode:3","animations:3","brandRefresh:3"].map(s=>{const[a,b]=s.split(":");return{id:a,label:a.replace(/([A-Z])/g," $1").replace(/^./,c=>c.toUpperCase()),weight:+b};})},
  { id:"features", title:"Functional Features", description:"Interaction and feature scope.", options:[
    ["contactForm","Contact form",2],["newsletter","Newsletter signup",2],["booking","Booking / appointment link",1],["calculator","Pricing calculator",3],
    ["filters","Filters/search",3],["tabs","Tabs/accordions",1],["carousel","Carousel/slider",2],["modals","Modal windows",2],["cookieBanner","Cookie banner",2],
    ["downloads","Downloadable files",2],["map","Map embed",1],["faqSchema","FAQ schema",2],["testimonials","Testimonials",1],["beforeAfter","Before/after gallery",2],["customInteractive","Custom interactive section",5]
  ].map(([id,label,weight])=>({id,label,weight}))},
  { id:"ecommerce", title:"E-commerce / Payments", description:"Store and payment requirements.", options:[
    ["productListing","Product listing",3],["productDetail","Product detail pages",3],["cart","Cart",5],["checkout","Checkout",5],["payments","Online payments",5],["discounts","Discount codes",2],["downloadsDigital","Digital downloads",3],["orderEmails","Order emails",2],["shipping","Shipping logic",5],["tax","Tax/VAT logic",5],["storePolicies","Basic store policies",2]
  ].map(([id,label,weight])=>({id,label,weight}))},
  { id:"seo", title:"SEO & Analytics", description:"Search and tracking setup.", options:["meta:1","og:1","sitemap:1","robots:1","schema:2","altPass:1","technicalSeo:2","ga:2","gsc:2","gtm:2","conversion:3","performanceBudget:2"].map(s=>{const[a,b]=s.split(":");return{id:a,label:a.replace(/([A-Z])/g," $1"),weight:+b};})},
  { id:"technical", title:"Technical Setup", description:"Infrastructure and deployment scope.", options:["domain:2","hosting:2","dns:3","emailConfig:2","netlify:1","github:1","cms:5","wordpress:5","staticBuild:2","forms:3","redirects:2","ssl:1","backup:2"].map(s=>{const[a,b]=s.split(":");return{id:a,label:a.replace(/([A-Z])/g," $1").toUpperCase()==='DNS'?'DNS changes':a.replace(/([A-Z])/g," $1"),weight:+b};})},
  { id:"accessibility", title:"Accessibility & Compliance", description:"Baseline inclusive and compliance practices.", options:["semantic:1","keyboard:2","focusStates:1","contrast:1","reducedMotion:1","wcagPass:2","privacyPages:2","gdprForms:2","accessibilityNotes:1","legalByClient:1"].map(s=>{const[a,b]=s.split(":");return{id:a,label:a.replace(/([A-Z])/g," $1"),weight:+b};})},
  { id:"handoff", title:"Delivery & Handoff", description:"Launch and transition deliverables.", options:["deployment:2","testing:2","browserCheck:1","responsiveQA:2","handoffNotes:1","training:2","maintenanceInstructions:1","sourceFiles:1","postLaunch:2","changelog:1"].map(s=>{const[a,b]=s.split(":");return{id:a,label:a.replace(/([A-Z])/g," $1"),weight:+b};})},
  { id:"maintenance", title:"Maintenance / Aftercare", description:"Post-launch support options.", options:["support7:1","support30:2","monthlyMaintenance:3","contentUpdates:2","backupsAfter:2","performanceChecks:2","securityUpdates:3","analyticsReview:2","seoMonitoring:3","roadmap:2"].map(s=>{const[a,b]=s.split(":");return{id:a,label:a.replace(/([A-Z])/g," $1"),weight:+b};})}
];

const basicsIds = ["clientName","projectName","projectType","businessIndustry","projectGoal","targetAudience","launchWindow","internalNotes"];
const el = (id) => document.getElementById(id);

function renderSections(){ const root=el("scope-sections"); root.innerHTML=""; scopeSections.forEach(section=>{ const card=document.createElement("fieldset"); card.className="scope-card"; card.innerHTML=`<legend>${section.title}</legend><p>${section.description}</p><div class="options-grid"></div>`; const grid=card.querySelector(".options-grid"); section.options.forEach(opt=>{ const id=`${section.id}-${opt.id}`; const label=document.createElement("label"); label.className="option"; label.innerHTML=`<input type="checkbox" id="${id}" data-section="${section.id}" data-option="${opt.id}" />${opt.label}`; grid.appendChild(label); }); if(section.customPageInput){ const wrap=document.createElement("label"); wrap.className="full"; wrap.innerHTML='Number of custom pages<input type="number" id="customPageCount" min="0" value="0" />'; card.appendChild(wrap);} root.appendChild(card); }); }

function getState(){ const basics = Object.fromEntries(basicsIds.map(id=>[id,el(id).value.trim()])); const selected = {}; scopeSections.forEach(s=>selected[s.id]=s.options.filter(o=>el(`${s.id}-${o.id}`)?.checked).map(o=>o.id)); selected.customPageCount = Number(el("customPageCount")?.value || 0); return { basics, selected }; }
function getOption(sectionId,optId){ return scopeSections.find(s=>s.id===sectionId)?.options.find(o=>o.id===optId); }
function category(score){ if(score<=20) return ["Starter Scope","A focused website scope suitable for a small launch, validation page, or simple business presence."]; if(score<=45) return ["Standard Website Scope","A balanced scope suitable for a professional business website with core pages and standard features."]; if(score<=75) return ["Advanced Website Scope","A larger website scope with multiple page types, stronger UX requirements, SEO, integrations, or advanced content needs."]; return ["Complex / Custom Project Scope","This scope includes advanced functionality or operational complexity and should be estimated as a custom project."]; }

function compute(){ const state=getState(); let score=0; let selectedItems=[]; scopeSections.forEach(s=>state.selected[s.id].forEach(id=>{ const o=getOption(s.id,id); if(o){score+=o.weight; selectedItems.push({section:s.id,...o});}})); score += Math.max(0,state.selected.customPageCount)*2; const pageCount=state.selected.pages.length + Math.max(0,state.selected.customPageCount); const [cat,msg]=category(score);
 const risks=[];
 if(pageCount>=7 && !state.selected.content.some(x=>["basicCopy","proCopy","seoCopy","clientCopy"].includes(x))) risks.push("Content ownership should be clarified before final pricing.");
 if(state.selected.ecommerce.some(x=>["cart","checkout","payments","shipping","tax","downloadsDigital"].includes(x))) risks.push("E-commerce and payment flows require separate planning, testing, and legal review.");
 if(score>=46 && /[0-3]\s*week|urgent|asap|this month/i.test(state.basics.launchWindow)) risks.push("The selected scope may not fit a short timeline without reducing features or adding phased delivery.");
 if(state.selected.technical.some(x=>["domain","hosting","dns","cms","forms","redirects","netlify"].includes(x))) risks.push("Technical access and deployment responsibilities should be confirmed before production begins.");
 if(state.selected.features.some(x=>["contactForm","cookieBanner","newsletter"].includes(x)) || state.selected.accessibility.includes("gdprForms") || state.selected.ecommerce.some(x=>["checkout","payments"].includes(x))) risks.push("Legal content and privacy requirements should be provided or reviewed by the client.");
 if(state.selected.features.some(x=>["customInteractive","calculator","filters"].includes(x)) || state.selected.technical.includes("cms") || state.basics.projectType==="Web app / dashboard") risks.push("Custom functionality should be scoped separately with clear acceptance criteria.");

 const steps=["Confirm final page list before pricing.","Define who provides content and when it will be delivered.","Prepare a written feature list before sending the final proposal."];
 if(risks.length) steps.push("Add a formal approval process for design, content, and launch.");
 if(score>=46) steps.push("Split the project into phases if the selected scope is large.");
 if(state.selected.ecommerce.length) steps.push("Treat e-commerce/payment scope as a separate estimate.");
 if(state.selected.technical.length) steps.push("Confirm technical access before deployment planning.");
 return {state,score,cat,msg,risks:[...new Set(risks)],steps:[...new Set(steps)],pageCount,itemCount:selectedItems.length,selectedItems}; }

function asList(ids, sectionId){ if(!ids.length) return "None selected"; return ids.map(id=>getOption(sectionId,id)?.label||id).join(", "); }
function report(data){ const b=data.state.basics; const s=data.state.selected; const date=new Date().toISOString().slice(0,10); return `Website Scope Builder Report\nAssessment date: ${date}\nClient: ${b.clientName||"Not provided"}\nProject: ${b.projectName||"Not provided"}\nProject type: ${b.projectType||"Not provided"}\nIndustry: ${b.businessIndustry||"Not provided"}\nGoal: ${b.projectGoal||"Not provided"}\nAudience: ${b.targetAudience||"Not provided"}\nLaunch window: ${b.launchWindow||"Not provided"}\n\nSelected pages/templates: ${asList(s.pages,"pages")}${s.customPageCount?` (+${s.customPageCount} custom pages)`:""}\nContent scope: ${asList(s.content,"content")}\nDesign scope: ${asList(s.design,"design")}\nFunctional features: ${asList(s.features,"features")}\nE-commerce/payment: ${asList(s.ecommerce,"ecommerce")}\nSEO/analytics: ${asList(s.seo,"seo")}\nTechnical setup: ${asList(s.technical,"technical")}\nAccessibility/compliance: ${asList(s.accessibility,"accessibility")}\nDelivery/handoff: ${asList(s.handoff,"handoff")}\nMaintenance/aftercare: ${asList(s.maintenance,"maintenance")}\n\nComplexity score: ${data.score}\nScope category: ${data.cat}\nCategory message: ${data.msg}\n\nRisk warnings:\n${data.risks.length?data.risks.map(r=>`- ${r}`).join("\n"):"- No major risk warnings detected."}\n\nRecommended next steps:\n${data.steps.slice(0,6).map(r=>`- ${r}`).join("\n")}\n\nFreelancer notes:\n${b.internalNotes||"None provided."}`; }

function updateUI(){ const data=compute(); el("score").textContent=data.score; el("category").textContent=data.cat; el("pagesCount").textContent=data.pageCount; el("itemsCount").textContent=data.itemCount; el("riskCount").textContent=data.risks.length; el("highImpact").innerHTML = data.selectedItems.filter(i=>i.weight>=5).slice(0,8).map(i=>`<li>${i.label}</li>`).join("") || "<li>No high-impact items selected.</li>"; el("nextStepsPreview").innerHTML = data.steps.slice(0,4).map(x=>`<li>${x}</li>`).join(""); el("report-output").innerHTML = report(data).split("\n").map(line=>`<p>${line}</p>`).join(""); el("live-status").textContent = `Complexity ${data.score}. ${data.cat}. ${data.risks.length} risks detected.`; }

function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(getState())); el("live-status").textContent="Builder progress saved locally."; }
function load(){ try{ const raw=localStorage.getItem(STORAGE_KEY); if(!raw) return; const data=JSON.parse(raw); basicsIds.forEach(id=>{ if(data.basics?.[id]!==undefined) el(id).value=data.basics[id];}); scopeSections.forEach(s=>(data.selected?.[s.id]||[]).forEach(optId=>{const c=el(`${s.id}-${optId}`); if(c) c.checked=true;})); if(el("customPageCount")) el("customPageCount").value=data.selected?.customPageCount || 0; }catch{ /* ignore bad data */ } }
function reset(){ if(!confirm("Reset all scope selections and project details?")) return; localStorage.removeItem(STORAGE_KEY); document.querySelectorAll("input, textarea, select").forEach(node=>{ if(node.type==="checkbox") node.checked=false; else node.value=""; }); if(el("customPageCount")) el("customPageCount").value=0; updateUI(); }

document.addEventListener("DOMContentLoaded", ()=>{
  renderSections();
  load();
  document.addEventListener("input", updateUI);
  el("copyReport").addEventListener("click", async()=>{ try{ await navigator.clipboard.writeText(report(compute())); el("live-status").textContent="Scope report copied to clipboard.";}catch{ el("live-status").textContent="Clipboard unavailable. Copy manually from report."; }});
  el("printReport").addEventListener("click", ()=>window.print());
  el("saveLocal").addEventListener("click", save);
  el("resetBuilder").addEventListener("click", reset);
  updateUI();
});
