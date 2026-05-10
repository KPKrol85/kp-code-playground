const form = document.querySelector('#profile');
const els = {
  score: document.querySelector('#scoreHighlights'), results: document.querySelector('#resultsCards'),
  warnings: document.querySelector('#warnings'), matrix: document.querySelector('#comparisonTable'),
  client: document.querySelector('#clientSummary'), report: document.querySelector('#reportOutput'), feedback: document.querySelector('#actionFeedback')
};
const stacks = [
{name:'Static HTML/CSS/Vanilla JS + Netlify',use:'Brochure sites, portfolios, landing pages',seo:4,performance:5,speed:5,maintainability:4,hosting:5,editing:1,scalability:2,security:5,learning:5,cost:5},
{name:'Astro + Markdown/MDX + Netlify',use:'SEO blogs and docs-heavy sites',seo:5,performance:5,speed:4,maintainability:4,hosting:4,editing:3,scalability:3,security:4,learning:4,cost:4},
{name:'WordPress',use:'Client-managed content websites',seo:4,performance:2,speed:4,maintainability:2,hosting:3,editing:5,scalability:3,security:2,learning:4,cost:4},
{name:'WordPress + WooCommerce',use:'Content + ecommerce storefront',seo:4,performance:2,speed:3,maintainability:2,hosting:2,editing:5,scalability:3,security:2,learning:3,cost:3},
{name:'Shopify',use:'Managed ecommerce operations',seo:3,performance:3,speed:4,maintainability:4,hosting:5,editing:5,scalability:4,security:4,learning:4,cost:2},
{name:'Next.js',use:'Dynamic web apps and modern sites',seo:4,performance:4,speed:3,maintainability:3,hosting:3,editing:2,scalability:5,security:3,learning:3,cost:3},
{name:'Next.js + Supabase',use:'Fast MVPs with auth + data',seo:4,performance:4,speed:3,maintainability:3,hosting:3,editing:2,scalability:5,security:3,learning:3,cost:3},
{name:'Laravel / PHP + MySQL',use:'Custom business workflows + admin',seo:3,performance:3,speed:2,maintainability:3,hosting:2,editing:3,scalability:4,security:3,learning:3,cost:3},
{name:'React SPA + API',use:'App-first frontends with decoupled API',seo:2,performance:3,speed:2,maintainability:2,hosting:3,editing:1,scalability:4,security:3,learning:2,cost:2},
{name:'Static Site Generator + Headless CMS',use:'Content-rich teams needing workflow',seo:5,performance:4,speed:3,maintainability:3,hosting:3,editing:4,scalability:4,security:4,learning:3,cost:3}
];
const presets = {smallBusiness:{projectType:'Marketing Site',budget:'low',complexity:1,editing:false},seoBlog:{projectType:'Content Platform',content:'daily',seoImportance:5,perfImportance:5,editing:true},saasMvp:{projectType:'Web App',auth:true,database:true,complexity:4,budget:'mid'},ecommerce:{projectType:'Ecommerce',ecommerce:true,payments:true,editing:true,complexity:3},portfolio:{projectType:'Marketing Site',budget:'low',content:'rare',complexity:1,editing:false},editableMarketing:{projectType:'Marketing Site',editing:true,content:'weekly',seoImportance:4},businessPlatform:{projectType:'Custom Platform',database:true,auth:true,complexity:5,maintenance:'high'}};

function getData(){const d=Object.fromEntries(new FormData(form));['editing','auth','database','payments','multilingual','ecommerce'].forEach(k=>d[k]=form.querySelector(`[name="${k}"]`).checked);['deadline','seoImportance','perfImportance','complexity'].forEach(k=>d[k]=Number(form[k].value));return d;}
function evaluate(d){return stacks.map(s=>{let score=s.seo*d.seoImportance+s.performance*d.perfImportance+s.speed*(6-d.deadline)+s.maintainability*3+s.hosting*2+s.scalability*d.complexity+s.cost*2+s.security*2;
if(d.editing) score+=s.editing*5; else score+=(6-s.editing)*2;
if(d.auth||d.database) score += (s.name.includes('Next.js + Supabase')||s.name.includes('Laravel')||s.name.includes('React SPA'))?18:-8;
if(d.ecommerce||d.payments) score += (s.name.includes('Shopify')||s.name.includes('WooCommerce'))?20:-12;
if(d.projectType==='Marketing Site' && d.complexity<=2 && !d.auth && !d.database) score += (s.name.includes('Static HTML')||s.name.includes('Astro'))?18:-10;
if(d.content==='daily'&&d.editing) score += (s.name==='WordPress'||s.name.includes('Headless CMS'))?14:0;
if(d.maintenance==='low') score += s.maintainability*3 + s.security*2;
const warnings=[];
if(s.name==='Next.js' && d.projectType==='Marketing Site' && d.complexity<=2 && !d.auth && !d.database) warnings.push('Avoid overengineering with Next.js for mostly static requirements.');
if(s.name==='WordPress' && !d.editing && d.perfImportance>=4) warnings.push('WordPress may add avoidable maintenance/security overhead without editing needs.');
if(s.name.includes('WooCommerce')&&!d.ecommerce) warnings.push('WooCommerce is unnecessary without ecommerce workflows.');
return {...s,score,warnings};}).sort((a,b)=>b.score-a.score);}
function badge(i){return i===0?'badge--ok':i===1?'badge--warn':'badge--bad'}
function render(){const d=getData();const ranked=evaluate(d);const [best,alt,,...rest]=ranked;const avoid=ranked[ranked.length-1];
els.score.innerHTML=`<div class="card"><strong>SEO priority</strong><div>${d.seoImportance}/5</div></div><div class="card"><strong>Performance priority</strong><div>${d.perfImportance}/5</div></div><div class="card"><strong>Complexity</strong><div>${d.complexity}/5</div></div><div class="card"><strong>Editing required</strong><div>${d.editing?'Yes':'No'}</div></div>`;
els.results.innerHTML=[best,alt,avoid].map((s,i)=>`<article class="card"><span class="badge ${badge(i)}">${i===0?'Recommended':i===1?'Alternative':'Avoid'}</span><h4>${s.name}</h4><p>${s.use}</p><p>Score: <strong>${Math.round(s.score)}</strong></p></article>`).join('');
els.warnings.innerHTML=`<h4>Risk Warnings</h4><ul>${ranked.flatMap(s=>s.warnings.map(w=>`<li><strong>${s.name}:</strong> ${w}</li>`)).join('')||'<li>No critical warnings detected for selected profile.</li>'}</ul>`;
els.matrix.innerHTML=`<tr><th>Stack</th><th>Best Use Case</th><th>SEO</th><th>Performance</th><th>Complexity</th><th>Client Editing</th><th>Maintenance</th><th>Cost</th><th>Risk Level</th><th>Status</th></tr>`+ranked.slice(0,5).map((s,i)=>`<tr><td>${s.name}</td><td>${s.use}</td><td>${s.seo}</td><td>${s.performance}</td><td>${6-s.learning}</td><td>${s.editing}</td><td>${s.maintainability}</td><td>${s.cost}</td><td>${s.security>=4?'Low':s.security===3?'Moderate':'Elevated'}</td><td>${i===0?'Recommended':i===1?'Alternative':'Consider with caveats'}</td></tr>`).join('');
const short=`For ${d.projectName||'this project'}, we recommend ${best.name} because it aligns with your required complexity, delivery constraints, and maintenance capacity.`;
const detailed=`This recommendation balances SEO (${d.seoImportance}/5), performance (${d.perfImportance}/5), and operational constraints. ${best.name} fits the required feature set while minimizing unnecessary infrastructure and long-term maintenance risk. Alternative: ${alt.name}. Stack to avoid for this profile: ${avoid.name}.`;
els.client.innerHTML=`<p><strong>Short version:</strong> ${short}</p><p><strong>Detailed version:</strong> ${detailed}</p><p><strong>Business benefits:</strong> Faster launch, controlled cost, and reduced delivery risk for stakeholders.</p><p><strong>Maintenance implications:</strong> Keep update cadence aligned with team capacity (${d.maintenance}).</p><p><strong>Risk explanation:</strong> Choosing ${avoid.name} would likely increase complexity or cost without proportional value.</p>`;
const report=`# Project Stack Recommendation Report\n\nProject: ${d.projectName||'Unnamed Project'}\nClient: ${d.clientName||'N/A'}\nType: ${d.projectType}\nBudget: ${d.budget}\n\n## Requirements\n- Deadline pressure: ${d.deadline}/5\n- Expected lifetime: ${d.lifetime}\n- Content updates: ${d.content}\n- SEO importance: ${d.seoImportance}/5\n- Performance importance: ${d.perfImportance}/5\n- Complexity: ${d.complexity}/5\n- Editing required: ${d.editing}\n- Auth required: ${d.auth}\n- Database required: ${d.database}\n- Payments required: ${d.payments}\n- Multilingual required: ${d.multilingual}\n- Ecommerce required: ${d.ecommerce}\n\n## Recommendation\n- Recommended stack: ${best.name}\n- Strong alternative: ${alt.name}\n- Stack to avoid: ${avoid.name}\n\n## Technical reasoning\n${detailed}\n\n## Deployment suggestion\nUse ${d.hosting==='simple'?'managed hosting with CI/CD previews':'a cloud deployment workflow with staged environments'}.\n\n## Maintenance notes\nPlan ownership for dependencies, content updates, and security patches based on ${d.maintenance} maintenance capacity.\n\n## Risk warnings\n${ranked.flatMap(s=>s.warnings.map(w=>`- ${s.name}: ${w}`)).join('\n')||'- No critical warnings detected.'}\n\n## Next steps\n1. Confirm scope and success metrics with client.\n2. Build architecture diagram and milestone plan.\n3. Validate stack with a thin prototype.\n4. Lock deployment and maintenance SOPs.\n`;
els.report.textContent=report;window.currentReport=report;window.currentClientText=short+'\n'+detailed;}

form.addEventListener('input',render);
document.querySelector('.preset-panel').addEventListener('click',e=>{if(e.target.tagName!=='BUTTON')return;const p=presets[e.target.dataset.preset];if(!p)return;Object.entries(p).forEach(([k,v])=>{if(typeof v==='boolean') form[k].checked=v; else form[k].value=v;});render();});
function feedback(t){els.feedback.textContent=t;setTimeout(()=>els.feedback.textContent='',1800)}
async function copy(text,msg){await navigator.clipboard.writeText(text);feedback(msg)}
document.querySelector('#printBtn').onclick=()=>window.print();
document.querySelector('#copyReportBtn').onclick=()=>copy(window.currentReport||'', 'Developer report copied');
document.querySelector('#copyClientBtn').onclick=()=>copy(window.currentClientText||'', 'Client explanation copied');
function download(ext,content){const blob=new Blob([content],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`stack-recommendation.${ext}`;a.click();URL.revokeObjectURL(a.href);feedback(`Downloaded .${ext} report`)}
document.querySelector('#downloadTxtBtn').onclick=()=>download('txt',window.currentReport||'');
document.querySelector('#downloadMdBtn').onclick=()=>download('md',window.currentReport||'');
render();
