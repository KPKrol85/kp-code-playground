document.addEventListener('DOMContentLoaded', () => {
  const STATUS = ['Brak', 'Do poprawy', 'Dobrze', 'Mocny sygnał'];
  const statusPoints = { Brak: 0, 'Do poprawy': 1, Dobrze: 2, 'Mocny sygnał': 3 };
  const impactPoints = { niski: 1, średni: 2, wysoki: 3, krytyczny: 4 };
  const config = [
    ['tozsamosc', 'Tożsamość i wiarygodność firmy', [['jasna nazwa firmy lub marki','wysoki'],['konkretne dane kontaktowe','krytyczny'],['lokalizacja lub obszar działania','średni'],['informacje o osobie / zespole','wysoki'],['podstawowe dane prawne, jeśli potrzebne','średni']]],
    ['oferta', 'Oferta i konkrety', [['jasny opis usług','krytyczny'],['konkretne rezultaty współpracy','wysoki'],['widoczne CTA','krytyczny'],['przejrzysty proces współpracy','wysoki'],['informacje o zakresie lub pakietach','średni']]],
    ['dowody', 'Dowody społeczne', [['opinie klientów','wysoki'],['referencje','wysoki'],['case studies','krytyczny'],['liczby / efekty / rezultaty','krytyczny'],['logotypy klientów lub branż, jeśli są prawdziwe','średni']]],
    ['jakosc', 'Jakość realizacji', [['portfolio lub przykłady prac','krytyczny'],['opis procesu projektowego','wysoki'],['przed/po lub porównania','średni'],['screeny, mockupy, materiały wizualne','średni'],['wyjaśnienie decyzji projektowych','wysoki']]],
    ['bezpieczenstwo', 'Bezpieczeństwo i formalności', [['polityka prywatności','wysoki'],['regulamin lub informacje prawne, jeśli potrzebne','średni'],['zgody formularzy','wysoki'],['bezpieczny formularz kontaktowy','krytyczny'],['HTTPS / podstawowe bezpieczeństwo','krytyczny']]],
    ['ux', 'UX i decyzja klienta', [['łatwa nawigacja','wysoki'],['szybki kontakt','krytyczny'],['widoczna ścieżka do zapytania','krytyczny'],['brak chaosu w treści','wysoki'],['dobra czytelność na mobile','krytyczny']]],
  ];

  const state = JSON.parse(localStorage.getItem('vaultTrustSignals') || '{}');
  const el = (id) => document.getElementById(id);
  const categoriesContainer = el('categoriesContainer');
  const feedback = el('feedback');

  const touch = (msg) => { feedback.textContent = `${msg} · Ostatnia aktualizacja: ${new Date().toLocaleTimeString('pl-PL')}`; };
  const save = () => { localStorage.setItem('vaultTrustSignals', JSON.stringify(state)); touch('Zmiany zapisane lokalnie'); };

  function renderCategories() {
    categoriesContainer.innerHTML = config.map(([key, name, signals]) => {
      const progressId = `progress-${key}`;
      const items = signals.map(([title, impact], i) => {
        const id = `${key}-${i}`;
        const current = state[id]?.status || 'Brak';
        const note = state[id]?.note || '';
        return `<li class="signal-card" data-signal-id="${id}" data-category="${name}" data-impact="${impact}">
            <strong>${title}</strong>
            <p class="signal-card__meta">Wpływ: ${impact}. Dlaczego ważne: wpływa na decyzję klienta i postrzeganą wiarygodność.</p>
            <p class="signal-card__meta">Rekomendacja: dopasuj ten element do realnych dowodów i pokaż go blisko kluczowego CTA.</p>
            <label for="status-${id}">Status sygnału</label>
            <select id="status-${id}" data-role="status">${STATUS.map(s=>`<option ${s===current?'selected':''}>${s}</option>`).join('')}</select>
            <label for="note-${id}">Notatka operacyjna</label>
            <textarea id="note-${id}" data-role="note" placeholder="Np. dodać sekcję opinii na stronie głównej">${note}</textarea>
          </li>`;
      }).join('');
      return `<article class="category" data-category-key="${key}"><div class="category__head"><h3>${name}</h3><div class="progress"><span id="${progressId}" style="width:0%"></span></div></div><ul class="signal-list">${items}</ul></article>`;
    }).join('');
  }

  function analyze() {
    let actual = 0; let max = 0; let strong = 0; const catScores = []; const missingCritical = []; const actions = [];
    config.forEach(([key, name, signals]) => {
      let catActual = 0; let catMax = 0;
      signals.forEach(([title, impact], i) => {
        const id = `${key}-${i}`;
        const status = state[id]?.status || 'Brak';
        const s = statusPoints[status]; const w = impactPoints[impact];
        catActual += s * w; catMax += 3 * w; actual += s * w; max += 3 * w;
        if (status === 'Mocny sygnał') strong++;
        if (status === 'Brak' && (impact === 'krytyczny' || impact === 'wysoki')) missingCritical.push(`${title} (${name})`);
        const rank = status === 'Brak' && impact === 'krytyczny' ? 1 : status === 'Brak' && impact === 'wysoki' ? 2 : status === 'Do poprawy' && (impact === 'krytyczny' || impact === 'wysoki') ? 3 : impact === 'średni' ? 4 : 5;
        actions.push({ title, category: name, impact, status, rank, why: 'Wspiera zaufanie i ogranicza ryzyko opuszczenia strony.', fix: `Uzupełnij lub wzmocnij element: ${title.toLowerCase()}.` });
      });
      const pct = Math.round((catActual / catMax) * 100);
      catScores.push({ key, name, pct });
      const bar = document.getElementById(`progress-${key}`);
      if (bar) bar.style.width = `${pct}%`;
    });
    const score = Math.round((actual / max) * 100);
    return { score, strong, catScores, missingCritical, actions: actions.sort((a,b)=>a.rank-b.rank) };
  }

  function scoreLabel(score) {
    if (score <= 35) return ['Niski poziom zaufania', 'Strona może tracić zapytania, bo brakuje podstawowych sygnałów wiarygodności.'];
    if (score <= 60) return ['Zaufanie częściowe', 'Strona ma kilka dobrych elementów, ale klient nadal może mieć za mało dowodów do decyzji.'];
    if (score <= 80) return ['Solidna baza zaufania', 'Strona wygląda wiarygodnie, ale nadal warto wzmocnić najważniejsze dowody.'];
    return ['Mocny poziom zaufania', 'Strona ma silne podstawy wiarygodności i może skuteczniej wspierać decyzję klienta.'];
  }

  function renderReport() {
    const data = analyze();
    const [label, interpretation] = scoreLabel(data.score);
    el('trustScore').textContent = data.score;
    el('reportScore').textContent = data.score;
    el('reportLabel').textContent = label;
    el('reportInterpretation').textContent = interpretation;
    el('strongSignals').textContent = data.strong;
    el('criticalMissing').textContent = data.missingCritical.length;
    const sortedCats = [...data.catScores].sort((a,b)=>b.pct-a.pct);
    const strongest = sortedCats[0]; const weakest = sortedCats[sortedCats.length-1];
    el('topPriority').textContent = data.actions[0] ? data.actions[0].title : 'Brak';
    el('clientReadiness').textContent = data.score >= 70 ? 'Wysoka' : data.score >= 50 ? 'Średnia' : 'Niska';
    el('categoryBreakdown').innerHTML = data.catScores.map(c=>`<li>${c.name}: ${c.pct}%</li>`).join('');
    const now = data.actions.filter(a=>a.rank<=2).slice(0,6);
    const next = data.actions.filter(a=>a.rank===3 || a.rank===4).slice(0,6);
    const later = data.actions.filter(a=>a.rank===5).slice(0,5);
    const renderList = (target, arr) => el(target).innerHTML = arr.length ? arr.map(a=>`<li><strong>${a.title}</strong> · ${a.category}<br><span class="signal-card__meta">${a.fix}</span></li>`).join('') : '<li>Brak pilnych pozycji.</li>';
    renderList('priorityNow', now); renderList('priorityNext', next); renderList('priorityLater', later);
    el('summaryText').textContent = `Najmocniejszy obszar: ${strongest.name} (${strongest.pct}%). Najsłabszy obszar: ${weakest.name} (${weakest.pct}%). Krytyczne braki: ${data.missingCritical.length}.`; 
  }

  categoriesContainer.addEventListener('input', (event) => {
    const card = event.target.closest('.signal-card');
    if (!card) return;
    const id = card.dataset.signalId;
    state[id] = state[id] || {};
    if (event.target.dataset.role === 'status') state[id].status = event.target.value;
    if (event.target.dataset.role === 'note') state[id].note = event.target.value.trimStart();
    save();
    renderReport();
  });

  el('resetBtn').addEventListener('click', () => {
    Object.keys(state).forEach((k) => delete state[k]);
    localStorage.removeItem('vaultTrustSignals');
    renderCategories();
    renderReport();
    touch('Dane zresetowane');
  });

  el('printBtn').addEventListener('click', () => window.print());

  el('copyReportBtn').addEventListener('click', async () => {
    const data = analyze(); const [label] = scoreLabel(data.score);
    const notes = Object.entries(state).filter(([,v])=>v.note).map(([k,v])=>`- ${k}: ${v.note}`).join('\n') || '- Brak notatek';
    const txt = `Manager sygnałów zaufania na stronie\nTrust Score: ${data.score}/100\nStatus: ${label}\n\nNajmocniejsze obszary:\n- ${[...data.catScores].sort((a,b)=>b.pct-a.pct)[0].name}\n\nNajwiększe braki:\n- ${data.missingCritical.slice(0,5).join('\n- ') || 'Brak krytycznych braków'}\n\nPriorytety:\nNAJPIERW POPRAW:\n${data.actions.filter(a=>a.rank<=2).slice(0,5).map(a=>`- ${a.title} (${a.category})`).join('\n')}\n\nNASTĘPNIE WZMOCNIJ:\n${data.actions.filter(a=>a.rank===3||a.rank===4).slice(0,5).map(a=>`- ${a.title} (${a.category})`).join('\n')}\n\nMOŻESZ DODAĆ PÓŹNIEJ:\n${data.actions.filter(a=>a.rank===5).slice(0,5).map(a=>`- ${a.title} (${a.category})`).join('\n')}\n\nNotatki:\n${notes}\n\nNastępne kroki:\n- Wdroż pierwsze 3 priorytety i ponownie oceń wynik.\n- Dodaj dowody blisko CTA i sekcji decyzji.\n\nTo narzędzie pomaga uporządkować decyzje projektowe. Nie zastępuje pełnego audytu UX, SEO ani technicznego.`;
    await navigator.clipboard.writeText(txt);
    touch('Raport skopiowany do schowka');
  });

  renderCategories();
  renderReport();
});
