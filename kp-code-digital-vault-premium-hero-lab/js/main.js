(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const selectorList = document.getElementById('selectorList');
  const heroMeta = document.getElementById('heroMeta');
  const heroPreview = document.getElementById('heroPreview');
  const snippetHtml = document.getElementById('snippetHtml');
  const snippetCss = document.getElementById('snippetCss');
  const snippetJs = document.getElementById('snippetJs');
  const copyLive = document.getElementById('copyLive');
  const galleryGrid = document.getElementById('galleryGrid');

  if (!selectorList || !heroMeta || !heroPreview || !snippetHtml || !snippetCss || !snippetJs || !copyLive || !galleryGrid) return;

  const packs = [
    mkPack('01','Aurora Command Center','AI SaaS, dashboards','Pointer glow + floating cards','Dark glass metrics','initHero01'),
    mkPack('02','Studio Editorial Split','Agencies, portfolios','Intro reveal + accent line','Editorial split','initHero02'),
    mkPack('03','Neon Launch Grid','Dev tools, gaming','Cursor glow + grid pulse','Neon tech grid','initHero03'),
    mkPack('04','Commerce Conversion Pro','Ecommerce & offers','Card tilt + metrics','Conversion-focused','initHero04'),
    mkPack('05','Editorial Prestige Story','Blogs, consultants','Scroll progress + reveal','Luxury editorial','initHero05'),
    mkPack('06','Soft SaaS Flow','Onboarding, SaaS','Rotating pills + floating UI','Rounded soft SaaS','initHero06'),
    mkPack('07','Finance Trust Signal','Finance, legal B2B','KPI count-up','Trust-first business','initHero07'),
    mkPack('08','Creative Gradient Motion','Campaigns, studios','Gradient pointer shift','Bold gradient mesh','initHero08'),
    mkPack('09','Developer Console Hero','APIs, docs','Typing terminal + cursor','Console technical','initHero09'),
    mkPack('10','Luxury Edge Showcase','Architecture, fashion','Geo card reveal','Sharp luxury edge','initHero10')
  ];

  let activeId = '01';
  let cleanups = [];

  function mkPack(id, name, useCase, interaction, style, init) {
    return { id, name, useCase, interaction, style, init, description: `${name} supports ${useCase.toLowerCase()} with a distinct premium layout and copy-ready blocks.` };
  }

  function renderSelector() {
    packs.forEach(pack => {
      const btn = document.createElement('button');
      btn.className = 'dv_selector__item';
      btn.dataset.hero = pack.id;
      btn.type = 'button';
      btn.innerHTML = `<span>Hero ${pack.id}</span><strong>${pack.name}</strong><small>${pack.useCase}</small><em>${pack.interaction}</em><i>${pack.style}</i>`;
      btn.addEventListener('click', () => activatePack(pack.id));
      btn.addEventListener('keydown', ev => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          activatePack(pack.id);
        }
      });
      selectorList.appendChild(btn);
    });
  }

  function renderGallery() {
    galleryGrid.innerHTML = packs.map(p => `<article class="dv_gallery__card"><h3>Hero ${p.id} — ${p.name}</h3><p>${p.useCase}</p><p>${p.interaction}</p></article>`).join('');
  }

  function activatePack(id) {
    cleanups.forEach(fn => fn && fn());
    cleanups = [];
    activeId = id;
    selectorList.querySelectorAll('.dv_selector__item').forEach(el => el.classList.toggle('is-active', el.dataset.hero === id));
    const pack = packs.find(p => p.id === id);
    if (!pack) return;

    heroMeta.innerHTML = `<p class="dv_meta__id">Hero ${pack.id}</p><h3>${pack.name}</h3><p><strong>Use case:</strong> ${pack.useCase}</p><p><strong>Design:</strong> ${pack.style}</p><p><strong>Interaction:</strong> ${pack.interaction}</p><p><strong>Implementation notes:</strong> Independent HTML/CSS/JS pack with prefix-safe class names.</p>`;
    heroPreview.innerHTML = buildHeroMarkup(id);
    const snippets = buildSnippets(id);
    snippetHtml.textContent = snippets.html;
    snippetCss.textContent = snippets.css;
    snippetJs.textContent = snippets.js;
    if (typeof window[pack.init] === 'function') cleanups.push(window[pack.init](heroPreview));
  }

  function buildHeroMarkup(id) {
    const base = {
      '01': `<section class="h01_hero"><div class="h01_hero__inner"><div class="h01_hero__content"><p class="h01_hero__eyebrow">Aurora AI Stack</p><h3 class="h01_hero__title">Operate your command center with confidence.</h3><p class="h01_hero__lead">Unified automation, observability, and precision controls for modern SaaS teams.</p><div class="h01_hero__actions"><button>Start free trial</button><button>View demo</button></div></div><div class="h01_hero__visual"><div class="h01_hero__panel">Command stream stable</div><div class="h01_hero__metric">99.98% uptime</div></div></div></section>`,
      '02': `<section class="h02_hero"><div class="h02_hero__inner"><div class="h02_hero__content"><p class="h02_hero__eyebrow">Studio Method</p><h3 class="h02_hero__title">Elegant digital stories for serious brands.</h3><p class="h02_hero__lead">Editorial design meets conversion-ready strategy.</p><div class="h02_hero__actions"><button>Book strategy call</button><button>View cases</button></div></div><div class="h02_hero__visual"><div class="h02_hero__frame"></div><p class="h02_hero__caption">Art direction preview panel</p></div></div></section>`,
      '03': `<section class="h03_hero"><div class="h03_hero__inner"><div class="h03_hero__content"><p class="h03_hero__eyebrow">Launch Protocol</p><h3 class="h03_hero__title">Ship your neon-era product launch.</h3><p class="h03_hero__lead">High contrast, technical confidence, and impact-focused CTAs.</p><div class="h03_hero__actions"><button>Launch now</button><button>See roadmap</button></div></div><div class="h03_hero__visual"><div class="h03_hero__orb"></div><div class="h03_hero__grid"></div></div></div></section>`,
      '04': `<section class="h04_hero"><div class="h04_hero__inner"><div class="h04_hero__content"><p class="h04_hero__eyebrow">Conversion Engine</p><h3 class="h04_hero__title">Turn product intent into instant revenue.</h3><p class="h04_hero__lead">Commerce-ready hierarchy, offers, trust signals, and precise CTAs.</p><div class="h04_hero__actions"><button>Get offer</button><button>Compare plans</button></div></div><div class="h04_hero__visual"><div class="h04_hero__product">Premium Product Card</div><div class="h04_hero__metric">4.9/5 from 2,400 buyers</div></div></div></section>`,
      '05': `<section class="h05_hero"><div class="h05_hero__progress"></div><div class="h05_hero__inner"><div class="h05_hero__content"><p class="h05_hero__eyebrow">Prestige Journal</p><h3 class="h05_hero__title">Thought leadership with lasting visual elegance.</h3><p class="h05_hero__lead">Built for consultants, authors, and premium editorial properties.</p><div class="h05_hero__actions"><button>Read signature article</button><button>Subscribe</button></div></div><div class="h05_hero__visual"><article class="h05_hero__article">Featured insight: building trust through consistent design systems.</article></div></div></section>`,
      '06': `<section class="h06_hero"><div class="h06_hero__inner"><div class="h06_hero__content"><p class="h06_hero__eyebrow">Productive Flow</p><h3 class="h06_hero__title">Guide users from signup to success.</h3><p class="h06_hero__lead">Soft visuals, rounded UI, and onboarding clarity for SaaS products.</p><div class="h06_hero__actions"><button>Start onboarding</button><button>See UI kit</button></div></div><div class="h06_hero__visual"><div class="h06_hero__app">App Preview</div><div class="h06_hero__pill">Automation</div></div></div></section>`,
      '07': `<section class="h07_hero"><div class="h07_hero__inner"><div class="h07_hero__content"><p class="h07_hero__eyebrow">Trust Infrastructure</p><h3 class="h07_hero__title">Reliable outcomes for high-stakes decisions.</h3><p class="h07_hero__lead">Professional layout, KPI precision, and stable motion language.</p><div class="h07_hero__actions"><button>Schedule consultation</button><button>Download brief</button></div></div><div class="h07_hero__visual"><div class="h07_hero__trust">Verified compliance</div><div class="h07_hero__kpi" data-target="94">0%</div></div></div></section>`,
      '08': `<section class="h08_hero"><div class="h08_hero__inner"><div class="h08_hero__content"><p class="h08_hero__eyebrow">Creative Impact</p><h3 class="h08_hero__title">Move your audience with gradient-driven campaigns.</h3><p class="h08_hero__lead">Asymmetrical composition and expressive visuals for bold brands.</p><div class="h08_hero__actions"><button>Launch campaign</button><button>Explore visuals</button></div></div><div class="h08_hero__visual"><div class="h08_hero__shape"></div><div class="h08_hero__badge">Live creative lab</div></div></div></section>`,
      '09': `<section class="h09_hero"><div class="h09_hero__inner"><div class="h09_hero__content"><p class="h09_hero__eyebrow">Developer Ready</p><h3 class="h09_hero__title">Ship faster with a console-first product voice.</h3><p class="h09_hero__lead">Perfect for APIs, docs, admin systems, and technical platforms.</p><div class="h09_hero__actions"><button>Read docs</button><button>Generate API key</button></div></div><div class="h09_hero__visual"><div class="h09_hero__terminal" data-text="$ deploy --region=global\nBuild complete. Endpoint active."></div><div class="h09_hero__status">Status: operational</div></div></div></section>`,
      '10': `<section class="h10_hero"><div class="h10_hero__inner"><div class="h10_hero__content"><p class="h10_hero__eyebrow">Luxury Direction</p><h3 class="h10_hero__title">Minimal geometry. Maximum premium signal.</h3><p class="h10_hero__lead">Confident framing for architecture, fashion, and elite services.</p><div class="h10_hero__actions"><button>Request private consultation</button><button>View collection</button></div></div><div class="h10_hero__visual"><div class="h10_hero__geometry"></div><div class="h10_hero__card">Curated showcase card</div></div></div></section>`
    };
    return base[id] || '';
  }

  function buildSnippets(id){const html = buildHeroMarkup(id); return { html, css: `/* Hero ${id} CSS block from style.css */`, js: `// Hero ${id} JS function from main.js`};}

  window.initHero01 = (root)=>bindPointerRAF(root,'.h01_hero', '--mx','--my');
  window.initHero02 = (root)=>bindPointerRAF(root,'.h02_hero__frame','--line-x','--line-y');
  window.initHero03 = (root)=>bindPointerRAF(root,'.h03_hero','--mx','--my');
  window.initHero04 = (root)=>bindTilt(root,'.h04_hero__product');
  window.initHero05 = (root)=>bindScrollProgress(root,'.h05_hero__progress');
  window.initHero06 = (root)=>bindPillRotate(root,'.h06_hero__pill');
  window.initHero07 = (root)=>bindCount(root,'.h07_hero__kpi');
  window.initHero08 = (root)=>bindPointerRAF(root,'.h08_hero','--gx','--gy');
  window.initHero09 = (root)=>bindTyping(root,'.h09_hero__terminal');
  window.initHero10 = (root)=>bindHoverReveal(root,'.h10_hero__card');

  function bindPointerRAF(root, sel, xVar, yVar){
    if (reduceMotion) return () => {};
    const el = root.querySelector(sel); if (!el) return () => {};
    let raf = 0, x = 50, y = 50;
    const onMove = (e)=>{ const r = el.getBoundingClientRect(); x=((e.clientX-r.left)/r.width)*100; y=((e.clientY-r.top)/r.height)*100; if(!raf) raf=requestAnimationFrame(()=>{el.style.setProperty(xVar, `${x}%`);el.style.setProperty(yVar, `${y}%`); raf=0;});};
    el.addEventListener('pointermove', onMove);
    return ()=>el.removeEventListener('pointermove', onMove);
  }
  function bindTilt(root,sel){if(reduceMotion)return()=>{};const el=root.querySelector(sel);if(!el)return()=>{};const on=(e)=>{const r=el.getBoundingClientRect();const rx=((e.clientY-r.top)/r.height-.5)*-10;const ry=((e.clientX-r.left)/r.width-.5)*10;el.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`;};const off=()=>el.style.transform='';el.addEventListener('pointermove',on);el.addEventListener('pointerleave',off);return()=>{el.removeEventListener('pointermove',on);el.removeEventListener('pointerleave',off);};}
  function bindScrollProgress(root,sel){const el=root.querySelector(sel);if(!el)return()=>{};const on=()=>{const r=root.getBoundingClientRect();const p=Math.min(100,Math.max(0,(1-r.top/window.innerHeight)*100));el.style.width=`${p}%`;};on();window.addEventListener('scroll',on,{passive:true});return()=>window.removeEventListener('scroll',on);}
  function bindPillRotate(root,sel){const el=root.querySelector(sel);if(!el)return()=>{};const vals=['Automation','Insights','Approvals','Sync'];let i=0;if(reduceMotion){el.textContent=vals[0];return()=>{};}const t=setInterval(()=>{i=(i+1)%vals.length;el.textContent=vals[i];},1500);return()=>clearInterval(t);}
  function bindCount(root,sel){const el=root.querySelector(sel);if(!el)return()=>{};const target=Number(el.dataset.target||0);if(reduceMotion){el.textContent=`${target}%`;return()=>{};}let v=0;const step=()=>{v+=2;el.textContent=`${Math.min(v,target)}%`;if(v<target) requestAnimationFrame(step);};step();return()=>{};}
  function bindTyping(root,sel){const el=root.querySelector(sel);if(!el)return()=>{};const txt=el.dataset.text||'';if(reduceMotion){el.textContent=txt;return()=>{};}let i=0;el.textContent='';const cur=document.createElement('span');cur.textContent='▍';const t=setInterval(()=>{el.textContent=txt.slice(0,++i);el.appendChild(cur);if(i>=txt.length)clearInterval(t);},40);return()=>clearInterval(t);}
  function bindHoverReveal(root,sel){const el=root.querySelector(sel);if(!el||reduceMotion)return()=>{};const on=()=>el.classList.add('is-revealed');const off=()=>el.classList.remove('is-revealed');el.addEventListener('focus',on);el.addEventListener('blur',off);el.addEventListener('mouseenter',on);el.addEventListener('mouseleave',off);return()=>{};}

  document.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    const kind = btn.dataset.copy;
    const map = { html: snippetHtml.textContent, css: snippetCss.textContent, js: snippetJs.textContent };
    try { await navigator.clipboard.writeText(map[kind] || ''); copyLive.textContent = `${kind.toUpperCase()} copied for hero ${activeId}.`; }
    catch { copyLive.textContent = 'Clipboard unavailable. Copy manually from snippet block.'; }
  }));

  renderSelector();
  renderGallery();
  activatePack('01');
})();
